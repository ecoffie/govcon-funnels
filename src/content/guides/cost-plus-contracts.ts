import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'cost-plus-contracts',
  title: 'Cost Plus Contracts: Types, Requirements, and How to Win Cost-Reimbursement Work',
  metaTitle: 'Cost Plus Contracts [Guide] — CPFF, CPIF, CPAF Explained (2026)',
  metaDescription:
    'Learn how cost-reimbursement contracts work: CPFF, CPIF, CPAF types, accounting system requirements, allowable costs, and when the government uses cost-plus instead of fixed price.',
  keywords: [
    'cost plus contract',
    'cost reimbursement contract',
    'cpff contract',
    'cpif contract',
    'cpaf contract',
    'cost plus fixed fee',
    'government cost reimbursement',
    'allowable costs',
    'adequate accounting system',
    'dcaa audit',
  ],
  heroSubtitle:
    'Cost-reimbursement contracts pay your actual costs plus a fee. Lower risk than fixed price — but higher compliance burden, more audits, and profit caps. Here\'s how they work.',
  sections: [
    {
      heading: 'What Are Cost-Reimbursement Contracts?',
      content: `
        <p><strong>Cost-reimbursement</strong> (often called "cost-plus") contracts pay the contractor for allowable costs incurred during performance, plus a fee (profit). Unlike <a href="/guides/firm-fixed-price-contracts">firm fixed price</a>, your revenue adjusts based on actual costs.</p>
        <p><strong>How cost-plus works:</strong></p>
        <ol>
          <li>You estimate costs in your proposal</li>
          <li>Government establishes an estimated cost and fee</li>
          <li>You perform work and track actual costs</li>
          <li>Government reimburses allowable costs as incurred</li>
          <li>You receive the negotiated fee (or portion of it)</li>
        </ol>
        <p><strong>Why use cost-reimbursement:</strong></p>
        <ul>
          <li><strong>Uncertain scope</strong> — Requirements can't be defined precisely</li>
          <li><strong>High technical risk</strong> — R&D, new technology, first-of-kind</li>
          <li><strong>Changing requirements</strong> — Work likely to evolve during performance</li>
          <li><strong>Contractor can't bear risk</strong> — Would lead to unrealistic pricing</li>
        </ul>
        <p><strong>FAR guidance (16.301):</strong></p>
        <p>Cost-reimbursement is appropriate when:</p>
        <ul>
          <li>Uncertainties don't permit accurate cost estimation</li>
          <li>FFP is not likely to be practicable</li>
          <li>Contractor's accounting system is adequate</li>
        </ul>
        <p><strong>The tradeoff:</strong></p>
        <p>Cost-plus means lower financial risk (you're reimbursed for costs) but lower profit potential (fee is capped) and higher administrative burden (extensive cost tracking, audits, oversight).</p>
      `,
    },
    {
      heading: 'Types of Cost-Reimbursement Contracts',
      content: `
        <p>FAR defines several cost-reimbursement variations, each with different fee structures:</p>
        <p><strong>CPFF — Cost Plus Fixed Fee:</strong></p>
        <ul>
          <li>Most common cost-reimbursement type</li>
          <li>Fee is a fixed dollar amount negotiated at award</li>
          <li>Fee doesn't change even if costs go up or down</li>
          <li>Fee percentage typically 6-10% of estimated cost</li>
          <li>Minimal incentive for cost efficiency (you get fee regardless)</li>
        </ul>
        <p><strong>CPIF — Cost Plus Incentive Fee:</strong></p>
        <ul>
          <li>Target cost, target fee, minimum/maximum fee, and share ratio</li>
          <li>If actual costs < target, you share savings (higher fee)</li>
          <li>If actual costs > target, you share overruns (lower fee)</li>
          <li>Example: 80/20 share means government saves $0.80, you earn $0.20 of every dollar under target</li>
          <li>Creates incentive to control costs</li>
        </ul>
        <p><strong>CPAF — Cost Plus Award Fee:</strong></p>
        <ul>
          <li>Base fee (fixed, guaranteed) plus award fee (performance-based)</li>
          <li>Award fee determined by government evaluation of performance</li>
          <li>Evaluation criteria defined in contract (quality, schedule, etc.)</li>
          <li>Incentivizes excellent performance, not just adequate</li>
        </ul>
        <p><strong>Cost (No Fee):</strong></p>
        <ul>
          <li>Reimbursement of costs only — no profit</li>
          <li>Used mainly for R&D with nonprofits, universities</li>
          <li>Commercial contractors rarely accept (no profit incentive)</li>
        </ul>
        <p><strong>Cost-Sharing:</strong></p>
        <ul>
          <li>Contractor agrees to bear some portion of costs</li>
          <li>Common in R&D where contractor benefits from results</li>
        </ul>
      `,
    },
    {
      heading: 'Accounting System Requirements',
      content: `
        <p>You <strong>cannot get cost-reimbursement contracts without an adequate accounting system</strong>. This is non-negotiable.</p>
        <p><strong>What "adequate" means:</strong></p>
        <p>Your system must:</p>
        <ul>
          <li><strong>Segregate direct and indirect costs</strong></li>
          <li><strong>Identify costs by contract</strong> — Know exactly what you spent on each contract</li>
          <li><strong>Exclude unallowable costs</strong> — Don't charge costs FAR says you can't</li>
          <li><strong>Maintain records</strong> — Documentation to support all charges</li>
          <li><strong>Timekeeping</strong> — Accurate labor tracking by employee and contract</li>
          <li><strong>Consistent treatment</strong> — Same methodology across contracts</li>
        </ul>
        <p><strong>DCAA audits:</strong></p>
        <p>The Defense Contract Audit Agency (DCAA) audits cost-type contracts. They examine:</p>
        <ul>
          <li>Accounting system adequacy</li>
          <li>Incurred costs (are charges allowable?)</li>
          <li>Indirect rates (are they supported?)</li>
          <li>Labor floor checks (are timesheets accurate?)</li>
        </ul>
        <p><strong>Pre-award survey:</strong></p>
        <p>Before awarding a cost-reimbursement contract, the government typically conducts a pre-award survey including accounting system review. If your system isn't adequate, you won't get the contract.</p>
        <p><strong>Building capability:</strong></p>
        <p>If you're a small business pursuing your first cost-plus work:</p>
        <ul>
          <li>Invest in proper accounting software (Deltek, Unanet, etc.)</li>
          <li>Hire or consult with government contract accounting expertise</li>
          <li>Consider DCAA pre-audit before pursuing cost-type contracts</li>
        </ul>
      `,
    },
    {
      heading: 'Allowable vs. Unallowable Costs',
      content: `
        <p>Not all costs can be reimbursed. FAR Part 31 defines what's <strong>allowable</strong> (reimbursable) and <strong>unallowable</strong> (not reimbursable).</p>
        <p><strong>Cost allowability tests (FAR 31.201-2):</strong></p>
        <ol>
          <li><strong>Reasonable</strong> — Would a prudent person pay this cost?</li>
          <li><strong>Allocable</strong> — Does this cost benefit this contract?</li>
          <li><strong>In accordance with GAAP/CAS</strong> — Proper accounting treatment</li>
          <li><strong>Not specifically unallowable</strong> — Not on the prohibited list</li>
        </ol>
        <p><strong>Common unallowable costs (FAR 31.205):</strong></p>
        <ul>
          <li><strong>Advertising</strong> (except for required recruiting)</li>
          <li><strong>Alcoholic beverages</strong></li>
          <li><strong>Bad debts</strong></li>
          <li><strong>Contributions and donations</strong></li>
          <li><strong>Entertainment</strong></li>
          <li><strong>Fines and penalties</strong></li>
          <li><strong>Goodwill</strong></li>
          <li><strong>Interest</strong> (generally)</li>
          <li><strong>Lobbying</strong></li>
          <li><strong>Organization costs</strong></li>
        </ul>
        <p><strong>Partially allowable costs:</strong></p>
        <p>Some costs are allowable up to limits:</p>
        <ul>
          <li><strong>Executive compensation</strong> — Capped annually (check current limits)</li>
          <li><strong>Travel costs</strong> — Must follow JTR or company policy if lower</li>
          <li><strong>IR&D/B&P</strong> — Allowable as indirect but must be reasonable</li>
        </ul>
        <p><strong>Consequence of claiming unallowable:</strong></p>
        <p>If you claim unallowable costs, you must repay them plus potential penalties. In serious cases, False Claims Act liability. Properly identify and exclude unallowable costs from billings.</p>
      `,
    },
    {
      heading: 'Indirect Rates and Cost Structures',
      content: `
        <p>Cost-plus contracts require understanding <strong>indirect rate structures</strong> — how you allocate costs that benefit multiple contracts.</p>
        <p><strong>Typical indirect rate structure:</strong></p>
        <ul>
          <li><strong>Fringe benefits</strong> — Applied to direct labor (FICA, benefits, leave)</li>
          <li><strong>Overhead</strong> — Facility, equipment, supervision costs applied to direct costs</li>
          <li><strong>G&A (General & Administrative)</strong> — Corporate costs applied to total cost input</li>
        </ul>
        <p><strong>Example cost buildup:</strong></p>
        <pre class="bg-slate-800 p-4 rounded text-sm my-4">
Direct Labor:                $100,000
Fringe (35%):                 $35,000
Overhead (80% of labor+fringe): $108,000
Subtotal:                    $243,000
G&A (15% of subtotal):        $36,450
Total Cost:                  $279,450
Fee (8%):                     $22,356
Total Price:                 $301,806
        </pre>
        <p><strong>Provisional vs. final rates:</strong></p>
        <ul>
          <li><strong>Provisional rates:</strong> Estimated rates used for billing during the year</li>
          <li><strong>Final rates:</strong> Actual rates determined after year-end and audited</li>
          <li>Difference between provisional and final creates adjustment (you owe or are owed)</li>
        </ul>
        <p><strong>Incurred Cost Submissions:</strong></p>
        <p>After each fiscal year, you submit an Incurred Cost Submission (ICE) to DCAA documenting your actual indirect rates. DCAA audits and establishes final rates. This process can take years to complete.</p>
        <p><strong>Rate management:</strong></p>
        <p>Your indirect rates affect competitiveness. High rates mean higher prices. Contractors actively manage indirect costs to keep rates competitive while maintaining necessary functions.</p>
      `,
    },
    {
      heading: 'Billing and Payment',
      content: `
        <p>Cost-reimbursement billing differs significantly from fixed-price invoicing.</p>
        <p><strong>How billing works:</strong></p>
        <ul>
          <li><strong>Voucher submission</strong> — Typically monthly (SF 1034/1035 or electronic)</li>
          <li><strong>Provisional billing</strong> — Costs × provisional indirect rates</li>
          <li><strong>Cost incurred, not budgeted</strong> — Bill what you actually spent</li>
          <li><strong>Fee billing</strong> — Usually proportional to costs incurred or milestones</li>
        </ul>
        <p><strong>Supporting documentation:</strong></p>
        <p>Government can (and does) request backup for any costs claimed:</p>
        <ul>
          <li>Timesheets and labor distribution</li>
          <li>Material invoices and receipts</li>
          <li>Subcontract invoices</li>
          <li>Travel receipts and authorizations</li>
          <li>Indirect rate calculations</li>
        </ul>
        <p><strong>Limitation of Funds (LOF) clause:</strong></p>
        <p>Cost contracts often have incrementally funded. The LOF clause (FAR 52.232-22) limits your obligation to work within funded amounts. You must:</p>
        <ul>
          <li>Notify CO when 75% of funds expended</li>
          <li>Notify CO when 100% will be reached</li>
          <li>Stop work if funding not increased (you're not obligated to spend your own money)</li>
        </ul>
        <p><strong>Final billing:</strong></p>
        <p>After contract completion and final rate determination, submit a final voucher adjusting for differences between provisional and final rates. This can be years after contract completion.</p>
      `,
    },
    {
      heading: 'Cost-Plus Compliance Requirements',
      content: `
        <p>Cost-reimbursement contracts carry substantial compliance obligations beyond FFP.</p>
        <p><strong>Cost Accounting Standards (CAS):</strong></p>
        <p>CAS-covered contracts require compliance with specific accounting standards:</p>
        <ul>
          <li><strong>Modified CAS coverage</strong> — Contracts $7.5M-$50M follow 4 key standards</li>
          <li><strong>Full CAS coverage</strong> — Contracts >$50M (or cumulative >$50M) follow all 19 standards</li>
          <li>CAS requires consistency in cost accounting practices</li>
          <li>Changes in practice require disclosure and may require contract adjustment</li>
        </ul>
        <p><strong>Disclosure Statement (CASB DS-1):</strong></p>
        <p>Full CAS coverage requires filing a Disclosure Statement describing your accounting practices. Must be updated when practices change.</p>
        <p><strong>Truth in Negotiations Act (TINA):</strong></p>
        <p>Cost proposals over $2M require certified cost or pricing data. If your data is inaccurate, contracts can be price-adjusted retroactively.</p>
        <p><strong>Audit rights:</strong></p>
        <p>Government (usually DCAA) has broad audit rights:</p>
        <ul>
          <li>Access to books, records, documents</li>
          <li>Interview employees</li>
          <li>Floor checks of labor charging</li>
          <li>Audit occurs during and after performance</li>
        </ul>
        <p><strong>Record retention:</strong></p>
        <p>Maintain cost records for <strong>3 years after final payment</strong> on each contract. Given audit backlogs, this can mean retaining records for many years.</p>
      `,
    },
    {
      heading: 'When to Pursue (or Avoid) Cost-Plus',
      content: `
        <p><strong>Pursue cost-plus when:</strong></p>
        <ul>
          <li>Requirements are uncertain and likely to change</li>
          <li>High technical risk that's difficult to price</li>
          <li>You have an adequate accounting system</li>
          <li>You're comfortable with government oversight</li>
          <li>R&D or developmental work</li>
          <li>First-of-kind efforts without historical cost data</li>
        </ul>
        <p><strong>Avoid cost-plus when:</strong></p>
        <ul>
          <li>Your accounting system isn't adequate (you can't win anyway)</li>
          <li>You want to maximize profit (capped on cost-plus)</li>
          <li>Requirements are well-defined (FFP gives better profit potential)</li>
          <li>You prefer minimal government oversight</li>
          <li>Audit/compliance costs would be disproportionate to contract value</li>
        </ul>
        <p><strong>Building toward cost-plus capability:</strong></p>
        <p>If you're a growing contractor wanting to access cost-type work:</p>
        <ol>
          <li>Invest in compliant accounting system</li>
          <li>Develop indirect rate structure</li>
          <li>Consider voluntary DCAA pre-award audit</li>
          <li>Start with smaller cost-type subcontracts to build experience</li>
          <li>Build compliance infrastructure before pursuing prime cost contracts</li>
        </ol>
        <p><strong>Hybrid approaches:</strong></p>
        <p>Some contracts combine types — FFP for known work, cost-plus for R&D portions. Understand which type applies to which tasks.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What\'s the typical fee percentage on cost-plus contracts?',
      answer:
        'CPFF fees typically range from 6-10% of estimated cost. CPIF has a fee range (e.g., 4-12%) depending on cost performance. CPAF has a base fee (2-4%) plus potential award fee based on evaluated performance. The exact fee depends on complexity, risk, and negotiation.',
    },
    {
      question: 'Can I profit more on cost-plus than fixed-price?',
      answer:
        'Generally no. Fee percentages on cost-plus are capped and typically lower than FFP profit margins. The tradeoff is lower risk — you\'re reimbursed for costs, so losses are unlikely. FFP has higher profit potential but also higher loss potential.',
    },
    {
      question: 'What accounting system do I need?',
      answer:
        'You need a system that properly segregates direct/indirect costs, identifies costs by contract, excludes unallowable costs, maintains accurate timekeeping, and provides consistent cost treatment. Common systems include Deltek Costpoint, Unanet, and others designed for government contracting. General accounting software like QuickBooks typically isn\'t adequate without significant customization.',
    },
    {
      question: 'How often does DCAA audit?',
      answer:
        'It varies. Larger contractors may have resident DCAA auditors. Smaller contractors may only see DCAA during pre-award surveys or when submitting incurred cost proposals. Due to DCAA backlogs, years can pass between audits — but that doesn\'t mean you won\'t be audited. Maintain proper documentation always.',
    },
    {
      question: 'What happens if I incur costs higher than estimated?',
      answer:
        'On cost-plus contracts, higher costs (if allowable) are reimbursed, but you may not get additional fee. On CPFF, fee is fixed regardless of costs. On CPIF, higher costs reduce your fee (within the share formula). The government also establishes a ceiling — costs above the ceiling may require additional funding authorization.',
    },
    {
      question: 'Can unallowable costs ever be included in my price?',
      answer:
        'No, on cost-reimbursement contracts. Unallowable costs must be excluded from billings. However, on FFP contracts, unallowable costs aren\'t separately identified — they\'re part of your cost structure that you price into your fixed price.',
    },
    {
      question: 'What\'s the difference between CAS and FAR Part 31?',
      answer:
        'FAR Part 31 defines cost allowability — what costs can be charged to government contracts. CAS (Cost Accounting Standards) defines how costs must be measured, assigned, and allocated. You must comply with both. FAR 31 says what\'s allowable; CAS says how to account for it.',
    },
    {
      question: 'How do I convert from FFP-only to cost-plus capability?',
      answer:
        'It takes time and investment. You need: (1) compliant accounting system, (2) documented indirect rate structure, (3) timekeeping system, (4) understanding of FAR Part 31 and CAS requirements, (5) potentially a DCAA pre-award audit. Many contractors start with cost-type subcontracts to build experience before pursuing cost-type prime contracts.',
    },
  ],
  cta: {
    heading: 'Master Cost-Reimbursement Contracting',
    description:
      'Cost-plus contracts require accounting sophistication and compliance discipline. Our training covers accounting system requirements, indirect rates, and DCAA audit preparation.',
    buttonText: 'View Training Options',
    buttonHref: '/training',
  },
  relatedGuides: [
    'firm-fixed-price-contracts',
    'cost-proposals',
    'time-and-materials-contracts',
    'dcaa-audits',
    'indirect-rates',
  ],
  publishedDate: '2026-04-07',
};
