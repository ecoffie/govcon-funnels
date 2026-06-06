import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { PATCH as patchSection } from '../sections/route';
import { POST as uploadReport } from '../upload/route';
import { POST as seedReport } from '../seed/route';
import { upsertSection } from '@/lib/report-db';
import { importReportFromBuffer } from '@/lib/import-report';

vi.mock('@/lib/report-db', () => ({
  REPORT_SECTIONS: ['SEO'],
  upsertSection: vi.fn(),
}));

vi.mock('@/lib/import-report', () => ({
  importReportFromBuffer: vi.fn(),
}));

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.clearAllMocks();
});

describe('dashboard report write endpoints', () => {
  it('rejects anonymous section updates', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    const req = new NextRequest('http://localhost/api/dashboard/report/sections', {
      method: 'PATCH',
      body: JSON.stringify({ week_start: '2026-06-01', section: 'SEO', content: 'changed' }),
      headers: { 'content-type': 'application/json' },
    });

    const res = await patchSection(req);

    expect(res.status).toBe(401);
    expect(upsertSection).not.toHaveBeenCalled();
  });

  it('rejects anonymous report uploads before parsing files', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    const req = new NextRequest('http://localhost/api/dashboard/report/upload', { method: 'POST' });

    const res = await uploadReport(req);

    expect(res.status).toBe(401);
    expect(importReportFromBuffer).not.toHaveBeenCalled();
  });

  it('rejects anonymous report seed imports', async () => {
    process.env.ADMIN_PASSWORD = 'admin-secret';
    const req = new NextRequest('http://localhost/api/dashboard/report/seed', { method: 'POST' });

    const res = await seedReport(req);

    expect(res.status).toBe(401);
    expect(importReportFromBuffer).not.toHaveBeenCalled();
  });
});
