import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getMindyDayRegistrantsFromSupabase: vi.fn(),
  redisSet: vi.fn(),
  redisDel: vi.fn(),
  extractPassword: vi.fn(),
  isAuthorized: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getMindyDayRegistrantsFromSupabase: mocks.getMindyDayRegistrantsFromSupabase,
}));

vi.mock('@/lib/admin-auth', () => ({
  extractPassword: mocks.extractPassword,
  isAuthorized: mocks.isAuthorized,
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function RedisMock() {
    return {
    set: mocks.redisSet,
    del: mocks.redisDel,
    };
  }),
}));

import { GET } from '../[type]/route';

function makeRequest(type = 'live') {
  return new NextRequest(`https://govcongiants.test/api/cron/mindy-day-reminders/${type}`, {
    headers: { authorization: 'Bearer cron-secret' },
  });
}

function makeCtx(type = 'live') {
  return { params: Promise.resolve({ type }) };
}

function configureEnv() {
  process.env.CRON_SECRET = 'cron-secret';
  process.env.KV_REST_API_URL = 'https://redis.test';
  process.env.KV_REST_API_TOKEN = 'redis-token';
  process.env.MINDY_DAY_JOIN_URL = 'https://zoom.test/join';
  process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.test/api/mindy-launch/send-confirmation';
  process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';
}

describe('Mindy day reminder cron route', () => {
  beforeEach(() => {
    configureEnv();
    mocks.extractPassword.mockReturnValue(null);
    mocks.isAuthorized.mockReturnValue(false);
    mocks.redisSet.mockResolvedValue('OK');
    mocks.redisDel.mockResolvedValue(1);
    mocks.getMindyDayRegistrantsFromSupabase.mockResolvedValue([
      { email: 'ada@example.com', name: 'Ada' },
    ]);
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
  });

  it('does not claim idempotency when the verified sender env is missing', async () => {
    delete process.env.MINDY_LAUNCH_SEND_URL;

    const response = await GET(makeRequest(), makeCtx());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('MINDY_LAUNCH_SEND_URL');
    expect(mocks.redisSet).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('does not claim idempotency when a real send has no recipients', async () => {
    mocks.getMindyDayRegistrantsFromSupabase.mockResolvedValue([]);

    const response = await GET(makeRequest(), makeCtx());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('no Mindy Day recipients');
    expect(mocks.redisSet).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('releases the idempotency claim and fails the cron when any delivery fails', async () => {
    mocks.getMindyDayRegistrantsFromSupabase.mockResolvedValue([
      { email: 'ada@example.com', name: 'Ada' },
      { email: 'grace@example.com', name: 'Grace' },
    ]);
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: false, error: 'resend outage' }), { status: 503 })
      );

    const response = await GET(makeRequest(), makeCtx());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.sent).toBe(1);
    expect(body.failed).toBe(1);
    expect(mocks.redisSet).toHaveBeenCalledWith(
      'mindy-day:reminder-sent:live',
      expect.any(String),
      { nx: true, ex: 60 * 60 * 48 }
    );
    expect(mocks.redisDel).toHaveBeenCalledWith('mindy-day:reminder-sent:live');
  });

  it('keeps the idempotency claim after a fully successful send', async () => {
    const response = await GET(makeRequest(), makeCtx());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.sent).toBe(1);
    expect(body.failed).toBe(0);
    expect(mocks.redisSet).toHaveBeenCalledWith(
      'mindy-day:reminder-sent:live',
      expect.any(String),
      { nx: true, ex: 60 * 60 * 48 }
    );
    expect(mocks.redisDel).not.toHaveBeenCalled();
  });

  it('skips without sending when the reminder type was already claimed', async () => {
    mocks.redisSet.mockResolvedValue(null);

    const response = await GET(makeRequest(), makeCtx());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.mode).toBe('skipped');
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
