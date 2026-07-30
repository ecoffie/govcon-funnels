import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import { featuredEpisodes } from '@/data/featuredEpisodes';
import { speakers } from '@/data/speakers';
import { formatEpisodeDate } from '@/lib/episode-utils';
import { parseEpisodeBody } from '@/lib/episode-content';
import { platforms } from '@/data/platforms';
import { cn } from '@/lib/utils';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 120, damping: 20, delay } as const,
});

/** `/podcast/featured/:index` — detail page for one of the curated featured
 * guest interviews, matching EpisodePage's show-notes layout. */
export default function FeaturedEpisodePage() {
  const { index: raw } = useParams();
  const index = Number(raw);
  if (!Number.isInteger(index) || index < 0 || index >= featuredEpisodes.length) {
    return <Navigate to="/podcast" replace />;
  }

  const episode = featuredEpisodes[index];
  const speaker = speakers.find((s) => s.name === episode.guest);
  const credential = speaker?.credential;
  const roleLine = [episode.role, episode.agency].filter(Boolean).join(' · ');
  const { intro, takeaways, chapters, links } = parseEpisodeBody(episode.body || episode.blurb);

  const newer = index > 0 ? index - 1 : undefined;
  const older = index < featuredEpisodes.length - 1 ? index + 1 : undefined;
  const others = featuredEpisodes
    .map((e, i) => ({ e, i }))
    .filter(({ i }) => i !== index)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="py-12 md:py-16"
    >
      <div className="container-gg max-w-[860px]">
        {/* Back link */}
        <Link
          to="/podcast"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-brand dark:text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Featured
        </Link>

        {/* Header */}
        <div className="mt-8 grid items-start gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
          <div>
            <p className="flex flex-wrap items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="text-brand">{episode.agency}</span>
              <span className="text-slate-400" aria-hidden>·</span>
              <span className="font-medium text-slate-500 dark:text-slate-400">
                {formatEpisodeDate(episode.date)}
              </span>
              <span className="rounded-full border border-line bg-inset px-3 py-0.5 text-xs tracking-wider text-slate-600 dark:text-slate-300">
                {episode.duration}
              </span>
            </p>
            <h1 className="mt-4 font-display text-3xl font-black leading-[1.15] tracking-normal text-slate-900 dark:text-white md:text-[40px]">
              {episode.title}
            </h1>
          </div>

          <div className="relative mx-auto w-40 shrink-0 sm:w-44">
            <div aria-hidden className="absolute inset-0 rotate-2 rounded-xl border-2 border-brand" />
            <img
              src={episode.photo}
              alt={episode.guest}
              className="relative aspect-square w-full rounded-xl border border-line bg-raised object-cover object-top"
            />
          </div>
        </div>

        {/* Player */}
        <div className="mt-8">
          <CustomPlayer src={episode.audioUrl} fallbackDuration={episode.duration} />
        </div>

        {/* Listen links */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:border-brand hover:text-brand dark:text-slate-400"
            >
              <p.icon className="h-4 w-4" />
              Listen on {p.name}
            </a>
          ))}
        </div>

        {/* Guest bio */}
        <motion.section
          {...reveal(0.05)}
          className="mt-12 flex items-start gap-5 rounded-2xl border border-line bg-raised p-6 md:p-7"
        >
          <img
            src={episode.photo}
            alt={episode.guest}
            className="h-20 w-20 shrink-0 rounded-full border-2 border-brand object-cover object-top"
          />
          <div className="min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Featured guest
            </p>
            <p className="mt-1 font-display text-xl font-bold tracking-normal text-slate-900 dark:text-white">
              {episode.guest}
            </p>
            {roleLine && (
              <p className="mt-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">{roleLine}</p>
            )}
            {credential && (
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{credential}</p>
            )}
          </div>
        </motion.section>

        {/* About this episode */}
        {intro.length > 0 && (
          <motion.section {...reveal(0.05)} className="mt-12">
            <SectionHeading>About this episode</SectionHeading>
            <div className="space-y-5 text-[17px] leading-[1.8] text-slate-600 dark:text-slate-300">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.section>
        )}

        {/* What you'll learn */}
        {takeaways.length > 0 && (
          <motion.section {...reveal(0.05)} className="mt-12">
            <SectionHeading>In this episode, you&apos;ll learn</SectionHeading>
            <ul className="space-y-3.5">
              {takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">{t}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Show notes — timestamped chapters */}
        {chapters.length > 0 && (
          <motion.section {...reveal(0.05)} className="mt-12">
            <SectionHeading>Show notes &amp; timestamps</SectionHeading>
            <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
              {chapters.map((c, i) => (
                <li key={i} className="flex items-baseline gap-4 bg-raised px-5 py-3.5">
                  <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-brand">
                    {c.time}
                  </span>
                  <span className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                    {c.label}
                  </span>
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        {/* Links & resources */}
        {links.length > 0 && (
          <motion.section {...reveal(0.05)} className="mt-12">
            <SectionHeading>Links &amp; resources from this episode</SectionHeading>
            <ul className="space-y-2.5">
              {links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-[16px] font-medium text-slate-700 underline-offset-4 transition-colors hover:text-brand dark:text-slate-200"
                  >
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="group-hover:underline">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Prev / next featured */}
        <nav
          aria-label="More featured episodes"
          className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          {newer !== undefined ? (
            <FeaturedNavCard label="Previous guest" index={newer} Icon={ChevronLeft} align="left" />
          ) : (
            <span />
          )}
          {older !== undefined && (
            <FeaturedNavCard label="Next guest" index={older} Icon={ChevronRight} align="right" />
          )}
        </nav>

        {/* More featured guests */}
        {others.length > 0 && (
          <section className="mt-14">
            <SectionHeading>More featured guests</SectionHeading>
            <div className="divide-y divide-line border-t border-line">
              {others.map(({ e, i }) => (
                <Link
                  key={e.link}
                  to={`/podcast/featured/${i}`}
                  className="group flex items-center gap-4 py-4"
                >
                  <img
                    src={e.photo}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover object-top"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[17px] font-bold tracking-normal text-slate-900 transition-colors group-hover:text-brand dark:text-white">
                      {e.guest}
                    </span>
                    <span className="mt-0.5 block truncate font-sans text-xs text-slate-500 dark:text-slate-400">
                      {e.role}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-black tracking-normal text-slate-900 dark:text-white">
      <span className="h-6 w-1 rounded-full bg-brand" aria-hidden />
      {children}
    </h2>
  );
}

/** Prev/next mini-card linking to a sibling featured episode. */
function FeaturedNavCard({
  label,
  index,
  Icon,
  align,
}: {
  label: string;
  index: number;
  Icon: typeof ChevronLeft;
  align: 'left' | 'right';
}) {
  const episode = featuredEpisodes[index];
  return (
    <Link
      to={`/podcast/featured/${index}`}
      className={cn(
        'group flex items-center gap-4 rounded-xl border border-line bg-raised p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand',
        align === 'right' && 'sm:flex-row-reverse sm:text-right',
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-brand" />
      <img
        src={episode.photo}
        alt=""
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover object-top"
      />
      <span className="min-w-0">
        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900 dark:text-white">
          {episode.guest}
        </span>
      </span>
    </Link>
  );
}
