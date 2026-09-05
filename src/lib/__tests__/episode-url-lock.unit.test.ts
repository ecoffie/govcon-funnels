import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { episodes, getEpisode, getEpisodeBySlug } from '../episodes';
import slugMap from '@/data/episode-slugs.json';
import lock from '@/data/episode-url-lock.json';
import archive from '@/data/episodes-archive.json';

/**
 * Locks the legacy `/podcast/:index` URL contract.
 *
 * WHY THIS EXISTS
 * ---------------
 * `/podcast/:index` resolves to `episodes[index]` — the ARRAY POSITION, not a stable
 * id. That is how the podcast SPA worked, those URLs are indexed and shared, and the
 * 2026-08-24 one-site consolidation carried them to `.com` unchanged.
 *
 * The danger is quiet: `scripts/rss-to-episodes.py` regenerates the array newest-first,
 * PREPENDING new episodes. One refresh shifts every existing index by the number of new
 * episodes, so `/podcast/7` silently starts serving a different show. No error, no 404 —
 * the URL still resolves, just to the wrong episode. Search engines and anyone who
 * shared a link land somewhere unintended.
 *
 * These tests fail loudly the moment that happens.
 *
 * RESOLVED (slug migration). Episodes are now addressed by a stable slug, and the
 * legacy numeric URLs 308 to it. That removes the shifting-index failure mode, but the
 * lock is still load-bearing: it is the frozen record of WHAT EACH LEGACY INDEX MEANT,
 * and therefore the source of truth for the redirect map. If the feed is regenerated
 * and an index no longer resolves to its locked episode, the redirects start pointing
 * at the wrong show.
 *
 * IF THIS TEST FAILS after an intentional feed refresh, do NOT just re-freeze the lock
 * file. The old indexes are public URLs. Either append new episodes at the END, or
 * update the index→slug map so each legacy index still redirects to its own episode.
 */

interface LockEntry {
  index: number;
  title: string;
  date: string;
  link: string;
}
const lockData = lock as { count: number; sha256_of_titles: string; episodes: LockEntry[] };

/** The representative legacy indexes Eric called out, plus the boundaries. */
const PINNED = [0, 7, 42, 43, 149];

describe('legacy /podcast/:index URL contract', () => {
  it('still serves every locked episode, plus the historical supplement', () => {
    // `episodes` is the rolling RSS window merged with the archived episodes that
    // fell out of it, so its length is derived, not fixed at the lock's count.
    expect(episodes.length).toBeGreaterThanOrEqual(lockData.count);
    expect(episodes.length).toBe(lockData.count + archive.length);
  });

  it.each(PINNED)('index %i still resolves to its locked episode', (i) => {
    const expected = lockData.episodes[i];
    const actual = getEpisode(i);
    expect(actual, `no episode at index ${i}`).toBeDefined();
    expect(actual!.title).toBe(expected.title);
    expect(actual!.date).toBe(expected.date);
    expect(actual!.link).toBe(expected.link);
  });

  it('preserves the FULL legacy mapping, not just the pinned samples', () => {
    const drift = lockData.episodes
      .filter((e) => getEpisode(e.index)?.title !== e.title)
      .map((e) => `  [${e.index}] locked "${e.title}" but got "${getEpisode(e.index)?.title}"`);
    expect(drift, `${drift.length} legacy podcast URL(s) changed meaning:\n${drift.join('\n')}`)
      .toEqual([]);
  });

  it('title checksum is unchanged (catches reordering the lock file itself)', () => {
    // Checksum the LEGACY sequence resolved through the frozen map — `episodes` now
    // also carries the historical supplement and is sorted by date.
    const sha = createHash('sha256')
      .update(lockData.episodes.map((e) => getEpisode(e.index)?.title ?? '').join('\n'))
      .digest('hex');
    expect(sha).toBe(lockData.sha256_of_titles);
  });

  it('index boundaries hold — the last locked index exists, one past it does not', () => {
    const last = lockData.count - 1;
    expect(getEpisode(last)).toBeDefined();
    expect(getEpisode(lockData.count)).toBeUndefined();
    expect(getEpisode(-1)).toBeUndefined();
  });

  it('audio stays on Libsyn — distribution is not ours to move', () => {
    // The consolidation moves the WEBSITE. Podcast distribution stays on Libsyn, and
    // no redirect rule may ever match these hosts.
    const offHost = episodes.filter((e) => !/(^https:\/\/traffic\.libsyn\.com\/)/.test(e.audioUrl));
    expect(offHost.map((e) => e.audioUrl)).toEqual([]);
  });
});

/**
 * The slug migration itself: every legacy numeric URL must land on exactly one real
 * episode page, and every episode must have exactly one canonical URL.
 */
describe('/podcast/:index → /podcast/:slug migration', () => {
  const mapped = (slugMap as { count: number; episodes: { index: number; slug: string }[] })
    .episodes;

  it('every episode has a non-empty slug', () => {
    const missing = episodes.filter((e) => !e.slug).map((e) => e.title);
    expect(missing, `episodes without a slug:\n${missing.join('\n')}`).toEqual([]);
  });

  it('slugs are unique — no two episodes share a URL', () => {
    const counts = new Map<string, number>();
    for (const e of episodes) counts.set(e.slug, (counts.get(e.slug) ?? 0) + 1);
    const collisions = [...counts.entries()].filter(([, n]) => n > 1).map(([s]) => s);
    expect(collisions, `slug collisions:\n${collisions.join('\n')}`).toEqual([]);
    expect(new Set(episodes.map((e) => e.slug)).size).toBe(episodes.length);
  });

  it('slugs are URL-safe', () => {
    const bad = episodes.filter((e) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug));
    expect(bad.map((e) => e.slug), 'slugs must be lowercase kebab-case').toEqual([]);
  });

  it('a slug is never a bare number — that would collide with a legacy index URL', () => {
    const numeric = episodes.filter((e) => /^\d+$/.test(e.slug));
    expect(numeric.map((e) => e.slug)).toEqual([]);
  });

  it('provides a redirect target for every legacy index', () => {
    expect(mapped.length).toBe(lockData.count);
    const gaps = Array.from({ length: lockData.count }, (_, i) => i).filter(
      (i) => !mapped.some((m) => m.index === i),
    );
    expect(gaps, `legacy indices with no slug mapping: ${gaps.join(', ')}`).toEqual([]);
  });

  it('each legacy index redirects to the SAME episode the lock froze', () => {
    const wrong = lockData.episodes
      .map((locked) => {
        const target = mapped.find((m) => m.index === locked.index)?.slug;
        const landed = target ? getEpisodeBySlug(target) : undefined;
        return landed?.title === locked.title
          ? null
          : `  [${locked.index}] "${locked.title}" → ${target ?? '(no mapping)'} → "${landed?.title ?? '(404)'}"`;
      })
      .filter(Boolean);
    expect(wrong, `legacy URLs redirecting to the wrong episode:\n${wrong.join('\n')}`).toEqual([]);
  });

  it('redirect targets resolve directly — no redirect chains', () => {
    // A target that is itself a bare number would redirect again. One hop, always.
    const chained = mapped.filter((m) => /^\d+$/.test(m.slug));
    expect(chained.map((m) => m.slug), 'redirect target must not be another legacy URL').toEqual(
      [],
    );
    for (const m of mapped) expect(getEpisodeBySlug(m.slug)).toBeDefined();
  });

  it('out-of-range indices resolve to nothing, so the route can 404', () => {
    // The SPA served its homepage shell for these, which put soft-404s into Google's
    // index. They must be genuine misses now.
    for (const i of [lockData.count, lockData.count + 1, 156, 999, -1]) {
      expect(getEpisode(i)).toBeUndefined();
    }
  });

  it('unknown slugs resolve to nothing, so the route can 404', () => {
    for (const s of ['not-an-episode', '', 'undefined']) {
      expect(getEpisodeBySlug(s)).toBeUndefined();
    }
  });
});
