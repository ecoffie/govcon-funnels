import { motion } from 'framer-motion';
import StatCounter from '@/components/StatCounter';

const stats = [
  { value: 20, prefix: '$', suffix: 'M+', label: 'FEDERAL SALES BUILT FROM ZERO' },
  { value: 250, suffix: 'K+', label: 'PODCAST LISTENS' },
  { value: 334, suffix: '+', label: 'EPISODES PUBLISHED' },
];

/**
 * About §2 — stats band: 3-up counters on bg/raised. Rules draw left→right,
 * GSAP numbers count up (inside shared StatCounter), labels fade.
 */
export default function StatsBand() {
  return (
    <section className="border-y border-line bg-raised py-16 md:py-20">
      <div className="container-gg grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label}>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="mb-4 block h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <StatCounter
              value={s.value}
              prefix={s.prefix ?? ''}
              suffix={s.suffix ?? ''}
              label={s.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
