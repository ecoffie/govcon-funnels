import { describe, expect, it } from 'vitest';
import { getJobLinkTarget } from '../job-links';

describe('getJobLinkTarget', () => {
  it('routes USAJobs records to internal detail pages', () => {
    const target = getJobLinkTarget({
      id: 'USAJOBS-123',
      source: 'usajobs',
      apply_url: 'https://www.usajobs.gov/job/123',
    });

    expect(target).toEqual({
      href: '/jobs/view/USAJOBS-123',
      external: false,
    });
  });

  it('routes JSearch records to the external apply URL', () => {
    const target = getJobLinkTarget({
      id: 'js_abc',
      source: 'jsearch',
      apply_url: 'https://example.com/apply/js_abc',
    });

    expect(target).toEqual({
      href: 'https://example.com/apply/js_abc',
      external: true,
    });
  });

  it('routes prime-source records to the external apply URL', () => {
    const target = getJobLinkTarget({
      id: 'prime_1',
      source: 'prime',
      apply_url: 'https://primevendor.example/jobs/1',
    });

    expect(target).toEqual({
      href: 'https://primevendor.example/jobs/1',
      external: true,
    });
  });
});
