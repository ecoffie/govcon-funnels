import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const vercelConfig = JSON.parse(
      readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
    ) as { redirects?: Array<{ source: string }> };

    const redirectSources = vercelConfig.redirects?.map((redirect) => redirect.source) || [];

    expect(redirectSources).not.toContain('/proposal-bootcamp');
    expect(redirectSources).not.toContain('/proposal-bootcamp/:path*');
  });
});
