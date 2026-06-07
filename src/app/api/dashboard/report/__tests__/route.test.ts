import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { PATCH } from '../sections/route';
import { POST as POSTUpload } from '../upload/route';
import { POST as POSTSeed } from '../seed/route';
import { getReportWeeksWithData } from '@/lib/report-db';

vi.mock('@/lib/report-db', () => ({
  REPORT_SECTIONS: ['SEO'],
  getReportWeeksWithData: vi.fn(),
  getWeekMetrics: vi.fn(async (week: string) => ({ week_start: week, cash_collected: 100 })),
  getWeekSections: vi.fn(async () => ({ SEO: 'Search update' })),
  getAllWeeksMetrics: vi.fn(async () => [{ week_start: '2026-06-01', cash_collected: 100 }]),
  upsertSection: vi.fn(),
}));

vi.mock('@/lib/import-report', () => ({
  importReportFromBuffer: vi.fn(async () => ({ weeksImported: 1 })),
}));

const originalPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
const originalAdminPassword = process.env.ADMIN_PASSWORD;

function request(path: string, init: RequestInit = {}) {
  return new NextRequest(`https://govcongiants.com${path}`, init);
}

describe('dashboard report routes', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'report-secret';
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    vi.mocked(getReportWeeksWithData).mockResolvedValue(['2026-06-01']);
  });

  afterEach(() => {
    if (originalPurchasesPassword === undefined) {
      delete process.env.PURCHASES_ADMIN_PASSWORD;
    } else {
      process.env.PURCHASES_ADMIN_PASSWORD = originalPurchasesPassword;
    }

    if (originalAdminPassword === undefined) {
      delete process.env.ADMIN_PASSWORD;
    } else {
      process.env.ADMIN_PASSWORD = originalAdminPassword;
    }
  });

  it('rejects unauthenticated report reads', async () => {
    const response = await GET(request('/api/dashboard/report'));

    expect(response.status).toBe(401);
    expect(getReportWeeksWithData).not.toHaveBeenCalled();
  });

  it('allows report reads with the configured password', async () => {
    const response = await GET(request('/api/dashboard/report?password=report-secret&history=1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.weeks).toEqual(['2026-06-01']);
    expect(body.history).toEqual([{ week_start: '2026-06-01', cash_collected: 100 }]);
  });

  it('rejects unauthenticated report writes and imports', async () => {
    const patchResponse = await PATCH(request('/api/dashboard/report/sections', { method: 'PATCH' }));
    const uploadResponse = await POSTUpload(request('/api/dashboard/report/upload', { method: 'POST' }));
    const seedResponse = await POSTSeed(request('/api/dashboard/report/seed', { method: 'POST' }));

    expect(patchResponse.status).toBe(401);
    expect(uploadResponse.status).toBe(401);
    expect(seedResponse.status).toBe(401);
  });
});
