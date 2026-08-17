import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import NewsletterCapture from '@/components/NewsletterCapture';
import SectionHeader from '@/components/SectionHeader';
import ArticleCard from '@/components/ArticleCard';
import FeaturedGallery from '@/components/podcast/FeaturedGallery';
import SummitSection from '@/components/SummitSection';
import { articles } from '@/data/articles';
import { cn } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

/* --------------------------------- Hero ---------------------------------- */

/** Green squiggle underline flourish (Moth signature), draws in on load. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" fill="none" aria-hidden className={className}>
      <motion.path
        d="M4 9 C 40 2, 80 12, 118 7 C 150 3, 190 10, 216 6"
        stroke="#4ADE80"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** Rotating GovCon topics for the hero word rotator. */
const ROTATING_TOPICS = [
  'RFPs',
  'SAM.gov',
  '8(a)',
  'HUBZone',
  'CMMC',
  'Subcontracting',
  'Proposals',
  'Teaming',
];

/** Candid summit photography — shared by the hero slideshow and the marquee. */
const HERO_PHOTOS = [
  'stage-2',
  'summit-ballroom',
  'stage-1',
  'candid-session',
  'stage-6',
  'candid-photo',
  'stage-3',
  'candid-table',
  'stage-4',
  'candid-selfie',
  'stage-5',
  'candid-chat',
  'stage-8',
  'candid-boat',
  'candid-night',
];

function Hero() {
  /* Word rotator — swaps the topic every 2.5s (disabled for reduced motion) */
  const [topicIndex, setTopicIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(
      () => setTopicIndex((i) => (i + 1) % ROTATING_TOPICS.length),
      2500,
    );
    return () => window.clearInterval(t);
  }, []);

  /* Background slideshow — 3s per photo, always rotating;
     no autoplay at all for reduced-motion users (first slide only) */
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % HERO_PHOTOS.length), 3000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      className="relative -mt-[72px] flex min-h-[100dvh] items-end overflow-hidden border-b border-line bg-slate-950"
    >
      {/* Full-viewport background slideshow with Ken Burns drift */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence>
          <motion.img
            key={HERO_PHOTOS[slide]}
            src={`/summit/${HERO_PHOTOS[slide]}.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeOut' },
              scale: { duration: 7, ease: 'linear' },
            }}
          />
        </AnimatePresence>
        {/* Readability scrims — strongest bottom-left where the type sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
      </div>

      {/* Type — bottom-left (Moth homepage style) */}
      <div className="container-gg relative w-full pb-20 pt-[136px] md:pb-24 md:pt-[168px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="mb-6 font-sans text-sm font-semibold uppercase tracking-[0.22em] text-green-400">
            GOVERNMENT CONTRACTING, WITHOUT THE FLUFF
          </p>
          <h1 className="font-display text-4xl font-black leading-[1.15] tracking-normal text-white sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={{ y: 64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              >
                Everyday people.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 pl-[0.5em]">
              <motion.em
                className="inline-block text-[0.6em] italic text-green-400"
                initial={{ y: 64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.39, ease: 'easeOut' }}
              >
                extraordinary federal contracts.
              </motion.em>
            </span>
          </h1>
          <Squiggle className="ml-[0.5em] mt-2 h-3 w-[240px] md:h-5 md:w-[380px]" />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <p className="max-w-xl text-[17px] leading-[1.7] text-slate-200">
              Every year, the federal government awards hundreds of billions in contracts —
              and everyday small businesses never get a shot, because nobody shows them how
              the system actually works. GovCon Giants closes that gap: free education,
              real playbooks, and a community that turns new businesses into federal
              contractors.
            </p>
            <div className="max-w-xl">
              {/* Word rotator — "Master" + cycling GovCon topic */}
              <p className="flex items-baseline gap-2.5 font-display text-[22px] font-bold tracking-normal text-white md:text-[26px]">
                Master
                <span className="relative inline-flex min-w-[230px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.em
                      key={ROTATING_TOPICS[topicIndex]}
                      className="inline-block italic text-green-400"
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {ROTATING_TOPICS[topicIndex]}
                    </motion.em>
                  </AnimatePresence>
                </span>
              </p>
              <NewsletterCapture variant="hero" dark className="mt-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators — bottom-right, click to jump */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 md:bottom-8 md:right-10">
        {HERO_PHOTOS.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Show photo ${i + 1} of ${HERO_PHOTOS.length}`}
            aria-pressed={i === slide}
            className={cn(
              'h-2 rounded-full transition-all duration-200 cursor-pointer',
              i === slide ? 'w-6 bg-green-400' : 'w-2 bg-white/40 hover:bg-white/70',
            )}
          />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Sponsor logos ------------------------------ */

const SPONSOR_LOGOS = [
  'athari',
  'cbf',
  'cypherintel',
  'deiner',
  'dts',
  'encore',
  'fob',
  'goh',
  'huihuliau',
  'kaiva',
  'mobilization',
  'pilieromazza',
  'procas',
  'sga',
  'swain',
  'xcorp',
];

/** Past summit sponsors & partners — seamless CSS logo marquee on the
 * light paper bg (pause on hover, logos lift to full opacity). */
function LogoMarquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {SPONSOR_LOGOS.map((name) => (
        <img
          key={name}
          src={`/logos/${name}.png`}
          alt=""
          loading="lazy"
          className="h-10 w-auto shrink-0 object-contain opacity-70 transition-opacity duration-200 hover:opacity-100 md:h-12"
        />
      ))}
    </div>
  );
  return (
    <section className="border-b border-line bg-base py-8 md:py-10" aria-label="Past summit sponsors and partners">
      <p className="mb-6 text-center font-sans text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        PAST SPONSORS &amp; PARTNERS
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Experience: 3 image tiles ----------------------- */

const experienceTiles: {
  title: string;
  desc: string;
  img: string;
  to: string;
  external?: boolean;
}[] = [
  {
    title: 'Listen to the Podcast',
    desc: '250K+ listens — near-daily plays and long-form interviews.',
    img: '/summit/moment-06.jpg',
    to: '/podcast',
  },
  {
    title: 'Attend the Summit',
    desc: 'The annual Contracting Connections + Technology Summit in Miami.',
    img: '/summit/candid-laugh.jpg',
    to: 'https://gcgsummit.com',
    external: true,
  },
  {
    title: 'Get the Playbook',
    desc: 'The exact federal websites behind $20M+ in government sales.',
    img: '/articles/playbook-tile.jpg',
    to: '/resources',
  },
];

/** Single experience tile — spring reveal + scroll-linked image parallax. */
function ExperienceTile({
  tile,
  index,
}: {
  tile: (typeof experienceTiles)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const inner = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-inset">
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
          <img
            src={tile.img}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-2xl font-bold tracking-normal text-slate-900 dark:text-white transition-colors group-hover:text-brand">
          {tile.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">{tile.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );
  const cls =
    'group block overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]';
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: index * 0.12 }}
    >
      {tile.external ? (
        <a href={tile.to} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link to={tile.to} className={cls}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

/** "Experience GovCon Giants" — three tall image tiles (Moth homepage §2):
 * podcast / summit / playbook, hairline borders, hover lift + green accent. */
function ExperienceTiles() {
  return (
    <section className="border-b border-line py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="PODCAST · EVENTS · EDUCATION"
          title={
            <>
              Experience <em>GovCon Giants</em>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {experienceTiles.map((tile, i) => (
            <ExperienceTile key={tile.title} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Popular articles --------------------------- */

const popularArticles = articles.filter((a) => !a.featured).slice(0, 4);
const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

function PopularArticles() {
  return (
    <section className="border-y border-line bg-raised py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="READER FAVORITES"
          title={
            <>
              Popular <em>articles</em>
            </>
          }
          linkTo="/blog"
          linkLabel="All articles"
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ArticleCard article={featuredArticle} />
          <ol className="flex flex-col divide-y divide-line">
            {popularArticles.map((article, i) => (
              <motion.li
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link to={`/blog/${article.slug}`} className="group flex items-start gap-5 py-5">
                  <span className="font-display text-3xl font-black text-line transition-colors group-hover:text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      {article.category} · {article.readTime} read
                    </span>
                    <span className="block font-display text-[20px] font-bold leading-snug tracking-normal text-slate-900 dark:text-white transition-colors group-hover:text-brand">
                      {article.title}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ----------------------------------- */

/** `/` — Moth homepage pattern: full-viewport slideshow hero with email
 * capture, sponsor logo marquee, featured episodes gallery, GCG National
 * Summit band, "Experience GovCon Giants" 3-tile strip, popular articles.
 * The footer already carries the newsletter band, so no extra CTA section. */
export default function Home() {
  useMeta(
    'GovCon Giants — Win Federal Contracts Like a Giant',
    'Eric Coffie teaches everyday people how to win extraordinary federal contracts — free podcast, guides, and the Billion Dollar Playbook.'
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Hero />
      <LogoMarquee />
      <FeaturedGallery linkTo="/podcast" linkLabel="All episodes" />
      <SummitSection />
      <ExperienceTiles />
      <PopularArticles />
    </motion.div>
  );
}
