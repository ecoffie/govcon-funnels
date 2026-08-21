import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import {
  MINDY_LAUNCH_URL,
  MINDY_LAUNCH_DATE,
  MINDY_LAUNCH_TIME,
  MINDY_LAUNCH_ENDS_AT,
} from '@/lib/mindy-launch';

const DISMISS_KEY = 'gg.mindyDay.dismissed.2026-08-22';

/**
 * Top-of-page announcement for Mindy Day.
 *
 * WHY IT EXISTS: after the 2026-08-13 "SPA as main site" swap, the homepage lost every
 * path to the launch — the old Next nav (SiteNav.tsx) carried a link, this SPA's Navbar
 * did not. Verified 2026-08-20 by rendering govcongiants.com in a headless browser:
 * ZERO occurrences of "Mindy" in the page text and no matching link, two days before a
 * 714-registrant event.
 *
 * SELF-EXPIRING. It stops rendering after MINDY_LAUNCH_ENDS_AT so a past event never sits
 * at the top of the site — the failure mode that makes announcement bars into noise
 * everyone learns to ignore. No deploy needed to retire it.
 *
 * Dismissal is per-event (the key carries the date), so a future event shows again to
 * someone who dismissed this one.
 */
/** Should the bar render at all? Pure read — no state, no effect. */
function shouldShow(): boolean {
  if (Date.now() > MINDY_LAUNCH_ENDS_AT.getTime()) return false; // event over
  try {
    return localStorage.getItem(DISMISS_KEY) !== '1';
  } catch {
    return true; // private mode / storage blocked — showing it is the safe default
  }
}

export default function MindyDayBanner() {
  // Lazy initial state, NOT an effect: deciding visibility is a pure read of the clock
  // and localStorage, so computing it during the first render avoids the flash of an
  // already-dismissed banner (and the cascading re-render eslint's
  // react-hooks/set-state-in-effect correctly flags).
  const [show, setShow] = useState(shouldShow);
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Publish the banner's real height as --gg-banner-h so the fixed navbar and the page
   * content offset by EXACTLY what it occupies. Measured, not hardcoded: the bar wraps to
   * two lines on narrow screens, and a hardcoded offset would either clip the nav or leave
   * a gap. Set to 0px whenever the banner is not rendering, so every consumer can offset
   * unconditionally.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (!show) {
      root.style.setProperty('--gg-banner-h', '0px');
      return;
    }
    const apply = () => {
      const h = ref.current?.offsetHeight ?? 0;
      root.style.setProperty('--gg-banner-h', `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
      root.style.setProperty('--gg-banner-h', '0px');
    };
  }, [show]);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // non-fatal: it just shows again next visit
    }
  };

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[80] bg-gradient-to-r from-[#1e3a8a] to-[#7c3aed] text-white"
    >
      <div className="container-gg flex items-center justify-center gap-x-4 gap-y-1 py-2.5 pr-8 text-center flex-wrap">
        <p className="text-[13px] font-semibold sm:text-sm">
          <span className="font-bold">Mindy Day</span>
          <span className="hidden sm:inline"> — {MINDY_LAUNCH_DATE}, {MINDY_LAUNCH_TIME}</span>
          <span className="sm:hidden"> — {MINDY_LAUNCH_DATE}</span>
        </p>
        <a
          href={MINDY_LAUNCH_URL}
          className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[13px] font-bold text-white transition hover:bg-white/25"
        >
          Save your free seat
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss Mindy Day announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-white/70 transition hover:bg-white/15 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
