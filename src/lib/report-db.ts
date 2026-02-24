/**
 * Redis storage for marketing report data.
 * Uses gfd:report:* keys with the existing Upstash Redis instance.
 */

import { Redis } from '@upstash/redis';

const NS = 'gfd';
const KEYS = {
  weeks: () => `${NS}:report:weeks`,
  week: (weekStart: string) => `${NS}:report:week:${weekStart}`,
  sections: (weekStart: string) => `${NS}:report:sections:${weekStart}`,
};

let _redis: Redis | null = null;

function getRedis(): Redis {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error('KV_REST_API_URL and KV_REST_API_TOKEN must be set');
  }
  if (!_redis) {
    _redis = new Redis({ url, token });
  }
  return _redis;
}

export interface WeekMetrics {
  week_start: string;
  weekly_summary_notes?: string;
  top_of_funnel_content_outputs?: number;
  total_email_sent?: number;
  free_course_opt_ins?: number;
  discovery_calls_booked?: number;
  discovery_calls_held?: number;
  discovery_show_rate?: number;
  fhc_calls_held?: number;
  close_rate?: number;
  webinars_hosted?: number;
  webinar_attendees?: number;
  new_clients?: number;
  cash_collected?: number;
}

const DASHBOARD_COL_MAP: Record<string, string> = {
  Week_Start: 'week_start',
  Weekly_Summary_Notes: 'weekly_summary_notes',
  TopOfFunnel_Content_Outputs: 'top_of_funnel_content_outputs',
  Total_Email_Sent: 'total_email_sent',
  Free_Course_OptIns: 'free_course_opt_ins',
  Discovery_Calls_Booked: 'discovery_calls_booked',
  Discovery_Calls_Held: 'discovery_calls_held',
  Discovery_Show_Rate: 'discovery_show_rate',
  FHC_Calls_Held: 'fhc_calls_held',
  Close_Rate: 'close_rate',
  Webinars_Hosted: 'webinars_hosted',
  Webinar_Attendees: 'webinar_attendees',
  New_Clients: 'new_clients',
  Cash_Collected: 'cash_collected',
};

export const REPORT_SECTIONS = [
  'YouTube',
  'Instagram (GCG)',
  'Instagram (Eric Coffie)',
  'LinkedIn (GCG)',
  'LinkedIn (Eric Coffie)',
  'Podcast_Bookings',
  'Podcast',
  'Cold_Emails',
  'Free_Course',
  'Discovery_Calls',
  'FHC_Calls',
  'SEO',
  'Warm_Emails',
  'Sales',
];

function toNum(v: unknown): number | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

function toStr(v: unknown): string | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const s = String(v).trim();
  return s || undefined;
}

const NUMERIC_KEYS = [
  'top_of_funnel_content_outputs', 'total_email_sent', 'free_course_opt_ins',
  'discovery_calls_booked', 'discovery_calls_held', 'discovery_show_rate',
  'fhc_calls_held', 'close_rate', 'webinars_hosted', 'webinar_attendees',
  'new_clients', 'cash_collected',
] as const;

export function weekHasData(metrics: WeekMetrics | null): boolean {
  if (!metrics) return false;
  return NUMERIC_KEYS.some((k) => {
    const v = metrics[k];
    return v !== undefined && v !== null && Number(v) > 0;
  });
}

export async function getReportWeeks(): Promise<string[]> {
  const r = getRedis();
  const members = await r.smembers(KEYS.weeks());
  return (members as string[]).sort().reverse();
}

export async function getReportWeeksWithData(): Promise<string[]> {
  const all = await getReportWeeks();
  const withData: string[] = [];
  for (const w of all) {
    const m = await getWeekMetrics(w);
    if (weekHasData(m)) withData.push(w);
  }
  return withData;
}

export async function getAllWeeksMetrics(): Promise<WeekMetrics[]> {
  const weeks = await getReportWeeksWithData();
  const result: WeekMetrics[] = [];
  for (const w of weeks) {
    const m = await getWeekMetrics(w);
    if (m) result.push({ ...m, week_start: w });
  }
  return result.sort((a, b) => a.week_start.localeCompare(b.week_start));
}

export async function getWeekMetrics(weekStart: string): Promise<WeekMetrics | null> {
  const r = getRedis();
  const h = await r.hgetall<Record<string, string>>(KEYS.week(weekStart));
  if (!h) return null;
  return {
    week_start: h.week_start ?? weekStart,
    weekly_summary_notes: toStr(h.weekly_summary_notes),
    top_of_funnel_content_outputs: toNum(h.top_of_funnel_content_outputs),
    total_email_sent: toNum(h.total_email_sent),
    free_course_opt_ins: toNum(h.free_course_opt_ins),
    discovery_calls_booked: toNum(h.discovery_calls_booked),
    discovery_calls_held: toNum(h.discovery_calls_held),
    discovery_show_rate: toNum(h.discovery_show_rate),
    fhc_calls_held: toNum(h.fhc_calls_held),
    close_rate: toNum(h.close_rate),
    webinars_hosted: toNum(h.webinars_hosted),
    webinar_attendees: toNum(h.webinar_attendees),
    new_clients: toNum(h.new_clients),
    cash_collected: toNum(h.cash_collected),
  };
}

export async function getWeekSections(weekStart: string): Promise<Record<string, string>> {
  const r = getRedis();
  const h = await r.hgetall<Record<string, string>>(KEYS.sections(weekStart));
  if (!h) return {};
  const out: Record<string, string> = {};
  for (const key of REPORT_SECTIONS) {
    const val = h[key];
    if (val !== undefined && val !== null) out[key] = String(val);
  }
  return out;
}

export async function upsertWeekMetrics(metrics: Partial<WeekMetrics>): Promise<void> {
  if (!metrics.week_start) throw new Error('week_start required');
  const r = getRedis();
  const hash: Record<string, string> = { week_start: metrics.week_start };
  if (metrics.weekly_summary_notes !== undefined) hash.weekly_summary_notes = String(metrics.weekly_summary_notes);
  if (metrics.top_of_funnel_content_outputs !== undefined) hash.top_of_funnel_content_outputs = String(metrics.top_of_funnel_content_outputs);
  if (metrics.total_email_sent !== undefined) hash.total_email_sent = String(metrics.total_email_sent);
  if (metrics.free_course_opt_ins !== undefined) hash.free_course_opt_ins = String(metrics.free_course_opt_ins);
  if (metrics.discovery_calls_booked !== undefined) hash.discovery_calls_booked = String(metrics.discovery_calls_booked);
  if (metrics.discovery_calls_held !== undefined) hash.discovery_calls_held = String(metrics.discovery_calls_held);
  if (metrics.discovery_show_rate !== undefined) hash.discovery_show_rate = String(metrics.discovery_show_rate);
  if (metrics.fhc_calls_held !== undefined) hash.fhc_calls_held = String(metrics.fhc_calls_held);
  if (metrics.close_rate !== undefined) hash.close_rate = String(metrics.close_rate);
  if (metrics.webinars_hosted !== undefined) hash.webinars_hosted = String(metrics.webinars_hosted);
  if (metrics.webinar_attendees !== undefined) hash.webinar_attendees = String(metrics.webinar_attendees);
  if (metrics.new_clients !== undefined) hash.new_clients = String(metrics.new_clients);
  if (metrics.cash_collected !== undefined) hash.cash_collected = String(metrics.cash_collected);
  await r.hset(KEYS.week(metrics.week_start), hash);
  await r.sadd(KEYS.weeks(), metrics.week_start);
}

export async function upsertSection(weekStart: string, section: string, content: string): Promise<void> {
  const r = getRedis();
  await r.hset(KEYS.sections(weekStart), { [section]: content });
  await r.sadd(KEYS.weeks(), weekStart);
}

export function mapDashboardRowToMetrics(row: Record<string, unknown>): Partial<WeekMetrics> {
  const metrics: Partial<WeekMetrics> = {};
  for (const [excelCol, dbKey] of Object.entries(DASHBOARD_COL_MAP)) {
    const v = row[excelCol];
    if (v === undefined) continue;
    if (dbKey === 'week_start' || dbKey === 'weekly_summary_notes') {
      (metrics as Record<string, unknown>)[dbKey] = toStr(v) ?? String(v);
    } else {
      const n = toNum(v);
      if (n !== undefined) (metrics as Record<string, unknown>)[dbKey] = n;
    }
  }
  return metrics;
}
