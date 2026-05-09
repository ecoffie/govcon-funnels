import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'bid-no-bid',
  title: 'Bid/No-Bid Decisions: How to Choose the Right Opportunities',
  metaTitle: 'Bid/No-Bid Decision [Framework] — Stop Wasting Time on Wrong Opportunities',
  metaDescription:
    'Learn how to evaluate government contract opportunities, make smart bid/no-bid decisions, calculate win probability, and focus resources on opportunities you can actually win.',
  keywords: [
    'bid no bid',
    'bid no bid decision',
    'bid decision',
    'opportunity assessment',
    'government contract opportunity',
    'win probability',
    'capture management',
    'proposal decision',
    'bid strategy',
    'go no go decision',
  ],
  heroSubtitle:
    'Every proposal costs money. Every loss costs more. The most important decision in government contracting isn\'t how to write the proposal — it\'s whether to write it at all.',
  sections: [
    {
      heading: 'Why Bid/No-Bid Decisions Matter',
      content: `
        <p>Proposals are expensive. A competitive federal proposal can cost $20,000-$200,000+ in staff time, consultants, and direct costs. And most proposals lose — typical win rates are 10-30%.</p>
        <p><strong>The math is brutal:</strong></p>
        <ul>
          <li>10 proposals at $50,000 each = $500,000 investment</li>
          <li>20% win rate = 2 wins</li>
          <li>Cost per win = $250,000</li>
        </ul>
        <p><strong>But selective bidding changes everything:</strong></p>
        <ul>
          <li>5 carefully selected proposals = $250,000 investment</li>
          <li>40% win rate (better selection) = 2 wins</li>
          <li>Cost per win = $125,000</li>
        </ul>
        <p>Same wins, half the cost. That's the power of disciplined bid/no-bid decisions.</p>
        <p><strong>Beyond money — opportunity cost:</strong></p>
        <p>Your proposal team can only work on so many opportunities. Time spent on a losing bid is time not spent on a winner. Every bad bid steals resources from good ones.</p>
        <p><strong>The goal:</strong></p>
        <p>Win rate matters more than proposal volume. Bid only opportunities where you have a credible path to winning. Let competitors waste resources on opportunities you know you'd lose.</p>
      `,
    },
    {
      heading: 'The Bid/No-Bid Decision Framework',
      content: `
        <p>Use a structured framework to evaluate opportunities consistently. Here are the key factors:</p>
        <p><strong>1. Can we win? (Competitive Position)</strong></p>
        <ul>
          <li>Do we meet the mandatory requirements?</li>
          <li>Do we have relevant past performance?</li>
          <li>Are we price competitive?</li>
          <li>Do we have customer relationships?</li>
          <li>What's our competitive advantage?</li>
        </ul>
        <p><strong>2. Should we win? (Strategic Fit)</strong></p>
        <ul>
          <li>Does this fit our strategic direction?</li>
          <li>Will we want to do this work?</li>
          <li>Does it build capabilities we need?</li>
          <li>Does it open doors to future opportunities?</li>
          <li>Is the customer one we want to grow with?</li>
        </ul>
        <p><strong>3. Can we execute? (Capability/Capacity)</strong></p>
        <ul>
          <li>Do we have the people to perform?</li>
          <li>Can we hire/subcontract what we lack?</li>
          <li>Do we have required facilities/equipment?</li>
          <li>Can we handle the security requirements?</li>
          <li>Is the timeline achievable?</li>
        </ul>
        <p><strong>4. Is it worth it? (Business Case)</strong></p>
        <ul>
          <li>What's the contract value and margin?</li>
          <li>What will pursuit cost?</li>
          <li>What's the probability of win?</li>
          <li>Does expected value justify investment?</li>
          <li>What's the cash flow timing?</li>
        </ul>
        <p>Score each factor. If any critical factor is a "no," the overall decision should be "no bid" unless there's a compelling strategic override.</p>
      `,
    },
    {
      heading: 'Key Indicators to Evaluate',
      content: `
        <p>Within the framework, these specific indicators predict win probability:</p>
        <p><strong>Positive indicators (bid):</strong></p>
        <ul>
          <li><strong>Incumbent advantage</strong> — You already do this work for this customer</li>
          <li><strong>Customer relationships</strong> — You know the decision-makers</li>
          <li><strong>Shaping history</strong> — You influenced the requirement</li>
          <li><strong>Perfect fit</strong> — Requirements match your exact capabilities</li>
          <li><strong>Weak competition</strong> — Few competitors, or they have weaknesses</li>
          <li><strong>Past performance home run</strong> — Nearly identical work, stellar ratings</li>
          <li><strong>Price advantage</strong> — Lower cost structure than competitors</li>
        </ul>
        <p><strong>Negative indicators (no-bid):</strong></p>
        <ul>
          <li><strong>Wired opportunity</strong> — Another contractor clearly favored. Research incumbents in our <a href="/data/contractors">Contractor Database</a></li>
          <li><strong>No customer contact</strong> — You found out at RFP release</li>
          <li><strong>Requirements mismatch</strong> — Significant gaps in your capabilities</li>
          <li><strong>No relevant past performance</strong> — Can't demonstrate similar success</li>
          <li><strong>Strong incumbent</strong> — Happy customer, performing well</li>
          <li><strong>Price disadvantage</strong> — Can't compete on cost</li>
          <li><strong>Insufficient proposal time</strong> — Can't prepare a quality response</li>
          <li><strong>Mandatory requirements missed</strong> — You simply don't qualify</li>
        </ul>
        <p><strong>The "found at RFP" test:</strong></p>
        <p>If you didn't know about this opportunity until the RFP was posted, your win probability is drastically lower. Winning contractors typically engage with opportunities 6-18 months before RFP release. Late discovery is a strong no-bid indicator.</p>
      `,
    },
    {
      heading: 'Calculating Win Probability (Pwin)',
      content: `
        <p><strong>Pwin</strong> (probability of win) quantifies your chances. While no formula is perfect, structured estimation beats gut feel.</p>
        <p><strong>Simple Pwin estimation:</strong></p>
        <ol>
          <li><strong>Start at base rate</strong> — If there are 5 expected bidders, base Pwin = 20%</li>
          <li><strong>Adjust for advantages</strong> — Incumbent +15-20%; strong relationships +10%; shaped requirements +10%</li>
          <li><strong>Adjust for disadvantages</strong> — Late discovery -10%; weak past performance -15%; price disadvantage -10%</li>
          <li><strong>Cap and floor</strong> — Rarely exceed 70% or fall below 5%</li>
        </ol>
        <p><strong>Example calculation:</strong></p>
        <ul>
          <li>Expected bidders: 4 (base Pwin = 25%)</li>
          <li>We have customer relationship (+10%)</li>
          <li>Solid past performance (+5%)</li>
          <li>But it's a late discovery (-10%)</li>
          <li>Strong incumbent (-15%)</li>
          <li>Estimated Pwin: 25 + 10 + 5 - 10 - 15 = <strong>15%</strong></li>
        </ul>
        <p><strong>Using Pwin for decisions:</strong></p>
        <ul>
          <li><strong>Pwin > 40%</strong> — Strong bid candidate; invest fully</li>
          <li><strong>Pwin 25-40%</strong> — Viable opportunity; bid with measured investment</li>
          <li><strong>Pwin 15-25%</strong> — Marginal; bid only if strategic value justifies risk</li>
          <li><strong>Pwin < 15%</strong> — Generally no-bid unless exceptional circumstances</li>
        </ul>
        <p><strong>Expected value calculation:</strong></p>
        <p>Expected Value = (Contract Value × Profit Margin × Pwin) - Pursuit Cost</p>
        <p>If Expected Value is negative, don't bid. Even if Pwin is 30%, a small contract with high pursuit costs isn't worth it.</p>
      `,
    },
    {
      heading: 'The Bid/No-Bid Process',
      content: `
        <p>Decisions improve with process. Establish a structured review:</p>
        <p><strong>Stage 1: Initial screening (opportunity identification)</strong></p>
        <p>Quick assessment when you first learn of an opportunity:</p>
        <ul>
          <li>Does it fit our market focus?</li>
          <li>Do we meet basic requirements (size, certifications)?</li>
          <li>Is the contract large enough to matter?</li>
          <li>Worth investing time to investigate further?</li>
        </ul>
        <p><strong>Stage 2: Detailed assessment (pre-RFP)</strong></p>
        <p>For opportunities that pass initial screen:</p>
        <ul>
          <li>Gather intelligence (customer meetings, incumbent research)</li>
          <li>Assess competition</li>
          <li>Evaluate technical fit in detail</li>
          <li>Develop preliminary win strategy</li>
          <li>Estimate Pwin</li>
        </ul>
        <p><strong>Stage 3: Formal bid decision (RFP release)</strong></p>
        <p>Final decision when RFP is in hand:</p>
        <ul>
          <li>Validate earlier assumptions against actual requirements</li>
          <li>Confirm resources available for proposal</li>
          <li>Final Pwin assessment</li>
          <li>Approve/deny pursuit</li>
        </ul>
        <p><strong>Decision authority:</strong></p>
        <p>Don't let any individual make bid decisions unilaterally. Establish a review team (capture manager, technical lead, BD executive) who evaluate opportunities against consistent criteria. This prevents both timid no-bids on good opportunities and optimistic bids on losers.</p>
        <p><strong>Document decisions:</strong></p>
        <p>Record why you bid or didn't bid. After award (win or lose), compare your prediction to reality. This feedback loop improves future decisions.</p>
      `,
    },
    {
      heading: 'Strategic Considerations',
      content: `
        <p>Sometimes strategic factors override pure Pwin calculations:</p>
        <p><strong>When to bid despite low Pwin:</strong></p>
        <ul>
          <li><strong>Must-win customer</strong> — Breaking into a strategic account may justify initial losses</li>
          <li><strong>Learning opportunity</strong> — First bid in new market teaches evaluation criteria</li>
          <li><strong>Protest potential</strong> — If you might protest, you need to bid first</li>
          <li><strong>Competitive blocking</strong> — Preventing a competitor from easy win has value</li>
          <li><strong>Relationship maintenance</strong> — Customer expects you to bid; not bidding damages relationship</li>
        </ul>
        <p><strong>When to no-bid despite high Pwin:</strong></p>
        <ul>
          <li><strong>Resource constraints</strong> — Can't staff this AND higher-priority pursuits</li>
          <li><strong>Strategic misfit</strong> — Winning pulls you in wrong direction</li>
          <li><strong>Problem customer</strong> — Past experience suggests pain exceeds profit</li>
          <li><strong>Margin concerns</strong> — Can win, but can't make money</li>
          <li><strong>Execution risk</strong> — Win is likely but successful performance isn't</li>
        </ul>
        <p><strong>Portfolio thinking:</strong></p>
        <p>Consider your pipeline as a portfolio. You want:</p>
        <ul>
          <li>Mix of high-probability near-term and strategic longer-term</li>
          <li>Diversification across customers and contract types</li>
          <li>Balance of recompetes (higher win rate) and new pursuits (growth)</li>
          <li>Total pursuit investment matched to capacity</li>
        </ul>
        <p>A single opportunity that consumes all your resources is risky even at 50% Pwin. Diversify.</p>
      `,
    },
    {
      heading: 'Common Bid Decision Mistakes',
      content: `
        <p>Avoid these errors that waste resources or miss opportunities:</p>
        <p><strong>1. Bidding everything</strong></p>
        <p>"We need revenue, so we bid everything." This dilutes resources across too many pursuits. Each proposal gets insufficient attention. Win rate plummets. Bid fewer, better opportunities.</p>
        <p><strong>2. Chasing revenue instead of profit</strong></p>
        <p>A $50M contract at 2% margin is worth less than a $10M contract at 15% margin. Don't let revenue size override profitability analysis.</p>
        <p><strong>3. Optimism bias</strong></p>
        <p>"We'll find a way to win." Capture managers are often optimists — it's what makes them good at pursuit. But optimism must be balanced with realistic assessment. Involve skeptics in bid decisions.</p>
        <p><strong>4. Sunk cost fallacy</strong></p>
        <p>"We've already invested so much in this pursuit." Past investment is gone regardless of decision. Evaluate based on future costs and Pwin, not what you've already spent.</p>
        <p><strong>5. Fear of saying no</strong></p>
        <p>"The customer will be upset if we don't bid." Maybe. But bidding a losing proposal wastes everyone's time. Customers respect contractors who know their strengths and bid strategically.</p>
        <p><strong>6. Late decisions</strong></p>
        <p>Delaying bid/no-bid until days before proposal deadline means you either rush a bad proposal or absorb sunk pursuit costs. Decide early.</p>
        <p><strong>7. Not learning from losses</strong></p>
        <p>Every loss contains lessons. Debrief lost opportunities: Was our Pwin estimate accurate? What did we miss? What would we do differently? Feed insights into future decisions.</p>
      `,
    },
    {
      heading: 'Building a Bid Decision Culture',
      content: `
        <p>Sustainable success requires organizational discipline around bid decisions:</p>
        <p><strong>Establish clear criteria</strong></p>
        <p>Document your bid/no-bid framework. What factors do you evaluate? What scores trigger bid vs. no-bid? Consistent criteria prevent ad-hoc decisions.</p>
        <p><strong>Require formal reviews</strong></p>
        <p>No pursuit above a threshold value without formal bid decision review. This prevents individuals from committing resources to questionable opportunities.</p>
        <p><strong>Track metrics</strong></p>
        <p>Monitor:</p>
        <ul>
          <li>Win rate (overall and by Pwin category)</li>
          <li>Pursuit cost per win</li>
          <li>Pwin accuracy (predicted vs. actual)</li>
          <li>Revenue from wins vs. pursuit investment</li>
        </ul>
        <p><strong>Reward discipline, not just wins</strong></p>
        <p>Capture managers who recommend no-bid on losing opportunities add as much value as those who win. Recognize good decisions, not just good outcomes.</p>
        <p><strong>Learn and iterate</strong></p>
        <p>Your framework should evolve. After each bid decision, compare prediction to outcome. Adjust criteria and weights based on what actually predicts wins in your market.</p>
        <p><strong>Balance short and long-term</strong></p>
        <p>Don't sacrifice strategic positioning for quarterly numbers. Some pursuits build capabilities or relationships that pay off later. Factor long-term value into decisions.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What win rate should I target?',
      answer:
        'Industry average is 15-25%. Well-managed capture organizations achieve 30-40%. Above 50% may indicate you\'re being too selective and missing good opportunities. Below 15% suggests you\'re bidding too many long shots. Track your win rate and adjust bid criteria to optimize the balance.',
    },
    {
      question: 'Should I bid on opportunities I find out about at RFP release?',
      answer:
        'Generally, no. Late discovery dramatically reduces win probability — competitors who engaged earlier have relationships, shaped requirements, and prepared solutions. Exceptions: your exact past performance matches the requirement, the competition is weak, or there\'s strategic value beyond this single win.',
    },
    {
      question: 'How much should I invest in pursuing an opportunity?',
      answer:
        'Common rule of thumb: pursuit investment (including proposal costs) should be 1-3% of contract value, scaled by Pwin. A $10M opportunity at 40% Pwin might justify $100-200K investment. Adjust based on your margins and competitive position.',
    },
    {
      question: 'What if my team disagrees on the bid decision?',
      answer:
        'Structured criteria help resolve disagreements. Score each factor independently, then compare scores. Where assessments differ, discuss the specific evidence. If disagreement persists, the ultimate decision authority (typically BD leadership) makes the call. Document dissenting views — they may prove prescient.',
    },
    {
      question: 'Should I bid to maintain a relationship even when I can\'t win?',
      answer:
        'Sometimes, but rarely. Submitting a non-competitive proposal wastes customer time and can actually damage relationships. Better approach: tell the customer early that you\'re not competitive and why. They\'ll respect your honesty. Maintain the relationship through other means.',
    },
    {
      question: 'How do I assess competition when I don\'t know who\'s bidding?',
      answer:
        'Research Sources Sought responses, attendees at industry days, companies with relevant past performance, and who\'s on applicable contract vehicles. Talk to your network. Make informed assumptions about likely competitors and their strengths. You won\'t have perfect information, but you can make educated estimates.',
    },
    {
      question: 'Is it ever okay to bid a "Hail Mary" opportunity?',
      answer:
        'Occasionally. If the opportunity is transformatively large, competition is surprisingly weak, or you have nothing to lose, a long-shot bid might make sense. But be honest about the odds. Don\'t convince yourself a Hail Mary is likely to succeed. Budget for the high probability of loss.',
    },
    {
      question: 'How early should I make bid/no-bid decisions?',
      answer:
        'As early as possible. Initial screen at opportunity identification. Detailed assessment well before RFP. Final confirmation at RFP release. Early no-bid decisions save pursuit costs. Late decisions waste resources and produce rushed, lower-quality proposals.',
    },
  ],
  cta: {
    heading: 'Win More by Bidding Smarter',
    description:
      'The best contractors don\'t bid the most — they bid the right opportunities. Our free course teaches you how to find, evaluate, and win federal contracts strategically.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'finding-government-contracts',
    'proposal-writing',
    'cost-proposals',
    'sources-sought',
    'past-performance',
  ],
  publishedDate: '2026-04-06',
};
