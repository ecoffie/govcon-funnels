/**
 * CRM automation: send form leads to GoHighLevel and/or a webhook (Zapier, Make, etc.)
 * Set env vars in .env.local (see .env.example).
 */

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  source: string;
  /** Optional: redirect path after submit (e.g. /bootcamp/upsell) */
  redirectUrl?: string;
  /** Optional: custom tags to add to the contact in GHL */
  tags?: string[];
}

/** Send lead to GoHighLevel v2 API (creates or updates contact) */
export async function sendToGoHighLevel(lead: LeadPayload): Promise<{ ok: boolean; error?: string; contactId?: string }> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return { ok: false, error: 'GHL_API_KEY or GHL_LOCATION_ID not set' };
  }

  const [firstName, ...lastParts] = (lead.name || '').trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  try {
    // Use custom tags if provided, otherwise fall back to source-based tag
    const allTags = lead.tags && lead.tags.length > 0
      ? lead.tags
      : [lead.source];

    // GHL v2 API - uses services.leadconnectorhq.com with PIT key
    const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        locationId,
        firstName: firstName || 'Unknown',
        lastName,
        email: lead.email,
        phone: lead.phone || '',
        source: lead.source,
        tags: allTags,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('GHL v2 API error:', res.status, text);
      return { ok: false, error: `${res.status}: ${text.slice(0, 200)}` };
    }

    const data = await res.json();
    return { ok: true, contactId: data.contact?.id };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('GHL request failed:', message);
    return { ok: false, error: message };
  }
}

/** Send lead to a generic webhook (Zapier, Make, n8n, or your CRM's inbound webhook) */
export async function sendToWebhook(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { ok: false, error: 'CRM_WEBHOOK_URL not set' };

  const [firstName, ...lastParts] = (lead.name || '').trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  // Combine auto-generated tags with custom tags
  const allTags = [
    `funnel-${lead.source}`,
    lead.source,
    ...(lead.tags || []),
  ];

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        firstName,
        lastName,
        email: lead.email,
        phone: lead.phone ?? '',
        source: lead.source,
        tags: allTags,
        redirectUrl: lead.redirectUrl,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('CRM webhook error:', res.status, text);
      return { ok: false, error: `${res.status}: ${text.slice(0, 200)}` };
    }

    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('CRM webhook failed:', message);
    return { ok: false, error: message };
  }
}

/** Send lead to Slack (notification with email, name, source, phone). */
export async function sendToSlack(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: 'SLACK_LEAD_WEBHOOK_URL not set' };
  }

  const sourceLabel = lead.source.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `:tada: *New Lead Magnet Signup*`,
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: 'New Lead Magnet Signup', emoji: true },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Name:*\n${lead.name || '\u2014'}` },
              { type: 'mrkdwn', text: `*Email:*\n${lead.email}` },
              { type: 'mrkdwn', text: `*Signed up for:*\n${sourceLabel}` },
              { type: 'mrkdwn', text: `*Phone:*\n${lead.phone || '\u2014'}` },
            ],
          },
          {
            type: 'context',
            elements: [{ type: 'mrkdwn', text: `Source: \`${lead.source}\` \u00b7 ${new Date().toISOString()}` }],
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Slack webhook error:', res.status, errText);
      return { ok: false, error: `${res.status}: ${errText.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Slack notification failed:', message);
    return { ok: false, error: message };
  }
}

/** Send lead to all configured destinations (GHL, webhook, Slack). Runs in parallel. */
export async function sendLeadToCrm(lead: LeadPayload): Promise<{
  ghl?: { ok: boolean; error?: string; contactId?: string };
  webhook?: { ok: boolean; error?: string };
  slack?: { ok: boolean; error?: string };
}> {
  const hasGhl = !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
  const hasWebhook = !!process.env.CRM_WEBHOOK_URL;
  const hasSlack = !!process.env.SLACK_LEAD_WEBHOOK_URL;

  // Run all integrations in parallel for speed
  const [ghlResult, webhookResult, slackResult] = await Promise.all([
    hasGhl ? sendToGoHighLevel(lead) : Promise.resolve(undefined),
    hasWebhook ? sendToWebhook(lead) : Promise.resolve(undefined),
    hasSlack ? sendToSlack(lead) : Promise.resolve(undefined),
  ]);

  return {
    ...(ghlResult && { ghl: ghlResult }),
    ...(webhookResult && { webhook: webhookResult }),
    ...(slackResult && { slack: slackResult }),
  };
}
