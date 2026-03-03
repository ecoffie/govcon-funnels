'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/internal')) {
    return null;
  }
  const isHome = pathname === '/';
  const isEncore = pathname?.startsWith('/encore');

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
      <a
        href="/premium/pro-member-group"
        className="group block border-t border-slate-700 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/95 px-4 py-3 transition hover:from-slate-800 hover:to-slate-700/90"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-300">
              Live Bootcamp
            </span>
            <p className="text-xs sm:text-sm text-slate-200">
              Join Saturday at <span className="font-semibold text-white">9:00 AM ET</span>. Limited seats available.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-xs sm:text-sm">Starts in</span>
            <div className="flex items-center gap-1 sm:gap-1.5 text-white font-black">
              <span className="rounded-md border border-slate-500/80 bg-slate-950/85 px-2.5 py-1.5 text-base leading-none shadow-sm sm:text-lg">{countdown.days}d</span>
              <span className="rounded-md border border-slate-500/80 bg-slate-950/85 px-2.5 py-1.5 text-base leading-none shadow-sm sm:text-lg">{countdown.hours}h</span>
              <span className="rounded-md border border-slate-500/80 bg-slate-950/85 px-2.5 py-1.5 text-base leading-none shadow-sm sm:text-lg">{countdown.minutes}m</span>
              <span className="rounded-md border border-slate-500/80 bg-slate-950/85 px-2.5 py-1.5 text-base leading-none shadow-sm sm:text-lg">{countdown.seconds}s</span>
            </div>
            <span className="text-green-400 text-sm font-semibold hidden sm:inline group-hover:text-green-300">
              Reserve now →
            </span>
          </div>
        </div>
      </a>
    </header>
  );
}
