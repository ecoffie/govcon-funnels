import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import { podcastExperts, summitSpeakers } from '@/data/speakers';
import type { Speaker } from '@/data/speakers';

/** Condensed tier subheading with the small green rule (matches SectionHeader kicker style). */
function TierHeading({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-0.5 w-6 bg-brand" aria-hidden />
      <h3 className="font-narrow text-sm font-semibold uppercase tracking-[0.22em] text-brand">
        {children}
      </h3>
    </div>
  );
}

function SpeakerCard({ speaker, index }: { speaker: Speaker; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: (index % 4) * 0.08 }}
      className="h-full"
    >
      <a
        href={speaker.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={speaker.photo}
            alt={speaker.name}
            loading="lazy"
            className="h-full w-full bg-raised object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h4 className="font-display text-lg font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-brand dark:text-white">
            {speaker.name}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {speaker.role} · {speaker.org}
          </p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {speaker.credential}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-narrow text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {speaker.tier === 'summit' ? 'Summit' : 'Episode'}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

/**
 * "Industry Experts & Featured Speakers" (home, after SummitSection):
 * credibility stats strip, then two tiers — GCG National Summit speakers
 * and podcast guests & advisors — as linked headshot cards. Authority
 * section only: links go to episodes and gcgsummit.com, no product copy.
 */
export default function SpeakersSection() {
  return (
    <section className="border-b border-line py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="INDUSTRY EXPERTS & FEATURED SPEAKERS"
          title={
            <>
              Where federal contracting&rsquo;s leaders come to <em>teach</em>.
            </>
          }
        />

        {/* Credibility stats — slim divided strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mb-20"
        >
          {[
            { value: 700, suffix: '+', label: 'Summit Attendees' },
            { value: 75, suffix: '+', label: 'Industry Sessions' },
            { value: 250, suffix: 'K+', label: 'Podcast Listens' },
          ].map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </motion.div>

        {/* Tier 1 — Summit speakers */}
        <TierHeading>GCG National Summit Speakers</TierHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summitSpeakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
          ))}
        </div>

        {/* Tier 2 — Podcast guests & advisors */}
        <div className="mt-16 md:mt-20">
          <TierHeading>Podcast Guests &amp; Advisors</TierHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {podcastExperts.map((speaker, i) => (
              <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
