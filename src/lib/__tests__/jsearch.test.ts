import { describe, expect, it } from 'vitest';

import type { JSearchJob } from '@/lib/jsearch';
import { transformJSearchJob } from '@/lib/jsearch';

function buildJSearchJob(overrides: Partial<JSearchJob> = {}): JSearchJob {
  return {
    job_id: 'job-1',
    job_title: 'Capture Manager',
    job_description: 'Lead capture strategy.',
    employer_name: 'Acme GovCon',
    employer_logo: null,
    employer_website: null,
    employer_company_type: null,
    job_publisher: 'LinkedIn',
    job_employment_type: 'FULLTIME',
    job_apply_link: 'https://example.com/apply',
    job_apply_is_direct: true,
    job_is_remote: false,
    job_city: 'Arlington',
    job_state: 'VA',
    job_country: 'US',
    job_min_salary: 150000,
    job_max_salary: 200000,
    job_salary_currency: 'USD',
    job_salary_period: 'YEAR',
    job_posted_at_datetime_utc: '2026-04-10T12:00:00Z',
    job_offer_expiration_datetime_utc: null,
    job_required_experience: null,
    job_required_skills: null,
    job_highlights: null,
    ...overrides,
  };
}

describe('transformJSearchJob', () => {
  it('falls back to safe ISO dates when upstream timestamps are invalid', () => {
    const transformed = transformJSearchJob(
      buildJSearchJob({
        job_posted_at_datetime_utc: 'not-a-real-date',
        job_offer_expiration_datetime_utc: 'still-not-a-date',
      })
    );

    expect(() => new Date(transformed.posted_date).toISOString()).not.toThrow();
    expect(() => new Date(transformed.close_date).toISOString()).not.toThrow();
  });

  it('uses provided expiration timestamp when it is valid', () => {
    const transformed = transformJSearchJob(
      buildJSearchJob({
        job_offer_expiration_datetime_utc: '2026-05-01T00:00:00Z',
      })
    );

    expect(transformed.close_date).toBe('2026-05-01T00:00:00.000Z');
  });
});
