import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const sources = vercelConfig.redirects.map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
  });
});
