import { afterEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

const ORIGINAL_ENV = process.env;

function req(headers?: HeadersInit) {
  return new NextRequest('https://govcongiants.com/api/cron/mindy-reignite', { headers });
}

describe('mindy re-ignite cron auth', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects spoofed Vercel cron headers without a secret', async () => {
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    const res = await GET(req({ 'x-vercel-cron': '1' }));

    expect(res.status).toBe(401);
  });

  it('accepts only the configured cron bearer secret', async () => {
    process.env.CRON_SECRET = 'real-cron-secret';
    delete process.env.GHL_API_KEY;

    const rejected = await GET(req({ authorization: 'Bearer wrong-secret' }));
    const accepted = await GET(req({ authorization: 'Bearer real-cron-secret' }));

    expect(rejected.status).toBe(401);
    expect(accepted.status).toBe(500);
    await expect(accepted.json()).resolves.toMatchObject({ error: 'GHL_API_KEY not set' });
  });
});
