import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

/**
 * Mindy Launch confirmation handoff records what actually happened (issue #215).
 *
 * /api/lead used to fire `void fetch(getmindy.ai …)` and log `email_ok: true` for every
 * mindy-launch signup, because the local email step no-ops for that source and said ok.
 * A failed or abandoned handoff was invisible to the pipeline alert.
 *
 * These tests run the real route, the real handoff module and the real pipeline logger.
 * Only `fetch` (getmindy.ai) and Supabase are faked; `after` is a collector run once the
 * response exists, as the platform does. They pin:
 *   1. The handoff runs after the response, exactly once, and is never retried.
 *   2. Only a stated provider acceptance is `confirmed` (email_ok true). A refusal, a
 *      guard block or a provider failure is `failed`; a timeout, a network error or a
 *      bare HTTP 200 is `pending`. Both are email_ok false, so the alert counts them.
 *   3. Normal signups, duplicate submits and synthetic leads behave as before.
 */

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://cc.test.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-test';
});

const deferred = vi.hoisted(() => ({ tasks: [] as (() => unknown)[] }));
vi.mock('next/server', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: (task: () => unknown) => {
    deferred.tasks.push(task);
  },
}));
const runDeferred = () => Promise.all(deferred.tasks.splice(0).map((t) => Promise.resolve(t())));

const db = vi.hoisted(() => ({ inserts: [] as { table: string; payload: Record<string, unknown> }[] }));
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => ({
      insert: (payload: Record<string, unknown>) => {
        db.inserts.push({ table, payload });
        return Promise.resolve({ data: null, error: null });
      },
    }),
  }),
}));

const crm = vi.hoisted(() => ({ sendLeadToCrm: vi.fn() }));
const leads = vi.hoisted(() => ({ saveLeadToSupabase: vi.fn(), recentDuplicateExists: vi.fn() }));
const mail = vi.hoisted(() => ({ sendConfirmationEmail: vi.fn() }));
vi.mock('@/lib/crm', () => crm);
vi.mock('@/lib/supabase-leads', () => leads);
vi.mock('@/lib/email', () => mail);
vi.mock('@/lib/rate-limit', () => ({ enforceIpRateLimit: vi.fn(async () => null) }));

const { POST } = await import('@/app/api/lead/route');
const { pipelineFailureRates } = await import('@/lib/command-center');
const { confirmationLogFields } = await import('@/lib/mindy-launch-handoff');

const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
const SEND_URL = 'https://getmindy.ai/api/mindy-launch/send-confirmation';
const handoffCalls = () => fetchMock.mock.calls.filter(([u]) => String(u) === SEND_URL);
const logRow = () => {
  const rows = db.inserts.filter((i) => i.table === 'lead_pipeline_log');
  expect(rows).toHaveLength(1);
  return rows[0].payload;
};

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest('https://govcongiants.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}
const REGISTRANT = { name: 'Jane Doe', email: 'jane@acme.co', source: 'mindy-launch', tags: ['mindy-launch', 'mindy-leads'] };
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** Submit a registration, check the response is unchanged, then run post-response work. */
async function register() {
  const res = await POST(leadRequest(REGISTRANT));
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body.success).toBe(true);
  expect(handoffCalls()).toHaveLength(0); // nothing sent before the response exists
  await runDeferred();
  return body;
}

let errorSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  process.env.MINDY_LAUNCH_SEND_URL = SEND_URL;
  process.env.MINDY_LAUNCH_SEND_SECRET = 'handoff-secret';
  deferred.tasks.length = 0;
  db.inserts.length = 0;
  crm.sendLeadToCrm.mockResolvedValue({ ghl: { ok: true, contactId: 'c1' }, slack: { ok: true } });
  leads.saveLeadToSupabase.mockResolvedValue({ ok: true });
  leads.recentDuplicateExists.mockResolvedValue(false);
  mail.sendConfirmationEmail.mockResolvedValue({ ok: true, messageId: 'local-1' });
  fetchMock.mockResolvedValue(json(200, { ok: true, status: 'accepted', provider: 'resend', providerMessageId: 're_1' }));
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.MINDY_LAUNCH_SEND_URL;
  delete process.env.MINDY_LAUNCH_SEND_SECRET;
  delete process.env.MINDY_LAUNCH_SEND_TIMEOUT_MS;
});

describe('successful handoff', () => {
  it('runs after the response, once, and is recorded as confirmed', async () => {
    const body = await register();
    expect(body.email).toMatchObject({ ok: false, status: 'pending' }); // response never claims a send
    expect(handoffCalls()).toHaveLength(1);
    const [, init] = handoffCalls()[0];
    expect((init as RequestInit).headers).toMatchObject({ authorization: 'Bearer handoff-secret' });
    expect(JSON.parse(String((init as RequestInit).body))).toEqual({ email: 'jane@acme.co', name: 'Jane Doe' });
    expect(mail.sendConfirmationEmail).not.toHaveBeenCalled();
    expect(logRow()).toMatchObject({ source: 'mindy-launch', email_ok: true, email_error: null, ghl_ok: true });
  });
});

describe('outcomes that are not confirmed are never recorded as success', () => {
  it.each([
    ['getmindy.ai refuses (401)', () => json(401, { error: 'Unauthorized' }), 'failed: refused by getmindy.ai: HTTP 401'],
    ['downstream email failure (both providers)', () => json(502, { ok: false, status: 'failed', error: 'SMTP auth failed' }), 'failed: provider failed at getmindy.ai: SMTP auth failed'],
    ['send guard block', () => json(422, { ok: false, status: 'blocked', reason: 'synthetic_client_address' }), 'failed: blocked by getmindy.ai send guard'],
    ['bare HTTP 200 with ok:true (no stated acceptance)', () => json(200, { ok: true }), 'pending: HTTP 200 without a stated provider acceptance'],
    ['HTTP 200 with ok:false', () => json(200, { ok: false }), 'pending: HTTP 200'],
    ['unstructured 504', () => new Response('gateway timeout', { status: 504 }), 'pending: HTTP 504'],
  ])('%s', async (_name, response, expected) => {
    fetchMock.mockImplementation(async () => response());
    await register();
    const row = logRow();
    expect(row.email_ok).toBe(false);
    expect(String(row.email_error)).toContain(expected);
    expect(handoffCalls()).toHaveLength(1); // no retry
    expect(errorSpy).toHaveBeenCalledWith('mindy-launch confirmation not confirmed:', expect.objectContaining({ email: expect.not.stringContaining('jane@') }));
  });

  it('network rejection is pending (the request may have reached getmindy.ai), not retried', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'));
    await register();
    expect(logRow()).toMatchObject({ email_ok: false });
    expect(String(logRow().email_error)).toMatch(/^pending: request error \(fetch failed\)/);
    expect(handoffCalls()).toHaveLength(1);
  });

  it('timeout is pending, the log row is still written, and there is no retry', async () => {
    process.env.MINDY_LAUNCH_SEND_TIMEOUT_MS = '40';
    fetchMock.mockImplementation((_u: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener('abort', () => reject(init.signal?.reason));
    }));
    await register();
    expect(logRow()).toMatchObject({ email_ok: false });
    expect(String(logRow().email_error)).toBe('pending: no response after 40ms; provider acceptance unknown');
    expect(handoffCalls()).toHaveLength(1);
  });

  it('missing configuration is failed and makes no call', async () => {
    delete process.env.MINDY_LAUNCH_SEND_SECRET;
    await register();
    expect(handoffCalls()).toHaveLength(0);
    expect(String(logRow().email_error)).toMatch(/^failed: not configured/);
  });
});

describe('failures reach the monitoring logic', () => {
  it('pending and failed confirmations count as email failures; only confirmed counts as success', () => {
    const base = { ghl_ok: true, supabase_ok: true, slack_ok: true };
    const toRow = (f: { email_ok: boolean; email_error?: string }) => ({ ...base, email_ok: f.email_ok, email_error: f.email_error ?? null });
    const rows = [
      ...Array.from({ length: 8 }, () => toRow(confirmationLogFields({ state: 'confirmed', provider: 'resend', providerMessageId: 'x' }))),
      toRow(confirmationLogFields({ state: 'pending', reason: 'no response after 15000ms' })),
      toRow(confirmationLogFields({ state: 'failed', reason: 'provider failed' })),
      { ...base, email_ok: null, email_error: null }, // not attempted: excluded
    ];
    const email = pipelineFailureRates(rows).find((d) => d.dest === 'email')!;
    expect(email).toEqual({ dest: 'email', attempted: 10, failed: 2, rate: 0.2, pending: 1 });
    expect(email.rate).toBeGreaterThan(0.05); // the alert threshold
  });
});

describe('existing behavior is unchanged', () => {
  it('a normal signup still sends its own confirmation before the response and makes no handoff', async () => {
    const res = await POST(leadRequest({ name: 'Al', email: 'al@acme.co', source: 'free-handouts' }));
    expect((await res.json()).email).toEqual({ ok: true, messageId: 'local-1' });
    expect(mail.sendConfirmationEmail).toHaveBeenCalledOnce();
    await runDeferred();
    expect(handoffCalls()).toHaveLength(0);
    expect(logRow()).toMatchObject({ source: 'free-handouts', email_ok: true });
  });

  it('a duplicate submit within the guard window makes no second handoff', async () => {
    leads.recentDuplicateExists.mockResolvedValue(true);
    const res = await POST(leadRequest(REGISTRANT));
    expect(await res.json()).toEqual({ success: true, duplicate: true });
    await runDeferred();
    expect(handoffCalls()).toHaveLength(0);
    expect(logRow()).toMatchObject({ duplicate: true });
  });

  it('a synthetic registration makes no handoff and writes nothing', async () => {
    const res = await POST(leadRequest({ email: 'canary+1@example.com', source: 'mindy-launch' }));
    expect((await res.json()).suppressed).toBe(true);
    expect(deferred.tasks).toHaveLength(0);
    expect(handoffCalls()).toHaveLength(0);
    expect(db.inserts).toHaveLength(0);
  });
});
