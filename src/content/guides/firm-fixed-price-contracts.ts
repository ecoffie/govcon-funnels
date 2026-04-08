import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'firm-fixed-price-contracts',
  title: 'Firm Fixed Price Contracts: Risks, Benefits, and When to Use FFP',
  metaTitle: 'Firm Fixed Price (FFP) Contracts [Guide] — Pricing Strategy & Risk Management',
  metaDescription:
    'Learn how firm fixed price contracts work in government contracting: risk allocation, when FFP is required, pricing strategies, and how to avoid common mistakes that destroy margins.',
  keywords: [
    'firm fixed price',
    'ffp contract',
    'fixed price contract',
    'government contract types',
    'ffp pricing',
    'fixed price risk',
    'contract types government',
    'far contract types',
    'ffp vs cost plus',
    'fixed price government contract',
  ],
  heroSubtitle:
    'Firm fixed price is the government\'s preferred contract type — and the riskiest for contractors. Price it right and you keep the profit. Price it wrong and losses come out of your pocket.',
  sections: [
    {
      heading: 'What Is a Firm Fixed Price Contract?',
      content: `
        <p>A <strong>Firm Fixed Price (FFP)</strong> contract is exactly what it sounds like: the price is fixed at award and doesn't change regardless of your actual costs. Deliver the work, get the agreed price. Period.</p>
        <p><strong>How FFP works:</strong></p>
        <ul>
          <li>You propose a <strong>single price</strong> for the defined work</li>
          <li>Government accepts (or negotiates) that price</li>
          <li>You perform the work and invoice the fixed amount</li>
          <li>If costs are lower than expected — you keep the savings</li>
          <li>If costs are higher than expected — you absorb the loss</li>
        </ul>
        <p><strong>The government's preferred type:</strong></p>
        <p>FFP is the <strong>default contract type</strong> under FAR (Federal Acquisition Regulation). The government prefers FFP because:</p>
        <ul>
          <li>Maximum risk transfer to contractor</li>
          <li>Budget certainty for the agency</li>
          <li>Minimal government oversight required</li>
          <li>Incentivizes contractor efficiency</li>
        </ul>
        <p><strong>When FFP is appropriate (per FAR 16.202):</strong></p>
        <ul>
          <li>Requirements are <strong>well-defined</strong></li>
          <li>Costs can be estimated with <strong>reasonable certainty</strong></li>
          <li><strong>Fair and reasonable</strong> price can be established at award</li>
        </ul>
        <p>If any of these conditions aren't met, other contract types may be more appropriate — but you'll still see FFP used in ambiguous situations.</p>
      `,
    },
    {
      heading: 'FFP Risk Allocation',
      content: `
        <p>The core of FFP is <strong>risk allocation</strong>: you take the performance risk, government gets price certainty.</p>
        <p><strong>Contractor bears:</strong></p>
        <ul>
          <li><strong>Cost overruns</strong> — If work costs more than you estimated, you absorb the loss</li>
          <li><strong>Schedule delays</strong> — Delays increase your costs without increasing revenue</li>
          <li><strong>Technical challenges</strong> — Problems you encounter are yours to solve</li>
          <li><strong>Estimating errors</strong> — Underestimate scope, underestimate profit</li>
          <li><strong>Inflation</strong> — On multi-year contracts, price increases come from your margin</li>
        </ul>
        <p><strong>Government bears:</strong></p>
        <ul>
          <li><strong>Requirements changes</strong> — If they change scope, they owe you an equitable adjustment</li>
          <li><strong>Defective specifications</strong> — Specs that can't work as written</li>
          <li><strong>Government-caused delays</strong> — Late decisions, delayed access, etc.</li>
        </ul>
        <p><strong>Key protection — Changes Clause:</strong></p>
        <p>Most FFP contracts include the Changes clause (FAR 52.243). If the government directs changes within scope, you're entitled to <a href="/guides/contract-modifications">equitable adjustment</a> — more money and/or time. Document changes carefully and submit requests for adjustment promptly.</p>
        <p><strong>The profit-loss spectrum:</strong></p>
        <ul>
          <li><strong>Best case:</strong> Efficient performance = high profit margin</li>
          <li><strong>Expected case:</strong> Normal performance = planned profit margin</li>
          <li><strong>Worst case:</strong> Problems = loss (potentially severe)</li>
        </ul>
      `,
    },
    {
      heading: 'Pricing FFP Contracts',
      content: `
        <p>FFP pricing is an art. Price too low and you lose money. Price too high and you lose the competition. Here's how to approach it.</p>
        <p><strong>Bottom-up pricing:</strong></p>
        <ol>
          <li><strong>Estimate direct costs</strong> — Labor hours by category, materials, subcontracts, travel, ODCs</li>
          <li><strong>Apply indirect rates</strong> — Fringe, overhead, G&A</li>
          <li><strong>Add profit</strong> — Typically 8-15% for services, varies for products</li>
          <li><strong>Add risk contingency</strong> — For unknowns and estimating uncertainty</li>
        </ol>
        <p><strong>Risk contingency on FFP:</strong></p>
        <p>Unlike cost-plus, you don't show contingency as a separate line. It's built into your pricing through:</p>
        <ul>
          <li>Conservative labor estimates</li>
          <li>Higher profit percentage</li>
          <li>Buffer in material/subcontract estimates</li>
        </ul>
        <p><strong>Common pricing mistakes:</strong></p>
        <ul>
          <li><strong>Optimistic labor estimates</strong> — Everything takes longer than you think</li>
          <li><strong>Ignoring ramp-up</strong> — New contracts have learning curves</li>
          <li><strong>Thin contingency</strong> — Unknown unknowns always emerge</li>
          <li><strong>Assuming stable requirements</strong> — Even FFP contracts change</li>
          <li><strong>Forgetting inflation</strong> — Multi-year FFP loses value over time</li>
        </ul>
        <p><strong>Price-to-win vs. price-to-perform:</strong></p>
        <p>There's tension between competitive pricing (to win) and realistic pricing (to perform). If price-to-win is below price-to-perform, seriously consider no-bid. Winning an unperformable contract is worse than losing it.</p>
      `,
    },
    {
      heading: 'FFP Variations',
      content: `
        <p>Not all "fixed price" contracts are identical. FAR defines several variations:</p>
        <p><strong>FFP (Firm Fixed Price):</strong></p>
        <p>The price doesn't change. Period. Most common type. Best for well-defined requirements.</p>
        <p><strong>FP-EPA (Fixed Price with Economic Price Adjustment):</strong></p>
        <p>Price can be adjusted for economic changes based on established indices (Bureau of Labor Statistics, etc.). Protects both parties from major market shifts on long-term contracts.</p>
        <p><strong>FP-IF (Fixed Price Incentive Firm):</strong></p>
        <p>Includes a target cost, target profit, ceiling price, and share ratio. If you beat the target, you share savings with government. If you exceed target, you share overruns — up to the ceiling, above which it becomes pure FFP (you eat all overruns).</p>
        <p><strong>FP-AF (Fixed Price Award Fee):</strong></p>
        <p>Base price plus potential award fee based on performance evaluation. Used when government wants to incentivize excellent (not just acceptable) performance.</p>
        <p><strong>FP-LOE (Fixed Price Level of Effort):</strong></p>
        <p>Fixed price for a specified level of effort (e.g., 10 FTEs for 12 months), not specific deliverables. Government gets the hours regardless of what's produced. Common for support services.</p>
        <p><strong>Understanding which variation:</strong></p>
        <p>Read the RFP carefully. The contract type affects your pricing strategy, risk exposure, and performance approach. Don't assume "fixed price" means pure FFP.</p>
      `,
    },
    {
      heading: 'Managing FFP Contract Performance',
      content: `
        <p>Once you win, performance management determines whether you make money or lose it.</p>
        <p><strong>Track costs relentlessly:</strong></p>
        <ul>
          <li>Know your budget burn rate weekly</li>
          <li>Compare actual vs. planned at task level</li>
          <li>Identify variances early — before they become crises</li>
          <li>Separate cost tracking from billing (you bill fixed amounts, but track actual costs)</li>
        </ul>
        <p><strong>Scope management:</strong></p>
        <p>The biggest risk to FFP profitability is <strong>scope creep</strong> — doing more work than the price covers. Protect yourself:</p>
        <ul>
          <li>Understand exactly what the contract requires</li>
          <li>Push back on work outside scope</li>
          <li>Document all direction from the government</li>
          <li>Submit REAs (Requests for Equitable Adjustment) for changes</li>
        </ul>
        <p><strong>Efficiency optimization:</strong></p>
        <ul>
          <li>Every dollar saved is a dollar of profit</li>
          <li>Invest in process improvement</li>
          <li>Use lessons learned from similar contracts</li>
          <li>Staff appropriately — not over or under</li>
        </ul>
        <p><strong>When things go wrong:</strong></p>
        <p>If you're heading toward loss:</p>
        <ul>
          <li>Identify causes immediately</li>
          <li>Look for changes clause relief (if scope changed)</li>
          <li>Negotiate with the CO if there are legitimate issues</li>
          <li>Cut costs where possible without affecting performance</li>
          <li>In worst case, understand termination implications</li>
        </ul>
      `,
    },
    {
      heading: 'FFP vs. Other Contract Types',
      content: `
        <p>Understanding alternatives helps you know when FFP is — or isn't — right.</p>
        <p><strong>FFP vs. Cost-Plus:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Factor</th>
            <th class="p-2 border border-slate-700 text-white">FFP</th>
            <th class="p-2 border border-slate-700 text-white">Cost-Plus</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Risk</td>
            <td class="p-2 border border-slate-700">Contractor bears</td>
            <td class="p-2 border border-slate-700">Government bears</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Profit potential</td>
            <td class="p-2 border border-slate-700">Higher if efficient</td>
            <td class="p-2 border border-slate-700">Capped percentage</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Oversight</td>
            <td class="p-2 border border-slate-700">Minimal</td>
            <td class="p-2 border border-slate-700">Extensive audits</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Best for</td>
            <td class="p-2 border border-slate-700">Well-defined work</td>
            <td class="p-2 border border-slate-700">R&D, uncertain scope</td>
          </tr>
        </table>
        <p><strong>FFP vs. Time & Materials:</strong></p>
        <ul>
          <li><strong>T&M:</strong> You're paid hourly rates × hours worked</li>
          <li><strong>FFP:</strong> Fixed price regardless of hours</li>
          <li>T&M reduces your risk but limits profit upside</li>
          <li>FFP creates incentive to be efficient</li>
        </ul>
        <p><strong>When to prefer FFP:</strong></p>
        <ul>
          <li>Requirements are clear and stable</li>
          <li>You can estimate costs accurately</li>
          <li>You have efficient delivery capability</li>
          <li>You want to maximize potential profit</li>
        </ul>
        <p><strong>When to avoid FFP:</strong></p>
        <ul>
          <li>Requirements are vague or likely to change</li>
          <li>Significant technical uncertainty</li>
          <li>You can't estimate costs with confidence</li>
          <li>Government insists on below-cost pricing</li>
        </ul>
      `,
    },
    {
      heading: 'Common FFP Pitfalls',
      content: `
        <p><strong>1. Buying in</strong></p>
        <p>"Buying in" means pricing below cost to win, planning to make it up on changes or follow-on. This is dangerous and sometimes illegal. Even if you survive the contract, you've trained the customer to expect unrealistic prices.</p>
        <p><strong>2. Ignoring the statement of work</strong></p>
        <p>Your price must cover ALL work in the SOW. Read every word. Hidden requirements you miss are your problem.</p>
        <p><strong>3. Unrealistic schedule assumptions</strong></p>
        <p>Faster schedules mean higher costs (overtime, additional staff). If the government's schedule is unrealistic, price accordingly or negotiate.</p>
        <p><strong>4. Not protecting against scope creep</strong></p>
        <p>Government representatives often ask for "just one more thing." Each addition erodes your margin. Be polite but firm: changes require contract modifications and equitable adjustments.</p>
        <p><strong>5. Failing to document changes</strong></p>
        <p>Verbal direction isn't enough. Get written authorization for any changed work. Confirm verbal instructions in writing. Build a file for potential REAs.</p>
        <p><strong>6. Misunderstanding contract deliverables</strong></p>
        <p>Know exactly what you must deliver to get paid. Ambiguous deliverables lead to disputes. Clarify during negotiations, not during performance.</p>
        <p><strong>7. Neglecting option pricing</strong></p>
        <p>Multi-year FFP contracts with options lock in prices for years. Account for inflation, rate increases, and changing conditions when pricing options.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Can I lose money on a firm fixed price contract?',
      answer:
        'Yes, absolutely. The "fixed" in FFP means the price doesn\'t increase even if your costs exceed your estimate. If you underestimate costs or encounter unexpected problems, losses come directly from your margin — and can exceed your margin. FFP contracts have bankrupted contractors who significantly underestimated costs.',
    },
    {
      question: 'What profit margin should I include in FFP pricing?',
      answer:
        'Typical profit margins for FFP services range from 8-15%, depending on risk and competition. Higher-risk work justifies higher margins. Commercial products may have different margins. The key is ensuring your total price (including profit) allows you to perform without loss while remaining competitive.',
    },
    {
      question: 'Can the government change an FFP contract?',
      answer:
        'Yes. The Changes clause (FAR 52.243) allows the contracting officer to direct changes within the general scope of the contract. However, you\'re entitled to an equitable adjustment for changes that increase your cost or time. Document all changes and submit timely requests for adjustment.',
    },
    {
      question: 'What\'s the difference between FFP and FP-LOE?',
      answer:
        'FFP pays a fixed price for specific deliverables — you must produce those deliverables regardless of hours worked. FP-LOE (Fixed Price Level of Effort) pays a fixed price for a specified amount of effort (e.g., 2,000 labor hours) regardless of output. FP-LOE shifts some risk back to the government because you get paid for hours, not results.',
    },
    {
      question: 'How do I handle FFP pricing for multi-year contracts?',
      answer:
        'Account for inflation and rate increases when pricing option years. Many contractors use escalation factors (2-3% per year) for labor rates. Lock in subcontractor pricing when possible. Consider requesting FP-EPA (Economic Price Adjustment) provisions for long contracts to protect against significant market changes.',
    },
    {
      question: 'Should I bid on FFP contracts if requirements are unclear?',
      answer:
        'Generally no. Unclear requirements + fixed price = high risk of loss. If you must bid, price conservatively with significant contingency, or ask clarifying questions during the solicitation period. Consider whether this opportunity is worth the risk.',
    },
    {
      question: 'How does invoicing work on FFP contracts?',
      answer:
        'Invoicing terms vary by contract. Common approaches: milestone payments (fixed amount at each milestone), progress payments (percentage of completion), or delivery payments (paid on delivery of each item). Read Section G of your contract for specific payment terms.',
    },
    {
      question: 'What happens if I can\'t complete an FFP contract?',
      answer:
        'The government can terminate for default, making you liable for excess reprocurement costs (what they pay someone else minus what they would have paid you). Alternatively, you might negotiate a termination for convenience, which limits your liability but still results in losses. Neither option is good — better to price realistically upfront.',
    },
  ],
  cta: {
    heading: 'Price FFP Contracts with Confidence',
    description:
      'FFP pricing is where contracts are won or lost. Our training covers cost estimation, risk pricing, and margin protection strategies to help you win profitable fixed-price work.',
    buttonText: 'View Training Options',
    buttonHref: '/training',
  },
  relatedGuides: [
    'cost-proposals',
    'cost-plus-contracts',
    'time-and-materials-contracts',
    'contract-modifications',
    'proposal-writing',
  ],
  publishedDate: '2026-04-07',
};
