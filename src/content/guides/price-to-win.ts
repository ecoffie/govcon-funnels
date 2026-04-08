import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'price-to-win',
  title: 'Price to Win (PTW): Competitive Pricing Strategy for Government Contracts',
  metaTitle: 'Price to Win Guide — Competitive Federal Proposal Pricing Strategy',
  metaDescription:
    'Learn price to win methodology for government contracts: competitive analysis, cost modeling, win probability optimization, and balancing price vs. technical scores.',
  keywords: [
    'price to win',
    'ptw',
    'competitive pricing',
    'proposal pricing',
    'government contract pricing',
    'best value',
    'lpta pricing',
    'win probability',
    'competitive analysis',
    'pricing strategy',
  ],
  heroSubtitle:
    'In best value competitions, the lowest price doesn\'t always win — but the wrong price always loses. Price to Win helps you find the sweet spot between competitive and profitable.',
  sections: [
    {
      heading: 'What Is Price to Win?',
      content: `
        <p><strong>Price to Win (PTW)</strong> is a methodology for determining the optimal price point that maximizes your probability of winning while maintaining acceptable profit margins.</p>
        <p><strong>PTW answers the question:</strong></p>
        <p>"What price gives us the best chance of winning this competition?"</p>
        <p><strong>PTW is NOT:</strong></p>
        <ul>
          <li>Simply pricing as low as possible</li>
          <li>Matching the government estimate</li>
          <li>Cost plus standard markup</li>
          <li>Guessing what competitors will bid</li>
        </ul>
        <p><strong>PTW IS:</strong></p>
        <ul>
          <li>Analysis-driven pricing strategy</li>
          <li>Balancing technical score and price</li>
          <li>Understanding evaluation methodology</li>
          <li>Competitive intelligence application</li>
        </ul>
        <p><strong>When PTW matters most:</strong></p>
        <ul>
          <li><strong>Best value tradeoff</strong> — Technical and price both evaluated</li>
          <li><strong>Competitive procurements</strong> — Multiple viable competitors</li>
          <li><strong>Must-win opportunities</strong> — Strategic captures</li>
          <li><strong>Recompetes</strong> — Defending or taking incumbency</li>
        </ul>
      `,
    },
    {
      heading: 'Understanding Evaluation Methods',
      content: `
        <p><strong>Your PTW strategy depends on how the government evaluates:</strong></p>
        <p><strong>Lowest Price Technically Acceptable (LPTA):</strong></p>
        <ul>
          <li>Meet technical requirements → lowest price wins</li>
          <li>No credit for exceeding requirements</li>
          <li>PTW = lowest sustainable price</li>
          <li>Focus on efficiency, not features</li>
        </ul>
        <p><strong>Best Value Tradeoff:</strong></p>
        <ul>
          <li>Technical excellence can justify higher price</li>
          <li>Evaluation weighs technical vs. price</li>
          <li>PTW = optimal price/technical balance</li>
          <li>More complex analysis required</li>
        </ul>
        <p><strong>Best Value - Technical Significantly More Important:</strong></p>
        <ul>
          <li>Price matters, but technical dominates</li>
          <li>Worth paying premium for higher scores</li>
          <li>PTW allows higher margins for strong technical</li>
        </ul>
        <p><strong>Best Value - Price Significantly More Important:</strong></p>
        <ul>
          <li>Closer to LPTA behavior</li>
          <li>Technical must meet threshold, then price decides</li>
          <li>PTW emphasizes cost efficiency</li>
        </ul>
        <p><strong>Read Section M carefully:</strong></p>
        <p>The evaluation criteria tell you exactly how to weight your PTW analysis. Understand what "significantly more important" or "approximately equal" means for your strategy.</p>
      `,
    },
    {
      heading: 'PTW Analysis Process',
      content: `
        <p><strong>Step 1: Understand the competitive landscape</strong></p>
        <ul>
          <li>Who are likely competitors?</li>
          <li>What are their cost structures?</li>
          <li>What's their likely technical approach?</li>
          <li>What's their win/loss history at this agency?</li>
        </ul>
        <p><strong>Step 2: Estimate the government's expectations</strong></p>
        <ul>
          <li>Independent Government Cost Estimate (IGCE) if available</li>
          <li>Historical pricing for similar work</li>
          <li>Budget constraints</li>
          <li>Agency pricing preferences</li>
        </ul>
        <p><strong>Step 3: Develop competitive price range</strong></p>
        <ul>
          <li>Low end: Minimum sustainable price</li>
          <li>High end: Maximum competitive price</li>
          <li>Target: Optimal balance point</li>
        </ul>
        <p><strong>Step 4: Model scenarios</strong></p>
        <ul>
          <li>Your price vs. predicted competitor prices</li>
          <li>Your technical score vs. predicted competitor scores</li>
          <li>Win probability at different price points</li>
        </ul>
        <p><strong>Step 5: Determine optimal price</strong></p>
        <ul>
          <li>Price that maximizes P(win) × profit</li>
          <li>Consider risk tolerance</li>
          <li>Factor in strategic value beyond this contract</li>
        </ul>
      `,
    },
    {
      heading: 'Competitive Intelligence for PTW',
      content: `
        <p><strong>Data sources for competitor analysis:</strong></p>
        <p><strong>Public sources:</strong></p>
        <ul>
          <li><strong>FPDS/USASpending</strong> — Historical contract values</li>
          <li><strong>GSA Schedules</strong> — Published labor rates</li>
          <li><strong>SAM.gov</strong> — Award announcements</li>
          <li><strong>FOIA requests</strong> — Pricing on past awards</li>
          <li><strong>SEC filings</strong> — Public company financials</li>
        </ul>
        <p><strong>Market intelligence:</strong></p>
        <ul>
          <li>Industry day attendance lists</li>
          <li>Teaming partner discussions</li>
          <li>Subcontractor quotes</li>
          <li>Trade publication analysis</li>
        </ul>
        <p><strong>Key data points to gather:</strong></p>
        <ul>
          <li>Competitor labor rates by category</li>
          <li>Typical indirect rate structures</li>
          <li>Fee/profit expectations</li>
          <li>Pricing on comparable recent awards</li>
          <li>Incumbent pricing (for recompetes)</li>
        </ul>
        <p><strong>Building competitor cost models:</strong></p>
        <p>Estimate competitor costs using:</p>
        <ul>
          <li>Their published rates (GSA, GSA Advantage)</li>
          <li>Industry benchmarks for overhead</li>
          <li>Known subcontractor pricing</li>
          <li>Historical bid patterns</li>
        </ul>
      `,
    },
    {
      heading: 'Balancing Price and Technical',
      content: `
        <p><strong>The tradeoff equation:</strong></p>
        <p>In best value, you're optimizing: <strong>Technical Score / Price</strong></p>
        <p><strong>Options to improve your position:</strong></p>
        <ul>
          <li>Higher technical score at same price</li>
          <li>Same technical score at lower price</li>
          <li>Significantly higher technical at moderately higher price</li>
        </ul>
        <p><strong>When to invest in technical:</strong></p>
        <ul>
          <li>Technical significantly more important than price</li>
          <li>You have discriminating features competitors lack</li>
          <li>Cost of technical investment is low vs. price impact</li>
          <li>Evaluation rewards innovation/excellence</li>
        </ul>
        <p><strong>When to focus on price:</strong></p>
        <ul>
          <li>LPTA or price-dominant evaluation</li>
          <li>Commodity-type services</li>
          <li>Technical approaches are similar across competitors</li>
          <li>Government has budget constraints</li>
        </ul>
        <p><strong>The "good enough" technical trap:</strong></p>
        <p>Don't gold-plate technical if it raises price without improving win probability. Extra features that evaluators don't value just make you more expensive.</p>
        <p><strong>The "race to bottom" price trap:</strong></p>
        <p>Don't underprice to the point you can't perform. Winning at an unsustainable price creates performance problems, CPARS issues, and long-term damage.</p>
      `,
    },
    {
      heading: 'PTW for Different Contract Types',
      content: `
        <p><strong>Firm Fixed Price (FFP):</strong></p>
        <ul>
          <li>All risk in your price</li>
          <li>PTW must include adequate contingency</li>
          <li>Competitors face same risk — factor into their likely bids</li>
          <li>Efficiency advantages create pricing room</li>
        </ul>
        <p><strong>Time & Materials (T&M):</strong></p>
        <ul>
          <li>Compete on labor rates</li>
          <li>PTW focuses on rate card optimization</li>
          <li>Consider hours estimates if evaluated</li>
          <li>Rate mix (senior vs. junior) matters</li>
        </ul>
        <p><strong>Cost Plus:</strong></p>
        <ul>
          <li>Compete on estimated costs and fee</li>
          <li>Indirect rates heavily scrutinized</li>
          <li>PTW involves rate optimization</li>
          <li>Realism evaluation — can't bid impossibly low</li>
        </ul>
        <p><strong>IDIQ Task Orders:</strong></p>
        <ul>
          <li>PTW at task order level</li>
          <li>Consider ceiling and ordering patterns</li>
          <li>Position for high-value task orders</li>
          <li>May accept lower margin on vehicle for strategic position</li>
        </ul>
        <p><strong>Options and CLINs:</strong></p>
        <ul>
          <li>How are options evaluated?</li>
          <li>Optimize across base and option years</li>
          <li>Consider CLIN-level pricing strategy</li>
        </ul>
      `,
    },
    {
      heading: 'Common PTW Mistakes',
      content: `
        <p><strong>Mistake 1: Ignoring competitor capabilities</strong></p>
        <p>Assuming competitors will bid high or have weak technical. Do your homework on who you're competing against.</p>
        <p><strong>Mistake 2: Over-relying on IGCE</strong></p>
        <p>The government estimate may be outdated, wrong, or based on different assumptions. It's one data point, not the answer.</p>
        <p><strong>Mistake 3: Pricing without solution</strong></p>
        <p>PTW should inform your technical approach, not be disconnected from it. Solution and price must be developed together.</p>
        <p><strong>Mistake 4: Static analysis</strong></p>
        <p>PTW should evolve as you learn more. Update as Q&A reveals information, competitors drop out, or requirements change.</p>
        <p><strong>Mistake 5: Forgetting execution</strong></p>
        <p>A winning price you can't execute destroys your business. Always validate that operations can deliver at your PTW.</p>
        <p><strong>Mistake 6: One-size-fits-all approach</strong></p>
        <p>PTW methodology varies by evaluation method, competition, and strategic importance. Adapt your approach.</p>
        <p><strong>Mistake 7: Anchoring on your costs</strong></p>
        <p>Your cost structure doesn't determine the market price. Competitors with different structures may bid differently. Focus on competitive position, not just your margins.</p>
      `,
    },
    {
      heading: 'PTW Tools and Techniques',
      content: `
        <p><strong>Sensitivity analysis:</strong></p>
        <p>Model win probability across price range:</p>
        <ul>
          <li>At $X, P(win) = Y%</li>
          <li>Find the "knee" where small price increases sharply reduce P(win)</li>
          <li>Identify price floor below which you can't perform</li>
        </ul>
        <p><strong>Monte Carlo simulation:</strong></p>
        <p>For complex evaluations:</p>
        <ul>
          <li>Model ranges for competitor prices and scores</li>
          <li>Run thousands of scenarios</li>
          <li>Identify price points with highest win probability</li>
        </ul>
        <p><strong>Decision matrices:</strong></p>
        <p>Compare scenarios:</p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Scenario</th>
            <th class="p-2 border border-slate-700 text-white">Price</th>
            <th class="p-2 border border-slate-700 text-white">P(Win)</th>
            <th class="p-2 border border-slate-700 text-white">Profit</th>
            <th class="p-2 border border-slate-700 text-white">Expected Value</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Aggressive</td>
            <td class="p-2 border border-slate-700">$8M</td>
            <td class="p-2 border border-slate-700">60%</td>
            <td class="p-2 border border-slate-700">$400K</td>
            <td class="p-2 border border-slate-700">$240K</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Target</td>
            <td class="p-2 border border-slate-700">$9M</td>
            <td class="p-2 border border-slate-700">45%</td>
            <td class="p-2 border border-slate-700">$700K</td>
            <td class="p-2 border border-slate-700">$315K</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Conservative</td>
            <td class="p-2 border border-slate-700">$10M</td>
            <td class="p-2 border border-slate-700">25%</td>
            <td class="p-2 border border-slate-700">$1M</td>
            <td class="p-2 border border-slate-700">$250K</td>
          </tr>
        </table>
        <p><strong>Wrap rate analysis:</strong></p>
        <p>Compare your loaded rates to market:</p>
        <ul>
          <li>Direct labor × wrap rate = burdened rate</li>
          <li>How do your wrap rates compare to competitors?</li>
          <li>Where can you find efficiency gains?</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'When should PTW analysis start?',
      answer:
        'PTW should start during capture, well before RFP release. Early analysis shapes your technical approach, teaming decisions, and bid/no-bid. Refine continuously through proposal development.',
    },
    {
      question: 'How accurate is PTW analysis?',
      answer:
        'PTW is informed estimation, not prediction. Accuracy depends on quality of competitive intelligence and understanding of evaluation criteria. Even imperfect PTW beats pricing without analysis.',
    },
    {
      question: 'Should PTW be done by pricing or capture?',
      answer:
        'Both. Capture provides competitive intelligence and strategy context. Pricing provides cost modeling and rate analysis. PTW requires collaboration between capture, pricing, and technical teams.',
    },
    {
      question: 'How do you PTW when you don\'t know competitors?',
      answer:
        'Research likely competitors based on incumbent, past bidders on similar work, companies at industry days. Model multiple competitor scenarios. Use conservative assumptions when uncertain.',
    },
    {
      question: 'What if PTW says we can\'t win?',
      answer:
        'That\'s valuable information. Consider: Can you change your cost structure? Find a lower-cost teaming partner? Offer different technical approach? If not, maybe this isn\'t the right opportunity.',
    },
    {
      question: 'Does PTW work for small businesses?',
      answer:
        'Yes. Small businesses often have cost structure advantages (lower overhead, competitive labor). PTW helps identify where those advantages create pricing room. Also helps avoid underpricing.',
    },
    {
      question: 'How does PTW handle uncertainty?',
      answer:
        'Use ranges, not point estimates. Model best case, worst case, and expected case for competitor pricing. Sensitivity analysis shows how results change with different assumptions.',
    },
    {
      question: 'Should you ever price below PTW?',
      answer:
        'Strategic buys (market entry, platform wins) may justify pricing below normal PTW. But understand the true cost and have a plan to recover margin. Never price below what you can deliver.',
    },
  ],
  cta: {
    heading: 'Optimize Your Competitive Position',
    description:
      'Price to Win analysis can mean the difference between winning and losing. Our team helps you develop data-driven pricing strategies that maximize both win probability and profitability.',
    buttonText: 'Get Pricing Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'cost-proposals',
    'capture-management',
    'bid-no-bid',
    'indirect-rates',
    'firm-fixed-price-contracts',
  ],
  publishedDate: '2026-04-07',
};
