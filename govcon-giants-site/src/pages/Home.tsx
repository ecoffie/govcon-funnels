import { motion } from 'framer-motion';
import { Link } from 'react-router';
import NewsletterCapture from '@/components/NewsletterCapture';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import ArticleCard from '@/components/ArticleCard';
import EpisodeCard from '@/components/EpisodeCard';
import { GhostLink } from '@/components/Buttons';
import { articles, latestArticles } from '@/data/articles';
import { latestEpisodes } from '@/lib/episode-utils';
import { platforms } from '@/data/platforms';
import { useMeta } from '@/lib/useMeta';

/* --------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="-mt-[72px] border-b border-line bg-inset">
      <div className="container-gg grid items-center gap-12 pb-16 pt-[136px] md:pb-24 md:pt-[168px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <img
            src="/eric-portrait.png"
            alt="Eric Coffie, founder and host of GovCon Giants"
            className="w-full rounded-xl border border-line object-cover shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
          />
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            Eric Coffie · Founder, GovCon Giants · Miami, FL
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <p className="kicker mb-4">GOVERNMENT CONTRACTING, WITHOUT THE FLUFF</p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[56px]">
            Win extraordinary <em className="italic text-brand">federal contracts</em>.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-slate-300">
            Eric Coffie built Evankoff Construction from zero to $20M+ in government sales —
            and now teaches everyday people to do the same. Get the free Billion Dollar
            Playbook starter kit: five of the 72 federal websites Eric uses to find buyers,
            partners, and contracts.
          </p>
          <NewsletterCapture variant="hero" className="mt-8 max-w-xl" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Podcast strip ---------------------------- */

const listenPlatforms = platforms.filter((p) =>
  ['Apple Podcasts', 'Spotify', 'YouTube'].includes(p.name),
);

function PodcastStrip() {
  return (
    <section className="border-b border-line bg-raised py-16 md:py-24">
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
            <span className="kicker">THE PODCAST</span>
          </div>
          <h2 className="font-display text-[32px] font-bold leading-[1.15] text-white md:text-[40px]">
            The GovCon Giants <em className="italic text-brand">Podcast</em>
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-[1.7] text-slate-300">
            250K+ listens and counting. Near-daily episodes — The Daily Windup short-form
            plays plus long-form interviews — on RFPs, SAM.gov, 8(a), subcontracting, CMMC,
            and everything between.
          </p>
          <GhostLink to="/podcast" className="mt-6">
            Browse the full archive
          </GhostLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col gap-3"
        >
          {listenPlatforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-line bg-base px-5 py-4 transition-all duration-150 hover:-translate-y-px hover:border-brand"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-brand-ink">
                <p.icon className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  Listen on
                </span>
                <span className="block text-[17px] font-semibold text-white transition-colors group-hover:text-brand">
                  {p.name}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
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
          kicker="NEW THIS WEEK"
          title={
            <>
              The latest <em>episodes</em>
            </>
          }
          linkTo="/podcast"
          linkLabel="All episodes"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {latestEpisodes(3).map((episode, i) => (
            <EpisodeCard key={episode.link} episode={episode} index={i} />
          ))}
        </div>

        <SectionHeader
          kicker="FROM THE BLOG"
          title={
            <>
              The latest <em>articles</em>
            </>
          }
          linkTo="/blog"
          linkLabel="All articles"
          className="mt-16 md:mt-20"
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
                  <span className="font-display text-3xl font-bold text-line transition-colors group-hover:text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                      {article.category} · {article.readTime} read
                    </span>
                    <span className="block font-display text-[20px] font-semibold leading-snug text-white transition-colors group-hover:text-brand">
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
          <h2 className="font-display text-[32px] font-bold leading-[1.15] text-white md:text-[40px]">
            From zero to <em className="italic text-brand">$20M+</em> in government sales.
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.7] text-slate-300">
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

/** `/` — mirrors tim.blog (home.md): full-bleed hero with email capture,
 * podcast strip, latest episodes + articles, popular articles, about blurb.
 * The footer already carries the newsletter band, so no extra CTA section. */
export default function Home() {
  useMeta({ title: 'GovCon Giants Podcast — Federal Contracting in Plain English | Eric Coffie', description: 'The GovCon Giants Podcast with Eric Coffie: 334+ episodes on winning federal contracts — RFPs, SAM.gov, 8(a), subcontracting, CMMC — in plain English. New episodes near-daily.', canonicalPath: '/' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Hero />
      <PodcastStrip />
      <LatestFeed />
      <PopularArticles />
      <AboutBlurb />
    </motion.div>
  );
}
