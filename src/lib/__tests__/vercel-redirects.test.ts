import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('vercel redirects', () => {
  it('does not redirect the checked-in proposal bootcamp static funnel', () => {
    const sources = vercelConfig.redirects.map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
  });
});
