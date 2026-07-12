import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

function request(headers?: HeadersInit) {
  return new NextRequest('https://govcongiants.com/api/cron/mindy-reignite', { headers });
}

describe('mindy re-ignite cron auth', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...ORIGINAL_ENV, CRON_SECRET: 'cron-secret' };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects spoofed Vercel cron headers without the shared secret', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const res = await GET(request({ 'x-vercel-cron': '1' }));

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('still accepts the configured Bearer cron secret', async () => {
    delete process.env.GHL_API_KEY;

    const res = await GET(request({ authorization: 'Bearer cron-secret' }));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: 'GHL_API_KEY not set' });
  });
});
