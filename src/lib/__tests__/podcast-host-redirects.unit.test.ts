import { describe, it, expect } from 'vitest';
import vercelConfig from '../../../vercel.json';
import episodeSlugs from '@/data/episode-slugs.json';
import featuredSlugs from '@/data/featured-slugs.json';
import episodeLock from '@/data/episode-url-lock.json';

/**
 * DORMANT REDIRECT CONTRACT for podcast.govcongiants.org.
 *
 * The hostname is still attached to the govcon-giants-site (Vite SPA) project, so these
 * rules match nothing today. They are deployed FIRST, deliberately: moving the hostname
 * to govcon-funnels then activates them atomically. That ordering is the inverse of the
 * failure that took ~10 route families down twice — a redirect going live before the
 * host it depends on had moved.
 *
 * Episode identities are bound to the IMMUTABLE LIBSYN LINK via
 * src/data/episode-slugs.json, never to a current array position. The RSS feed
 * regenerates newest-first, so a position-bound mapping would silently re-point every
 * published URL at a different episode on the next refresh.
 */

interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: { type: string; value: string }[];
}

const HOST = 'podcast.govcongiants.org';
const CANONICAL = 'https://govcongiants.com';

const redirects = (vercelConfig as { redirects: Redirect[] }).redirects;
const hostOf = (r: Redirect) => r.has?.find((h) => h.type === 'host')?.value;

/** Podcast-host rules, in declaration order — Vercel takes the first match. */
const rules = redirects.filter((r) => hostOf(r) === HOST);
const sources = rules.map((r) => r.source);
const bySource = new Map(rules.map((r) => [r.source, r]));

const episodes = (episodeSlugs as { episodes: { index: number; slug: string; title: string; link: string }[] }).episodes;
const featured = (featuredSlugs as { episodes: { index: number; slug: string; guest: string; link: string }[] }).episodes;
const lock = (episodeLock as { count: number; episodes: { index: number; title: string; link: string }[] }).episodes;

describe('podcast host — episode identity is bound to the immutable Libsyn link', () => {
  it('the slug map agrees with the frozen URL lock on every index', () => {
    const lockByIndex = new Map(lock.map((l) => [l.index, l]));
    const drift = episodes
      .filter((e) => {
        const l = lockByIndex.get(e.index);
        return !l || l.link !== e.link || l.title !== e.title;
      })
      .map((e) => `[${e.index}] ${e.title}`);
    expect(drift, `slug map drifted from the URL lock:\n${drift.join('\n')}`).toEqual([]);
  });

  it('covers all 150 numeric episode URLs', () => {
    expect(episodes.length).toBe(150);
    const missing = episodes
      .filter((e) => !bySource.has(`/podcast/${e.index}`))
      .map((e) => e.index);
    expect(missing, `numeric episode URLs with no rule: ${missing.join(', ')}`).toEqual([]);
  });

  it('covers all 6 featured URLs', () => {
    expect(featured.length).toBe(6);
    const missing = featured
      .filter((f) => !bySource.has(`/podcast/featured/${f.index}`))
      .map((f) => f.index);
    expect(missing, `featured URLs with no rule: ${missing.join(', ')}`).toEqual([]);
  });

  it('every numeric URL targets its EXACT frozen canonical slug', () => {
    const wrong = episodes
      .filter((e) => bySource.get(`/podcast/${e.index}`)?.destination !== `${CANONICAL}/podcast/${e.slug}`)
      .map((e) => `[${e.index}] expected /podcast/${e.slug}, got ${bySource.get(`/podcast/${e.index}`)?.destination}`);
    expect(wrong, `numeric URLs pointing at the wrong episode:\n${wrong.join('\n')}`).toEqual([]);
  });

  it('every featured URL targets its EXACT canonical episode slug', () => {
    const wrong = featured
      .filter((f) => bySource.get(`/podcast/featured/${f.index}`)?.destination !== `${CANONICAL}/podcast/${f.slug}`)
      .map((f) => `[${f.index}] ${f.guest}: expected /podcast/${f.slug}`);
    expect(wrong, `featured URLs pointing at the wrong episode:\n${wrong.join('\n')}`).toEqual([]);
  });

  it('reaches the canonical slug in ONE hop — never via a numeric .com URL', () => {
    // A destination of .com/podcast/<number> would redirect AGAIN on the .com side.
    const chained = rules
      .filter((r) => /\/podcast\/\d+$/.test(r.destination))
      .map((r) => `${r.source} -> ${r.destination}`);
    expect(chained, `destinations that would redirect again:\n${chained.join('\n')}`).toEqual([]);
  });

  it('has no duplicate source, so no rule is shadowed', () => {
    const seen = new Map<string, number>();
    for (const s of sources) seen.set(s, (seen.get(s) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([s]) => s);
    expect(dupes, `duplicate sources:\n${dupes.join('\n')}`).toEqual([]);
  });
});

describe('podcast host — rule ordering (first match wins)', () => {
  it('featured aliases precede numeric episode rules', () => {
    // Otherwise "/podcast/featured/0" could be captured by a numeric pattern.
    expect(sources.indexOf('/podcast/featured/0')).toBeLessThan(sources.indexOf('/podcast/0'));
  });

  it('specific episode rules precede the generic /podcast index rule', () => {
    const idx = sources.indexOf('/podcast');
    expect(idx).toBeGreaterThan(-1);
    for (const e of episodes) {
      expect(sources.indexOf(`/podcast/${e.index}`), `/podcast/${e.index} must precede /podcast`)
        .toBeLessThan(idx);
    }
    for (const f of featured) {
      expect(sources.indexOf(`/podcast/featured/${f.index}`)).toBeLessThan(idx);
    }
  });

  it('the path-preserving catch-all is LAST', () => {
    expect(sources[sources.length - 1]).toBe('/:path*');
  });

  it('the root rule precedes the catch-all', () => {
    expect(sources.indexOf('/')).toBeLessThan(sources.indexOf('/:path*'));
  });
});

describe('podcast host — destinations and honest 404s', () => {
  it('root goes to the podcast index, not the homepage', () => {
    expect(bySource.get('/')?.destination).toBe(`${CANONICAL}/podcast`);
  });

  it('the podcast index maps to the canonical index', () => {
    expect(bySource.get('/podcast')?.destination).toBe(`${CANONICAL}/podcast`);
  });

  it('known duplicate routes map to their canonical equivalents', () => {
    expect(bySource.get('/blog')?.destination).toBe(`${CANONICAL}/blog`);
    expect(bySource.get('/about')?.destination).toBe(`${CANONICAL}/about`);
    expect(bySource.get('/resources')?.destination).toBe(`${CANONICAL}/resources`);
  });

  it('unknown paths are path-preserving, so they 404 honestly on .com', () => {
    // A blanket redirect of unknown paths to /podcast would be a soft 404: Google
    // treats a redirect-to-irrelevant-page as a weak signal, and a user following a
    // dead link lands somewhere that silently is not what they asked for.
    const catchAll = bySource.get('/:path*');
    expect(catchAll, 'catch-all rule missing').toBeDefined();
    expect(catchAll!.destination).toBe(`${CANONICAL}/:path*`);
    expect(catchAll!.destination).not.toBe(`${CANONICAL}/podcast`);
  });

  it('every rule is a permanent redirect', () => {
    const temporary = rules.filter((r) => r.permanent !== true).map((r) => r.source);
    expect(temporary, `non-permanent rules:\n${temporary.join('\n')}`).toEqual([]);
  });

  it('no destination uses an intermediate host', () => {
    const intermediates = [
      'https://www.govcongiants.com',
      'https://app.govcongiants.org',
      'https://govcongiants.org',
      'https://www.govcongiants.org',
      'https://guides.govcongiants.org',
      'https://funnels.govcongiants.org',
      'https://podcast.govcongiants.org',
      'https://mi.govcongiants.com',
      'https://shop.govcongiants.com',
    ];
    const bad = rules
      .filter((r) => intermediates.some((i) => r.destination.startsWith(i)))
      .map((r) => `${r.source} -> ${r.destination}`);
    expect(bad, `destinations on an intermediate host:\n${bad.join('\n')}`).toEqual([]);
  });

  it('never redirects to itself — no cycle', () => {
    const selfRef = rules.filter((r) => r.destination.includes(HOST)).map((r) => r.source);
    expect(selfRef, `rules pointing back at ${HOST}:\n${selfRef.join('\n')}`).toEqual([]);
  });

  it('every destination is on the canonical host', () => {
    const offHost = rules
      .filter((r) => !r.destination.startsWith(`${CANONICAL}/`))
      .map((r) => `${r.source} -> ${r.destination}`);
    expect(offHost, `destinations off the canonical host:\n${offHost.join('\n')}`).toEqual([]);
  });

  it('never matches a Libsyn hostname — distribution is not ours to move', () => {
    const libsyn = rules.filter((r) => r.destination.includes('libsyn.com'));
    expect(libsyn.map((r) => r.destination)).toEqual([]);
  });

  it('declares the expected rule count: 150 + 6 + index + 3 duplicates + root + catch-all', () => {
    expect(rules.length).toBe(150 + 6 + 1 + 3 + 1 + 1);
  });
});
