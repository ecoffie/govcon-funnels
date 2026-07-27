import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  /** Numeric value to count to (e.g. 20 for "$20M+"). */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/**
 * GSAP count-up stat (design.md §5): counts over 1.6s easeOutExpo when
 * scrolled into view. Isolated GSAP component — no Framer Motion inside.
 * Reduced motion: jumps straight to final value.
 */
export default function StatCounter({ value, prefix = '', suffix = '', label }: StatCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const render = (v: number) => {
      el.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };
    if (reduce) {
      render(value);
      return;
    }
    render(0);
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: value,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate: () => render(state.v),
      scrollTrigger: { trigger: root, start: 'top 85%', once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, suffix]);

  return (
    <div ref={rootRef}>
      <span
        ref={numRef}
        className="font-display text-6xl font-black tracking-tight text-brand tabular-nums"
      />
      <p className="mt-2 font-narrow text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
