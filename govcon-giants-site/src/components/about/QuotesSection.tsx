import { motion } from 'framer-motion';

const QUOTE =
  'Give away 99.9% of what you know. The 0.1% you keep will take care of itself.';
const CHIPS = ['NO FLUFF', 'ACTIONABLE', 'FREE FIRST'];

/**
 * About §4 — philosophy / pull-quote band: word-by-word quote reveal,
 * spring quotation glyph, green-soft value chips. bg/inset + stars pattern.
 */
export default function QuotesSection() {
  const words = QUOTE.split(' ');

  return (
    <section id="press" className="relative overflow-hidden border-y border-line bg-inset py-16 md:py-24">
      <img
        src="/pattern-stars.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-[860px] px-6 text-center md:px-10">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="mb-6 block font-display text-[64px] leading-none text-brand"
          aria-hidden
        >
          &ldquo;
        </motion.span>

        <blockquote>
          <p className="font-display text-2xl font-bold italic leading-[1.4] text-slate-900 md:text-[32px]">
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
                className="inline-block"
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </p>
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 font-mono text-xs tracking-[0.18em] text-slate-500"
          >
            — ERIC COFFIE
          </motion.footer>
        </blockquote>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.1, ease: 'easeOut' }}
              className="rounded-full bg-brand-soft px-4 py-1.5 font-mono text-xs font-medium tracking-[0.14em] text-brand"
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
