import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Waveform from '@/components/podcast/Waveform';
import { platforms } from '@/data/platforms';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headlineWords: { text: string; em?: boolean }[] = [
  { text: 'Every' },
  { text: 'episode' },
  { text: 'is' },
  { text: 'a' },
  { text: 'play', em: true },
  { text: 'you' },
  { text: 'can' },
  { text: 'run.' },
];

const metaChips = ['EP: 334+', 'THE DAILY WINDUP', 'INTERVIEWS', 'FREE'];

/**
 * Show header (podcast.md §1): bg/base hero with radial green glow top-right
 * + blueprint grid, eric-mic.png left with clip-path reveal, copy right with
 * word-split H1, animated waveform strip, listen-on platform buttons
 * (#listen-on anchor target for the featured card) and meta chips.
 */
export default function ShowHeader() {
  return (
    <section className="relative -mt-[72px] overflow-hidden pt-[72px]">
      {/* radial green glow top-right + blueprint grid (static CSS) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(34,197,94,0.12), transparent 60%)',
        }}
        aria-hidden
      />
      <img
        src="/hero-blueprint.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="container-gg relative grid min-h-[60dvh] items-center gap-12 py-16 md:py-20 lg:grid-cols-[45%_55%] lg:gap-14">
        {/* Image column — clip-path reveal left → right, 700ms */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <img
            src="/eric-mic.png"
            alt="Eric Coffie at the broadcast microphone in the GovCon Giants studio"
            className="aspect-[3/2] w-full rounded-xl border border-line object-cover"
          />
          {/* podcast-cover mini-card */}
          <motion.figure
            initial={{ scale: 0.8, opacity: 0, rotate: 6 }}
            animate={{ scale: 1, opacity: 1, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.85 }}
            className="absolute -bottom-6 right-4 w-24 rounded-lg border border-line bg-inset p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] md:-right-6 md:w-28"
          >
            <img
              src="/podcast-cover.png"
              alt="GovCon Giants Podcast cover art"
              className="w-full rounded-md"
            />
            <figcaption className="px-1 pb-0.5 pt-1.5 text-center font-mono text-[9px] tracking-[0.14em] text-slate-500">
              250K+ LISTENS
            </figcaption>
          </motion.figure>
        </motion.div>

        {/* Copy column */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <span className="kicker">THE GOVCON GIANTS PODCAST</span>
          </motion.div>

          <h1 className="font-display text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[56px]">
            {headlineWords.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
                    className={w.em ? 'inline-block italic text-brand' : 'inline-block'}
                  >
                    {w.text}
                  </motion.span>
                </span>
                {i < headlineWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg leading-[1.7] text-slate-300"
          >
            250,000+ listens. Near-daily drops. Short tactical hits from The Daily Windup
            plus long-form interviews with contracting officers, 8(a) graduates, and primes.
            Hosted by Eric Coffie.
          </motion.p>

          <div className="mt-6 max-w-xl">
            <Waveform bars={48} />
          </div>

          {/* Listen-on platform buttons (anchor target for "All Platforms") */}
          <div id="listen-on" className="mt-8 flex scroll-mt-28 flex-wrap gap-3">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.06, ease: 'easeOut' }}
                className="group inline-flex items-center gap-2 rounded-lg border border-line bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                <p.icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-brand" />
                {p.name}
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand" />
              </motion.a>
            ))}
          </div>

          {/* Meta chips — pop in */}
          <div className="mt-6 flex flex-wrap gap-3">
            {metaChips.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.1 + i * 0.08 }}
                className="rounded-full bg-brand-soft px-3.5 py-1.5 font-mono text-xs text-brand"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
