'use client';

import { useEffect, useState } from 'react';

function getEndOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

function formatEndDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

type Tile = { value: number; label: string };

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function FomoCountdown({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [target] = useState<Date>(() => getEndOfMonth());
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div
        aria-hidden="true"
        className={variant === 'compact' ? 'h-16' : 'h-24 md:h-28'}
      />
    );
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor(diff / 3_600_000) % 24;
  const mins = Math.floor(diff / 60_000) % 60;
  const secs = Math.floor(diff / 1000) % 60;

  const tiles: Tile[] = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: mins, label: 'Mins' },
    { value: secs, label: 'Secs' },
  ];

  const tileBase =
    variant === 'compact'
      ? 'min-w-[64px] px-3 py-2'
      : 'min-w-[84px] md:min-w-[100px] px-4 py-3 md:px-5 md:py-4';

  const valueSize =
    variant === 'compact'
      ? 'text-2xl md:text-3xl'
      : 'text-3xl md:text-5xl';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 md:gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`${tileBase} flex flex-col items-center rounded-lg bg-slate-900 border border-slate-800`}
          >
            <span className={`${valueSize} font-black text-white tabular-nums leading-none`}>
              {pad(tile.value)}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              {tile.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs md:text-sm text-slate-500">
        Enrollment closes {formatEndDate(target)}
      </p>
    </div>
  );
}
