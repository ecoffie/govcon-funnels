import { notFound, permanentRedirect } from 'next/navigation';
import { getEpisodeBySlug } from '@/lib/episodes';
import featuredSlugs from '@/data/featured-slugs.json';

/**
 * `/podcast/featured/:index` — LEGACY ALIAS, permanently redirected to the episode's
 * canonical `/podcast/:slug` page.
 *
 * These URLs carried the same positional-identity defect as `/podcast/:index`: the
 * index was a position in the curated featured list, so re-curating or reordering that
 * list silently re-pointed a published URL at a different interview. The six identities
 * are frozen in `src/data/featured-slugs.json`, bound by immutable Libsyn link, so
 * future edits to the featured list cannot reassign them.
 *
 * Five of the six predate the rolling RSS window and would otherwise have had no page
 * to point at; they were promoted into the episode dataset as a historical supplement
 * (`src/data/episodes-archive.json`) rather than being redirected to the index, which
 * would have discarded real content and read as a soft 404.
 *
 * 308, matching the legacy-index contract — see the note in `src/app/podcast/[slug]/
 * page.tsx` and tasks/CUTOVER-podcast-routes.md for why 308 and not 301.
 *
 * This route renders nothing: one canonical URL per episode, no duplicate content.
 */

interface FeaturedSlug {
  index: number;
  slug: string;
  guest: string;
  title: string;
  link: string;
}

const featured = (featuredSlugs as { episodes: FeaturedSlug[] }).episodes;

/** Only canonical integers. "007"/"1.0" never addressed a featured episode. */
const isFeaturedIndex = (index: string) => /^(0|[1-9]\d*)$/.test(index);

export function generateStaticParams() {
  return featured.map((f) => ({ index: String(f.index) }));
}

export default async function LegacyFeaturedPage({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const { index } = await params;
  if (!isFeaturedIndex(index)) notFound();

  const entry = featured.find((f) => f.index === Number(index));
  if (!entry) notFound();

  // The frozen slug must resolve to a real episode; if it somehow does not, 404 rather
  // than redirecting into a dead end.
  if (!getEpisodeBySlug(entry.slug)) notFound();

  permanentRedirect(`/podcast/${entry.slug}`);
}
