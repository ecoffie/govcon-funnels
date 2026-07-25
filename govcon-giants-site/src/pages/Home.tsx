import { motion } from 'framer-motion';
import { Link } from 'react-router';
import NewsletterCapture from '@/components/NewsletterCapture';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import ArticleCard from '@/components/ArticleCard';
import GuestCard from '@/components/podcast/GuestCard';
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

function Hero() {
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
            {['Win', 'extraordinary'].map((word, i) => (
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
                className="inline-block normal-case italic text-brand"
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.39, ease: 'easeOut' }}
              >
                federal contracts.
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
          <NewsletterCapture variant="hero" className="mt-8 max-w-xl" />
        </motion.div>

        {/* Portrait — offset green frame behind, playful tilt */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute inset-0 -rotate-2 rounded-xl border-2 border-brand"
          />
          <img
            src="/eric-portrait.png"
            alt="Eric Coffie, founder and host of GovCon Giants"
            className="relative w-full rotate-1 rounded-xl border border-line object-cover shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
          />
          <p className="mt-4 text-center font-narrow text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Eric Coffie · Founder, GovCon Giants · Miami, FL
          </p>
        </motion.div>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEpisodes.map((episode, i) => (
            <GuestCard key={episode.link} episode={episode} index={i} />
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

/** `/` — full-bleed hero with email capture, featured guest episodes,
 * GCG National Summit band, latest + popular articles, podcast listen-on
 * strip, about blurb.
 * The footer already carries the newsletter band, so no extra CTA section. */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Hero />
      <FeaturedStrip />
      <SummitSection />
      <LatestFeed />
      <PopularArticles />
      <AboutBlurb />
    </motion.div>
  );
}
