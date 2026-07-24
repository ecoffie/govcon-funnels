import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Episode } from '@/data/episodes';
import { episodeThumb, formatEpisodeDate } from '@/data/episodes';
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
  className?: string;
}

/**
 * Card variant (design.md §6.4): 16:9 thumbnail, duration chip, title,
 * date, green play overlay on hover.
 */
export default function EpisodeCard({ episode, index = 0, className }: EpisodeCardProps) {
  return (
    <motion.a
      href={episode.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className={cn(
        'group block overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={episodeThumb(index)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-xs text-brand transition-transform group-hover:scale-105">
          {episode.duration}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <motion.span
            initial={false}
            className="flex h-14 w-14 scale-[0.6] items-center justify-center rounded-full bg-brand/90 text-brand-ink backdrop-blur transition-transform duration-200 group-hover:scale-100"
          >
            <Play className="ml-1 h-6 w-6 fill-current" />
          </motion.span>
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 text-[17px] font-semibold leading-snug text-white transition-colors group-hover:text-brand">
          {episode.title}
        </h3>
        <p className="font-mono text-[13px] text-slate-500">
          {formatEpisodeDate(episode.date)}
        </p>
      </div>
    </motion.a>
  );
}
