import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Do I need experience to win a federal contract?',
    a: "No. Eric's students start with subcontracting and simplified acquisitions. Past performance is built, not born.",
  },
  {
    q: 'How much does it cost to get started?',
    a: 'SAM.gov registration is free. Certifications are free. Everything in the Starter Kit is free. Beware anyone charging for registration.',
  },
  {
    q: 'What is the 8(a) program?',
    a: 'A 9-year SBA program for socially and economically disadvantaged businesses — Eric helped build two of them to millions in revenue.',
  },
  {
    q: 'How long until my first contract?',
    a: 'Honest answer: 6–18 months of consistent effort. Subcontracting can compress that.',
  },
  {
    q: 'Where do I find opportunities?',
    a: "Not just SAM.gov — the Playbook's 72 websites surface buyers, recompetes, and primes long before the RFP drops.",
  },
];

/**
 * Start Here §4 — FAQ accordion (shadcn/radix, single-open, chevron rotates
 * 180°, height-animated). Items stagger in; question turns green on hover.
 */
export default function FaqAccordion() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-6 md:px-10">
        <SectionHeader kicker="QUESTIONS" title={<>Asked every <em>week</em></>} />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
            >
              <AccordionItem value={`item-${i}`} className="border-line">
                <AccordionTrigger className="text-[17px] font-medium text-slate-900 hover:text-brand hover:no-underline [&>svg]:text-brand">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-[1.7] text-slate-600">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
