import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import { episodes } from '@/data/episodes';
import { episodeTopic, formatEpisodeDate } from '@/lib/episode-utils';
import { platforms } from '@/data/platforms';
import { speakers } from '@/data/speakers';
import { featuredEpisodes } from '@/data/featuredEpisodes';
import { cn } from '@/lib/utils';

/** Interview episodes whose thumb is a real guest (not Eric). */
const GUEST_NAMES: Record<number, string> = {
  1: 'Katie Arrington',
  50: 'Julien Harris',
  92: 'Lee Rossey',
  113: 'Judy Bradt',
  143: 'Sam Le',
};

/** Guest bio when the name matches the speakers / featured-episodes data. */
function guestInfo(index: number) {
  const name = GUEST_NAMES[index];
  if (!name) return null;
  const fromSpeakers = speakers.find((s) => s.name === name);
  const fromFeatured = featuredEpisodes.find((e) => e.guest === name);
  return {
    name,
    role: fromSpeakers?.role ?? fromFeatured?.role,
    org: fromSpeakers?.org ?? fromFeatured?.agency,
    credential: fromSpeakers?.credential ?? fromFeatured?.blurb,
  };
}

/** Split a giant description string into readable paragraphs (~3 sentences each). */
function toParagraphs(body: string): string[] {
  const sentences = body.match(/[^.?!]+[.?!]+(?:\s|$)|[^.?!]+$/g) ?? [body];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    out.push(sentences.slice(i, i + 3).join(' ').trim());
  }
  return out.filter(Boolean);
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 120, damping: 20, delay } as const,
});

/** `/podcast/:index` — episode detail page: header with face thumb, custom
 * player, full body prose, guest/host card, links, prev/next + related. */
export default function EpisodePage() {
  const { index: raw } = useParams();
  const index = Number(raw);
  if (!Number.isInteger(index) || index < 0 || index >= episodes.length) {
    return <Navigate to="/podcast" replace />;
  }

  const episode = episodes[index];
  const topic = episodeTopic(episode.title);
  const guest = guestInfo(index);
  const newer = index > 0 ? episodes[index - 1] : undefined;
  const older = index < episodes.length - 1 ? episodes[index + 1] : undefined;
  const related = episodes
    .map((e, i) => ({ e, i }))
    .filter(({ e, i }) => i !== index && episodeTopic(e.title).label === topic.label)
    .slice(0, 3);

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
            All episodes
          </Link>
        </motion.div>

        {/* Header — copy + face thumb */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <motion.div {...reveal(0.05)}>
            <p className="flex flex-wrap items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.18em]">
              <topic.Icon className="h-4 w-4" style={{ color: topic.accent }} />
              <span style={{ color: topic.accent }}>{topic.label}</span>
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
              src={episode.thumb}
              alt={guest ? guest.name : 'Eric Coffie'}
              className="relative aspect-square w-full rounded-xl border border-line bg-raised object-cover"
            />
          </motion.div>
        </div>

        {/* Body — full episode description as prose */}
        <motion.div {...reveal(0.15)} className="mt-14 max-w-prose">
          <h2 className="mb-5 font-display text-2xl font-black tracking-normal text-slate-900 dark:text-white">
            About this episode
          </h2>
          <div className="space-y-5 text-[17px] leading-[1.8] text-slate-600 dark:text-slate-300">
            {toParagraphs(episode.body).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Guest or host card */}
        <motion.div
          {...reveal(0.2)}
          className="mt-12 flex max-w-prose items-center gap-5 rounded-xl border border-line bg-raised p-6"
        >
          <img
            src={guest ? episode.thumb : '/eric-portrait.png'}
            alt={guest ? guest.name : 'Eric Coffie'}
            className="h-20 w-20 shrink-0 rounded-full border-2 border-brand object-cover object-top"
          />
          <div className="min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {guest ? 'Featured guest' : 'Your host'}
            </p>
            <p className="mt-1 font-display text-xl font-bold tracking-normal text-slate-900 dark:text-white">
              {guest ? guest.name : 'Eric Coffie'}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {guest
                ? ([guest.role, guest.org].filter(Boolean).join(' · ') ||
                  'Guest on the GovCon Giants Podcast')
                : 'Built Evankoff Construction from zero to $20M+ in government sales — now teaches everyday people to win federal contracts.'}
            </p>
            {!guest && (
              <Link
                to="/about"
                className="mt-2 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                More about Eric →
              </Link>
            )}
          </div>
        </motion.div>

        {/* Links row */}
        <motion.div {...reveal(0.25)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-brand hover:text-brand dark:text-white"
          >
            Full episode page on Libsyn
            <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {platforms
            .filter((p) => ['Apple Podcasts', 'Spotify', 'YouTube'].includes(p.name))
            .map((p) => (
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

        {/* Prev / next episode nav */}
        <motion.nav
          {...reveal(0.3)}
          aria-label="More episodes"
          className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          {newer ? (
            <EpisodeNavCard label="Newer episode" index={index - 1} Icon={ChevronLeft} align="left" />
          ) : (
            <span />
          )}
          {older && (
            <EpisodeNavCard label="Older episode" index={index + 1} Icon={ChevronRight} align="right" />
          )}
        </motion.nav>

        {/* More like this */}
        {related.length > 0 && (
          <motion.div {...reveal(0.35)} className="mt-14">
            <h2 className="mb-5 font-display text-2xl font-black tracking-normal text-slate-900 dark:text-white">
              More like this
            </h2>
            <div className="divide-y divide-line border-t border-line">
              {related.map(({ e, i }) => (
                <Link
                  key={e.link}
                  to={`/podcast/${i}`}
                  className="group flex items-center gap-4 py-4"
                >
                  <img
                    src={e.thumb}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[17px] font-bold tracking-normal text-slate-900 transition-colors group-hover:text-brand dark:text-white">
                      {e.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-slate-500 dark:text-slate-400">
                      {formatEpisodeDate(e.date)} · {e.duration}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/** Prev/next mini-card linking to a sibling episode. */
function EpisodeNavCard({
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
  const episode = episodes[index];
  return (
    <Link
      to={`/podcast/${index}`}
      className={cn(
        'group flex items-center gap-4 rounded-xl border border-line bg-raised p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand',
        align === 'right' && 'sm:flex-row-reverse sm:text-right',
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-brand" />
      <img
        src={episode.thumb}
        alt=""
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
      />
      <span className="min-w-0">
        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900 dark:text-white">
          {episode.title}
        </span>
      </span>
    </Link>
  );
}
