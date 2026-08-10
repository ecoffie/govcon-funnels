import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { NewsletterModal } from '@/components/NewsletterCapture';
import { getTheme, toggleTheme } from '@/lib/theme';
import type { Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const links: { to: string; label: string; external?: boolean }[] = [
  { to: '/podcast', label: 'Podcast' },
  { to: '/blog', label: 'Blog' },
  { to: 'https://gcgsummit.com', label: 'Summit', external: true },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

/**
 * Fixed 72px navbar (design.md §6.1): shrinks to 56px and gains shadow after
 * 400px scroll, hides on scroll down, reappears on scroll up. Layout owns
 * the matching pt-[72px] offset for page content.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getTheme());

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 400);
      if (y > 400 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !drawerOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-[70] border-b border-line bg-base/85 backdrop-blur-[12px] transition-[height,box-shadow] duration-300',
          scrolled ? 'h-14 shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : 'h-[72px]',
        )}
      >
        <div className="container-gg flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label="GovCon Giants home" className="shrink-0">
            <span className="font-display text-[22px] font-black tracking-normal">
              <span className="text-slate-900 dark:text-white">GovCon</span> <span className="text-brand">Giants</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.to}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-1 font-sans text-lg font-semibold uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400 transition-colors duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-200 hover:text-slate-900 dark:hover:text-white hover:after:scale-x-100"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      'relative font-sans text-lg font-semibold uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400 transition-colors duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-200 hover:text-slate-900 dark:hover:text-white hover:after:scale-x-100',
                      isActive && 'text-brand after:scale-x-100',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(toggleTheme())}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white cursor-pointer dark:text-slate-400 dark:hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink transition-all duration-150 hover:bg-brand-hover hover:-translate-y-px active:scale-[0.98] cursor-pointer sm:inline-flex"
            >
              Free Playbook
            </button>
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white cursor-pointer lg:hidden"
            >
              {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-base/98 px-8 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: 'easeOut' }}
                >
                  {l.external ? (
                    <a
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDrawerOpen(false)}
                      className="inline-flex items-center gap-2 font-display text-[32px] font-black tracking-normal text-slate-900 dark:text-white transition-colors hover:text-brand"
                    >
                      {l.label}
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  ) : (
                    <NavLink
                      to={l.to}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'font-display text-[32px] font-black tracking-normal text-slate-900 dark:text-white transition-colors hover:text-brand',
                          isActive && 'text-brand',
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * (links.length + 1), duration: 0.35 }}
                className="mt-4 flex items-center gap-4"
              >
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setModalOpen(true);
                  }}
                  className="inline-flex w-fit rounded-lg bg-brand px-6 py-3 text-base font-semibold text-brand-ink cursor-pointer"
                >
                  Free Playbook
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(toggleTheme())}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-pressed={theme === 'dark'}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-3 font-sans text-base font-semibold uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300 cursor-pointer dark:text-slate-300"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <NewsletterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
