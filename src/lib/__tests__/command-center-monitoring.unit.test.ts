import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
/** A response, a pending promise (to simulate a hang), or a thrown exception. */
type Answer = Resp | Promise<Resp> | { throws: Error };
const db = vi.hoisted(() => ({
  calls: [] as { table: string; op: 'select' | 'insert'; payload?: unknown }[],
  respond: ((): Answer => ({ data: [], error: null, count: 0 })) as (table: string, op: 'select' | 'insert') => Answer,
  signals: [] as AbortSignal[],
}));

vi.mock('@supabase/supabase-js', () => {
  function builder(table: string) {
    let op: 'select' | 'insert' = 'select';
    let payload: unknown;
    let head = false;
    const b: Record<string, unknown> = {};
    for (const m of ['eq', 'neq', 'gte', 'order', 'limit', 'range', 'not', 'ilike']) b[m] = () => b;
    b.abortSignal = (sig: AbortSignal) => {
      db.signals.push(sig);
      return b;
    };
    b.select = (_cols?: string, opts?: { head?: boolean }) => {
      head = !!opts?.head;
      return b;
    };
    b.insert = (p: unknown) => {
      op = 'insert';
      payload = p;
      return b;
    };
    b.then = (res: (v: Resp) => unknown, rej: (e: unknown) => unknown) => {
      db.calls.push({ table, op, payload });
      const a = db.respond(table, op);
      if (a instanceof Promise) return a.then(res, rej);
      if ('throws' in a) return Promise.reject(a.throws).then(res, rej);
      let r = a;
      // Real PostgREST/supabase-js behaviour (verified on production 2026-10-04): a
      // `head: true` query against a MISSING table returns 204 with error=null and
      // count=null — the error only surfaces on a normal (GET) read.
      if (head && r.error && /Could not find the table/.test(r.error.message)) r = { data: null, error: null, count: null };
      return Promise.resolve(r).then(res, rej);
    };
    return b;
  }
  return { createClient: () => ({ from: (t: string) => builder(t) }) };
});
vi.mock('@/lib/admin-auth', () => ({
  extractPassword: (req: NextRequest) => req.headers.get('x-admin-password'),
  isAuthorized: (p: string | null) => p === 'admin-pw',
}));

const authCookie = vi.hoisted(() => ({ value: undefined as string | undefined }));
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === 'dashboard_admin_pw' && authCookie.value !== undefined
        ? { name, value: authCookie.value }
        : undefined,
  }),
}));

const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
const missing = (t: string): Resp => ({
  data: null,
  error: { message: `Could not find the table 'public.${t}' in the schema cache` },
  count: null,
});

beforeEach(() => {
  db.calls.length = 0;
  db.signals.length = 0;
  authCookie.value = undefined;
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
    expect(r.status).toBe('paused');
    expect(r.reason).toMatch(/^dedupe store cc_alert_log unavailable/);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(db.calls.map((c) => c.table)).toEqual(['cc_alert_log']);
  });

  it('regression: a missing cc_alert_log cannot read as "no duplicate" (head:true returns error=null)', async () => {
    db.respond = (t) => missing(t);
    const r = await sendAlert('synthetic-url-x', 'down');
    expect(r.sent).toBe(false);
    expect(r.reason).toMatch(/Could not find the table 'public\.cc_alert_log'/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts once and records it when dedupe works and the key is new', async () => {
    const r = await sendAlert('synthetic-url-x', 'down');
    expect(r).toEqual({ sent: true, status: 'sent' });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(db.calls.at(-1)).toMatchObject({ table: 'cc_alert_log', op: 'insert', payload: { alert_key: 'synthetic-url-x' } });
  });

  it('swallows a repeat inside the 4h window', async () => {
    db.respond = () => ({ data: [{ id: 1 }], error: null, count: 1 });
    expect(await sendAlert('synthetic-url-x', 'down')).toEqual({ sent: false, status: 'deduped', reason: 'deduped (4h window)' });
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
    expect(errs).toMatch(/alerting paused \(synthetic-url-.*\): dedupe store cc_alert_log unavailable/);
    expect(json.alerting).toMatch(/^PAUSED/); // fail-closed limitation is explicit, not silent
    expect(json.alertsSent).toEqual([]);
    const slackPosts = fetchMock.mock.calls.filter(([u]) => String(u).includes('hooks.slack.test'));
    expect(slackPosts).toEqual([]);
  });
});

// ---- 4. dashboard never shows healthy without data ------------------------------

async function renderDashboard() {
  const { CommandCenterDashboard } = await import('@/app/dashboard/command-center/page');
  return renderToStaticMarkup(await CommandCenterDashboard());
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
    expect(html).toContain('ALERTING PAUSED');
    // Funnel counts are never printed as a 0 that could not be observed.
    expect(html.match(/>unavailable</g)?.length).toBe(4);
    expect(html).not.toMatch(/Page views<\/p><p[^>]*>0</);
  });

  it('stores readable but empty → NO OBSERVATIONS YET, no banner, no healthy pill', async () => {
    const html = await renderDashboard();
    expect(html).not.toContain('Monitoring unavailable');
    expect(html).not.toContain('ALERTING PAUSED');
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

describe('dashboard auth cookie', async () => {
  const { encodeDashboardAuthCookie, decodeDashboardAuthCookie, dashboardAuthCookieWrite } = await import(
    '@/lib/dashboard-auth-cookie'
  );

  it('round-trips passwords that contain cookie delimiters', () => {
    for (const pw of ['p@ss; word%100%', 'café — 合同']) {
      const encoded = encodeDashboardAuthCookie(pw);
      expect(encoded).not.toMatch(/[+/=;%\s]/);
      expect(decodeDashboardAuthCookie(encoded)).toBe(pw);
    }
    const pw = 'p@ss; word%100%';
    const encoded = encodeDashboardAuthCookie(pw);
    const header = dashboardAuthCookieWrite(pw, true);
    expect(header.startsWith(`dashboard_admin_pw=${encoded}`)).toBe(true);
    expect(header).toContain('Path=/dashboard');
    expect(header).toContain('SameSite=Lax');
    expect(header).toContain('; Secure');
  });
});

describe('command center page is not in the anonymous RSC payload', () => {
  it('does not query or render monitoring without the staff cookie', async () => {
    const now = new Date().toISOString();
    db.respond = () => ({
      data: [{ check: 'url', target: 'https://secret.example/leak', ok: true, ts: now, duration_ms: 1, detail: 'LEAK_MARKER' }],
      error: null,
      count: 7,
    });
    const { default: Page } = await import('@/app/dashboard/command-center/page');
    const html = renderToStaticMarkup(await Page());
    expect(html).toContain('Sign in to load command center data');
    expect(html).not.toContain('LEAK_MARKER');
    expect(html).not.toContain('secret.example');
    expect(html).not.toMatch(/\d+\/\d+ UP/);
    expect(db.calls).toEqual([]);
  });

  it('renders monitoring when the cookie is the admin password', async () => {
    const { encodeDashboardAuthCookie } = await import('@/lib/dashboard-auth-cookie');
    authCookie.value = encodeDashboardAuthCookie('admin-pw');
    const now = new Date().toISOString();
    db.respond = (t) =>
      t === 'synthetic_checks'
        ? { data: [{ check: 'url', target: 'https://govcongiants.com/', ok: true, ts: now, duration_ms: 90, detail: null }], error: null }
        : t === 'site_events'
          ? { data: [{ ts: now, event: 'page_view', label: null, page: '/', meta: {} }], error: null, count: 0 }
          : { data: [{ ts: now, source: 'free-course', duplicate: false, ghl_ok: true, supabase_ok: true, slack_ok: true, email_ok: true, duration_ms: 400 }], error: null };
    const { default: Page } = await import('@/app/dashboard/command-center/page');
    const html = renderToStaticMarkup(await Page());
    expect(html).toContain('1/1 UP');
    expect(db.calls.length).toBeGreaterThan(0);
  });

  it('a wrong cookie is the same as no cookie', async () => {
    const { encodeDashboardAuthCookie } = await import('@/lib/dashboard-auth-cookie');
    authCookie.value = encodeDashboardAuthCookie('not-the-password');
    const { default: Page } = await import('@/app/dashboard/command-center/page');
    const html = renderToStaticMarkup(await Page());
    expect(html).toContain('Sign in to load command center data');
    expect(db.calls).toEqual([]);
  });
});

// ---- 5. controlled production proof of dedupe -----------------------------------

describe('POST /api/command-center/alert-selftest', async () => {
  const { POST } = await import('@/app/api/command-center/alert-selftest/route');
  const req = (pw?: string) =>
    new NextRequest('https://govcongiants.com/api/command-center/alert-selftest', {
      method: 'POST',
      headers: pw ? { 'x-admin-password': pw } : {},
    });
  const slackPosts = () => fetchMock.mock.calls.filter(([u]) => String(u).includes('hooks.slack.test'));

  it('requires the admin password and sends nothing without it', async () => {
    expect((await POST(req())).status).toBe(401);
    expect(slackPosts()).toEqual([]);
  });

  it('working dedupe: exactly one Slack post, second attempt suppressed', async () => {
    // Stateful cc_alert_log: the dedupe count reflects rows actually inserted.
    const logged: unknown[] = [];
    db.respond = (t, op) => {
      if (t !== 'cc_alert_log') return { data: [], error: null, count: 0 };
      if (op === 'insert') {
        logged.push(db.calls.at(-1)?.payload);
        return { data: null, error: null };
      }
      return { data: logged.map((_, i) => ({ id: i + 1 })), error: null, count: logged.length };
    };
    const json = await (await POST(req('admin-pw'))).json();
    expect(json.ok).toBe(true);
    expect(json.verdict).toMatch(/^proven/);
    expect(json.first).toEqual({ sent: true, status: 'sent' });
    expect(json.second).toEqual({ sent: false, status: 'deduped', reason: 'deduped (4h window)' });
    expect(slackPosts()).toHaveLength(1);
    expect(String(JSON.parse(String(slackPosts()[0][1]?.body)).text)).toContain('Controlled dedupe self-test');
    expect(logged).toEqual([expect.objectContaining({ alert_key: 'cc-dedupe-selftest' })]);
  });

  it('dedupe store unreadable: both withheld, reported as paused, ok=false', async () => {
    db.respond = (t) => missing(t);
    const json = await (await POST(req('admin-pw'))).json();
    expect(json.ok).toBe(false);
    expect(json.verdict).toMatch(/^alerting paused/);
    expect(slackPosts()).toEqual([]);
  });
});

// ---- 6. dedupe read failures: every mode withholds Slack and reports PAUSED -----

describe('alerting status: every unreadable-dedupe mode is paused, never sent', async () => {
  const { sendAlert, DEDUPE_TIMEOUT_MS } = await import('@/lib/command-center');
  const { GET } = await import('@/app/api/cron/synthetic-checks/route');
  const slackPosts = () => fetchMock.mock.calls.filter(([u]) => String(u).includes('hooks.slack.test')).length;

  /** Drive fake timers until `p` settles (sequential 5s timeouts inside the cron). */
  async function settle<T>(p: Promise<T>): Promise<T> {
    let done = false;
    p.then(() => (done = true), () => (done = true));
    for (let i = 0; i < 200 && !done; i++) await vi.advanceTimersByTimeAsync(1000);
    return p;
  }
  const never = () => new Promise<Resp>(() => {});

  const MODES: [string, () => Answer][] = [
    ['missing table', () => missing('cc_alert_log')],
    ['permission error', () => ({ data: null, error: { message: 'permission denied for table cc_alert_log' } })],
    ['timeout returned as an error', () => ({ data: null, error: { message: 'TypeError: fetch failed' } })],
    ['thrown exception', () => ({ throws: new Error('The operation was aborted due to timeout') })],
    ['no error and no rows array', () => ({ data: null, error: null, count: null })],
    ['hang (never answers)', never],
  ];

  beforeEach(() => vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] }));
  afterEach(() => vi.useRealTimers());

  it.each(MODES)('sendAlert — %s → status paused, nothing posted', async (_n, answer) => {
    db.respond = (t) => (t === 'cc_alert_log' ? answer() : { data: [], error: null, count: 0 });
    const r = await settle(sendAlert('k', 'm'));
    expect(r.status).toBe('paused');
    expect(r.sent).toBe(false);
    expect(slackPosts()).toBe(0);
    expect(db.calls.some((c) => c.table === 'cc_alert_log' && c.op === 'insert')).toBe(false);
  });

  it.each(MODES)('cron — %s → alerting PAUSED, nothing posted', async (_n, answer) => {
    db.respond = (t) => (t === 'cc_alert_log' ? answer() : { data: [], error: null, count: 0 });
    // Every probe fails, so every check tries to alert.
    fetchMock.mockImplementation(async (u) =>
      String(u).includes('hooks.slack.test') ? new Response('{}') : new Response('down', { status: 500 }),
    );
    const res = await settle(
      GET(new NextRequest('https://govcongiants.com/api/cron/synthetic-checks', { headers: { authorization: 'Bearer cron-secret' } })),
    );
    const json = await res.json();
    expect(json.alerting).toMatch(/^PAUSED/);
    expect(json.ok).toBe(false);
    expect(json.alertsSent).toEqual([]);
    expect(slackPosts()).toBe(0);
  });

  it('a timed-out read is aborted, and a LATE answer can never resume the send', async () => {
    let lateResolve!: (r: Resp) => void;
    db.respond = (t, op) =>
      t === 'cc_alert_log' && op === 'select'
        ? new Promise<Resp>((resolve) => (lateResolve = resolve))
        : { data: null, error: null };

    const r = await settle(sendAlert('k', 'm'));
    expect(r).toMatchObject({ sent: false, status: 'paused' });
    expect(r.reason).toContain(`timed out after ${DEDUPE_TIMEOUT_MS}ms`);
    expect(db.signals.at(-1)?.aborted).toBe(true);

    // The hung read now "succeeds" with no duplicate — the answer that would have sent.
    lateResolve({ data: [], error: null });
    await vi.advanceTimersByTimeAsync(10_000);
    expect(slackPosts()).toBe(0);
    expect(db.calls.some((c) => c.table === 'cc_alert_log' && c.op === 'insert')).toBe(false);
  });

  it('control — existing EMPTY dedupe table: first alert sent + recorded, repeat suppressed', async () => {
    const logged: unknown[] = [];
    db.respond = (t, op) => {
      if (t !== 'cc_alert_log') return { data: [], error: null };
      if (op === 'insert') {
        logged.push(db.calls.at(-1)?.payload);
        return { data: null, error: null };
      }
      return { data: logged.map((_, i) => ({ id: i + 1 })), error: null };
    };
    expect(await settle(sendAlert('k', 'm'))).toEqual({ sent: true, status: 'sent' });
    expect(await settle(sendAlert('k', 'm'))).toEqual({ sent: false, status: 'deduped', reason: 'deduped (4h window)' });
    expect(slackPosts()).toBe(1);
    expect(logged).toEqual([expect.objectContaining({ alert_key: 'k' })]);
  });
});
