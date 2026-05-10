import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim();

    // Send to Slack
    const slackUrl = process.env.SLACK_LEAD_WEBHOOK_URL;
    if (slackUrl) {
      await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `:mortar_board: *Upskilling Newsletter Signup*\n${cleanEmail}`,
        }),
      });
    }

    // Send notification email to you
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GovConEdu <notifications@govcongiants.com>',
          to: 'hello@govconedu.com',
          subject: 'New Upskilling Newsletter Signup',
          text: `New signup for Upskilling newsletter:\n\nEmail: ${cleanEmail}\nTime: ${new Date().toISOString()}`,
        }),
      });
    }

    console.log('Upskilling signup:', cleanEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upskilling signup error:', error);
    return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 });
  }
}
