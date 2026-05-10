/**
 * Canonical Q&A for the dashboard Internal AI.
 * Edit this file to train the AI with exact answers for pricing, products, and common questions.
 * The ask API injects this into the system prompt so answers stay accurate and on-brand.
 */

export interface CanonicalQA {
  /** Approximate question (for matching / documentation) */
  question: string;
  /** Exact answer the AI should use */
  answer: string;
}

export const CANONICAL_QA: CanonicalQA[] = [
  {
    question: 'How much does it cost to join the bootcamp?',
    answer:
      'It costs $99/month. You join the Pro Member Group at shop.govcongiants.com; that gives you access to every bootcamp, including the Feb 28 bootcamp.',
  },
  {
    question: 'How much is Pro Member Group?',
    answer:
      '$99/month at shop.govcongiants.com. Includes all bootcamps, community, tools, and live calls.',
  },
  {
    question: 'What do I get for $99/month?',
    answer:
      'Pro Member Group: access to every bootcamp (including Feb 28), community, tools, and live training/calls.',
  },
  {
    question: 'Is there a $297 option for the bootcamp?',
    answer:
      'No. Bootcamp access is through Pro Member Group at $99/month. $297 is only a "value" label on some free download assets on the Resources page, not a product price.',
  },
];

/** Pricing & products summary for the AI (use for list-style answers). */
export const PRICING_SUMMARY = `
- **Pro Member Group**: $99/month at shop.govcongiants.com. Includes access to every bootcamp (including Feb 28), community, tools, live calls.
- **Pro Member Plan**: $997 one-time. Lifetime training license, 4,000+ community, Success Guide, bootcamps.
- **Accelerator Program**: $5,997 one-time. 90 days, 12 weekly 1:1 coaching sessions.
- **White Glove**: Custom pricing – contact hello@govconedu.com.
- **Bootcamp access**: Via Pro Member Group ($99/month). Never use $297 for bootcamp or Pro; $297 is only a displayed "value" on free Resources page downloads.
`;

/**
 * Renders the canonical Q&A block for injection into the system prompt.
 */
export function getCanonicalAnswersPromptBlock(): string {
  const qaLines = CANONICAL_QA.map(
    (qa) => `- Q: ${qa.question}\n  A: ${qa.answer}`
  ).join('\n');
  return `
## Canonical answers – use these for pricing and product questions

When asked about bootcamp cost, membership price, or how much to join, use only the Canonical answers below. Never state $297 as the cost to join a bootcamp or Pro.

### Q&A
${qaLines}

### Pricing & products
${PRICING_SUMMARY.trim()}
`.trim();
}
