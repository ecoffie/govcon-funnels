import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import type { FeaturedEpisode } from '@/data/featuredEpisodes';
import EqBars from '@/components/EqBars';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

interface GuestRowProps {
  episode: FeaturedEpisode;
  index?: number;
  className?: string;
}

/**
 * Moth-style wide episode row (mirrors EpisodeRow layout): square guest
 * headshot left, then guest name (Montserrat 800) + role/agency line,
 * episode title, 1-line blurb, and a meta row (play toggle, duration chip,
 * Libsyn link). Hairline divider between rows. Play toggles an inline
 * <audio> bar; useExclusiveAudio guarantees one episode at a time.
 * Sibling of GuestCard (grid card used on /podcast) — same data, row form.
 */
export default function GuestRow({ episode, index = 0, className }: GuestRowProps) {
  const [open, setOpen] = useState(false);
  const audioRef = useExclusiveAudio();

  return (
    <motion.article
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: index * 0.08 }}
      className={cn('group border-b border-line py-8 md:py-10', className)}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <img
          src={episode.photo}
          alt={episode.guest}
          loading="lazy"
          className="aspect-square w-36 shrink-0 rounded-xl border border-line bg-raised object-cover transition-colors duration-150 group-hover:border-brand/50 sm:w-[160px] md:w-[180px]"
        />

        <div className="min-w-0 flex-1">
          {/* Kicker: agency + role */}
          <p className="mb-2 font-narrow text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {episode.agency}
          </p>
          <h3 className="font-display text-[24px] font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-[28px]">
            {episode.guest}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">{episode.role}</p>

          <a href={episode.link} target="_blank" rel="noopener noreferrer">
            <p className="mt-3 text-[17px] font-semibold leading-snug text-slate-900 transition-colors hover:text-brand">
              {episode.title}
            </p>
          </a>
          <p className="mt-2 line-clamp-1 text-[15px] leading-[1.7] text-slate-500">
            {episode.blurb}
          </p>

          {/* Meta row: play toggle, duration chip, external link */}
          <div className="mt-5 flex items-center gap-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? `Stop playing ${episode.title}` : `Play ${episode.title}`}
              aria-pressed={open}
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer',
                open
                  ? 'border-brand bg-brand text-brand-ink'
                  : 'border-line text-slate-500 hover:border-brand hover:bg-brand hover:text-brand-ink',
              )}
            >
              {open ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              )}
            </button>
            {open && <EqBars />}
            <span className="rounded-full border border-line bg-inset px-3 py-1 font-narrow text-sm font-semibold uppercase tracking-wider text-slate-600">
              {episode.duration}
            </span>
            <a
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link ml-auto inline-flex items-center gap-1 font-narrow text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-brand"
            >
              Listen on Libsyn
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <audio
          ref={audioRef}
          controls
          autoPlay
          preload="none"
          src={episode.audioUrl}
          className="mt-6 h-10 w-full [color-scheme:light]"
        />
      )}
    </motion.article>
  );
}
