import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

const MOMENTS = Array.from(
  { length: 12 },
  (_, i) => `/summit/moment-${String(i + 1).padStart(2, '0')}.jpg`,
);

/** Per-tile tilt — straightens out on hover. */
const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-[1.5deg]'];

/**
 * "Summit moments" photo wall (home, after SummitSection): masonry-style
 * CSS-columns collage of the candid moment-*.jpg set — polaroid paper
 * frames (white padding, hairline border, soft shadow), mixed tilts,
 * staggered spring reveals, hover straightens and zooms.
 */
export default function MomentsWall() {
  return (
    <section className="border-b border-line bg-inset py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="SUMMIT MOMENTS"
          title={
            <>
              The room where <em>it happens</em>
            </>
          }
          linkTo="https://gcgsummit.com"
          linkLabel="gcgsummit.com"
          externalLink
        />
        <div className="columns-2 gap-5 sm:columns-3 lg:columns-4">
          {MOMENTS.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: (i % 4) * 0.08 }}
              className={cn(
                'group mb-5 break-inside-avoid rounded-lg border border-line bg-raised p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:rotate-0 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]',
                TILTS[i % TILTS.length],
              )}
            >
              <img
                src={src}
                alt={`Candid moment ${i + 1} from the GCG National Summit`}
                loading="lazy"
                className="w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
