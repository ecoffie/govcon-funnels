import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface Book {
  title: string;
  subtitle: string;
  blurb: string;
  cover: string;
  link: string;
}

const books: Book[] = [
  {
    title: 'Billion Dollar Playbook',
    subtitle: '72 Websites for Massive Scaling in the Federal Marketplace',
    blurb:
      "Eric's field manual of 72 federal websites — registration sites, small business programs, buying vehicles, grants, and more — what each one is and how to use it.",
    cover: '/books/billion-dollar-playbook.png',
    link: 'https://ericcoffie.com/products/govcon-billion-dollar-playbook-72-websites-for-massive-scaling-in-the-marketplace',
  },
  {
    title: 'Govcon Launch',
    subtitle: 'A Complete Guide to Launching Your Government Contracting Business',
    blurb:
      'The complete startup guide: turning false narratives about government contracting into your greatest allies. Available as audiobook.',
    cover: '/books/govcon-launch.jpg',
    link: 'https://www.audible.com/pd/Govcon-Launch-Audiobook/B08ZSY5C6C',
  },
];

/**
 * "Books by Eric Coffie" (resources, after BookFeature): two large book
 * cards — cover on a pedestal panel left (BookFeature aesthetic), title +
 * subtitle + blurb + external buy link right.
 */
export default function BookshelfSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="FROM ERIC'S BOOKSHELF"
          title={
            <>
              Books by <em>Eric Coffie</em>
            </>
          }
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {books.map((book, i) => (
            <motion.article
              key={book.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.12 }}
              className="group grid overflow-hidden rounded-xl border border-line bg-raised transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:grid-cols-[200px_1fr]"
            >
              {/* Cover pedestal */}
              <div className="flex items-center justify-center bg-inset p-8">
                <img
                  src={book.cover}
                  alt={`${book.title} book cover`}
                  loading="lazy"
                  className="w-full max-w-[160px] -rotate-2 rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:rotate-0"
                />
              </div>
              {/* Copy + link */}
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold leading-[1.2] tracking-normal text-slate-900 dark:text-white">
                  {book.title}
                </h3>
                <p className="mt-1 font-display text-[15px] italic leading-snug text-brand">
                  {book.subtitle}
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-slate-500 dark:text-slate-400">
                  {book.blurb}
                </p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-line bg-transparent px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all duration-150 hover:border-brand hover:text-brand dark:text-white"
                >
                  Get the book
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
