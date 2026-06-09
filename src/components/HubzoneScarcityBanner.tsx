'use client';

import { useEffect, useState } from 'react';

interface Spots {
  registered: number | null;
  capacity: number;
  remaining: number | null;
  full: boolean;
}

/**
 * Live scarcity banner for the HUBZone webinar landing page.
 * "First 100 registrants get live Zoom access" — shows real spots remaining,
 * driven by the public count-only /api/hubzone/spots endpoint (no PII).
 */
export default function HubzoneScarcityBanner() {
  const [spots, setSpots] = useState<Spots | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/hubzone/spots', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => { if (active) setSpots(d); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  // While loading, or if the count fails, fall back to the static offer
  // (never show a broken/zero state that could mislead).
  const remaining = spots?.remaining;
  const isFull = spots?.full === true;

  const headline = isFull
    ? 'Live Zoom seats are full — join the waitlist for the recording'
    : remaining != null && remaining <= 100
      ? `Only ${remaining} of ${spots!.capacity} live Zoom seats left`
      : `First ${spots?.capacity ?? 100} registrants get live Zoom access`;

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-sm font-semibold text-orange-700">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full bg-orange-400 ${isFull ? '' : 'animate-ping opacity-75'}`}></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
      </span>
      {headline}
    </div>
  );
}
