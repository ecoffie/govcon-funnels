import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import CustomPlayer from '@/components/podcast/CustomPlayer';
import EqBars from '@/components/EqBars';
import { featuredEpisodes } from '@/data/featuredEpisodes';
import type { FeaturedEpisode } from '@/data/featuredEpisodes';
import { cn } from '@/lib/utils';

interface FeaturedGalleryProps {
  /** Optional header link (e.g. "/podcast" on home). Omit on /podcast. */
  linkTo?: string;
  linkLabel?: string;
}

/** tim.blog-style strip card: face, agency kicker, name, role, title, meta row.
 *  Face + text link to /podcast/featured/<index>; the play toggle sits
 *  OUTSIDE the link so it never navigates. */
function StripCard({
  episode,
  index,
  open,
  playing,
  onToggle,
}: {
  episode: FeaturedEpisode;
  index: number;
  open: boolean;
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      data-card
      className="group w-[75vw] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:w-72 md:w-80"
    >
      <Link to={`/podcast/featured/${index}`} className="block">
        <img
          src={episode.photo}
          alt={episode.guest}
          loading="lazy"
          className="aspect-square w-full bg-raised object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="p-5 pb-0">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {episode.agency}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-normal text-slate-900 transition-colors group-hover:text-brand dark:text-white">
            {episode.guest}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {episode.role}
          </p>
          <p className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand dark:text-white">
            {episode.title}
          </p>
        </div>
      </Link>

      <div className="p-5 pt-4">
        {/* Meta row: play/stop toggle, eq bars, duration chip */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? `Stop ${episode.title}` : `Play ${episode.title}`}
            aria-pressed={open}
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer',
              open
                ? 'border-brand bg-brand text-brand-ink'
                : 'border-line text-slate-500 hover:border-brand hover:bg-brand hover:text-brand-ink dark:text-slate-400',
            )}
          >
            {open ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            )}
          </button>
          {open && playing && <EqBars />}
          <span className="rounded-full border border-line bg-inset px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {episode.duration}
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * "Featured episodes" horizontal scroller (tim.blog's Tim Ferriss Show strip)
 * — shared by `/` and `/podcast`. Snap-x row of the 6 featured guests with
 * edge fades, hidden scrollbar, prev/next arrows (disabled at the ends),
 * and a CustomPlayer docked under the strip for the active card. User-driven
 * only — no auto-rotation.
 */
export default function FeaturedGallery({ linkTo, linkLabel }: FeaturedGalleryProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = stripRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  const scrollByCard = (dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const w = card ? card.offsetWidth + 24 : 320; // card width + gap-6
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  const open = openIndex !== null ? featuredEpisodes[openIndex] : null;

  const arrowBtnCls = (enabled: boolean) =>
    cn(
      'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-150',
      enabled
        ? 'border-line text-slate-600 hover:border-brand hover:bg-brand hover:text-brand-ink cursor-pointer dark:text-slate-300'
        : 'cursor-not-allowed border-line text-slate-300 dark:text-slate-600',
    );

  return (
    <section className="border-b border-line py-16 md:py-24">
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="relative"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-base to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-base to-transparent" />

          <div
            ref={stripRef}
            onScroll={updateArrows}
            tabIndex={0}
            aria-label="Featured episodes — scroll horizontally"
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredEpisodes.map((episode, i) => (
              <StripCard
                key={episode.link}
                episode={episode}
                index={i}
                open={openIndex === i}
                playing={playing && openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Prev / next arrows */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canLeft}
              aria-label="Scroll back"
              className={arrowBtnCls(canLeft)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canRight}
              aria-label="Scroll forward"
              className={arrowBtnCls(canRight)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Player docked under the strip for the active card */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-6 rounded-xl border border-line bg-raised p-5"
          >
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Now playing · {open.guest}
            </p>
            <CustomPlayer
              key={open.link}
              src={open.audioUrl}
              fallbackDuration={open.duration}
              onPlayingChange={setPlaying}
              autoPlay
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
