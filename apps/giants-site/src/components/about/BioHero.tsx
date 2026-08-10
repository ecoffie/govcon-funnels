import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { PrimaryButton } from '@/components/Buttons';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ROLE_LINE = 'GOVERNMENT CONTRACTING EXPERT · 8(A) MENTOR · HOST';

/** Mono role line that types on character-by-character (30ms/char, once). */
function TypeOnLine({ text }: { text: string }) {
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? text.length
      : 0,
  );

  useEffect(() => {
    // Reduced-motion users start with the full line via the lazy initializer.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let n = 0;
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= text.length) window.clearInterval(interval);
      }, 30);
    }, 600);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text]);

  return (
    <p className="font-mono text-sm tracking-[0.14em] text-green-400" aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {count < text.length && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-caret-blink bg-brand"
        />
      )}
    </p>
  );
}

interface BioHeroProps {
  onOpenPlaybook: () => void;
}

/**
 * About §1 — bio hero: plumb portrait left (40%), copy right (60%),
 * radial glow + blueprint grid, word-split H1, type-on role line.
 */
export default function BioHero({ onOpenPlaybook }: BioHeroProps) {
  return (
    <section className="relative -mt-[72px] flex min-h-[80dvh] items-center overflow-hidden bg-slate-950 pt-[72px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(34,197,94,0.18), transparent 60%)',
        }}
        aria-hidden
      />
      <img
        src="/hero-blueprint.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 invert"
      />

      <div className="container-gg relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[40%_60%] lg:gap-14">
        {/* Portrait — plumb, formal, clip reveal bottom→top */}
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          <div
            className="absolute -inset-4 translate-x-4 translate-y-4 rounded-xl border border-white/15 bg-white/5"
            aria-hidden
          />
          <img
            src="/eric-portrait.png"
            alt="Eric Coffie, founder of GovCon Giants"
            className="relative aspect-[3/4] w-full rounded-xl border border-line object-cover object-top"
          />
        </motion.div>

        {/* Copy */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
              className="h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <span className="kicker text-green-400">ABOUT THE FOUNDER</span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-black leading-[1.15] tracking-normal text-white md:text-[56px]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="inline-block"
            >
              Eric{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="inline-block italic text-brand"
            >
              Coffie
            </motion.em>
          </h1>

          <div className="mb-6 min-h-6">
            <TypeOnLine text={ROLE_LINE} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="mb-8 max-w-[560px] text-[19px] leading-[1.7] text-slate-300 md:text-[21px]"
          >
            Eric built Evankoff Construction from zero to{' '}
            <strong className="font-semibold text-white">$20M+ in government sales</strong>,
            helped build two 8(a) small businesses to millions in federal revenue, and
            turned one{' '}
            <strong className="font-semibold text-white">$5M Air Force Base contract</strong>{' '}
            into a platform that teaches everyday people to win extraordinary federal
            contracts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <PrimaryButton onClick={onOpenPlaybook}>Get the Free Playbook</PrimaryButton>
            <Link
              to="/podcast"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Listen to the Podcast
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-6 font-mono text-xs tracking-[0.18em] text-slate-500 dark:text-slate-400"
          >
            MIAMI, FL · EST. 2017
          </motion.p>
        </div>
      </div>
    </section>
  );
}
