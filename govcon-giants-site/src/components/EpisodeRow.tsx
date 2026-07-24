import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import type { Episode } from '@/data/episodes';
import EpisodeThumb, { episodeTopic } from '@/components/podcast/EpisodeThumb';
import { formatEpisodeDate } from '@/lib/episode-utils';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

interface EpisodeRowProps {
  episode: Episode;
  index?: number;
  className?: string;
}

/**
 * Editorial list row (tim.blog/podcast style): square branded thumbnail on
 * the left, then a topic kicker + date, large Fraunces title, 2-line excerpt,
 * and a meta row (play toggle, duration, Libsyn link). Thin divider between
 * rows, generous whitespace, no card box. Play toggles an inline <audio> bar
 * that streams the episode on-site; useExclusiveAudio guarantees only one
 * episode plays at a time.
 */
export default function EpisodeRow({ episode, index = 0, className }: EpisodeRowProps) {
  const [open, setOpen] = useState(false);
  const audioRef = useExclusiveAudio();
  const topic = episodeTopic(episode.title);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={cn('group border-b border-line py-8 md:py-10', className)}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <EpisodeThumb
          title={episode.title}
          className="aspect-square w-36 shrink-0 rounded-lg border border-line transition-colors duration-150 group-hover:border-brand/50 sm:w-[150px] md:w-[180px]"
        />

        <div className="min-w-0 flex-1">
          {/* Kicker: topic tag + date */}
          <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em]">
            <topic.Icon className="h-3.5 w-3.5" style={{ color: topic.accent }} />
            <span style={{ color: topic.accent }}>{topic.label}</span>
            <span className="text-slate-600" aria-hidden>
              ·
            </span>
            <span className="font-medium text-slate-500">{formatEpisodeDate(episode.date)}</span>
          </p>

          <a href={episode.link} target="_blank" rel="noopener noreferrer">
            <h3 className="font-display text-[24px] font-semibold leading-[1.25] text-white transition-colors hover:text-brand md:text-[28px]">
              {episode.title}
            </h3>
          </a>

          <p className="mt-3 line-clamp-2 text-[15px] leading-[1.7] text-slate-400">
            {episode.description}
          </p>

          {/* Meta row: play toggle, duration, external link */}
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
                  : 'border-line text-slate-400 hover:border-brand hover:bg-brand hover:text-brand-ink',
              )}
            >
              {open ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              )}
            </button>
            <span className="font-mono text-xs text-slate-500">{episode.duration}</span>
            <a
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link ml-auto inline-flex items-center gap-1 font-mono text-xs tracking-[0.14em] text-slate-500 transition-colors hover:text-brand"
            >
              LISTEN ON LIBSYN
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
          className="mt-6 h-10 w-full [color-scheme:dark]"
        />
      )}
    </motion.article>
  );
}
