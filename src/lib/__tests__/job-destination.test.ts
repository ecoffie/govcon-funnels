import { describe, expect, it } from 'vitest';
import { getJobDestination } from '@/lib/job-destination';

describe('getJobDestination', () => {
  it('sends JSearch cards to the external apply URL', () => {
    const destination = getJobDestination({
      id: 'c3V0RDd1eUhoUnBJ-not-a-position-id',
      source: 'jsearch',
      apply_url: 'https://www.linkedin.com/jobs/view/capture-manager-123',
    });

    expect(destination).toEqual({
      href: 'https://www.linkedin.com/jobs/view/capture-manager-123',
      external: true,
    });
  });

  it('keeps USAJobs cards on the internal detail route', () => {
    const destination = getJobDestination({
      id: '721962100',
      source: 'usajobs',
      apply_url: 'https://www.usajobs.gov/job/721962100',
    });

    expect(destination).toEqual({
      href: '/jobs/view/721962100',
      external: false,
    });
  });

  it('does not send a non-USAJobs card through /jobs/view when apply_url is missing', () => {
    const destination = getJobDestination({
      id: 'jsearch-without-apply-url',
      source: 'jsearch',
      apply_url: '',
    });

    expect(destination.href.startsWith('/jobs/view/')).toBe(false);
    expect(destination.external).toBe(false);
  });
});
