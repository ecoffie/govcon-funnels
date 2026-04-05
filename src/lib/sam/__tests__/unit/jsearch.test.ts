import { describe, expect, it } from 'vitest';
import { transformJSearchJob } from '@/lib/jsearch';

describe('JSearch transform', () => {
  it('does not throw when posted date is malformed', () => {
    const transformed = transformJSearchJob({
      job_id: 'job-1',
      job_title: 'Capture Manager',
      job_description: 'desc',
      employer_name: 'Acme GovCon',
      employer_logo: null,
      employer_website: null,
      employer_company_type: null,
      job_publisher: 'LinkedIn',
      job_employment_type: 'FULLTIME',
      job_apply_link: 'https://example.com/apply',
      job_apply_is_direct: true,
      job_is_remote: true,
      job_city: 'Tampa',
      job_state: 'FL',
      job_country: 'US',
      job_min_salary: 120000,
      job_max_salary: 160000,
      job_salary_currency: 'USD',
      job_salary_period: 'YEAR',
      job_posted_at_datetime_utc: 'not-a-date',
      job_offer_expiration_datetime_utc: null,
      job_required_experience: null,
      job_required_skills: null,
      job_highlights: null,
    });

    expect(() => new Date(transformed.posted_date).toISOString()).not.toThrow();
    expect(() => new Date(transformed.close_date).toISOString()).not.toThrow();
  });

  it('falls back when expiration date is malformed', () => {
    const transformed = transformJSearchJob({
      job_id: 'job-2',
      job_title: 'Proposal Manager',
      job_description: 'desc',
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
      job_min_salary: null,
      job_max_salary: null,
      job_salary_currency: null,
      job_salary_period: null,
      job_posted_at_datetime_utc: '2026-04-01T00:00:00.000Z',
      job_offer_expiration_datetime_utc: 'bad-expiration-date',
      job_required_experience: null,
      job_required_skills: null,
      job_highlights: null,
    });

    expect(() => new Date(transformed.close_date).toISOString()).not.toThrow();
    expect(new Date(transformed.close_date).getTime()).toBeGreaterThan(new Date(transformed.posted_date).getTime());
  });
});
