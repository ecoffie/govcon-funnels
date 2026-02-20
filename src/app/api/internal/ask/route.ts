import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_CONTEXT = `You are a helpful assistant for the GovCon Giants internal team. You help answer questions about their marketing funnels, plans, lead flow, and processes.

Context you can use:
- Top priority: February Bootcamp (Proposal Bootcamp) at funnels.govcongiants.org/proposal-bootcamp. Free proposal resources, Feb 28 live bootcamp.
- Lead flow: Forms post to /api/lead → GoHighLevel (contact + tags), Slack notification, confirmation email.
- Plans: Pro Member Group (shop.govcongiants.org), Pro Member Plan & Accelerator (premium checkout/contact), White Glove (email), Jan 31 Bootcamp Replay (Stripe on-site).
- Funnels: Homepage, resources, bootcamp, free-course, opp, premium, jan-31-bootcamp-paid, proposal-bootcamp.
- Online flow: Traffic → Funnels → Upsell/Downsell → Product/Download → Confirmation email → Follow-up sequence.
- Manual flow: Traffic → Email/phone reach out → First meeting → Sale or Schedule second meeting → Second meeting → Contract/Invoice.

Be concise and accurate. If the question is outside this context, say so briefly.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = typeof body?.question === 'string' ? body.question.trim() : '';
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: 'AI search is not configured. Add OPENAI_API_KEY to your environment (e.g. in Vercel or .env.local) to enable answers.',
      });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_CONTEXT },
          { role: 'user', content: question },
        ],
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('OpenAI API error:', res.status, err);
      return NextResponse.json(
        { error: 'AI service error. Check OPENAI_API_KEY and try again.' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim() ?? 'No answer generated.';
    return NextResponse.json({ answer: content });
  } catch (e) {
    console.error('Internal ask API error:', e);
    return NextResponse.json(
      { error: 'Request failed. Try again.' },
      { status: 500 }
    );
  }
}
