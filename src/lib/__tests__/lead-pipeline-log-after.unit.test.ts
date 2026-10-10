import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

/**
 * Lead pipeline log must outlive the response (2026-10-10).
 *
 * The route used to write `lead_pipeline_log` with a bare `void logLeadPipeline(...)`.
 * Vercel can freeze a function once the response is sent, so that insert could be
 * lost. A 2026-10-05 mindy-launch signup was saved to funnel_leads and got its
 * confirmation email, but has no log row. That also hid its GHL result from the
 * failure-rate alert.
 *
 * The write now goes through next/server `after()`. These tests run the real
 * route and the real logLeadPipeline against a fake Supabase client. `after` is
 * replaced with a collector that runs the work only once the response exists,
 * as the platform does. They pin:
 *   1. The response is returned before the log insert runs, and the deferred
 *      task does not settle until that delayed insert does.
 *   2. A rejected insert or an error result is logged with console.error and
 *      never breaks the response.
 *   3. The duplicate-submit and synthetic guards behave as before.
 */

// ---- env: the real command-center client is built at import time ---------------
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://cc.test.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-test';
});

// ---- deferred work: what route code handed to after() --------------------------
const deferred = vi.hoisted(() => ({ tasks: [] as (() => unknown)[] }));
vi.mock('next/server', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: (task: () => unknown) => {
    deferred.tasks.push(task);
  },
}));

/** Run deferred work the way the platform does: after the response exists. */
function runDeferred(): Promise<unknown>[] {
  const tasks = deferred.tasks.splice(0);
  return tasks.map((t) => Promise.resolve(t()));
}

// ---- fake Supabase: each lead_pipeline_log insert answers from `db.answer` ------
type Resp = { data?: unknown; error: { message: string } | null };
const db = vi.hoisted(() => ({
  inserts: [] as { table: string; payload: Record<string, unknown> }[],
  signals: [] as AbortSignal[],
  answer: (): Promise<Resp> => Promise.resolve({ data: null, error: null }),
}));
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => ({
      insert: (payload: Record<string, unknown>) => {
        db.inserts.push({ table, payload });
        const pending = db.answer();
        return {
          abortSignal: (signal: AbortSignal) => {
            db.signals.push(signal);
            return pending;
          },
        };
      },
    }),
  }),
}));

// ---- every other side effect of /api/lead ---------------------------------------
const crm = vi.hoisted(() => ({ sendLeadToCrm: vi.fn() }));
const leads = vi.hoisted(() => ({ saveLeadToSupabase: vi.fn(), recentDuplicateExists: vi.fn() }));
const mail = vi.hoisted(() => ({ sendConfirmationEmail: vi.fn() }));
vi.mock('@/lib/crm', () => crm);
vi.mock('@/lib/supabase-leads', () => leads);
vi.mock('@/lib/email', () => mail);
vi.mock('@/lib/rate-limit', () => ({ enforceIpRateLimit: vi.fn(async () => null) }));

const { POST } = await import('@/app/api/lead/route');

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest('https://govcongiants.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const REAL = { name: 'Jane Doe', email: 'jane@acme.co', source: 'free-handouts', tags: [] };

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  deferred.tasks.length = 0;
  db.inserts.length = 0;
  db.signals.length = 0;
  db.answer = () => Promise.resolve({ data: null, error: null });
  crm.sendLeadToCrm.mockResolvedValue({
    ghl: { ok: false, contactId: 'c1', error: 'existing contact c1, tag add 500: boom' },
    slack: { ok: true },
  });
  leads.saveLeadToSupabase.mockResolvedValue({ ok: true });
  leads.recentDuplicateExists.mockResolvedValue(false);
  mail.sendConfirmationEmail.mockResolvedValue({ ok: true });
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

const logInserts = () => db.inserts.filter((i) => i.table === 'lead_pipeline_log');

describe('pipeline log is written through after(), not abandoned', () => {
  it('a delayed insert after the response is kept alive until it settles', async () => {
    let finishInsert!: (r: Resp) => void;
    db.answer = () => new Promise<Resp>((resolve) => (finishInsert = resolve));

    const res = await POST(leadRequest(REAL));

    // The response exists and nothing has been written yet: the write is deferred.
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
    expect(logInserts()).toHaveLength(0);
    expect(deferred.tasks).toHaveLength(1);

    // Post-response: the insert starts, and the task handed to after() is the
    // write itself, so the platform waits on it rather than freezing it away.
    const [task] = runDeferred();
    let settled = false;
    void task.then(() => (settled = true));
    await new Promise((r) => setTimeout(r, 20));
    expect(logInserts()).toHaveLength(1);
    expect(settled).toBe(false);

    finishInsert({ data: null, error: null });
    await task;
    expect(settled).toBe(true);

    const row = logInserts()[0].payload;
    expect(row).toMatchObject({
      source: 'free-handouts',
      duplicate: false,
      ghl_ok: false,
      ghl_error: 'existing contact c1, tag add 500: boom',
      supabase_ok: true,
      slack_ok: true,
      email_ok: true,
    });
    expect(row.email).not.toBe(REAL.email); // masked
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringMatching(/^logLeadPipeline/), expect.anything());
  });

  it('the insert is bounded by its own timeout signal', async () => {
    await POST(leadRequest(REAL));
    await Promise.all(runDeferred());
    expect(db.signals).toHaveLength(1);
    expect(db.signals[0]).toBeInstanceOf(AbortSignal);
  });

  it('an aborted (timed-out) insert is reported, not silent', async () => {
    db.answer = () => Promise.reject(Object.assign(new Error('This operation was aborted'), { name: 'TimeoutError' }));
    await POST(leadRequest(REAL));
    await Promise.all(runDeferred());
    expect(errorSpy).toHaveBeenCalledWith('logLeadPipeline threw:', 'This operation was aborted');
  });

  it('a rejected insert is reported with console.error and does not fail the lead', async () => {
    db.answer = () => Promise.reject(new Error('connection reset'));

    const res = await POST(leadRequest(REAL));
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);

    await expect(Promise.all(runDeferred())).resolves.toBeDefined();
    expect(logInserts()).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledWith('logLeadPipeline threw:', 'connection reset');
  });

  it('an insert error result is reported with console.error', async () => {
    db.answer = () => Promise.resolve({ data: null, error: { message: 'permission denied for table lead_pipeline_log' } });

    const res = await POST(leadRequest(REAL));
    expect(res.status).toBe(200);
    await Promise.all(runDeferred());
    expect(errorSpy).toHaveBeenCalledWith('logLeadPipeline failed:', 'permission denied for table lead_pipeline_log');
  });
});

describe('existing guards are unchanged', () => {
  it('lead delivery still runs before the response', async () => {
    const res = await POST(leadRequest(REAL));
    expect(res.status).toBe(200);
    expect(crm.sendLeadToCrm).toHaveBeenCalledOnce();
    expect(leads.saveLeadToSupabase).toHaveBeenCalledOnce();
    expect(mail.sendConfirmationEmail).toHaveBeenCalledOnce();
  });

  it('a recent duplicate submit short-circuits delivery and still logs through after()', async () => {
    leads.recentDuplicateExists.mockResolvedValue(true);

    const res = await POST(leadRequest(REAL));
    expect(await res.json()).toEqual({ success: true, duplicate: true });
    expect(crm.sendLeadToCrm).not.toHaveBeenCalled();
    expect(leads.saveLeadToSupabase).not.toHaveBeenCalled();
    expect(logInserts()).toHaveLength(0);

    await Promise.all(runDeferred());
    expect(logInserts()).toHaveLength(1);
    expect(logInserts()[0].payload).toMatchObject({ duplicate: true, source: 'free-handouts' });
  });

  it('a synthetic lead defers nothing and writes nothing', async () => {
    const res = await POST(leadRequest({ email: 'canary+1@example.com', source: 'canary' }));
    expect((await res.json()).suppressed).toBe(true);
    expect(deferred.tasks).toHaveLength(0);
    expect(db.inserts).toHaveLength(0);
    expect(leads.recentDuplicateExists).not.toHaveBeenCalled();
    expect(crm.sendLeadToCrm).not.toHaveBeenCalled();
  });
});
