import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check, Link2, Linkedin, Twitter } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import NewsletterCapture from '@/components/NewsletterCapture';
import SectionHeader from '@/components/SectionHeader';
import { articles } from '@/data/articles';
import type { Article } from '@/data/articles';
import { getArticleBody } from '@/data/articleBodies';
import type { ArticleBlock } from '@/data/articleBodies';

/** Slugify an H2 for anchor links. */
function anchorId(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `s${index}-${base}`;
}

function formatDate(iso: string): string {
  const [year, month] = iso.split('-');
  return new Date(Number(year), Number(month) - 1)
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    .toUpperCase();
}

/** Fixed 2px green scroll-progress bar, above the navbar. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-brand"
    />
  );
}

/** Share row: X, LinkedIn, copy-link with "Copied" tooltip. */
function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const iconCls =
    'cursor-pointer text-slate-500 transition-colors duration-150 hover:text-brand';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <Twitter className={iconCls} size={20} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className={iconCls} size={20} />
      </a>
      <button onClick={copy} aria-label="Copy article link" className="relative">
        <Link2 className={iconCls} size={20} />
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-brand"
          >
            Copied
          </motion.span>
        )}
      </button>
    </div>
  );
}

/** Lead paragraph with green Montserrat drop cap. */
function LeadParagraph({ text }: { text: string }) {
  return (
    <p className="text-[21px] leading-[1.75] text-paper-ink">
      <span
        aria-hidden
        className="float-left mr-2 mt-1 font-display text-[64px] font-black leading-[0.85] text-brand"
      >
        {text.charAt(0)}
      </span>
      {text.slice(1)}
    </p>
  );
}

const bodyReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: 'easeOut' },
} as const;

/** Renders one article body block on the paper surface. */
function BodyBlock({ block, h2Number }: { block: ArticleBlock; h2Number: number }) {
  switch (block.type) {
    case 'lead':
      return (
        <motion.div {...bodyReveal}>
          <LeadParagraph text={block.text} />
        </motion.div>
      );
    case 'p':
      return (
        <motion.p {...bodyReveal} className="text-lg leading-[1.8] text-paper-ink">
          {block.text}
        </motion.p>
      );
    case 'h2': {
      const id = anchorId(block.text, h2Number);
      return (
        <motion.h2
          {...bodyReveal}
          id={id}
          className="group mt-16 scroll-mt-28 font-display text-[30px] font-extrabold leading-[1.2] tracking-tight text-paper-ink"
        >
          <span className="mr-3 font-mono text-lg font-medium text-brand">
            {String(h2Number).padStart(2, '0')} —
          </span>
          {block.text}
          <a
            href={`#${id}`}
            aria-label={`Link to section: ${block.text}`}
            className="ml-2 inline-block align-middle font-mono text-lg text-brand opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          >
            #
          </a>
        </motion.h2>
      );
    }
    case 'h3':
      return (
        <motion.h3
          {...bodyReveal}
          className="mt-10 text-xl font-bold leading-snug text-paper-ink"
        >
          {block.text}
        </motion.h3>
      );
    case 'quote':
      return (
        <motion.blockquote
          {...bodyReveal}
          className="border-l-[3px] border-brand pl-6 font-display text-[22px] italic leading-[1.5] text-slate-700"
        >
          {block.text}
        </motion.blockquote>
      );
    case 'list':
      return (
        <motion.ul {...bodyReveal} className="space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-lg leading-[1.75] text-paper-ink">
              <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 bg-brand" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      );
    case 'callout':
      return (
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-r-lg border-l-2 border-brand bg-[#EEF7F0] p-5 md:p-6"
        >
          <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-hover">
            Field note
          </p>
          <p className="text-[15px] leading-[1.7] text-paper-ink">{block.text}</p>
        </motion.aside>
      );
    case 'takeaways':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-xl bg-base p-6 md:p-8"
        >
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Key takeaways
          </p>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      );
    default:
      return null;
  }
}

function relatedArticles(current: Article): Article[] {
  const others = articles.filter((a) => a.slug !== current.slug);
  const sameCat = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...sameCat, ...rest].slice(0, 3);
}

export default function BlogPost() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-gg py-24 text-center">
        <h1 className="mb-4 font-display text-4xl font-black text-slate-900">Article not found</h1>
        <Link to="/blog" className="font-semibold text-brand hover:underline">
          ← Back to the blog
        </Link>
      </div>
    );
  }

  const body = getArticleBody(article.slug) ?? [];
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? articles[idx - 1] : undefined;
  const next = idx < articles.length - 1 ? articles[idx + 1] : undefined;
  let h2Count = 0;

  return (
    <div className="bg-base">
      <ScrollProgress />

      {/* ——— Section 1: Article hero (dark) ——— */}
      <section className="mx-auto w-full max-w-[720px] px-6 pt-20 text-center md:pt-24">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-block rounded-full bg-brand-soft px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand"
        >
          {article.category}
        </motion.span>
        <h1 className="mt-6 font-display text-4xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
          {article.title.split(' ').map((word, i, arr) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: 'easeOut' }}
              >
                {word}
                {i < arr.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 font-mono text-[13px] uppercase tracking-[0.14em] text-slate-500"
        >
          Eric Coffie · {formatDate(article.date)} · {article.readTime} read
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-6"
        >
          <ShareRow title={article.title} />
        </motion.div>
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-10"
        >
          <img
            src={article.thumbnail}
            alt=""
            className="aspect-video w-full rounded-xl border border-line object-cover"
          />
        </motion.div>
      </section>

      {/* ——— Section 2: Article body (paper) ——— */}
      <div
        aria-hidden
        className="mt-16 h-20"
        style={{ background: 'linear-gradient(to bottom, #FAFAF8, #FAF8F4)' }}
      />
      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[680px] space-y-7 px-6 py-16 md:py-20">
          {body.map((block, i) => {
            if (block.type === 'h2') h2Count += 1;
            return <BodyBlock key={i} block={block} h2Number={h2Count} />;
          })}
        </div>

        {/* ——— Section 3: Author box (paper) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[680px] px-6 pb-20"
        >
          <div className="flex flex-col gap-5 border-t border-[#DDD6C9] pt-8 sm:flex-row sm:items-start">
            <img
              src="/eric-portrait.png"
              alt="Eric Coffie"
              className="h-[72px] w-[72px] shrink-0 rounded-full border-2 border-brand object-cover object-top"
            />
            <div>
              <p className="text-base font-bold text-paper-ink">Eric Coffie</p>
              <p className="mb-3 mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Founder, GovCon Giants
              </p>
              <p className="text-[15px] leading-[1.7] text-slate-600">
                Eric has helped small businesses win billions in federal contracts through the
                GovCon Giants Podcast, ScoreGov, and the Billion Dollar Playbook. He teaches
                GovCon the way he learned it: in the field, with real bids and real money on the
                line.
              </p>
              <Link
                to="/about"
                className="mt-3 inline-block text-[15px] font-semibold text-brand-hover underline-offset-4 transition-colors hover:underline"
              >
                More about Eric →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ——— Section 4: Article footer CTA (dark) ——— */}
      <div
        aria-hidden
        className="h-20"
        style={{ background: 'linear-gradient(to bottom, #FAF8F4, #FAFAF8)' }}
      />
      <section className="bg-base">
        <div className="container-gg py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-8"
          >
            <motion.img
              src="/book-playbook.png"
              alt="Billion Dollar Playbook book cover"
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: -6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden w-[120px] shrink-0 rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.25)] md:block"
            />
            <div className="max-w-2xl flex-1">
              <h3 className="mb-6 font-display text-[28px] font-extrabold leading-snug tracking-tight text-slate-900">
                Want the 72 websites this article is <em className="italic text-brand">based on</em>?
              </h3>
              <NewsletterCapture
                variant="compact"
                kicker="FREE STARTER KIT"
                heading="Get the Billion Dollar Playbook starter kit in your inbox."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— Section 5: Related articles (dark) ——— */}
      <section className="border-t border-line bg-base">
        <div className="container-gg py-16 md:py-20">
          <SectionHeader
            kicker="KEEP READING"
            title={
              <>
                Related <em>articles</em>
              </>
            }
            linkTo="/blog"
            linkLabel="All articles"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles(article).map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>

          {/* Prev / Next nav */}
          <div className="mt-14 flex items-start justify-between gap-6 border-t border-line pt-8">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="group max-w-[45%]">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-brand">
                  ← Prev
                </p>
                <p className="text-[15px] font-semibold leading-snug text-slate-600 transition-colors group-hover:text-slate-900">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="group max-w-[45%] text-right">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-brand">
                  Next →
                </p>
                <p className="text-[15px] font-semibold leading-snug text-slate-600 transition-colors group-hover:text-slate-900">
                  {next.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
