import { describe, expect, it } from 'vitest';
import { getJobCardDestination } from '@/components/JobCard';
import type { Job } from '@/types/job';

function makeJob(overrides: Partial<Job>): Job {
  return {
    id: 'job-1',
    title: 'Capture Manager',
    company: 'Example Corp',
    department: 'Growth',
    location: 'Remote',
    salary_min: 100000,
    salary_max: 150000,
    grade: null,
    clearance: null,
    remote: true,
    posted_date: '2026-04-10T00:00:00Z',
    close_date: '2026-05-10T00:00:00Z',
    apply_url: 'https://example.com/apply',
    description: 'Test role',
    qualifications: 'Test qualifications',
    category: 'capture-manager',
    source: 'usajobs',
    ...overrides,
  };
}

describe('getJobCardDestination', () => {
  it('routes USAJobs entries to internal detail pages', () => {
    const job = makeJob({ source: 'usajobs', id: '12345' });
    const destination = getJobCardDestination(job);

    expect(destination).toEqual({
      href: '/jobs/view/12345',
      external: false,
    });
  });

  it('routes JSearch entries to external apply URLs', () => {
    const job = makeJob({
      source: 'jsearch',
      id: 'jsearch-abc',
      apply_url: 'https://jobs.example.com/listing/jsearch-abc',
    });
    const destination = getJobCardDestination(job);

    expect(destination).toEqual({
      href: 'https://jobs.example.com/listing/jsearch-abc',
      external: true,
    });
  });
});
