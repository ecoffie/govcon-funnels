import { motion, useReducedMotion } from 'framer-motion';
import { SecondaryButton } from '@/components/Buttons';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const bullets = [
  'Find buyers before the RFP drops',
  'Locate subcontracting portals at every major prime',
  'Track recompetes with FPDS data',
  'Register and certify without paying a consultant',
];

interface BookFeatureProps {
  /** Opens the guide signup modal with the Website Starter Kit. */
  onGetFreeWebsites: () => void;
}

/**
 * Book hero band (resources.md §2): floating playbook mockup on a pedestal,
 * sales copy, bullets, and dual CTAs.
 */
export default function BookFeature({ onGetFreeWebsites }: BookFeatureProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-line bg-raised py-16 md:py-24">
      {/* green radial glow behind the book */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 22% 50%, rgba(34,197,94,0.13), transparent 65%)',
        }}
        aria-hidden
      />

      <div className="container-gg relative grid items-center gap-12 lg:grid-cols-[40%_60%] lg:gap-10">
        {/* Book column */}
        <div className="relative mx-auto w-full max-w-[420px]">
          {/* pedestal card */}
          <div
            className="absolute inset-x-2 bottom-[-24px] top-14 rounded-xl border border-line bg-inset"
            aria-hidden
          />
          {/* entrance: rotate -10°→-4° + slide from left 80px (spring) */}
          <motion.div
            initial={{ x: -80, rotate: -10, opacity: 0 }}
            whileInView={{ x: 0, rotate: -4, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="relative"
          >
            {/* gentle 5s float loop ±8px (skipped for reduced motion) */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [-8, 8] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
              }
            >
              <img
                src="/book-playbook.png"
                alt="Billion Dollar Playbook, by Eric Coffie"
                className="w-full rounded-lg shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Sales copy column */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-0.5 w-6 bg-brand" aria-hidden />
            <span className="kicker">THE BOOK</span>
          </motion.div>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="font-display text-3xl font-black leading-[1.1] tracking-normal text-slate-900 dark:text-white md:text-[40px]"
          >
            Billion Dollar <em className="italic text-brand">Playbook</em>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="mt-4 max-w-xl text-[17px] leading-[1.7] text-slate-600 dark:text-slate-300"
          >
            The exact federal websites Eric used to go from zero to $20M+ in
            government sales — what each one is and how to use it.
          </motion.p>

          <motion.ul
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="mt-7 space-y-3.5"
          >
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                <span className="mt-[7px] h-2 w-2 shrink-0 bg-brand" aria-hidden />
                {b}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://www.amazon.com/dp/B08NF1NPZQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink transition-all duration-150 cursor-pointer hover:bg-brand-hover hover:-translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Get the Book
            </a>
            <SecondaryButton onClick={onGetFreeWebsites}>
              Get 5 Websites Free
            </SecondaryButton>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="mt-6 font-mono text-xs tracking-[0.14em] text-slate-500 dark:text-slate-400"
          >
            USED BY THOUSANDS OF FEDERAL CONTRACTORS
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
