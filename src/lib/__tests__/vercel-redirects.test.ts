import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const root = process.cwd();
    const vercelConfig = JSON.parse(
      fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')
    ) as { redirects?: Array<{ source: string }> };

    const sources = (vercelConfig.redirects || []).map((redirect) => redirect.source);

    expect(sources).not.toContain('/proposal-bootcamp');
    expect(sources).not.toContain('/proposal-bootcamp/:path*');
    expect(fs.existsSync(path.join(root, 'public/proposal-bootcamp/index.html'))).toBe(true);
  });
});
