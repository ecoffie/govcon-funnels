import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm, sendToSlack } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import { saveLeadToSupabase } from '@/lib/supabase-leads';

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

    // 2) Send Slack notification (email, name, what they signed up for, phone)
    const slackResult = await sendToSlack(lead);

    // 3) Send confirmation email based on funnel source
    const emailResult = await sendConfirmationEmail({
      to: lead.email,
      name: lead.name,
      source: lead.source,
    });

    // Log for debugging (including A/B test data)
    console.log('New lead:', {
      email: lead.email,
      source: lead.source,
      abTest: lead.abTestId ? `${lead.abTestId}:${lead.abVariant}` : null,
      crm: crmResults.ghl?.ok,
      supabase: supabaseResult.ok,
      slack: slackResult.ok,
      emailSent: emailResult.ok
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
