import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

type VercelConfig = {
  redirects: Array<{ source: string }>;
};

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const config = JSON.parse(
      fs.readFileSync(path.join(repoRoot, 'vercel.json'), 'utf8')
    ) as VercelConfig;

    const redirectSources = config.redirects.map((redirect) => redirect.source);

    expect(fs.existsSync(path.join(repoRoot, 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(redirectSources).not.toContain('/proposal-bootcamp');
    expect(redirectSources).not.toContain('/proposal-bootcamp/:path*');
  });
});
