/**
 * HUBZone webinar registration command center.
 *
 * Reads registrant contacts from GoHighLevel (tagged when the lead form is
 * submitted on /hubzone) and returns full operational detail for the
 * password-gated team dashboard: pace vs. goal, projection, velocity,
 * source attribution, and a follow-up worklist with contact info.
 *
 * This endpoint is password-protected, so it returns real contact detail
 * (name/email/phone) for the team to work the list. The lib never decides
 * caching — the route does.
 */

const GHL_SEARCH_URL = 'https://services.leadconnectorhq.com/contacts/search';

/** Tags applied by the hubzone lead forms (top + bottom of page). */
const HUBZONE_TAGS = ['hubzone-webinar', 'hubzone-webinar-bottom'];

/** Webinar date — used by the UI for the countdown + pace math. */
export const WEBINAR_DATE_ISO = '2026-06-17';

/** Registration goal for June 17 (drives the pace/projection panel). */
export const REGISTRATION_GOAL = 200;

interface GhlContact {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  source?: string;
  dateAdded?: string;
  tags?: string[];
}

/** A registrant with full (gated) contact detail for the worklist. */
export interface Registrant {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  /** Which form converted them: 'top' (hero) or 'bottom' (footer CTA). */
  formLabel: 'Top form' | 'Bottom form' | 'Other';
  source: string;
  /** Full ISO timestamp of signup. */
  signedUpAt: string;
  /** YYYY-MM-DD (UTC) for grouping. */
  date: string;
  internal: boolean;
}

export interface SourceBreakdown {
  label: string;
  count: number;
  pct: number;
}

export interface RegistrationCommandCenter {
  // headline
  count: number; // external (excludes test + internal)
  internalCount: number;
  total: number;
  goal: number;
  pctToGoal: number;

  // dates
  webinarDate: string;
  daysUntil: number;
  updatedAt: string;

  // pace & projection
  /** Registrations per day still needed to hit goal in the remaining days. */
  neededPerDay: number;
  /** Average registrations/day over the active sign-up window so far. */
  runRatePerDay: number;
  /** Average registrations/day over the last 7 days. */
  recentRatePerDay: number;
  /** Projected final count at the recent run rate. */
  projectedFinal: number;
  /** True if recent pace would hit the goal. */
  onTrack: boolean;

  // velocity & recency
  last24h: number;
  last7d: number;
  /** Days since the most recent external registration (0 = today). */
  daysSinceLast: number | null;
  /** 'accelerating' | 'steady' | 'cooling' based on last-3d vs prior-3d. */
  momentum: 'accelerating' | 'steady' | 'cooling';

  // source attribution
  sources: SourceBreakdown[];

  // data
  trend: { date: string; count: number }[];
  registrants: Registrant[];
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

function displayName(first?: string, last?: string, email?: string): string {
  const f = (first ?? '').trim();
  const l = (last ?? '').trim();
  const clean = (s: string) => (s.toLowerCase() === 'none' ? '' : s);
  const name = `${clean(f)} ${clean(l)}`.trim();
  return name || (email ?? 'Registrant');
}

function formLabelFor(source: string): Registrant['formLabel'] {
  if (source.includes('bottom')) return 'Bottom form';
  if (source.includes('hubzone-webinar')) return 'Top form';
  return 'Other';
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
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL search failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return Array.isArray(data?.contacts) ? data.contacts : [];
}

const DAY_MS = 1000 * 60 * 60 * 24;

function daysUntil(dateIso: string, now: Date): number {
  const target = new Date(`${dateIso}T00:00:00Z`);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / DAY_MS));
}

/** Count registrants whose signup falls within the last `hours` from now. */
function countWithin(rows: Registrant[], now: Date, hours: number): number {
  const cutoff = now.getTime() - hours * 60 * 60 * 1000;
  return rows.filter((r) => {
    const t = Date.parse(r.signedUpAt);
    return Number.isFinite(t) && t >= cutoff;
  }).length;
}

export async function getHubzoneRegistrations(now: Date): Promise<RegistrationCommandCenter> {
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

  const rows: Registrant[] = [];
  let internalCount = 0;

  for (const c of byKey.values()) {
    const email = (c.email ?? '').toLowerCase();
    if (!email || isTestEmail(email)) continue; // drop test/QA leads entirely

    const signedUpAt = c.dateAdded ?? '';
    const internal = isInternalEmail(email);
    if (internal) internalCount += 1;

    const source = (c.source ?? '').trim() || 'unknown';
    rows.push({
      name: displayName(c.firstName, c.lastName, c.email),
      firstName: (c.firstName ?? '').trim(),
      lastName: (c.lastName ?? '').trim(),
      email,
      phone: (c.phone ?? '').trim() || null,
      company: (c.companyName ?? '').trim() || null,
      formLabel: formLabelFor(source),
      source,
      signedUpAt,
      date: signedUpAt.slice(0, 10) || 'unknown',
      internal,
    });
  }

  // Most-recent-first.
  rows.sort((a, b) => (a.signedUpAt < b.signedUpAt ? 1 : a.signedUpAt > b.signedUpAt ? -1 : 0));

  const external = rows.filter((r) => !r.internal);
  const count = external.length;

  // ---- Trend (external, per day, ascending) ----
  const trendMap = new Map<string, number>();
  for (const r of external) {
    if (r.date === 'unknown') continue;
    trendMap.set(r.date, (trendMap.get(r.date) ?? 0) + 1);
  }
  const trend = [...trendMap.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count }));

  // ---- Pace & projection ----
  const remaining = daysUntil(WEBINAR_DATE_ISO, now);
  const toGoal = Math.max(0, REGISTRATION_GOAL - count);
  const neededPerDay = remaining > 0 ? toGoal / remaining : toGoal;

  // Run rate over the active window (first signup → now), min 1 day.
  const firstTs = external.length
    ? Math.min(...external.map((r) => Date.parse(r.signedUpAt)).filter(Number.isFinite))
    : now.getTime();
  const activeDays = Math.max(1, Math.ceil((now.getTime() - firstTs) / DAY_MS));
  const runRatePerDay = count / activeDays;

  const last24h = countWithin(external, now, 24);
  const last7d = countWithin(external, now, 24 * 7);
  const recentRatePerDay = last7d / 7;

  const projectedFinal = Math.round(count + recentRatePerDay * remaining);
  const onTrack = projectedFinal >= REGISTRATION_GOAL;

  // ---- Recency ----
  let daysSinceLast: number | null = null;
  if (external.length && external[0].signedUpAt) {
    const lastTs = Date.parse(external[0].signedUpAt);
    if (Number.isFinite(lastTs)) {
      daysSinceLast = Math.floor((now.getTime() - lastTs) / DAY_MS);
    }
  }

  // ---- Momentum: last 3 days vs the 3 days before that ----
  const last3 = countWithin(external, now, 24 * 3);
  const prev3 = countWithin(external, now, 24 * 6) - last3;
  let momentum: RegistrationCommandCenter['momentum'] = 'steady';
  if (last3 > prev3 * 1.25) momentum = 'accelerating';
  else if (last3 < prev3 * 0.75) momentum = 'cooling';

  // ---- Source attribution (external only) ----
  const srcMap = new Map<string, number>();
  for (const r of external) srcMap.set(r.formLabel, (srcMap.get(r.formLabel) ?? 0) + 1);
  const sources: SourceBreakdown[] = [...srcMap.entries()]
    .map(([label, n]) => ({ label, count: n, pct: count ? Math.round((n / count) * 100) : 0 }))
    .sort((a, b) => b.count - a.count);

  return {
    count,
    internalCount,
    total: rows.length,
    goal: REGISTRATION_GOAL,
    pctToGoal: Math.round((count / REGISTRATION_GOAL) * 100),

    webinarDate: WEBINAR_DATE_ISO,
    daysUntil: remaining,
    updatedAt: now.toISOString(),

    neededPerDay: Math.round(neededPerDay * 10) / 10,
    runRatePerDay: Math.round(runRatePerDay * 10) / 10,
    recentRatePerDay: Math.round(recentRatePerDay * 10) / 10,
    projectedFinal,
    onTrack,

    last24h,
    last7d,
    daysSinceLast,
    momentum,

    sources,

    trend,
    registrants: rows, // includes internal (flagged) for the full worklist
  };
}
