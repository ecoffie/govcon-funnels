import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import { saveLeadToSupabase, getLeadPositionBySource, recentDuplicateExists, MINDY_LAUNCH_ZOOM_CAP } from '@/lib/supabase-leads';

async function getMindyLaunchResult(email: string): Promise<{ position: number; getsZoom: boolean; zoomCap: number } | null> {
  const position = await getLeadPositionBySource('mindy-launch', email);
  if (position === null) return null;
  return {
    position,
    getsZoom: position <= MINDY_LAUNCH_ZOOM_CAP,
    zoomCap: MINDY_LAUNCH_ZOOM_CAP,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, source, redirectUrl, tags, abTestId, abVariant } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const lead = {
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
    //    last 2 min, treat it as a double-submit (double-click / browser retry) and
    //    short-circuit — don't create a second lead in GHL/Supabase or fire a second
    //    Slack ping + confirmation email. Return success so the front-end still
    //    redirects normally. Fails OPEN, so a check error never blocks a real signup.
    if (await recentDuplicateExists(lead.email, lead.source)) {
      console.log('Duplicate lead suppressed (recent submit):', { email: lead.email, source: lead.source });
      let dupMindyLaunch: { position: number; getsZoom: boolean; zoomCap: number } | null = null;
      if (lead.source === 'mindy-launch') {
        dupMindyLaunch = await getMindyLaunchResult(lead.email);
      }
      return NextResponse.json({ success: true, duplicate: true, mindyLaunch: dupMindyLaunch });
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

    // 3) Send confirmation email based on funnel source
    const emailResult = await sendConfirmationEmail({
      to: lead.email,
      name: lead.name,
      source: lead.source,
    });

    // 3b) Mindy Launch scarcity: after the backup insert, compute this signup's
    //     position so the thank-you page can show Zoom (first N) vs YouTube.
    //     Use this email's first persisted slot so later duplicate submits don't
    //     revoke Zoom access after the public count passes the cap.
    let mindyLaunch: { position: number; getsZoom: boolean; zoomCap: number } | null = null;
    if (lead.source === 'mindy-launch') {
      mindyLaunch = await getMindyLaunchResult(lead.email);
    }

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
    });

    // 4) Response so front-end can redirect
    return NextResponse.json({
      success: true,
      crm: crmResults,
      supabase: supabaseResult,
      slack: slackResult,
      email: emailResult,
      mindyLaunch,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
