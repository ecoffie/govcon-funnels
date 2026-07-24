import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsletterModal } from '@/components/NewsletterCapture';
import PathHeader from '@/components/start-here/PathHeader';
import StepsPath from '@/components/start-here/StepsPath';
import QualifierCards from '@/components/start-here/QualifierCards';
import FaqAccordion from '@/components/start-here/FaqAccordion';
import FinalCta from '@/components/start-here/FinalCta';
import { useMeta } from '@/lib/useMeta';

/**
 * `/start-here` — new-to-GovCon onboarding (start-here.md): page header,
 * 5-step scroll-scrubbed curriculum path, qualifier cards, FAQ accordion,
 * starter-kit CTA band.
 */
export default function StartHere() {
  useMeta({ title: 'Start Here — GovCon Giants Podcast', noindex: true, canonicalPath: '/start-here' });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <PathHeader />
      <section className="pb-16 md:pb-24">
        <div className="container-gg">
          <StepsPath onOpenKit={() => setModalOpen(true)} />
        </div>
      </section>
      <QualifierCards />
      <FaqAccordion />
      <FinalCta />
      <NewsletterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
}
