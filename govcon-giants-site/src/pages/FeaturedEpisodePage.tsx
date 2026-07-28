import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import { featuredEpisodes } from '@/data/featuredEpisodes';
import { speakers } from '@/data/speakers';
import { formatEpisodeDate } from '@/lib/episode-utils';
import { platforms } from '@/data/platforms';
import { cn } from '@/lib/utils';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 120, damping: 20, delay } as const,
});

/** `/podcast/featured/:index` — detail page for one of the 6 curated
 * featured episodes (featuredEpisodes.ts), mirroring EpisodePage's layout. */
export default function FeaturedEpisodePage() {
  const { index: raw } = useParams();
  const index = Number(raw);
  if (!Number.isInteger(index) || index < 0 || index >= featuredEpisodes.length) {
    return <Navigate to="/podcast" replace />;
  }

  const episode = featuredEpisodes[index];
  // Extra credential from the speakers data when the name matches
  const speaker = speakers.find((s) => s.name === episode.guest);
  const credential =
    speaker?.credential ??
    [episode.role, episode.agency].filter(Boolean).join(' · ');
  const newer = index > 0 ? index - 1 : undefined;
  const older = index < featuredEpisodes.length - 1 ? index + 1 : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="py-12 md:py-16"
    >
      <div className="container-gg max-w-[1100px]">
        {/* Back link */}
        <motion.div {...reveal()}>
          <Link
            to="/podcast"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-brand dark:text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Featured
          </Link>
        </motion.div>

        {/* Header — copy + face photo */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <motion.div {...reveal(0.05)}>
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
              {episode.guest}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {episode.role}
            </p>
            <p className="mt-5 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
              {episode.title}
            </p>
            <div className="mt-8">
              <CustomPlayer src={episode.audioUrl} fallbackDuration={episode.duration} />
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.1)}
            className="relative mx-auto w-full"
            style={{ maxWidth: 'min(46vh, 380px)' }}
          >
            <div
              aria-hidden
              className="absolute inset-0 rotate-2 rounded-xl border-2 border-brand"
            />
            <img
              src={episode.photo}
              alt={episode.guest}
              className="relative aspect-square w-full rounded-xl border border-line bg-raised object-cover"
            />
          </motion.div>
        </div>

        {/* Body — episode blurb as prose */}
        <motion.div {...reveal(0.15)} className="mt-14 max-w-prose">
          <h2 className="mb-5 font-display text-2xl font-black tracking-normal text-slate-900 dark:text-white">
            About this episode
          </h2>
          <p className="text-[17px] leading-[1.8] text-slate-600 dark:text-slate-300">
            {episode.blurb}
          </p>
        </motion.div>

        {/* Guest card */}
        <motion.div
          {...reveal(0.2)}
          className="mt-12 flex max-w-prose items-center gap-5 rounded-xl border border-line bg-raised p-6"
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
            <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {credential}
            </p>
          </div>
        </motion.div>

        {/* Links row — Apple Podcasts + Spotify only */}
        <motion.div {...reveal(0.25)} className="mt-10 flex flex-wrap items-center gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:border-brand hover:text-brand dark:text-slate-400"
            >
              <p.icon className="h-4 w-4" />
              {p.name}
            </a>
          ))}
        </motion.div>

        {/* Prev / next featured episode nav */}
        <motion.nav
          {...reveal(0.3)}
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
        </motion.nav>
      </div>
    </motion.div>
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
        className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
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
