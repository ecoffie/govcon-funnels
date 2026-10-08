/**
 * CRM automation: send form leads to GoHighLevel and/or a webhook (Zapier, Make, etc.)
 * Set env vars in .env.local (see .env.example).
 *
 * Every outbound sender here refuses synthetic leads (src/lib/synthetic-lead.ts)
 * on its own, so a caller that forgets /api/lead's guard still cannot push test
 * traffic into GHL, the generic webhook, or Slack.
 */
import { syntheticLeadReason } from '@/lib/synthetic-lead';

type SuppressedResult = { ok: false; error: string };

function suppressSynthetic(lead: LeadPayload, destination: string): SuppressedResult | null {
  const reason = syntheticLeadReason(lead);
  if (!reason) return null;
  console.log(`[CRM] Suppressed synthetic lead for ${destination}: ${reason}`);
  return { ok: false, error: `suppressed: synthetic lead — ${reason}` };
}

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  /** Optional: company name (e.g. webinar registration) */
  company?: string;
  source: string;
  /** Optional: redirect path after submit (e.g. /bootcamp/upsell) */
  redirectUrl?: string;
  /** Optional: custom tags to add to the contact in GHL */
  tags?: string[];
  /** Optional: A/B test ID (e.g. 'mi-free-cta') */
  abTestId?: string | null;
  /** Optional: A/B test variant (e.g. 'variant-a') */
  abVariant?: string | null;
}

/** Send lead to GoHighLevel v2 API (creates or updates contact) */
export async function sendToGoHighLevel(lead: LeadPayload): Promise<{ ok: boolean; error?: string; contactId?: string }> {
  const suppressed = suppressSynthetic(lead, 'GHL');
  if (suppressed) return suppressed;

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return { ok: false, error: 'GHL_API_KEY or GHL_LOCATION_ID not set' };
  }

  const [firstName, ...lastParts] = (lead.name || '').trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  try {
    // Use custom tags if provided, otherwise fall back to source-based tag
    const baseTags = lead.tags && lead.tags.length > 0
      ? lead.tags
      : [lead.source];

    // Add A/B test variant as a tag for segmentation
    const allTags = lead.abTestId && lead.abVariant
      ? [...baseTags, `ab-${lead.abTestId}-${lead.abVariant}`]
      : baseTags;

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
        companyName: lead.company || '',
        source: lead.source,
        tags: allTags,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      // This location rejects a second contact with the same email (400 +
      // meta.contactId). The person is already in GHL — the lead is not lost,
      // but this funnel's tags were never applied. Add them to the existing
      // contact. Tags only: POST /contacts/:id/tags is additive, and we never
      // overwrite the name/phone/tags the contact already has.
      const existingId = res.status === 400 ? duplicateContactId(text) : null;
      if (existingId) {
        return addTagsToExistingContact(existingId, allTags, apiKey);
      }
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

/** The existing contact's id when GHL refused a create as a duplicate, else null. */
export function duplicateContactId(body: string): string | null {
  try {
    const parsed = JSON.parse(body) as { message?: unknown; meta?: { contactId?: unknown } };
    const id = parsed?.meta?.contactId;
    if (typeof id !== 'string' || !id) return null;
    if (typeof parsed.message !== 'string' || !/duplicated contacts/i.test(parsed.message)) return null;
    return id;
  } catch {
    return null;
  }
}

async function addTagsToExistingContact(
  contactId: string,
  tags: string[],
  apiKey: string,
): Promise<{ ok: boolean; error?: string; contactId?: string }> {
  try {
    const res = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({ tags }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('GHL add-tags to existing contact failed:', res.status, text);
      return { ok: false, contactId, error: `existing contact ${contactId}, tag add ${res.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true, contactId };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('GHL add-tags request failed:', message);
    return { ok: false, contactId, error: `existing contact ${contactId}, tag add failed: ${message}` };
  }
}

/** Send lead to a generic webhook (Zapier, Make, n8n, or your CRM's inbound webhook) */
export async function sendToWebhook(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const suppressed = suppressSynthetic(lead, 'webhook');
  if (suppressed) return suppressed;

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
        company: lead.company ?? '',
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
  const suppressed = suppressSynthetic(lead, 'Slack');
  if (suppressed) return suppressed;

  const webhookUrl = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: 'SLACK_LEAD_WEBHOOK_URL not set' };
  }

  const sourceLabel = lead.source.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Build A/B test context if present
  const abTestInfo = lead.abTestId && lead.abVariant
    ? ` \u00b7 A/B: \`${lead.abTestId}:${lead.abVariant}\``
    : '';

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
              { type: 'mrkdwn', text: `*Company:*\n${lead.company || '\u2014'}` },
            ],
          },
          {
            type: 'context',
            elements: [{ type: 'mrkdwn', text: `Source: \`${lead.source}\`${abTestInfo} \u00b7 ${new Date().toISOString()}` }],
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
  /** Set (with the reason) when the lead was synthetic and nothing was sent. */
  suppressed?: string;
}> {
  const syntheticReason = syntheticLeadReason(lead);
  if (syntheticReason) {
    console.log(`[CRM] Suppressed synthetic lead (no GHL/webhook/Slack): ${syntheticReason}`);
    return { suppressed: syntheticReason };
  }

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
