import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { armAutoTracking, trackPageview } from '@/lib/track';

/**
 * Shared layout — nested-route pattern (renders <Outlet/>, App.tsx MUST use
 * nested <Route>s). Owns the fixed-navbar offset: the content slot gets
 * pt-[72px] so every page starts below the 72px fixed nav; full-bleed hero
 * sections opt out inside the page with -mt-[72px] on the hero section.
 * Also sets up Lenis smooth scrolling site-wide (disabled for reduced motion).
 */
export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Command Center beacon: arm global trackers once, page_view per route.
  useEffect(() => {
    armAutoTracking();
  }, []);
  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-base">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
