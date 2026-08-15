import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import { episodes } from '@/data/episodes';
import { episodeTopic, formatEpisodeDate } from '@/lib/episode-utils';
import { parseEpisodeBody } from '@/lib/episode-content';
import { resolveGuest } from '@/lib/episode-guests';
import { platforms } from '@/data/platforms';
import { cn } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 120, damping: 20, delay } as const,
});

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** `/podcast/:index` — full show-notes page: guest bio, player, what you'll
 * learn, timestamped show notes, links & resources, listen links, related. */
export default function EpisodePage() {
  const { index: raw } = useParams();
  const index = Number(raw);
  const valid = Number.isInteger(index) && index >= 0 && index < episodes.length;
  const episode = valid ? episodes[index] : undefined;

  useMeta(
    episode ? `${episode.title} | GovCon Giants` : 'Podcast | GovCon Giants',
    episode?.description
  );

  if (!episode) {
    return <Navigate to="/podcast" replace />;
  }

  const topic = episodeTopic(episode.title);
  const guest = resolveGuest(index, episode.title, episode.description);
  const { intro, takeaways, chapters, links } = parseEpisodeBody(episode.body);

  const newer = index > 0 ? episodes[index - 1] : undefined;
  const older = index < episodes.length - 1 ? episodes[index + 1] : undefined;
  const related = episodes
    .map((e, i) => ({ e, i }))
    .filter(({ i }) => i !== index && episodeTopic(episodes[i].title).label === topic.label)
    .slice(0, 3);

  const personName = guest?.name ?? 'Eric Coffie';
  const personRole = guest
    ? [guest.role, guest.org].filter(Boolean).join(' · ')
    : 'Host of the GovCon Giants Podcast';
  const personBio = guest
    ? guest.bio ?? `${guest.name} joined Eric Coffie on the GovCon Giants Podcast.`
    : 'Eric Coffie built Evankoff Construction from zero to $20M+ in federal sales, then founded GovCon Giants to teach everyday people how to win government contracts — giving away 99.9% of it for free.';
  // Roster headshot when we have one; otherwise reuse the episode's own face
  // thumbnail for a named guest (same image the header shows), and Eric's
  // portrait for solo/host episodes.
  const bioPhoto = guest?.photo ?? (guest ? episode.thumb : '/eric-portrait.png');

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
          All episodes
        </Link>

        {/* Header */}
        <div className="mt-8 grid items-start gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
          <div>
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
          </div>

          <div
            className="relative mx-auto w-40 shrink-0 sm:w-44"
          >
            <div aria-hidden className="absolute inset-0 rotate-2 rounded-xl border-2 border-brand" />
            <img
              src={episode.thumb}
              alt={personName}
              className="relative aspect-square w-full rounded-xl border border-line bg-raised object-cover"
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

        {/* Guest / host bio */}
        <motion.section
          {...reveal(0.05)}
          className="mt-12 flex items-start gap-5 rounded-2xl border border-line bg-raised p-6 md:p-7"
        >
          {bioPhoto ? (
            <img
              src={bioPhoto}
              alt={personName}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-brand object-cover object-top"
            />
          ) : (
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-brand-soft font-display text-2xl font-black text-brand">
              {initials(personName)}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {guest ? 'Featured guest' : 'Your host'}
            </p>
            <p className="mt-1 font-display text-xl font-bold tracking-normal text-slate-900 dark:text-white">
              {personName}
            </p>
            {personRole && (
              <p className="mt-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">{personRole}</p>
            )}
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{personBio}</p>
            {!guest && (
              <Link
                to="/about"
                className="mt-2 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                More about Eric →
              </Link>
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

        {/* Prev / next */}
        <nav
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
        </nav>

        {/* More like this */}
        {related.length > 0 && (
          <section className="mt-14">
            <SectionHeading>More like this</SectionHeading>
            <div className="divide-y divide-line border-t border-line">
              {related.map(({ e, i }) => (
                <Link key={e.link} to={`/podcast/${i}`} className="group flex items-center gap-4 py-4">
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
