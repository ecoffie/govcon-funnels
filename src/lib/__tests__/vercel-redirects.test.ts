import { describe, expect, it } from 'vitest';
import vercelConfig from '../../../vercel.json';
import nextConfig from '../../../next.config';

describe('vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const sources = vercelConfig.redirects.map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
  });

  it('serves the proposal bootcamp landing URL from the static index file', async () => {
    const rewrites = typeof nextConfig.rewrites === 'function' ? await nextConfig.rewrites() : null;
    const beforeFiles = Array.isArray(rewrites)
      ? rewrites
      : rewrites && 'beforeFiles' in rewrites
        ? rewrites.beforeFiles
        : [];

    expect(beforeFiles).toContainEqual({
      source: '/proposal-bootcamp',
      destination: '/proposal-bootcamp/index.html',
    });
  });
});
