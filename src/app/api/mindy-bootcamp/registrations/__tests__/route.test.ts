import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { getMindyBootcampRegistrations } from '@/lib/mindy-bootcamp-registrations';

vi.mock('@/lib/mindy-bootcamp-registrations', () => ({
  getMindyBootcampRegistrations: vi.fn(),
}));

const mockedGetRegistrations = vi.mocked(getMindyBootcampRegistrations);

const ORIGINAL_ADMIN = process.env.ADMIN_PASSWORD;
const ORIGINAL_PURCHASES_ADMIN = process.env.PURCHASES_ADMIN_PASSWORD;
const ORIGINAL_TRACKER = process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD;

function restoreEnv() {
  if (ORIGINAL_ADMIN === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN;

  if (ORIGINAL_PURCHASES_ADMIN === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
  else process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_PURCHASES_ADMIN;

  if (ORIGINAL_TRACKER === undefined) delete process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD;
  else process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD = ORIGINAL_TRACKER;
}

function request(headers?: HeadersInit, url = 'http://localhost/api/mindy-bootcamp/registrations') {
  return new NextRequest(url, { headers });
}

describe('/api/mindy-bootcamp/registrations', () => {
  beforeEach(() => {
    restoreEnv();
    delete process.env.ADMIN_PASSWORD;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD = 'tracker-secret';
    mockedGetRegistrations.mockReset();
    mockedGetRegistrations.mockResolvedValue({
      count: 1,
      internalCount: 0,
      total: 1,
      goal: 750,
      pctToGoal: 0,
      webinarDate: '2026-06-27',
      daysUntil: 1,
      updatedAt: '2026-06-26T00:00:00.000Z',
      neededPerDay: 749,
      runRatePerDay: 1,
      recentRatePerDay: 1,
      projectedFinal: 2,
      onTrack: false,
      last24h: 1,
      last7d: 1,
      daysSinceLast: 0,
      momentum: 'steady',
      sources: [],
      trend: [],
      registrants: [{
        name: 'Ada Lovelace',
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        phone: '555-0100',
        company: 'Analytical Engines LLC',
        formLabel: 'Mindy bootcamp',
        source: 'mindy-launch',
        signedUpAt: '2026-06-26T00:00:00.000Z',
        date: '2026-06-26',
        internal: false,
      }],
    });
  });

  it('rejects the source-known admin fallback password', async () => {
    const res = await GET(request({ 'x-admin-password': 'galata-assassin-2026' }));

    expect(res.status).toBe(401);
    expect(mockedGetRegistrations).not.toHaveBeenCalled();
  });

  it('does not accept tracker credentials in the query string', async () => {
    const res = await GET(request(undefined, 'http://localhost/api/mindy-bootcamp/registrations?password=tracker-secret'));

    expect(res.status).toBe(401);
    expect(mockedGetRegistrations).not.toHaveBeenCalled();
  });

  it('fails closed when the dedicated tracker password is missing', async () => {
    delete process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD;

    const res = await GET(request({ 'x-admin-password': 'tracker-secret' }));

    expect(res.status).toBe(503);
    expect(mockedGetRegistrations).not.toHaveBeenCalled();
  });

  it('returns registration detail for the dedicated tracker password header', async () => {
    const res = await GET(request({ 'x-admin-password': 'tracker-secret' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.registrants[0].email).toBe('ada@example.com');
    expect(mockedGetRegistrations).toHaveBeenCalledTimes(1);
  });
});
