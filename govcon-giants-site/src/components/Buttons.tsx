import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Primary: green solid CTA. */
export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        'bg-brand px-7 py-3.5 text-[15px] text-brand-ink hover:bg-brand-hover hover:-translate-y-px active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Secondary: transparent with hairline border. */
export function SecondaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        'border border-line bg-transparent px-7 py-3.5 text-[15px] text-slate-900 hover:border-brand hover:text-brand',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface GhostLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  external?: boolean;
}

/** Ghost link: green text + arrow that nudges on hover. */
export function GhostLink({ to, children, external, className, ...props }: GhostLinkProps) {
  const cls = cn(
    'group inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand underline-offset-4 transition-colors hover:underline',
    className,
  );
  const arrow = (
    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
  );
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...props}>
      {children}
      {arrow}
    </Link>
  );
}
