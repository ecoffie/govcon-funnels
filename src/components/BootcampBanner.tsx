'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const TARGET_TIME_MS = Date.UTC(2026, 2, 28, 13, 0, 0); // Mar 28, 2026 9:00 AM ET

function formatCountdown(msRemaining: number) {
  const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function BootcampBanner() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  const shouldHide = useMemo(() => {
    return (
      pathname?.startsWith('/dashboard') ||
      pathname?.startsWith('/internal') ||
      pathname?.startsWith('/encore')
    );
  }, [pathname]);

  useEffect(() => {
    setNow(Date.now());
    setMounted(true);
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (shouldHide || !mounted) {
    return null;
  }

  const remaining = TARGET_TIME_MS - now;
  const isLive = remaining <= 0;
  const { days, hours, minutes, seconds } = formatCountdown(remaining);

  return (
    <Link
      href="/contract-vehicles-bootcamp"
      className="block bg-gradient-to-r from-emerald-700 to-green-600 text-white border-b border-emerald-400/20 hover:from-emerald-600 hover:to-green-500 transition"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 text-center">
        <p className="text-sm md:text-base font-semibold">
          Free Contract Vehicles Bootcamp - Mar 28, 2026 at 9:00 AM ET (Zoom)
        </p>
        {isLive ? (
          <p className="text-xs md:text-sm mt-1 text-emerald-100">
            We are live now - click to join and get access.
          </p>
        ) : (
          <p className="text-xs md:text-sm mt-1 text-emerald-100">
            Starts in {days}d {hours}h {minutes}m {seconds}s - Click to reserve your spot.
          </p>
        )}
      </div>
    </Link>
  );
}
