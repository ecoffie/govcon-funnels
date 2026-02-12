'use client';

import { useEffect, useRef, useState } from 'react';

export type StatItem = {
  value: string;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
};

const DURATION_MS = 1800;
const TICK_MS = 30;

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4;
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const targets = stats.map((s) => s.numericValue);
    const startTime = Date.now();
    let rafId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutQuart(t);

      setDisplayValues(
        targets.map((target) => Math.round(eased * target))
      );

      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, stats]);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="text-3xl font-black text-green-500 mb-1">
            {stat.prefix ?? ''}
            {stat.suffix === '%'
              ? displayValues[index]
              : displayValues[index].toLocaleString()}
            {stat.suffix ?? ''}
          </div>
          <div className="text-slate-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
