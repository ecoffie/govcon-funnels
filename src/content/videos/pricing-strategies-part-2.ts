import type { VideoData } from './index';

export const video: VideoData = {
  slug: 'pricing-strategies-part-2',
  title: 'Advanced Pricing Strategies for Government Contracts: Part 2',
  metaTitle: 'Advanced GovCon Pricing Strategies | Cost Evaluation Secrets',
  metaDescription:
    'Master advanced pricing techniques for federal contracts. Learn rate development, cost evaluation secrets, and profit optimization strategies.',
  keywords: [
    'government contract pricing',
    'federal pricing strategies',
    'cost evaluation',
    'govcon rates',
    'labor rate development',
    'indirect cost rates',
    'wrap rates govcon',
    'profit optimization federal contracts',
  ],
  youtubeUrl: 'https://youtu.be/3eBlk6J1Hig',
  youtubeId: '3eBlk6J1Hig',
  thumbnail: '/images/videos/cost evaluation secerets.jpg',
  duration: '42:00',
  publishedDate: '2025-08-05',
  category: 'winning-contracts',
  heroSubtitle:
    'Advanced pricing techniques that help you win contracts while protecting your profit margins.',

  content: `
    <p>Building on the fundamentals from Part 1, this video dives deep into <strong>advanced pricing strategies</strong> that separate winning proposals from also-rans. Learn the cost evaluation secrets that evaluators look for.</p>

    <p>Pricing is often the deciding factor in government contract awards. Understanding how to develop competitive rates while maintaining healthy margins is essential for long-term success.</p>

    <h3>What You Will Learn</h3>

    <ul>
      <li><strong>Rate Development</strong> — How to build defensible labor rates from the ground up</li>
      <li><strong>Indirect Cost Structures</strong> — Understanding fringe, overhead, and G&A</li>
      <li><strong>Wrap Rate Calculations</strong> — The math behind fully-burdened rates</li>
      <li><strong>Cost Evaluation Criteria</strong> — What evaluators actually look for</li>
      <li><strong>Profit Optimization</strong> — Maximizing returns within competitive constraints</li>
    </ul>

    <h3>Understanding Rate Components</h3>

    <p>A fully-burdened labor rate consists of multiple components:</p>

    <ul>
      <li><strong>Direct Labor</strong> — The base hourly wage for the employee</li>
      <li><strong>Fringe Benefits</strong> — Health insurance, PTO, 401k, payroll taxes (typically 25-40%)</li>
      <li><strong>Overhead</strong> — Facilities, equipment, supervision, indirect labor (varies widely)</li>
      <li><strong>General & Administrative (G&A)</strong> — Executive salaries, accounting, BD costs</li>
      <li><strong>Profit/Fee</strong> — Your margin (typically 8-15% on cost-reimbursement)</li>
    </ul>

    <h3>Wrap Rate Formula</h3>

    <p>The standard wrap rate calculation:</p>

    <p><code>Wrap Rate = Direct Labor × (1 + Fringe%) × (1 + Overhead%) × (1 + G&A%) × (1 + Profit%)</code></p>

    <p>Example: $50/hr direct labor with 35% fringe, 40% overhead, 10% G&A, and 10% profit:</p>
    <p><code>$50 × 1.35 × 1.40 × 1.10 × 1.10 = $114.35/hr fully-burdened rate</code></p>

    <h3>Cost Realism vs Price Reasonableness</h3>

    <p>Understanding evaluation approaches is critical:</p>

    <ul>
      <li><strong>Price Reasonableness</strong> — Is the price fair and reasonable compared to market?</li>
      <li><strong>Cost Realism</strong> — Can you actually perform the work at the proposed cost?</li>
      <li><strong>Unbalanced Pricing</strong> — Red flag when rates seem too low or too high for certain CLINs</li>
    </ul>

    <p>Evaluators adjust unrealistically low prices upward for evaluation purposes — pricing low doesn't automatically win.</p>

    <h3>Competitive Positioning Strategies</h3>

    <ol>
      <li><strong>Know your costs</strong> — You can't price competitively without understanding your true cost structure</li>
      <li><strong>Research incumbents</strong> — GSA Advantage, USAspending, and FPDS show competitor rates</li>
      <li><strong>Differentiate on value</strong> — Don't compete on price alone; emphasize efficiency and quality</li>
      <li><strong>Consider contract type</strong> — Fixed-price vs cost-reimbursement requires different strategies</li>
      <li><strong>Build in contingency</strong> — Account for risk without padding so much you're non-competitive</li>
    </ol>

    <h3>Common Pricing Mistakes</h3>

    <ul>
      <li>Underpricing to win, then struggling to perform</li>
      <li>Not accounting for all indirect costs</li>
      <li>Ignoring price escalation on multi-year contracts</li>
      <li>Using rates that can't be supported with documentation</li>
      <li>Failing to research competitive pricing before bidding</li>
    </ul>
  `,

  takeaways: [
    'Wrap rates include direct labor, fringe, overhead, G&A, and profit',
    'Evaluators adjust unrealistically low prices upward — pricing low doesn\'t win',
    'Cost realism means proving you can actually do the work at proposed prices',
    'Research competitor rates on GSA Advantage and USAspending before bidding',
    'Differentiate on value, not just price — quality and efficiency matter',
  ],

  relatedGuides: [
    'proposal-writing-guide',
    'government-contracting-for-beginners',
    'finding-government-contracts',
  ],

  relatedJobs: ['proposal-manager', 'pricing-analyst', 'contracts-administrator'],

  cta: {
    heading: 'Master Proposal Pricing',
    description:
      'Learn how to build winning proposals with competitive pricing that protects your margins.',
    buttonText: 'Read Proposal Guide',
    buttonHref: '/guides/proposal-writing-guide',
  },
};
