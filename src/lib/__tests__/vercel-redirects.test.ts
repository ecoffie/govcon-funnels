import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const root = process.cwd();

describe('vercel redirects', () => {
  it('does not shadow the proposal bootcamp static funnel', () => {
    const config = JSON.parse(readFileSync(path.join(root, 'vercel.json'), 'utf8')) as {
      redirects?: Array<{ source: string }>;
    };

    const redirectSources = new Set((config.redirects || []).map((redirect) => redirect.source));

    expect(existsSync(path.join(root, 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(existsSync(path.join(root, 'public/proposal-bootcamp/2-upsell.html'))).toBe(true);
    expect(redirectSources.has('/proposal-bootcamp')).toBe(false);
    expect(redirectSources.has('/proposal-bootcamp/:path*')).toBe(false);
  });
});
