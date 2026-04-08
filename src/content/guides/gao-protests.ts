import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'gao-protests',
  title: 'GAO Protests: When and How to Challenge Contract Award Decisions',
  metaTitle: 'GAO Protest Guide — Filing, Timing & Strategy for Bid Protests',
  metaDescription:
    'Learn how GAO bid protests work: when to protest, filing requirements, timeline, CICA stay, and strategies for challenging government contract award decisions.',
  keywords: [
    'gao protest',
    'bid protest',
    'contract protest',
    'cica stay',
    'gao bid protest',
    'protest timeline',
    'government protest',
    'award challenge',
    'protest decision',
    'protest filing',
  ],
  heroSubtitle:
    'GAO protests are the most common way to challenge government contract awards. Win rate is about 20-25%, but even unsuccessful protests often result in corrective action. Know when to fight.',
  sections: [
    {
      heading: 'What Is a GAO Protest?',
      content: `
        <p>A <strong>GAO protest</strong> is a formal challenge to a federal contract award (or solicitation terms) filed with the Government Accountability Office. GAO is an independent, nonpartisan agency that serves as the "congressional watchdog."</p>
        <p><strong>What you can protest:</strong></p>
        <ul>
          <li>Contract award decisions</li>
          <li>Solicitation terms or specifications</li>
          <li>Cancellation of solicitations</li>
          <li>Exclusion from the competitive range</li>
          <li>Small business size determinations (to SBA, not GAO)</li>
        </ul>
        <p><strong>GAO's authority:</strong></p>
        <p>GAO reviews protests and issues decisions. If GAO sustains your protest, it recommends corrective action to the agency. Agencies comply with GAO recommendations in about 99% of cases.</p>
        <p><strong>Protest outcomes:</strong></p>
        <ul>
          <li><strong>Sustained</strong> — GAO found merit; recommends corrective action</li>
          <li><strong>Denied</strong> — GAO found no merit; award stands</li>
          <li><strong>Dismissed</strong> — Protest procedurally defective or untimely</li>
          <li><strong>Agency takes corrective action</strong> — Agency fixes issue before GAO decides</li>
        </ul>
        <p><strong>GAO vs. Court of Federal Claims:</strong></p>
        <p>Both hear bid protests. GAO is faster (100-day decision) and cheaper. Court of Federal Claims is more formal, allows discovery, and decisions are binding (GAO's are recommendations).</p>
      `,
    },
    {
      heading: 'When to File a GAO Protest',
      content: `
        <p><strong>Strict filing deadlines (4 CFR 21.2):</strong></p>
        <p><strong>Pre-award protests:</strong></p>
        <p>Challenge solicitation terms before proposal due date. Must file before:</p>
        <ul>
          <li>Bid opening (sealed bidding), OR</li>
          <li>Closing date for receipt of proposals</li>
        </ul>
        <p><strong>Post-award protests:</strong></p>
        <p>Challenge award decision within <strong>10 calendar days</strong> after either:</p>
        <ul>
          <li>Contract award, OR</li>
          <li>Date you knew or should have known the basis for protest</li>
          <li><strong>5 calendar days</strong> after debriefing (if required and requested)</li>
        </ul>
        <p><strong>Critical timing issues:</strong></p>
        <ul>
          <li><strong>Missing the deadline = dismissal</strong> — No exceptions</li>
          <li>Debriefing extends deadline ONLY if you requested it within 3 days of award</li>
          <li>"Should have known" is strictly interpreted — public information counts</li>
        </ul>
        <p><strong>Strategic timing considerations:</strong></p>
        <ul>
          <li>Always request a debriefing to maximize time for analysis</li>
          <li>Prepare protest grounds in advance if you sense problems</li>
          <li>Don't wait until the last day — technical issues can arise</li>
        </ul>
      `,
    },
    {
      heading: 'Protest Grounds: What Can You Challenge?',
      content: `
        <p><strong>Common successful protest grounds:</strong></p>
        <p><strong>Evaluation errors:</strong></p>
        <ul>
          <li>Agency didn't follow stated evaluation criteria</li>
          <li>Unreasonable evaluation conclusions</li>
          <li>Disparate treatment between offerors</li>
          <li>Failure to document evaluation rationale</li>
        </ul>
        <p><strong>Solicitation defects:</strong></p>
        <ul>
          <li>Unduly restrictive requirements</li>
          <li>Ambiguous specifications</li>
          <li>Missing or unclear evaluation factors</li>
        </ul>
        <p><strong>Discussions issues:</strong></p>
        <ul>
          <li>Unequal discussions</li>
          <li>Misleading discussions</li>
          <li>Improper reopening of discussions</li>
        </ul>
        <p><strong>Best value determination errors:</strong></p>
        <ul>
          <li>Improper price/technical tradeoff</li>
          <li>Failure to consider all evaluation factors</li>
          <li>Unreasonable source selection decision</li>
        </ul>
        <p><strong>Weak protest grounds:</strong></p>
        <ul>
          <li>Disagreeing with agency's judgment (without showing unreasonableness)</li>
          <li>Minor procedural errors that didn't affect outcome</li>
          <li>General allegations without specific facts</li>
          <li>Price is too low (absent showing of technical non-conformance)</li>
        </ul>
        <p><strong>You must show prejudice:</strong></p>
        <p>Even with evaluation errors, you must show the error affected the outcome — that you had a reasonable chance of award absent the error.</p>
      `,
    },
    {
      heading: 'The CICA Stay: Stopping Contract Performance',
      content: `
        <p><strong>What is the CICA stay?</strong></p>
        <p>The Competition in Contracting Act (CICA) automatically stays (suspends) contract performance when a protest is filed within 10 days of award. This is powerful leverage.</p>
        <p><strong>Stay requirements:</strong></p>
        <ul>
          <li>Protest filed within <strong>10 calendar days</strong> of award (or 5 days after debriefing)</li>
          <li>Contract not yet performed substantially</li>
          <li>Notice provided to contracting officer</li>
        </ul>
        <p><strong>Effect of the stay:</strong></p>
        <ul>
          <li>Agency cannot proceed with award/performance</li>
          <li>Incumbent may continue under bridge contract</li>
          <li>Stay lasts until GAO decision (up to 100 days)</li>
        </ul>
        <p><strong>Override of stay:</strong></p>
        <p>Agency can override the stay based on:</p>
        <ul>
          <li><strong>Urgent and compelling circumstances</strong></li>
          <li><strong>Best interests of the United States</strong></li>
        </ul>
        <p>Override requires senior agency official approval and written justification. Overrides are documented and can be challenged.</p>
        <p><strong>Missing the stay window:</strong></p>
        <p>If you protest after 10 days (but within the debriefing window), no automatic stay. You can request GAO to recommend suspension, but it's discretionary and rarely granted.</p>
      `,
    },
    {
      heading: 'Filing Your Protest',
      content: `
        <p><strong>Where to file:</strong></p>
        <p>GAO accepts protests electronically through EPDS (Electronic Protest Docketing System) at <a href="https://epds.gao.gov" target="_blank">epds.gao.gov</a>.</p>
        <p><strong>Required content (4 CFR 21.1):</strong></p>
        <ul>
          <li>Protester's name, address, contact information</li>
          <li>Contracting agency and solicitation/contract number</li>
          <li>Detailed statement of legal and factual grounds</li>
          <li>Explanation of how protester was prejudiced</li>
          <li>Copies of relevant documents</li>
          <li>Request for ruling on each issue</li>
        </ul>
        <p><strong>Protest structure:</strong></p>
        <ol>
          <li><strong>Introduction</strong> — Overview and relief requested</li>
          <li><strong>Statement of facts</strong> — Procurement history, your participation</li>
          <li><strong>Legal grounds</strong> — Specific allegations with FAR/case citations</li>
          <li><strong>Prejudice argument</strong> — How errors affected you</li>
          <li><strong>Conclusion</strong> — Requested corrective action</li>
        </ol>
        <p><strong>Filing fee:</strong></p>
        <p>None for GAO protests. However, significant attorney fees for preparation — protests typically cost $20,000-$100,000+ in legal fees.</p>
        <p><strong>Simultaneous notice:</strong></p>
        <p>You must provide a copy of your protest to the contracting officer within 1 day of filing. Failure to do so can result in dismissal.</p>
      `,
    },
    {
      heading: 'The Protest Process',
      content: `
        <p><strong>Timeline (100-day process):</strong></p>
        <ul>
          <li><strong>Day 0</strong> — Protest filed</li>
          <li><strong>Day 1</strong> — Notice to contracting officer</li>
          <li><strong>Day 30</strong> — Agency report due</li>
          <li><strong>Day 35</strong> — Protester's comments on agency report due</li>
          <li><strong>Day 100</strong> — GAO decision deadline</li>
        </ul>
        <p><strong>Agency report:</strong></p>
        <p>Agency submits a report including:</p>
        <ul>
          <li>Legal memorandum responding to protest grounds</li>
          <li>Contracting officer's statement</li>
          <li>Relevant documents (solicitation, proposals, evaluation records)</li>
        </ul>
        <p><strong>Protester's comments:</strong></p>
        <p>After receiving the agency report, you can:</p>
        <ul>
          <li>Respond to agency's arguments</li>
          <li>Supplement grounds based on new information</li>
          <li>Narrow or expand issues</li>
        </ul>
        <p><strong>ADR (Alternative Dispute Resolution):</strong></p>
        <p>GAO offers outcome prediction (informal assessment) and flexible procedures to encourage resolution without full decision. Often effective.</p>
        <p><strong>Hearing:</strong></p>
        <p>GAO may hold a hearing if factual issues require witness testimony. Relatively rare — most protests decided on the written record.</p>
        <p><strong>GAO decision:</strong></p>
        <p>Written decision explaining GAO's analysis and conclusions. Published on GAO website (with redactions for protected information).</p>
      `,
    },
    {
      heading: 'Corrective Action and Remedies',
      content: `
        <p><strong>If your protest is sustained:</strong></p>
        <p>GAO recommends corrective action. Typical recommendations:</p>
        <ul>
          <li>Re-evaluate proposals</li>
          <li>Conduct new discussions</li>
          <li>Amend solicitation and allow revised proposals</li>
          <li>Terminate award and re-compete</li>
          <li>Award contract to protester (rare)</li>
        </ul>
        <p><strong>Reimbursement of costs:</strong></p>
        <p>If sustained, GAO may recommend reimbursement of:</p>
        <ul>
          <li>Protest filing costs (attorney fees)</li>
          <li>Proposal preparation costs (if award recommended)</li>
        </ul>
        <p>Costs are negotiated with the agency — not automatically paid.</p>
        <p><strong>Agency corrective action before decision:</strong></p>
        <p>Agencies often take corrective action during the protest process to avoid a decision. If corrective action addresses your concerns, GAO dismisses the protest as academic.</p>
        <p><strong>What corrective action doesn't guarantee:</strong></p>
        <ul>
          <li>That you'll win on re-evaluation</li>
          <li>That errors won't recur</li>
          <li>That incumbent won't be re-awarded</li>
        </ul>
        <p>Corrective action gives you a fair shot — not a guaranteed win.</p>
        <p><strong>Protesting the corrective action:</strong></p>
        <p>If agency's corrective action is inadequate or creates new errors, you can file a new protest challenging the re-procurement.</p>
      `,
    },
    {
      heading: 'Strategic Considerations',
      content: `
        <p><strong>Should you protest?</strong></p>
        <p>Consider:</p>
        <ul>
          <li><strong>Strength of your grounds</strong> — Do you have specific, documentable errors?</li>
          <li><strong>Prejudice</strong> — Would you have won without the errors?</li>
          <li><strong>Cost/benefit</strong> — Legal fees vs. contract value</li>
          <li><strong>Customer relationship</strong> — Protests strain relationships</li>
          <li><strong>Market position</strong> — Are there other opportunities with this customer?</li>
        </ul>
        <p><strong>When protests make sense:</strong></p>
        <ul>
          <li>Clear evaluation errors with documentary support</li>
          <li>Large contract value justifies legal costs</li>
          <li>Important precedent for future competitions</li>
          <li>Incumbent protection or favoritism evident</li>
        </ul>
        <p><strong>When to think twice:</strong></p>
        <ul>
          <li>Your proposal was genuinely weaker</li>
          <li>Errors were minor/harmless</li>
          <li>Repeat business with customer matters more</li>
          <li>Weak grounds = wasted money and burned bridges</li>
        </ul>
        <p><strong>Relationship impact:</strong></p>
        <p>Protests are adversarial. Even successful protests can damage customer relationships. Consider whether the contract is worth potential friction with the agency.</p>
        <p><strong>Protest as business strategy:</strong></p>
        <p>Some contractors use protests strategically — to delay incumbents, force better pricing, or gain insight into competition. This is legal but may backfire if overused.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How much does a GAO protest cost?',
      answer:
        'Attorney fees typically range from $20,000 for simple protests to $100,000+ for complex cases. There\'s no filing fee, but legal representation is practically required. Weigh costs against contract value and win probability.',
    },
    {
      question: 'What is the GAO protest success rate?',
      answer:
        'Sustain rate is about 12-15% of decided cases. However, agencies take corrective action in another 40-50% of protests, often achieving protester\'s goals without a decision. The "effectiveness rate" (sustain + corrective action) is closer to 45-50%.',
    },
    {
      question: 'Can I file a GAO protest without an attorney?',
      answer:
        'Yes, but it\'s inadvisable. GAO protests involve complex procedural rules and legal arguments. Pro se protesters rarely succeed. The cost of losing (foregone contract value) usually exceeds attorney fees.',
    },
    {
      question: 'Can I protest a task order under an IDIQ?',
      answer:
        'Task order protests have restrictions. For civilian agencies, orders over $10 million can be protested at GAO. For DoD, the threshold is $25 million. Below these thresholds, protest rights are very limited.',
    },
    {
      question: 'What is "competitive prejudice"?',
      answer:
        'You must show the agency\'s error prejudiced you — that you had a reasonable chance of award absent the error. A protester ranked far below the awardee may not show prejudice even if evaluation errors occurred.',
    },
    {
      question: 'Can I add protest grounds after filing?',
      answer:
        'You can supplement grounds based on information learned from the agency report (which you couldn\'t have known earlier). You cannot add new grounds you should have raised initially — late grounds are time-barred.',
    },
    {
      question: 'What happens if the agency overrides the CICA stay?',
      answer:
        'Contract performance proceeds despite the pending protest. If GAO later sustains the protest, remedy options are limited — you may receive protest costs but rarely contract termination and re-award.',
    },
    {
      question: 'Can I protest and then withdraw?',
      answer:
        'Yes. Protesters often withdraw after reviewing the agency report (which reveals evaluation details) or after agency takes partial corrective action. Withdrawal ends the protest without GAO decision.',
    },
  ],
  cta: {
    heading: 'Know When to Fight',
    description:
      'GAO protests are serious business decisions. Our team helps you evaluate protest grounds, understand your odds, and make informed decisions about challenging contract awards.',
    buttonText: 'Get Expert Analysis',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'debriefings',
    'proposal-writing',
    'past-performance',
    'bid-no-bid',
    'far-overview',
  ],
  publishedDate: '2026-04-07',
};
