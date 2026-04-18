import { describe, expect, it } from 'vitest';
import { sanitizeApplyUrl, transformJSearchJob, type JSearchJob } from './jsearch';

function makeBaseJob(overrides: Partial<JSearchJob> = {}): JSearchJob {
  return {
    job_id: 'job-1',
    job_title: 'Capture Manager',
    job_description: 'Lead capture efforts',
    employer_name: 'Example Corp',
    employer_logo: null,
    employer_website: null,
    employer_company_type: null,
    job_publisher: 'Example',
    job_employment_type: 'FULLTIME',
    job_apply_link: 'https://example.com/apply',
    job_apply_is_direct: true,
    job_is_remote: false,
    job_city: 'Arlington',
    job_state: 'VA',
    job_country: 'US',
    job_min_salary: 100000,
    job_max_salary: 140000,
    job_salary_currency: 'USD',
    job_salary_period: 'YEAR',
    job_posted_at_datetime_utc: '2026-04-18T00:00:00.000Z',
    job_offer_expiration_datetime_utc: null,
    job_required_experience: null,
    job_required_skills: null,
    job_highlights: null,
    ...overrides,
  };
}

describe('sanitizeApplyUrl', () => {
  it('allows https URLs', () => {
    expect(sanitizeApplyUrl('https://example.com/apply')).toBe('https://example.com/apply');
  });

  it('allows http URLs', () => {
    expect(sanitizeApplyUrl('http://example.com/apply')).toBe('http://example.com/apply');
  });

  it('blocks javascript URLs', () => {
    expect(sanitizeApplyUrl('javascript:alert(1)')).toBe('about:blank');
  });

  it('blocks data URLs', () => {
    expect(sanitizeApplyUrl('data:text/html,<script>alert(1)</script>')).toBe('about:blank');
  });

  it('falls back for malformed URLs', () => {
    expect(sanitizeApplyUrl('not a valid url')).toBe('about:blank');
  });
});

describe('transformJSearchJob', () => {
  it('sanitizes untrusted apply links', () => {
    const transformed = transformJSearchJob(
      makeBaseJob({ job_apply_link: 'javascript:alert("xss")' })
    );

    expect(transformed.apply_url).toBe('about:blank');
  });
});
