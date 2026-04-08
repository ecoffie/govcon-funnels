import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'time-and-materials-contracts',
  title: 'Time and Materials Contracts: How T&M Works and When to Use It',
  metaTitle: 'Time & Materials (T&M) Contracts [Guide] — Rates, Ceilings & Best Practices',
  metaDescription:
    'Learn how time and materials contracts work in government contracting: labor rate pricing, material handling, ceiling prices, and when T&M is appropriate vs fixed price or cost-plus.',
  keywords: [
    'time and materials contract',
    't&m contract',
    'labor hour contract',
    'government t&m',
    't&m pricing',
    'time and materials government',
    't&m ceiling',
    'labor hour rates',
    't&m vs fixed price',
    'far 16.601',
  ],
  heroSubtitle:
    'Time and materials pays your labor rates times hours worked, plus materials at cost. It\'s a middle ground between fixed price risk and cost-plus oversight — but has its own rules.',
  sections: [
    {
      heading: 'What Is a Time and Materials Contract?',
      content: `
        <p>A <strong>Time and Materials (T&M)</strong> contract pays the contractor based on:</p>
        <ul>
          <li><strong>Labor</strong> — Negotiated hourly rates × hours actually worked</li>
          <li><strong>Materials</strong> — Cost of materials, typically with handling markup</li>
        </ul>
        <p><strong>How T&M works:</strong></p>
        <ol>
          <li>You propose hourly rates by labor category</li>
          <li>Government negotiates rates and establishes a ceiling price</li>
          <li>You perform work and track hours by labor category</li>
          <li>You invoice: (hours × rates) + materials + markup</li>
          <li>Payments continue until work complete or ceiling reached</li>
        </ol>
        <p><strong>Labor Hour (LH) variant:</strong></p>
        <p><strong>Labor Hour contracts</strong> are identical to T&M but include no materials — labor only. Common for professional services where materials are minimal.</p>
        <p><strong>Why T&M exists:</strong></p>
        <p>T&M fills a gap between fixed price and cost-plus:</p>
        <ul>
          <li><strong>vs. Fixed Price:</strong> Requirements too uncertain to price fixed</li>
          <li><strong>vs. Cost-Plus:</strong> Contractor doesn't have/need adequate accounting system for cost-type</li>
        </ul>
        <p><strong>FAR requirement (16.601):</strong></p>
        <p>T&M is only appropriate when it's <strong>not possible to estimate costs with sufficient accuracy</strong> to use fixed price, and government decides not to use cost-reimbursement.</p>
      `,
    },
    {
      heading: 'T&M Pricing: Labor Rates and Materials',
      content: `
        <p><strong>Labor rate buildup:</strong></p>
        <p>Your T&M hourly rates must cover all costs:</p>
        <ul>
          <li><strong>Direct labor</strong> — Base hourly wage</li>
          <li><strong>Fringe benefits</strong> — FICA, health insurance, PTO</li>
          <li><strong>Overhead</strong> — Facility, management, support costs</li>
          <li><strong>G&A</strong> — General and administrative</li>
          <li><strong>Profit</strong> — Your margin</li>
        </ul>
        <p><strong>Example rate calculation:</strong></p>
        <pre class="bg-slate-800 p-4 rounded text-sm my-4">
Direct Labor (base pay):        $50.00/hour
Fringe (35%):                   $17.50
Labor + Fringe:                 $67.50
Overhead (80%):                 $54.00
Subtotal:                      $121.50
G&A (15%):                      $18.23
Total Cost:                    $139.73
Profit (10%):                   $13.97
Billed Rate:                   $153.70/hour
        </pre>
        <p><strong>Materials pricing:</strong></p>
        <ul>
          <li>Materials typically reimbursed at <strong>cost plus handling</strong></li>
          <li>Material handling rate negotiated in contract (commonly 0-5%)</li>
          <li>Must be supported by invoices/receipts</li>
          <li>Government may require prior approval for material purchases over threshold</li>
        </ul>
        <p><strong>Subcontractor labor:</strong></p>
        <p>Subcontractor rates may be:</p>
        <ul>
          <li>Billed at sub's rates (pass-through)</li>
          <li>Marked up at negotiated percentage</li>
          <li>Included in your labor categories (if equivalent qualifications)</li>
        </ul>
        <p>Read your contract carefully for sub handling requirements.</p>
      `,
    },
    {
      heading: 'Ceiling Prices and Funding',
      content: `
        <p><strong>The ceiling price:</strong></p>
        <p>Every T&M contract has a <strong>ceiling price</strong> — the maximum the government will pay. You cannot exceed the ceiling without a contract modification.</p>
        <ul>
          <li>Ceiling represents government's <strong>maximum liability</strong></li>
          <li>You continue working until ceiling reached or work complete</li>
          <li>If you hit ceiling before work is done, you must stop (unless modified)</li>
          <li>Exceeding ceiling without authorization = you eat the cost</li>
        </ul>
        <p><strong>Ceiling vs. funding:</strong></p>
        <p>Understand the difference:</p>
        <ul>
          <li><strong>Ceiling</strong> — Maximum contract can pay (contract term)</li>
          <li><strong>Funding</strong> — Money actually obligated (may be less than ceiling)</li>
        </ul>
        <p>Contract might have $1M ceiling but only $500K funded initially. You can only spend funded amounts.</p>
        <p><strong>Notification requirements:</strong></p>
        <p>T&M contracts typically require you to notify the CO when:</p>
        <ul>
          <li>75% of funding expended</li>
          <li>You expect to reach funding/ceiling before work complete</li>
          <li>Additional funding needed to continue</li>
        </ul>
        <p><strong>Managing toward ceiling:</strong></p>
        <ul>
          <li>Track expenditures against ceiling and funding continuously</li>
          <li>Forecast to completion regularly</li>
          <li>Notify CO early if ceiling increase needed</li>
          <li>Don't assume ceiling will be increased — it may not be</li>
        </ul>
      `,
    },
    {
      heading: 'T&M Compliance and Documentation',
      content: `
        <p>T&M has specific compliance requirements, particularly around timekeeping and materials.</p>
        <p><strong>Timekeeping requirements:</strong></p>
        <ul>
          <li><strong>Accurate, contemporaneous records</strong> — Time recorded when worked, not after the fact</li>
          <li><strong>By labor category</strong> — Hours tracked by the category billed</li>
          <li><strong>Employee signature</strong> — Each employee certifies their time</li>
          <li><strong>Supervisor approval</strong> — Review and approval of timesheets</li>
        </ul>
        <p><strong>Labor qualification requirements:</strong></p>
        <p>Personnel billed under a labor category must meet that category's requirements:</p>
        <ul>
          <li>Education requirements (degree, certifications)</li>
          <li>Experience requirements (years of relevant experience)</li>
          <li>If person doesn't qualify for category, you can't bill them at that rate</li>
        </ul>
        <p><strong>Material documentation:</strong></p>
        <ul>
          <li>Invoices/receipts for all materials</li>
          <li>Evidence of competitive sourcing (for significant purchases)</li>
          <li>Prior approval if required by contract</li>
        </ul>
        <p><strong>Invoice support:</strong></p>
        <p>T&M invoices should include or be supported by:</p>
        <ul>
          <li>Hours worked by labor category and employee</li>
          <li>Billing rates applied</li>
          <li>Material costs with receipts</li>
          <li>Cumulative expenditure vs. ceiling</li>
        </ul>
        <p><strong>Audit exposure:</strong></p>
        <p>T&M contracts are subject to audit. Auditors verify:</p>
        <ul>
          <li>Hours actually worked match hours billed</li>
          <li>Personnel meet labor category requirements</li>
          <li>Materials were actually purchased and used</li>
          <li>Rates match contract rates</li>
        </ul>
      `,
    },
    {
      heading: 'T&M vs. Other Contract Types',
      content: `
        <p><strong>T&M vs. Firm Fixed Price:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Factor</th>
            <th class="p-2 border border-slate-700 text-white">T&M</th>
            <th class="p-2 border border-slate-700 text-white">FFP</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Risk</td>
            <td class="p-2 border border-slate-700">Shared</td>
            <td class="p-2 border border-slate-700">Contractor</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Profit potential</td>
            <td class="p-2 border border-slate-700">Built into rates</td>
            <td class="p-2 border border-slate-700">Unlimited if efficient</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Accounting needs</td>
            <td class="p-2 border border-slate-700">Timekeeping focus</td>
            <td class="p-2 border border-slate-700">Minimal</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Best for</td>
            <td class="p-2 border border-slate-700">Uncertain scope</td>
            <td class="p-2 border border-slate-700">Defined requirements</td>
          </tr>
        </table>
        <p><strong>T&M vs. Cost-Plus:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Factor</th>
            <th class="p-2 border border-slate-700 text-white">T&M</th>
            <th class="p-2 border border-slate-700 text-white">Cost-Plus</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Accounting system</td>
            <td class="p-2 border border-slate-700">Basic timekeeping</td>
            <td class="p-2 border border-slate-700">Full cost system</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Rate structure</td>
            <td class="p-2 border border-slate-700">Fully loaded rates</td>
            <td class="p-2 border border-slate-700">Direct + indirect</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Audit intensity</td>
            <td class="p-2 border border-slate-700">Moderate</td>
            <td class="p-2 border border-slate-700">High (DCAA)</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Fee visibility</td>
            <td class="p-2 border border-slate-700">Hidden in rates</td>
            <td class="p-2 border border-slate-700">Separate line item</td>
          </tr>
        </table>
        <p><strong>When T&M makes sense:</strong></p>
        <ul>
          <li>Scope uncertain but not high-risk R&D</li>
          <li>Staff augmentation / support services</li>
          <li>You lack cost-type accounting system</li>
          <li>Government prefers simplified administration</li>
        </ul>
      `,
    },
    {
      heading: 'Winning T&M Competitions',
      content: `
        <p><strong>Rate competitiveness:</strong></p>
        <p>T&M competitions often focus heavily on rates. Strategies for competitive rates:</p>
        <ul>
          <li><strong>Right-size labor categories</strong> — Match categories to actual work requirements</li>
          <li><strong>Efficient indirect structure</strong> — Lower overhead = lower rates</li>
          <li><strong>Competitive direct labor</strong> — Know market rates for your geography</li>
          <li><strong>Reasonable profit</strong> — Don't price yourself out of competition</li>
        </ul>
        <p><strong>Technical approach:</strong></p>
        <p>Even on T&M, technical matters. Demonstrate:</p>
        <ul>
          <li>Understanding of requirements</li>
          <li>Qualified personnel (meet labor category requirements)</li>
          <li>Management approach</li>
          <li>Relevant experience</li>
        </ul>
        <p><strong>Staffing plan:</strong></p>
        <ul>
          <li>Show how you'll staff the contract</li>
          <li>Identify key personnel if required</li>
          <li>Demonstrate depth of qualified candidates</li>
        </ul>
        <p><strong>Past performance:</strong></p>
        <p>T&M evaluations consider <a href="/guides/past-performance">past performance</a> on similar work:</p>
        <ul>
          <li>Prior T&M contract performance</li>
          <li>Timekeeping compliance history</li>
          <li>Customer satisfaction</li>
        </ul>
        <p><strong>Avoiding common mistakes:</strong></p>
        <ul>
          <li>Don't underprice rates to win — you'll struggle to deliver quality</li>
          <li>Ensure proposed personnel actually meet category requirements</li>
          <li>Verify your rates cover all costs including profit</li>
        </ul>
      `,
    },
    {
      heading: 'Managing T&M Contract Performance',
      content: `
        <p><strong>Burn rate management:</strong></p>
        <p>On T&M, you're spending against a fixed ceiling. Manage carefully:</p>
        <ul>
          <li>Track hours and costs vs. ceiling weekly (at minimum)</li>
          <li>Project burn rate to completion</li>
          <li>Alert customer early if ceiling increase needed</li>
          <li>Never exceed ceiling without authorization</li>
        </ul>
        <p><strong>Efficiency incentives:</strong></p>
        <p>Unlike cost-plus, T&M creates some efficiency incentive:</p>
        <ul>
          <li>Profit is built into rates — faster work = same profit, less risk</li>
          <li>Finishing under ceiling leaves good impression for follow-on</li>
          <li>But don't sacrifice quality for speed</li>
        </ul>
        <p><strong>Scope management:</strong></p>
        <p>T&M doesn't mean unlimited work. The contract still has scope:</p>
        <ul>
          <li>Understand what's in scope vs. out of scope</li>
          <li>Document direction from customer</li>
          <li>Request ceiling increases for significant additional work</li>
        </ul>
        <p><strong>Labor category compliance:</strong></p>
        <p>Throughout performance, ensure personnel continue to meet requirements:</p>
        <ul>
          <li>Track certifications and their expiration</li>
          <li>Document experience accrual</li>
          <li>Get CO approval for personnel substitutions</li>
        </ul>
        <p><strong>Transition planning:</strong></p>
        <p>As ceiling approaches, plan for:</p>
        <ul>
          <li>Contract extension/modification if needed</li>
          <li>Orderly wind-down if not extended</li>
          <li>Knowledge transfer</li>
          <li>Staff reassignment</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What\'s the difference between T&M and Labor Hour contracts?',
      answer:
        'Labor Hour (LH) contracts pay hourly rates for labor only — no materials. T&M includes both labor at hourly rates and materials at cost (plus handling). Use LH when materials are negligible; use T&M when significant materials are expected.',
    },
    {
      question: 'Do I need a DCAA-approved accounting system for T&M?',
      answer:
        'Not typically. T&M requires good timekeeping systems but not the full cost accounting system required for cost-reimbursement contracts. You need accurate labor tracking by employee and category, but not the elaborate indirect cost tracking of cost-plus work.',
    },
    {
      question: 'Can I bill overtime on T&M contracts?',
      answer:
        'It depends on the contract. Some T&M contracts have separate overtime rates; others pay the standard rate regardless of hours. Premium overtime (1.5x, 2x) may or may not be authorized. Read your contract\'s labor rate provisions carefully.',
    },
    {
      question: 'What happens if I exceed the ceiling price?',
      answer:
        'You\'re responsible for costs above the ceiling unless the government modifies the contract to increase it. Never exceed the ceiling without written authorization. If you see the ceiling approaching, notify the CO immediately to either increase the ceiling or stop work.',
    },
    {
      question: 'How is profit built into T&M rates?',
      answer:
        'Profit is included in your fully-loaded hourly rates. When you calculate rates (direct labor + fringe + overhead + G&A + profit), the profit percentage is applied to the total. It\'s not visible as a separate line item like on cost-plus contracts.',
    },
    {
      question: 'Can the government audit my T&M contract?',
      answer:
        'Yes. While T&M doesn\'t have the intensive DCAA audit regime of cost-plus, the government can still audit. They verify: hours billed match hours worked, personnel meet category requirements, materials were actually purchased and used, and rates match contract rates. Keep documentation.',
    },
    {
      question: 'Do T&M rates need to match GSA Schedule rates?',
      answer:
        'Not necessarily, unless you\'re using your GSA Schedule as the contract vehicle. Standalone T&M contracts negotiate rates specifically for that procurement. However, GSA rates are often used as a reasonableness benchmark, so significant deviations may require justification.',
    },
    {
      question: 'Can I change labor rates during a T&M contract?',
      answer:
        'Only through a contract modification. T&M rates are fixed for the contract period unless the contract includes provisions for Economic Price Adjustment. If you need rate changes, request a modification from the CO with justification.',
    },
  ],
  cta: {
    heading: 'Price T&M Contracts Competitively',
    description:
      'T&M pricing requires understanding your true costs, market rates, and competitive positioning. Our training covers rate development, compliance, and T&M contract management.',
    buttonText: 'View Training Options',
    buttonHref: '/training',
  },
  relatedGuides: [
    'firm-fixed-price-contracts',
    'cost-plus-contracts',
    'cost-proposals',
    'gsa-schedule',
    'proposal-writing',
  ],
  publishedDate: '2026-04-07',
};
