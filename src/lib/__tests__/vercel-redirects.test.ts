import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Vercel redirects', () => {
  it('does not shadow the checked-in proposal bootcamp static funnel', () => {
    const config = JSON.parse(
      readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')
    ) as { redirects?: Array<{ source: string }> };

    const sources = (config.redirects ?? []).map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
  });
});
