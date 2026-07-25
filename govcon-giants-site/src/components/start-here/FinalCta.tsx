import { motion } from 'framer-motion';
import NewsletterCapture from '@/components/NewsletterCapture';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Start Here §5 — final CTA band (mirrors home §8): bg/inset + stars
 * pattern, floating book mockup, compact NewsletterCapture.
 */
export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-inset py-16 md:py-24">
      <img
        src="/pattern-stars.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="container-gg relative">
        <div className="relative mx-auto max-w-[640px] text-center">
          <motion.img
            src="/book-playbook.png"
            alt="Billion Dollar Playbook by Eric Coffie"
            loading="lazy"
            initial={{ x: -60, rotate: -12, opacity: 0 }}
            whileInView={{ x: 0, rotate: -6, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            className="mx-auto mb-8 w-[140px] animate-float-y rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.25)] lg:absolute lg:-left-56 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2"
          />
          <h2 className="mb-4 font-display text-3xl font-black tracking-tight text-slate-900 md:text-[40px]">
            {['Your', 'first', 'play', 'is'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="inline-block"
              >
                {w}{' '}
              </motion.span>
            ))}
            <motion.em
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="italic text-brand"
            >
              free.
            </motion.em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            className="mb-8 text-[17px] leading-[1.7] text-slate-600"
          >
            Five of the 72 federal websites Eric uses to find buyers, partners, and
            contracts — free, in your inbox, today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
            className="text-left [&_button]:animate-pulse-ring"
          >
            <NewsletterCapture
              variant="compact"
              kicker="FREE · NO SPAM · UNSUBSCRIBE ANYTIME"
              heading="Get the Playbook starter kit"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
