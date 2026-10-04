/**
 * Synthetic-lead detection. Shared by /api/lead (which suppresses every side
 * effect for these) and the email sender (which refuses to send to them).
 *
 * Why this exists: until 2026-10-03 the 15-minute synthetic cron POSTed
 * `canary+<ts>@example.com` (source 'canary') through the real lead pipeline,
 * which wrote GHL + Supabase rows, pinged Slack/webhooks, and sent a real
 * "there, Welcome to GovCon Giants!" email every run. The probe is retired;
 * this guard makes sure a manual or re-added probe can never restart it.
 *
 * Reserved domains are RFC 2606 / RFC 6761 names that can never belong to a
 * real signup, so blocking them cannot drop a genuine lead.
 */

const SYNTHETIC_SOURCES = new Set(['canary', 'synthetic']);

const RESERVED_DOMAINS = new Set(['example.com', 'example.net', 'example.org']);
const RESERVED_TLDS = ['.example', '.test', '.invalid', '.localhost'];

/** Returns the reason a recipient address is synthetic, or null if it is real. */
export function syntheticRecipientReason(email: string | null | undefined): string | null {
  const domain = (email ?? '').trim().toLowerCase().split('@').pop() ?? '';
  if (!domain) return null;
  if (RESERVED_DOMAINS.has(domain) || [...RESERVED_DOMAINS].some((d) => domain.endsWith(`.${d}`))) {
    return `reserved domain (${domain})`;
  }
  const tld = RESERVED_TLDS.find((t) => domain === t.slice(1) || domain.endsWith(t));
  if (tld) return `reserved TLD (${tld})`;
  return null;
}

/** Returns the reason a lead is synthetic, or null if it should be processed normally. */
export function syntheticLeadReason(lead: { email?: string | null; source?: string | null }): string | null {
  const source = (lead.source ?? '').trim().toLowerCase();
  if (SYNTHETIC_SOURCES.has(source)) return `synthetic source (${source})`;
  return syntheticRecipientReason(lead.email);
}
