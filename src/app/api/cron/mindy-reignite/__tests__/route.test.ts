import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  redisSet: vi.fn(),
  runSend: vi.fn(),
  runSeed: vi.fn(),
}));

vi.mock('@upstash/redis', () => ({
  Redis: class {
    set = mocks.redisSet;
  },
}));

vi.mock('@/lib/mindy-reignite', () => ({
  AUDIENCE_TAG: 'mindy-profile-incomplete',
  STAGE_TAGS: ['reignite-d0'],
  DONE_TAG: 'reignite-done',
  EXITED_TAG: 'reignite-exited',
  seedQuotaForDay: vi.fn(() => 50),
  runSend: mocks.runSend,
  runSeed: mocks.runSeed,
}));

import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

function request(url: string, headers?: HeadersInit) {
  return new NextRequest(url, { headers });
}

beforeEach(() => {
  process.env = {
    ...ORIGINAL_ENV,
    CRON_SECRET: 'cron-secret',
    GHL_API_KEY: 'ghl-token',
    GHL_LOCATION_ID: 'loc-1',
    PURCHASES_ADMIN_PASSWORD: 'admin-secret',
    KV_REST_API_URL: 'https://redis.example.com',
    KV_REST_API_TOKEN: 'redis-token',
  };
  mocks.redisSet.mockResolvedValue('OK');
  mocks.runSend.mockResolvedValue({ advanced: 1, exited: 0, finished: 0, waiting: 0 });
  mocks.runSeed.mockResolvedValue({ audience: 10, eligibleNew: 10, enrolled: 5, failed: 0 });
  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ contacts: [] }),
  } as Response);
});

afterEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe('mindy re-ignite cron route', () => {
  it('rejects spoofed Vercel cron headers without a real secret', async () => {
    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      'x-vercel-cron': '1',
    }));

    expect(res.status).toBe(401);
    expect(mocks.runSend).not.toHaveBeenCalled();
    expect(mocks.runSeed).not.toHaveBeenCalled();
  });

  it('runs when called with the configured cron bearer secret', async () => {
    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      authorization: 'Bearer cron-secret',
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(mocks.redisSet).toHaveBeenCalledWith(
      expect.stringMatching(/^mindy-reignite:run:\d{4}-\d{2}-\d{2}$/),
      expect.any(String),
      { nx: true, ex: 60 * 60 * 36 },
    );
    expect(mocks.runSend).toHaveBeenCalledTimes(1);
    expect(mocks.runSeed).toHaveBeenCalledTimes(1);
  });

  it('skips duplicate real runs before sending or mutating tags', async () => {
    mocks.redisSet.mockResolvedValue(null);

    const res = await GET(request('https://govcongiants.com/api/cron/mindy-reignite', {
      authorization: 'Bearer cron-secret',
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.mode).toBe('skipped');
    expect(mocks.runSend).not.toHaveBeenCalled();
    expect(mocks.runSeed).not.toHaveBeenCalled();
  });
});
