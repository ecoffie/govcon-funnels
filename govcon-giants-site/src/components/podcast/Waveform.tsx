import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WaveformProps {
  /** Number of equalizer bars. */
  bars?: number;
  className?: string;
}

interface BarSeed {
  /** Resting bar height as a % of the strip. */
  height: number;
  /** CSS animation delay for the loop (s). */
  delay: number;
  /** CSS animation duration for the loop (s). */
  duration: number;
}

/**
 * Animated audio waveform strip (podcast.md §1): 48 green bars on a 32px
 * strip, randomized CSS keyframe loop (`animate-eq-bar` from the design
 * tokens). Entrance: bars grow from scaleY 0 with a 0.04s stagger via a
 * Framer Motion wrapper; the perpetual loop lives on an inner span so the
 * two transforms never fight. Memoized so parent re-renders (search typing,
 * filter changes) never restart the loop.
 */
/** Deterministic pseudo-random in [0, 1) — pure, so render stays idempotent. */
function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const Waveform = memo(function Waveform({ bars = 48, className }: WaveformProps) {
  const seeds = useMemo<BarSeed[]>(
    () =>
      Array.from({ length: bars }, (_, i) => ({
        height: 30 + seeded(i, 1) * 70,
        delay: -seeded(i, 2) * 1.4,
        duration: 0.75 + seeded(i, 3) * 0.9,
      })),
    [bars],
  );

  return (
    <div
      className={cn('flex h-8 w-full items-end gap-[3px]', className)}
      aria-hidden
      role="presentation"
    >
      {seeds.map((seed, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.04, ease: 'easeOut' }}
          className="flex h-full flex-1 origin-bottom items-end"
        >
          <span
            className="w-full origin-bottom animate-eq-bar rounded-full bg-brand/80"
            style={{
              height: `${seed.height}%`,
              animationDelay: `${seed.delay}s`,
              animationDuration: `${seed.duration}s`,
            }}
          />
        </motion.span>
      ))}
    </div>
  );
});

export default Waveform;
