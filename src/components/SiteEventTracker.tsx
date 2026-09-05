'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { armEventTracking, trackPageview } from '@/lib/client-events';

export default function SiteEventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    armEventTracking();
  }, []);

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
