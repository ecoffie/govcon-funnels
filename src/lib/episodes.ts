import episodesJson from '@/data/episodes.json';

/**
 * Podcast episode data, migrated from the podcast SPA in the 2026-08-24 one-site
 * consolidation.
 *
 * ⚠️ THE ROUTE INDEX IS POSITIONAL. `/podcast/:index` resolves to `episodes[index]` —
 * the array position, not a stable id. That is how the SPA worked and those URLs are
 * already indexed, so the ORDER OF THIS ARRAY IS PART OF THE PUBLIC CONTRACT.
 *
 * Consequence: regenerating the array from the RSS feed with new episodes at the top
 * SHIFTS EVERY EXISTING URL. `/podcast/7` silently becomes a different episode. The
 * generator (`rss-to-episodes.py`) prepends newest-first, so a refresh is exactly the
 * dangerous case.
 *
 * Before regenerating: either append rather than prepend, or accept the shift and add
 * redirects. A slug-based route would be the durable fix, but changing it now would
 * break the indexed numeric URLs — that is a separate, deliberate migration.
 *
 * Audio and artwork stay on Libsyn (`traffic.libsyn.com`, `static.libsyn.com`). Podcast
 * DISTRIBUTION is not part of this consolidation and no redirect rule may match a
 * libsyn hostname.
 */

export interface Episode {
  title: string;
  /** ISO date (YYYY-MM-DD) parsed from the RSS pubDate */
  date: string;
  description: string;
  /** e.g. "09:34" */
  duration: string;
  /** Libsyn episode page URL */
  link: string;
  /** Direct MP3 from the RSS enclosure — stays on traffic.libsyn.com */
  audioUrl: string;
  /** Per-episode artwork from the feed, if present */
  image: string | null;
  /** Local thumbnail in /public/episodes */
  thumb: string;
  /** Full untruncated description for the detail page */
  body: string;
}

export const episodes = episodesJson as Episode[];

export const getEpisode = (index: number): Episode | undefined =>
  Number.isInteger(index) && index >= 0 && index < episodes.length
    ? episodes[index]
    : undefined;

/** Human date, e.g. "Jul 23, 2026". Stable across locales. */
export function episodeDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
