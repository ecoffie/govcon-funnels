import type { Episode } from '@/data/episodes';
import { episodes } from '@/data/episodes';

/**
 * Episode display/playback helpers. These lived in src/data/episodes.ts until
 * the dataset became script-generated (python3 scripts/rss-to-episodes.py) —
 * they now live here so regeneration never clobbers them.
 */

/** Latest N episodes (dataset is newest-first). */
export const latestEpisodes = (n: number): Episode[] => episodes.slice(0, n);

/** Format an ISO date like "Jul 23, 2026". */
export function formatEpisodeDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
