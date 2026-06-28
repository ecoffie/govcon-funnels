import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  getRegistrants: vi.fn(),
  redisSet: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getMindyDayRegistrantsFromSupabase: mocks.getRegistrants,
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(() => ({
    set: mocks.redisSet,
  })),
}));

import { GET } from '../[type]/route';

const ENV_KEYS = [
  'CRON_SECRET',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'MINDY_DAY_JOIN_URL',
  'MINDY_LAUNCH_SEND_URL',
  'MINDY_LAUNCH_SEND_SECRET',
  'PURCHASES_ADMIN_PASSWORD',
  'ADMIN_PASSWORD',
] as const;

const originalEnv = new Map<(typeof ENV_KEYS)[number], string | undefined>(
  ENV_KEYS.map((key) => [key, process.env[key]])
);

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const value = originalEnv.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function request() {
  return new NextRequest('https://govcongiants.com/api/cron/mindy-day-reminders/morning', {
    headers: { authorization: 'Bearer cron-secret' },
  });
}

function context(type = 'morning') {
  return { params: Promise.resolve({ type }) };
}

describe('Mindy Day reminder cron', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'cron-secret';
    process.env.KV_REST_API_URL = 'https://redis.example.test';
    process.env.KV_REST_API_TOKEN = 'redis-token';
    process.env.MINDY_DAY_JOIN_URL = 'https://zoom.example.test/j/123';
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    mocks.redisSet.mockResolvedValue('OK');
  });

  afterEach(() => {
    restoreEnv();
  });

  it('does not claim idempotency when the getmindy sender env is missing', async () => {
    mocks.getRegistrants.mockResolvedValue([{ email: 'registrant@govcon.test', name: 'Registrant' }]);
    delete process.env.MINDY_LAUNCH_SEND_URL;
    delete process.env.MINDY_LAUNCH_SEND_SECRET;

    const response = await GET(request(), context());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('MINDY_LAUNCH_SEND_URL');
    expect(mocks.redisSet).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('does not claim idempotency when no recipients are available', async () => {
    mocks.getRegistrants.mockResolvedValue([]);
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.ai/api/mindy-launch/send-confirmation';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';

    const response = await GET(request(), context());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('no Mindy Day recipients');
    expect(mocks.redisSet).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
});
