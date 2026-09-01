import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The Encore partner short URL is published as govcongiants.com/encore.
 * Apex is still the podcast SPA, whose catch-all rewrite 200s index.html for
 * any path without an exact vercel.json redirect. 338b327 added the Next
 * redirect on app.govcongiants.org only — that never fires for the published
 * host. This lock keeps the SPA exact-path redirect in place.
 */

interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

const spaVercel = JSON.parse(
  readFileSync(resolve(process.cwd(), 'govcon-giants-site/vercel.json'), 'utf8'),
) as { redirects: Redirect[] };

function redirect(source: string): Redirect | undefined {
  return spaVercel.redirects.find((r) => r.source === source);
}

describe('SPA apex /encore partner short URL', () => {
  it('forwards exact /encore to the Next tracked partner page (1 hop)', () => {
    const rule = redirect('/encore');
    expect(rule).toBeDefined();
    expect(rule!.destination).toBe('https://app.govcongiants.org/encore-funding');
    expect(rule!.permanent).toBe(false);
  });

  it('also matches the trailing-slash variant (SPA exact-path rules do not)', () => {
    const rule = redirect('/encore/');
    expect(rule).toBeDefined();
    expect(rule!.destination).toBe('https://app.govcongiants.org/encore-funding');
  });

  it('does not steal /encore-funding or invent a loop back onto /encore', () => {
    const existing = redirect('/encore-funding');
    expect(existing?.destination).toBe('https://app.govcongiants.org/encore-funding');
    expect(spaVercel.redirects.some((r) => r.destination.includes('/encore') && !r.destination.endsWith('/encore-funding'))).toBe(false);
  });
});
