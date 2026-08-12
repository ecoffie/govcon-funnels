import { describe, expect, it } from 'vitest';
import { getJobDestination } from '@/components/JobCard';
import type { Job } from '@/types/job';

const baseJob: Job = {
  id: 'job-123',
  title: 'Capture Manager',
  company: 'Acme GovCon',
  department: 'Growth',
  location: 'Remote',
  locationCity: '',
  locationState: '',
  salary_min: 120000,
  salary_max: 170000,
  grade: null,
  clearance: null,
  remote: true,
  posted_date: '2026-04-19T00:00:00.000Z',
  close_date: '2026-05-19T00:00:00.000Z',
  apply_url: 'https://example.com/apply/job-123',
  description: 'Example job description',
  qualifications: 'Example qualifications',
  category: 'capture-manager',
  source: 'usajobs',
};

describe('getJobDestination', () => {
  it('routes USAJobs records to internal job detail page', () => {
    const destination = getJobDestination(baseJob);
    expect(destination).toBe('/jobs/view/job-123');
  });

  it('routes JSearch records to external apply URL', () => {
    const destination = getJobDestination({
      ...baseJob,
      source: 'jsearch',
      id: 'jsearch-999',
      apply_url: 'https://boards.greenhouse.io/acme/jobs/999',
    });

    expect(destination).toBe('https://boards.greenhouse.io/acme/jobs/999');
  });
});
