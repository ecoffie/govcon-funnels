import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  episodes,
  getEpisode,
  getEpisodeBySlug,
  episodeNeighbours,
  episodeDate,
} from '@/lib/episodes';
import { parseEpisodeBody } from '@/lib/podcast/episode-content';
import { episodeTopic, isoDuration } from '@/lib/podcast/episode-utils';
import { resolveGuest } from '@/lib/podcast/episode-guests';
import EpisodePlayer from '@/components/podcast/EpisodePlayer';

/**
 * `/podcast/:slug` — episode detail with full show notes.
 *
 * The slug is stable across feed regeneration. Show notes (intro, takeaways,
 * timestamped chapters, links) are PARSED FROM THE FEED BODY — nothing is generated.
 * Sections the parser cannot find are omitted rather than filled in, so a sparse
 * episode renders a short page instead of an invented one.
 *
 * LEGACY NUMERIC URLS. The podcast SPA addressed episodes by array position, and the
 * 2026-08-24 consolidation carried `/podcast/:index` onto .com, so those URLs are
 * indexed and shared. A numeric segment is handled here and 308s to the episode it has
 * always meant, resolved through the frozen index→slug map
 * (`src/data/episode-slugs.json`). This is deliberately ONE dynamic segment: Next does
 * not allow `[index]` and `[slug]` as siblings, and a single segment also guarantees
 * exactly one indexable URL per episode.
 *
 * An index outside 0-149 is a genuine 404, NOT a redirect to /podcast. The SPA served
 * its homepage shell for any index, which put soft-404s (/podcast/150 … /podcast/156)
 * into Google's index; a real 404 is what gets them dropped.
 *
 * Audio streams from Libsyn exactly as before — distribution is untouched.
 */

const SITE = 'https://govcongiants.com';

export function generateStaticParams() {
  // Canonical slug URLs, plus the 150 legacy numeric URLs so their redirects are
  // resolved at build time rather than on demand.
  return [
    ...episodes.map((e) => ({ slug: e.slug })),
    ...episodes.map((_, i) => ({ slug: String(i) })),
  ];
}

/**
 * A canonical integer segment is a legacy `/podcast/:index` URL.
 *
 * Zero-padded forms ("007") and decimals ("1.0") never addressed an episode — the SPA
 * only ever linked bare integers — so they are NOT redirected. Accepting them would
 * mint an unbounded family of URLs that all funnel to one episode, which is exactly
 * the duplicate-content shape this migration exists to remove. `0` is the one legal
 * leading zero.
 */
const isLegacyIndex = (slug: string) => /^(0|[1-9]\d*)$/.test(slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Legacy numeric URLs redirect in the page body; they render no metadata of their own.
  if (isLegacyIndex(slug)) return {};
  const ep = getEpisodeBySlug(slug);
  if (!ep) return { title: 'Episode Not Found' };

  const description = ep.description.slice(0, 158);
  return {
    title: ep.title,
    description,
    alternates: { canonical: `${SITE}/podcast/${ep.slug}` },
    openGraph: {
      title: ep.title,
      description,
      url: `${SITE}/podcast/${ep.slug}`,
      type: 'article',
      publishedTime: ep.date,
      images: ep.image ? [{ url: ep.image }] : undefined,
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Legacy `/podcast/:index` → permanent redirect to the episode's stable slug.
  //
  // THE APPROVED CONTRACT IS 308, NOT 301 (decided 2026-09-05, not an implementation
  // accident). Google treats 301 and 308 identically for indexing and signal transfer,
  // and the App Router only emits 303/307/308 — `permanentRedirect()` hardcodes 308.
  // A true 301 would mean moving all 150 mappings into next.config.ts, splitting the
  // redirect map away from the frozen slug data it derives from. Keeping them together
  // gives one authoritative mapping that cannot drift. See
  // tasks/CUTOVER-podcast-routes.md and the 308 assertions in the URL-lock test.
  //
  // Out-of-range indices 404 rather than redirecting somewhere plausible.
  if (isLegacyIndex(slug)) {
    const legacy = getEpisode(Number(slug));
    if (!legacy) notFound();
    permanentRedirect(`/podcast/${legacy.slug}`);
  }

  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const { newer, older } = episodeNeighbours(ep.slug);
  const topic = episodeTopic(ep.title);
  const guest = resolveGuest(ep.title, ep.description);
  const { intro, takeaways, chapters, links } = parseEpisodeBody(ep.body);

  // Same topic, excluding this episode — a real relation, not a random sample.
  const related = episodes
    .filter((e) => e.slug !== ep.slug && episodeTopic(e.title).label === topic.label)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.title,
    datePublished: ep.date,
    description: ep.description,
    url: `${SITE}/podcast/${ep.slug}`,
    ...(isoDuration(ep.duration) ? { timeRequired: isoDuration(ep.duration) } : {}),
    associatedMedia: { '@type': 'MediaObject', contentUrl: ep.audioUrl },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'GovCon Giants Podcast',
      url: `${SITE}/podcast`,
    },
  };

  const hostBio =
    'Eric Coffie built a construction company from zero to $20M+ in federal sales, then founded GovCon Giants to teach everyday people how to win government contracts.';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        // Episode titles and descriptions come from a third-party RSS feed. JSON.stringify
        // does not escape "/", so a literal </script> in feed copy would close this block
        // early and inject markup. No current episode contains one; escaping "<" keeps
        // that true for whatever the feed publishes next.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
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
            <p className="flex flex-wrap items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em]">
              <span style={{ color: topic.accent }}>{topic.label}</span>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <span className="text-slate-400">{episodeDate(ep.date)}</span>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <span className="text-slate-400">{ep.duration}</span>
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{ep.title}</h1>
          </div>
        </div>

        <div className="mt-8">
          <EpisodePlayer src={ep.audioUrl} fallbackDuration={ep.duration} />
        </div>

        {/* Guest / host bio. Curated data only — an uncredited guest shows a name
            with no invented role or credential. */}
        <section className="mt-10 flex items-start gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          {guest?.photo ? (
            <Image
              src={guest.photo}
              alt={guest.name}
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-green-500 object-cover object-top"
            />
          ) : null}
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-green-500">
              {guest ? 'Featured guest' : 'Your host'}
            </p>
            <p className="mt-1 text-xl font-bold text-white">{guest?.name ?? 'Eric Coffie'}</p>
            {guest?.role || guest?.org ? (
              <p className="mt-0.5 text-sm font-medium text-slate-400">
                {[guest.role, guest.org].filter(Boolean).join(' · ')}
              </p>
            ) : null}
            <p className="mt-2 text-[15px] leading-relaxed text-slate-300">
              {guest ? guest.bio ?? `${guest.name} joined Eric Coffie on this episode.` : hostBio}
            </p>
          </div>
        </section>

        {intro.length > 0 && (
          <section className="mt-12">
            <SectionHeading>About this episode</SectionHeading>
            <div className="space-y-5 text-base leading-relaxed text-slate-300">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {takeaways.length > 0 && (
          <section className="mt-12">
            <SectionHeading>In this episode, you&apos;ll learn</SectionHeading>
            <ul className="space-y-3.5">
              {takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
                  />
                  <span className="leading-relaxed text-slate-300">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {chapters.length > 0 && (
          <section className="mt-12">
            <SectionHeading>Show notes &amp; timestamps</SectionHeading>
            <ol className="divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800">
              {chapters.map((c, i) => (
                <li key={i} className="flex items-baseline gap-4 bg-slate-900/40 px-5 py-3.5">
                  <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-green-400">
                    {c.time}
                  </span>
                  <span className="text-[15px] leading-relaxed text-slate-200">{c.label}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {links.length > 0 && (
          <section className="mt-12">
            <SectionHeading>Links &amp; resources</SectionHeading>
            <ul className="space-y-2.5">
              {links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.url}
                    rel="noopener"
                    className="text-[15px] font-medium text-violet-300 underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-sm">
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
              href={`/podcast/${newer.slug}`}
              className="text-sm text-slate-400 hover:text-white"
            >
              ← {newer.title.slice(0, 48)}
              {newer.title.length > 48 ? '…' : ''}
            </Link>
          ) : (
            <span />
          )}
          {older && (
            <Link
              href={`/podcast/${older.slug}`}
              className="text-sm text-slate-400 hover:text-white sm:text-right"
            >
              {older.title.slice(0, 48)}
              {older.title.length > 48 ? '…' : ''} →
            </Link>
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-14">
            <SectionHeading>More on {topic.label.toLowerCase()}</SectionHeading>
            <div className="divide-y divide-slate-800 border-t border-slate-800">
              {related.map((e) => (
                <Link
                  key={e.slug}
                  href={`/podcast/${e.slug}`}
                  className="group flex items-center gap-4 py-4"
                >
                  <Image
                    src={e.thumb}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-lg border border-slate-800 object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-white transition-colors group-hover:text-green-400">
                      {e.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-slate-500">
                      {episodeDate(e.date)} · {e.duration}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-white">
      <span className="h-6 w-1 rounded-full bg-green-500" aria-hidden />
      {children}
    </h2>
  );
}
