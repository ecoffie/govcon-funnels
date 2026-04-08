import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'indirect-rates',
  title: 'Indirect Rates Explained: Fringe, Overhead, and G&A for Government Contractors',
  metaTitle: 'Indirect Rates Guide — Fringe, Overhead & G&A Rate Calculation',
  metaDescription:
    'Learn how indirect rates work in government contracting: calculating fringe, overhead, and G&A rates, cost pool structures, and DCAA compliance requirements.',
  keywords: [
    'indirect rates',
    'overhead rate',
    'g&a rate',
    'fringe rate',
    'indirect cost',
    'wrap rate',
    'cost pool',
    'allocation base',
    'government contractor rates',
    'dcaa indirect rates',
  ],
  heroSubtitle:
    'Indirect rates determine your competitiveness and profitability. Get them wrong, and you either lose proposals on price or lose money on performance. They\'re the most misunderstood numbers in government contracting.',
  sections: [
    {
      heading: 'What Are Indirect Rates?',
      content: `
        <p><strong>Indirect costs</strong> are costs that benefit multiple contracts or the business as a whole and cannot be charged directly to a specific contract. <strong>Indirect rates</strong> are the mechanism for allocating these costs to contracts.</p>
        <p><strong>Direct vs. indirect costs:</strong></p>
        <p><strong>Direct costs:</strong> Charged specifically to one contract</p>
        <ul>
          <li>Labor hours worked on that contract</li>
          <li>Materials purchased for that contract</li>
          <li>Subcontracts supporting that contract</li>
          <li>Travel for that contract</li>
        </ul>
        <p><strong>Indirect costs:</strong> Benefit multiple contracts or the entire business</p>
        <ul>
          <li>Office rent</li>
          <li>Utilities</li>
          <li>Administrative salaries</li>
          <li>Benefits (health insurance, retirement)</li>
          <li>Business development</li>
        </ul>
        <p><strong>Why indirect rates matter:</strong></p>
        <ul>
          <li><strong>Pricing</strong> — Rates drive your fully-loaded labor costs</li>
          <li><strong>Competitiveness</strong> — Lower rates = lower prices = more wins</li>
          <li><strong>Profitability</strong> — Rates must recover actual costs</li>
          <li><strong>Compliance</strong> — <a href="/guides/dcaa-audits">DCAA audits</a> indirect rates for cost-type contracts</li>
        </ul>
      `,
    },
    {
      heading: 'The Three Standard Indirect Rates',
      content: `
        <p>Most government contractors use three indirect rate pools:</p>
        <p><strong>1. Fringe Rate</strong></p>
        <p>Covers employee benefits:</p>
        <ul>
          <li>Health insurance</li>
          <li>Retirement contributions (401k match)</li>
          <li>Payroll taxes (FICA, FUTA, SUTA)</li>
          <li>Workers' compensation</li>
          <li>Paid leave (vacation, sick, holiday)</li>
          <li>Life/disability insurance</li>
        </ul>
        <p><strong>Base:</strong> Direct labor dollars</p>
        <p><strong>Typical range:</strong> 25-45%</p>
        <p><strong>2. Overhead Rate</strong></p>
        <p>Covers costs of running operations:</p>
        <ul>
          <li>Facilities (rent, utilities)</li>
          <li>Equipment and supplies</li>
          <li>IT infrastructure</li>
          <li>Indirect labor (project support, technical leadership)</li>
          <li>Training</li>
        </ul>
        <p><strong>Base:</strong> Usually direct labor + fringe</p>
        <p><strong>Typical range:</strong> 15-100%+ (varies widely by business model)</p>
        <p><strong>3. G&A Rate (General & Administrative)</strong></p>
        <p>Covers running the business:</p>
        <ul>
          <li>Executive salaries</li>
          <li>Finance and accounting</li>
          <li>HR and recruiting</li>
          <li>Legal</li>
          <li>Business development</li>
          <li>Corporate insurance</li>
        </ul>
        <p><strong>Base:</strong> Total cost input (all direct + indirect costs)</p>
        <p><strong>Typical range:</strong> 8-25%</p>
      `,
    },
    {
      heading: 'Calculating Your Indirect Rates',
      content: `
        <p><strong>Rate formula:</strong></p>
        <p><code>Indirect Rate = Indirect Cost Pool ÷ Allocation Base</code></p>
        <p><strong>Example calculation:</strong></p>
        <p><strong>Fringe rate:</strong></p>
        <ul>
          <li>Fringe pool: $500,000 (total benefits costs)</li>
          <li>Direct labor base: $1,500,000</li>
          <li>Fringe rate: $500,000 ÷ $1,500,000 = <strong>33.3%</strong></li>
        </ul>
        <p><strong>Overhead rate:</strong></p>
        <ul>
          <li>Overhead pool: $400,000</li>
          <li>Base (DL + fringe): $1,500,000 + $500,000 = $2,000,000</li>
          <li>Overhead rate: $400,000 ÷ $2,000,000 = <strong>20%</strong></li>
        </ul>
        <p><strong>G&A rate:</strong></p>
        <ul>
          <li>G&A pool: $300,000</li>
          <li>Total cost input: $2,000,000 + $400,000 + $800,000 (ODCs) = $3,200,000</li>
          <li>G&A rate: $300,000 ÷ $3,200,000 = <strong>9.4%</strong></li>
        </ul>
        <p><strong>Fully-loaded labor cost example:</strong></p>
        <p>For an employee earning $50/hour base rate:</p>
        <ul>
          <li>Base rate: $50.00</li>
          <li>+ Fringe (33.3%): $16.65</li>
          <li>= Labor + Fringe: $66.65</li>
          <li>+ Overhead (20%): $13.33</li>
          <li>= Subtotal: $79.98</li>
          <li>+ G&A (9.4%): $7.52</li>
          <li>= <strong>Fully-loaded rate: $87.50</strong></li>
        </ul>
        <p>This $87.50 is your cost before profit. Add 10% profit = $96.25 billable rate.</p>
      `,
    },
    {
      heading: 'Wrap Rates and Multipliers',
      content: `
        <p><strong>What is a wrap rate?</strong></p>
        <p>A wrap rate combines all indirect costs into a single multiplier applied to base labor. It simplifies pricing but obscures the components.</p>
        <p><strong>Calculating wrap rate:</strong></p>
        <p>Using the previous example:</p>
        <ul>
          <li>Base labor: $50.00</li>
          <li>Fully-loaded: $87.50</li>
          <li>Wrap rate: $87.50 ÷ $50.00 = <strong>1.75</strong></li>
        </ul>
        <p>Multiply base rate by 1.75 to get fully-loaded cost.</p>
        <p><strong>When to use wrap rates:</strong></p>
        <ul>
          <li><strong>Quick estimates</strong> — Fast pricing calculations</li>
          <li><strong>T&M proposals</strong> — Some solicitations request wrap rates</li>
          <li><strong>Internal planning</strong> — Budgeting and forecasting</li>
        </ul>
        <p><strong>Limitations of wrap rates:</strong></p>
        <ul>
          <li>Masks rate components auditors want to see</li>
          <li>Doesn't account for cost element differences (G&A on ODCs)</li>
          <li>May not satisfy <a href="/guides/cost-proposals">cost proposal</a> requirements</li>
        </ul>
        <p><strong>Effective multiplier:</strong></p>
        <p>Also called "burden rate" — shows total indirect as percentage of base:</p>
        <ul>
          <li>Fringe: 33.3%</li>
          <li>Overhead: 20% × 1.333 = 26.6%</li>
          <li>G&A: varies by base</li>
          <li><strong>Total burden: ~75% above base labor</strong></li>
        </ul>
      `,
    },
    {
      heading: 'Cost Pool Structures',
      content: `
        <p><strong>Single pool structure:</strong></p>
        <p>Smallest contractors may use one combined indirect pool. Simple but less accurate cost allocation.</p>
        <p><strong>Two-pool structure:</strong></p>
        <ul>
          <li>Fringe + Overhead (combined)</li>
          <li>G&A</li>
        </ul>
        <p>Common for contractors under $10M revenue.</p>
        <p><strong>Three-pool structure:</strong></p>
        <ul>
          <li>Fringe</li>
          <li>Overhead</li>
          <li>G&A</li>
        </ul>
        <p>Standard for most government contractors. Provides good cost visibility.</p>
        <p><strong>Multiple overhead pools:</strong></p>
        <p>Larger contractors may have multiple overhead pools:</p>
        <ul>
          <li><strong>On-site</strong> — For work at government facilities</li>
          <li><strong>Off-site</strong> — For work at contractor facilities</li>
          <li><strong>Service center</strong> — For shared services</li>
        </ul>
        <p>Allows more accurate allocation when different work has different costs.</p>
        <p><strong>Choosing your structure:</strong></p>
        <p>Consider:</p>
        <ul>
          <li>Revenue size and complexity</li>
          <li>Contract mix (cost-type vs. FFP)</li>
          <li>Work location diversity</li>
          <li>Administrative burden vs. accuracy</li>
        </ul>
        <p>Most small businesses start with two or three pools and add complexity as they grow.</p>
      `,
    },
    {
      heading: 'Allocation Bases',
      content: `
        <p>The <strong>allocation base</strong> determines how indirect costs are spread across contracts. Choosing the right base affects pricing accuracy and competitiveness.</p>
        <p><strong>Common allocation bases:</strong></p>
        <p><strong>Direct labor dollars:</strong></p>
        <ul>
          <li>Most common for fringe</li>
          <li>Assumes indirect costs correlate with labor costs</li>
          <li>Works well when labor is primary cost driver</li>
        </ul>
        <p><strong>Direct labor hours:</strong></p>
        <ul>
          <li>Alternative to labor dollars</li>
          <li>Useful when labor mix varies significantly</li>
          <li>Less common but valid</li>
        </ul>
        <p><strong>Total cost input:</strong></p>
        <ul>
          <li>Standard for G&A</li>
          <li>Includes all direct and indirect costs</li>
          <li>Spreads G&A across entire cost structure</li>
        </ul>
        <p><strong>Value-added base:</strong></p>
        <ul>
          <li>Excludes pass-through costs (subcontracts, materials)</li>
          <li>Results in higher G&A rate but applied to smaller base</li>
          <li>May be more accurate for material/subcontract-heavy work</li>
        </ul>
        <p><strong>Compliance requirement:</strong></p>
        <p>Once you select an allocation base, you must use it consistently per Cost Accounting Standards. Changing bases requires proper disclosure and may trigger audits.</p>
      `,
    },
    {
      heading: 'Provisional vs. Final Rates',
      content: `
        <p><strong>Provisional rates:</strong></p>
        <p>Estimated rates used for billing during contract performance. Based on your budget projections. You bill using provisional rates throughout the year.</p>
        <p><strong>Final rates:</strong></p>
        <p>Actual rates calculated after fiscal year ends based on real costs. Determined through incurred cost submission and potentially <a href="/guides/dcaa-audits">DCAA audit</a>.</p>
        <p><strong>Rate reconciliation:</strong></p>
        <p>After final rates are determined:</p>
        <ul>
          <li>If final > provisional: Government owes you money</li>
          <li>If final < provisional: You owe the government money</li>
        </ul>
        <p>Reconciliation happens through billing adjustments or final voucher.</p>
        <p><strong>Setting provisional rates:</strong></p>
        <ul>
          <li>Base on best estimate of coming year's costs</li>
          <li>Consider growth plans, new contracts, cost changes</li>
          <li>Conservative estimates avoid large repayments</li>
        </ul>
        <p><strong>Forward pricing rates:</strong></p>
        <p>Rates used in proposals for future contracts. May differ from provisional billing rates. Should reflect expected costs during performance period.</p>
        <p><strong>Approved rates:</strong></p>
        <p>For large contractors, DCAA may negotiate and approve forward pricing rates used across all proposals. Simplifies proposal pricing but requires formal agreement.</p>
      `,
    },
    {
      heading: 'Managing Your Indirect Rates',
      content: `
        <p><strong>Lowering indirect rates:</strong></p>
        <p>Lower rates make you more competitive. Strategies include:</p>
        <ul>
          <li><strong>Increase direct labor base</strong> — More direct work spreads fixed costs</li>
          <li><strong>Control indirect expenses</strong> — Scrutinize overhead spending</li>
          <li><strong>Optimize benefits</strong> — Balance employee needs with cost</li>
          <li><strong>Right-size G&A</strong> — Scale administrative costs to revenue</li>
        </ul>
        <p><strong>Rate monitoring:</strong></p>
        <ul>
          <li>Track rates monthly or quarterly</li>
          <li>Compare actual to budget/provisional</li>
          <li>Identify variances early</li>
          <li>Adjust spending or rates as needed</li>
        </ul>
        <p><strong>Rate volatility:</strong></p>
        <p>Rates fluctuate with business changes:</p>
        <ul>
          <li>New contracts can lower rates (more base)</li>
          <li>Contract losses can spike rates (less base)</li>
          <li>Growth investments temporarily raise rates</li>
        </ul>
        <p>Plan for rate changes in proposals and contracts.</p>
        <p><strong>Benchmarking:</strong></p>
        <p>Compare your rates to industry benchmarks. High rates may indicate:</p>
        <ul>
          <li>Inefficiency (address it)</li>
          <li>Different business model (explain it)</li>
          <li>High-value services (justify it)</li>
        </ul>
        <p>Know where you stand competitively.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is a "good" indirect rate?',
      answer:
        'It depends on your business model and market. Professional services firms typically have fringe 30-40%, overhead 15-40%, G&A 8-15%. Lower isn\'t always better if it means underinvesting in your business. Competitive rates that recover costs and generate profit are "good."',
    },
    {
      question: 'Can I charge different rates to different contracts?',
      answer:
        'Generally no. Cost Accounting Standards require consistency in how you allocate costs. However, you may have legitimately different rates for different circumstances (on-site vs. off-site overhead pools). The key is consistent application of your disclosed practices.',
    },
    {
      question: 'What happens if my actual rates are higher than proposed?',
      answer:
        'For FFP contracts, you absorb the difference — it reduces your profit or creates a loss. For cost-type contracts, you may bill actual rates (up to funded amounts), though DCAA may question costs exceeding proposals. For T&M, you\'re limited to negotiated rates.',
    },
    {
      question: 'How do I handle unallowable costs?',
      answer:
        'Unallowable costs (per FAR 31.205) must be identified and excluded from indirect pools before calculating rates. Your accounting system must segregate unallowables. Common unallowables: entertainment, alcohol, lobbying, bad debts, interest.',
    },
    {
      question: 'Do I need indirect rates for FFP contracts?',
      answer:
        'You need to know your rates for pricing, but you don\'t bill indirect rates on FFP — you bill the fixed price. However, if the FFP contract is over the TINA threshold, you may need to certify cost data including indirect rates.',
    },
    {
      question: 'What is the G&A base controversy?',
      answer:
        'Total cost input (TCI) vs. value-added base. TCI includes all costs including pass-throughs (subcontracts). Value-added excludes pass-throughs. Contractors with heavy subcontract content prefer value-added because it avoids "G&A on G&A" through subs.',
    },
    {
      question: 'How often should I update my indirect rates?',
      answer:
        'Review monthly for management purposes. Update provisional rates at least annually. Submit forward pricing rate proposals when rates change significantly. Update proposals if rates change materially during procurement.',
    },
    {
      question: 'Can I have negative overhead?',
      answer:
        'Mathematically possible if you have credits or cost recovery that exceeds overhead expenses, but practically rare. More commonly, very low overhead indicates your pool/base structure may need adjustment or you\'re not capturing all indirect costs.',
    },
  ],
  cta: {
    heading: 'Get Your Rates Right',
    description:
      'Indirect rates affect every contract you pursue. Our team helps you structure cost pools, calculate competitive rates, and build DCAA-compliant accounting systems.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'cost-proposals',
    'dcaa-audits',
    'cost-plus-contracts',
    'time-and-materials-contracts',
    'firm-fixed-price-contracts',
  ],
  publishedDate: '2026-04-07',
};
