import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'pricing-volume',
  title: 'Writing Pricing and Cost Volumes for Government Proposals',
  metaTitle: 'Pricing Volume Guide — Win Federal Contracts in 2026',
  metaDescription:
    'Master pricing and cost volume writing for government proposals. Learn price volume structure, basis of estimate, rate substantiation, subcontractor pricing, cost realism, and common pricing errors.',
  keywords: [
    'pricing volume',
    'cost volume',
    'government proposal pricing',
    'cost proposal',
    'basis of estimate',
    'rate substantiation',
    'labor rates',
    'indirect rates',
    'cost realism',
    'pricing strategy',
  ],
  heroSubtitle:
    'The pricing volume determines whether you win and whether you make money. Learn how to structure your price, substantiate rates, develop credible cost estimates, and avoid the pricing mistakes that sink proposals.',
  sections: [
    {
      heading: 'Understanding Pricing Volumes and Cost Volumes',
      content: `
        <p>The <strong>pricing volume</strong> (also called the cost volume) is where you present your proposed price or cost for performing the contract. Depending on the contract type and evaluation methodology, this volume serves different purposes.</p>
        <p>Key differences by contract type:</p>
        <ul>
          <li><strong>Firm Fixed Price (FFP)</strong> — You propose a total price for the work. The government cares primarily that your price is fair and reasonable. They may request a "price breakdown" showing how you arrived at the total, but detailed cost substantiation is usually not required. See our <a href="/guides/firm-fixed-price-contracts">FFP Contracts Guide</a>.</li>
          <li><strong>Cost-Reimbursement (Cost-Plus)</strong> — You propose estimated costs (labor, materials, travel, etc.) plus a fee. The government will conduct a <strong>cost realism analysis</strong> to determine if your costs are realistic, complete, and properly allocated. Detailed substantiation is required. See our <a href="/guides/cost-plus-contracts">Cost-Plus Contracts Guide</a>.</li>
          <li><strong>Time and Materials (T&M)</strong> — You propose hourly labor rates and material costs. The government evaluates whether your rates are fair and reasonable compared to market rates. See our <a href="/guides/time-and-materials-contracts">T&M Contracts Guide</a>.</li>
          <li><strong>Labor Hour</strong> — Similar to T&M but without materials. You propose fully-burdened labor rates for each labor category.</li>
        </ul>
        <p>Evaluation methodologies:</p>
        <ul>
          <li><strong>Lowest Price Technically Acceptable (LPTA)</strong> — Once you meet the technical threshold, the lowest price wins. Every dollar matters. Your pricing strategy should focus on efficiency and competitiveness while maintaining quality. See our <a href="/guides/price-to-win">Price to Win Guide</a>.</li>
          <li><strong>Best Value Trade-Off</strong> — The government weighs technical quality, past performance, and price. A higher-priced proposal can win if the technical approach is superior. Your pricing should be competitive but not necessarily the lowest.</li>
          <li><strong>Cost Realism</strong> — For cost-reimbursement contracts, the government adjusts your proposed costs to reflect what they believe is realistic. An unrealistically low cost proposal will be adjusted upward for evaluation purposes, potentially making you non-competitive.</li>
        </ul>
        <p>The pricing volume is evaluated separately from technical and management volumes to prevent price from biasing technical scoring. Never include pricing details in your technical volume unless specifically instructed by the RFP. Conversely, avoid technical justifications in your pricing volume — keep them separate.</p>
      `,
    },
    {
      heading: 'Price Volume Structure and Organization',
      content: `
        <p>A well-organized pricing volume makes it easy for evaluators to understand your cost buildup, verify compliance with solicitation requirements, and assess reasonableness. Follow the structure prescribed in Section L exactly. If no structure is specified, use this standard format.</p>
        <p>Standard pricing volume structure:</p>
        <ul>
          <li><strong>Summary pricing table</strong> — Start with a high-level summary showing total contract price broken down by major categories (Labor, ODCs, Materials, Subcontracts, Fee/Profit). This provides evaluators with an at-a-glance view before diving into details.</li>
          <li><strong>Labor costs</strong> — Present labor by category (e.g., Project Manager, Software Engineer III, Help Desk Technician) with hours, rates, and extended costs. Include base period and option years separately. Show your calculation: Hours × Rate = Total.</li>
          <li><strong>Labor rate substantiation</strong> — Explain how you determined each labor rate. Include base salary, fringe benefits, overhead, G&A, and fee/profit. Use a rate buildup table for transparency.</li>
          <li><strong>Other Direct Costs (ODCs)</strong> — Itemize travel, materials, equipment, software licenses, training, and other direct costs. Provide basis of estimate for each (e.g., "Travel: 4 trips × 2 people × $1,500/trip = $12,000").</li>
          <li><strong>Subcontractor costs</strong> — List each subcontractor with scope of work, hours/costs, and how they integrate with your team. Include subcontractor quotes or cost buildup if required.</li>
          <li><strong>Indirect rates</strong> — Present your overhead, G&A, and other indirect rates with supporting schedules. For DCAA-audited rates, reference the audit report. For forward pricing rates, show your calculation methodology. See our <a href="/guides/indirect-rates">Indirect Rates Guide</a>.</li>
          <li><strong>Fee or profit</strong> — State your proposed fee (for cost-plus) or profit (embedded in FFP rates). The government will evaluate whether your fee is reasonable given the contract type, risk, and complexity.</li>
          <li><strong>Basis of Estimate (BOE) narratives</strong> — For each major cost element, provide a narrative explaining your estimating methodology, assumptions, and supporting data. This is critical for cost realism evaluation.</li>
        </ul>
        <p>Use consistent formatting across all pricing tables. Common formats include:</p>
        <ul>
          <li>Separate tables for base period and each option year</li>
          <li>Column headers: Labor Category, Hours, Rate, Extended Cost</li>
          <li>Subtotals and grand totals clearly labeled</li>
          <li>Footnotes explaining any non-standard items</li>
        </ul>
        <p>Pro tip: Include a pricing compliance matrix that maps every cost element required by the solicitation (CDRLs, travel to specific locations, required certifications, etc.) to a line item in your pricing. This ensures you didn't miss anything and makes evaluation easier.</p>
      `,
    },
    {
      heading: 'Developing the Basis of Estimate (BOE)',
      content: `
        <p>The <strong>Basis of Estimate (BOE)</strong> is the narrative explanation of how you calculated each cost element. For cost-reimbursement contracts, the BOE is critical — it's what the government uses to assess cost realism. A weak BOE results in cost adjustments that hurt your competitiveness.</p>
        <p>Components of a strong BOE:</p>
        <ul>
          <li><strong>Estimating methodology</strong> — Explain how you estimated the cost. Common methods include:
            <ul>
              <li><strong>Parametric estimating</strong> — Using historical data and statistical relationships. "Based on our experience supporting similar networks, we estimate 0.5 FTE per 100 users. With 2,000 users, we require 10 FTE help desk staff."</li>
              <li><strong>Analogous estimating</strong> — Using costs from similar past contracts. "Our similar contract with [Agency] required 5,000 hours of software development for comparable functionality. We estimate 4,800 hours for this contract due to reuse of existing code."</li>
              <li><strong>Bottom-up estimating</strong> — Building the estimate from detailed work breakdown structure (WBS) elements. "We identified 47 specific tasks in the SOW, estimated hours for each, and summed to the total."</li>
              <li><strong>Vendor quotes</strong> — For materials, equipment, or subcontracts. "Based on a quote from [Vendor] dated [Date] for [specific item]."</li>
            </ul>
          </li>
          <li><strong>Assumptions</strong> — Document all assumptions underlying your estimate. "We assume the government will provide access to the existing network infrastructure within 30 days of award. If access is delayed, additional costs may be incurred."</li>
          <li><strong>Supporting data</strong> — Reference historical performance data, vendor quotes, industry benchmarks, or labor market data. "Based on Bureau of Labor Statistics data for [Job Title] in [Location], the median salary is $85,000. We propose $90,000 to attract top talent."</li>
          <li><strong>Reconciliation with SOW</strong> — Show how your estimate maps to specific SOW requirements. "SOW paragraph 3.2.1 requires weekly security scans. We estimate 2 hours per scan × 52 weeks = 104 hours annually."</li>
          <li><strong>Risk and contingency</strong> — Explain any contingency or risk reserves you've included. "We include a 5% management reserve to address unforeseen technical challenges, consistent with our historical experience on similar contracts."</li>
          <li><strong>Escalation factors</strong> — For multi-year contracts, explain how you escalated costs for inflation. "Labor rates escalate 3% annually based on the Employment Cost Index (ECI) for professional services."</li>
        </ul>
        <p>Format the BOE clearly. A common approach is to create a BOE table with columns for: Cost Element, Quantity, Unit Cost, Total Cost, and Basis/Rationale. This makes it easy for evaluators to review and verify each element.</p>
        <p>Example BOE table row:</p>
        <table border="1" cellpadding="4" style="border-collapse: collapse; width: 100%;">
          <tr><th>Cost Element</th><th>Quantity</th><th>Unit Cost</th><th>Total Cost</th><th>Basis of Estimate</th></tr>
          <tr><td>Project Manager</td><td>2,080 hrs</td><td>$95/hr</td><td>$197,600</td><td>1 FTE × 2,080 hrs/yr. Rate based on $75K base salary + 30% fringe + 15% overhead + 10% G&A + 8% profit. See rate buildup in Appendix A.</td></tr>
        </table>
      `,
    },
    {
      heading: 'Labor Rate Substantiation and Buildup',
      content: `
        <p>Labor rates are typically the largest cost component in government contracts. The government scrutinizes labor rates to ensure they're fair, reasonable, and properly calculated. You must substantiate every rate with a clear buildup showing how you arrived at the total.</p>
        <p>Standard labor rate buildup structure:</p>
        <ul>
          <li><strong>Base salary or wage</strong> — The gross annual salary or hourly wage for the labor category. "Software Engineer III base salary: $105,000/year ÷ 2,080 hours = $50.48/hour."</li>
          <li><strong>Fringe benefits</strong> — Health insurance, retirement contributions, payroll taxes, paid time off, etc. Express as a percentage of base salary or as a dollar amount. "Fringe: 28% of base salary = $29,400/year or $14.13/hour." See our <a href="/guides/fringe-benefit-calculations">Fringe Benefits Guide</a>.</li>
          <li><strong>Overhead</strong> — Indirect costs related to running your business that support direct labor (facilities, equipment, administrative staff, etc.). "Overhead: 18% of direct labor = $18.90/hour."</li>
          <li><strong>General & Administrative (G&A)</strong> — Company-wide expenses not captured in overhead (executive salaries, accounting, legal, marketing, etc.). "G&A: 12% of total cost = $11.21/hour."</li>
          <li><strong>Fee or profit</strong> — Your profit margin. "Fee: 8% = $8.38/hour."</li>
          <li><strong>Total fully-burdened rate</strong> — Sum of all components. "$50.48 + $14.13 + $18.90 + $11.21 + $8.38 = $103.10/hour."</li>
        </ul>
        <p>Present rate buildups in a table format for clarity:</p>
        <table border="1" cellpadding="4" style="border-collapse: collapse; width: 100%;">
          <tr><th>Component</th><th>Calculation</th><th>Amount</th></tr>
          <tr><td>Base Salary</td><td>$105,000 / 2,080 hrs</td><td>$50.48</td></tr>
          <tr><td>Fringe (28%)</td><td>$50.48 × 0.28</td><td>$14.13</td></tr>
          <tr><td>Overhead (18%)</td><td>($50.48 + $14.13) × 0.18</td><td>$11.63</td></tr>
          <tr><td>Subtotal</td><td></td><td>$76.24</td></tr>
          <tr><td>G&A (12%)</td><td>$76.24 × 0.12</td><td>$9.15</td></tr>
          <tr><td>Subtotal</td><td></td><td>$85.39</td></tr>
          <tr><td>Fee (8%)</td><td>$85.39 × 0.08</td><td>$6.83</td></tr>
          <tr><td><strong>Total Fully-Burdened Rate</strong></td><td></td><td><strong>$92.22</strong></td></tr>
        </table>
        <p>Substantiating each component:</p>
        <ul>
          <li><strong>Base salary</strong> — Reference salary surveys (BLS, Glassdoor, Salary.com), your company's historical salary data for similar positions, or job offers extended to candidates. For existing employees, reference their actual current salary.</li>
          <li><strong>Fringe</strong> — Provide a detailed fringe breakdown showing each element: FICA (7.65%), health insurance ($X per employee), 401k match (Y%), PTO (Z weeks), etc. Sum to the total fringe rate.</li>
          <li><strong>Indirect rates</strong> — If you have DCAA-audited rates, reference the audit report and fiscal year. If you don't, show your calculation using your company's financial data (indirect costs ÷ allocation base). See our <a href="/guides/indirect-rates">Indirect Rates Guide</a> and <a href="/guides/rate-development">Rate Development Guide</a>.</li>
          <li><strong>Fee/profit</strong> — Explain your proposed fee percentage and why it's reasonable. Typical fees range from 6-10% for cost-plus contracts depending on risk, complexity, and contract type. Reference comparable contracts or industry norms.</li>
        </ul>
        <p>Common mistakes in rate substantiation:</p>
        <ul>
          <li>Proposing rates without showing the buildup (immediate red flag)</li>
          <li>Using outdated indirect rates (use current or forward pricing rates for the period of performance)</li>
          <li>Double-counting costs (e.g., including paid time off in both fringe and productive hours calculation)</li>
          <li>Inconsistent application of indirect rates across labor categories</li>
          <li>Proposing unrealistically low salaries that suggest you can't attract qualified talent</li>
        </ul>
      `,
    },
    {
      heading: 'Subcontractor Pricing and Documentation',
      content: `
        <p>Subcontractor costs often represent 20-50% of total contract value. The government scrutinizes subcontractor pricing to ensure it's competitive, complete, and properly integrated with your overall approach.</p>
        <p>Best practices for subcontractor pricing:</p>
        <ul>
          <li><strong>Obtain formal quotes or proposals.</strong> Don't estimate subcontractor costs yourself. Request written quotes from potential subcontractors that detail their labor categories, rates, hours, and other costs. Include these quotes (or summaries) in your pricing volume.</li>
          <li><strong>Ensure consistency with technical volume.</strong> The subcontractor scope in your pricing must match what you described in your technical and management volumes. If your technical volume says "Subcontractor X will provide cybersecurity monitoring 24/7," your pricing must include sufficient hours to cover 24/7 operations.</li>
          <li><strong>Show subcontractor rate buildups.</strong> If the subcontractor is proposing labor, request their rate buildups showing base salary, fringe, overhead, G&A, and fee — just like your own rates. The government wants to verify subcontractor rates are reasonable.</li>
          <li><strong>Evaluate subcontractor pricing for reasonableness.</strong> Don't blindly accept inflated subcontractor quotes. If a subcontractor proposes $150/hour for a labor category that typically costs $90/hour, be prepared to negotiate or explain the premium. Your cost realism suffers if your subcontractor costs are unreasonable.</li>
          <li><strong>Disclose prime/sub relationships.</strong> If your subcontractor is a small business affiliate, a related entity, or has common ownership with your firm, disclose this. The government scrutinizes related-party transactions to prevent pass-through arrangements that inflate costs.</li>
          <li><strong>Address subcontractor risk.</strong> If a subcontractor quote seems low or incomplete, document this risk and your mitigation plan. "Subcontractor X's quote appears to underestimate travel costs. We have included a 10% contingency for potential travel cost growth."</li>
          <li><strong>Verify small business status.</strong> If you're claiming subcontractors toward small business participation goals, verify their certifications in SAM.gov. Miscounting a large business as small can result in compliance issues. See our <a href="/guides/small-business-participation">Small Business Participation Guide</a>.</li>
        </ul>
        <p>Subcontractor pricing table format:</p>
        <table border="1" cellpadding="4" style="border-collapse: collapse; width: 100%;">
          <tr><th>Subcontractor</th><th>Scope</th><th>Labor Cost</th><th>ODCs</th><th>Total Cost</th><th>SB Category</th></tr>
          <tr><td>ABC Cyber Solutions</td><td>24/7 SOC monitoring</td><td>$450,000</td><td>$25,000</td><td>$475,000</td><td>SDVOSB</td></tr>
          <tr><td>XYZ Training Corp</td><td>Cybersecurity training</td><td>$80,000</td><td>$5,000</td><td>$85,000</td><td>WOSB</td></tr>
        </table>
        <p>Include subcontractor letters of commitment or teaming agreements to prove you have real partnerships, not paper quotes. This strengthens both your technical and pricing credibility.</p>
      `,
    },
    {
      heading: 'Cost Realism and Government Adjustments',
      content: `
        <p>For cost-reimbursement contracts, the government conducts a <strong>cost realism analysis</strong> to determine whether your proposed costs are realistic, reflect a clear understanding of the requirements, and are consistent with your technical approach. Unrealistic costs (too low or too high) hurt your evaluation.</p>
        <p>What is cost realism?</p>
        <ul>
          <li><strong>Realistic</strong> — Costs are based on reasonable assumptions, sound estimating methods, and sufficient resources to accomplish the work as described in your technical volume.</li>
          <li><strong>Complete</strong> — All necessary costs are included. You haven't omitted required tasks, underestimated hours, or forgotten essential materials.</li>
          <li><strong>Consistent</strong> — Your costs align with your technical approach. If you propose a complex, labor-intensive solution, your labor hours should reflect that. If you propose automation to reduce effort, your hours should be lower than traditional approaches.</li>
        </ul>
        <p>How the government evaluates cost realism:</p>
        <ul>
          <li><strong>Compare to independent government estimate (IGE).</strong> The government develops its own cost estimate. Significant deviations (especially if you're much lower) trigger scrutiny and questions.</li>
          <li><strong>Cross-check with technical volume.</strong> Evaluators verify that your labor hours, skill mix, and resources match what you described technically. If your technical volume says you'll conduct weekly site visits but your travel budget is zero, that's a realism problem.</li>
          <li><strong>Assess risks of under-costing.</strong> If your costs are unrealistically low, the government may conclude you don't understand the requirement or that you'll be unable to perform without cost overruns. They may adjust your costs upward for evaluation purposes.</li>
          <li><strong>Evaluate indirect rates and fee.</strong> The government compares your proposed overhead, G&A, and fee to your historical rates, audited rates, and industry norms. Significant differences require explanation.</li>
        </ul>
        <p>Cost adjustments during evaluation:</p>
        <ul>
          <li>If the government believes your costs are too low, they adjust them upward to a "realistic" level before comparing proposals. This can make you non-competitive even if your proposed price was lowest.</li>
          <li>For example: You propose $5M. Competitor proposes $7M. Government determines your costs should realistically be $8M based on realism analysis. You're now evaluated as the higher-cost proposal ($8M vs. $7M) and lose.</li>
          <li>Conversely, if your costs are realistic and well-substantiated, the government may accept them as proposed, giving you a competitive advantage.</li>
        </ul>
        <p>Strategies to avoid cost realism problems:</p>
        <ul>
          <li><strong>Don't lowball to win.</strong> Unrealistically low costs are a false economy. They get adjusted upward and you lose anyway — or worse, you win and can't perform profitably.</li>
          <li><strong>Reconcile costs with your technical approach.</strong> Conduct an internal review to ensure every task in your technical volume is resourced in your cost volume. Use a traceability matrix.</li>
          <li><strong>Provide detailed BOEs.</strong> The more you explain your estimating rationale, the easier it is for evaluators to understand and accept your costs as realistic.</li>
          <li><strong>Benchmark against historical data.</strong> Reference your own past performance on similar contracts. "On our previous contract with [Agency], we performed similar work with 12 FTEs. We propose 13 FTEs here due to the larger user base."</li>
          <li><strong>Include contingency for risks.</strong> If there are uncertainties, include reasonable contingency or management reserve and explain it. This shows realistic thinking.</li>
        </ul>
        <p>Cost realism is not about being the cheapest — it's about being credible, complete, and consistent. A realistic cost proposal paired with a strong technical approach wins more often than a lowball bid.</p>
      `,
    },
    {
      heading: 'Common Pricing Errors That Cost You the Win',
      content: `
        <p>Pricing volumes are where many contractors lose winnable contracts. These common mistakes are easily avoidable with careful review and attention to detail.</p>
        <ul>
          <li><strong>Missing required cost elements.</strong> The SOW requires monthly reports but you didn't budget labor hours for report writing. The RFP requires travel to 5 regional sites but you only budgeted for 2 trips. Use a pricing compliance matrix to ensure every requirement is costed.</li>
          <li><strong>Math errors.</strong> Labor hours don't add up. Rate buildups have calculation mistakes. Subtotals don't match totals. Always have a second person review your pricing spreadsheets. Math errors undermine credibility and can result in rejection.</li>
          <li><strong>Inconsistency between base and option years.</strong> You escalate labor rates 3% annually but only increase them 1% in Year 2. Or you forget to escalate at all. Apply consistent escalation factors and document your methodology.</li>
          <li><strong>Unsupported rates.</strong> You propose labor rates with no buildup or explanation. This is an immediate red flag. Always show your work: base salary + fringe + overhead + G&A + fee = rate.</li>
          <li><strong>Using the wrong indirect rate period.</strong> You use FY2024 audited rates for a contract that will be performed in FY2026-2028. You should use forward pricing rates that reflect the period of performance.</li>
          <li><strong>Unrealistic labor categories or skill mix.</strong> You propose all senior-level staff when the work includes routine tasks that junior staff could handle. Or you propose all junior staff for highly complex work. Match skill mix to the work.</li>
          <li><strong>Forgetting to include costs for your own labor.</strong> You budget labor for technical staff but forget to include your own Project Manager hours, proposal coordinators, QA staff, etc. Account for all positions in your organizational chart.</li>
          <li><strong>Subcontractor costs don't match the technical volume.</strong> You say Subcontractor X will perform 30% of the work but they represent only 10% of your cost. This raises realism concerns.</li>
          <li><strong>Including unallowable costs.</strong> You include costs that FAR specifically disallows (lobbying, entertainment, bad debts, etc.). This shows you don't understand government cost principles. See our <a href="/guides/unallowable-costs">Unallowable Costs Guide</a>.</li>
          <li><strong>No basis of estimate.</strong> You present costs with no explanation of how you calculated them. BOEs are essential for cost realism evaluation.</li>
          <li><strong>Ignoring the evaluation methodology.</strong> For LPTA procurements, you propose premium costs when the government will award to the lowest technically acceptable price. For best value, you underprice and can't resource your technical approach adequately.</li>
        </ul>
        <p>Final pricing checklist before submission:</p>
        <ul>
          <li>All math verified by independent reviewer</li>
          <li>Every SOW requirement mapped to a cost line item</li>
          <li>Labor rates include complete buildups with substantiation</li>
          <li>Indirect rates are current and properly documented</li>
          <li>Subcontractor quotes are included and consistent with technical volume</li>
          <li>BOE narratives explain all major cost elements</li>
          <li>Option year escalation is consistent and documented</li>
          <li>No unallowable costs included</li>
          <li>Pricing volume follows Section L format requirements</li>
        </ul>
        <p>Invest time in your pricing volume. A well-substantiated, realistic, and compliant cost proposal paired with a strong technical approach is a winning combination. See our <a href="/guides/cost-proposals">Cost Proposals Guide</a> for additional strategies.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Should I be the lowest price or just competitive?',
      answer:
        'It depends on the evaluation methodology. For LPTA (Lowest Price Technically Acceptable), you must be the lowest price once you meet the technical threshold. For best value trade-off, you should be competitive but not necessarily lowest — a higher price can win if your technical approach is superior. Read Section M carefully to understand the evaluation criteria and weighting.',
    },
    {
      question: 'What if I don\'t have DCAA-audited indirect rates?',
      answer:
        'You can still propose rates, but you must substantiate them with your company\'s financial data. Show how you calculated overhead and G&A using your actual indirect costs and allocation bases. For small businesses without audited rates, the government may request additional documentation or conduct pre-award audits. Consider getting a forward pricing rate agreement (FPRA) to streamline future proposals.',
    },
    {
      question: 'How much profit or fee should I include?',
      answer:
        'Typical fees for cost-plus contracts range from 6-10% depending on contract type, risk, and complexity. Cost-Plus-Fixed-Fee (CPFF) fees are lower (6-8%) because risk is minimal. Cost-Plus-Incentive-Fee (CPIF) or Cost-Plus-Award-Fee (CPAF) fees can be higher (8-10%) due to performance risk. For FFP contracts, profit is embedded in your rates and total price; 10-15% is common. The government evaluates fee reasonableness using DD Form 1547 (weighted guidelines method).',
    },
    {
      question: 'Can I change my price after submission?',
      answer:
        'Generally no, unless the government requests a Best and Final Offer (BAFO) or allows price revisions during discussions. Attempting to revise your price unilaterally after submission is not allowed and can result in your proposal being rejected. Price your proposal carefully the first time.',
    },
    {
      question: 'What is the difference between a price proposal and a cost proposal?',
      answer:
        'A price proposal is for FFP contracts and presents your total price with a breakdown of how you calculated it. A cost proposal is for cost-reimbursement contracts and presents detailed estimated costs (labor, ODCs, subcontracts, indirects) plus fee. Cost proposals undergo detailed cost realism analysis; price proposals are evaluated primarily for fair and reasonable pricing.',
    },
    {
      question: 'Do I need to provide certified cost or pricing data?',
      answer:
        'Only if required by FAR 15.403-4 (Truth in Negotiations Act). Generally required for contracts exceeding $2 million unless an exception applies (commercial items, adequate price competition, prices set by regulation, etc.). If required, you must submit cost or pricing data on Table 15-2 format and certify its accuracy. Check the solicitation for specific TINA requirements.',
    },
    {
      question: 'How do I price option years?',
      answer:
        'Price each option year separately with escalation for inflation. Common escalation factors include 2-4% annually based on the Employment Cost Index (ECI), Consumer Price Index (CPI), or historical trends. Apply escalation consistently to labor rates and other costs. Option years are evaluated for cost realism but may not be exercised, so don\'t front-load costs in the base period.',
    },
    {
      question: 'What if my price is significantly higher than my competitors?',
      answer:
        'For best value procurements, a higher price can win if justified by superior technical approach and past performance. However, if you\'re significantly higher, you may not be competitive. Request a debrief after award to understand how your price compared and where you can improve. Consider whether you\'re over-engineering the solution, have inefficient processes, or high indirect rates that need attention.',
    },
  ],
  cta: {
    heading: 'Master Government Pricing Strategy',
    description:
      'Our Bootcamp covers pricing strategy, rate development, cost estimating, and proposal pricing so you can submit competitive, realistic, and winning cost proposals.',
    buttonText: 'Join the Bootcamp',
    buttonHref: '/bootcamp',
  },
  relatedGuides: [
    'proposal-writing',
    'cost-proposals',
    'indirect-rates',
    'rate-development',
    'price-to-win',
    'unallowable-costs',
  ],
  publishedDate: '2026-04-07',
};
