import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import type { Episode } from '@/data/episodes';
import { formatEpisodeDate } from '@/lib/episode-utils';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
  className?: string;
}

/**
 * Card variant (design.md §6.4): 16:9 real face thumbnail (episode.thumb),
 * duration chip, title, date. The center play button toggles an inline
 * <audio> bar that streams the episode on-site;
 * useExclusiveAudio guarantees only one episode plays at a time. The title
 * still links out to the Libsyn episode page.
 */
export default function EpisodeCard({ episode, index = 0, className }: EpisodeCardProps) {
  const [open, setOpen] = useState(false);
  const audioRef = useExclusiveAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className={cn(
        'group overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={episode.thumb}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-xs text-brand transition-transform group-hover:scale-105">
          {episode.duration}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? `Stop playing ${episode.title}` : `Play ${episode.title}`}
          aria-pressed={open}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full bg-brand/90 text-brand-ink backdrop-blur transition-all duration-200',
              open ? 'scale-100' : 'scale-[0.6] opacity-0 group-hover:scale-100 group-hover:opacity-100',
            )}
          >
            {open ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="ml-1 h-6 w-6 fill-current" />
            )}
          </span>
        </button>
      </div>
      <div className="p-5">
        <a href={episode.link} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="mb-2 line-clamp-2 text-[17px] font-semibold leading-snug text-slate-900 dark:text-white transition-colors hover:text-brand">
            {episode.title}
          </h3>
        </a>
        <p className="font-mono text-[13px] text-slate-500 dark:text-slate-400">
          {formatEpisodeDate(episode.date)}
        </p>
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
