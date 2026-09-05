import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { episodes, episodeDate } from '@/lib/episodes';

/**
 * `/podcast` — the episode index, migrated from the podcast SPA (one-site
 * consolidation, 2026-08-24). Episode links use the POSITIONAL index, matching the
 * SPA's `/podcast/:index` contract. See src/lib/episodes.ts for why that ordering
 * must not be casually regenerated.
 */

export const metadata: Metadata = {
  title: 'GovCon Giants Podcast — Federal Contracting, Unfiltered',
  description:
    'Interviews with federal contractors, contracting officers, and small-business program staff on how government work actually gets won. 675 episodes and counting.',
  alternates: { canonical: 'https://govcongiants.com/podcast' },
  openGraph: {
    title: 'GovCon Giants Podcast',
    description:
      'Interviews with federal contractors, contracting officers, and small-business program staff on how government work actually gets won.',
    url: 'https://govcongiants.com/podcast',
    type: 'website',
  },
};

export default function PodcastIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'GovCon Giants Podcast',
    url: 'https://govcongiants.com/podcast',
    description:
      'Interviews with federal contractors, contracting officers, and small-business program staff on how government work actually gets won.',
    webFeed: 'https://govcongiants.libsyn.com/rss',
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <h1 className="text-3xl font-bold sm:text-4xl">GovCon Giants Podcast</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Conversations with contractors, contracting officers, and small-business program
          staff about how federal work actually gets won.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Showing the {episodes.length} most recent episodes.{' '}
          <a
            href="https://govcongiants.libsyn.com/rss"
            className="text-violet-300 underline-offset-2 hover:underline"
          >
            Subscribe via RSS
          </a>
        </p>

        <ul className="mt-10 flex flex-col gap-4">
          {episodes.map((ep) => (
            <li key={ep.slug}>
              <Link
                href={`/podcast/${ep.slug}`}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition hover:border-violet-500/50 hover:bg-slate-900"
              >
                <Image
                  src={ep.thumb}
                  alt=""
                  width={72}
                  height={72}
                  className="h-18 w-18 flex-shrink-0 rounded-lg object-cover"
                  style={{ width: 72, height: 72 }}
                />
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug text-slate-100">
                    {ep.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {episodeDate(ep.date)} · {ep.duration}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                    {ep.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
