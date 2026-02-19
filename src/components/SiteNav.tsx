'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="py-4 px-6 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
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
    </header>
  );
}
