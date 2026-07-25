import { motion } from 'framer-motion';
import { Link } from 'react-router';
import type { Article } from '@/data/articles';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  index?: number;
  className?: string;
}

/** ArticleCard (design.md §6.5): 16:9 thumb with hover zoom, category chip,
 *  Montserrat title, 2-line excerpt, mono date + read time. */
export default function ArticleCard({ article, index = 0, className }: ArticleCardProps) {
  const [year, month] = article.date.split('-');
  const dateLabel = new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: index * 0.12 }}
      className={cn('h-full', className)}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-brand backdrop-blur">
            {article.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 font-display text-[22px] font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand">
            {article.title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
            {article.excerpt}
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            {dateLabel} · {article.readTime} read
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
