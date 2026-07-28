import { motion } from 'framer-motion';
import NewsletterCapture from '@/components/NewsletterCapture';
import ShowHeader from '@/components/podcast/ShowHeader';
import FeaturedGallery from '@/components/podcast/FeaturedGallery';
import EpisodeArchive from '@/components/podcast/EpisodeArchive';

/* ------------------- Section 5 — Never Miss an Episode CTA ------------------- */

function EpisodeCta() {
  return (
    <section className="border-y border-line bg-raised py-16 md:py-24">
      <div className="container-gg grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <span className="kicker">NEVER MISS AN EPISODE</span>
          </div>
          <h2 className="font-display text-[32px] font-black leading-[1.1] tracking-normal text-slate-900 dark:text-white">
            The Daily Windup, in your <em className="italic text-brand">inbox</em>.
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-[1.7] text-slate-600 dark:text-slate-300">
            One tactical GovCon play per weekday. Free. Five minutes.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <NewsletterCapture
            variant="compact"
            kicker="THE DAILY WINDUP · FREE"
            heading="Get tomorrow's play tonight"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ----------------------------------- */

/** /podcast — full episode archive (podcast.md): show header, featured
 * episodes gallery, sticky filter bar, month-grouped archive, CTA band. */
export default function Podcast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <ShowHeader />
      <FeaturedGallery />
      <EpisodeArchive />
      <EpisodeCta />
    </motion.div>
  );
}
