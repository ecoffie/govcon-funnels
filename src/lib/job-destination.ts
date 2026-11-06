import type { Job } from '@/types/job';

/**
 * Where a job card should send the visitor.
 *
 * `/jobs/view/:id` is resolved only through the USAJobs PositionID search.
 * A JSearch (or other non-USAJobs) id is not a position id. USAJobs ignores
 * it and returns some other open posting, so the detail page renders the
 * wrong job. Those cards go to the employer's apply URL instead.
 */
export function getJobDestination(job: Pick<Job, 'id' | 'source' | 'apply_url'>): {
  href: string;
  external: boolean;
} {
  if (job.source !== 'usajobs' && /^https?:\/\//i.test(job.apply_url || '')) {
    return { href: job.apply_url, external: true };
  }

  if (job.source === 'usajobs') {
    return { href: `/jobs/view/${job.id}`, external: false };
  }

  // No absolute apply URL and not a USAJobs id. Keep the click off /jobs/view.
  return { href: job.apply_url || '#', external: false };
}
