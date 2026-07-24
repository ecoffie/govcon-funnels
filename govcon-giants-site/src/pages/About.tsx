import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsletterModal } from '@/components/NewsletterCapture';
import BioHero from '@/components/about/BioHero';
import StatsBand from '@/components/about/StatsBand';
import StoryTimeline from '@/components/about/StoryTimeline';
import QuotesSection from '@/components/about/QuotesSection';
import MissionBanner from '@/components/about/MissionBanner';
import { useMeta } from '@/lib/useMeta';

/**
 * `/about` — Eric Coffie bio (about.md): bio hero, stats counters,
 * pinned GSAP story timeline, philosophy quotes, mission banner CTA.
 */
export default function About() {
  useMeta({ title: 'About Eric Coffie — GovCon Giants Podcast', description: 'Eric Coffie built Evankoff Construction from zero to $20M+ in government sales and now teaches everyday people to win federal contracts. The story behind GovCon Giants.', canonicalPath: '/about' });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <BioHero onOpenPlaybook={() => setModalOpen(true)} />
      <StatsBand />
      <StoryTimeline />
      <QuotesSection />
      <MissionBanner />
      <NewsletterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
}
