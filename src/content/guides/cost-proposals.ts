import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'cost-proposals',
  title: 'Cost Proposals: How to Price Government Contracts and Win',
  metaTitle: 'Cost Proposals [Guide] — Price Government Contracts to Win',
  metaDescription:
    'Learn how to build cost proposals, calculate labor rates, price fixed-price vs cost-reimbursement contracts, and avoid pricing mistakes that lose competitions.',
  keywords: [
    'cost proposal',
    'government contract pricing',
    'labor rates government contracts',
    'cost reimbursement contract',
    'fixed price contract',
    'cost proposal template',
    'wrap rate',
    'indirect rates government',
    'pricing government contracts',
    'cost volume',
  ],
  heroSubtitle:
    'Price too high and you lose on cost. Price too low and you lose money — or the government questions your understanding. Learn how to build cost proposals that win and profit.',
  sections: [
    {
      heading: 'Understanding Government Contract Pricing',
      content: `
        <p>Government contract pricing isn't like commercial pricing. You can't just pick a number that sounds good. Federal Acquisition Regulation (FAR) requires pricing to be <strong>fair and reasonable</strong>, and evaluators scrutinize your costs.</p>
        <p><strong>Two fundamental approaches:</strong></p>
        <p><strong>Fixed-Price Contracts:</strong> You bid a set price for the entire scope. If costs exceed your bid, you absorb the loss. If you're efficient, you keep the profit. Most common for well-defined requirements.</p>
        <p><strong>Cost-Reimbursement Contracts:</strong> Government pays your actual allowable costs plus a fee. You don't profit from efficiency, but you're protected from cost overruns. Used when requirements are uncertain.</p>
        <p><strong>Why pricing matters:</strong></p>
        <ul>
          <li><strong>Technical proposals get you to the table</strong> — pricing determines if you win</li>
          <li><strong>Many competitions are LPTA</strong> — lowest price technically acceptable wins</li>
          <li><strong>Even "best value" evaluations</strong> — price is typically 30-50% of the score</li>
          <li><strong>Unrealistic pricing raises red flags</strong> — too low suggests you don't understand the work</li>
          <li><strong>Profitability determines sustainability</strong> — win but lose money and you're out of business</li>
        </ul>
        <p>The best cost proposals balance competitiveness with realism. You need to win AND make money.</p>
      `,
    },
    {
      heading: 'Building Block: Labor Rates and Wrap Rates',
      content: `
        <p>Labor is typically 60-80% of professional services contracts. Understanding labor rate components is essential:</p>
        <p><strong>Direct Labor Rate:</strong> What you pay the employee per hour.</p>
        <p><strong>Fringe Benefits:</strong> Health insurance, retirement, PTO, payroll taxes. Typically 25-40% of salary.</p>
        <p><strong>Overhead:</strong> Costs that support labor but aren't direct (facilities, management, IT support). Often 50-100%+ of direct labor.</p>
        <p><strong>General & Administrative (G&A):</strong> Corporate functions (HR, accounting, executive management). Typically 10-25%.</p>
        <p><strong>Fee/Profit:</strong> Your margin. Government contracts typically allow 8-15% profit on services.</p>
        <p><strong>The "wrap rate" calculation:</strong></p>
        <p>Your fully-loaded billing rate = Direct Labor × (1 + Fringe) × (1 + Overhead) × (1 + G&A) × (1 + Profit)</p>
        <p><strong>Example:</strong></p>
        <ul>
          <li>Direct Labor: $40/hour</li>
          <li>Fringe (35%): $40 × 1.35 = $54</li>
          <li>Overhead (60%): $54 × 1.60 = $86.40</li>
          <li>G&A (15%): $86.40 × 1.15 = $99.36</li>
          <li>Profit (10%): $99.36 × 1.10 = <strong>$109.30/hour billed</strong></li>
        </ul>
        <p>That $40/hour employee costs you $109+ per billable hour. If you don't account for all costs, you'll lose money on every hour worked.</p>
      `,
    },
    {
      heading: 'Fixed-Price Contract Pricing',
      content: `
        <p>On <strong>Firm Fixed-Price (FFP)</strong> contracts, your bid is your total payment. Price it right or suffer the consequences.</p>
        <p><strong>Estimating fixed-price work:</strong></p>
        <ol>
          <li><strong>Decompose the scope</strong> — Break requirements into discrete tasks</li>
          <li><strong>Estimate hours</strong> — How many labor hours per task?</li>
          <li><strong>Apply labor rates</strong> — Multiply hours × fully-loaded rates</li>
          <li><strong>Add other direct costs</strong> — Travel, materials, subcontracts</li>
          <li><strong>Include contingency</strong> — Buffer for unknowns (5-15% depending on risk)</li>
          <li><strong>Calculate total price</strong> — Sum of all costs plus profit</li>
        </ol>
        <p><strong>Common fixed-price mistakes:</strong></p>
        <ul>
          <li><strong>Underestimating hours</strong> — The #1 cause of unprofitable contracts</li>
          <li><strong>Forgetting indirect costs</strong> — Quoting direct labor only loses money</li>
          <li><strong>No contingency</strong> — Everything takes longer than planned</li>
          <li><strong>Optimistic assumptions</strong> — Assume things will go wrong, not right</li>
          <li><strong>Racing to the bottom</strong> — Winning at an unprofitable price is losing</li>
        </ul>
        <p><strong>When to walk away:</strong></p>
        <p>If you can't price competitively AND profitably, don't bid. Winning a money-losing contract hurts more than losing the competition. Know your floor price and don't go below it.</p>
        <p><strong>Fixed-price strategy:</strong></p>
        <ul>
          <li>Build your estimate bottom-up, then challenge every assumption</li>
          <li>Have someone independent review your hours estimate</li>
          <li>Research competitor pricing (GSA prices, award data)</li>
          <li>Include management reserve in your internal budget</li>
          <li>Track actual vs. estimated hours on every project to improve future bids</li>
        </ul>
      `,
    },
    {
      heading: 'Cost-Reimbursement Contract Pricing',
      content: `
        <p><strong>Cost-reimbursement contracts</strong> pay your actual allowable costs plus a fee. The government bears cost risk; you bear performance risk.</p>
        <p><strong>Types of cost-reimbursement contracts:</strong></p>
        <ul>
          <li><strong>Cost-Plus-Fixed-Fee (CPFF)</strong> — Fixed fee regardless of actual costs</li>
          <li><strong>Cost-Plus-Incentive-Fee (CPIF)</strong> — Fee varies based on cost performance</li>
          <li><strong>Cost-Plus-Award-Fee (CPAF)</strong> — Fee based on subjective performance evaluation</li>
        </ul>
        <p><strong>Cost proposal requirements:</strong></p>
        <p>Cost-reimbursement proposals require detailed cost breakdowns. FAR 15.408, Table 15-2 specifies required elements:</p>
        <ul>
          <li>Direct labor hours and rates by category</li>
          <li>Indirect rates (fringe, overhead, G&A) with basis of estimate</li>
          <li>Other direct costs itemized</li>
          <li>Subcontract costs with backup</li>
          <li>Travel estimates</li>
          <li>Fee/profit calculation</li>
        </ul>
        <p><strong>The importance of allowable costs:</strong></p>
        <p>Not all costs are reimbursable. FAR Part 31 defines "allowable" costs. Unallowable costs include:</p>
        <ul>
          <li>Entertainment and alcohol</li>
          <li>Lobbying and political contributions</li>
          <li>Certain legal costs</li>
          <li>Executive compensation above thresholds</li>
          <li>Marketing/advertising in most cases</li>
        </ul>
        <p>Bill an unallowable cost to a government contract and you'll have to pay it back — plus potentially face penalties.</p>
        <p><strong>Certified cost or pricing data:</strong></p>
        <p>For contracts over $2 million, you may need to certify that cost data is "accurate, complete, and current." If you certify inaccurate data and the government overpays, you're liable for the difference plus penalties (defective pricing).</p>
      `,
    },
    {
      heading: 'Time and Materials (T&M) Pricing',
      content: `
        <p><strong>Time and Materials</strong> contracts pay labor at fixed hourly rates plus actual material costs. They're a hybrid between fixed-price and cost-reimbursement.</p>
        <p><strong>T&M structure:</strong></p>
        <ul>
          <li><strong>Labor</strong> — Paid at fixed hourly rates (fully-loaded, including profit)</li>
          <li><strong>Materials</strong> — Reimbursed at actual cost (sometimes with handling fee)</li>
          <li><strong>Ceiling price</strong> — Maximum total contract value</li>
        </ul>
        <p><strong>Developing T&M labor rates:</strong></p>
        <p>Your T&M rates must cover all costs and profit. Unlike cost-reimbursement, you don't bill indirect rates separately — they're built into hourly rates.</p>
        <p><strong>Rate structure considerations:</strong></p>
        <ul>
          <li><strong>Labor categories</strong> — Define categories that match your workforce (Engineer I, II, III; Analyst; PM)</li>
          <li><strong>Rate escalation</strong> — Build in annual increases for multi-year contracts</li>
          <li><strong>Site rates</strong> — Different rates for on-site vs. off-site work</li>
          <li><strong>Overtime</strong> — Premium rates for overtime hours (if applicable)</li>
        </ul>
        <p><strong>Competing on T&M:</strong></p>
        <p>Evaluators often compare your rates to:</p>
        <ul>
          <li>GSA Schedule rates for similar labor</li>
          <li>Bureau of Labor Statistics data</li>
          <li>Department of Labor wage determinations</li>
          <li>Incumbent contract rates</li>
          <li>Competitor proposals</li>
        </ul>
        <p>Know what the market pays for your labor categories. Rates far above market need strong justification; rates far below suggest you'll staff with unqualified people.</p>
      `,
    },
    {
      heading: 'Pricing Strategy: Competitive Analysis',
      content: `
        <p>Smart pricing requires understanding the competitive landscape:</p>
        <p><strong>Research sources:</strong></p>
        <p><strong>GSA Schedule pricing:</strong> Schedule prices are public. Search GSA Advantage or eLibrary to see competitor rates. Your pricing should be in the same range unless you have a compelling differentiation story.</p>
        <p><strong>Award data:</strong> SAM.gov contract data shows what agencies have paid for similar work. Use our <a href="/tools/expiring-contracts">Expiring Contracts Finder</a> to research incumbent contract values.</p>
        <p><strong>DOL wage determinations:</strong> For Service Contract Act work, the Department of Labor sets minimum wages by location and occupation. Your pricing must at least cover these rates.</p>
        <p><strong>Competitor intelligence:</strong> Previous awards, GSA Schedules, and subcontractor relationships reveal competitor pricing patterns.</p>
        <p><strong>Pricing analysis approaches:</strong></p>
        <p><strong>1. Should-cost analysis</strong></p>
        <p>Build up what the work SHOULD cost based on labor hours, rates, and other costs. This is your baseline.</p>
        <p><strong>2. Competitive positioning</strong></p>
        <p>Where do you want to position? Lowest price? Middle of the pack? Premium with differentiation?</p>
        <p><strong>3. Price to win (PTW)</strong></p>
        <p>Estimate what price is needed to beat competitors. If PTW is below your floor, either find efficiencies or walk away.</p>
        <p><strong>4. Price-to-win vs. should-cost gap</strong></p>
        <p>If PTW < should-cost, you need to either find cost reductions or accept that winning may not be possible.</p>
      `,
    },
    {
      heading: 'Common Cost Proposal Mistakes',
      content: `
        <p>Avoid these pricing errors that lose competitions or money:</p>
        <p><strong>1. Leaving money on the table</strong></p>
        <p>Pricing 20% below competitors when 5% below would win. Research the market. Don't underprice unnecessarily — those are dollars out of your pocket.</p>
        <p><strong>2. Unrealistic labor hours</strong></p>
        <p>The most common estimating error. Always have someone independent sanity-check your hours. When in doubt, add hours, not cut them.</p>
        <p><strong>3. Forgetting "small" costs</strong></p>
        <p>Travel, training, equipment refresh, licenses, badges — small costs that add up. Build a comprehensive cost checklist and use it for every proposal.</p>
        <p><strong>4. Using wrong indirect rates</strong></p>
        <p>Applying overhead rates from one division to work performed by another. Using provisional rates when actuals are available. Indirect rate errors are common audit findings.</p>
        <p><strong>5. Misunderstanding contract type</strong></p>
        <p>Pricing a fixed-price contract like cost-reimbursement (no contingency). Pricing cost-reimbursement like fixed-price (leaving profit in labor rates). Match your approach to the contract type.</p>
        <p><strong>6. Unbalanced pricing</strong></p>
        <p>Front-loading profits in early CLINs, underpricing later work. Evaluators catch this. Price each line item based on its actual cost.</p>
        <p><strong>7. Inconsistent pricing</strong></p>
        <p>Technical proposal says 5 people; cost proposal budgets 4. Hours in one section don't match hours in another. Consistency errors suggest you don't understand your own proposal.</p>
        <p><strong>8. Ignoring fee/profit guidelines</strong></p>
        <p>Proposing 20% profit when the norm is 8-10%. High profits need justification. Unusually low profits raise concerns about performance capability.</p>
      `,
    },
    {
      heading: 'Building Your Cost Accounting System',
      content: `
        <p>Government contracting requires sophisticated cost tracking. Here's what you need:</p>
        <p><strong>Job cost accounting:</strong></p>
        <p>Every cost must be assigned to a specific contract or indirect pool. You can't just track total company expenses — you need project-level visibility.</p>
        <p><strong>Labor timekeeping:</strong></p>
        <p>Employees must record time by project, task, and sometimes activity. Timekeeping is audited. Establish rigorous time recording policies from day one.</p>
        <p><strong>Indirect rate pools:</strong></p>
        <p>Separate tracking for:</p>
        <ul>
          <li>Fringe benefits (payroll-based allocation)</li>
          <li>Overhead (labor-based or cost-based allocation)</li>
          <li>G&A (typically total cost input base)</li>
        </ul>
        <p><strong>DCAA compliance:</strong></p>
        <p>The Defense Contract Audit Agency (DCAA) audits contractor accounting systems. For large cost-reimbursement contracts, you may need a DCAA-approved accounting system. Requirements include:</p>
        <ul>
          <li>Segregation of direct and indirect costs</li>
          <li>Consistent cost allocation methods</li>
          <li>Adequate timekeeping</li>
          <li>Proper handling of unallowable costs</li>
          <li>Interim and final billing capabilities</li>
        </ul>
        <p><strong>Growing into compliance:</strong></p>
        <p>You don't need a perfect system on day one. But as contract volume grows:</p>
        <ol>
          <li>Start with basic job costing in QuickBooks or similar</li>
          <li>Implement formal timekeeping (even a spreadsheet at first)</li>
          <li>Calculate and track indirect rates</li>
          <li>Consider specialized government contracting software as you scale</li>
          <li>Engage a government contracts accountant before pursuing large cost-type contracts</li>
        </ol>
      `,
    },
  ],
  faqs: [
    {
      question: 'How do I determine competitive labor rates?',
      answer:
        'Research GSA Schedule rates for similar labor categories (public on GSA Advantage), review Department of Labor wage determinations for your area, check Bureau of Labor Statistics data, and research award values on similar contracts. Your rates should be in the market range unless you have specific justification for variance.',
    },
    {
      question: 'What profit margin is acceptable on government contracts?',
      answer:
        'For services, 8-15% profit is typical. The weighted guidelines method in FAR 15.404-4 considers contractor risk, investment, and performance. Higher margins are acceptable when you bear significant risk (fixed-price) or bring specialized capabilities. Cost-reimbursement typically has lower fees (6-10%) because the government bears cost risk.',
    },
    {
      question: 'What\'s the difference between direct and indirect costs?',
      answer:
        'Direct costs are specifically identifiable with a particular contract (labor on that project, materials for that deliverable). Indirect costs benefit multiple contracts and are allocated (rent, management salaries, company-wide IT). Proper classification is critical — mischarging direct costs as indirect (or vice versa) can result in audit findings.',
    },
    {
      question: 'Do I need a DCAA-approved accounting system?',
      answer:
        'Not always. DCAA approval is typically required for cost-reimbursement contracts over certain thresholds, or when specifically required by the solicitation. Fixed-price contracts generally don\'t require DCAA approval. However, having sound accounting practices benefits any contractor — it improves your own cost management regardless of government requirements.',
    },
    {
      question: 'How do I price work I\'ve never done before?',
      answer:
        'Research comparable contracts (what did others charge for similar work?), break the scope into components you can estimate, consult with subject matter experts who have done similar work, add contingency for unknowns, and be conservative. If you truly can\'t estimate the work reliably, consider whether you should bid at all.',
    },
    {
      question: 'What happens if I underprice a fixed-price contract?',
      answer:
        'You\'re obligated to perform at your bid price. If costs exceed price, you absorb the loss. Chronic underpricing can threaten your business viability. In extreme cases, you might negotiate with the contracting officer, but there\'s no guarantee of relief. Price fixed-price contracts carefully with appropriate contingency.',
    },
    {
      question: 'Should I price to win or price to be profitable?',
      answer:
        'Both. Winning unprofitable contracts isn\'t success — it\'s a path to business failure. Know your floor price (minimum to cover costs and reasonable profit). If the price-to-win is below your floor, either find legitimate cost reductions or walk away. Never sacrifice profitability just to win.',
    },
    {
      question: 'How do I handle subcontractor costs in my proposal?',
      answer:
        'Subcontractor costs are typically direct costs. Include their quotes in your proposal, apply your subcontract handling rate (usually G&A or a separate rate), and mark up for your management and risk. Ensure subcontractor quotes are competitive — evaluators may question inflated sub costs.',
    },
  ],
  cta: {
    heading: 'Master Government Contract Pricing',
    description:
      'Pricing wins or loses competitions. Our free course covers cost proposal development, rate calculations, and strategies that help you win profitably — not just win.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'proposal-writing',
    'rfp-response',
    'gsa-schedule',
    'simplified-acquisition',
  ],
  publishedDate: '2026-04-06',
};
