import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { searchUSAJobs } from '@/lib/usajobs';

/**
 * /jobs runs five USAJobs keyword searches, each aborted at 5s (82effa5).
 * Those calls were measured at 3-90s from Vercel. Promise.all turned one
 * timeout into an empty federal section even when the other four searches
 * had already returned real listings.
 */

const TERMS = ['contract specialist', 'capture manager', 'proposal', 'business development', 'acquisition'];

function listing(id: string, title: string) {
  return {
    MatchedObjectId: id,
    MatchedObjectDescriptor: {
      PositionTitle: title,
      OrganizationName: 'Department of Defense',
      DepartmentName: 'DoD',
      PublicationStartDate: '2026-11-01',
      ApplicationCloseDate: '2026-12-01',
      PositionURI: `https://www.usajobs.gov/job/${id}`,
      ApplyURI: [`https://www.usajobs.gov/job/${id}/apply`],
      QualificationSummary: 'Federal acquisition experience.',
      UserArea: { Details: { JobSummary: `${title} summary` } },
    },
  };
}

function okResponse(id: string, title: string) {
  return {
    ok: true,
    json: async () => ({
      SearchResult: {
        SearchResultCount: 1,
        SearchResultCountAll: 40,
        SearchResultItems: [listing(id, title)],
      },
    }),
  };
}

beforeEach(() => {
  process.env.USAJOBS_API_KEY = 'test-usajobs-key';
  process.env.USAJOBS_EMAIL = 'jobs@example.com';
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.mocked(fetch).mockReset();
  vi.restoreAllMocks();
  delete process.env.USAJOBS_API_KEY;
  delete process.env.USAJOBS_EMAIL;
});

describe('searchUSAJobs partial upstream failure', () => {
  it('keeps listings from the searches that returned when one keyword times out', async () => {
    vi.mocked(fetch).mockImplementation(async (input: RequestInfo | URL) => {
      const url = new URL(String(input));
      const keyword = url.searchParams.get('Keyword') || '';
      if (keyword === 'acquisition') {
        throw new DOMException('The operation was aborted due to timeout', 'TimeoutError');
      }
      const index = TERMS.indexOf(keyword);
      return okResponse(`job-${index}`, keyword) as Response;
    });

    const { jobs, total } = await searchUSAJobs({ limit: 15 });

    expect(jobs.map((job) => job.id).sort()).toEqual(['job-0', 'job-1', 'job-2', 'job-3']);
    expect(jobs.some((job) => job.title === 'acquisition')).toBe(false);
    expect(jobs.every((job) => job.id.startsWith('mock-'))).toBe(false);
    expect(total).toBe(160);
    expect(fetch).toHaveBeenCalledTimes(5);
  });

  it('returns an empty list, not mock listings, when every keyword search fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('USAJobs API error: 503'));

    const { jobs, total } = await searchUSAJobs();

    expect(jobs).toEqual([]);
    expect(total).toBe(0);
  });

  it('returns an empty list, not mock listings, when the single keyword search times out', async () => {
    vi.mocked(fetch).mockRejectedValue(
      new DOMException('The operation was aborted due to timeout', 'TimeoutError'),
    );

    const { jobs, total } = await searchUSAJobs({ keyword: 'capture manager' });

    expect(jobs).toEqual([]);
    expect(total).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
