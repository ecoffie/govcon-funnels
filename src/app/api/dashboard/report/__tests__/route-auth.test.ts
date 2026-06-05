import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const reportDbMocks = vi.hoisted(() => ({
  getReportWeeksWithData: vi.fn(),
  getWeekMetrics: vi.fn(),
  getWeekSections: vi.fn(),
  getAllWeeksMetrics: vi.fn(),
  upsertSection: vi.fn(),
  REPORT_SECTIONS: ['SEO', 'Sales'],
}));

const importReportMocks = vi.hoisted(() => ({
  importReportFromBuffer: vi.fn(),
}));

vi.mock('@/lib/report-db', () => reportDbMocks);
vi.mock('@/lib/import-report', () => importReportMocks);

import { GET as getReport } from '../route';
import { PATCH as patchSection } from '../sections/route';
import { POST as seedReport } from '../seed/route';
import { POST as uploadReport } from '../upload/route';

const originalEnv = {
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

function restoreEnv() {
  if (originalEnv.PURCHASES_ADMIN_PASSWORD === undefined) {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
  } else {
    process.env.PURCHASES_ADMIN_PASSWORD = originalEnv.PURCHASES_ADMIN_PASSWORD;
  }

  if (originalEnv.ADMIN_PASSWORD === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = originalEnv.ADMIN_PASSWORD;
  }
}

describe('dashboard report route auth', () => {
  beforeEach(() => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    vi.clearAllMocks();
  });

  afterEach(() => {
    restoreEnv();
  });

  it('rejects report reads when no password is configured', async () => {
    const response = await getReport(new NextRequest('http://localhost/api/dashboard/report'));

    expect(response.status).toBe(401);
    expect(reportDbMocks.getReportWeeksWithData).not.toHaveBeenCalled();
  });

  it('allows authorized report reads', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    reportDbMocks.getReportWeeksWithData.mockResolvedValue(['2026-06-01']);
    reportDbMocks.getWeekMetrics.mockResolvedValue({ week_start: '2026-06-01' });
    reportDbMocks.getWeekSections.mockResolvedValue({ SEO: 'notes' });
    reportDbMocks.getAllWeeksMetrics.mockResolvedValue([{ week_start: '2026-06-01' }]);

    const response = await getReport(
      new NextRequest('http://localhost/api/dashboard/report?history=1', {
        headers: { 'x-admin-password': 'admin-secret' },
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.weeks).toEqual(['2026-06-01']);
    expect(body.sections).toEqual({ SEO: 'notes' });
  });

  it('rejects unauthenticated report mutations before touching stored data', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';

    const sectionResponse = await patchSection(
      new NextRequest('http://localhost/api/dashboard/report/sections', {
        method: 'PATCH',
        body: JSON.stringify({ week_start: '2026-06-01', section: 'SEO', content: 'bad' }),
      })
    );
    const uploadResponse = await uploadReport(
      new NextRequest('http://localhost/api/dashboard/report/upload', { method: 'POST' })
    );
    const seedResponse = await seedReport(
      new NextRequest('http://localhost/api/dashboard/report/seed', { method: 'POST' })
    );

    expect(sectionResponse.status).toBe(401);
    expect(uploadResponse.status).toBe(401);
    expect(seedResponse.status).toBe(401);
    expect(reportDbMocks.upsertSection).not.toHaveBeenCalled();
    expect(importReportMocks.importReportFromBuffer).not.toHaveBeenCalled();
  });

  it('allows authorized section updates', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    reportDbMocks.upsertSection.mockResolvedValue(undefined);

    const response = await patchSection(
      new NextRequest('http://localhost/api/dashboard/report/sections', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'x-admin-password': 'admin-secret',
        },
        body: JSON.stringify({ week_start: '2026-06-01', section: 'SEO', content: 'locked' }),
      })
    );

    expect(response.status).toBe(200);
    expect(reportDbMocks.upsertSection).toHaveBeenCalledWith('2026-06-01', 'SEO', 'locked');
  });
});
