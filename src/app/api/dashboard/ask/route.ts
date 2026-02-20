import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for the GovCon Giants internal dashboard. You have complete knowledge of the site's backend, funnels, integrations, and operations.

## CURRENT STATUS (Feb 2026)

### Active Funnels (12 total)
1. **Homepage** (govcongiants.org) - Main landing page
2. **Resources Library** (/resources) - Free video library and downloads
3. **Training Hub** (/training) - Bootcamp overview page
4. **January Bootcamp** (/bootcamp) - Source: "bootcamp"
5. **Surge Bootcamp** (/surge) - Q4 spending focus - Source: "surge"
6. **Feb 28 Proposal Bootcamp** (funnels.govcongiants.org/proposal-bootcamp) - Source: "proposal-bootcamp" - CURRENT PRIORITY
7. **Free 12-Day Course** (/free-course) - Source: "free-course"
8. **Opportunity Hunter** (/opp) - Tool redirect - Source: "opp"
9. **Resource Handouts** (/resources/handouts) - Source: "handouts"
10. **Feb 28 Bootcamp Alt** (/feb-28-bootcamp) - Source: "feb28-bootcamp"
11. **Premium Plans** (/premium) - Overview of paid products
12. **Jan 31 Bootcamp Paid** (/jan-31-bootcamp-paid) - Stripe checkout

### Lead Automation & Integrations

**How it works:**
1. User fills out form (name, email, phone)
2. Form posts to /api/lead with source tag
3. API creates/updates contact in Go High Level CRM
4. API sends Slack notification to team channel
5. API sends confirmation email (via Resend)
6. User redirects to thank you/upsell page

**Active Integrations (3):**
- **Go High Level CRM**: Creates/updates contacts with source tags
  - Location ID: AMkIivLuREYwsX5GhAAL
  - Env: GHL_API_KEY, GHL_LOCATION_ID
- **Slack Notifications**: Real-time lead alerts (configured Feb 16, 2026)
  - Env: SLACK_LEAD_WEBHOOK_URL
- **Email Confirmation**: Welcome emails via Resend
  - Env: RESEND_API_KEY

**Source Tags:**
bootcamp, surge, proposal-bootcamp, free-course, opp, handouts, feb28-bootcamp

### Products & Plans (7 total)

**Beginner:**
- Feb 28 Proposal Bootcamp (Free resources + Live training)
- Free 12-Day Course (Email sequence)
- Pro Member Group ($99/month at shop.govcongiants.org)

**Growing/Mid-Level:**
- Pro Member Plan ($997 one-time)
- Accelerator Program ($5,997 one-time)

**Scaling/Advanced:**
- Accelerator Program ($5,997)
- White Glove Service (Custom pricing via email)

### Recent Updates

**Feb 17, 2026:**
- Updated all "Bid Bootcamp Downloads" links to proposal bootcamp funnel

**Feb 16, 2026:**
- Slack integration configured and deployed
- Real-time lead notifications now active

**Feb 16, 2026:**
- Updated bootcamp dates from Jan 31 to Feb 28

**Feb 11, 2026:**
- Fixed Stripe key handling (whitespace stripping)

### Top Priority: Feb 28 Proposal Bootcamp
- **URL**: https://funnels.govcongiants.org/proposal-bootcamp
- **Offer**: Free proposal resources (IDIQ templates, Sources Sought, task order checklist)
- **Event**: Live 8-hour bootcamp on February 28
- **Flow**: Landing → Free resources → Upsell (live bootcamp) → Downsell → Thank you
- **Status**: All leads go to GHL + Slack, upsell/downsell pages live

### Environment Variables (Vercel)
- GHL_API_KEY - Go High Level API key
- GHL_LOCATION_ID - Go High Level location
- SLACK_LEAD_WEBHOOK_URL - Slack webhook for notifications
- RESEND_API_KEY - Email service
- STRIPE_SECRET_KEY - Payment processing

### Testing Lead Automation
1. Fill out any form with test data
2. Check Slack for notification (appears within seconds)
3. Check Go High Level for contact with source tag
4. Check email for confirmation (if configured)
5. View Vercel logs for debugging

Answer questions about funnels, integrations, products, updates, or any backend operations. Be concise and helpful.`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question?.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
          answer: 'The chat feature requires OPENAI_API_KEY to be set in Vercel environment variables. Please add it to enable AI-powered answers about the site backend.'
        },
        { status: 200 } // Return 200 so the UI can show the message
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to get answer from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'No answer generated';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Dashboard ask error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
