import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

interface VercelRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

describe('vercel redirects', () => {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
  ) as { redirects?: VercelRedirect[] };

  it('does not shadow the static proposal bootcamp funnel', () => {
    const redirectSources = new Set((vercelConfig.redirects || []).map((redirect) => redirect.source));

    expect(redirectSources.has('/proposal-bootcamp')).toBe(false);
    expect(redirectSources.has('/proposal-bootcamp/:path*')).toBe(false);
    expect(fs.existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(process.cwd(), 'public/proposal-bootcamp/2-upsell.html'))).toBe(true);
  });
});
