import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'hero' | 'compact' | 'modal';

interface NewsletterCaptureProps {
  variant?: Variant;
  /** Heading for the compact/band variant. */
  heading?: string;
  /** Kicker shown above the compact heading. */
  kicker?: string;
  /** Dark-background styling for the hero variant (photo slideshow hero). */
  dark?: boolean;
  className?: string;
}

function useSignup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const list = JSON.parse(localStorage.getItem('gg-signups') ?? '[]') as string[];
      list.push(email.trim());
      localStorage.setItem('gg-signups', JSON.stringify(list));
    } catch {
      /* storage unavailable — still show success */
    }
    setDone(true);
  };
  return { email, setEmail, done, submit };
}

const inputCls =
  'h-12 w-full rounded-lg border border-line bg-raised px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-500 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40';
const inputDarkCls =
  'h-12 w-full rounded-lg border border-white/40 bg-white/10 px-4 text-[15px] text-white placeholder:text-white/50 backdrop-blur-sm transition-colors focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/40';
const btnCls =
  'group inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand px-6 text-[15px] font-semibold text-brand-ink transition-all duration-150 hover:bg-brand-hover hover:-translate-y-px active:scale-[0.98] cursor-pointer';

function SuccessNote({ className }: { className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-center gap-2 text-[15px] font-medium text-brand', className)}
    >
      <CheckCircle2 className="h-5 w-5" />
      Check your inbox. The Playbook is on its way.
    </motion.p>
  );
}

function InlineForm({ buttonLabel, dark }: { buttonLabel: string; dark?: boolean }) {
  const { email, setEmail, done, submit } = useSignup();
  if (done) return <SuccessNote className={cn('h-12', dark && 'text-green-400')} />;
  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
        className={dark ? inputDarkCls : inputCls}
      />
      <button type="submit" className={btnCls}>
        {buttonLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

/**
 * Reusable email capture in three variants (design.md §6.3):
 * hero — single-line form + helper line; compact — panel with green left
 * border for footer/CTA bands; modal — centered card with book cover.
 */
export default function NewsletterCapture({
  variant = 'hero',
  heading = 'Get new episodes & guides first.',
  kicker = 'FREE · NO SPAM · UNSUBSCRIBE ANYTIME',
  dark,
  className,
}: NewsletterCaptureProps) {
  if (variant === 'hero') {
    return (
      <div className={cn('w-full', className)}>
        <InlineForm buttonLabel="Send Me the Starter Kit" dark={dark} />
        <p
          className={cn(
            'mt-3 font-mono text-[11px] tracking-[0.14em]',
            dark ? 'text-white/60' : 'text-slate-500 dark:text-slate-400',
          )}
        >
          FREE · NO SPAM · UNSUBSCRIBE ANYTIME
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'rounded-xl border border-line border-l-4 border-l-brand bg-raised p-6 md:p-8',
          className,
        )}
      >
        <p className="kicker mb-2">{kicker}</p>
        <h3 className="mb-5 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{heading}</h3>
        <InlineForm buttonLabel="Send Me the Starter Kit" />
      </div>
    );
  }

  // modal variant is rendered via NewsletterModal below
  return null;
}

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

/** Modal variant — triggered by the navbar "Free Playbook" CTA. */
export function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const { email, setEmail, done, submit } = useSignup();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Free Playbook signup"
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
              <p className="kicker mb-2">FREE STARTER KIT</p>
              <h3 className="mb-2 font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                The Billion Dollar <em className="italic text-brand">Playbook</em>
              </h3>
              <p className="mb-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                Five of the 72 federal websites Eric uses to find buyers, partners, and
                contracts — delivered instantly, free.
              </p>
              {done ? (
                <SuccessNote />
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
                    className={inputCls}
                  />
                  <button type="submit" className={btnCls}>
                    Send Me the Starter Kit
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
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
