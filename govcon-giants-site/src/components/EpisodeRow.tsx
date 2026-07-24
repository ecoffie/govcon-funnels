import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import type { Episode } from '@/data/episodes';
import { episodeArtwork, episodeThumb, formatEpisodeDate } from '@/lib/episode-utils';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

interface EpisodeRowProps {
  episode: Episode;
  index?: number;
  className?: string;
}

/**
 * Row variant (design.md §6.4): mono date + duration cluster, small artwork
 * thumb (per-episode image with generic fallback), title (links out to the
 * Libsyn episode page), 2-line description, circular play button. Play
 * toggles an inline <audio> bar that streams the episode on-site;
 * useExclusiveAudio guarantees only one episode plays at a time.
 */
export default function EpisodeRow({ episode, index = 0, className }: EpisodeRowProps) {
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(episodeArtwork(episode, index));
  const audioRef = useExclusiveAudio();

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={cn(
        'group border-b border-line px-3 py-5 transition-colors duration-150 hover:bg-raised md:px-4',
        className,
      )}
    >
      <div className="flex items-center gap-5 md:gap-7">
        <div className="hidden w-24 shrink-0 flex-col gap-1 sm:flex">
          <span className="font-mono text-[13px] text-slate-500">
            {formatEpisodeDate(episode.date)}
          </span>
          <span className="font-mono text-[13px] text-slate-500">{episode.duration}</span>
        </div>
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          onError={() => setImgSrc(episodeThumb(index))}
          className="hidden aspect-video w-28 shrink-0 rounded-lg border border-line object-cover md:block"
        />
        <div className="min-w-0 flex-1">
          <a href={episode.link} target="_blank" rel="noopener noreferrer">
            <h3 className="mb-1 truncate text-[17px] font-semibold text-white transition-colors hover:text-brand">
              {episode.title}
            </h3>
          </a>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
            {episode.description}
          </p>
          <span className="mt-1 font-mono text-xs text-slate-500 sm:hidden">
            {formatEpisodeDate(episode.date)} · {episode.duration}
          </span>
        </div>
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
      </div>
      {open && (
        <audio
          ref={audioRef}
          controls
          autoPlay
          preload="none"
          src={episode.audioUrl}
          className="mt-4 h-10 w-full [color-scheme:dark]"
        />
      )}
    </motion.div>
  );
}
