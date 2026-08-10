import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { platforms } from '@/data/platforms';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface DirectoryLink {
  label: string;
  to: string;
  external?: boolean;
}

interface DirectoryColumn {
  kicker: string;
  links: DirectoryLink[];
}

const listenLinks: DirectoryLink[] = platforms
  .filter((p) => p.name !== 'YouTube')
  .map((p) => ({ label: p.name, to: p.url, external: true }));

const columns: DirectoryColumn[] = [
  { kicker: 'LISTEN', links: listenLinks },
  {
    kicker: 'WATCH',
    links: [
      { label: 'YouTube — @ericcoffie', to: 'https://www.youtube.com/@ericcoffie', external: true },
    ],
  },
  {
    kicker: 'READ',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'About Eric', to: '/about' },
    ],
  },
];

function Row({ link }: { link: DirectoryLink }) {
  const content: ReactNode = (
    <>
      {link.label}
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 text-slate-600 dark:text-slate-300 transition-all duration-150 group-hover:translate-x-1 group-hover:text-brand"
        aria-hidden
      />
    </>
  );
  const cls =
    'group flex items-center gap-2 text-[15px] text-slate-600 dark:text-slate-300 transition-colors duration-150 hover:text-brand';
  if (link.external) {
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link to={link.to} className={cls}>
      {content}
    </Link>
  );
}

/**
 * Listen / Watch / Read directory (resources.md §4): three mono-kickered
 * link columns on a raised band; rows glow green with a sliding icon on hover.
 */
export default function DirectorySection() {
  return (
    <section className="border-y border-line bg-raised py-16 md:py-24">
      <div className="container-gg">
        <div className="grid gap-10 md:grid-cols-3">
          {columns.map((col, i) => (
            <motion.nav
              key={col.kicker}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              aria-label={col.kicker.toLowerCase()}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-6 bg-brand" aria-hidden />
                <h3 className="kicker">{col.kicker}</h3>
              </div>
              <ul className="space-y-3.5 border-t border-line pt-5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Row link={link} />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>
      </div>
    </section>
  );
}
