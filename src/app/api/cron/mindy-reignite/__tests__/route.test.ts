import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

const mocks = vi.hoisted(() => ({
  runSeed: vi.fn(),
  runSend: vi.fn(),
  seedQuotaForDay: vi.fn(),
  redisSet: vi.fn(),
}));

vi.mock('@/lib/mindy-reignite', () => ({
  runSeed: mocks.runSeed,
  runSend: mocks.runSend,
  seedQuotaForDay: mocks.seedQuotaForDay,
  AUDIENCE_TAG: 'mindy-profile-incomplete',
  STAGE_TAGS: ['reignite-d0', 'reignite-d2', 'reignite-d4', 'reignite-d6', 'reignite-d8'],
  DONE_TAG: 'reignite-done',
  EXITED_TAG: 'reignite-exited',
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function Redis() {
    return { set: mocks.redisSet };
  }),
}));

function request(headers?: HeadersInit) {
  return new NextRequest('https://govcongiants.com/api/cron/mindy-reignite', { headers });
}

describe('mindy re-ignite cron route', () => {
  beforeEach(() => {
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.STORAGE_KV_REST_API_URL;
    delete process.env.STORAGE_KV_REST_API_TOKEN;
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    delete process.env.SLACK_LEAD_WEBHOOK_URL;
    process.env.GHL_API_KEY = 'ghl-token';
    process.env.GHL_LOCATION_ID = 'location-id';

    mocks.runSeed.mockResolvedValue({ audience: 0, eligibleNew: 0, enrolled: 0, failed: 0 });
    mocks.runSend.mockResolvedValue({ advanced: 0, exited: 0, finished: 0, waiting: 0 });
    mocks.seedQuotaForDay.mockReturnValue(50);
    mocks.redisSet.mockResolvedValue('OK');
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ contacts: [] }),
    } as Response);
  });

  it('rejects spoofed Vercel cron headers without a real secret', async () => {
    const res = await GET(request({ 'x-vercel-cron': '1' }));

    expect(res.status).toBe(401);
    expect(mocks.runSend).not.toHaveBeenCalled();
    expect(mocks.runSeed).not.toHaveBeenCalled();
  });

  it('runs with the configured cron bearer secret', async () => {
    process.env.CRON_SECRET = 'cron-secret';

    const res = await GET(request({ authorization: 'Bearer cron-secret' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(mocks.runSend).toHaveBeenCalledOnce();
    expect(mocks.runSeed).toHaveBeenCalledWith(expect.any(Object), 50, expect.any(String));
  });

  it('skips a duplicate real send when the daily Redis claim is already taken', async () => {
    process.env.CRON_SECRET = 'cron-secret';
    process.env.STORAGE_KV_REST_API_URL = 'https://redis.example';
    process.env.STORAGE_KV_REST_API_TOKEN = 'redis-token';
    mocks.redisSet.mockResolvedValue(null);

    const res = await GET(request({ authorization: 'Bearer cron-secret' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.mode).toBe('skipped');
    expect(mocks.runSend).not.toHaveBeenCalled();
    expect(mocks.runSeed).not.toHaveBeenCalled();
  });
});
