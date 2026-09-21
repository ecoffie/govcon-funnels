import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GET } from '../[type]/route';

const ORIGINAL_ENV = { ...process.env };

/** Fixtures invented for the test — never a real secret. */
const CRON = 'test-cron-secret-value';
const ADMIN = 'test-admin-secret-value';

const BASE = 'https://govcongiants.com/api/cron/mindy-day-reminders';

function call(path: string, type: string, headers?: HeadersInit) {
  return GET(new NextRequest(`${BASE}/${path}`, { headers }), {
    params: Promise.resolve({ type }),
  });
}

/**
 * Every authorized case below uses an INVALID type on purpose: the route
 * validates the type immediately after the auth gate and returns 400 before it
 * reads Supabase, claims a Redis idempotency key, or sends anything. So a 400
 * means "the gate let me through" with zero side effects, and a 401 means it
 * did not.
 */
describe('/api/cron/mindy-day-reminders/[type] auth gate', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects an unauthenticated call', async () => {
    process.env.CRON_SECRET = CRON;
    const res = await call('bogus', 'bogus');
    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  it('rejects a spoofed Vercel cron header carrying no secret', async () => {
    process.env.CRON_SECRET = CRON;
    const res = await call('bogus', 'bogus', { 'x-vercel-cron': '1' });
    expect(res.status).toBe(401);
  });

  it("accepts the dispatcher's bearer cron secret", async () => {
    process.env.CRON_SECRET = CRON;
    const res = await call('bogus', 'bogus', {
      authorization: `Bearer ${CRON}`,
      'x-cron-dispatch': '1',
    });
    expect(res.status).toBe(400); // past the gate, stopped by type validation
  });

  it('accepts the admin secret via the x-admin-password header', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    const res = await call('bogus', 'bogus', { 'x-admin-password': ADMIN });
    expect(res.status).toBe(400);
  });

  // ── THE REGRESSION THIS PR EXISTS FOR ────────────────────────────────────
  // Five cron_jobs rows fired this route with `?password=<secret>` in the URL,
  // putting the credential at rest in the scheduler's database and in every
  // access log — while the dispatcher's bearer header was authenticating the
  // call anyway. A query-string credential must no longer work.
  it('REJECTS a credential supplied in the query string', async () => {
    process.env.CRON_SECRET = CRON;
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;

    const viaAdminPw = await GET(
      new NextRequest(`${BASE}/live?password=${ADMIN}`),
      { params: Promise.resolve({ type: 'live' }) }
    );
    expect(viaAdminPw.status).toBe(401);

    const viaCronSecret = await GET(
      new NextRequest(`${BASE}/live?password=${CRON}`),
      { params: Promise.resolve({ type: 'live' }) }
    );
    expect(viaCronSecret.status).toBe(401);
  });

  it('no response body ever echoes a supplied credential', async () => {
    process.env.CRON_SECRET = CRON;
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    const res = await GET(new NextRequest(`${BASE}/live?password=${ADMIN}`), {
      params: Promise.resolve({ type: 'live' }),
    });
    const body = await res.text();
    expect(body).not.toContain(ADMIN);
    expect(body).not.toContain(CRON);
    expect(body).not.toMatch(/password=/);
  });
});
