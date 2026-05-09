'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function SiteNav() {
  const pathname = usePathname();
  const [guidesOpen, setGuidesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            {/* Guides Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                className="text-slate-400 hover:text-white transition flex items-center gap-1"
              >
                Guides
                <svg className={`w-3 h-3 transition-transform ${guidesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {guidesOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  <Link href="/guides" onClick={() => setGuidesOpen(false)} className="block px-4 py-2 text-green-500 hover:bg-slate-800 transition text-sm font-semibold">
                    All Guides →
                  </Link>
                  <div className="border-t border-slate-800 my-1" />
                  {[
                    { href: '/guides/government-contracting-for-beginners', label: 'GovCon for Beginners' },
                    { href: '/guides/sam-gov-registration', label: 'SAM.gov Registration' },
                    { href: '/guides/cage-code', label: 'CAGE Code Guide' },
                    { href: '/guides/capability-statement', label: 'Capability Statements' },
                    { href: '/guides/sba-certifications', label: 'SBA Certifications' },
                    { href: '/guides/finding-government-contracts', label: 'Finding Contracts' },
                    { href: '/guides/proposal-writing', label: 'Proposal Writing' },
                    { href: '/guides/gsa-schedule', label: 'GSA Schedule' },
                    { href: '/glossary', label: 'GovCon Glossary' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setGuidesOpen(false)}
                      className="block px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/jobs" className="text-green-400 hover:text-green-300 transition font-medium">
              Jobs
            </Link>
            <Link href="/blog" className="text-slate-400 hover:text-white transition">
              Blog
            </Link>
            <Link href="/tools" className="text-slate-400 hover:text-white transition">
              Tools
            </Link>
            <Link href="/premium" className="text-slate-400 hover:text-white transition">
              Federal BD Services
            </Link>
            <Link
              href="/mi-free"
              className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
            >
              Start Free
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
