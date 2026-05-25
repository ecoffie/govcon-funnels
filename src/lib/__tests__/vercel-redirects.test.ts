import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const redirectedSources = vercelConfig.redirects.map((redirect) => redirect.source);

    expect(redirectedSources).not.toContain('/proposal-bootcamp');
    expect(redirectedSources).not.toContain('/proposal-bootcamp/:path*');
  });
});
