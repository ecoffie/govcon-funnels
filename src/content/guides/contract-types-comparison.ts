import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'contract-types-comparison',
  title: 'Government Contract Types Compared: FFP, T&M, Cost-Plus & More',
  metaTitle: 'Contract Types Comparison — FFP vs T&M vs Cost-Plus Explained',
  metaDescription:
    'Compare government contract types: firm fixed price, time and materials, cost-plus, IDIQ, and BPA. Understand risk allocation, when each is used, and how to price them.',
  keywords: [
    'contract types',
    'ffp vs t&m',
    'cost-plus contracts',
    'government contract types',
    'fixed price',
    'time and materials',
    'contract comparison',
    'risk allocation',
    'contract pricing',
    'far contract types',
  ],
  heroSubtitle:
    'Different contract types allocate risk differently between the government and contractor. Understanding contract types helps you price appropriately and manage risk.',
  sections: [
    {
      heading: 'Overview of Contract Types',
      content: `
        <p>The Federal Acquisition Regulation (FAR Part 16) establishes contract types that allocate risk between the government and contractor differently.</p>
        <p><strong>Contract type spectrum:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Contract Type</th>
            <th class="p-2 border border-slate-700 text-white">Contractor Risk</th>
            <th class="p-2 border border-slate-700 text-white">Government Risk</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Firm Fixed Price</td>
            <td class="p-2 border border-slate-700 text-red-400">Highest</td>
            <td class="p-2 border border-slate-700 text-green-400">Lowest</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Fixed Price Incentive</td>
            <td class="p-2 border border-slate-700 text-orange-400">High</td>
            <td class="p-2 border border-slate-700 text-yellow-400">Moderate</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Time & Materials</td>
            <td class="p-2 border border-slate-700 text-yellow-400">Moderate</td>
            <td class="p-2 border border-slate-700 text-yellow-400">Moderate</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Cost Plus Incentive Fee</td>
            <td class="p-2 border border-slate-700 text-yellow-400">Moderate</td>
            <td class="p-2 border border-slate-700 text-orange-400">High</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Cost Plus Fixed Fee</td>
            <td class="p-2 border border-slate-700 text-green-400">Low</td>
            <td class="p-2 border border-slate-700 text-red-400">Highest</td>
          </tr>
        </table>
        <p><strong>Key principle:</strong></p>
        <p>Higher contractor risk = higher potential profit (or loss). Lower contractor risk = lower fee expectations.</p>
      `,
    },
    {
      heading: 'Firm Fixed Price (FFP)',
      content: `
        <p><strong>How it works:</strong></p>
        <p>The government pays a fixed price regardless of contractor costs. If you're efficient, you keep the profit. If you overrun, you absorb the loss.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Price agreed upon before work begins</li>
          <li>Contractor assumes all cost risk</li>
          <li>No cost auditing by government</li>
          <li>Incentive for efficiency</li>
        </ul>
        <p><strong>When FFP is appropriate:</strong></p>
        <ul>
          <li>Well-defined requirements</li>
          <li>Stable specifications</li>
          <li>Historical cost data available</li>
          <li>Low technical risk</li>
        </ul>
        <p><strong>Pricing considerations:</strong></p>
        <ul>
          <li>Include adequate contingency</li>
          <li>Account for all possible costs</li>
          <li>Consider risk premium in fee</li>
          <li>Don't underbid to win</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/firm-fixed-price-contracts">Firm Fixed Price Contracts Guide</a></p>
      `,
    },
    {
      heading: 'Time & Materials (T&M)',
      content: `
        <p><strong>How it works:</strong></p>
        <p>Government pays fixed hourly rates for labor plus actual cost of materials. No fixed total price.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Labor rates are fixed (negotiated)</li>
          <li>Hours are variable</li>
          <li>Materials at cost (usually)</li>
          <li>Ceiling price limits government exposure</li>
        </ul>
        <p><strong>When T&M is appropriate:</strong></p>
        <ul>
          <li>Scope is uncertain</li>
          <li>Can't define level of effort</li>
          <li>Short-term engagements</li>
          <li>Supplemental staffing</li>
        </ul>
        <p><strong>Pricing considerations:</strong></p>
        <ul>
          <li>Compete on labor rates</li>
          <li>Profit is embedded in rates</li>
          <li>Efficient use of hours matters</li>
          <li>Materials handling fees may apply</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/time-and-materials-contracts">Time & Materials Contracts Guide</a></p>
      `,
    },
    {
      heading: 'Cost-Plus Contracts',
      content: `
        <p><strong>How it works:</strong></p>
        <p>Government reimburses allowable costs plus a fee. Contractor risk is limited to disallowed costs.</p>
        <p><strong>Types of cost-plus:</strong></p>
        <ul>
          <li><strong>CPFF</strong> — Cost Plus Fixed Fee (fee doesn't change)</li>
          <li><strong>CPIF</strong> — Cost Plus Incentive Fee (fee varies with cost performance)</li>
          <li><strong>CPAF</strong> — Cost Plus Award Fee (fee based on subjective evaluation)</li>
        </ul>
        <p><strong>When cost-plus is appropriate:</strong></p>
        <ul>
          <li>R&D and experimental work</li>
          <li>High technical uncertainty</li>
          <li>Scope can't be defined</li>
          <li>First-of-a-kind efforts</li>
        </ul>
        <p><strong>Pricing considerations:</strong></p>
        <ul>
          <li>Requires adequate accounting system</li>
          <li>Subject to DCAA audit</li>
          <li>Fee is typically lower than FFP profit</li>
          <li>Compete on estimated costs and approach</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/cost-plus-contracts">Cost Plus Contracts Guide</a></p>
      `,
    },
    {
      heading: 'Labor Hour Contracts',
      content: `
        <p><strong>How it works:</strong></p>
        <p>Like T&M but for labor only — no separate materials billing.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Fixed hourly rates</li>
          <li>Variable hours</li>
          <li>All costs in labor rate (no ODCs)</li>
          <li>Ceiling price required</li>
        </ul>
        <p><strong>When used:</strong></p>
        <ul>
          <li>Pure services work</li>
          <li>Staff augmentation</li>
          <li>Advisory services</li>
          <li>When materials are minimal/incidental</li>
        </ul>
        <p><strong>Pricing:</strong></p>
        <p>Since there's no separate materials billing, all overhead and profit must be in the labor rate. Rates may be higher than T&M labor rates for the same roles.</p>
      `,
    },
    {
      heading: 'Indefinite Delivery Contracts (IDIQ)',
      content: `
        <p><strong>How it works:</strong></p>
        <p>Contract establishes terms; specific work ordered through task/delivery orders.</p>
        <p><strong>IDIQ variations:</strong></p>
        <ul>
          <li><strong>Single-award IDIQ</strong> — One contractor gets all orders</li>
          <li><strong>Multiple-award IDIQ</strong> — Multiple contractors compete for orders</li>
        </ul>
        <p><strong>Task order types:</strong></p>
        <p>Task orders under IDIQs can be any contract type:</p>
        <ul>
          <li>FFP task orders</li>
          <li>T&M task orders</li>
          <li>Cost-plus task orders</li>
        </ul>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Minimum and maximum ordering limits</li>
          <li>Period of performance with option years</li>
          <li>Pre-negotiated rates and terms</li>
          <li>Flexibility for government</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/idiq-contracts">IDIQ Contracts Guide</a></p>
      `,
    },
    {
      heading: 'Blanket Purchase Agreements (BPA)',
      content: `
        <p><strong>How it works:</strong></p>
        <p>Simplified ordering method for repetitive needs. Establishes terms for future purchases.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Not a contract itself</li>
          <li>Simplifies ordering process</li>
          <li>Usually against GSA Schedule or other contract</li>
          <li>May have ceiling but no minimum guarantee</li>
        </ul>
        <p><strong>When used:</strong></p>
        <ul>
          <li>Recurring purchases</li>
          <li>Commodity-type items/services</li>
          <li>Simplified acquisition thresholds</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/bpa-agreements">BPA Agreements Guide</a></p>
      `,
    },
    {
      heading: 'Choosing the Right Contract Type',
      content: `
        <p><strong>Factors that determine contract type:</strong></p>
        <ul>
          <li><strong>Requirement definition</strong> — How well can scope be defined?</li>
          <li><strong>Technical risk</strong> — How uncertain is the solution?</li>
          <li><strong>Cost estimating confidence</strong> — How accurately can costs be predicted?</li>
          <li><strong>Performance measurement</strong> — Can deliverables be specified?</li>
        </ul>
        <p><strong>Decision matrix:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Situation</th>
            <th class="p-2 border border-slate-700 text-white">Best Contract Type</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Clear requirements, known costs</td>
            <td class="p-2 border border-slate-700">FFP</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Uncertain scope, known rates</td>
            <td class="p-2 border border-slate-700">T&M or Labor Hour</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">R&D, high uncertainty</td>
            <td class="p-2 border border-slate-700">Cost Plus</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Variable needs over time</td>
            <td class="p-2 border border-slate-700">IDIQ</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Repetitive small purchases</td>
            <td class="p-2 border border-slate-700">BPA</td>
          </tr>
        </table>
        <p><strong>Contractor preference:</strong></p>
        <p>Contractors often prefer cost-plus (lower risk) while government prefers FFP (cost certainty). Negotiate from a position of understanding both perspectives.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Which contract type has the highest profit potential?',
      answer:
        'Firm Fixed Price has highest profit potential because you keep all savings from efficiency. But it also has highest loss potential if you underestimate costs. Cost-plus has lower but more predictable fee.',
    },
    {
      question: 'Can contract types be mixed in one contract?',
      answer:
        'Yes. A contract might have FFP CLINs for defined deliverables and T&M CLINs for support services. IDIQs often allow different contract types for different task orders.',
    },
    {
      question: 'Do I need a special accounting system for cost-plus?',
      answer:
        'Yes. Cost-plus contracts require an adequate accounting system that can track costs by contract and meet DCAA requirements. This is a significant administrative burden for smaller contractors.',
    },
    {
      question: 'What determines the fee percentage on cost-plus?',
      answer:
        'FAR sets statutory limits (typically 10% for CPFF, higher for CPIF). Actual fee is negotiated based on complexity, risk, and effort. Cost-plus fees are generally lower than FFP profit percentages.',
    },
    {
      question: 'Can I negotiate to change contract type?',
      answer:
        'The government determines contract type based on the work and risk. You can provide input during market research, but contract type is typically not negotiable once solicitation is released.',
    },
    {
      question: 'Why would I accept higher risk with FFP?',
      answer:
        'Higher risk means higher potential profit. If you can perform efficiently, FFP rewards that. You also have less government oversight and no cost audits. For well-understood work, FFP may be preferable.',
    },
    {
      question: 'What is an "adequate accounting system"?',
      answer:
        'An accounting system that meets DFARS 252.242-7006 criteria — can track costs by contract, segregate direct/indirect costs, comply with CAS, and withstand audit. Required for cost-reimbursable and some T&M contracts.',
    },
    {
      question: 'How do I price if I\'ve never done this type of work?',
      answer:
        'Without historical cost data, use analogous pricing, industry benchmarks, detailed bottoms-up estimates, and conservative assumptions. Build in contingency for unknowns. Consider whether you should bid at all.',
    },
  ],
  cta: {
    heading: 'Master Contract Types',
    description:
      'Understanding contract types is essential for pricing strategy and risk management. Our team helps you evaluate opportunities and structure winning proposals for any contract type.',
    buttonText: 'Get Expert Guidance',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'task-order-management',
    'construction-contracting',
    'letter-contracts',
    'healthcare-contracting',
    'firm-fixed-price-contracts',
    'cost-plus-contracts',
    'time-and-materials-contracts',
    'idiq-contracts',
    'cost-proposals',
  ],
  publishedDate: '2026-04-07',
};
