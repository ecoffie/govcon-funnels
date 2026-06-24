import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm, sendToGoHighLevel, type LeadPayload } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import {
  saveLeadToSupabase,
  countLeadsBySource,
  getLeadPositionBySource,
  recentDuplicateExists,
  MINDY_LAUNCH_ZOOM_CAP,
} from '@/lib/supabase-leads';

type MindyLaunchStatus = { position: number; getsZoom: boolean; zoomCap: number };
type LeadSubmission = LeadPayload & Record<string, unknown>;

async function getMindyLaunchStatus(email: string): Promise<MindyLaunchStatus | null> {
  const position = await getLeadPositionBySource('mindy-launch', email);
  if (position !== null) {
    return {
      position,
      getsZoom: position <= MINDY_LAUNCH_ZOOM_CAP,
      zoomCap: MINDY_LAUNCH_ZOOM_CAP,
    };
  }

  const count = await countLeadsBySource('mindy-launch');
  if (count === null) return null;
  return {
    position: count,
    getsZoom: count <= MINDY_LAUNCH_ZOOM_CAP,
    zoomCap: MINDY_LAUNCH_ZOOM_CAP,
  };
}

function enqueueMindyLaunchConfirmation(
  lead: LeadSubmission,
  mindyLaunch: MindyLaunchStatus | null
): { ok: boolean; error?: string } {
  const url = process.env.MINDY_LAUNCH_SEND_URL;
  const secret = process.env.MINDY_LAUNCH_SEND_SECRET;
  if (!url || !secret) {
    const error = 'MINDY_LAUNCH_SEND_URL or MINDY_LAUNCH_SEND_SECRET not configured';
    console.error(`mindy-launch confirmation handoff skipped: ${error}`);
    return { ok: false, error };
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      email: lead.email,
      name: lead.name,
      getsZoom: mindyLaunch?.getsZoom,
    }),
  }).catch((e) => console.error('mindy-launch confirmation handoff failed:', e));

  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, source, redirectUrl, tags, abTestId, abVariant } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const lead: LeadSubmission = {
      name: name?.trim() ?? '',
      email: email.trim(),
      phone: phone?.trim() ?? '',
      company: company?.trim() ?? '',
      source: source?.trim() ?? 'website',
      redirectUrl,
      tags: Array.isArray(tags) ? tags : [],
      abTestId: abTestId ?? null,
      abVariant: abVariant ?? null,
    };

    // 0) Idempotency guard: if this exact (email, source) already came in within the
    //    last 2 min, treat it as a double-submit (double-click / browser retry).
    //    Skip the duplicate Supabase row, Slack ping, and local confirmation, but
    //    still retry idempotent downstream delivery so a first-attempt timeout does
    //    not strand the lead outside GHL or skip Mindy's guarded confirmation send.
    //    Fails OPEN, so a check error never blocks a real signup.
    if (await recentDuplicateExists(lead.email, lead.source)) {
      console.log('Duplicate lead suppressed (recent submit):', { email: lead.email, source: lead.source });
      let dupMindyLaunch: MindyLaunchStatus | null = null;
      let mindyLaunchConfirmation: { ok: boolean; error?: string } | null = null;
      if (lead.source === 'mindy-launch') {
        dupMindyLaunch = await getMindyLaunchStatus(lead.email);
        mindyLaunchConfirmation = enqueueMindyLaunchConfirmation(lead, dupMindyLaunch);
      }
      const ghlResult = await sendToGoHighLevel(lead);
      return NextResponse.json({
        success: true,
        duplicate: true,
        crm: { ghl: ghlResult },
        mindyLaunch: dupMindyLaunch,
        mindyLaunchConfirmation,
      });
    }

    // 1) Send to CRM first (HighLevel + optional webhook). Contact is created and tagged in GHL.
    //    Also write a backup row to Supabase (funnel_leads) so a signup is never
    //    lost if GHL fails. Both run in parallel; the backup never blocks the user.
    const [crmResults, supabaseResult] = await Promise.all([
      sendLeadToCrm(lead),
      saveLeadToSupabase(lead),
    ]);

    // 2) Slack notification is already sent INSIDE sendLeadToCrm (which fans out
    //    to GHL + webhook + Slack). Do NOT call sendToSlack again here — that
    //    double-posted every lead to #leads (~1s apart). Use the result from the
    //    CRM fan-out instead.
    const slackResult = crmResults.slack ?? { ok: false, error: 'slack not configured' };

    // 3) Mindy Launch scarcity: compute this signup's first persisted position
    //    before the confirmation handoff so the email can tell them their access
    //    tier — Zoom (first N) vs YouTube. Only this source needs the extra query.
    let mindyLaunch: MindyLaunchStatus | null = null;
    if (lead.source === 'mindy-launch') {
      mindyLaunch = await getMindyLaunchStatus(lead.email);
    }

    // 3b) Send confirmation email based on funnel source.
    //     EXCEPTION: mindy-launch confirmations are owned by getmindy.ai
    //     (market-assassin) — sent via its guarded Resend path with suppression +
    //     deliverability tracking. We fire that cross-call below; sendConfirmationEmail
    //     deliberately no-ops for 'mindy-launch' so we don't double-send.
    const emailResult = await sendConfirmationEmail({
      to: lead.email,
      name: lead.name,
      source: lead.source,
    });

    // 3c) Mindy Launch save-the-date: hand off the actual send to getmindy.ai so it
    //     runs through Mindy's guarded sender (tracked in email_provider_sends).
    //     Fire-and-forget — a send failure must NEVER block the signup/redirect.
    const mindyLaunchConfirmation =
      lead.source === 'mindy-launch' ? enqueueMindyLaunchConfirmation(lead, mindyLaunch) : null;

    // Log for debugging (including A/B test data)
    console.log('New lead:', {
      email: lead.email,
      source: lead.source,
      abTest: lead.abTestId ? `${lead.abTestId}:${lead.abVariant}` : null,
      crm: crmResults.ghl?.ok,
      supabase: supabaseResult.ok,
      slack: slackResult.ok,
      emailSent: emailResult.ok,
      mindyLaunch,
      mindyLaunchConfirmation,
    });

    // 4) Response so front-end can redirect
    return NextResponse.json({
      success: true,
      crm: crmResults,
      supabase: supabaseResult,
      slack: slackResult,
      email: emailResult,
      mindyLaunch,
      mindyLaunchConfirmation,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
