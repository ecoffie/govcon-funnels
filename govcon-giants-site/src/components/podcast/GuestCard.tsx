import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import type { FeaturedEpisode } from '@/data/featuredEpisodes';
import EqBars from '@/components/EqBars';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

/**
 * Single guest card: square headshot, name/role/agency, episode title +
 * blurb, and a meta row (duration chip, play/pause toggle, Libsyn link).
 * Play toggles an inline <audio> bar that streams the episode on-site;
 * useExclusiveAudio guarantees only one episode plays at a time.
 * Shared by FeaturedGuests (/podcast) and the home page featured strip.
 */
export default function GuestCard({ episode, index }: { episode: FeaturedEpisode; index: number }) {
  const [open, setOpen] = useState(false);
  const audioRef = useExclusiveAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={episode.photo}
          alt={episode.guest}
          loading="lazy"
          className="h-full w-full bg-raised object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {episode.guest}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{episode.role}</p>
        <p className="mt-1 font-narrow text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          {episode.agency}
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {episode.title}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {episode.blurb}
        </p>

        {/* Meta row: play toggle, duration chip, Libsyn link */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? `Stop playing ${episode.title}` : `Play ${episode.title}`}
            aria-pressed={open}
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer',
              open
                ? 'border-brand bg-brand text-brand-ink'
                : 'border-line text-slate-500 dark:text-slate-400 hover:border-brand hover:bg-brand hover:text-brand-ink',
            )}
          >
            {open ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            )}
          </button>
          {open && <EqBars />}
          <span className="rounded-full border border-line bg-inset px-3 py-1 font-narrow text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {episode.duration}
          </span>
          <a
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link ml-auto inline-flex items-center gap-1 font-narrow text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 transition-colors hover:text-brand"
          >
            LIBSYN
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>

        {open && (
          <audio
            ref={audioRef}
            controls
            autoPlay
            preload="none"
            src={episode.audioUrl}
            className="mt-4 h-10 w-full [color-scheme:light]"
          />
        )}
      </div>
    </motion.div>
  );
}
