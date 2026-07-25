import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * About §5 — full-width flag banner with dark overlay, parallax at 0.4x,
 * mission statement + pulsing primary CTA to /start-here.
 */
export default function MissionBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // 0.4x parallax on the background image
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        src="/about-timeline-flag.png"
        alt=""
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute -top-[10%] left-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden />

      <div className="container-gg relative flex min-h-[56vw] items-center justify-center py-20 text-center md:min-h-[560px]">
        <div className="max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-0.5 w-6 bg-brand" aria-hidden />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white">
              THE MISSION
            </span>
          </motion.div>

          <h2 className="mb-8 font-display text-3xl font-bold leading-[1.15] text-white md:text-[40px]">
            {['Teach', 'everyday', 'people', 'to', 'win'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
                className="inline-block"
              >
                {w}{' '}
              </motion.span>
            ))}
            <motion.em
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              className="inline-block italic text-brand"
            >
              extraordinary
            </motion.em>{' '}
            {['federal', 'contracts.'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: EASE }}
                className="inline-block"
              >
                {w}{' '}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
          >
            <Link
              to="/start-here"
              className="inline-flex animate-pulse-ring items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Start Here — It&apos;s Free
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
