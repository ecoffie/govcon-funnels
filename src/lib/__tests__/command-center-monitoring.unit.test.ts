import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Command Center honesty (2026-10-04).
 *
 * Found in production: the monitoring tables never existed (the 20260817 migration
 * could not apply), every write failed silently, the dashboard showed "0/0 UP", and
 * alert dedupe queried Mindy's unrelated `alert_log`, got 42703, and treated the
 * error as "not a duplicate" — so a failing check would re-alert every 15 minutes.
 *
 * These tests pin:
 *   1. CRM senders and the funnel_leads write refuse synthetic leads on DIRECT calls.
 *   2. sendAlert uses cc_alert_log and FAILS CLOSED when dedupe is unavailable.
 *   3. The cron surfaces store errors (ok=false) without posting to Slack.
 *   4. The dashboard renders "MONITORING UNAVAILABLE" / "NO OBSERVATIONS YET",
 *      never a healthy state, when the stores are missing or empty.
 */

// ---- env must exist before the modules build their clients --------------------
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';
  process.env.GHL_API_KEY = 'ghl-key';
  process.env.GHL_LOCATION_ID = 'loc';
  process.env.CRM_WEBHOOK_URL = 'https://hooks.example.net/crm';
  process.env.SLACK_LEAD_WEBHOOK_URL = 'https://hooks.slack.test/leads';
  process.env.CRON_SECRET = 'cron-secret';
});

// ---- fake Supabase: records every terminal call, answers per (table, op) -------
type Resp = { data?: unknown; error: { message: string } | null; count?: number | null };
const db = vi.hoisted(() => ({
  calls: [] as { table: string; op: 'select' | 'insert'; payload?: unknown }[],
  respond: ((): Resp => ({ data: [], error: null, count: 0 })) as (table: string, op: 'select' | 'insert') => Resp,
}));

vi.mock('@supabase/supabase-js', () => {
  function builder(table: string) {
    let op: 'select' | 'insert' = 'select';
    let payload: unknown;
    const b: Record<string, unknown> = {};
    for (const m of ['select', 'eq', 'neq', 'gte', 'order', 'limit', 'range', 'not', 'ilike']) b[m] = () => b;
    b.insert = (p: unknown) => {
      op = 'insert';
      payload = p;
      return b;
    };
    b.then = (res: (v: Resp) => unknown, rej: (e: unknown) => unknown) => {
      db.calls.push({ table, op, payload });
      return Promise.resolve(db.respond(table, op)).then(res, rej);
    };
    return b;
  }
  return { createClient: () => ({ from: (t: string) => builder(t) }) };
});
vi.mock('@/lib/admin-auth', () => ({ extractPassword: () => null, isAuthorized: () => false }));

const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
const missing = (t: string): Resp => ({
  data: null,
  error: { message: `Could not find the table 'public.${t}' in the schema cache` },
  count: null,
});

beforeEach(() => {
  db.calls.length = 0;
  db.respond = () => ({ data: [], error: null, count: 0 });
  fetchMock.mockImplementation(async () => new Response('{}', { status: 200 }));
});

const SYNTHETIC = { name: '', email: 'canary+1@example.com', source: 'canary' };
const REAL = { name: 'Jane Doe', email: 'jane@acme.co', source: 'free-course' };

// ---- 1. boundary guards, called directly ---------------------------------------

describe('CRM senders refuse synthetic leads on direct calls', async () => {
  const crm = await import('@/lib/crm');

  it.each(['sendToGoHighLevel', 'sendToWebhook', 'sendToSlack'] as const)('%s', async (fn) => {
    const r = await crm[fn](SYNTHETIC);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/^suppressed: synthetic lead/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sendLeadToCrm short-circuits with the reason and no destinations', async () => {
    const r = await crm.sendLeadToCrm({ ...SYNTHETIC, email: 'qa@example.com', source: 'free-course' });
    expect(r).toEqual({ suppressed: 'reserved domain (example.com)' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('a real lead still reaches GHL, the webhook and Slack', async () => {
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ contact: { id: 'c1' } }), { status: 200 }));
    const r = await crm.sendLeadToCrm(REAL);
    expect(r.suppressed).toBeUndefined();
    expect(r.ghl?.ok && r.webhook?.ok && r.slack?.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});

describe('saveLeadToSupabase refuses synthetic leads on direct calls', async () => {
  const { saveLeadToSupabase } = await import('@/lib/supabase-leads');

  it('writes nothing to funnel_leads', async () => {
    const r = await saveLeadToSupabase(SYNTHETIC);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/^suppressed: synthetic lead/);
    expect(db.calls).toEqual([]);
  });

  it('a real lead is still written', async () => {
    const r = await saveLeadToSupabase(REAL);
    expect(r.ok).toBe(true);
    expect(db.calls).toEqual([expect.objectContaining({ table: 'funnel_leads', op: 'insert' })]);
  });
});

// ---- 2. alerting fails closed ---------------------------------------------------

describe('sendAlert', async () => {
  const { sendAlert, ALERT_TABLE } = await import('@/lib/command-center');

  it('uses cc_alert_log, never Mindy’s alert_log', () => {
    expect(ALERT_TABLE).toBe('cc_alert_log');
  });

  it('does NOT post to Slack when the dedupe store is unavailable', async () => {
    db.respond = (t) => missing(t);
    const r = await sendAlert('synthetic-url-x', 'down');
    expect(r.sent).toBe(false);
    expect(r.reason).toMatch(/^alerting unavailable: dedupe store cc_alert_log/);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(db.calls.map((c) => c.table)).toEqual(['cc_alert_log']);
  });

  it('posts once and records it when dedupe works and the key is new', async () => {
    const r = await sendAlert('synthetic-url-x', 'down');
    expect(r).toEqual({ sent: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(db.calls.at(-1)).toMatchObject({ table: 'cc_alert_log', op: 'insert', payload: { alert_key: 'synthetic-url-x' } });
  });

  it('swallows a repeat inside the 4h window', async () => {
    db.respond = () => ({ data: null, error: null, count: 1 });
    expect(await sendAlert('synthetic-url-x', 'down')).toEqual({ sent: false, reason: 'deduped (4h window)' });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('recordCheck reports whether the row was saved', async () => {
  const { recordCheck } = await import('@/lib/command-center');
  it('returns the store error instead of swallowing it', async () => {
    db.respond = (t) => missing(t);
    expect(await recordCheck({ check: 'url', ok: true })).toEqual({
      ok: false,
      error: "Could not find the table 'public.synthetic_checks' in the schema cache",
    });
  });
});

// ---- 3. cron surfaces store errors without alert spam ---------------------------

describe('GET /api/cron/synthetic-checks with the monitoring tables missing', async () => {
  const { GET } = await import('@/app/api/cron/synthetic-checks/route');

  it('reports ok=false with every store error, and posts nothing to Slack', async () => {
    db.respond = (t) => missing(t);
    // Every probe gets a 500, so every check FAILS — the case that used to re-alert every run.
    fetchMock.mockImplementation(async () => new Response('down', { status: 500 }));
    const res = await GET(
      new NextRequest('https://govcongiants.com/api/cron/synthetic-checks', {
        headers: { authorization: 'Bearer cron-secret' },
      }),
    );
    const json = await res.json();

    expect(json.ok).toBe(false);
    expect(json.checksOk).toBe(false);
    expect(json.persistence).toMatchObject({ table: 'synthetic_checks', saved: 0, ok: false });
    const errs = json.monitoringErrors.join('\n');
    expect(errs).toMatch(/synthetic_checks: saved 0\//);
    expect(errs).toMatch(/site_events: .*JS-error alert not evaluated/);
    expect(errs).toMatch(/lead_pipeline_log: .*failure-rate alert not evaluated/);
    expect(errs).toMatch(/alerting unavailable: dedupe store cc_alert_log/);
    expect(json.alertsSent).toEqual([]);
    const slackPosts = fetchMock.mock.calls.filter(([u]) => String(u).includes('hooks.slack.test'));
    expect(slackPosts).toEqual([]);
  });
});

// ---- 4. dashboard never shows healthy without data ------------------------------

async function renderDashboard() {
  const { default: Page } = await import('@/app/dashboard/command-center/page');
  return renderToStaticMarkup(await Page());
}

describe('/dashboard/command-center', () => {
  it('stores missing → MONITORING UNAVAILABLE, banner, no healthy pill', async () => {
    db.respond = (t) => missing(t);
    const html = await renderDashboard();
    expect(html).toContain('Monitoring unavailable');
    expect(html.match(/MONITORING UNAVAILABLE/g)?.length).toBe(3); // uptime, latency, JS errors
    expect(html).toContain('synthetic_checks: Could not find the table');
    expect(html).not.toMatch(/\d+\/\d+ UP/);
    expect(html).not.toContain('NO OBSERVATIONS YET');
  });

  it('stores readable but empty → NO OBSERVATIONS YET, no banner, no healthy pill', async () => {
    const html = await renderDashboard();
    expect(html).not.toContain('Monitoring unavailable');
    expect(html.match(/NO OBSERVATIONS YET/g)?.length).toBe(3);
    expect(html).not.toMatch(/\d+\/\d+ UP/);
  });

  it('real observations → normal health pill', async () => {
    const now = new Date().toISOString();
    db.respond = (t) =>
      t === 'synthetic_checks'
        ? { data: [{ check: 'url', target: 'https://govcongiants.com/', ok: true, ts: now, duration_ms: 90, detail: null }], error: null }
        : t === 'site_events'
          ? { data: [{ ts: now, event: 'page_view', label: null, page: '/', meta: {} }], error: null, count: 0 }
          : { data: [{ ts: now, source: 'free-course', duplicate: false, ghl_ok: true, supabase_ok: true, slack_ok: true, email_ok: true, duration_ms: 400 }], error: null };
    const html = await renderDashboard();
    expect(html).toContain('1/1 UP');
    expect(html).not.toContain('MONITORING UNAVAILABLE');
    expect(html).not.toContain('NO OBSERVATIONS YET');
  });

  it('retired canary card points at funnel_leads as fake submissions, not monitoring results', async () => {
    const html = await renderDashboard();
    expect(html).toContain('RETIRED');
    expect(html).toContain('funnel_leads');
    expect(html).toContain('not monitoring results');
    expect(html).not.toContain('Past runs remain in synthetic_checks');
  });
});
