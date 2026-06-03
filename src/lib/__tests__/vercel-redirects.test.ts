import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

type VercelConfig = {
  redirects?: Array<{
    source: string;
    destination: string;
    permanent?: boolean;
  }>;
};

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const configPath = path.join(process.cwd(), 'vercel.json');
    const config = JSON.parse(readFileSync(configPath, 'utf8')) as VercelConfig;
    const redirectSources = new Set(config.redirects?.map((redirect) => redirect.source) ?? []);

    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/2-upsell.html'))).toBe(true);
    expect(redirectSources.has('/proposal-bootcamp')).toBe(false);
    expect(redirectSources.has('/proposal-bootcamp/:path*')).toBe(false);
  });
});
