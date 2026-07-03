import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/mindy-reignite', () => ({
  runSend: vi.fn(async () => ({ advanced: 0, waiting: 0, exited: 0, finished: 0 })),
  runSeed: vi.fn(async () => ({ enrolled: 0, failed: 0 })),
  seedQuotaForDay: vi.fn(() => 50),
  AUDIENCE_TAG: 'mindy-profile-incomplete',
  STAGE_TAGS: ['reignite-d0'],
  DONE_TAG: 'reignite-done',
  EXITED_TAG: 'reignite-exited',
}));

import { GET } from '../route';
import { runSeed, runSend } from '@/lib/mindy-reignite';

const ORIGINAL_ENV = { ...process.env };

function request(headers: HeadersInit = {}) {
  return new NextRequest('https://govcongiants.com/api/cron/mindy-reignite?dry=true', { headers });
}

describe('/api/cron/mindy-reignite', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      CRON_SECRET: 'cron-secret',
      GHL_API_KEY: 'ghl-token',
      GHL_LOCATION_ID: 'location-id',
    };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ contacts: [] }),
    } as Response);
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects spoofed Vercel cron headers', async () => {
    const response = await GET(request({ 'x-vercel-cron': '1' }));

    expect(response.status).toBe(401);
    expect(runSend).not.toHaveBeenCalled();
    expect(runSeed).not.toHaveBeenCalled();
  });

  it('accepts the configured Bearer cron secret', async () => {
    const response = await GET(request({ authorization: 'Bearer cron-secret' }));

    expect(response.status).toBe(200);
    expect(runSend).toHaveBeenCalledOnce();
    expect(runSeed).toHaveBeenCalledOnce();
  });
});
