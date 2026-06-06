import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { getReportWeeksWithData } from '@/lib/report-db';

vi.mock('@/lib/report-db', () => ({
  getReportWeeksWithData: vi.fn(),
  getWeekMetrics: vi.fn(async () => null),
  getWeekSections: vi.fn(async () => ({})),
  getAllWeeksMetrics: vi.fn(async () => []),
}));

const originalEnv = { ...process.env };

function request(url = 'http://localhost/api/dashboard/report') {
  return new NextRequest(url);
}

afterEach(() => {
  process.env = { ...originalEnv };
  vi.clearAllMocks();
});

describe('GET /api/dashboard/report', () => {
  it('rejects anonymous report reads', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';

    const res = await GET(request());

    expect(res.status).toBe(401);
    expect(getReportWeeksWithData).not.toHaveBeenCalled();
  });

  it('returns report data when authorized', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    vi.mocked(getReportWeeksWithData).mockResolvedValue(['2026-06-01']);

    const res = await GET(request('http://localhost/api/dashboard/report?password=admin-secret'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.weeks).toEqual(['2026-06-01']);
  });
});
