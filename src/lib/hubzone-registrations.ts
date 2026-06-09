/**
 * HUBZone webinar registration tracker.
 *
 * Reads registrant contacts from GoHighLevel (tagged when the lead form is
 * submitted on /hubzone) and returns a sanitized, public-safe summary:
 * count, daily trend, and redacted names (first name + last initial + company).
 * Emails and phones are never returned to the client.
 */

const GHL_SEARCH_URL = 'https://services.leadconnectorhq.com/contacts/search';

/** Tags applied by the hubzone lead forms (top + bottom of page). */
const HUBZONE_TAGS = ['hubzone-webinar', 'hubzone-webinar-bottom'];

/** Webinar date — used by the UI for the countdown. */
export const WEBINAR_DATE_ISO = '2026-06-17';

interface GhlContact {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  dateAdded?: string;
  tags?: string[];
}

export interface PublicRegistrant {
  /** "Heather B." — first name + last initial, redacted. */
  name: string;
  company: string | null;
  /** YYYY-MM-DD */
  date: string;
  /** True for Encore team / internal sign-ups (still shown, flagged). */
  internal: boolean;
}

export interface RegistrationSummary {
  /** Genuine external registrants (excludes test + internal). */
  count: number;
  /** Internal Encore/GCG team sign-ups. */
  internalCount: number;
  total: number;
  webinarDate: string;
  daysUntil: number;
  /** Most-recent-first. */
  registrants: PublicRegistrant[];
  /** [{ date, count }] ascending by date, external registrants only. */
  trend: { date: string; count: number }[];
  updatedAt: string;
}

/** Emails that are test data or known internal team members. */
const TEST_EMAIL_PATTERNS = [/\+/, /@example\.com$/i, /(^|\b)(test|email-test)\b/i];
const INTERNAL_EMAIL_DOMAINS = ['encore-funding.com', 'govcongiants.com', 'teamingpro.com'];

function isTestEmail(email: string): boolean {
  return TEST_EMAIL_PATTERNS.some((re) => re.test(email));
}

function isInternalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return INTERNAL_EMAIL_DOMAINS.includes(domain);
}

/** "Heather Bianconi" -> "Heather B." ; falls back gracefully. */
function redactName(first?: string, last?: string): string {
  const f = (first ?? '').trim();
  const l = (last ?? '').trim();
  if (!f && !l) return 'Registrant';
  if (f.toLowerCase() === 'none') return l ? `${l.charAt(0)}.` : 'Registrant';
  const initial = l && l.toLowerCase() !== 'none' ? ` ${l.charAt(0).toUpperCase()}.` : '';
  return `${f}${initial}`.trim();
}

async function searchByTag(tag: string, apiKey: string, locationId: string): Promise<GhlContact[]> {
  const res = await fetch(GHL_SEARCH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId,
      pageLimit: 100,
      filters: [{ field: 'tags', operator: 'contains', value: tag }],
    }),
    // GHL data changes constantly; never cache at the fetch layer.
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL search failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return Array.isArray(data?.contacts) ? data.contacts : [];
}

function daysUntil(dateIso: string, now: Date): number {
  const target = new Date(`${dateIso}T00:00:00Z`);
  const ms = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export async function getHubzoneRegistrations(now: Date): Promise<RegistrationSummary> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) {
    throw new Error('GHL_API_KEY / GHL_LOCATION_ID not configured');
  }

  // Pull both form tags in parallel, then dedupe by contact id / email.
  const results = await Promise.all(HUBZONE_TAGS.map((t) => searchByTag(t, apiKey, locationId)));
  const byKey = new Map<string, GhlContact>();
  for (const contact of results.flat()) {
    const key = (contact.id || contact.email || '').toLowerCase();
    if (key && !byKey.has(key)) byKey.set(key, contact);
  }

  const external: PublicRegistrant[] = [];
  let internalCount = 0;

  for (const c of byKey.values()) {
    const email = (c.email ?? '').toLowerCase();
    if (!email || isTestEmail(email)) continue; // drop test/QA leads entirely

    const date = (c.dateAdded ?? '').slice(0, 10);
    const internal = isInternalEmail(email);
    if (internal) internalCount += 1;

    external.push({
      name: redactName(c.firstName, c.lastName),
      company: (c.companyName ?? '').trim() || null,
      date: date || 'unknown',
      internal,
    });
  }

  // Sort most-recent-first for the list.
  external.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  // Trend: external (non-internal) registrants per day, ascending.
  const trendMap = new Map<string, number>();
  for (const r of external) {
    if (r.internal || r.date === 'unknown') continue;
    trendMap.set(r.date, (trendMap.get(r.date) ?? 0) + 1);
  }
  const trend = [...trendMap.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count }));

  const count = external.filter((r) => !r.internal).length;

  return {
    count,
    internalCount,
    total: external.length,
    webinarDate: WEBINAR_DATE_ISO,
    daysUntil: daysUntil(WEBINAR_DATE_ISO, now),
    registrants: external,
    trend,
    updatedAt: now.toISOString(),
  };
}
