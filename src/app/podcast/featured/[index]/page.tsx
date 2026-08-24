import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import featuredJson from '@/data/featured-episodes.json';
import { episodeDate } from '@/lib/episodes';

/**
 * `/podcast/featured/:index` — the curated guest interviews, migrated from the podcast
 * SPA (one-site consolidation, 2026-08-24). Positional index, matching the SPA route,
 * so the existing URLs survive unchanged.
 *
 * Audio stays on Libsyn — distribution is untouched by this migration.
 */

interface FeaturedEpisode {
  guest: string;
  role: string;
  agency: string;
  photo: string;
  title: string;
  date: string;
  duration: string;
  link: string;
  audioUrl: string;
  blurb: string;
  body: string;
}

const featured = featuredJson as FeaturedEpisode[];

export function generateStaticParams() {
  return featured.map((_, i) => ({ index: String(i) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ index: string }>;
}): Promise<Metadata> {
  const { index } = await params;
  const ep = featured[Number(index)];
  if (!ep) return { title: 'Episode Not Found' };
  return {
    title: `${ep.guest} — ${ep.title}`.slice(0, 70),
    description: ep.blurb.slice(0, 158),
    alternates: { canonical: `https://govcongiants.com/podcast/featured/${index}` },
    openGraph: {
      title: `${ep.guest} — ${ep.title}`.slice(0, 70),
      description: ep.blurb.slice(0, 158),
      url: `https://govcongiants.com/podcast/featured/${index}`,
      type: 'article',
    },
  };
}

export default async function FeaturedEpisodePage({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const { index } = await params;
  const ep = featured[Number(index)];
  if (!ep) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.title,
    datePublished: ep.date,
    description: ep.blurb,
    url: `https://govcongiants.com/podcast/featured/${index}`,
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
          <span className="text-slate-300">Featured</span>
        </nav>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <Image
            src={ep.photo}
            alt={ep.guest}
            width={120}
            height={120}
            className="rounded-xl object-cover"
            style={{ width: 120, height: 120 }}
            priority
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-violet-300">{ep.guest}</p>
            <p className="text-xs text-slate-500">
              {ep.role}
              {ep.agency ? ` · ${ep.agency}` : ''}
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{ep.title}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {episodeDate(ep.date)} · {ep.duration}
            </p>
          </div>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-slate-300">{ep.blurb}</p>

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
      </div>
    </main>
  );
}
