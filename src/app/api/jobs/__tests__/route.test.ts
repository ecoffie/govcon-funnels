import { describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/jobs/route';

vi.mock('@/lib/jsearch', () => ({
  searchGovConJobs: vi.fn(),
}));

import { searchGovConJobs } from '@/lib/jsearch';

const mockedSearchGovConJobs = vi.mocked(searchGovConJobs);

describe('GET /api/jobs', () => {
  it('returns upstream error status when jobs provider fails', async () => {
    mockedSearchGovConJobs.mockResolvedValueOnce({
      jobs: [],
      total: 0,
      error: {
        status: 503,
        message: 'Jobs provider is temporarily unavailable. Please try again shortly.',
      },
    });

    const request = new Request('http://localhost/api/jobs?keyword=capture') as any;
    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload).toEqual({
      error: 'Jobs provider is temporarily unavailable. Please try again shortly.',
      jobs: [],
      total: 0,
      page: 1,
      totalPages: 0,
    });
  });

  it('returns successful payload when provider returns jobs', async () => {
    mockedSearchGovConJobs.mockResolvedValueOnce({
      jobs: [
        {
          id: '1',
          title: 'Capture Manager',
          company: 'Example GovCon',
          department: '',
          location: 'Remote',
          locationCity: '',
          locationState: '',
          salary_min: null,
          salary_max: null,
          grade: null,
          clearance: null,
          remote: true,
          posted_date: '2026-04-01T00:00:00Z',
          close_date: '2026-05-01T00:00:00Z',
          apply_url: 'https://example.com/job',
          description: '',
          qualifications: '',
          category: 'capture-manager',
          source: 'jsearch',
        },
      ],
      total: 1,
    });

    const request = new Request('http://localhost/api/jobs?page=2&limit=10') as any;
    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.total).toBe(1);
    expect(payload.page).toBe(2);
    expect(payload.totalPages).toBe(1);
    expect(payload.jobs).toHaveLength(1);
  });
});
