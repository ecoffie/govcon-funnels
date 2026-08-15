import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Book {
  title: string;
  subtitle: string;
  blurb: string;
  cover: string;
  href: string;
  cta: string;
}

/**
 * Books by Eric Coffie (resources.md). Both published titles with their real
 * covers as thumbnails, each linking out to where the book is sold.
 */
const books: Book[] = [
  {
    title: 'Billion Dollar Playbook',
    subtitle: '72 Websites for Massive Scaling in the Federal Marketplace',
    blurb:
      'The exact 72 federal websites Eric uses to find buyers, partners, and contracts — the same ones behind $20M+ in government sales.',
    cover: '/book-playbook.png',
    href: 'https://www.amazon.com/dp/B08NF1NPZQ',
    cta: 'Get the book',
  },
  {
    title: 'Govcon Launch',
    subtitle: 'A Complete Guide to Launching Your Government Contracting Business',
    blurb:
      'A start-to-finish guide to standing up your GovCon business the right way — registration, positioning, and your first pursuits.',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5e/85/3b/5e853b0f-a88b-06ec-41a1-73f1f4a614ef/rm_image.jpg/600x600bb.jpg',
    href: 'https://books.apple.com/us/audiobook/govcon-launch-a-complete-guide-to-launching-your/id1560012868',
    cta: 'Listen on Apple',
  },
];

export default function BooksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader kicker="BOOKS" title={<>Books by <em>Eric Coffie</em></>} />
        <div className="grid gap-6 sm:grid-cols-2">
          {books.map((book, i) => (
            <motion.a
              key={book.title}
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="group flex gap-5 rounded-xl border border-line bg-raised p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <img
                src={book.cover}
                alt={`${book.title} — book cover`}
                loading="lazy"
                className="h-36 w-24 shrink-0 rounded-md object-cover shadow-[0_12px_30px_rgba(0,0,0,0.2)] sm:h-40 sm:w-28"
              />
              <div className="flex flex-col">
                <h3 className="font-display text-xl font-bold leading-[1.2] tracking-normal text-slate-900 dark:text-white transition-colors group-hover:text-brand">
                  {book.title}
                </h3>
                <p className="mt-1 text-[13px] font-medium leading-snug text-slate-500 dark:text-slate-400">
                  {book.subtitle}
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {book.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-semibold text-brand">
                  {book.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
