import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GhostLink } from '@/components/Buttons';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  kicker: string;
  /** H2 content — wrap one word in <em> for the italic-green treatment. */
  title: ReactNode;
  linkTo?: string;
  linkLabel?: string;
  externalLink?: boolean;
  className?: string;
}

/**
 * Kicker (with 24px green rule) + Merriweather H2 + optional right-aligned
 * "View all →" ghost link. Reveals on scroll into view.
 */
export default function SectionHeader({
  kicker,
  title,
  linkTo,
  linkLabel,
  externalLink,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14', className)}
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-0.5 w-6 origin-left bg-brand"
            aria-hidden
          />
          <span className="kicker">{kicker}</span>
        </div>
        <h2 className="font-display text-3xl font-black leading-[1.15] tracking-normal text-slate-900 dark:text-white md:text-5xl [&_em]:italic [&_em]:text-brand">
          {title}
        </h2>
      </div>
      {linkTo && linkLabel && (
        <GhostLink to={linkTo} external={externalLink} className="mb-1 shrink-0">
          {linkLabel}
        </GhostLink>
      )}
    </motion.div>
  );
}
