import type { Job } from '@/types/job';

type JobLinkInput = Pick<Job, 'id' | 'source' | 'apply_url'>;

/**
 * Only USAJobs records have an internal detail page.
 * Other sources should link directly to the upstream application URL.
 */
export function getJobLinkTarget(job: JobLinkInput): { href: string; external: boolean } {
  const external = job.source !== 'usajobs';

  return {
    href: external ? job.apply_url : `/jobs/view/${job.id}`,
    external,
  };
}
