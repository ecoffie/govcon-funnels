import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../route';

const mocks = vi.hoisted(() => ({
  getRegistrants: vi.fn(),
  redisSet: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getMindyDayRegistrantsFromSupabase: mocks.getRegistrants,
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(() => ({
    set: mocks.redisSet,
  })),
}));

const ORIGINAL_ENV = {
  CRON_SECRET: process.env.CRON_SECRET,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  MINDY_LAUNCH_SEND_URL: process.env.MINDY_LAUNCH_SEND_URL,
  MINDY_LAUNCH_SEND_SECRET: process.env.MINDY_LAUNCH_SEND_SECRET,
  MINDY_DAY_JOIN_URL: process.env.MINDY_DAY_JOIN_URL,
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function cronRequest(type: string) {
  return new NextRequest(`https://govcongiants.com/api/cron/mindy-day-reminders?type=${type}`, {
    headers: { authorization: 'Bearer cron-secret' },
  });
}

describe('Mindy Day cron reminders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    process.env.CRON_SECRET = 'cron-secret';
    process.env.KV_REST_API_URL = 'https://kv.example';
    process.env.KV_REST_API_TOKEN = 'kv-token';
    process.env.MINDY_DAY_JOIN_URL = 'https://zoom.example/join';
  });

  afterEach(() => {
    restoreEnv();
  });

  it('does not claim the idempotency key when sender env is missing', async () => {
    delete process.env.MINDY_LAUNCH_SEND_URL;
    delete process.env.MINDY_LAUNCH_SEND_SECRET;
    mocks.getRegistrants.mockResolvedValue([{ email: 'lead@example.com', name: 'Lead Example' }]);

    const response = await GET(cronRequest('lifetime-deal'));

    expect(response.status).toBe(500);
    expect(mocks.redisSet).not.toHaveBeenCalled();
  });

  it('does not claim the idempotency key for an empty recipient list', async () => {
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.ai/api/mindy-launch/send-confirmation';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';
    mocks.getRegistrants.mockResolvedValue([]);

    const response = await GET(cronRequest('lifetime-deal'));

    expect(response.status).toBe(500);
    expect(mocks.redisSet).not.toHaveBeenCalled();
  });
});
