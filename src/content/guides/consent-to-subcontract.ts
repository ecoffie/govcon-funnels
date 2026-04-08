import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'consent-to-subcontract',
  title: 'Consent to Subcontract: Requirements, Process, and Compliance Guide',
  metaTitle: 'Consent to Subcontract [Guide] — Requirements & Process',
  metaDescription:
    'Complete guide to government subcontract consent: when consent is required, submission procedures, advance notification vs approval, flow-down requirements, and managing subcontractor compliance.',
  keywords: [
    'consent to subcontract',
    'subcontract approval',
    'FAR subcontracting',
    'advance notification',
    'subcontract consent',
    'flow-down clauses',
    'subcontractor compliance',
    'subcontracting plan',
    'prior approval',
    'advance notice subcontracting',
  ],
  heroSubtitle:
    'Prime contractors can\'t just hire any subcontractor they want. Government contracts often require contracting officer consent or advance notification. Understanding these requirements prevents contract violations and project delays.',
  sections: [
    {
      heading: 'What Is Consent to Subcontract?',
      content: `
        <p><strong>Consent to subcontract</strong> is the requirement that prime contractors obtain contracting officer approval before awarding certain subcontracts.</p>
        <p><strong>Why consent matters:</strong></p>
        <ul>
          <li><strong>Prevent contract violations</strong> — Subcontracting without required consent can breach your contract</li>
          <li><strong>Protect payment</strong> — Government may withhold payment for unauthorized subcontract costs</li>
          <li><strong>Avoid delays</strong> — Consent process takes time; plan accordingly</li>
          <li><strong>Ensure subcontractor responsibility</strong> — Government vets your key subcontractors</li>
        </ul>
        <p><strong>Legal basis — FAR 44.2:</strong></p>
        <p>FAR Part 44 establishes consent to subcontract requirements. Two main approaches exist:</p>
        <p><strong>1. Consent/approval:</strong> CO must affirmatively approve before subcontract award</p>
        <p><strong>2. Advance notification:</strong> Prime notifies CO but can proceed without waiting for approval (unless CO objects)</p>
        <p><strong>When consent is required:</strong></p>
        <p>Consent requirements vary by contract type and prime contractor's purchasing system status:</p>
        <ul>
          <li><strong>Cost-reimbursement contracts:</strong> Consent often required for subcontracts over specified dollar thresholds</li>
          <li><strong>Fixed-price contracts:</strong> Less common, but may apply to key subcontractors or high-value subs</li>
          <li><strong>Contracts with approved purchasing systems:</strong> Reduced consent requirements</li>
          <li><strong>Contractors without approved systems:</strong> More extensive consent requirements</li>
        </ul>
        <p><strong>The consent clause (FAR 52.244-2):</strong></p>
        <p>FAR 52.244-2, "Subcontracts," is the standard consent clause for cost-reimbursement contracts. It specifies which subcontracts require consent and the submission procedures.</p>
        <p><strong>Consent vs. ratification:</strong></p>
        <p>If you subcontract without required consent, you need "ratification" — retroactive approval. Ratification is difficult to obtain and may result in disallowed costs. Always get consent before award.</p>
      `,
    },
    {
      heading: 'When Consent Is Required: Understanding Thresholds',
      content: `
        <p>Not all subcontracts require consent. Requirements depend on contract clauses, dollar thresholds, and your purchasing system status.</p>
        <p><strong>Cost-reimbursement contracts (FAR 52.244-2):</strong></p>
        <p>Consent required for:</p>
        <ul>
          <li><strong>Cost-reimbursement subcontracts over the simplified acquisition threshold</strong> — Currently $250,000</li>
          <li><strong>Fixed-price subcontracts over the consent threshold</strong> — Varies by contract; often $250,000 or higher</li>
          <li><strong>All subcontracts on a cost-reimbursement basis</strong> — Regardless of value, if sub is cost-type</li>
          <li><strong>Subcontracts specified in the contract</strong> — Named subcontractors or types of work requiring consent</li>
        </ul>
        <p><strong>Contractors with approved purchasing systems:</strong></p>
        <p>If DCMA has approved your purchasing system, consent requirements are reduced or eliminated. The contract will incorporate FAR 52.244-2 Alternate I, which substitutes advance notification for consent.</p>
        <p><strong>Fixed-price contracts:</strong></p>
        <p>Fixed-price contracts generally don't require subcontract consent because the government's financial risk is limited. However, consent may be required for:</p>
        <ul>
          <li><strong>Key subcontractors proposed in your offer</strong> — Subs you identified during proposal evaluation</li>
          <li><strong>Subcontracts on a cost-reimbursement basis</strong> — Even under fixed-price primes</li>
          <li><strong>Special contract provisions</strong> — Some contracts specifically require consent</li>
        </ul>
        <p><strong>Subcontracting plan commitments:</strong></p>
        <p>If you have a subcontracting plan, you committed to subcontract with small businesses or specific socioeconomic categories. While this isn't "consent" in the FAR 44 sense, failing to follow your plan can result in penalties.</p>
        <p><strong>First-tier vs. lower-tier subcontracts:</strong></p>
        <p>Consent requirements typically apply to first-tier subcontracts (prime to sub). Lower-tier subcontracts (sub to sub-sub) may require your consent to your subcontractor but don't typically require government consent.</p>
        <p><strong>Check your specific contract:</strong></p>
        <p>Consent requirements vary. Read your contract carefully:</p>
        <ul>
          <li>Review FAR 52.244 clauses</li>
          <li>Check Special Contract Requirements (Section H)</li>
          <li>Review any source selection materials identifying key subcontractors</li>
          <li>Consult the contracting officer if uncertain</li>
        </ul>
      `,
    },
    {
      heading: 'Consent Request Process: What to Submit',
      content: `
        <p>When consent is required, you submit a formal request to the contracting officer before awarding the subcontract.</p>
        <p><strong>Step 1: Prepare the consent request package</strong></p>
        <p>Your submission should include:</p>
        <p><strong>1. Transmittal letter:</strong></p>
        <ul>
          <li>Request consent to subcontract with [Subcontractor Name]</li>
          <li>Identify the work to be subcontracted</li>
          <li>State the subcontract type and value</li>
          <li>Reference the prime contract number</li>
        </ul>
        <p><strong>2. Description of work:</strong></p>
        <ul>
          <li>Statement of work or scope for the subcontract</li>
          <li>Why this work is being subcontracted</li>
          <li>How it relates to overall contract performance</li>
        </ul>
        <p><strong>3. Subcontractor information:</strong></p>
        <ul>
          <li>Name and address</li>
          <li>CAGE code and UEI</li>
          <li>Type of business (small, veteran-owned, etc.)</li>
          <li>Organizational conflicts of interest statement (if applicable)</li>
        </ul>
        <p><strong>4. Subcontractor responsibility determination:</strong></p>
        <ul>
          <li>Subcontractor's relevant experience and past performance</li>
          <li>Technical capability</li>
          <li>Financial capacity</li>
          <li>Facilities and equipment</li>
          <li>Key personnel</li>
        </ul>
        <p><strong>5. Price analysis:</strong></p>
        <ul>
          <li>Proposed subcontract price</li>
          <li>Basis for price (competitive quotes, cost analysis, market research)</li>
          <li>Evidence of price reasonableness (multiple quotes, catalog prices, prior purchases)</li>
          <li>Government cost estimate if available</li>
        </ul>
        <p><strong>6. Competitive process documentation:</strong></p>
        <ul>
          <li>How many quotes were solicited</li>
          <li>Who responded</li>
          <li>Evaluation criteria</li>
          <li>Why this subcontractor was selected</li>
        </ul>
        <p><strong>7. Proposed subcontract (redacted if necessary):</strong></p>
        <ul>
          <li>Draft or proposed subcontract terms</li>
          <li>May redact proprietary cost/price information</li>
          <li>Include flow-down clauses</li>
        </ul>
        <p><strong>Step 2: Submit to the contracting officer</strong></p>
        <p>Send the package to the CO with adequate lead time. Consent review can take 30-60 days or more. Don't wait until you need the subcontractor to start work.</p>
        <p><strong>Step 3: CO review and decision</strong></p>
        <p>The CO will review for:</p>
        <ul>
          <li>Subcontractor responsibility</li>
          <li>Price reasonableness</li>
          <li>Adequacy of competition</li>
          <li>Proper flow-down of clauses</li>
          <li>Compliance with socioeconomic requirements</li>
          <li>No organizational conflicts of interest</li>
        </ul>
        <p><strong>Step 4: Consent or denial</strong></p>
        <p><strong>Consent granted:</strong> CO issues written consent (often via email or letter). You may now award the subcontract.</p>
        <p><strong>Consent withheld:</strong> CO explains deficiencies. You must address them and resubmit or select a different subcontractor.</p>
        <p><strong>Don't award before receiving consent:</strong></p>
        <p>Awarding a subcontract before receiving consent violates the prime contract. Costs may be unallowable and require ratification (which may be denied).</p>
      `,
    },
    {
      heading: 'Advance Notification vs. Prior Approval',
      content: `
        <p>Two consent mechanisms exist: <strong>advance notification</strong> and <strong>prior approval</strong>. The difference is critical.</p>
        <p><strong>Prior approval/consent (FAR 52.244-2):</strong></p>
        <ul>
          <li><strong>You must wait for CO approval before award</strong></li>
          <li>CO actively reviews and issues consent decision</li>
          <li>Common on cost-reimbursement contracts without approved purchasing systems</li>
        </ul>
        <p><strong>Advance notification (FAR 52.244-2 Alternate I):</strong></p>
        <ul>
          <li><strong>You notify the CO but can proceed without waiting for approval</strong></li>
          <li>CO may object within specified timeframe (typically 30 days)</li>
          <li>If CO doesn't object, you can award</li>
          <li>Common for contractors with DCMA-approved purchasing systems</li>
        </ul>
        <p><strong>How advance notification works:</strong></p>
        <ol>
          <li>Submit notification package to CO (similar content to consent request)</li>
          <li>Wait for objection period to expire (e.g., 30 days)</li>
          <li>If no objection, proceed with award</li>
          <li>If CO objects, address concerns before award</li>
        </ol>
        <p><strong>Advance notification is faster:</strong></p>
        <p>With advance notification, you can move forward after the waiting period even without affirmative approval. This reduces delays compared to prior approval.</p>
        <p><strong>Earning an approved purchasing system:</strong></p>
        <p>If you perform substantial cost-reimbursement work, pursue DCMA approval of your purchasing system. Benefits include:</p>
        <ul>
          <li>Substitution of advance notification for consent</li>
          <li>Faster subcontract awards</li>
          <li>Reduced administrative burden</li>
          <li>Competitive advantage on future awards</li>
        </ul>
        <p><strong>CPSR (Contractor Purchasing System Review):</strong></p>
        <p>DCMA conducts CPSRs to evaluate your purchasing system. They review:</p>
        <ul>
          <li>Purchasing policies and procedures</li>
          <li>Competition practices</li>
          <li>Price reasonableness determinations</li>
          <li>Subcontractor selection criteria</li>
          <li>Organizational conflicts of interest procedures</li>
          <li>Flow-down clause compliance</li>
        </ul>
        <p>If your system is approved, you earn advance notification privileges.</p>
        <p><strong>Read your contract's consent clause:</strong></p>
        <p>Check whether your contract includes FAR 52.244-2 (prior approval) or FAR 52.244-2 Alternate I (advance notification). The difference affects your timeline and process.</p>
      `,
    },
    {
      heading: 'Flow-Down Requirements: Required Clauses in Subcontracts',
      content: `
        <p>Prime contractors must "flow down" certain FAR clauses to subcontractors. Failure to include required clauses can breach your prime contract.</p>
        <p><strong>What are flow-down clauses?</strong></p>
        <p>Flow-down clauses are FAR provisions that must be included in subcontracts to ensure subcontractors comply with the same requirements as the prime.</p>
        <p><strong>Why flow-downs matter:</strong></p>
        <ul>
          <li><strong>Prime remains responsible</strong> — You're liable for subcontractor non-compliance</li>
          <li><strong>Audit risk</strong> — DCAA and DCMA audit subcontractors; missing clauses are deficiencies</li>
          <li><strong>Cost allowability</strong> — Costs under subcontracts without required clauses may be unallowable</li>
          <li><strong>Legal enforceability</strong> — You can't enforce requirements on subs if you didn't flow them down</li>
        </ul>
        <p><strong>FAR 52.244-6: Subcontracts for Commercial Items</strong></p>
        <p>This clause (incorporated in most contracts) lists clauses that flow down to commercial item subcontracts. It's a quick reference for required flow-downs.</p>
        <p><strong>Common flow-down clauses:</strong></p>
        <p><strong>Always flow down:</strong></p>
        <ul>
          <li><strong>Equal Opportunity (FAR 52.222-26):</strong> Anti-discrimination requirements</li>
          <li><strong>Affirmative Action for Workers with Disabilities (FAR 52.222-36):</strong> If subcontract exceeds $15,000</li>
          <li><strong>Employment Reports on Veterans (FAR 52.222-37):</strong> For subcontracts $150,000+</li>
          <li><strong>Combating Trafficking in Persons (FAR 52.222-50):</strong> Anti-trafficking requirements</li>
          <li><strong>Protecting Worker Rights (E.O. 13496):</strong> Worker notification requirements</li>
        </ul>
        <p><strong>Flow down if applicable:</strong></p>
        <ul>
          <li><strong>Service Contract Act (FAR 52.222-41/43):</strong> If subcontract is for services covered by SCA</li>
          <li><strong>Davis-Bacon Act (FAR 52.222-6):</strong> If subcontract involves construction</li>
          <li><strong>Buy American (FAR 52.225-1/9):</strong> Domestic preference requirements</li>
          <li><strong>Combating Trafficking (FAR 52.222-50):</strong> Human trafficking prohibitions</li>
          <li><strong>Export Control (ITAR, EAR):</strong> If subcontract involves controlled technology</li>
        </ul>
        <p><strong>How to identify required flow-downs:</strong></p>
        <ol>
          <li>Review FAR 52.244-6 in your prime contract</li>
          <li>Check individual FAR clauses — many state whether they flow down</li>
          <li>Look for contract-specific flow-down requirements in Section I</li>
          <li>When in doubt, flow it down (over-inclusion is safer than omission)</li>
        </ol>
        <p><strong>Subcontract templates:</strong></p>
        <p>Maintain approved subcontract templates with standard flow-down clauses pre-populated. This ensures consistency and reduces risk of omission.</p>
        <p><strong>Tailoring flow-downs:</strong></p>
        <p>Some clauses must be tailored to the subcontract (e.g., replacing "Contractor" with "Subcontractor," "Contracting Officer" with "Buyer"). Don't just copy-paste from the prime contract — adapt appropriately.</p>
      `,
    },
    {
      heading: 'Managing Subcontractor Compliance',
      content: `
        <p>As the prime, you're responsible for subcontractor compliance with contract requirements. Effective management prevents problems.</p>
        <p><strong>Pre-award responsibility assessment:</strong></p>
        <p>Before awarding subcontracts, evaluate subcontractor responsibility:</p>
        <ul>
          <li><strong>Financial capability:</strong> Can they perform without payment issues?</li>
          <li><strong>Technical capability:</strong> Do they have necessary skills and experience?</li>
          <li><strong>Past performance:</strong> What's their track record?</li>
          <li><strong>Facilities and equipment:</strong> Do they have what they need?</li>
          <li><strong>Integrity:</strong> Are they suspended, debarred, or have ethical issues?</li>
        </ul>
        <p><strong>Check SAM.gov for exclusions:</strong></p>
        <p>Before awarding any subcontract, check SAM.gov to ensure the subcontractor isn't suspended or debarred. Awarding to excluded entities violates your prime contract.</p>
        <p><strong>Post-award oversight:</strong></p>
        <p>After award, monitor subcontractor performance:</p>
        <ul>
          <li><strong>Schedule performance:</strong> Are they meeting milestones?</li>
          <li><strong>Quality:</strong> Does deliverable work meet specifications?</li>
          <li><strong>Cost performance:</strong> Are costs reasonable and within budget?</li>
          <li><strong>Invoicing:</strong> Are invoices accurate and properly supported?</li>
          <li><strong>Compliance:</strong> Are they following labor, environmental, and other requirements?</li>
        </ul>
        <p><strong>Flow-down enforcement:</strong></p>
        <p>Ensure subcontractors comply with flowed-down clauses:</p>
        <ul>
          <li>Labor standards (SCA, Davis-Bacon)</li>
          <li>Equal opportunity and affirmative action</li>
          <li>Buy American requirements</li>
          <li>Cybersecurity (DFARS 252.204-7012 if applicable)</li>
          <li>Export control compliance</li>
        </ul>
        <p><strong>Audit readiness:</strong></p>
        <p>Government auditors may audit your subcontractors. Be prepared:</p>
        <ul>
          <li>Maintain complete subcontract files</li>
          <li>Ensure subcontractors maintain adequate cost records</li>
          <li>Review subcontractor invoices for accuracy</li>
          <li>Conduct periodic audits of high-value or high-risk subs</li>
        </ul>
        <p><strong>Subcontractor risk management:</strong></p>
        <p>Identify and mitigate subcontractor risks:</p>
        <ul>
          <li><strong>Performance risk:</strong> Can they deliver on time and to spec?</li>
          <li><strong>Financial risk:</strong> Are they financially stable?</li>
          <li><strong>Compliance risk:</strong> Will they follow all requirements?</li>
          <li><strong>Supply chain risk:</strong> Are their suppliers reliable?</li>
        </ul>
        <p><strong>Terminating subcontractors:</strong></p>
        <p>If a subcontractor fails to perform, you may need to terminate. Subcontracts should include termination clauses (for convenience and default) mirroring the prime contract. Follow proper termination procedures and document thoroughly.</p>
        <p><strong>Substituting subcontractors:</strong></p>
        <p>If you must replace a subcontractor (especially one requiring consent), notify the CO and request consent for the replacement before award.</p>
      `,
    },
    {
      heading: 'Small Business Subcontracting Plan Compliance',
      content: `
        <p>If your prime contract includes a subcontracting plan, you committed to specific small business subcontracting goals. Compliance is mandatory.</p>
        <p><strong>When plans are required (FAR 19.702):</strong></p>
        <p>Subcontracting plans are required for contracts over $750,000 ($1.5M for construction) unless the contractor is small for the prime contract.</p>
        <p><strong>What plans include:</strong></p>
        <ul>
          <li><strong>Goals:</strong> Percentage targets for small business, SDB, WOSB, VOSB, SDVOSB, HUBZone subcontracting</li>
          <li><strong>Description of efforts:</strong> How you'll identify and solicit small businesses</li>
          <li><strong>Assurances:</strong> Prompt payment, inclusion in solicitations, etc.</li>
        </ul>
        <p><strong>Your plan is binding:</strong></p>
        <p>Failing to meet goals or make good faith effort can result in:</p>
        <ul>
          <li>Liquidated damages (often the difference between goal and actual performance)</li>
          <li>Negative past performance</li>
          <li>Future eligibility issues</li>
        </ul>
        <p><strong>Good faith effort:</strong></p>
        <p>You're not strictly liable if you miss goals — but you must demonstrate good faith effort:</p>
        <ul>
          <li>Actively solicit small businesses</li>
          <li>Use databases (SAM.gov, DSBS) to identify potential subs</li>
          <li>Attend small business matchmaking events</li>
          <li>Divide requirements into economically feasible portions</li>
          <li>Document outreach and responses</li>
        </ul>
        <p><strong>Individual Subcontracting Plans vs. Commercial Plans vs. Master Plans:</strong></p>
        <p><strong>Individual plans:</strong> Specific to one contract</p>
        <p><strong>Commercial plans:</strong> Cover all commercial item contracts; goals apply across the entire plan</p>
        <p><strong>Master plans:</strong> Negotiated with one agency; can be incorporated into multiple contracts</p>
        <p><strong>Reporting requirements:</strong></p>
        <ul>
          <li><strong>Individual Subcontract Reports (ISRs):</strong> Report actual subcontracting achievements semi-annually</li>
          <li><strong>Summary Subcontract Reports (SSRs):</strong> Report annually on all subcontracting</li>
          <li><strong>Due dates:</strong> ISRs due by October 30 and April 30; SSRs due by October 30</li>
          <li><strong>eSRS system:</strong> Submit via Electronic Subcontracting Reporting System</li>
        </ul>
        <p><strong>Don't inflate small business credit:</strong></p>
        <p>Only count legitimate small business subcontracting. Improper credit can result in False Claims Act liability. Verify subcontractor size status and socioeconomic certifications.</p>
        <p><strong>Affiliation and limitations on subcontracting:</strong></p>
        <p>Set-aside contracts have limitations on subcontracting (e.g., 50% of cost of manufacturing must be performed by small business). Ensure compliance — both for your prime and when you subcontract set-asides to others.</p>
      `,
    },
    {
      heading: 'Common Consent Mistakes and Best Practices',
      content: `
        <p>Learn from common subcontracting mistakes and implement best practices.</p>
        <p><strong>Common mistakes:</strong></p>
        <p><strong>1. Awarding before receiving consent:</strong></p>
        <p><strong>Mistake:</strong> Award subcontract, then request consent. CO denies; costs are unallowable.</p>
        <p><strong>Fix:</strong> Never award before receiving consent. Build consent timelines into schedules.</p>
        <p><strong>2. Inadequate price analysis:</strong></p>
        <p><strong>Mistake:</strong> Submit consent request with weak price justification. CO withholds consent.</p>
        <p><strong>Fix:</strong> Obtain multiple quotes when possible. Document price reasonableness thoroughly.</p>
        <p><strong>3. Missing flow-down clauses:</strong></p>
        <p><strong>Mistake:</strong> Subcontract omits required clauses. DCAA audit finds deficiency; costs are questioned.</p>
        <p><strong>Fix:</strong> Use approved templates with all required clauses. Review FAR 52.244-6 and contract Section I.</p>
        <p><strong>4. Not checking SAM.gov exclusions:</strong></p>
        <p><strong>Mistake:</strong> Award to suspended or debarred subcontractor. Contract violation; costs unallowable.</p>
        <p><strong>Fix:</strong> Check SAM.gov exclusions before every award. Document the search.</p>
        <p><strong>5. Ignoring subcontracting plan commitments:</strong></p>
        <p><strong>Mistake:</strong> Award all work to large businesses despite small business goals. Face liquidated damages.</p>
        <p><strong>Fix:</strong> Actively pursue small business subcontractors. Document good faith efforts.</p>
        <p><strong>6. Inadequate subcontractor oversight:</strong></p>
        <p><strong>Mistake:</strong> Don't monitor subcontractor compliance. Sub violates labor standards; prime is liable.</p>
        <p><strong>Fix:</strong> Implement subcontractor management processes. Monitor performance and compliance.</p>
        <p><strong>7. Late consent requests:</strong></p>
        <p><strong>Mistake:</strong> Need subcontractor to start Monday; submit consent request Friday. CO can't review in time.</p>
        <p><strong>Fix:</strong> Submit consent requests 60+ days before needed start date.</p>
        <p><strong>8. Incomplete consent packages:</strong></p>
        <p><strong>Mistake:</strong> Submit minimal information. CO requests more; delays ensue.</p>
        <p><strong>Fix:</strong> Submit complete packages upfront: SOW, pricing, competition documentation, subcontractor info.</p>
        <p><strong>Best practices:</strong></p>
        <ul>
          <li><strong>Develop consent request templates</strong> — Standardize format and content</li>
          <li><strong>Maintain tracking system</strong> — Log all consent requests and status</li>
          <li><strong>Build consent into schedules</strong> — Plan for 30-60 day review periods</li>
          <li><strong>Communicate with the CO</strong> — If urgent, explain and request expedited review</li>
          <li><strong>Use approved subcontract templates</strong> — Pre-approved flow-downs reduce errors</li>
          <li><strong>Train purchasing staff</strong> — Ensure they understand consent requirements</li>
          <li><strong>Periodic compliance audits</strong> — Review subcontracts for flow-down and compliance issues</li>
          <li><strong>Document everything</strong> — Maintain complete subcontract files for audits</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is consent to subcontract?',
      answer:
        'Consent to subcontract is the requirement that prime contractors obtain contracting officer approval before awarding certain subcontracts. Requirements vary by contract type and dollar thresholds. Cost-reimbursement contracts typically require consent for subcontracts over $250,000 or for cost-type subcontracts of any value.',
    },
    {
      question: 'When do I need contracting officer consent to award a subcontract?',
      answer:
        'Consent requirements depend on your contract clauses (check FAR 52.244-2). Typically required for: (1) cost-reimbursement subcontracts over the simplified acquisition threshold ($250,000), (2) all cost-type subcontracts regardless of value, (3) subcontractors specifically identified in the contract, or (4) subcontracts your contract specifically requires consent for.',
    },
    {
      question: 'What is the difference between consent and advance notification?',
      answer:
        'Consent (prior approval) requires you to wait for CO approval before awarding the subcontract. Advance notification allows you to proceed after notifying the CO and waiting a specified period (e.g., 30 days) unless the CO objects. Contractors with DCMA-approved purchasing systems typically use advance notification instead of consent.',
    },
    {
      question: 'What happens if I award a subcontract without required consent?',
      answer:
        'Awarding without required consent violates your prime contract. The costs may be unallowable and not reimbursed. You may need to request "ratification" (retroactive approval), which is difficult to obtain and at the CO\'s discretion. Always obtain consent before award.',
    },
    {
      question: 'What are flow-down clauses?',
      answer:
        'Flow-down clauses are FAR provisions that must be included in subcontracts to ensure subcontractors comply with the same requirements as the prime. Examples include Equal Opportunity, Service Contract Act, Buy American, and many others. FAR 52.244-6 lists common flow-downs. Failure to include required clauses can result in unallowable costs.',
    },
    {
      question: 'How long does the consent process take?',
      answer:
        'Consent review typically takes 30-60 days, sometimes longer for complex or high-value subcontracts. Submit consent requests well in advance of when you need the subcontractor to start work. Incomplete packages cause delays — submit thorough documentation upfront.',
    },
    {
      question: 'Do I need consent for every subcontractor?',
      answer:
        'No. Consent is typically required only for subcontracts above specified dollar thresholds or for specific types of work. Small purchases, commercial items under certain thresholds, and contracts with approved purchasing systems have reduced or no consent requirements. Check your specific contract clauses.',
    },
    {
      question: 'What is a subcontracting plan and when is it required?',
      answer:
        'A subcontracting plan is a commitment to subcontract with small businesses and specific socioeconomic categories (SDB, WOSB, VOSB, SDVOSB, HUBZone). Plans are required for contracts over $750,000 ($1.5M for construction) awarded to other than small businesses. You must make good faith efforts to meet plan goals or face liquidated damages.',
    },
  ],
  cta: {
    heading: 'Master Subcontract Compliance',
    description:
      'Proper subcontract management protects you from unallowable costs, contract violations, and audit deficiencies. Our free course covers consent procedures, flow-down requirements, and compliance best practices.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'subcontracting-and-teaming',
    'subcontracting-plan',
    'teaming-agreements',
    'compliance-program',
  ],
  publishedDate: '2026-04-07',
};
