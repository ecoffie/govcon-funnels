import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import { saveLeadToSupabase, countLeadsBySource, MINDY_LAUNCH_ZOOM_CAP } from '@/lib/supabase-leads';

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
    //     Distinct-by-email count INCLUDES the row we just wrote. Only for this
    //     source — every other funnel skips the extra query.
    let mindyLaunch: { position: number; getsZoom: boolean; zoomCap: number } | null = null;
    if (lead.source === 'mindy-launch') {
      const count = await countLeadsBySource('mindy-launch');
      if (count !== null) {
        mindyLaunch = {
          position: count,
          getsZoom: count <= MINDY_LAUNCH_ZOOM_CAP,
          zoomCap: MINDY_LAUNCH_ZOOM_CAP,
        };
      }
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
