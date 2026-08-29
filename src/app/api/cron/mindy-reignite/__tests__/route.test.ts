import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

function request(url: string, headers?: HeadersInit) {
  return new NextRequest(url, { headers });
}

describe('/api/cron/mindy-reignite', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.GHL_API_KEY;
    delete process.env.MINDY_REIGNITE_EMAIL_ENABLED;
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects spoofed Vercel cron headers without a real shared secret', async () => {
    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      'x-vercel-cron': '1',
    }));

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  it('keeps live cron sends disabled by default even with the configured bearer secret', async () => {
    process.env.CRON_SECRET = 'cron-secret';

    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      authorization: 'Bearer cron-secret',
    }));

    expect(res.status).toBe(409);
    await expect(res.json()).resolves.toEqual({
      success: false,
      error: 'Mindy Re-Ignite email drip is disabled. Set MINDY_REIGNITE_EMAIL_ENABLED=true to resume live sends.',
    });
  });

  it('keeps manual live runs disabled by default even with the configured admin password', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';

    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite?password=admin-secret'));

    expect(res.status).toBe(409);
    await expect(res.json()).resolves.toEqual({
      success: false,
      error: 'Mindy Re-Ignite email drip is disabled. Set MINDY_REIGNITE_EMAIL_ENABLED=true to resume live sends.',
    });
  });

  it('requires GHL credentials after live sends are explicitly enabled', async () => {
    process.env.CRON_SECRET = 'cron-secret';
    process.env.MINDY_REIGNITE_EMAIL_ENABLED = 'true';

    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      authorization: 'Bearer cron-secret',
    }));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: 'GHL_API_KEY not set' });
  });
});
