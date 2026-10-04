import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

/**
 * Synthetic-lead suppression (2026-10-03).
 *
 * The retired `canary-lead` probe POSTed canary+<ts>@example.com through the real
 * /api/lead every 15 minutes: GHL + Supabase writes, Slack/webhook pings, and a real
 * "there, Welcome to GovCon Giants!" email each run. These tests pin:
 *   1. /api/lead stops synthetic leads BEFORE every side effect and says so.
 *   2. The email sender refuses synthetic recipients on its own (defense in depth).
 *   3. Neither the scheduled cron nor the manual verify endpoint submits a lead.
 *   4. A normal signup still fans out to every destination.
 */

// ---- mocks: every side effect /api/lead can reach ------------------------------

const crm = vi.hoisted(() => ({ sendLeadToCrm: vi.fn() }));
const leads = vi.hoisted(() => ({ saveLeadToSupabase: vi.fn(), recentDuplicateExists: vi.fn() }));
const mail = vi.hoisted(() => ({ resendSend: vi.fn(), smtpSend: vi.fn(), smtpVerify: vi.fn() }));
const cc = vi.hoisted(() => ({ logLeadPipeline: vi.fn(), recordCheck: vi.fn(), sendAlert: vi.fn() }));

vi.mock('@/lib/crm', () => crm);
vi.mock('@/lib/supabase-leads', () => leads);
vi.mock('@/lib/rate-limit', () => ({ enforceIpRateLimit: vi.fn(async () => null) }));
vi.mock('@/lib/command-center', () => ({ ccClient: null, ...cc }));
vi.mock('@/lib/admin-auth', () => ({
  extractPassword: (req: NextRequest) => req.headers.get('x-admin-password'),
  isAuthorized: (p: string | null | undefined) => p === 'admin-pw',
}));
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mail.resendSend };
  },
}));
vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail: mail.smtpSend, verify: mail.smtpVerify }) },
}));

process.env.RESEND_API_KEY = 'test-resend-key';
process.env.SMTP_USER = 'smtp@test';
process.env.SMTP_PASSWORD = 'smtp-pw';

const fetchMock = global.fetch as ReturnType<typeof vi.fn>;

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest('https://govcongiants.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  crm.sendLeadToCrm.mockResolvedValue({
    ghl: { ok: true, contactId: 'c1' },
    webhook: { ok: true },
    slack: { ok: true },
  });
  leads.saveLeadToSupabase.mockResolvedValue({ ok: true });
  leads.recentDuplicateExists.mockResolvedValue(false);
  cc.sendAlert.mockResolvedValue({ sent: false, reason: 'test' });
  cc.recordCheck.mockResolvedValue({ ok: true });
  mail.resendSend.mockResolvedValue({ data: { id: 'msg_1' }, error: null });
  mail.smtpSend.mockResolvedValue({ messageId: 'smtp_1', accepted: [], rejected: [] });
  fetchMock.mockImplementation(async () => new Response('<urlset><url></url></urlset>', { status: 200 }));
});

afterEach(() => {
  delete process.env.MINDY_LAUNCH_SEND_URL;
  delete process.env.MINDY_LAUNCH_SEND_SECRET;
});

function expectNoSideEffects() {
  expect(leads.recentDuplicateExists).not.toHaveBeenCalled();
  expect(crm.sendLeadToCrm).not.toHaveBeenCalled(); // GHL + generic webhook + Slack
  expect(leads.saveLeadToSupabase).not.toHaveBeenCalled();
  expect(mail.resendSend).not.toHaveBeenCalled();
  expect(mail.smtpSend).not.toHaveBeenCalled();
  expect(cc.logLeadPipeline).not.toHaveBeenCalled();
  expect(fetchMock).not.toHaveBeenCalled(); // mindy-launch handoff or any other outbound call
}

// ---- 1. classifier -------------------------------------------------------------

describe('syntheticLeadReason', async () => {
  const { syntheticLeadReason, syntheticRecipientReason } = await import('@/lib/synthetic-lead');

  it.each([
    'canary+1759500000000@example.com',
    'x@EXAMPLE.COM',
    'x@mail.example.org',
    'x@foo.test',
    'x@foo.invalid',
    'x@localhost',
  ])('flags reserved address %s', (email) => {
    expect(syntheticRecipientReason(email)).not.toBeNull();
  });

  it.each(['jane@acme.co', 'bob@examples.com', 'ann@notexample.com', 'cto@testing.io'])(
    'does not flag real address %s',
    (email) => {
      expect(syntheticRecipientReason(email)).toBeNull();
      expect(syntheticLeadReason({ email, source: 'free-course' })).toBeNull();
    },
  );

  it('flags the canary source even with a real-looking address', () => {
    expect(syntheticLeadReason({ email: 'jane@acme.co', source: 'canary' })).toMatch(/canary/);
  });
});

// ---- 2. /api/lead --------------------------------------------------------------

describe('POST /api/lead — synthetic leads are suppressed before every side effect', async () => {
  const { POST } = await import('@/app/api/lead/route');

  it.each([
    { email: 'canary+1759500000000@example.com', source: 'canary' }, // the retired probe, verbatim
    { email: 'jane@acme.co', source: 'canary' },
    { email: 'qa@example.com', source: 'free-course' },
  ])('suppresses %o', async (body) => {
    const res = await POST(leadRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.suppressed).toBe(true);
    expect(json.delivered).toBe(false);
    expect(typeof json.reason).toBe('string');
    expect(json).not.toHaveProperty('success'); // never claims delivery
    expectNoSideEffects();
  });

  it('suppresses the mindy-launch cross-site handoff too', async () => {
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.ai/api/launch-send';
    process.env.MINDY_LAUNCH_SEND_SECRET = 's';
    const res = await POST(leadRequest({ email: 'qa@example.com', source: 'mindy-launch' }));
    expect((await res.json()).suppressed).toBe(true);
    expectNoSideEffects();
  });

  it('a normal signup still reaches every destination', async () => {
    const res = await POST(leadRequest({ email: 'jane@acme.co', name: 'Jane Doe', source: 'free-course' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json).not.toHaveProperty('suppressed');
    expect(leads.recentDuplicateExists).toHaveBeenCalledOnce();
    expect(crm.sendLeadToCrm).toHaveBeenCalledOnce();
    expect(leads.saveLeadToSupabase).toHaveBeenCalledOnce();
    expect(mail.resendSend).toHaveBeenCalledOnce();
    expect(mail.resendSend.mock.calls[0][0].to).toEqual(['jane@acme.co']);
    expect(cc.logLeadPipeline).toHaveBeenCalledOnce();
    expect(json.email.ok).toBe(true);
  });
});

// ---- 3. email sender guard (defense in depth) ----------------------------------

describe('email sender refuses synthetic recipients', async () => {
  const email = await import('@/lib/email');

  it('sendConfirmationEmail (Resend/Gmail path) does not send', async () => {
    const r = await email.sendConfirmationEmail({ to: 'canary+1@example.com', name: '', source: 'canary' });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/^suppressed: synthetic recipient/);
    expect(mail.resendSend).not.toHaveBeenCalled();
    expect(mail.smtpSend).not.toHaveBeenCalled();
  });

  it('sendProposalResourcesEmail (direct SMTP path) does not send', async () => {
    const r = await email.sendProposalResourcesEmail({ to: 'qa@foo.test', name: 'QA' });
    expect(r.ok).toBe(false);
    expect(mail.smtpVerify).not.toHaveBeenCalled();
    expect(mail.smtpSend).not.toHaveBeenCalled();
  });

  it('still sends to a real recipient', async () => {
    const r = await email.sendGenericWelcomeEmail({ to: 'jane@acme.co', name: 'Jane', source: 'x' });
    expect(r.ok).toBe(true);
    expect(mail.resendSend).toHaveBeenCalledOnce();
  });
});

// ---- 4. scheduled + manual verification paths ----------------------------------

function expectNoLeadSubmitted() {
  const calls = fetchMock.mock.calls as [string, RequestInit | undefined][];
  expect(calls.length).toBeGreaterThan(0); // the read-only checks did run
  for (const [url, init] of calls) {
    expect(String(url)).not.toMatch(/\/api\/lead/);
    expect(init?.method ?? 'GET').toBe('GET');
  }
  expect(cc.recordCheck.mock.calls.map(([row]) => row.check)).not.toContain('canary-lead');
  expect(crm.sendLeadToCrm).not.toHaveBeenCalled();
  expect(mail.resendSend).not.toHaveBeenCalled();
}

describe('synthetic suite no longer submits a lead', () => {
  it('scheduled path: GET /api/cron/synthetic-checks (Vercel cron auth)', async () => {
    process.env.CRON_SECRET = 'cron-secret';
    const { GET } = await import('@/app/api/cron/synthetic-checks/route');
    const res = await GET(
      new NextRequest('https://govcongiants.com/api/cron/synthetic-checks', {
        headers: { authorization: 'Bearer cron-secret' },
      }),
    );
    expect(res.status).toBe(200);
    expectNoLeadSubmitted();
  });

  it('manual path: POST /api/command-center/verify', async () => {
    const { POST } = await import('@/app/api/command-center/verify/route');
    const res = await POST(
      new NextRequest('https://govcongiants.com/api/command-center/verify', {
        method: 'POST',
        headers: { 'x-admin-password': 'admin-pw' },
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.checks.map((c: { check: string }) => c.check)).not.toContain('canary-lead');
    expectNoLeadSubmitted();
  });
});
