'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

type DropdownKey = 'intelligence' | 'learn' | 'compare' | null;

export default function SiteNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/internal')) {
    return null;
  }
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

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const intelligenceLinks = [
    { href: '/data/agencies', label: 'Agency Profiles', desc: '35+ agencies with pain points' },
    { href: '/data/contractors', label: 'Contractor Database', desc: '500K+ federal contractors' },
    { href: '/data/forecasts', label: 'Forecasts', desc: '7,700+ upcoming procurements' },
    { href: '/tools/expiring-contracts', label: 'Expiring Contracts', desc: 'Find recompete opportunities' },
    { href: '/opp', label: 'Opportunity Hunter', desc: 'Multi-source opportunity search' },
  ];

  const learnLinks = [
    { href: '/guides', label: 'All Guides', desc: '140+ free educational guides' },
    { href: '/guides/government-contracting-for-beginners', label: 'GovCon for Beginners', desc: 'Start here if you\'re new' },
    { href: '/guides/sam-gov-registration', label: 'SAM.gov Registration', desc: 'Get registered to bid' },
    { href: '/guides/capability-statement', label: 'Capability Statements', desc: 'Your marketing one-pager' },
    { href: '/videos', label: 'Video Training', desc: 'Watch and learn' },
    { href: '/glossary', label: 'GovCon Glossary', desc: 'Terms & definitions' },
    { href: '/jobs', label: 'GovCon Jobs', desc: 'BD & capture careers' },
  ];

  const compareLinks = [
    { href: '/compare/deltek', label: 'vs. Deltek GovWin', desc: 'Save 98% vs. enterprise pricing' },
    { href: '/compare/govtribe', label: 'vs. GovTribe', desc: 'More data, better price' },
    { href: '/compare/federal-compass', label: 'vs. Federal Compass', desc: 'No per-seat fees' },
  ];

  return (
    <header className="sticky top-0 bg-slate-950/95 backdrop-blur z-50 border-b border-slate-800">
      <div className="py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {/* Intelligence Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('intelligence')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                  openDropdown === 'intelligence' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Intelligence
                <svg className={`w-3 h-3 transition-transform ${openDropdown === 'intelligence' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'intelligence' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  {intelligenceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-3 hover:bg-slate-800 transition"
                    >
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-slate-500 text-sm">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('learn')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                  openDropdown === 'learn' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Learn
                <svg className={`w-3 h-3 transition-transform ${openDropdown === 'learn' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'learn' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  {learnLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-3 hover:bg-slate-800 transition"
                    >
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-slate-500 text-sm">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('compare')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                  openDropdown === 'compare' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Compare
                <svg className={`w-3 h-3 transition-transform ${openDropdown === 'compare' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'compare' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  {compareLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-3 hover:bg-slate-800 transition"
                    >
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-slate-500 text-sm">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link href="/pricing" className="px-4 py-2 text-slate-400 hover:text-white transition">
              Pricing
            </Link>

            {/* CTA Button */}
            <Link
              href="/mi-free"
              className="ml-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
            >
              Start Free
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <div className="space-y-4">
              {/* Intelligence Section */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Intelligence</div>
                {intelligenceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-2 py-2 text-slate-300 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Learn Section */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Learn</div>
                {learnLinks.slice(0, 4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-2 py-2 text-slate-300 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Compare Section */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Compare</div>
                {compareLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-2 py-2 text-slate-300 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Direct Links */}
              <div className="border-t border-slate-800 pt-4 mt-4">
                <Link href="/pricing" className="block px-2 py-2 text-slate-300 hover:text-white transition">
                  Pricing
                </Link>
                <Link
                  href="/mi-free"
                  className="block mt-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
