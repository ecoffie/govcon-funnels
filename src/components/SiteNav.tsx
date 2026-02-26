'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getNextSaturdayNineAmEtTimestamp(): number {
  const now = new Date();
  const etNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = etNow.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;

  const targetEt = new Date(etNow);
  targetEt.setDate(etNow.getDate() + daysUntilSaturday);
  targetEt.setHours(9, 0, 0, 0);

  if (daysUntilSaturday === 0 && etNow >= targetEt) {
    targetEt.setDate(targetEt.getDate() + 7);
  }

  const targetAsUtcString = targetEt.toLocaleString('en-US', { timeZone: 'UTC' });
  return new Date(targetAsUtcString).getTime();
}

function getCountdownParts(targetTimestamp: number): CountdownParts {
  const diffMs = Math.max(0, targetTimestamp - Date.now());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function SiteNav() {
  const pathname = usePathname();
  const [now, setNow] = useState(() => Date.now());

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/internal')) {
    return null;
  }
  const isHome = pathname === '/';
  const isEncore = pathname?.startsWith('/encore');
  const targetTimestamp = useMemo(() => getNextSaturdayNineAmEtTimestamp(), []);
  const countdown = useMemo(() => getCountdownParts(targetTimestamp), [targetTimestamp, now]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Minimal Encore header for /encore pages (white bg, dark text)
  if (isEncore) {
    return (
      <header className="py-4 px-6 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <a href="https://gov.encore-funding.com/" className="text-xl font-bold text-orange-500 hover:text-orange-600 transition">
            Encore Funding
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 bg-slate-950/95 backdrop-blur z-50 border-b border-slate-800">
      <div className="py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {!isHome && (
              <Link href="/" className="text-slate-400 hover:text-white transition text-sm">
                ← Back to Home
              </Link>
            )}
            <Link href="/resources" className="text-slate-400 hover:text-white transition">
              Resources
            </Link>
            <Link href="/training" className="text-slate-400 hover:text-white transition">
              Training
            </Link>
            <Link href="/premium" className="text-slate-400 hover:text-white transition">
              Premium
            </Link>
            <Link
              href="https://shop.govcongiants.org"
              className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
            >
              Join Pro
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-red-900/60 bg-gradient-to-r from-red-950/70 via-slate-900 to-red-950/70 px-4 py-2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-red-100 text-center md:text-left">
            <span className="font-bold text-red-300">Live Bootcamp:</span> Seats are filling up for Saturday at 9:00 AM ET.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-300">Starts in</span>
            <div className="flex items-center gap-1 text-white font-semibold">
              <span className="bg-slate-800/80 border border-slate-700 rounded px-2 py-1">{countdown.days}d</span>
              <span className="bg-slate-800/80 border border-slate-700 rounded px-2 py-1">{countdown.hours}h</span>
              <span className="bg-slate-800/80 border border-slate-700 rounded px-2 py-1">{countdown.minutes}m</span>
              <span className="bg-slate-800/80 border border-slate-700 rounded px-2 py-1">{countdown.seconds}s</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
