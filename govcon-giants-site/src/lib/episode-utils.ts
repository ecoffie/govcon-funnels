import type { Episode } from '@/data/episodes';
import { episodes } from '@/data/episodes';

/**
 * Episode display/playback helpers. These lived in src/data/episodes.ts until
 * the dataset became script-generated (python3 scripts/rss-to-episodes.py) —
 * they now live here so regeneration never clobbers them.
 */

/** Latest N episodes (dataset is newest-first). */
export const latestEpisodes = (n: number): Episode[] => episodes.slice(0, n);

/** Rotating fallback thumbnails for episodes without per-episode artwork. */
export const episodeThumbs = [
  '/thumb-ep-generic-1.png',
  '/thumb-ep-generic-2.png',
  '/thumb-ep-generic-3.png',
  '/thumb-ep-generic-4.png',
] as const;

export const episodeThumb = (index: number): string =>
  episodeThumbs[index % episodeThumbs.length];

/** Card/row artwork: per-episode RSS image when present, generic thumb otherwise. */
export const episodeArtwork = (episode: Episode, index: number): string =>
  episode.image ?? episodeThumb(index);

/** Format an ISO date like "Jul 23, 2026". */
export function formatEpisodeDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
