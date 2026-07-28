import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import type { Guide } from '@/components/resources/guides';
import { useSignup } from '@/lib/useSignup';

interface GuideSignupModalProps {
  /** The guide being requested — null means closed. */
  guide: Guide | null;
  onClose: () => void;
}

/**
 * Page-specific sibling of the shared NewsletterModal. Posts to the main-site
 * lead API (source=podcast-site + per-guide tag) and shows an instant-access
 * link on success — there is no email automation for these guides.
 */
export default function GuideSignupModal({ guide, onClose }: GuideSignupModalProps) {
  const { email, setEmail, done, submit, reset } = useSignup(guide ? ['guide-' + guide.slug] : []);
  const open = guide !== null;

  useEffect(() => {
    if (!open) return;
    reset();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, guide]);

  return (
    <AnimatePresence>
      {open && guide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Get ${guide.title}`}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-2xl overflow-hidden rounded-xl border border-line bg-raised shadow-2xl md:grid-cols-[240px_1fr]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-500 dark:text-slate-400 transition-colors hover:bg-line hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="hidden items-center justify-center bg-inset p-6 md:flex">
              <img
                src="/book-playbook.png"
                alt="Billion Dollar Playbook book cover"
                className="w-full -rotate-6 rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                loading="lazy"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="kicker mb-2">FREE GUIDE</p>
              <h3 className="mb-2 font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {guide.title}
              </h3>
              <p className="mb-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {guide.modalCopy}
              </p>
              {done ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[15px] font-medium text-brand"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>
                    You&apos;re in.{' '}
                    <a
                      href={guide.href}
                      className="underline underline-offset-4 hover:text-slate-900"
                    >
                      Open {guide.title} now →
                    </a>
                  </span>
                </motion.p>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email address"
                    className="h-12 w-full rounded-lg border border-line bg-raised px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-500 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand px-6 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:bg-brand-hover hover:-translate-y-px active:scale-[0.98] cursor-pointer"
                  >
                    Get Instant Access
                  </button>
                </form>
              )}
              <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-slate-500 dark:text-slate-400">
                FREE · NO SPAM · UNSUBSCRIBE ANYTIME
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
