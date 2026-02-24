'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/internal')) {
    return null;
  }
  const isHome = pathname === '/';

  const navLinks = (
    <>
      {!isHome && (
        <Link href="/" className="text-slate-400 hover:text-white transition text-sm" onClick={() => setMobileOpen(false)}>
          ← Back to Home
        </Link>
      )}
      <Link href="/resources" className="text-slate-400 hover:text-white transition" onClick={() => setMobileOpen(false)}>
        Resources
      </Link>
      <Link href="/training" className="text-slate-400 hover:text-white transition" onClick={() => setMobileOpen(false)}>
        Training
      </Link>
      <Link href="/premium" className="text-slate-400 hover:text-white transition" onClick={() => setMobileOpen(false)}>
        Premium
      </Link>
      <Link
        href="https://shop.govcongiants.org"
        className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
        onClick={() => setMobileOpen(false)}
      >
        Join Pro
      </Link>
    </>
  );

  return (
    <header className="py-4 px-6 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">GovCon</span>
          <span className="text-2xl font-bold text-green-500">Giants</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-slate-400 hover:text-white transition"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 py-4 px-6 flex flex-col gap-4">
          {navLinks}
        </nav>
      )}
    </header>
  );
}
