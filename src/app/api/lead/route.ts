import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import { saveLeadToSupabase, recentDuplicateExists } from '@/lib/supabase-leads';

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
      return NextResponse.json({ success: true, duplicate: true });
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
    if (lead.source === 'mindy-launch' && process.env.MINDY_LAUNCH_SEND_URL && process.env.MINDY_LAUNCH_SEND_SECRET) {
      void fetch(process.env.MINDY_LAUNCH_SEND_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.MINDY_LAUNCH_SEND_SECRET}`,
        },
        body: JSON.stringify({
          email: lead.email,
          name: lead.name,
        }),
      }).catch((e) => console.error('mindy-launch confirmation handoff failed:', e));
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
    });

    // 4) Response so front-end can redirect
    return NextResponse.json({
      success: true,
      crm: crmResults,
      supabase: supabaseResult,
      slack: slackResult,
      email: emailResult,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
