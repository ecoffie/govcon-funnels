import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import type { Guide } from '@/components/resources/guides';
import { guides } from '@/components/resources/guides';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface GuidesLibraryProps {
  onSelect: (guide: Guide) => void;
}

/**
 * Free guides library (resources.md §3): 3-col card grid where each card
 * opens the guide signup modal. Green top accent bar draws left→right on
 * hover, icon tilts, CTA arrow nudges.
 */
export default function GuidesLibrary({ onSelect }: GuidesLibraryProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader kicker="FREE GUIDES" title={<>Steal the <em>starter kit</em></>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, i) => (
            <motion.button
              key={guide.title}
              type="button"
              onClick={() => onSelect(guide)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: EASE }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-raised p-6 text-left transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label={`Email me ${guide.title}`}
            >
              {/* top accent bar — draws left→right on hover */}
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand transition-transform duration-200 group-hover:rotate-[8deg]">
                <guide.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-bold leading-[1.2] tracking-normal text-slate-900 dark:text-white transition-colors group-hover:text-brand">
                {guide.title}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                {guide.blurb}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand">
                Email It to Me
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
