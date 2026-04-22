'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function BootcampBanner() {
  const pathname = usePathname();

  const shouldHide = useMemo(() => {
    return (
      pathname?.startsWith('/dashboard') ||
      pathname?.startsWith('/internal') ||
      pathname?.startsWith('/encore')
    );
  }, [pathname]);

  if (shouldHide) {
    return null;
  }

  return (
    <Link
      href="/done-for-you"
      className="block bg-gradient-to-r from-emerald-700 to-green-600 text-white border-b border-emerald-400/20 hover:from-emerald-600 hover:to-green-500 transition"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 text-center">
        <p className="text-sm md:text-base font-semibold flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" aria-hidden="true"></span>
          Only 5 Spots Left: Done-for-You GovCon Consulting
        </p>
        <p className="text-xs md:text-sm mt-1 text-emerald-100">
          We&apos;re accepting 5 more clients this quarter for our White Glove &amp; Consulting programs. Our team handles BD, proposals, and opportunity capture for you. Apply now &rarr;
        </p>
      </div>
    </Link>
  );
}
