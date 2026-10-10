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
  if (!ccClient) {
    // Say so: a silent return here looks exactly like "no leads arrived".
    console.error('logLeadPipeline skipped: Supabase service client not configured');
    return;
  }
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

export type PipelineDestination = 'ghl' | 'supabase' | 'slack' | 'email';
export interface PipelineRateRow {
  ghl_ok: boolean | null;
  supabase_ok: boolean | null;
  slack_ok: boolean | null;
  email_ok: boolean | null;
  email_error?: string | null;
}
export interface DestinationRate {
  dest: PipelineDestination;
  attempted: number;
  failed: number;
  rate: number;
  /** email only: failures whose outcome is unknown (`pending:` — e.g. a confirmation
   *  handoff that timed out). Counted as failures: unconfirmed is not success. */
  pending: number;
}

/** Per-destination failure rate over pipeline-log rows. `null` = not attempted and is
 *  excluded; `false` = failure, including an unconfirmed (pending) email. */
export function pipelineFailureRates(rows: PipelineRateRow[]): DestinationRate[] {
  return (['ghl', 'supabase', 'slack', 'email'] as const).map((dest) => {
    const key = `${dest}_ok` as const;
    const attempted = rows.filter((r) => r[key] !== null);
    const failedRows = attempted.filter((r) => r[key] === false);
    const pending = dest === 'email' ? failedRows.filter((r) => (r.email_error ?? '').startsWith('pending:')).length : 0;
    return {
      dest,
      attempted: attempted.length,
      failed: failedRows.length,
      rate: attempted.length ? failedRows.length / attempted.length : 0,
      pending,
    };
  });
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
 * Outcome of an alert attempt. Callers branch on `status`, never on message text:
 *   sent     — posted to Slack (`reason` notes if it could not be recorded for dedupe)
 *   deduped  — same key already alerted inside the 4h window
 *   paused   — dedupe store unreadable (error, exception, timeout, or no client):
 *              NOTHING was posted. Fail-closed; callers must report this state.
 *   skipped  — Slack webhook not configured
 *   failed   — dedupe was fine, but the Slack post itself failed
 */
export type AlertStatus = 'sent' | 'deduped' | 'paused' | 'skipped' | 'failed';
export interface AlertResult {
  sent: boolean;
  status: AlertStatus;
  reason?: string;
}

/** Upper bound on the dedupe read. A hang must pause alerting, not stall the cron. */
export const DEDUPE_TIMEOUT_MS = 5000;

type DedupeRead = { ok: true; duplicate: boolean } | { ok: false; why: string };

/**
 * Bounded dedupe read. Resolves within DEDUPE_TIMEOUT_MS no matter what the client
 * does: a returned error, a thrown exception and a hang all become `ok: false`.
 * On timeout the request is aborted, and because sendAlert only ever acts on what
 * this function RETURNS, a read that completes late is discarded — it can never
 * resume the send.
 *
 * A plain row read, NOT `{ count: 'exact', head: true }`: for a MISSING table a
 * head:true query comes back 204 with error=null and count=null (verified against
 * production 2026-10-04), which would read as "no duplicate" and fail open.
 */
async function readDedupe(client: SupabaseClient, alertKey: string, sinceIso: string): Promise<DedupeRead> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timedOut = new Promise<DedupeRead>((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve({ ok: false, why: `dedupe read timed out after ${DEDUPE_TIMEOUT_MS}ms` });
    }, DEDUPE_TIMEOUT_MS);
  });
  const read = (async (): Promise<DedupeRead> => {
    try {
      const { data, error } = await client
        .from('cc_alert_log')
        .select('id')
        .eq('alert_key', alertKey)
        .gte('ts', sinceIso)
        .limit(1)
        .abortSignal(controller.signal);
      if (error) return { ok: false, why: error.message };
      if (!Array.isArray(data)) return { ok: false, why: 'no rows array returned' };
      return { ok: true, duplicate: data.length > 0 };
    } catch (e) {
      return { ok: false, why: e instanceof Error ? e.message : String(e) };
    }
  })();
  try {
    return await Promise.race([read, timedOut]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Send a Slack alert, deduped by key for 4h (same key → swallowed).
 *
 * FAILS CLOSED: if the dedupe store can't be read — returned error, thrown
 * exception, or no answer within DEDUPE_TIMEOUT_MS — the alert is NOT sent and
 * `status: 'paused'` is returned so the cron/verify response and the dashboard can
 * show "alerting paused" instead of staying silent. A broken dedupe store would
 * otherwise repost the same alert on every 15-minute cron run.
 */
export async function sendAlert(alertKey: string, message: string): Promise<AlertResult> {
  if (!ccClient) return { sent: false, status: 'paused', reason: 'dedupe store unavailable: Supabase not configured' };
  const webhook = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhook) return { sent: false, status: 'skipped', reason: 'SLACK_LEAD_WEBHOOK_URL not set' };

  const since = new Date(Date.now() - ALERT_DEDUPE_HOURS * 3600_000).toISOString();
  const dedupe = await readDedupe(ccClient, alertKey, since);
  if (!dedupe.ok) {
    console.error(`sendAlert: dedupe store ${ALERT_TABLE} unavailable, NOT sending "${alertKey}":`, dedupe.why);
    return { sent: false, status: 'paused', reason: `dedupe store ${ALERT_TABLE} unavailable: ${dedupe.why}` };
  }
  if (dedupe.duplicate) return { sent: false, status: 'deduped', reason: 'deduped (4h window)' };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `:rotating_light: *Command Center* — ${message}` }),
    });
    if (!res.ok) return { sent: false, status: 'failed', reason: `slack HTTP ${res.status}` };
  } catch (e) {
    return { sent: false, status: 'failed', reason: `slack post threw: ${e instanceof Error ? e.message : String(e)}` };
  }

  try {
    const { error: logError } = await ccClient
      .from('cc_alert_log')
      .insert({ alert_key: alertKey, message: message.slice(0, 1000) });
    if (logError) {
      console.error(`sendAlert: sent "${alertKey}" but could not record it in ${ALERT_TABLE}:`, logError.message);
      return { sent: true, status: 'sent', reason: `sent, but not recorded for dedupe: ${logError.message}` };
    }
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e);
    console.error(`sendAlert: sent "${alertKey}" but recording it threw:`, why);
    return { sent: true, status: 'sent', reason: `sent, but not recorded for dedupe: ${why}` };
  }
  return { sent: true, status: 'sent' };
}
