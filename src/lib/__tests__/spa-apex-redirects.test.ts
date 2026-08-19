import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

type Redirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

/**
 * After the Aug 2026 apex swap, govcongiants.com is the SPA. Prefix
 * redirects like `/jobs/:path*` do not cover exact Next-owned funnels
 * (`/opp`, `/funding`, `/shop`, …). Those 200 the SPA homepage instead.
 */
const REQUIRED_APEX_FUNNELS: Array<{ source: string; destIncludes: string }> = [
  { source: '/opp', destIncludes: '/opp' },
  { source: '/done-for-you', destIncludes: '/done-for-you' },
  { source: '/funding', destIncludes: '/funding' },
  { source: '/encore-funding', destIncludes: '/encore-funding' },
  { source: '/shop', destIncludes: '/shop' },
  { source: '/alerts', destIncludes: '/alerts' },
  { source: '/vault', destIncludes: '/vault' },
  { source: '/premium-page', destIncludes: '/premium-page' },
  { source: '/certs', destIncludes: '/certs' },
  { source: '/who-we-are', destIncludes: '/who-we-are' },
  { source: '/privacy', destIncludes: '/privacy' },
  { source: '/solutions', destIncludes: '/solutions' },
  { source: '/mastermind', destIncludes: '/mastermind' },
  { source: '/resources/handouts', destIncludes: '/resources/handouts' },
  { source: '/blog/cage-code-lookup-guide', destIncludes: '/blog/cage-code-lookup-guide' },
];

function loadSpaRedirects(): Redirect[] {
  const raw = readFileSync(
    resolve(process.cwd(), 'govcon-giants-site/vercel.json'),
    'utf8'
  );
  const parsed = JSON.parse(raw) as { redirects?: Redirect[] };
  return parsed.redirects ?? [];
}

describe('SPA apex redirects for Next-owned funnels', () => {
  const redirects = loadSpaRedirects();

  it('sends every conversion-critical exact path to the Next app', () => {
    for (const { source, destIncludes } of REQUIRED_APEX_FUNNELS) {
      const match = redirects.find((r) => r.source === source);
      expect(match, `missing redirect for ${source}`).toBeTruthy();
      expect(match!.destination).toContain('https://app.govcongiants.org');
      expect(match!.destination).toContain(destIncludes);
      expect(match!.permanent).toBe(true);
    }
  });

  it('does not swallow the SPA /resources or /blog indexes', () => {
    expect(redirects.find((r) => r.source === '/resources')).toBeUndefined();
    expect(redirects.find((r) => r.source === '/blog')).toBeUndefined();
    expect(redirects.find((r) => r.source === '/blog/:path*')).toBeUndefined();
  });
});
