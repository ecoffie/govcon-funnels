/**
 * Mindy bootcamp registration command center.
 *
 * Reads registrants from Supabase `funnel_leads` (source = 'mindy-launch',
 * written by /api/lead when someone signs up for the Mindy bootcamp) and returns
 * full operational detail for the password-gated team dashboard: pace vs. goal,
 * projection, velocity, source attribution, and a follow-up worklist with contact
 * info.
 *
 * Cloned from hubzone-registrations.ts. Difference: the data source is the DB
 * (funnel_leads), not the GHL tag API, and there's no top/bottom-form split —
 * source attribution groups by the raw `source` value.
 *
 * This endpoint is password-protected, so it returns real contact detail
 * (name/email/phone) for the team to work the list.
 */

import { fetchAllLeadRows } from './supabase-paging';

/** funnel_leads source(s) that mark a Mindy bootcamp registration. */
const MINDY_BOOTCAMP_SOURCES = ['mindy-launch'];

/** Bootcamp / Mindy Launch date — drives the countdown + pace math, and the
 *  single funnels-side source of truth for the Mindy Day date (SiteNav, reminder
 *  route, spots route read from here). Saturday, August 22, 2026 · 10 AM–1 PM ET.
 *  NOTE: the day-of reminder CRON schedule lives in cron_jobs rows (Supabase) and
 *  must be rescheduled there separately — this constant does not drive cron timing. */
export const BOOTCAMP_DATE_ISO = '2026-08-22';
export const MINDY_DAY_DATE_LABEL = 'Saturday, August 22, 2026';
export const MINDY_DAY_SHORT_DATE = 'August 22';

/** Registration goal — 750 signups → ~500 attendees (67% show rate). */
export const REGISTRATION_GOAL = 750;

interface LeadContact {
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  source?: string;
  dateAdded?: string;
}

/** A registrant with full (gated) contact detail for the worklist. */
export interface Registrant {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  /** Display label for source attribution (the raw funnel source). */
  formLabel: string;
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
  count: number;
  internalCount: number;
  total: number;
  goal: number;
  pctToGoal: number;

  webinarDate: string;
  daysUntil: number;
  updatedAt: string;

  neededPerDay: number;
  runRatePerDay: number;
  recentRatePerDay: number;
  projectedFinal: number;
  onTrack: boolean;

  last24h: number;
  last7d: number;
  daysSinceLast: number | null;
  momentum: 'accelerating' | 'steady' | 'cooling';

  sources: SourceBreakdown[];

  trend: { date: string; count: number }[];
  registrants: Registrant[];
}

/** Emails that are test data or known internal team members. */
const TEST_EMAIL_PATTERNS = [/\+/, /@example\.com$/i, /(^|\b)(test|email-test)\b/i];
const INTERNAL_EMAIL_DOMAINS = ['encore-funding.com', 'govcongiants.com', 'teamingpro.com', 'getmindy.ai', 'govconedu.com'];

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

/** Human label for a raw funnel source. */
function labelForSource(source: string): string {
  const s = (source || '').trim().toLowerCase();
  if (!s || s === 'unknown') return 'Direct / unknown';
  if (s === 'mindy-launch') return 'Mindy bootcamp';
  // Title-case the slug for any other source variant.
  return s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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

/** Read registrants from Supabase funnel_leads as LeadContact-shaped rows. */
async function fetchFromSupabase(): Promise<LeadContact[]> {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(url, key, { auth: { persistSession: false } });
    // Paged: an unranged select caps at 1,000 rows and PostgREST does not error
    // when it truncates, so the registrant list would silently stop growing —
    // the same bug fixed in supabase-leads.ts (PR #170). 'mindy-launch' was at
    // 950 rows on 2026-08-22, ~50 signups from the cap.
    const data = await fetchAllLeadRows(() =>
      client
        .from('funnel_leads')
        .select('name,email,phone,source,created_at,raw')
        .in('source', MINDY_BOOTCAMP_SOURCES)
        .order('created_at', { ascending: true })
    );
    if (!data) return [];
    return data.map((r) => {
      const raw = (r.raw ?? {}) as Record<string, unknown>;
      const fullName = (r.name || (raw.name as string) || '').trim();
      const [firstName, ...rest] = fullName.split(/\s+/);
      return {
        email: (r.email || '').toLowerCase(),
        firstName: firstName || '',
        lastName: rest.join(' '),
        companyName: (raw.company as string) || '',
        phone: r.phone || (raw.phone as string) || '',
        source: r.source || '',
        dateAdded: r.created_at || '',
      } as LeadContact;
    });
  } catch {
    return [];
  }
}

export async function getMindyBootcampRegistrations(now: Date): Promise<RegistrationCommandCenter> {
  const contacts = await fetchFromSupabase();

  // Dedupe by email (a refresh / re-submit shouldn't double-count).
  const byKey = new Map<string, LeadContact>();
  for (const contact of contacts) {
    const key = (contact.email || '').toLowerCase();
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
      formLabel: labelForSource(source),
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
  const remaining = daysUntil(BOOTCAMP_DATE_ISO, now);
  const toGoal = Math.max(0, REGISTRATION_GOAL - count);
  const neededPerDay = remaining > 0 ? toGoal / remaining : toGoal;

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

    webinarDate: BOOTCAMP_DATE_ISO,
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
