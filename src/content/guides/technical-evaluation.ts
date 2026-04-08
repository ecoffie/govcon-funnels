import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'technical-evaluation',
  title: 'Technical Evaluation Factors: How the Government Scores Your Proposal',
  metaTitle: 'Technical Evaluation Guide — Federal Proposal Scoring & Rating Systems',
  metaDescription:
    'Learn how federal agencies evaluate proposals: technical factors, adjectival ratings, strengths and weaknesses, scoring methodologies, and how to maximize your scores.',
  keywords: [
    'technical evaluation',
    'proposal evaluation',
    'evaluation factors',
    'adjectival ratings',
    'proposal scoring',
    'strengths weaknesses',
    'evaluation criteria',
    'section m',
    'technical score',
    'source selection',
  ],
  heroSubtitle:
    'Proposals are scored against published criteria. Understanding how evaluators rate your proposal helps you write content that earns high scores.',
  sections: [
    {
      heading: 'How Federal Proposal Evaluation Works',
      content: `
        <p>Federal agencies evaluate proposals using criteria published in the solicitation. Understanding this process helps you write proposals that score well.</p>
        <p><strong>The evaluation framework:</strong></p>
        <ul>
          <li><strong>Section L</strong> — Instructions for proposal content</li>
          <li><strong>Section M</strong> — Evaluation criteria and their relative importance</li>
          <li><strong>Evaluation team</strong> — Government personnel who score proposals</li>
          <li><strong>Source Selection Authority</strong> — Official who makes award decision</li>
        </ul>
        <p><strong>Evaluation process overview:</strong></p>
        <ol>
          <li>Proposals received by deadline</li>
          <li>Initial compliance check (all required elements present?)</li>
          <li>Technical evaluation against criteria</li>
          <li>Price/cost evaluation</li>
          <li>Past performance evaluation</li>
          <li>Best value tradeoff (if applicable)</li>
          <li>Award decision</li>
        </ol>
        <p><strong>Key principle:</strong></p>
        <p>Evaluators can only score what you write. They won't assume capabilities you don't describe. Make it easy for them to find and credit your strengths.</p>
      `,
    },
    {
      heading: 'Evaluation Factors and Subfactors',
      content: `
        <p><strong>Typical evaluation structure:</strong></p>
        <p><strong>Factor 1: Technical Approach</strong></p>
        <ul>
          <li>Subfactor 1.1: Understanding of requirements</li>
          <li>Subfactor 1.2: Technical solution</li>
          <li>Subfactor 1.3: Innovation/value-added features</li>
        </ul>
        <p><strong>Factor 2: Management Approach</strong></p>
        <ul>
          <li>Subfactor 2.1: Program management</li>
          <li>Subfactor 2.2: Quality control</li>
          <li>Subfactor 2.3: Risk management</li>
        </ul>
        <p><strong>Factor 3: Key Personnel</strong></p>
        <ul>
          <li>Subfactor 3.1: Qualifications</li>
          <li>Subfactor 3.2: Relevant experience</li>
        </ul>
        <p><strong>Factor 4: Past Performance</strong></p>
        <p><strong>Factor 5: Price/Cost</strong></p>
        <p><strong>Relative importance:</strong></p>
        <p>Section M specifies how factors relate:</p>
        <ul>
          <li>"Factor 1 is significantly more important than Factor 2"</li>
          <li>"Factors 1 and 2 combined are more important than Factor 3"</li>
          <li>"All non-price factors combined are significantly more important than price"</li>
        </ul>
        <p>These statements guide how you allocate proposal effort and resources.</p>
      `,
    },
    {
      heading: 'Adjectival Rating Systems',
      content: `
        <p><strong>Common rating scales:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Rating</th>
            <th class="p-2 border border-slate-700 text-white">Definition</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700 font-bold text-green-400">Outstanding/Exceptional</td>
            <td class="p-2 border border-slate-700">Exceeds requirements, significant strengths, very low risk</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700 font-bold text-blue-400">Good/Very Good</td>
            <td class="p-2 border border-slate-700">Meets and may exceed some requirements, strengths outweigh weaknesses</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700 font-bold text-yellow-400">Acceptable/Satisfactory</td>
            <td class="p-2 border border-slate-700">Meets requirements, no significant strengths or weaknesses</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700 font-bold text-orange-400">Marginal</td>
            <td class="p-2 border border-slate-700">Doesn't fully meet requirements, weaknesses offset strengths</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700 font-bold text-red-400">Unacceptable</td>
            <td class="p-2 border border-slate-700">Fails to meet requirements, significant deficiencies</td>
          </tr>
        </table>
        <p><strong>Color coding (some agencies):</strong></p>
        <ul>
          <li><strong>Blue</strong> — Exceptional</li>
          <li><strong>Green</strong> — Acceptable</li>
          <li><strong>Yellow</strong> — Marginal</li>
          <li><strong>Red</strong> — Unacceptable</li>
        </ul>
        <p><strong>Numerical scoring:</strong></p>
        <p>Some agencies use point systems:</p>
        <ul>
          <li>Outstanding: 90-100 points</li>
          <li>Good: 70-89 points</li>
          <li>Acceptable: 50-69 points</li>
          <li>Marginal: 30-49 points</li>
          <li>Unacceptable: 0-29 points</li>
        </ul>
      `,
    },
    {
      heading: 'Strengths, Weaknesses, and Deficiencies',
      content: `
        <p><strong>Strength:</strong></p>
        <p>An aspect of the proposal that exceeds requirements or enhances the probability of successful performance.</p>
        <p>Examples:</p>
        <ul>
          <li>Innovative approach that reduces risk</li>
          <li>Key personnel with directly relevant experience</li>
          <li>Additional capabilities beyond requirements</li>
          <li>Proven past performance on similar work</li>
        </ul>
        <p><strong>Weakness:</strong></p>
        <p>A flaw in the proposal that increases the risk of unsuccessful performance.</p>
        <p>Examples:</p>
        <ul>
          <li>Approach that doesn't fully address a requirement</li>
          <li>Personnel with limited relevant experience</li>
          <li>Unclear or incomplete descriptions</li>
          <li>Missing information</li>
        </ul>
        <p><strong>Significant Weakness:</strong></p>
        <p>A flaw that appreciably increases the risk of unsuccessful performance.</p>
        <p><strong>Deficiency:</strong></p>
        <p>A material failure to meet a government requirement or a combination of significant weaknesses that increases performance risk to unacceptable level.</p>
        <p><strong>Impact on ratings:</strong></p>
        <ul>
          <li>Multiple strengths, no weaknesses → Outstanding</li>
          <li>Some strengths, minor weaknesses → Good</li>
          <li>Meets requirements, no significant issues → Acceptable</li>
          <li>Weaknesses that create doubt → Marginal</li>
          <li>Deficiencies → Unacceptable</li>
        </ul>
      `,
    },
    {
      heading: 'What Evaluators Look For',
      content: `
        <p><strong>Understanding requirements:</strong></p>
        <ul>
          <li>Do you demonstrate you understand the problem?</li>
          <li>Have you addressed all requirements?</li>
          <li>Does your approach fit the context?</li>
        </ul>
        <p><strong>Technical approach:</strong></p>
        <ul>
          <li>Is your solution technically sound?</li>
          <li>Will it actually work?</li>
          <li>Have you identified and mitigated risks?</li>
          <li>Is the approach realistic and feasible?</li>
        </ul>
        <p><strong>Management:</strong></p>
        <ul>
          <li>Can you actually execute what you propose?</li>
          <li>Do you have adequate controls and processes?</li>
          <li>How will you handle problems?</li>
        </ul>
        <p><strong>Personnel:</strong></p>
        <ul>
          <li>Are proposed staff qualified?</li>
          <li>Do they have relevant experience?</li>
          <li>Are they available?</li>
          <li>Is the team structured appropriately?</li>
        </ul>
        <p><strong>What earns high scores:</strong></p>
        <ul>
          <li>Exceeding requirements with valuable enhancements</li>
          <li>Demonstrating deep understanding</li>
          <li>Proposing innovative, lower-risk approaches</li>
          <li>Strong, specific past performance</li>
          <li>Clear, well-organized presentation</li>
        </ul>
      `,
    },
    {
      heading: 'Writing for High Scores',
      content: `
        <p><strong>Address every requirement:</strong></p>
        <ul>
          <li>Use a compliance matrix to track</li>
          <li>Explicitly address each "shall" statement</li>
          <li>Don't assume evaluators will infer</li>
        </ul>
        <p><strong>Lead with benefits:</strong></p>
        <ul>
          <li>Don't just describe what you'll do — explain why it's better</li>
          <li>"Our approach reduces schedule risk by..." not just "We will..."</li>
          <li>Connect features to government benefits</li>
        </ul>
        <p><strong>Be specific:</strong></p>
        <ul>
          <li>Generalities don't earn strengths</li>
          <li>Quantify where possible</li>
          <li>Name names, cite specific experience</li>
          <li>"Our team has 500 years combined experience" → less compelling than specific project examples</li>
        </ul>
        <p><strong>Organize for evaluators:</strong></p>
        <ul>
          <li>Follow RFP structure exactly</li>
          <li>Use headings that match evaluation criteria</li>
          <li>Make strengths easy to find</li>
          <li>Use graphics to reinforce key points</li>
        </ul>
        <p><strong>Avoid weaknesses:</strong></p>
        <ul>
          <li>Address potential concerns proactively</li>
          <li>Don't leave gaps or ambiguities</li>
          <li>Explain anything unusual</li>
          <li>If you're light somewhere, acknowledge and mitigate</li>
        </ul>
      `,
    },
    {
      heading: 'Best Value Tradeoffs',
      content: `
        <p><strong>How tradeoff analysis works:</strong></p>
        <p>In best value procurements, the government compares technical scores against price to determine best value:</p>
        <ul>
          <li>Is a higher-rated, higher-priced proposal worth the extra cost?</li>
          <li>What is the government getting for the price difference?</li>
          <li>Are the strengths meaningful to successful performance?</li>
        </ul>
        <p><strong>Tradeoff documentation:</strong></p>
        <p>The Source Selection Authority must document:</p>
        <ul>
          <li>What discriminators justify the decision</li>
          <li>Why higher price is (or isn't) worth the added value</li>
          <li>How the decision serves the government's best interest</li>
        </ul>
        <p><strong>Implications for proposals:</strong></p>
        <ul>
          <li>Your strengths must be worth paying for</li>
          <li>Generic strengths don't justify price premiums</li>
          <li>Discriminators must reduce risk or increase value</li>
        </ul>
        <p><strong>Example tradeoff:</strong></p>
        <p>"Offeror A is rated Outstanding and priced at $10M. Offeror B is rated Good and priced at $8M. Offeror A's strengths include proven experience with the exact system being replaced and a technical approach that eliminates integration risk. The $2M premium is justified by reduced risk and higher probability of on-time delivery."</p>
      `,
    },
    {
      heading: 'Common Evaluation Pitfalls',
      content: `
        <p><strong>Proposal problems that hurt scores:</strong></p>
        <p><strong>Compliance failures:</strong></p>
        <ul>
          <li>Not addressing all requirements</li>
          <li>Missing required sections</li>
          <li>Exceeding page limits</li>
          <li>Wrong format</li>
        </ul>
        <p><strong>Technical issues:</strong></p>
        <ul>
          <li>Approach doesn't fully meet requirements</li>
          <li>Solution is technically flawed</li>
          <li>Risks not identified or mitigated</li>
          <li>Unrealistic claims</li>
        </ul>
        <p><strong>Presentation issues:</strong></p>
        <ul>
          <li>Hard to follow or poorly organized</li>
          <li>Vague, generic language</li>
          <li>Inconsistencies between sections</li>
          <li>Poor quality (typos, formatting errors)</li>
        </ul>
        <p><strong>Strategic errors:</strong></p>
        <ul>
          <li>Not understanding what evaluators value</li>
          <li>Focusing on wrong things</li>
          <li>Underinvesting in important areas</li>
          <li>Not differentiating from competitors</li>
        </ul>
        <p><strong>How to avoid these:</strong></p>
        <ul>
          <li>Thorough compliance reviews</li>
          <li>Color team reviews (Pink, Red, Gold)</li>
          <li>Write to evaluation criteria, not just requirements</li>
          <li>Give evaluators what they need to score you highly</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Can I see my evaluation scores after award?',
      answer:
        'Yes. You\'re entitled to a debriefing that includes your scores, strengths, weaknesses, and how you compared to the winner. Request a debriefing whether you win or lose — it\'s valuable feedback.',
    },
    {
      question: 'How do evaluators handle missing information?',
      answer:
        'They typically can\'t give credit for what you don\'t write. Missing information becomes a weakness. In competitive range, you may get questions to clarify, but don\'t count on it.',
    },
    {
      question: 'Do all evaluation factors matter equally?',
      answer:
        'No. Section M specifies relative importance. Some factors are "significantly more important" than others. Allocate your effort accordingly — invest most in highest-weighted factors.',
    },
    {
      question: 'What if I disagree with my evaluation?',
      answer:
        'Request a detailed debriefing to understand the rationale. If you believe the evaluation was flawed, you may have grounds for a GAO protest — but protests are expensive and rarely successful.',
    },
    {
      question: 'How do I know what will be considered a "strength"?',
      answer:
        'Strengths typically exceed requirements in ways that benefit the government — reducing risk, improving quality, saving time/money. Think "what will make evaluators say this is better than just meeting the requirement?"',
    },
    {
      question: 'Is "acceptable" a bad score?',
      answer:
        'Acceptable means you meet requirements but don\'t stand out. In best value procurements, acceptable may lose to proposals with strengths. In LPTA, acceptable is sufficient if your price is lowest.',
    },
    {
      question: 'Can I contact evaluators during the process?',
      answer:
        'No. All communication must go through the contracting officer. Attempting to contact evaluators could disqualify your proposal and potentially violate procurement integrity rules.',
    },
    {
      question: 'How long does evaluation typically take?',
      answer:
        'Varies widely — from weeks to months depending on complexity, number of proposals, and agency workload. Complex best-value procurements take longer than simple LPTA evaluations.',
    },
  ],
  cta: {
    heading: 'Maximize Your Evaluation Scores',
    description:
      'Understanding how evaluators score proposals is key to winning. Our team helps you write proposals that earn high technical scores and differentiate from competitors.',
    buttonText: 'Get Proposal Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'proposal-writing',
    'rfp-response',
    'government-proposal-reviews',
    'debriefings',
    'proposal-compliance-matrix',
  ],
  publishedDate: '2026-04-07',
};
