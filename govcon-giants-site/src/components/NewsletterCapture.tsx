import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { GHL_WEBHOOK_URL } from '@/lib/config';
import { cn } from '@/lib/utils';

type Variant = 'hero' | 'compact' | 'modal';
type SignupStatus = 'idle' | 'submitting' | 'done' | 'error';

interface NewsletterCaptureProps {
  /** CTA button text — defaults to "Join the Newsletter" */
  buttonLabel?: string;
  variant?: Variant;
  /** Heading for the compact/band variant. */
  heading?: string;
  /** Kicker shown above the compact heading. */
  kicker?: string;
  /** Dark-background styling for the hero variant (photo slideshow hero). */
  dark?: boolean;
  className?: string;
}

/**
 * Newsletter signup: POSTs the email to the GoHighLevel inbound webhook
 * (src/lib/config.ts). Until the real URL is pasted there, falls back to
 * the original localStorage behavior so the form never breaks in preview.
 */
function useSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === 'submitting') return;

    if (GHL_WEBHOOK_URL === 'PASTE_GHL_WEBHOOK_URL_HERE') {
      try {
        const list = JSON.parse(localStorage.getItem('gg-signups') ?? '[]') as string[];
        list.push(value);
        localStorage.setItem('gg-signups', JSON.stringify(list));
      } catch {
        /* storage unavailable — still show success */
      }
      setStatus('done');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'newsletter' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('done');
    } catch {
      setStatus('error'); // email stays in the input for retry
    }
  };

  return { email, setEmail, status, submit };
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
      You&apos;re on the list — check your inbox for a confirmation email.
    </motion.p>
  );
}

/** Submit button content: spinner + "Joining…" while submitting. */
function SubmitLabel({ label, submitting }: { label: string; submitting: boolean }) {
  if (submitting) {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        Joining…
      </>
    );
  }
  return (
    <>
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
    </>
  );
}

function InlineForm({ buttonLabel, dark }: { buttonLabel: string; dark?: boolean }) {
  const { email, setEmail, status, submit } = useSignup();
  if (status === 'done') return <SuccessNote className={cn('h-12', dark && 'text-green-400')} />;
  const submitting = status === 'submitting';
  return (
    <div>
      <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          disabled={submitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className={cn(dark ? inputDarkCls : inputCls, submitting && 'opacity-70')}
        />
        <button
          type="submit"
          disabled={submitting}
          className={cn(btnCls, submitting && 'cursor-wait opacity-80')}
        >
          <SubmitLabel label={buttonLabel} submitting={submitting} />
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-sm font-medium text-red-500">
          Something went wrong — try again.
        </p>
      )}
    </div>
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
  buttonLabel = 'Join the Newsletter',
  dark,
  className,
}: NewsletterCaptureProps) {
  if (variant === 'hero') {
    return (
      <div className={cn('w-full', className)}>
        <InlineForm buttonLabel="Join the Newsletter" dark={dark} />
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
        <h3 className="mb-5 font-display text-2xl font-bold tracking-normal text-slate-900 dark:text-white">{heading}</h3>
        <InlineForm buttonLabel={buttonLabel} />
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

/** Modal variant — triggered by the navbar "Free Newsletter" CTA. */
export function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const { email, setEmail, status, submit } = useSignup();
  const submitting = status === 'submitting';

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
          aria-label="Newsletter signup"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-raised shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-500 dark:text-slate-400 transition-colors hover:bg-line hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 md:p-8">
              <p className="kicker mb-2">FREE NEWSLETTER</p>
              <h3 className="mb-2 font-display text-2xl font-black tracking-normal text-slate-900 dark:text-white md:text-3xl">
                The GovCon Giants <em className="italic text-brand">Newsletter</em>
              </h3>
              <p className="mb-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                Weekly federal contracting tactics from Eric — new opportunities,
                buyer intel, and the exact plays behind $20M+ in government sales.
                Free, straight to your inbox.
              </p>
              {status === 'done' ? (
                <SuccessNote />
              ) : (
                <div>
                  <form onSubmit={submit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      autoFocus
                      disabled={submitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Email address"
                      className={cn(inputCls, submitting && 'opacity-70')}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className={cn(btnCls, submitting && 'cursor-wait opacity-80')}
                    >
                      <SubmitLabel label="Join the Newsletter" submitting={submitting} />
                    </button>
                  </form>
                  {status === 'error' && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      Something went wrong — try again.
                    </p>
                  )}
                </div>
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
