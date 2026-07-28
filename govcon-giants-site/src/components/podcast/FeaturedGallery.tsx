import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import { featuredEpisodes } from '@/data/featuredEpisodes';
import { cn } from '@/lib/utils';

interface FeaturedGalleryProps {
  /** Optional header link (e.g. "/podcast" on home). Omit on /podcast. */
  linkTo?: string;
  linkLabel?: string;
}

/**
 * "Featured episodes" gallery (shared by `/` and `/podcast`): one featured
 * guest at a time with the custom audio player. Prev/next + dots + keyboard
 * arrows, wraps around; 3s auto-rotate suspended on hover and while audio
 * plays, disabled for reduced motion; manual nav resets the timer.
 * Switching guests remounts the player (which never autoplays).
 */
export default function FeaturedGallery({ linkTo, linkLabel }: FeaturedGalleryProps) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const episode = featuredEpisodes[active];

  const go = (delta: number) => {
    setDir(delta);
    setPlaying(false);
    setActive((a) => (a + delta + featuredEpisodes.length) % featuredEpisodes.length);
  };

  // Keyboard left/right arrows (ignored while typing in form fields)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-rotate every 3s — suspended while hovered, while audio plays, and
  // entirely disabled for reduced motion. `active` in deps resets the timer
  // after any advance (auto or manual).
  useEffect(() => {
    if (hovered || playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => go(1), 3000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, playing, active]);

  const arrowBtnCls =
    'flex h-12 w-12 items-center justify-center rounded-full border border-line text-slate-600 dark:text-slate-300 transition-all duration-150 hover:border-brand hover:bg-brand hover:text-brand-ink cursor-pointer';

  return (
    <section
      className="border-b border-line py-16 md:py-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container-gg">
        <SectionHeader
          kicker="CONVERSATIONS WITH GOVERNMENT INSIDERS"
          title={
            <>
              Featured <em>episodes</em>
            </>
          }
          linkTo={linkTo}
          linkLabel={linkLabel}
        />

        {/* Guest region — announces changes to screen readers */}
        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={episode.link}
              initial={{ opacity: 0, x: 48 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 * dir }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Guest face — large, rotated green offset frame */}
              <div className="relative mx-auto w-full" style={{ maxWidth: 'min(46vh, 520px)' }}>
                <div
                  aria-hidden
                  className="absolute inset-0 rotate-2 rounded-xl border-2 border-brand"
                />
                <img
                  src={episode.photo}
                  alt={episode.guest}
                  className="relative aspect-square w-full rounded-xl border border-line bg-raised object-cover"
                />
              </div>

              {/* Copy + custom player */}
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  {episode.agency}
                </p>
                <h3 className="mt-2 font-display text-4xl font-black tracking-normal text-slate-900 dark:text-white md:text-5xl">
                  {episode.guest}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {episode.role}
                </p>
                <a href={episode.link} target="_blank" rel="noopener noreferrer">
                  <p className="mt-5 text-lg font-semibold leading-snug text-slate-900 dark:text-white transition-colors hover:text-brand">
                    {episode.title}
                  </p>
                </a>
                <p className="mt-2 line-clamp-3 text-[15px] leading-[1.7] text-slate-500 dark:text-slate-400">
                  {episode.blurb}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="rounded-full border border-line bg-inset px-3 py-1 font-sans text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {episode.duration}
                  </span>
                  <a
                    href={episode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 transition-colors hover:text-brand"
                  >
                    Listen on Libsyn
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>

                <div className="mt-6">
                  <CustomPlayer
                    src={episode.audioUrl}
                    fallbackDuration={episode.duration}
                    onPlayingChange={setPlaying}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gallery controls — prev, dots, next */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous guest"
            className={arrowBtnCls}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {featuredEpisodes.map((ep, i) => (
              <button
                key={ep.link}
                type="button"
                onClick={() => {
                  setDir(i > active ? 1 : -1);
                  setPlaying(false);
                  setActive(i);
                }}
                aria-label={`Show ${ep.guest}`}
                aria-pressed={i === active}
                className={cn(
                  'h-2 rounded-full transition-all duration-200 cursor-pointer',
                  i === active ? 'w-6 bg-brand' : 'w-2 bg-line hover:bg-slate-400',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next guest"
            className={arrowBtnCls}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
