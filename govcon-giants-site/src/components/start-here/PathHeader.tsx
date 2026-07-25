import { Link } from 'react-router';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function scrollToStep1() {
  document.getElementById('step-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Start Here §1 — compact page header: kicker, word-split H1, subhead,
 * CTAs, and a dotted green path (stroke draw, 1.2s) arcing down toward
 * the 5-step curriculum.
 */
export default function PathHeader() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(34,197,94,0.12), transparent 60%)',
        }}
        aria-hidden
      />
      <img
        src="/hero-blueprint.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="container-gg relative pb-10 pt-16 md:pt-24">
        <div className="mb-4 flex items-center gap-3">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
            className="h-0.5 w-6 origin-left bg-brand"
            aria-hidden
          />
          <span className="kicker">NEW TO GOVCON? START HERE</span>
        </div>

        <h1 className="mb-6 max-w-[820px] font-display text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-slate-900 md:text-[56px]">
          {['Zero', 'experience?'].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
              className="inline-block"
            >
              {w}{' '}
            </motion.span>
          ))}
          <motion.em
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="inline-block italic text-brand"
          >
            Perfect.{' '}
          </motion.em>
          {["That's", 'who', 'this', 'is', 'for.'].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: EASE }}
              className="inline-block"
            >
              {w}{' '}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
          className="mb-8 max-w-[640px] text-lg leading-[1.7] text-slate-600"
        >
          Eric built a $20M+ federal business starting from nothing. This is the exact
          order he&apos;d do it in again — five steps, all free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={scrollToStep1}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Step 1: Get the Starter Kit
          </button>
          <Link
            to="/podcast"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-transparent px-7 py-3.5 text-[15px] font-semibold text-slate-900 transition-all duration-150 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Browse the Podcast
          </Link>
        </motion.div>

        {/* Dotted green path arcing down toward the curriculum */}
        <svg
          viewBox="0 0 320 120"
          fill="none"
          aria-hidden
          className="mt-8 h-[90px] w-[240px] md:h-[120px] md:w-[320px]"
        >
          <motion.path
            d="M8 4 C 60 60, 160 70, 200 90 C 220 100, 240 108, 312 112"
            stroke="#22C55E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0.5 14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.7 }}
          />
        </svg>
      </div>
    </section>
  );
}
