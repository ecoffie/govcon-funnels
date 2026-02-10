import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';

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

    // Send to CRM(s): GoHighLevel and/or webhook (Zapier, Make, etc.)
    const results = await sendLeadToCrm(lead);

    // Log for debugging (optional in production)
    if (process.env.NODE_ENV !== 'production') {
      console.log('New lead:', { ...lead, timestamp: new Date().toISOString(), crmResults: results });
    }

    return NextResponse.json({ success: true, crm: results });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
