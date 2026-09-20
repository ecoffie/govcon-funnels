import { afterEach, describe, expect, it, vi } from 'vitest';
import { getYoutubeSignups } from '@/lib/youtube-stats';

const EPISODES = ['ep01', 'ep02', 'ep03', 'ep04', 'ep05', 'ep06', 'ep07', 'ep08', 'ep09', 'ep10'];

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getYoutubeSignups', () => {
  it('uses exact PostgREST counts without truncating totals above 1,000', async () => {
    vi.stubEnv('GETMINDY_SUPABASE_URL', 'https://example.supabase.co/');
    vi.stubEnv('GETMINDY_SUPABASE_SERVICE_ROLE_KEY', 'service-role-key');
    const expected = Object.fromEntries(EPISODES.map((ep, index) => [ep, index === 1 ? 1_234 : index]));
    const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const endpoint = new URL(input.toString());
      const ep = endpoint.searchParams.get('utm_content')?.replace('eq.', '') || '';

      expect(init?.method).toBe('HEAD');
      expect(init?.headers).toMatchObject({
        apikey: 'service-role-key',
        Authorization: 'Bearer service-role-key',
        Prefer: 'count=exact',
        Range: '0-0',
      });
      return new Response(null, {
        status: 200,
        headers: { 'Content-Range': `0-0/${expected[ep]}` },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getYoutubeSignups()).resolves.toEqual(expected);
    expect(fetchMock).toHaveBeenCalledTimes(EPISODES.length);
  });

  it('returns null instead of silently showing zero when an exact count is unavailable', async () => {
    vi.stubEnv('GETMINDY_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('GETMINDY_SUPABASE_SERVICE_ROLE_KEY', 'service-role-key');
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 200 })));

    await expect(getYoutubeSignups()).resolves.toBeNull();
  });
});
