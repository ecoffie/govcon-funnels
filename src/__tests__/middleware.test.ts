import { afterEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

const ORIGINAL_ENV = process.env;

function teamReq(path: string, headers?: HeadersInit) {
  return new NextRequest(`https://govcongiants.com${path}`, { headers });
}

describe('team hub middleware', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('hides static team hub files from anonymous visitors', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';

    const res = middleware(teamReq('/team/yt-batch1-x7k9q3/index.html'));

    expect(res.status).toBe(404);
  });

  it('allows configured admin access and scopes the cookie to team pages', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';

    const res = middleware(teamReq('/team/yt-batch1-x7k9q3/index.html?password=admin-secret'));

    expect(res.status).toBe(200);
    expect(res.headers.get('set-cookie')).toContain('Path=/team');
  });
});
