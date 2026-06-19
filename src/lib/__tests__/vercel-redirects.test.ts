import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';

describe('vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const redirects = (vercelConfig as { redirects: Array<{ source: string }> }).redirects;
    const sources = redirects.map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
  });
});
