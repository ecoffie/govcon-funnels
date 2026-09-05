import { describe, it, expect } from 'vitest';
import vercelConfig from '../../../vercel.json';

/**
 * THE CANONICAL HOST CONTRACT: govcongiants.com is the only public host.
 *
 * Every legacy hostname must redirect to it permanently, path-preserving, one way.
 *
 * WHY THIS TEST EXISTS
 * --------------------
 * On 2026-09-05 the `app.govcongiants.org → .com` redirect was enabled while .com was
 * still served by the old Vite SPA, which redirected ~35 path families back to
 * app.govcongiants.org. The two rules pointed at each other and ~10 customer-facing
 * route families went down with an infinite redirect loop. That was the SECOND
 * occurrence of the same outage from the same rule.
 *
 * These assertions fail the build if a redirect is ever pointed at a non-canonical
 * host, made temporary, or turned into a chain — the shapes that cause loops, leak
 * crawl budget, or split ranking signals across duplicate hosts.
 *
 * Runtime behaviour (does the live host actually 308?) is covered separately by
 * `runCanonicalHostChecks()` in src/lib/synthetic.ts.
 */

interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: { type: string; value: string }[];
}

const CANONICAL = 'https://govcongiants.com';
const redirects = (vercelConfig as { redirects: Redirect[] }).redirects;

/** Host-scoped redirects — the ones that perform canonicalization. */
const hostRules = redirects.filter((r) => r.has?.some((h) => h.type === 'host'));
const hostOf = (r: Redirect) => r.has!.find((h) => h.type === 'host')!.value;

/** Every hostname retired onto the canonical host. */
const RETIRED_HOSTS = [
  'app.govcongiants.org',
  'govcongiants.org',
  'www.govcongiants.org',
  'guides.govcongiants.org',
  'funnels.govcongiants.org',
  'www.govcongiants.com',
];

/** Hosts that legitimately point somewhere OTHER than govcongiants.com. */
const INTENTIONAL_NON_CANONICAL: Record<string, string> = {
  'tools.govcongiants.org': 'https://getmindy.ai',
};

describe('canonical host contract', () => {
  it('defines a redirect for every retired hostname', () => {
    const missing = RETIRED_HOSTS.filter((h) => !hostRules.some((r) => hostOf(r) === h));
    expect(missing, `retired hosts with no redirect rule: ${missing.join(', ')}`).toEqual([]);
  });

  it('every retired host redirects to the canonical host, and nowhere else', () => {
    const wrong = hostRules
      .filter((r) => RETIRED_HOSTS.includes(hostOf(r)))
      .filter((r) => !r.destination.startsWith(CANONICAL))
      .map((r) => `${hostOf(r)}${r.source} -> ${r.destination}`);
    expect(wrong, `retired hosts pointing off-canonical:\n${wrong.join('\n')}`).toEqual([]);
  });

  it('no redirect targets another intermediate host — that would be a chain', () => {
    // A redirect to www/app/.org/mi/shop would bounce again. One hop, always.
    const intermediates = [
      'https://www.govcongiants.com',
      'https://app.govcongiants.org',
      'https://govcongiants.org',
      'https://www.govcongiants.org',
      'https://guides.govcongiants.org',
      'https://funnels.govcongiants.org',
      'https://mi.govcongiants.com',
      'https://shop.govcongiants.com',
    ];
    const chained = redirects
      .filter((r) => intermediates.some((i) => r.destination.startsWith(i)))
      .map((r) => `${r.has ? hostOf(r) : '(any host)'}${r.source} -> ${r.destination}`);
    expect(chained, `redirects targeting an intermediate host:\n${chained.join('\n')}`).toEqual([]);
  });

  it('canonicalization is permanent — a temporary redirect passes no signal', () => {
    const temporary = hostRules
      .filter((r) => RETIRED_HOSTS.includes(hostOf(r)))
      .filter((r) => r.permanent !== true)
      .map((r) => `${hostOf(r)}${r.source}`);
    expect(temporary, `non-permanent canonicalization:\n${temporary.join('\n')}`).toEqual([]);
  });

  it('is one-way — the canonical host never redirects to a retired host', () => {
    // A rule scoped to govcongiants.com pointing at a retired host is half of a loop.
    const backwards = hostRules
      .filter((r) => hostOf(r) === 'govcongiants.com')
      .filter((r) => RETIRED_HOSTS.some((h) => r.destination.includes(h)))
      .map((r) => `${r.source} -> ${r.destination}`);
    expect(backwards, `canonical host redirecting BACK to a retired host:\n${backwards.join('\n')}`)
      .toEqual([]);
  });

  it('preserves the path on catch-all host rules', () => {
    const lossy = hostRules
      .filter((r) => RETIRED_HOSTS.includes(hostOf(r)))
      .filter((r) => r.source === '/:path*' && !r.destination.endsWith('/:path*'))
      .map((r) => `${hostOf(r)}${r.source} -> ${r.destination}`);
    expect(lossy, `catch-all rules that drop the path:\n${lossy.join('\n')}`).toEqual([]);
  });

  it('keeps a more specific host rule ahead of that host\'s catch-all', () => {
    // guides.govcongiants.org has a /database/:path* special case that must match
    // BEFORE its /:path* catch-all, or the special case is dead config.
    for (const host of RETIRED_HOSTS) {
      const idxs = hostRules
        .map((r, i) => ({ r, i }))
        .filter(({ r }) => hostOf(r) === host);
      const catchAll = idxs.find(({ r }) => r.source === '/:path*');
      if (!catchAll) continue;
      const specificAfter = idxs.filter(({ r, i }) => r.source !== '/:path*' && i > catchAll.i);
      expect(
        specificAfter.map(({ r }) => `${host}${r.source}`),
        `${host}: specific rules shadowed by the catch-all`,
      ).toEqual([]);
    }
  });

  it('does not touch hosts that intentionally point elsewhere', () => {
    for (const [host, dest] of Object.entries(INTENTIONAL_NON_CANONICAL)) {
      const rule = hostRules.find((r) => hostOf(r) === host);
      expect(rule, `${host} rule missing`).toBeDefined();
      expect(rule!.destination.startsWith(dest), `${host} should still point at ${dest}`).toBe(
        true,
      );
    }
  });

  it('never matches a Libsyn hostname — podcast distribution is not ours to move', () => {
    const libsyn = redirects.filter(
      (r) =>
        (r.has?.some((h) => h.value.includes('libsyn')) ?? false) ||
        r.destination.includes('libsyn.com'),
    );
    expect(libsyn.map((r) => r.destination), 'no redirect may match Libsyn').toEqual([]);
  });
});
