import { cn } from '@/lib/utils';

const DELAYS = [0, 0.15, 0.3, 0.45, 0.6];

/**
 * Tiny animated equalizer (5 green bars, CSS `animate-eq-bar` keyframes at
 * staggered delays). Shown next to play buttons while an episode's inline
 * player is open — purely decorative, no audio-analysis API.
 */
export default function EqBars({ className }: { className?: string }) {
  return (
    <span className={cn('flex h-4 items-end gap-[3px]', className)} aria-hidden>
      {DELAYS.map((d) => (
        <span
          key={d}
          className="h-full w-[3px] origin-bottom animate-eq-bar rounded-full bg-brand"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </span>
  );
}
