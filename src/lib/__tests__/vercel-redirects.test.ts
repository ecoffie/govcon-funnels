import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const root = process.cwd();

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const config = JSON.parse(
      readFileSync(path.join(root, 'vercel.json'), 'utf8')
    ) as { redirects?: Array<{ source: string }> };

    const sources = (config.redirects || []).map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
    expect(existsSync(path.join(root, 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(existsSync(path.join(root, 'public/proposal-bootcamp/2-upsell.html'))).toBe(true);
  });
});
