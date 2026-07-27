import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import { GhostLink } from '@/components/Buttons';

const SUMMIT_URL = 'https://gcgsummit.com';

const topics = [
  'Small Business',
  'Cybersecurity',
  'Mergers & Acquisitions',
  'Supply Chain',
  'Access to Capital',
  'Compliance',
  'Defense Technologies',
  'Artificial Intelligence',
];

/** Verified from gcgsummit.com/speakers (2024 lineup). */
const pastSpeakers = [
  { name: 'Jackie Robinson-Burnette', role: 'Associate Administrator, SBA' },
  { name: 'Donna Bennett', role: 'CISO, U.S. Dept. of State' },
  { name: 'Shannon Jackson', role: 'Executive Director (SES), HHS OSDBU' },
  { name: 'Vonna Ordaz', role: 'Director, NRC Office of Small Business' },
];

/**
 * GCG National Summit band (home page, after the podcast strip): annual
 * Miami conference — description, stat counters, topic chips, external CTA.
 * Facts verified from gcgsummit.com only.
 */
export default function SummitSection() {
  /* Scroll-linked parallax on the stats panel (±20px drift while in view) */
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ['start end', 'end start'],
  });
  const statsY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const photoY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section className="relative overflow-hidden border-b border-line bg-inset py-16 md:py-24">
      {/* faint brand star pattern */}
      <img
        src="/pattern-stars.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 w-[420px] opacity-25"
        loading="lazy"
      />
      <div className="container-gg relative">
        <SectionHeader
          kicker="THE ANNUAL EVENT"
          title={
            <>
              GCG National <em>Summit</em>
            </>
          }
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="max-w-lg text-[17px] leading-[1.7] text-slate-600 dark:text-slate-300">
              The Contracting Connections + Technology Summit, held annually in Miami, FL.
              One room full of government leaders, prime contractors, small business owners,
              and industry experts — built for making the connections that turn into contracts.
            </p>

            <div className="mt-7 flex max-w-lg flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs text-slate-500 dark:text-slate-400"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-8 max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Past speakers include
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {pastSpeakers.map((s) => (
                  <li key={s.name}>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.role}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={SUMMIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                Visit gcgsummit.com
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <GhostLink to={`${SUMMIT_URL}/speakers/`} external>
                Meet the speakers
              </GhostLink>
            </div>
          </motion.div>

          {/* Photo-led collage: panel shot, stats paper card overlap,
              rotated Miami VIP-reception photo */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 rotate-1 rounded-xl border-2 border-brand"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <motion.div style={{ y: photoY }} className="absolute -inset-y-[8%] inset-x-0">
                  <img
                    src="/summit/moment-01.jpg"
                    alt="Attendees networking between sessions at the GCG National Summit"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <img
                src="/summit/moment-09.jpg"
                alt="GCG National Summit VIP reception on a yacht, Miami skyline"
                loading="lazy"
                className="absolute -bottom-10 -left-4 hidden w-44 -rotate-3 rounded-lg border border-line object-cover shadow-[0_16px_40px_rgba(0,0,0,0.2)] sm:block md:w-52"
              />
            </div>
            {/* Parallax lives on the inner wrapper so it never fights the
                entrance animation's `y` */}
            <motion.div
              style={{ y: statsY }}
              className="relative z-10 mx-4 -mt-14 grid grid-cols-1 gap-8 rounded-xl border border-line bg-raised p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:grid-cols-3 md:p-10"
            >
              <StatCounter value={700} suffix="+" label="Attendees" />
              <StatCounter value={75} suffix="+" label="Industry speakers" />
              <StatCounter value={50} suffix="+" label="Learning sessions" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
