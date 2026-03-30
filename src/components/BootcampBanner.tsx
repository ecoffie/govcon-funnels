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
      href="https://govcongiants.org/upskilling"
      className="block bg-gradient-to-r from-blue-700 to-blue-500 text-white border-b border-blue-400/20 hover:from-blue-600 hover:to-blue-400 transition"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 text-center">
        <p className="text-sm md:text-base font-semibold">
          Up to $5,250/Year Tax-Free for Employee Training
        </p>
        <p className="text-xs md:text-sm mt-1 text-blue-100">
          Employers can offer GovCon training as a tax-free benefit. Almost free training for your team. Click to learn more →
        </p>
      </div>
    </Link>
  );
}
