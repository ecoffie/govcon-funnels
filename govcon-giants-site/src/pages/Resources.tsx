import { useState } from 'react';
import { motion } from 'framer-motion';
import NewsletterCapture from '@/components/NewsletterCapture';
import BookFeature from '@/components/resources/BookFeature';
import BookshelfSection from '@/components/resources/BookshelfSection';
import DirectorySection from '@/components/resources/DirectorySection';
import GuideSignupModal from '@/components/resources/GuideSignupModal';
import VaultLibrary from '@/components/resources/VaultLibrary';
import type { Guide } from '@/components/resources/guides';
import { guides } from '@/components/resources/guides';
import { useMeta } from '@/lib/useMeta';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------ Page header ------------------------------- */

const h1Words: { text: string; em?: boolean }[] = [
  { text: 'Tools' },
  { text: 'that' },
  { text: 'find' },
  { text: 'buyers,', em: true },
  { text: 'not' },
  { text: 'just' },
  { text: 'bids.' },
];

function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 md:py-20">
      {/* radial glow top-right + faint blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 85% 0%, rgba(34,197,94,0.18), transparent 60%)',
        }}
        aria-hidden
      />
      <img
        src="/hero-blueprint.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 invert"
      />

      <div className="container-gg relative">
        <div className="mb-5 flex items-center gap-3">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-0.5 w-6 origin-left bg-brand"
            aria-hidden
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="kicker text-green-400"
          >
            RESOURCES
          </motion.span>
        </div>

        <h1 className="max-w-[820px] font-display text-4xl font-black leading-[1.15] tracking-normal text-white md:text-[56px]">
          {h1Words.map((w, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
                  className={w.em ? 'inline-block italic text-brand' : 'inline-block'}
                >
                  {w.text}
                </motion.span>
              </span>
              {i < h1Words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
          className="mt-5 max-w-[640px] text-lg leading-[1.7] text-slate-300"
        >
          The book, the websites, and the free guides Eric uses to find federal
          opportunities before they hit SAM.gov.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA -------------------------------- */

function FinalCta() {
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
            className="mx-auto mb-8 w-28 animate-float-y rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.25)] lg:absolute lg:-left-56 lg:top-1/2 lg:mb-0 lg:w-[140px] lg:-translate-y-1/2"
          />
          <h2 className="mb-4 font-display text-3xl font-black tracking-normal text-slate-900 dark:text-white md:text-[40px]">
            {['Start', 'with', 'the'].map((w, i) => (
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
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="italic text-brand"
            >
              Playbook.
            </motion.em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mb-8 text-[17px] leading-[1.7] text-slate-600 dark:text-slate-300"
          >
            Five of the 72 federal websites Eric uses to find buyers, partners, and
            contracts — free, in your inbox, today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="text-left"
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

/* --------------------------------- Page ----------------------------------- */

export default function Resources() {
  useMeta(
    'Resources | GovCon Giants',
    'Free guides, books, and tools that find buyers, not just bids — the Billion Dollar Playbook and more.'
  );
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <PageHeader />
      <BookFeature onGetFreeWebsites={() => setActiveGuide(guides[0])} />
      <BookshelfSection />
      <VaultLibrary />
      <DirectorySection />
      <FinalCta />
      <GuideSignupModal guide={activeGuide} onClose={() => setActiveGuide(null)} />
    </motion.div>
  );
}
