import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, Asterisk } from 'lucide-react';
import NewsletterCapture from '@/components/NewsletterCapture';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import ArticleCard from '@/components/ArticleCard';
import GuestRow from '@/components/podcast/GuestRow';
import SummitSection from '@/components/SummitSection';
import { GhostLink } from '@/components/Buttons';
import { articles, latestArticles } from '@/data/articles';
import { featuredEpisodes } from '@/data/featuredEpisodes';

/* --------------------------------- Hero ---------------------------------- */

/** Green squiggle underline flourish (Moth signature), draws in on load. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" fill="none" aria-hidden className={className}>
      <motion.path
        d="M4 9 C 40 2, 80 12, 118 7 C 150 3, 190 10, 216 6"
        stroke="#16A34A"
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

  /* Portrait pointer parallax — ±6px / ±2deg springs, desktop (fine pointer) only */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const imgR = useTransform(sx, [-0.5, 0.5], [-2, 2]);
  const frameX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const frameY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onPortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPortraitLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="-mt-[72px] overflow-hidden border-b border-line bg-inset">
      <div className="container-gg grid items-center gap-12 pb-16 pt-[136px] md:pb-24 md:pt-[168px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        {/* Copy — massive staggered Montserrat headline (Moth-style) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="kicker mb-6">GOVERNMENT CONTRACTING, WITHOUT THE FLUFF</p>
          <h1 className="font-display text-[44px] font-black uppercase leading-[0.95] tracking-tight text-slate-900 md:text-[72px] lg:text-[84px]">
            {['Everyday', 'People.'].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-1" style={{ paddingLeft: `${i * 0.5}em` }}>
                <motion.span
                  className="inline-block"
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2 pl-[1em]">
              <motion.em
                className="inline-block text-[0.62em] normal-case italic text-brand"
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.39, ease: 'easeOut' }}
              >
                extraordinary federal contracts.
              </motion.em>
            </span>
          </h1>
          <Squiggle className="ml-[1em] mt-1 h-3 w-[220px] md:h-4 md:w-[320px]" />
          <p className="mt-7 max-w-xl text-[17px] leading-[1.7] text-slate-600">
            Eric Coffie built Evankoff Construction from zero to $20M+ in government sales —
            and now teaches everyday people to do the same. Get the free Billion Dollar
            Playbook starter kit: five of the 72 federal websites Eric uses to find buyers,
            partners, and contracts.
          </p>
          {/* Word rotator — "Master" + cycling GovCon topic */}
          <p className="mt-6 flex items-baseline gap-2.5 font-display text-[22px] font-extrabold tracking-tight text-slate-900 md:text-[26px]">
            Master
            <span className="relative inline-flex min-w-[230px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.em
                  key={ROTATING_TOPICS[topicIndex]}
                  className="inline-block italic text-brand"
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
          <NewsletterCapture variant="hero" className="mt-8 max-w-xl" />
        </motion.div>

        {/* Portrait — offset green frame behind, playful tilt + pointer parallax */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
          onMouseMove={onPortraitMove}
          onMouseLeave={onPortraitLeave}
        >
          <motion.div style={{ x: imgX, y: imgY, rotate: imgR }} className="relative">
            <motion.div
              aria-hidden
              style={{ x: frameX, y: frameY }}
              className="absolute inset-0 -rotate-2 rounded-xl border-2 border-brand"
            />
            <img
              src="/eric-portrait.png"
              alt="Eric Coffie, founder and host of GovCon Giants"
              className="relative w-full rotate-1 rounded-xl border border-line object-cover shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
            />
          </motion.div>
          <p className="mt-4 text-center font-narrow text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Eric Coffie · Founder, GovCon Giants · Miami, FL
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Marquee ticker ---------------------------- */

const TICKER_ITEMS = [
  '250K+ LISTENS',
  'THE DAILY WINDUP',
  'NEAR-DAILY EPISODES',
  'FREE GUIDES',
  'GCG SUMMIT MIAMI',
];

/** Full-width infinite ticker band (CSS marquee keyframes, duplicated
 * content for a seamless wrap, pauses on hover). */
function Ticker() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 font-narrow text-lg font-semibold uppercase tracking-[0.2em] text-slate-600">
            {item}
          </span>
          <Asterisk className="h-4 w-4 shrink-0 text-brand" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b border-line bg-inset py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
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
    img: '/podcast-cover.png',
    to: '/podcast',
  },
  {
    title: 'Attend the Summit',
    desc: 'The annual Contracting Connections + Technology Summit in Miami.',
    img: '/about-timeline-flag.png',
    to: 'https://gcgsummit.com',
    external: true,
  },
  {
    title: 'Get the Playbook',
    desc: '72 websites for massive scaling in the federal marketplace.',
    img: '/book-playbook.png',
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
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-brand">
          {tile.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{tile.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-narrow text-sm font-semibold uppercase tracking-[0.14em] text-brand">
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

/* ---------------------------- Featured episodes --------------------------- */

function FeaturedStrip() {
  return (
    <section className="border-b border-line py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="CONVERSATIONS WITH GOVERNMENT INSIDERS"
          title={
            <>
              Featured <em>episodes</em>
            </>
          }
          linkTo="/podcast"
          linkLabel="All episodes"
        />
        <div className="border-t border-line">
          {featuredEpisodes.map((episode, i) => (
            <GuestRow key={episode.link} episode={episode} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Latest feed ------------------------------ */

function LatestFeed() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="FROM THE BLOG"
          title={
            <>
              The latest <em>articles</em>
            </>
          }
          linkTo="/blog"
          linkLabel="All articles"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles(3).map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
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
                    <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                      {article.category} · {article.readTime} read
                    </span>
                    <span className="block font-display text-[20px] font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand">
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

/* ------------------------------- About blurb ------------------------------ */

function AboutBlurb() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
            <span className="kicker">ABOUT ERIC COFFIE</span>
          </div>
          <h2 className="font-display text-[32px] font-black leading-[1.1] tracking-tight text-slate-900 md:text-[40px]">
            From zero to <em className="italic text-brand">$20M+</em> in government sales.
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.7] text-slate-600">
            Eric Coffie built Evankoff Construction from nothing into $20M+ in federal
            sales, helped build two 8(a) small businesses to millions in revenue, and won a
            $5M Air Force Base contract that funded this platform. Since starting the GovCon
            Giants YouTube channel in 2017, his mission has been simple: teach everyday
            people how to win extraordinary federal contracts — and give away 99.9% of it
            for free.
          </p>
          <GhostLink to="/about" className="mt-6">
            Read Eric's full story
          </GhostLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-8 rounded-xl border border-line bg-raised p-8 sm:grid-cols-3 md:p-10"
        >
          <StatCounter value={20} prefix="$" suffix="M+" label="Government sales built" />
          <StatCounter value={250} suffix="K+" label="Podcast listens" />
          <StatCounter value={72} label="Websites in the Playbook" />
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ----------------------------------- */

/** `/` — Moth homepage pattern: typographic hero with email capture,
 * "Experience GovCon Giants" 3-tile strip, featured episodes as wide rows,
 * GCG National Summit band, latest + popular articles, about blurb.
 * The footer already carries the newsletter band, so no extra CTA section. */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Hero />
      <Ticker />
      <ExperienceTiles />
      <FeaturedStrip />
      <SummitSection />
      <LatestFeed />
      <PopularArticles />
      <AboutBlurb />
    </motion.div>
  );
}
