import { describe, it, expect } from 'vitest';
import { episodes, getEpisode, getEpisodeBySlug } from '../episodes';
import slugMap from '@/data/episode-slugs.json';
import featuredSlugs from '@/data/featured-slugs.json';
import featuredEpisodes from '@/data/featured-episodes.json';
import archive from '@/data/episodes-archive.json';

/**
 * THE LEGACY REDIRECT CONTRACT: `/podcast/:index` → 308 → `/podcast/:slug`.
 *
 * 308 IS THE APPROVED STATUS, decided 2026-09-05 — not an implementation convenience.
 * The spec originally said 301. Google treats 301 and 308 identically for indexing and
 * signal transfer, and Next's App Router emits only 303/307/308 (`permanentRedirect()`
 * hardcodes 308, with no status override). Emitting a literal 301 would require moving
 * all 150 mappings into next.config.ts, splitting the redirect map away from the frozen
 * slug data it is derived from. Keeping them colocated gives one authoritative mapping.
 *
 * If anyone later "fixes" this to 301 by relocating the redirects, these tests and the
 * route comment are the record of why it was 308 on purpose.
 *
 * These assert the DATA the route redirects with. The HTTP status itself is verified
 * against a running server in tasks/CUTOVER-podcast-routes.md §5.
 */

const entries = (slugMap as {
  count: number;
  episodes: { index: number; slug: string; title: string; link: string }[];
}).episodes;

/** The route's guard, mirrored. Only canonical integers are legacy episode URLs. */
const isLegacyIndex = (slug: string) => /^(0|[1-9]\d*)$/.test(slug);

describe('legacy redirect contract (308 → frozen slug)', () => {
  it('covers every legacy index 0-149, with no gaps or duplicates', () => {
    const idx = entries.map((e) => e.index).sort((a, b) => a - b);
    expect(idx.length).toBe(150);
    expect(idx[0]).toBe(0);
    expect(idx[idx.length - 1]).toBe(149);
    expect(new Set(idx).size).toBe(150);
    const gaps = Array.from({ length: 150 }, (_, i) => i).filter((i) => !idx.includes(i));
    expect(gaps, `missing legacy indices: ${gaps.join(', ')}`).toEqual([]);
  });

  it('every legacy index redirects to its EXACT frozen slug', () => {
    const wrong = entries
      .map((e) => {
        const landed = getEpisodeBySlug(e.slug);
        if (!landed) return `[${e.index}] → ${e.slug} → 404`;
        return landed.title === e.title
          ? null
          : `[${e.index}] → ${e.slug} → "${landed.title}" (expected "${e.title}")`;
      })
      .filter(Boolean);
    expect(wrong, `redirects landing on the wrong episode:\n${wrong.join('\n')}`).toEqual([]);
  });

  it('every redirect terminates in ONE hop — the target is never itself a redirect', () => {
    // A target that still looks like a legacy index would redirect again.
    const chained = entries.filter((e) => isLegacyIndex(e.slug));
    expect(chained.map((e) => e.slug), 'redirect target must not be another legacy URL').toEqual(
      [],
    );
    // And every target must resolve directly to a real episode.
    for (const e of entries) expect(getEpisodeBySlug(e.slug), `${e.slug} missing`).toBeDefined();
  });

  it('the redirect target is the episode canonical URL, so no chain forms downstream', () => {
    for (const e of entries) {
      const landed = getEpisodeBySlug(e.slug)!;
      expect(landed.slug).toBe(e.slug);
    }
  });

  it('out-of-range numeric paths resolve to nothing → genuine 404', () => {
    // The SPA answered ANY index with its homepage shell, which put soft-404s into
    // Google's index (/podcast/150 … /podcast/156 were live 200s). These must miss.
    for (const i of [150, 151, 156, 999, 100000, -1]) {
      expect(getEpisode(i), `index ${i} must not resolve`).toBeUndefined();
    }
  });

  it('malformed numeric-looking paths are not treated as legacy URLs', () => {
    // Zero-padded, exponent, hex, decimal, signed, whitespace and non-ASCII digits all
    // fall through to the slug lookup (and 404) instead of minting duplicate URLs that
    // funnel to one episode.
    const malformed = [
      '007',
      '0007',
      '1.0',
      '1e2',
      '0x10',
      '+1',
      '-1',
      ' 1',
      '1 ',
      '1_0',
      'Infinity',
      'NaN',
      '١٢٣',
      '１２３',
    ];
    for (const m of malformed) {
      expect(isLegacyIndex(m), `"${m}" must not be treated as a legacy index`).toBe(false);
      expect(getEpisodeBySlug(m), `"${m}" must not resolve as a slug`).toBeUndefined();
    }
  });

  it('a huge integer passes the shape guard but still 404s on range', () => {
    // Guards the two-layer defence: shape check, then range check.
    expect(isLegacyIndex('9007199254740993')).toBe(true);
    expect(getEpisode(Number('9007199254740993'))).toBeUndefined();
  });
});

/**
 * `/podcast/featured/:index` carried the SAME positional-identity defect: the index was
 * a position in a curated list, so re-curating it silently re-pointed a published URL at
 * a different interview. Same fix, same contract.
 */
describe('featured alias contract (308 → canonical episode slug)', () => {
  const featured = (featuredSlugs as {
    count: number;
    episodes: { index: number; slug: string; guest: string; title: string; link: string }[];
  }).episodes;

  const isFeaturedIndex = (index: string) => /^(0|[1-9]\d*)$/.test(index);

  it('freezes an identity for every featured index, contiguous from 0', () => {
    const idx = featured.map((f) => f.index).sort((a, b) => a - b);
    expect(idx.length).toBe((featuredEpisodes as unknown[]).length);
    expect(idx[0]).toBe(0);
    expect(new Set(idx).size).toBe(idx.length);
    const gaps = Array.from({ length: idx.length }, (_, i) => i).filter((i) => !idx.includes(i));
    expect(gaps, `featured indices with no mapping: ${gaps.join(', ')}`).toEqual([]);
  });

  it('every featured index resolves to a real, canonical episode page', () => {
    const broken = featured
      .map((f) => (getEpisodeBySlug(f.slug) ? null : `[${f.index}] ${f.guest} → ${f.slug} → 404`))
      .filter(Boolean);
    expect(broken, `featured aliases with no target:\n${broken.join('\n')}`).toEqual([]);
  });

  it('redirects one hop — the target is a slug, never another alias', () => {
    for (const f of featured) {
      expect(isFeaturedIndex(f.slug), `${f.slug} must not look like an index`).toBe(false);
      const landed = getEpisodeBySlug(f.slug)!;
      expect(landed.slug).toBe(f.slug);
    }
  });

  it('is bound by Libsyn link, so re-curating the featured list cannot reassign a URL', () => {
    // The frozen link must still identify the same episode the alias points at.
    const drifted = featured
      .map((f) => {
        const landed = getEpisodeBySlug(f.slug);
        return landed && landed.link === f.link
          ? null
          : `[${f.index}] ${f.guest}: frozen link ${f.link} ≠ ${landed?.link ?? '(none)'}`;
      })
      .filter(Boolean);
    expect(drifted, `featured aliases bound to the wrong episode:\n${drifted.join('\n')}`).toEqual(
      [],
    );
  });

  it('out-of-range and malformed featured indices resolve to nothing → 404', () => {
    const count = featured.length;
    for (const i of [count, count + 1, 99, 999]) {
      expect(featured.find((f) => f.index === i), `featured index ${i} must not resolve`)
        .toBeUndefined();
    }
    for (const m of ['007', '1.0', '1e2', '-1', '+1', 'abc', '']) {
      expect(isFeaturedIndex(m), `"${m}" must not be treated as a featured index`).toBe(false);
    }
  });
});

describe('historical supplement (episodes outside the rolling RSS window)', () => {
  const archived = archive as { slug: string; link: string; title: string; audioUrl: string }[];

  it('every archived episode is reachable as a canonical page', () => {
    const missing = archived.filter((a) => !getEpisodeBySlug(a.slug)).map((a) => a.slug);
    expect(missing, `archived episodes with no page:\n${missing.join('\n')}`).toEqual([]);
  });

  it('merging the archive introduces no duplicate episode', () => {
    // Dedupe is by Libsyn link: if an archived episode later reappears in the rolling
    // feed, the rolling copy wins and the archive entry is dropped.
    expect(new Set(episodes.map((e) => e.link)).size).toBe(episodes.length);
    expect(new Set(episodes.map((e) => e.slug)).size).toBe(episodes.length);
  });

  it('archived audio also stays on Libsyn', () => {
    const offHost = archived.filter((a) => !/^https:\/\/traffic\.libsyn\.com\//.test(a.audioUrl));
    expect(offHost.map((a) => a.audioUrl)).toEqual([]);
  });

  it('archived episodes carry real content, not placeholders', () => {
    for (const a of archived) {
      const ep = getEpisodeBySlug(a.slug)!;
      expect(ep.title.length, `${a.slug} title`).toBeGreaterThan(0);
      expect(ep.description.length, `${a.slug} description`).toBeGreaterThan(0);
      expect(ep.body.length, `${a.slug} body`).toBeGreaterThan(100);
      expect(ep.date, `${a.slug} date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('no positional podcast URL is indexable', () => {
  it('the sitemap lists only canonical slugs — no numeric or featured aliases', async () => {
    const { default: sitemap } = await import('@/app/sitemap');
    const podcastUrls = sitemap()
      .map((entry) => entry.url)
      .filter((url) => url.includes('/podcast'));

    const numeric = podcastUrls.filter((u) => /\/podcast\/\d+$/.test(u));
    expect(numeric, 'legacy numeric URLs must not be in the sitemap').toEqual([]);

    const featuredInSitemap = podcastUrls.filter((u) => u.includes('/podcast/featured/'));
    expect(featuredInSitemap, 'featured aliases must not be in the sitemap').toEqual([]);

    // /podcast plus exactly one canonical URL per episode.
    expect(podcastUrls.length).toBe(episodes.length + 1);
    expect(new Set(podcastUrls).size).toBe(podcastUrls.length);
  });

  it('every sitemap podcast URL resolves to a real episode', async () => {
    const { default: sitemap } = await import('@/app/sitemap');
    const slugs = sitemap()
      .map((e) => e.url)
      .filter((u) => /\/podcast\/[^/]+$/.test(u))
      .map((u) => u.split('/').pop()!);
    const broken = slugs.filter((s) => !getEpisodeBySlug(s));
    expect(broken, `sitemap URLs with no episode:\n${broken.join('\n')}`).toEqual([]);
  });
});

describe('slugs are bound to episodes by link, not array position', () => {
  it('every frozen entry names the link its slug belongs to', () => {
    const missing = entries.filter((e) => !e.link);
    expect(missing.map((e) => e.index), 'frozen entries without a link').toEqual([]);
  });

  it('links are unique, so the binding is unambiguous', () => {
    expect(new Set(entries.map((e) => e.link)).size).toBe(entries.length);
  });

  it('a feed refresh that PREPENDS episodes does not reassign any published slug', () => {
    // rss-to-episodes.py prepends newest-first. Position-bound slugs would shift onto
    // the wrong episodes — the exact bug the migration removes. Link-bound slugs do not.
    //
    // Both slug sources are link-keyed: the frozen map for the rolling window, and the
    // archive file for episodes that have aged out of it.
    const slugByLink = new Map<string, string>([
      ...entries.map((e) => [e.link, e.slug] as const),
      ...(archive as { link: string; slug: string }[]).map((a) => [a.link, a.slug] as const),
    ]);
    const reassigned = episodes.filter((e) => slugByLink.get(e.link) !== e.slug);
    expect(
      reassigned.map((e) => e.slug),
      'these episodes would inherit the wrong slug after a refresh',
    ).toEqual([]);
  });

  it('every episode slug comes from a link-keyed source, never a position', () => {
    const known = new Set([
      ...entries.map((e) => e.link),
      ...(archive as { link: string }[]).map((a) => a.link),
    ]);
    const unbound = episodes.filter((e) => !known.has(e.link)).map((e) => e.slug);
    expect(unbound, 'episodes with no frozen slug binding').toEqual([]);
  });
});
