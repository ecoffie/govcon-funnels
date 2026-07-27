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
 * Show header (podcast.md §1): dark full-bleed photo hero in the home hero's
 * design language — stage photo with dark scrims, condensed green kicker,
 * massive white Montserrat headline with italic-green accent word, show
 * description, waveform strip, listen-on platform buttons (#listen-on
 * anchor target) and meta chips.
 */
export default function ShowHeader() {
  return (
    <section className="relative -mt-[72px] overflow-hidden border-b border-line bg-slate-950 pt-[72px]">
      {/* Photo backdrop + readability scrims */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/summit/summit-ballroom.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      <div className="container-gg relative flex min-h-[72dvh] flex-col justify-center py-16 md:py-24">
        {/* Kicker */}
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
            className="h-0.5 w-6 origin-left bg-green-400"
            aria-hidden
          />
          <span className="font-narrow text-sm font-semibold uppercase tracking-[0.22em] text-green-400">
            THE GOVCON GIANTS PODCAST
          </span>
        </motion.div>

        <h1 className="font-display text-[36px] font-black leading-[1.05] tracking-[-0.02em] text-white md:text-[64px]">
          {headlineWords.map((w, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
                  className={w.em ? 'inline-block italic text-green-400' : 'inline-block'}
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
          className="mt-6 max-w-xl text-lg leading-[1.7] text-slate-200"
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
              className="group inline-flex items-center gap-2 rounded-lg border border-white/30 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-green-400 hover:text-green-400"
            >
              <p.icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-green-400" />
              {p.name}
              <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-green-400" />
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
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-narrow text-sm font-semibold uppercase tracking-[0.1em] text-green-400"
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
