import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { episodes, getEpisode, episodeDate } from '@/lib/episodes';

/**
 * `/podcast/:index` — episode detail. The index is POSITIONAL and matches the SPA
 * route it replaces, so these URLs survive the consolidation unchanged. See
 * src/lib/episodes.ts before regenerating the episode array.
 *
 * Audio streams from Libsyn (`traffic.libsyn.com`) exactly as before — distribution
 * is untouched by this migration.
 */

export function generateStaticParams() {
  return episodes.map((_, i) => ({ index: String(i) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ index: string }>;
}): Promise<Metadata> {
  const { index } = await params;
  const ep = getEpisode(Number(index));
  if (!ep) return { title: 'Episode Not Found' };
  return {
    title: ep.title,
    description: ep.description.slice(0, 158),
    alternates: { canonical: `https://govcongiants.com/podcast/${index}` },
    openGraph: {
      title: ep.title,
      description: ep.description.slice(0, 158),
      url: `https://govcongiants.com/podcast/${index}`,
      type: 'article',
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const { index } = await params;
  const i = Number(index);
  const ep = getEpisode(i);
  if (!ep) notFound();

  const newer = i > 0 ? { ep: episodes[i - 1], i: i - 1 } : undefined;
  const older = i < episodes.length - 1 ? { ep: episodes[i + 1], i: i + 1 } : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.title,
    datePublished: ep.date,
    description: ep.description,
    url: `https://govcongiants.com/podcast/${i}`,
    associatedMedia: { '@type': 'MediaObject', contentUrl: ep.audioUrl },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'GovCon Giants Podcast',
      url: 'https://govcongiants.com/podcast',
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <nav className="mb-8 text-sm text-slate-400">
          <Link href="/podcast" className="hover:text-white">
            Podcast
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Episode</span>
        </nav>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <Image
            src={ep.thumb}
            alt=""
            width={120}
            height={120}
            className="rounded-xl object-cover"
            style={{ width: 120, height: 120 }}
            priority
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{ep.title}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {episodeDate(ep.date)} · {ep.duration}
            </p>
          </div>
        </div>

        <audio controls preload="none" src={ep.audioUrl} className="mt-8 w-full">
          Your browser does not support audio playback.{' '}
          <a href={ep.audioUrl}>Download the episode</a>.
        </audio>

        <div className="mt-10 whitespace-pre-line text-base leading-relaxed text-slate-300">
          {ep.body}
        </div>

        <p className="mt-8 text-sm">
          <a
            href={ep.link}
            className="text-violet-300 underline-offset-2 hover:underline"
            rel="noopener"
          >
            Listen on Libsyn →
          </a>
        </p>

        <nav className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-between">
          {newer ? (
            <Link
              href={`/podcast/${newer.i}`}
              className="text-sm text-slate-400 hover:text-white"
            >
              ← {newer.ep.title.slice(0, 48)}
              {newer.ep.title.length > 48 ? '…' : ''}
            </Link>
          ) : (
            <span />
          )}
          {older && (
            <Link
              href={`/podcast/${older.i}`}
              className="text-sm text-slate-400 hover:text-white sm:text-right"
            >
              {older.ep.title.slice(0, 48)}
              {older.ep.title.length > 48 ? '…' : ''} →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
