import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Episode } from '@/data/episodes';
import { formatEpisodeDate } from '@/data/episodes';
import { cn } from '@/lib/utils';

interface EpisodeRowProps {
  episode: Episode;
  index?: number;
  className?: string;
}

/**
 * Row variant (design.md §6.4): mono date + duration cluster, title,
 * 2-line description, circular play button. Whole row opens the Libsyn
 * link in a new tab; hairline divider between rows.
 */
export default function EpisodeRow({ episode, index = 0, className }: EpisodeRowProps) {
  return (
    <motion.a
      href={episode.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={cn(
        'group flex items-center gap-5 border-b border-line px-3 py-5 transition-colors duration-150 hover:bg-raised md:gap-7 md:px-4',
        className,
      )}
    >
      <div className="hidden w-24 shrink-0 flex-col gap-1 sm:flex">
        <span className="font-mono text-[13px] text-slate-500">
          {formatEpisodeDate(episode.date)}
        </span>
        <span className="font-mono text-[13px] text-slate-500">{episode.duration}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-[17px] font-semibold text-white transition-colors group-hover:text-brand">
          {episode.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {episode.description}
        </p>
        <span className="mt-1 font-mono text-xs text-slate-500 sm:hidden">
          {formatEpisodeDate(episode.date)} · {episode.duration}
        </span>
      </div>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-slate-400 transition-all duration-150 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink">
        <Play className="ml-0.5 h-4 w-4 fill-current" />
      </span>
    </motion.a>
  );
}
