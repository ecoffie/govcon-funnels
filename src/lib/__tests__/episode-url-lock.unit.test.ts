import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { episodes, getEpisode } from '../episodes';
import lock from '@/data/episode-url-lock.json';

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
 * IF THIS TEST FAILS after an intentional feed refresh, do NOT just re-freeze the lock
 * file. The old indexes are public URLs. Either append new episodes at the END, or add
 * redirects mapping the old index to the episode's new position.
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
  it('still serves exactly 150 episodes', () => {
    expect(episodes.length).toBe(lockData.count);
    expect(episodes.length).toBe(150);
  });

  it.each(PINNED)('index %i still resolves to its locked episode', (i) => {
    const expected = lockData.episodes[i];
    const actual = getEpisode(i);
    expect(actual, `no episode at index ${i}`).toBeDefined();
    expect(actual!.title).toBe(expected.title);
    expect(actual!.date).toBe(expected.date);
    expect(actual!.link).toBe(expected.link);
  });

  it('preserves the FULL 0-149 mapping, not just the pinned samples', () => {
    const drift = lockData.episodes
      .filter((e) => episodes[e.index]?.title !== e.title)
      .map((e) => `  [${e.index}] locked "${e.title}" but got "${episodes[e.index]?.title}"`);
    expect(drift, `${drift.length} legacy podcast URL(s) changed meaning:\n${drift.join('\n')}`)
      .toEqual([]);
  });

  it('title checksum is unchanged (catches reordering the lock file itself)', () => {
    const sha = createHash('sha256')
      .update(episodes.map((e) => e.title).join('\n'))
      .digest('hex');
    expect(sha).toBe(lockData.sha256_of_titles);
  });

  it('index boundaries hold — 149 exists, 150 does not', () => {
    expect(getEpisode(149)).toBeDefined();
    expect(getEpisode(150)).toBeUndefined();
    expect(getEpisode(-1)).toBeUndefined();
  });

  it('audio stays on Libsyn — distribution is not ours to move', () => {
    // The consolidation moves the WEBSITE. Podcast distribution stays on Libsyn, and
    // no redirect rule may ever match these hosts.
    const offHost = episodes.filter((e) => !/(^https:\/\/traffic\.libsyn\.com\/)/.test(e.audioUrl));
    expect(offHost.map((e) => e.audioUrl)).toEqual([]);
  });
});
