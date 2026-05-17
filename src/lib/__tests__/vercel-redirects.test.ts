import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('Vercel redirects', () => {
  it('keeps the static proposal bootcamp funnel routable', () => {
    const blockedSources = vercelConfig.redirects
      .filter((redirect) => redirect.destination === '/')
      .map((redirect) => redirect.source);

    expect(blockedSources).not.toContain('/proposal-bootcamp');
    expect(blockedSources).not.toContain('/proposal-bootcamp/:path*');
  });
});
