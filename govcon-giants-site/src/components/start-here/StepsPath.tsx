import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { GhostLink } from '@/components/Buttons';
import { episodes } from '@/data/episodes';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Step {
  n: string;
  title: string;
  body: string;
  ctaLabel: string;
  /** Internal route, external URL, or 'modal' to open the starter-kit modal. */
  to?: string;
  external?: boolean;
  modal?: boolean;
}

const sideDoor = episodes.find((e) => e.title.includes('Side Door'));

const steps: Step[] = [
  {
    n: '01',
    title: 'Get the Starter Kit',
    body: 'Five of the 72 websites from the Billion Dollar Playbook, free by email. This is your map.',
    ctaLabel: 'Send Me the Kit',
    modal: true,
  },
  {
    n: '02',
    title: 'Register on SAM.gov',
    body: "Your business doesn't exist to the federal government until this is done. Use the checklist, do it right the first time.",
    ctaLabel: 'Read the guide',
    to: '/blog/register-right-first-time',
  },
  {
    n: '03',
    title: 'Pick your NAICS & PSC codes',
    body: 'These codes decide which buyers can find you. Most beginners choose wrong.',
    ctaLabel: 'Learn how',
    to: '/blog/sam-gov-is-not-a-strategy',
  },
  {
    n: '04',
    title: 'Start with subcontracting',
    body: 'The side door: primes like Boeing and Lockheed need small businesses. Skip the line.',
    ctaLabel: 'Hear the strategy',
    to: sideDoor?.link ?? 'https://govcongiants.libsyn.com',
    external: true,
  },
  {
    n: '05',
    title: 'Study the playbook daily',
    body: 'The Daily Windup drops one tactical play every weekday. Five minutes a day compounds.',
    ctaLabel: 'Listen free',
    to: '/podcast',
  },
];

interface StepsPathProps {
  onOpenKit: () => void;
}

/**
 * Start Here §2 — 5-step curriculum on a scroll-scrubbed vertical timeline.
 * Center rail (left edge on mobile) with green fill drawn by scroll (GSAP
 * scrub); cards slide in from their side; 48px medallions pulse once on
 * entry and fill solid green when scrolled past 50%.
 * Isolated GSAP component — no Framer Motion inside.
 */
export default function StepsPath({ onOpenKit }: StepsPathProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-step-card]', rootRef.current);
        const meds = gsap.utils.toArray<HTMLElement>('[data-step-med]', rootRef.current);

        // Rail fill drawn downward, scrubbed by scroll
        if (fillRef.current) {
          gsap.fromTo(
            fillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 65%',
                end: 'bottom 60%',
                scrub: 0.4,
              },
            },
          );
        }

        cards.forEach((card, i) => {
          const fromLeft = window.innerWidth < 1024 || i % 2 === 0;
          // Card slides in from its side
          gsap.fromTo(
            card,
            { opacity: 0, x: fromLeft ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            },
          );

          const med = meds[i];
          if (!med) return;
          // Border pulses green once when the card enters
          gsap.fromTo(
            med,
            { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' },
            {
              boxShadow: '0 0 0 18px rgba(34,197,94,0)',
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            },
          );
          // Medallion fills solid green when scrolled past 50%
          gsap.to(med, {
            backgroundColor: '#22C55E',
            color: '#052e12',
            duration: 0.3,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });

      // Reduced motion: everything in final state
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-step-card]', rootRef.current);
        const meds = gsap.utils.toArray<HTMLElement>('[data-step-med]', rootRef.current);
        gsap.set(cards, { opacity: 1, x: 0 });
        gsap.set(meds, { backgroundColor: '#22C55E', color: '#052e12' });
        if (fillRef.current) gsap.set(fillRef.current, { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div className="relative mx-auto max-w-[960px]">
      {/* Rail: center on desktop, left edge on mobile */}
      <div
        className="absolute bottom-0 left-[23px] top-0 w-0.5 -translate-x-1/2 bg-line lg:left-1/2"
        aria-hidden
      >
        <div ref={fillRef} className="absolute inset-0 origin-top scale-y-0 bg-brand" />
      </div>

      <div className="space-y-12 md:space-y-16">
        {steps.map((step, i) => {
          const leftSide = i % 2 === 0;
          return (
            <div
              key={step.n}
              id={i === 0 ? 'step-1' : undefined}
              className="relative scroll-mt-24 lg:grid lg:grid-cols-2 lg:gap-x-28"
            >
              {/* Number medallion on the rail */}
              <div
                data-step-med
                className="absolute left-[23px] top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand bg-base font-display text-xl font-bold text-brand lg:left-1/2"
                aria-hidden
              >
                {i + 1}
              </div>

              {/* Step card */}
              <div
                data-step-card
                className={cn(
                  'ml-14 max-w-[420px] rounded-xl border border-line bg-raised p-6 transition-colors hover:border-brand lg:ml-0',
                  leftSide
                    ? 'lg:col-start-1 lg:justify-self-end'
                    : 'lg:col-start-2 lg:justify-self-start',
                )}
              >
                <p className="kicker mb-2">STEP {step.n}</p>
                <h3 className="mb-2 font-display text-2xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mb-4 text-[15px] leading-[1.7] text-slate-500">{step.body}</p>
                {step.modal ? (
                  <button
                    onClick={onOpenKit}
                    className="group inline-flex cursor-pointer items-center gap-1.5 text-[15px] font-semibold text-brand underline-offset-4 transition-colors hover:underline"
                  >
                    {step.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <GhostLink to={step.to ?? '#'} external={step.external}>
                    {step.ctaLabel}
                  </GhostLink>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
