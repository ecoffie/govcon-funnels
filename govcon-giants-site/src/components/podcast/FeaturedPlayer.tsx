import { motion } from 'framer-motion';
import { ListMusic, Play } from 'lucide-react';
import { episodes, formatEpisodeDate } from '@/data/episodes';

/**
 * Featured episode player card (podcast.md §2): large landscape card on
 * bg/raised with a 4px green left border — 16:9 thumbnail left (40%),
 * content right (60%). Features the first EP-numbered long-form episode in
 * the dataset (newest-first order → the EP: 334 CMMC episode). Includes a
 * decorative scrubber whose fill eases to 8% on hover (800ms) and opens the
 * episode link on click.
 */
export default function FeaturedPlayer() {
  const episode = episodes.find((e) => /\bEP:\s*\d+/i.test(e.title)) ?? episodes[0];

  const openEpisode = () => {
    window.open(episode.link, '_blank', 'noopener,noreferrer');
  };

  const scrollToPlatforms = () => {
    document.getElementById('listen-on')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="group grid overflow-hidden rounded-xl border border-line border-l-4 border-l-brand bg-raised transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:grid-cols-[40%_60%]">
            {/* Thumbnail */}
            <div className="relative aspect-video md:aspect-auto md:min-h-full">
              <img
                src="/thumb-ep-generic-2.png"
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-xs text-brand">
                {episode.duration}
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="flex h-14 w-14 scale-[0.6] items-center justify-center rounded-full bg-brand/90 text-brand-ink backdrop-blur transition-transform duration-200 group-hover:scale-100">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              <span className="inline-block rounded-full bg-brand px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.14em] text-brand-ink">
                LATEST LONG-FORM
              </span>
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25] text-white md:text-[28px]">
                {episode.title}
              </h2>
              <p className="mt-2 font-mono text-[13px] text-slate-500">
                {formatEpisodeDate(episode.date)} · {episode.duration}
              </p>
              <p className="mt-4 line-clamp-5 text-[15px] leading-[1.7] text-slate-300">
                {episode.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openEpisode}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Play Episode
                </button>
                <button
                  type="button"
                  onClick={scrollToPlatforms}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:border-brand hover:text-brand cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  <ListMusic className="h-4 w-4" />
                  All Platforms
                </button>
              </div>

              {/* Decorative scrubber — fill eases 0% → 8% on hover, click opens the episode */}
              <button
                type="button"
                onClick={openEpisode}
                aria-label={`Play ${episode.title}`}
                className="group/scrub relative mt-7 block h-6 w-full cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-line" />
                <span className="absolute left-0 top-1/2 h-1 w-full origin-left -translate-y-1/2 scale-x-0 rounded-full bg-brand transition-transform ease-out [transition-duration:800ms] group-hover/scrub:scale-x-[0.08]" />
                <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(34,197,94,0.5)] transition-[left] ease-out [transition-duration:800ms] group-hover/scrub:left-[8%]" />
                <span className="absolute right-0 top-full mt-1 font-mono text-[11px] text-slate-600">
                  {episode.duration}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
