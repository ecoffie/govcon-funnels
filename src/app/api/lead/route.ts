import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm, sendToSlack } from '@/lib/crm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, source, redirectUrl } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const lead = {
      name: name?.trim() ?? '',
      email: email.trim(),
      phone: phone?.trim() ?? '',
      source: source?.trim() ?? 'website',
      redirectUrl,
    };

    // 1) Send to CRM first (HighLevel + optional webhook). Contact is created and tagged in GHL.
    const crmResults = await sendLeadToCrm(lead);

    // 2) Send Slack notification (email, name, what they signed up for, phone)
    const slackResult = await sendToSlack(lead);

    // Log for debugging (optional in production)
    if (process.env.NODE_ENV !== 'production') {
      console.log('New lead:', { ...lead, timestamp: new Date().toISOString(), crm: crmResults, slack: slackResult });
    }

    // 3) Response so front-end can redirect. Product/email confirmation is handled by CRM automations (e.g. GHL).
    return NextResponse.json({
      success: true,
      crm: crmResults,
      slack: slackResult,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
