import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import vercelConfig from '../../../vercel.json';

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const redirectedProposalBootcampSources = vercelConfig.redirects
      .map((redirect) => redirect.source)
      .filter((source) => source === '/proposal-bootcamp' || source.startsWith('/proposal-bootcamp/'));

    expect(redirectedProposalBootcampSources).toEqual([]);
    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/2-upsell.html'))).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/3-downsell.html'))).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/4-thank-you.html'))).toBe(true);
  });
});
