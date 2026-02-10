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
}

/** Send lead to GoHighLevel (creates or updates contact) */
export async function sendToGoHighLevel(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return { ok: false, error: 'GHL_API_KEY or GHL_LOCATION_ID not set' };
  }

  const [firstName, ...lastParts] = (lead.name || '').trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  try {
    const res = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        firstName: firstName || 'Unknown',
        lastName,
        email: lead.email,
        phone: lead.phone || '',
        source: lead.source,
        tags: [`funnel-${lead.source}`, lead.source],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('GHL API error:', res.status, text);
      return { ok: false, error: `${res.status}: ${text.slice(0, 200)}` };
    }

    return { ok: true };
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

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? '',
        source: lead.source,
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

/** Send lead to all configured CRM destinations (GHL and/or webhook). Runs in parallel. */
export async function sendLeadToCrm(lead: LeadPayload): Promise<{ ghl?: { ok: boolean; error?: string }; webhook?: { ok: boolean; error?: string } }> {
  const results: { ghl?: { ok: boolean; error?: string }; webhook?: { ok: boolean; error?: string } } = {};

  const hasGhl = !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
  const hasWebhook = !!process.env.CRM_WEBHOOK_URL;

  if (hasGhl) results.ghl = await sendToGoHighLevel(lead);
  if (hasWebhook) results.webhook = await sendToWebhook(lead);

  return results;
}
