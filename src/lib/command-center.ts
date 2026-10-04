/**
 * Command Center — shared server-side helpers (Supabase service client,
 * event/pipeline/check writes, deduped Slack alerts).
 *
 * Tables: supabase/migrations/20261004_command_center_v2.sql.
 *
 * Env (already used elsewhere in this app):
 *   NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY
 *   SLACK_LEAD_WEBHOOK_URL — alerts channel (same webhook leads use)
 *   CRON_SECRET — Vercel cron auth
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

export const ccClient: SupabaseClient | null =
  url && serviceKey ? createClient(url, serviceKey, { auth: { persistSession: false } }) : null;

// ---------------------------------------------------------------- events ---

export interface SiteEvent {
  session_id?: string;
  page?: string;
  event: string;
  label?: string;
  href?: string;
  meta?: Record<string, unknown>;
}

const ALLOWED_EVENTS = new Set([
  'page_view',
  'cta_click',
  'form_submit',
  'outbound_click',
  'scroll_depth',
  'js_error',
]);

/** Insert a batch of beacon events. Drops unknown event types, truncates
 *  strings, and never throws — a dashboard write must never break the site. */
export async function insertSiteEvents(events: SiteEvent[]): Promise<{ ok: boolean; inserted: number }> {
  if (!ccClient) return { ok: false, inserted: 0 };
  const clean = events
    .filter((e) => e && typeof e.event === 'string' && ALLOWED_EVENTS.has(e.event))
    .slice(0, 50)
    .map((e) => ({
      session_id: String(e.session_id ?? '').slice(0, 64) || null,
      page: String(e.page ?? '').slice(0, 500) || null,
      event: e.event,
      label: String(e.label ?? '').slice(0, 300) || null,
      href: String(e.href ?? '').slice(0, 1000) || null,
      meta: e.meta && typeof e.meta === 'object' ? e.meta : {},
    }));
  if (clean.length === 0) return { ok: true, inserted: 0 };
  try {
    const { error } = await ccClient.from('site_events').insert(clean);
    if (error) {
      console.error('insertSiteEvents failed:', error.message);
      return { ok: false, inserted: 0 };
    }
    return { ok: true, inserted: clean.length };
  } catch (e) {
    console.error('insertSiteEvents threw:', e instanceof Error ? e.message : String(e));
    return { ok: false, inserted: 0 };
  }
}

// ---------------------------------------------------------------- leads ----

export interface PipelineRow {
  email: string; // already masked by caller
  source: string;
  duplicate?: boolean;
  ghl_ok?: boolean;
  ghl_error?: string;
  supabase_ok?: boolean;
  supabase_error?: string;
  slack_ok?: boolean;
  email_ok?: boolean;
  email_error?: string;
  duration_ms?: number;
}

export async function logLeadPipeline(row: PipelineRow): Promise<void> {
  if (!ccClient) return;
  try {
    const { error } = await ccClient.from('lead_pipeline_log').insert({
      email: row.email.slice(0, 120),
      source: (row.source || 'website').slice(0, 120),
      duplicate: !!row.duplicate,
      ghl_ok: row.ghl_ok ?? null,
      ghl_error: row.ghl_error?.slice(0, 500) ?? null,
      supabase_ok: row.supabase_ok ?? null,
      supabase_error: row.supabase_error?.slice(0, 500) ?? null,
      slack_ok: row.slack_ok ?? null,
      email_ok: row.email_ok ?? null,
      email_error: row.email_error?.slice(0, 500) ?? null,
      duration_ms: row.duration_ms ?? null,
    });
    if (error) console.error('logLeadPipeline failed:', error.message);
  } catch (e) {
    console.error('logLeadPipeline threw:', e instanceof Error ? e.message : String(e));
  }
}

// --------------------------------------------------------------- checks ----

export interface CheckRow {
  /** 'canonical-host' asserts a retired hostname still permanently redirects to
   *  govcongiants.com and never serves indexable 200 content (Phase 4, 2026-09-05). */
  /** 'legacy-bridge' asserts a hostname that redirects to a DIFFERENT product's
   *  canonical host (e.g. mi.govcongiants.com -> getmindy.ai) still does so
   *  permanently, path- and query-preserving, with no indexable content of its own. */
  /** 'canary-lead' is RETIRED (2026-10-03) — kept only so historical rows type-check. */
  check: 'canary-lead' | 'url' | 'sitemap' | 'robots' | 'canonical-host' | 'legacy-bridge';
  target?: string;
  ok: boolean;
  status?: number;
  duration_ms?: number;
  detail?: string;
}

/** Persist one check result. Returns whether it was saved, so callers can report
 *  "monitoring unavailable" instead of implying the result was recorded. */
export async function recordCheck(row: CheckRow): Promise<{ ok: boolean; error?: string }> {
  if (!ccClient) return { ok: false, error: 'Supabase not configured' };
  try {
    const { error } = await ccClient.from('synthetic_checks').insert({
      check: row.check,
      target: row.target?.slice(0, 500) ?? null,
      ok: row.ok,
      status: row.status ?? null,
      duration_ms: row.duration_ms ?? null,
      detail: row.detail?.slice(0, 1000) ?? null,
    });
    if (error) {
      console.error('recordCheck failed:', error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('recordCheck threw:', message);
    return { ok: false, error: message };
  }
}

// --------------------------------------------------------------- alerts ----

const ALERT_DEDUPE_HOURS = 4;

/**
 * Dedupe store for Command Center Slack alerts. NOT `alert_log`: that name is taken
 * in this shared database by Mindy's per-user alert-email log (user_email,
 * alert_date, ...). Querying it here failed with 42703 on every call, and the old
 * code treated that error as "not a duplicate", so dedupe never worked.
 */
// The .from() calls below use the literal, not this constant: scripts/audit-unranged-selects.mjs
// only recognises `.from('<table>')` as a Supabase query.
export const ALERT_TABLE = 'cc_alert_log';

/**
 * Send a Slack alert, deduped by key for 4h (same key → swallowed).
 *
 * FAILS CLOSED: if the dedupe store can't be read, the alert is NOT sent. A broken
 * dedupe store would otherwise repost the same alert on every 15-minute cron run.
 * The failure is returned (and logged) so the cron/verify response and the
 * dashboard can show "alerting unavailable" instead of staying silent.
 */
export async function sendAlert(alertKey: string, message: string): Promise<{ sent: boolean; reason?: string }> {
  if (!ccClient) return { sent: false, reason: 'supabase not configured' };
  const webhook = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhook) return { sent: false, reason: 'SLACK_LEAD_WEBHOOK_URL not set' };
  try {
    const since = new Date(Date.now() - ALERT_DEDUPE_HOURS * 3600_000).toISOString();
    // A plain row read, NOT `{ count: 'exact', head: true }`: for a MISSING table a
    // head:true query comes back 204 with error=null and count=null (verified against
    // production 2026-10-04), which would read as "no duplicate" and fail open.
    const { data, error } = await ccClient
      .from('cc_alert_log')
      .select('id')
      .eq('alert_key', alertKey)
      .gte('ts', since)
      .limit(1);
    if (error || !Array.isArray(data)) {
      const why = error?.message ?? 'no rows array returned';
      console.error(`sendAlert: dedupe store ${ALERT_TABLE} unavailable, NOT sending "${alertKey}":`, why);
      return { sent: false, reason: `alerting unavailable: dedupe store ${ALERT_TABLE}: ${why}` };
    }
    if (data.length > 0) return { sent: false, reason: 'deduped (4h window)' };

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `:rotating_light: *Command Center* — ${message}` }),
    });
    if (!res.ok) return { sent: false, reason: `slack HTTP ${res.status}` };
    const { error: logError } = await ccClient
      .from('cc_alert_log')
      .insert({ alert_key: alertKey, message: message.slice(0, 1000) });
    if (logError) {
      console.error(`sendAlert: sent "${alertKey}" but could not record it in ${ALERT_TABLE}:`, logError.message);
      return { sent: true, reason: `sent, but not recorded for dedupe: ${logError.message}` };
    }
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: e instanceof Error ? e.message : String(e) };
  }
}
