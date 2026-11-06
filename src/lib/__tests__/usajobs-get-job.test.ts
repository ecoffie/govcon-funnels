import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getJob } from '@/lib/usajobs';
import type { USAJobsItem } from '@/types/job';

function usaItem(id: string, title: string): USAJobsItem {
  return {
    MatchedObjectId: id,
    MatchedObjectDescriptor: {
      PositionID: id,
      PositionTitle: title,
      PositionURI: `https://www.usajobs.gov/job/${id}`,
      ApplyURI: [`https://www.usajobs.gov/job/${id}`],
      PositionLocation: [
        {
          LocationName: 'Washington, District of Columbia',
          CountryCode: 'US',
          CountrySubDivisionCode: 'DC',
          CityName: 'Washington',
        },
      ],
      OrganizationName: 'Central Intelligence Agency',
      DepartmentName: 'Central Intelligence Agency',
      JobCategory: [],
      JobGrade: [{ Code: 'GS-11' }],
      PositionSchedule: [],
      PositionOfferingType: [],
      QualificationSummary: 'Law degree required.',
      PositionRemuneration: [
        {
          MinimumRange: '94000',
          MaximumRange: '122000',
          RateIntervalCode: 'PA',
          Description: 'Per Year',
        },
      ],
      PositionStartDate: '2026-10-01',
      PositionEndDate: '2026-11-01',
      PublicationStartDate: '2026-10-01',
      ApplicationCloseDate: '2026-11-01',
      UserArea: {
        Details: {
          JobSummary: 'Honors attorney program.',
          TeleworkEligible: false,
          SecurityClearance: 'Top Secret',
        },
      },
    },
  };
}

describe('getJob', () => {
  beforeEach(() => {
    process.env.USAJOBS_API_KEY = 'test-key';
    process.env.USAJOBS_EMAIL = 'jobs@example.com';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.USAJOBS_API_KEY;
  });

  it('returns null when USAJobs answers with a different position', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          SearchResult: {
            SearchResultCount: 1,
            SearchResultCountAll: 1,
            SearchResultItems: [usaItem('721962100', 'Honors Attorney')],
          },
        }),
      })),
    );

    const job = await getJob('c3V0RDd1eUhoUnBJ-not-a-position-id');
    expect(job).toBeNull();
  });

  it('returns the posting when the position id matches', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          SearchResult: {
            SearchResultCount: 1,
            SearchResultCountAll: 1,
            SearchResultItems: [usaItem('721962100', 'Honors Attorney')],
          },
        }),
      })),
    );

    const job = await getJob('721962100');
    expect(job?.id).toBe('721962100');
    expect(job?.title).toBe('Honors Attorney');
    expect(job?.source).toBe('usajobs');
  });
});
