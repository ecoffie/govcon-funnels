import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Beat {
  year: string;
  marker: string;
  title: string;
  body: string;
}

const beats: Beat[] = [
  {
    year: '2008–2012',
    marker: '2008',
    title: 'The climb.',
    body: 'Eric helps build two 8(a) small businesses from startup to millions in federal revenue — learning the system from the inside.',
  },
  {
    year: 'THE BREAKTHROUGH',
    marker: '$5M',
    title: 'The $5M win.',
    body: 'Evankoff Construction wins a $5M Air Force Base hospital exterior renovation. That single contract funds everything that comes next.',
  },
  {
    year: '$20M+',
    marker: '$20M+',
    title: 'Zero to Giant.',
    body: 'Evankoff grows past $20M in government sales. The playbook is proven — and Eric starts writing it down.',
  },
  {
    year: '2017',
    marker: '2017',
    title: 'Score Contracts → YouTube.',
    body: "A YouTube channel called 'Score Contracts' goes live. The mission: give away 99.9% for free.",
  },
  {
    year: 'TODAY',
    marker: 'TODAY',
    title: 'GovCon Giants.',
    body: 'A podcast with 250K+ listens, the Billion Dollar Playbook book, and a community of everyday people winning extraordinary contracts.',
  },
];

/**
 * About §3 — the showcase GSAP moment: 250vh pinned scroll timeline.
 * Desktop (≥1024px): left 35% sticky progress rail (2px track + green fill
 * scrubbed by scroll + crossfading year marker), right 65% five story beats
 * that slide up 60px and crossfade sequentially as the pin progresses.
 * Mobile: no pin — beats stack with a left rail line as staggered reveals.
 * Isolated GSAP component — no Framer Motion inside.
 */
export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned, scrubbed timeline
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const beatEls = gsap.utils.toArray<HTMLElement>('[data-beat]', stageRef.current);
        const yearEls = gsap.utils.toArray<HTMLElement>('[data-year]', railRef.current);
        if (!beatEls.length || !yearEls.length || !fillRef.current) return;

        gsap.set(beatEls, { opacity: 0, y: 60 });
        gsap.set(yearEls, { opacity: 0 });
        gsap.set(yearEls[0], { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top 96px',
            end: '+=250%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Rail fill tied to scrub across the whole timeline
        tl.fromTo(
          fillRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', duration: beats.length + 0.4 },
          0,
        );

        beatEls.forEach((el, i) => {
          const at = i;
          if (i === 0) {
            tl.to(el, { opacity: 1, y: 0, duration: 0.45 }, 0);
          } else {
            tl.to(beatEls[i - 1], { opacity: 0, y: -60, duration: 0.45 }, at);
            tl.to(yearEls[i - 1], { opacity: 0, duration: 0.3 }, at);
            tl.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45 }, at + 0.2);
            tl.fromTo(yearEls[i], { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.2);
          }
        });

        // Settle on the last beat before unpin
        tl.to({}, { duration: 0.4 });
      });

      // Mobile: no pin — stacked reveals + left rail fill
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const beatEls = gsap.utils.toArray<HTMLElement>('[data-beat]', stageRef.current);
        beatEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            },
          );
        });
        if (mobileFillRef.current) {
          gsap.fromTo(
            mobileFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: stageRef.current,
                start: 'top 75%',
                end: 'bottom 55%',
                scrub: 0.4,
              },
            },
          );
        }
      });

      // Reduced motion: everything visible, no pin
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const beatEls = gsap.utils.toArray<HTMLElement>('[data-beat]', stageRef.current);
        const yearEls = gsap.utils.toArray<HTMLElement>('[data-year]', railRef.current);
        gsap.set(beatEls, { opacity: 1, y: 0 });
        gsap.set(yearEls, { opacity: 0 });
        if (yearEls[0]) gsap.set(yearEls[0], { opacity: 1 });
        if (fillRef.current) gsap.set(fillRef.current, { scaleY: 1 });
        if (mobileFillRef.current) gsap.set(mobileFillRef.current, { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader kicker="THE JOURNEY" title={<>From zero to <em>Giants</em></>} />

        <div
          ref={pinRef}
          className="lg:grid lg:h-[calc(100dvh-96px)] lg:grid-cols-[35%_65%] lg:items-center lg:gap-12"
        >
          {/* Progress rail — desktop only */}
          <div ref={railRef} className="hidden items-center justify-center gap-8 lg:flex">
            <div className="relative h-[52vh] w-0.5 bg-line">
              <div
                ref={fillRef}
                className="absolute inset-0 origin-top scale-y-0 bg-brand"
                aria-hidden
              />
            </div>
            <div className="relative h-16 w-32" aria-live="polite">
              {beats.map((b) => (
                <span
                  key={b.marker}
                  data-year
                  className="absolute inset-0 flex items-center font-display text-[40px] font-bold text-brand tabular-nums"
                >
                  {b.marker}
                </span>
              ))}
            </div>
          </div>

          {/* Beats stage */}
          <div className="relative pl-8 lg:pl-0">
            {/* Mobile rail line */}
            <div className="absolute bottom-2 left-0 top-2 w-0.5 bg-line lg:hidden" aria-hidden>
              <div
                ref={mobileFillRef}
                className="absolute inset-0 origin-top scale-y-0 bg-brand"
              />
            </div>

            <div ref={stageRef} className="relative space-y-12 lg:h-[60vh] lg:space-y-0">
              {beats.map((b) => (
                <article
                  key={b.title}
                  data-beat
                  className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
                >
                  <p className="kicker mb-3">{b.year}</p>
                  <h3 className="mb-4 font-display text-[28px] font-semibold leading-[1.25] text-white">
                    {b.title}
                  </h3>
                  <p className="max-w-[520px] text-base leading-[1.7] text-slate-300">
                    {b.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
