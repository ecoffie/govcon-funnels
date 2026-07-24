import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router';
import ArticleCard from '@/components/ArticleCard';
import NewsletterCapture from '@/components/NewsletterCapture';
import { GhostLink } from '@/components/Buttons';
import { articleCategories, articles } from '@/data/articles';
import type { ArticleCategory } from '@/data/articles';
import { cn } from '@/lib/utils';

type Tab = 'All' | ArticleCategory;

const featured = articles.find((a) => a.featured) ?? articles[0];

/** Word-by-word headline reveal (design.md kinetic headlines).
 *  Words wrapped in *asterisks* render italic green. */
function SplitHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text.replace(/\*/g, '')}>
      {words.map((raw, i) => {
        const emphasized = raw.startsWith('*');
        const word = raw.replace(/\*/g, '');
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className={emphasized ? 'inline-block italic text-brand' : 'inline-block'}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: 'easeOut' }}
            >
              {word}
              {i < words.length - 1 ? '\u00a0' : ''}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

export default function Blog() {
  const [tab, setTab] = useState<Tab>('All');
  const filtered = tab === 'All' ? articles : articles.filter((a) => a.category === tab);
  const showFeatured = tab === 'All';

  const [featYear, featMonth] = featured.date.split('-');
  const featDate = new Date(Number(featYear), Number(featMonth) - 1)
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    .toUpperCase();

  return (
    <div className="bg-base">
      {/* ——— Section 1: Page header ——— */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(34,197,94,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/hero-blueprint.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)',
          }}
        />
        <div className="container-gg relative py-16 md:py-24">
          <div className="mb-5 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <span className="kicker">THE BLOG</span>
          </div>
          <SplitHeadline
            text="GovCon, explained in *plain *English."
            className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[56px]"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            Field-manual guides on SAM.gov, 8(a), proposals, teaming, and getting paid — no
            jargon, no fluff, no paywall.
          </motion.p>
        </div>
      </section>

      {/* ——— Section 2: Sticky category tabs ——— */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
        className="sticky top-[72px] z-40 border-b border-line bg-base/90 backdrop-blur-md"
      >
        <div className="container-gg">
          <div
            role="tablist"
            aria-label="Article categories"
            className="flex gap-6 overflow-x-auto md:gap-8"
          >
            {articleCategories.map((cat) => {
              const active = tab === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(cat)}
                  className={cn(
                    'relative cursor-pointer whitespace-nowrap py-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-150',
                    active ? 'text-brand' : 'text-slate-500 hover:text-white',
                  )}
                >
                  {cat}
                  {active && (
                    <motion.span
                      layoutId="blog-tab-underline"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ——— Section 3: Featured article (All tab only) ——— */}
      {showFeatured && (
        <section className="container-gg pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="group grid overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:grid-cols-[55%_45%]"
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="relative block aspect-video overflow-hidden md:aspect-auto md:min-h-[320px]"
              tabIndex={-1}
              aria-hidden
            >
              <motion.img
                src={featured.thumbnail}
                alt=""
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </Link>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="mb-4 inline-flex w-fit rounded-full bg-brand-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                Featured
              </span>
              <Link to={`/blog/${featured.slug}`}>
                <h2 className="mb-4 font-display text-2xl font-semibold leading-snug text-white transition-colors hover:text-brand md:text-[32px] md:leading-[1.2]">
                  {featured.title}
                </h2>
              </Link>
              <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-slate-400">
                {featured.excerpt}
              </p>
              <p className="mb-6 font-mono text-xs uppercase tracking-wider text-slate-500">
                {featDate} · {featured.readTime} read
              </p>
              <GhostLink to={`/blog/${featured.slug}`}>Read article</GhostLink>
            </div>
          </motion.div>
        </section>
      )}

      {/* ——— Section 4: Article grid ——— */}
      <section className="container-gg py-12 md:py-16">
        <motion.div layout="position" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => (
              <motion.div
                key={a.slug}
                layout="position"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, delay: i * 0.04 } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <ArticleCard article={a} index={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ——— Section 5: Newsletter band ——— */}
      <section className="container-gg pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <NewsletterCapture
            variant="compact"
            kicker="GET NEW ARTICLES FIRST"
            heading="One tactical GovCon guide in your inbox, every week."
          />
        </motion.div>
      </section>
    </div>
  );
}
