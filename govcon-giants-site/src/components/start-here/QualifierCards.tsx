import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const DRAW = { duration: 0.6, ease: 'easeOut' as const };

/** Hand-drawn check-circle: strokes draw in via pathLength (600ms). */
function CheckCircleDrawn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand">
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={DRAW} />
      <motion.path d="m9 12 2 2 4-4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...DRAW, delay: 0.3 }} />
    </svg>
  );
}

function ClockDrawn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand">
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={DRAW} />
      <motion.path d="M12 6v6l4 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...DRAW, delay: 0.3 }} />
    </svg>
  );
}

function XCircleDrawn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gold">
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={DRAW} />
      <motion.path d="m15 9-6 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...DRAW, delay: 0.3 }} />
      <motion.path d="m9 9 6 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...DRAW, delay: 0.45 }} />
    </svg>
  );
}

const cards = [
  {
    Icon: CheckCircleDrawn,
    title: 'You can follow a process',
    body: 'Registrations, clauses, deadlines. Tedious, learnable, worth millions.',
  },
  {
    Icon: ClockDrawn,
    title: 'You can be patient',
    body: 'First wins typically take months, not days. The podcast keeps you moving meanwhile.',
  },
  {
    Icon: XCircleDrawn,
    title: 'This is NOT get-rich-quick',
    body: 'Anyone selling you a shortcut is selling you a course, not a contract.',
  },
];

/**
 * Start Here §3 — "Is GovCon for you?" qualifier cards on bg/raised:
 * stagger up 0.12s, icons draw on scroll, hover lift.
 */
export default function QualifierCards() {
  return (
    <section className="border-y border-line bg-raised py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader kicker="REAL TALK" title={<>This works if <em>you</em> work.</>} />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              className="rounded-xl border border-line bg-base p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-4">
                <Icon />
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-white">{title}</h3>
              <p className="text-[15px] leading-[1.7] text-slate-400">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
