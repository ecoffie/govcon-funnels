import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm, sendToSlack } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, source, redirectUrl, tags } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const lead = {
      name: name?.trim() ?? '',
      email: email.trim(),
      phone: phone?.trim() ?? '',
      source: source?.trim() ?? 'website',
      redirectUrl,
      tags: Array.isArray(tags) ? tags : [],
    };

    // 1) Send to CRM first (HighLevel + optional webhook). Contact is created and tagged in GHL.
    const crmResults = await sendLeadToCrm(lead);

    // 2) Send Slack notification (email, name, what they signed up for, phone)
    const slackResult = await sendToSlack(lead);

    // 3) Send confirmation email based on funnel source
    const emailResult = await sendConfirmationEmail({
      to: lead.email,
      name: lead.name,
      source: lead.source,
    });

    // Log for debugging
    console.log('New lead:', {
      email: lead.email,
      source: lead.source,
      crm: crmResults.ghl?.ok,
      slack: slackResult.ok,
      emailSent: emailResult.ok
    });

    // 4) Response so front-end can redirect
    return NextResponse.json({
      success: true,
      crm: crmResults,
      slack: slackResult,
      email: emailResult,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
