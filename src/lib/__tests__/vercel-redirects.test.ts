import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const redirects = vercelConfig.redirects.map((redirect) => redirect.source);

    expect(redirects).not.toContain('/proposal-bootcamp');
    expect(redirects).not.toContain('/proposal-bootcamp/:path*');
  });
});
