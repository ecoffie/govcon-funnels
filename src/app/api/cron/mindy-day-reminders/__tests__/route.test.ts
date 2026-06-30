import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../[type]/route';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';

const redisMocks = vi.hoisted(() => {
  const store = new Map<string, string>();
  return {
    store,
    set: vi.fn(async (key: string, value: string, options?: { nx?: boolean; ex?: number }) => {
      if (options?.nx && store.has(key)) return null;
      store.set(key, value);
      return 'OK';
    }),
    del: vi.fn(async (key: string) => {
      const existed = store.delete(key);
      return existed ? 1 : 0;
    }),
  };
});

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function RedisMock() {
    return {
    set: redisMocks.set,
    del: redisMocks.del,
    };
  }),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getMindyDayRegistrantsFromSupabase: vi.fn(),
}));

const registrantsMock = vi.mocked(getMindyDayRegistrantsFromSupabase);

function request(type = 'lifetime-deal', query = '') {
  return new NextRequest(`https://govcongiants.com/api/cron/mindy-day-reminders/${type}${query}`, {
    headers: { authorization: 'Bearer cron-secret' },
  });
}

function context(type = 'lifetime-deal') {
  return { params: Promise.resolve({ type }) };
}

async function json(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

describe('Mindy Day reminder cron idempotency', () => {
  beforeEach(() => {
    redisMocks.store.clear();
    redisMocks.set.mockClear();
    redisMocks.del.mockClear();

    process.env.CRON_SECRET = 'cron-secret';
    process.env.KV_REST_API_URL = 'https://redis.example';
    process.env.KV_REST_API_TOKEN = 'redis-token';
    delete process.env.STORAGE_KV_REST_API_URL;
    delete process.env.STORAGE_KV_REST_API_TOKEN;
    delete process.env.MINDY_DAY_JOIN_URL;
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.ai/api/mindy-launch/send-confirmation';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';

    registrantsMock.mockResolvedValue([{ email: 'first@example.com', name: 'First' }]);
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
  });

  it('does not claim the send when sender env is missing', async () => {
    delete process.env.MINDY_LAUNCH_SEND_SECRET;

    const response = await GET(request(), context());

    expect(response.status).toBe(500);
    expect(await json(response)).toMatchObject({
      error: expect.stringContaining('MINDY_LAUNCH_SEND_URL / MINDY_LAUNCH_SEND_SECRET'),
    });
    expect(redisMocks.set).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('does not claim the send when no recipients loaded', async () => {
    registrantsMock.mockResolvedValue([]);

    const response = await GET(request(), context());

    expect(response.status).toBe(503);
    expect(await json(response)).toMatchObject({
      error: expect.stringContaining('no recipients'),
      recipientCount: 0,
    });
    expect(redisMocks.set).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('releases the claim and returns retryable failure when any delivery fails', async () => {
    registrantsMock.mockResolvedValue([
      { email: 'first@example.com', name: 'First' },
      { email: 'second@example.com', name: 'Second' },
    ]);
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: false, error: 'provider down' }), { status: 500 }));

    const response = await GET(request(), context());
    const body = await json(response);

    expect(response.status).toBe(500);
    expect(body).toMatchObject({ sent: 1, failed: 1, total: 2 });
    expect(redisMocks.set).toHaveBeenCalledTimes(1);
    expect(redisMocks.del).toHaveBeenCalledWith('mindy-day:reminder-sent:lifetime-deal');
    expect(redisMocks.store.has('mindy-day:reminder-sent:lifetime-deal')).toBe(false);
  });

  it('keeps the claim when all deliveries succeed', async () => {
    const response = await GET(request(), context());
    const body = await json(response);

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ sent: 1, failed: 0, total: 1 });
    expect(redisMocks.set).toHaveBeenCalledTimes(1);
    expect(redisMocks.del).not.toHaveBeenCalled();
    expect(redisMocks.store.has('mindy-day:reminder-sent:lifetime-deal')).toBe(true);
  });

  it('skips without sending when the idempotency key is already claimed', async () => {
    redisMocks.store.set('mindy-day:reminder-sent:lifetime-deal', new Date().toISOString());

    const response = await GET(request(), context());
    const body = await json(response);

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ mode: 'skipped', type: 'lifetime-deal' });
    expect(fetch).not.toHaveBeenCalled();
  });
});
