import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'cost-accounting-standards',
  title: 'Cost Accounting Standards (CAS): Compliance Requirements for Government Contractors',
  metaTitle: 'Cost Accounting Standards [Guide] — CAS Compliance for Contractors',
  metaDescription:
    'Understand Cost Accounting Standards (CAS) coverage, compliance requirements, disclosure statements, and key CAS rules. Learn what contractors must do to maintain CAS compliance.',
  keywords: [
    'cost accounting standards',
    'CAS compliance',
    'CAS coverage',
    'disclosure statement',
    'full CAS coverage',
    'modified CAS coverage',
    'CAS requirements',
    'government contract accounting',
    'FAR cost accounting',
    'CAS board',
  ],
  heroSubtitle:
    'Cost Accounting Standards (CAS) govern how contractors account for and allocate costs on government contracts. Understanding CAS coverage and requirements is essential for compliance and avoiding costly audit findings.',
  sections: [
    {
      heading: 'What Are Cost Accounting Standards (CAS)?',
      content: `
        <p>Cost Accounting Standards (CAS) are a set of 19 accounting standards developed by the Cost Accounting Standards Board (CASB) to ensure uniformity and consistency in cost accounting practices for government contracts. CAS rules govern how contractors measure, assign, and allocate costs to contracts.</p>
        <p><strong>Why CAS exists:</strong></p>
        <p>Before CAS, contractors used widely varying cost accounting methods, making it difficult for the government to compare proposals or verify that costs charged to contracts were reasonable. CAS was created to standardize practices and provide a common framework for cost accounting across the defense industrial base and federal contractors.</p>
        <p><strong>CAS authority and administration:</strong></p>
        <p>CAS was originally developed in the 1970s. Today, the Cost Accounting Standards Board is part of the Office of Federal Procurement Policy within the Office of Management and Budget (OMB). The standards are codified in 48 CFR Chapter 99 and incorporated into government contracts through FAR Part 30.</p>
        <p><strong>The 19 CAS standards cover:</strong></p>
        <ul>
          <li>Consistency in estimating, accumulating, and reporting costs (CAS 401)</li>
          <li>Consistency in allocating costs incurred for the same purpose (CAS 402)</li>
          <li>Allocation of home office expenses (CAS 403)</li>
          <li>Capitalization of tangible assets (CAS 404)</li>
          <li>Accounting for unallowable costs (CAS 405)</li>
          <li>Cost accounting period (CAS 406)</li>
          <li>Use of standard costs (CAS 407)</li>
          <li>Accounting for compensated personal absence (vacation/sick leave) (CAS 408)</li>
          <li>Depreciation of tangible capital assets (CAS 409)</li>
          <li>Allocation of G&A expenses (CAS 410)</li>
          <li>Cost accounting standard for business unit G&A (CAS 411)</li>
          <li>Composition and measurement of pension cost (CAS 412, 413)</li>
          <li>Cost of money as an element of facilities capital (CAS 414)</li>
          <li>Accounting for the cost of deferred compensation (CAS 415)</li>
          <li>Accounting for insurance costs (CAS 416)</li>
          <li>Cost of money for capital assets under construction (CAS 417)</li>
          <li>Allocation of direct and indirect costs (CAS 418)</li>
          <li>Accounting for independent research and development and bid and proposal costs (CAS 420)</li>
        </ul>
        <p>Not all contractors are subject to all standards. Coverage depends on contract dollar thresholds and contract type.</p>
      `,
    },
    {
      heading: 'Who Is Subject to CAS Coverage?',
      content: `
        <p>CAS coverage depends on the value of your CAS-covered contracts and subcontracts. Not every government contract triggers CAS requirements.</p>
        <p><strong>Contracts EXEMPT from CAS:</strong></p>
        <ul>
          <li><strong>Firm-fixed-price contracts</strong> — FFP contracts are exempt unless specifically made subject to CAS by the contracting officer (rare)</li>
          <li><strong>Contracts under $2 million</strong> — Small contracts and task orders are generally exempt</li>
          <li><strong>Contracts awarded to small businesses</strong> — Small business concerns are exempt regardless of contract value (significant benefit of maintaining small business size status)</li>
          <li><strong>Contracts awarded on the basis of adequate price competition</strong> — If award is based on competition and pricing is not expected to exceed competitive range by more than the contract amount, CAS may not apply</li>
          <li><strong>Commercial item contracts</strong> — Contracts for commercial products or services are exempt</li>
        </ul>
        <p><strong>Who IS covered by CAS:</strong></p>
        <p>If you receive a single CAS-covered contract or subcontract exceeding $2 million in a fiscal year, you become CAS-covered. Coverage level depends on total CAS-covered awards:</p>
        <p><strong>Modified CAS Coverage:</strong> If you receive a CAS-covered contract/subcontract over $2 million but your total CAS-covered awards (contracts + subcontracts) are less than $50 million in the preceding cost accounting period AND you are not currently performing any CAS-covered contracts exceeding $50 million, you are subject to Modified CAS coverage.</p>
        <p><strong>Full CAS Coverage:</strong> If you receive a single CAS-covered contract exceeding $50 million OR your total CAS-covered awards exceed $50 million in the preceding cost accounting period, you are subject to Full CAS coverage.</p>
        <p><strong>What this means practically:</strong></p>
        <p>Most contractors start under Modified CAS coverage (one contract over $2M but total portfolio under $50M). As contract volume grows, they eventually cross into Full CAS coverage. Once CAS-covered, you remain covered on future contracts unless your contract activity drops significantly and you formally exit CAS coverage (complex process requiring contracting officer approval).</p>
        <p><strong>Small business exemption importance:</strong></p>
        <p>Maintaining small business size status exempts you from CAS even on large contracts. This is a significant compliance advantage. Many contractors carefully manage growth to stay under SBA size standards specifically to avoid CAS requirements. See our <a href="/guides/sba-size-standards">SBA Size Standards guide</a> for thresholds.</p>
      `,
    },
    {
      heading: 'Modified CAS Coverage vs. Full CAS Coverage',
      content: `
        <p>CAS coverage exists in two levels with different compliance burdens. Understanding the difference is critical for planning your compliance approach.</p>
        <p><strong>Modified CAS Coverage (contracts $2M-$50M)</strong></p>
        <p>Modified coverage requires compliance with only 4 core CAS standards:</p>
        <ul>
          <li><strong>CAS 401:</strong> Consistency in estimating, accumulating, and reporting costs</li>
          <li><strong>CAS 402:</strong> Consistency in allocating costs incurred for the same purpose</li>
          <li><strong>CAS 405:</strong> Accounting for unallowable costs</li>
          <li><strong>CAS 406:</strong> Cost accounting period</li>
        </ul>
        <p><strong>What these 4 standards require:</strong></p>
        <p><strong>CAS 401 (Consistency):</strong> You must use the same cost accounting methods for estimating costs (proposals), accumulating costs (your accounting system), and reporting costs (invoicing/incurred cost submissions). You can't propose labor in one indirect pool and then track it in a different pool during performance.</p>
        <p><strong>CAS 402 (Allocation Consistency):</strong> Costs incurred for the same purpose must be treated consistently as either direct or indirect. If you charge travel as a direct cost on one contract, you must charge it as direct on all contracts. You can't pick and choose based on what's advantageous for individual contracts.</p>
        <p><strong>CAS 405 (Unallowable Costs):</strong> Unallowable costs must be identified, tracked separately, and excluded from billing to government contracts. You must have an accounting system capable of segregating unallowable costs. See our <a href="/guides/unallowable-costs">Unallowable Costs guide</a> for details.</p>
        <p><strong>CAS 406 (Accounting Period):</strong> Your cost accounting period must be your fiscal year. You must use the same period for accumulating costs, reporting costs, and calculating indirect rates. Changes to fiscal year require advance notice and approval.</p>
        <p><strong>Disclosure statement requirement:</strong> Modified CAS coverage requires submission of a CAS Disclosure Statement (CASB DS-1 form) describing your cost accounting practices. This becomes the baseline against which compliance is measured.</p>
        <p><strong>Full CAS Coverage (contracts over $50M)</strong></p>
        <p>Full coverage requires compliance with ALL 19 CAS standards plus additional administrative requirements:</p>
        <ul>
          <li>All 19 CAS standards apply (not just the 4 core standards)</li>
          <li>More detailed Disclosure Statement (CASB DS-2 form with extensive appendices)</li>
          <li>Advance notification of certain accounting changes</li>
          <li>Cost impact calculations when standards are violated or practices are changed</li>
          <li>More rigorous DCAA audit scrutiny</li>
        </ul>
        <p><strong>Additional standards that apply under Full CAS:</strong></p>
        <p>The additional 15 standards cover specialized accounting areas: depreciation (CAS 409), pension costs (CAS 412-413), insurance (CAS 416), deferred compensation (CAS 415), IR&D/B&P costs (CAS 420), G&A allocation methods (CAS 410-411), and others. Many require specific allocation methodologies and calculations that small contractors may not currently use.</p>
        <p><strong>Compliance burden comparison:</strong></p>
        <p>Modified CAS: Manageable for small-to-midsize contractors with competent accounting staff and basic cost accounting systems. Estimated compliance cost: $50K-$150K in initial setup plus ongoing maintenance.</p>
        <p>Full CAS: Significant compliance burden requiring specialized expertise, sophisticated cost accounting systems, dedicated government contracts accounting staff, and often external consultants. Estimated compliance cost: $200K-$500K+ in initial setup plus substantial ongoing costs.</p>
        <p><strong>Strategic consideration:</strong></p>
        <p>Many contractors intentionally manage their contract portfolio to stay under the $50M Full CAS threshold. The compliance cost and administrative burden of Full CAS can outweigh the revenue benefits of larger contracts, particularly for contractors in the $30M-$80M revenue range.</p>
      `,
    },
    {
      heading: 'CAS Disclosure Statements: What You Must Disclose',
      content: `
        <p>The CAS Disclosure Statement is a detailed description of your cost accounting practices. It's submitted to the government and becomes the standard against which your compliance is measured. Changes to disclosed practices require formal amendments and may trigger cost impact calculations.</p>
        <p><strong>Types of disclosure statements:</strong></p>
        <p><strong>CASB DS-1 (Modified CAS Coverage):</strong> Simplified disclosure form required for contractors under Modified CAS coverage. Approximately 20 pages covering basic cost accounting practices.</p>
        <p><strong>CASB DS-2 (Full CAS Coverage):</strong> Comprehensive disclosure form required for contractors under Full CAS coverage. 40+ pages with multiple appendices covering every aspect of cost accounting practices.</p>
        <p><strong>What you must disclose:</strong></p>
        <p><strong>1. General Information</strong></p>
        <ul>
          <li>Business unit organization and structure</li>
          <li>Cost accounting period (fiscal year)</li>
          <li>Organizational structure chart</li>
          <li>Description of business activities</li>
        </ul>
        <p><strong>2. Direct Cost Accounting</strong></p>
        <ul>
          <li>Definition of direct costs</li>
          <li>Labor categories and how direct labor is identified</li>
          <li>Material cost accounting practices</li>
          <li>Treatment of travel, subcontracts, and other direct costs</li>
          <li>Direct cost charging policies</li>
        </ul>
        <p><strong>3. Indirect Cost Pools and Allocation</strong></p>
        <ul>
          <li>Description of each indirect cost pool (fringe, overhead, G&A, etc.)</li>
          <li>Types of costs included in each pool</li>
          <li>Allocation base for each pool (direct labor hours, direct labor dollars, total cost input, etc.)</li>
          <li>Rationale for allocation base selection</li>
          <li>Formulas for calculating indirect rates</li>
        </ul>
        <p><strong>4. Depreciation and Capitalization</strong></p>
        <ul>
          <li>Capitalization thresholds</li>
          <li>Depreciation methods and useful lives by asset category</li>
          <li>Treatment of fully depreciated assets</li>
        </ul>
        <p><strong>5. Specific CAS Standard Practices</strong></p>
        <p>For Full CAS coverage, detailed disclosure of practices for each of the 19 standards: pension accounting, insurance cost allocation, IR&D/B&P cost accounting, deferred compensation, and more.</p>
        <p><strong>When to submit the disclosure statement:</strong></p>
        <p>You must submit your Disclosure Statement within 90 days of becoming CAS-covered (receiving a CAS-covered contract over $2M). The contracting officer will review and either accept or require revisions. Your contract cannot be finalized until your Disclosure Statement is accepted.</p>
        <p><strong>Maintaining the disclosure statement:</strong></p>
        <p>The Disclosure Statement is a living document. You must:</p>
        <ul>
          <li><strong>Revise when practices change:</strong> If you change indirect pool structures, allocation bases, capitalization policies, or other disclosed practices, you must submit a revised Disclosure Statement within 60 days</li>
          <li><strong>Keep it accurate:</strong> Auditors compare your actual practices to your Disclosure Statement. Discrepancies are noncompliances that can result in cost disallowances</li>
          <li><strong>Calculate cost impacts:</strong> When certain changes are made, you must calculate the cost impact on existing contracts and potentially reimburse the government for increased costs</li>
        </ul>
        <p><strong>Common disclosure statement mistakes:</strong></p>
        <ul>
          <li><strong>Vague descriptions:</strong> "Overhead includes various indirect costs" is not sufficient. List specific cost types in each pool</li>
          <li><strong>Inconsistent practices:</strong> Disclosure Statement says one thing but accounting system does another</li>
          <li><strong>Failure to update:</strong> Practices change over time but Disclosure Statement is never amended</li>
          <li><strong>Copy-paste from templates:</strong> Using generic disclosure language that doesn't match your actual practices</li>
          <li><strong>Missing cost impact calculations:</strong> Making changes without evaluating impact on government contracts</li>
        </ul>
        <p><strong>Getting help with disclosure statements:</strong></p>
        <p>First-time Disclosure Statement preparation is complex. Most contractors engage a government contracts CPA or consultant to prepare the initial submission. The investment ($15K-$50K depending on complexity) prevents costly errors and establishes compliant baseline practices.</p>
      `,
    },
    {
      heading: 'Key CAS Requirements and Common Compliance Issues',
      content: `
        <p>Beyond the general framework, several CAS standards create recurring compliance challenges. Understanding these common issues helps prevent violations.</p>
        <p><strong>CAS 401/402: Consistency Requirements</strong></p>
        <p><strong>The rule:</strong> Estimating, accumulating, and reporting must use consistent methods. Costs incurred for the same purpose must be treated consistently.</p>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Proposing costs in overhead but charging them as direct during performance</li>
          <li>Treating travel as direct on one contract and indirect on another</li>
          <li>Charging business development costs to overhead on commercial work but to G&A on government work</li>
          <li>Changing allocation methods between proposal and performance without disclosure</li>
        </ul>
        <p><strong>How to comply:</strong> Establish clear written policies defining what is direct vs. indirect. Apply policies consistently across all contracts. If you change a practice, document the reason and timing.</p>
        <p><strong>CAS 405: Unallowable Costs</strong></p>
        <p><strong>The rule:</strong> Unallowable costs must be identified and excluded from amounts billed or proposed to the government.</p>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Entertainment, alcohol, or lobbying costs in indirect pools</li>
          <li>Excessive compensation (above FAR limits) not identified and excluded</li>
          <li>Unallowable legal costs (certain litigation) billed to government</li>
          <li>Marketing/advertising costs not properly segregated</li>
        </ul>
        <p><strong>How to comply:</strong> Maintain a chart of accounts that segregates unallowable cost types. Code unallowable costs to specific accounts. Calculate penalty (allocation of indirect costs to unallowables) and exclude from government billing. See our <a href="/guides/unallowable-costs">Unallowable Costs guide</a>.</p>
        <p><strong>CAS 408: Compensated Personal Absence</strong></p>
        <p><strong>The rule:</strong> Vacation, sick leave, and holiday costs must be allocated to the period in which the entitlement is earned, not when taken.</p>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Expensing PTO when paid rather than accruing as earned</li>
          <li>Failing to adjust for PTO liability changes at year-end</li>
          <li>Not calculating and allocating the fringe benefit impact of PTO</li>
        </ul>
        <p><strong>How to comply:</strong> Accrue PTO liability monthly based on earnings. Include PTO cost in fringe rate calculations. Adjust year-end to reflect actual liability. Most accounting systems support PTO accruals if configured properly.</p>
        <p><strong>CAS 410: G&A Allocation</strong></p>
        <p><strong>The rule:</strong> G&A costs must be allocated on a base representing the total activity of the business unit (typically total cost input).</p>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Using direct labor as the G&A base (understates G&A when material/subcontract costs are high)</li>
          <li>Including G&A costs in the G&A base (circular allocation)</li>
          <li>Using inconsistent bases for different contracts</li>
        </ul>
        <p><strong>How to comply:</strong> Use total cost input (all costs except G&A itself) as your G&A base unless you can demonstrate that an alternative base better represents causal/beneficial relationship. Document your base selection in your Disclosure Statement.</p>
        <p><strong>CAS 418: Direct vs. Indirect Cost Allocation</strong></p>
        <p><strong>The rule:</strong> Costs are direct if they can be identified specifically with a contract. Costs that benefit multiple contracts are indirect and must be allocated.</p>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Charging shared resources (conference room usage, shared equipment) as direct to favored contracts</li>
          <li>Allocating costs that are clearly direct (labor working 100% on one contract) to indirect pools</li>
          <li>Inconsistent treatment of similar costs across contracts</li>
        </ul>
        <p><strong>How to comply:</strong> If a cost can be specifically identified with a contract with reasonable accuracy, it's direct. If it benefits multiple contracts or the organization overall, it's indirect. Establish a clear policy and apply consistently.</p>
      `,
    },
    {
      heading: 'CAS Noncompliance: Consequences and Remedies',
      content: `
        <p>CAS violations are serious. They can result in cost disallowances, contract price adjustments, penalties, and in extreme cases, suspension or debarment. Understanding the consequences and how to remedy noncompliances is critical.</p>
        <p><strong>Types of CAS noncompliance:</strong></p>
        <p><strong>1. Failure to follow disclosed practices</strong></p>
        <p>You disclosed that you allocate certain costs one way, but your accounting system does it differently. This is a noncompliance even if both methods are acceptable under CAS — you must follow your disclosed practice.</p>
        <p><strong>2. Noncompliance with a CAS standard</strong></p>
        <p>Your practices violate one of the 19 CAS standards. Example: You allocate G&A based on direct labor (violates CAS 410 requirement for total cost input base unless you have special justification).</p>
        <p><strong>3. Failure to disclose a required practice</strong></p>
        <p>Your Disclosure Statement is silent on a required element, or descriptions are so vague that your actual practices are not disclosed.</p>
        <p><strong>4. Cost Accounting Standard changes without notification</strong></p>
        <p>You changed an accounting practice (e.g., changed your fiscal year, restructured indirect pools, changed capitalization policy) without submitting a revised Disclosure Statement and calculating cost impact.</p>
        <p><strong>Consequences of noncompliance:</strong></p>
        <p><strong>Cost disallowances:</strong> Costs determined to be noncompliant may be disallowed and must be refunded to the government. On cost-reimbursement contracts, this can be significant.</p>
        <p><strong>Contract price adjustments:</strong> If a noncompliance or change results in increased costs to the government on existing contracts, you may be required to reduce contract prices or refund overpayments plus interest.</p>
        <p><strong>Increased DCAA scrutiny:</strong> Once a noncompliance is identified, DCAA will increase audit frequency and depth on all your contracts.</p>
        <p><strong>Suspension of billings:</strong> In severe cases, DCAA can recommend that payments be withheld until noncompliances are resolved.</p>
        <p><strong>Suspension and debarment:</strong> Willful or repeated CAS violations can result in suspension or debarment from government contracting — effectively a death sentence for your government business.</p>
        <p><strong>False Claims Act liability:</strong> Knowingly billing noncompliant costs to the government can trigger False Claims Act liability with treble damages and penalties.</p>
        <p><strong>Remedying noncompliances:</strong></p>
        <p>If you discover a CAS noncompliance (through self-audit, DCAA audit, or other means), take immediate action:</p>
        <ol>
          <li><strong>Stop the noncompliant practice:</strong> Correct your accounting system and practices immediately</li>
          <li><strong>Quantify the impact:</strong> Calculate the cost impact on all affected contracts</li>
          <li><strong>Notify the government:</strong> Disclose the noncompliance to cognizant contracting officers and DCAA</li>
          <li><strong>Propose corrective action:</strong> Submit a plan to correct the practice and calculate/refund any overpayments</li>
          <li><strong>Revise Disclosure Statement:</strong> Submit amended Disclosure Statement reflecting corrected practices</li>
          <li><strong>Implement controls:</strong> Establish internal controls to prevent recurrence</li>
        </ol>
        <p><strong>Voluntary disclosure is better than discovery:</strong></p>
        <p>Self-reporting noncompliances demonstrates good faith and may mitigate consequences. If DCAA discovers the problem first, penalties and scrutiny will be more severe. Many contractors conduct annual CAS self-audits to identify and correct issues proactively.</p>
      `,
    },
    {
      heading: 'Practical Guidance for CAS Compliance',
      content: `
        <p>CAS compliance is not a one-time event — it's an ongoing operational discipline. Here's how to build and maintain a CAS-compliant organization:</p>
        <p><strong>Before you become CAS-covered:</strong></p>
        <p>If you're approaching the $2M threshold that triggers Modified CAS coverage, prepare in advance:</p>
        <ul>
          <li><strong>Review your cost accounting practices:</strong> Do they comply with the 4 core CAS standards (401, 402, 405, 406)?</li>
          <li><strong>Implement job cost accounting:</strong> Ensure you can track costs by contract and by indirect pool</li>
          <li><strong>Segregate unallowable costs:</strong> Set up accounts to track unallowable costs separately</li>
          <li><strong>Document your practices:</strong> Write policies for direct/indirect cost classification, indirect pool composition, allocation bases</li>
          <li><strong>Engage a CAS consultant:</strong> Have an expert review your practices and prepare your Disclosure Statement</li>
        </ul>
        <p><strong>After you become CAS-covered:</strong></p>
        <ul>
          <li><strong>Train your accounting staff:</strong> Everyone touching government contract accounting must understand CAS requirements</li>
          <li><strong>Implement internal controls:</strong> Reviews and approvals to ensure practices match Disclosure Statement</li>
          <li><strong>Conduct annual self-audits:</strong> Review compliance with disclosed practices and CAS standards</li>
          <li><strong>Maintain contemporaneous documentation:</strong> Document reasons for any accounting decisions or classifications</li>
          <li><strong>Update Disclosure Statement when practices change:</strong> Don't let your Disclosure Statement become outdated</li>
        </ul>
        <p><strong>Working with DCAA:</strong></p>
        <p>The Defense Contract Audit Agency (DCAA) audits CAS compliance. Building a productive relationship with DCAA is valuable:</p>
        <ul>
          <li><strong>Be responsive:</strong> Provide requested documentation promptly and completely</li>
          <li><strong>Be transparent:</strong> If you discover an issue, disclose it rather than hiding it</li>
          <li><strong>Be organized:</strong> Maintain audit-ready documentation — don't scramble when DCAA arrives</li>
          <li><strong>Ask questions:</strong> DCAA can provide informal guidance on CAS interpretation (though they're not your consultant)</li>
        </ul>
        <p>See our <a href="/guides/dcaa-audits">DCAA Audits guide</a> for audit preparation.</p>
        <p><strong>CAS for growing businesses:</strong></p>
        <p>Many contractors enter CAS coverage without realizing it (crossing the $2M threshold on a single contract). If you're growing into CAS territory:</p>
        <ul>
          <li><strong>Budget for compliance costs:</strong> Initial Disclosure Statement preparation, system upgrades, additional accounting staff, annual audits</li>
          <li><strong>Consider small business status:</strong> Staying under SBA size standards exempts you from CAS regardless of contract size</li>
          <li><strong>Evaluate contract pursuit strategy:</strong> Is pursuing contracts over $2M (or $50M) worth the CAS compliance burden?</li>
          <li><strong>Plan for Full CAS transition:</strong> If you're in Modified coverage and growing, prepare for eventual Full CAS compliance</li>
        </ul>
        <p><strong>When to seek expert help:</strong></p>
        <p>CAS compliance is specialized. Engage a government contracts CPA or consultant when:</p>
        <ul>
          <li>You're preparing your first Disclosure Statement</li>
          <li>You're transitioning from Modified to Full CAS coverage</li>
          <li>You're restructuring your business or indirect cost pools</li>
          <li>DCAA has identified potential noncompliances</li>
          <li>You're considering major accounting system changes</li>
          <li>You're unsure whether a practice complies with CAS</li>
        </ul>
        <p>The cost of expert help ($15K-$100K+ depending on scope) is far less than the cost of noncompliances, disallowances, and penalties that result from errors.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Do I need to comply with CAS on fixed-price contracts?',
      answer:
        'Generally no. Firm-fixed-price contracts are exempt from CAS unless the contracting officer specifically makes them subject to CAS (rare). However, cost-reimbursement, time and materials, labor-hour, and fixed-price-incentive contracts are subject to CAS if they exceed $2 million and other exemptions do not apply.',
    },
    {
      question: 'What happens if I cross the $50 million threshold triggering Full CAS coverage?',
      answer:
        'You must submit a comprehensive Disclosure Statement (CASB DS-2) and comply with all 19 CAS standards going forward. Existing contracts remain under their original CAS coverage terms, but new contracts will include Full CAS clauses. You should begin transitioning your accounting practices and systems to meet all CAS requirements before crossing the threshold.',
    },
    {
      question: 'Can I avoid CAS by staying under the contract thresholds?',
      answer:
        'Yes, if you maintain small business size status (exempts you regardless of contract value) or limit individual contracts to under $2 million. However, CAS applies to the aggregate value of covered contracts and subcontracts, so multiple smaller contracts can trigger coverage. Strategic contract portfolio management can help avoid unintended CAS coverage.',
    },
    {
      question: 'How long does it take to prepare a CAS Disclosure Statement?',
      answer:
        'For a first-time Modified CAS Disclosure Statement (DS-1), expect 2-4 months with professional help, 4-6 months without. A Full CAS Disclosure Statement (DS-2) typically takes 4-8 months. The timeline depends on how developed your cost accounting practices are and whether you need to make system or practice changes to achieve compliance.',
    },
    {
      question: 'What is a CAS cost impact calculation?',
      answer:
        'When you change a disclosed accounting practice or are found noncompliant with CAS, you must calculate the cost impact on existing government contracts. If the change increases costs to the government, you may be required to reduce contract prices or refund overpayments. If it decreases costs, the government may reduce future payments. Cost impacts can be significant and must be calculated using specific FAR methodologies.',
    },
    {
      question: 'Do I need CAS compliance if I only have subcontracts (no prime contracts)?',
      answer:
        'Yes. CAS coverage is triggered by CAS-covered contracts OR subcontracts. If you receive a subcontract over $2 million on a CAS-covered prime contract, you become CAS-covered. Many small businesses enter CAS coverage through subcontracts without realizing it. Prime contractors should flow down CAS requirements to subs when applicable.',
    },
    {
      question: 'Can I change my cost accounting practices after submitting my Disclosure Statement?',
      answer:
        'Yes, but you must submit a revised Disclosure Statement within 60 days of the change, calculate the cost impact on existing government contracts, and obtain contracting officer approval for certain changes. You cannot arbitrarily change practices to benefit individual contracts — changes must be made for legitimate business reasons and applied consistently to all contracts.',
    },
    {
      question: 'What is the penalty for CAS noncompliance?',
      answer:
        'Penalties vary by severity. Minor noncompliances may result in cost disallowances (refunding the specific noncompliant costs). Material noncompliances can trigger contract price adjustments requiring you to refund the cost impact across all affected contracts plus interest. Willful or repeated violations can result in suspension, debarment, or False Claims Act liability with treble damages. The best defense is proactive compliance and voluntary disclosure of any issues discovered.',
    },
  ],
  cta: {
    heading: 'Master Cost Accounting for Government Contracts',
    description:
      'Cost Accounting Standards, indirect rates, and unallowable costs are complex topics that determine contract profitability and compliance. Learn the fundamentals in our comprehensive free course.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'indirect-rates',
    'dcaa-audits',
    'unallowable-costs',
    'cost-proposals',
    'rate-development',
    'fringe-benefit-calculations',
    'cost-plus-contracts',
  ],
  publishedDate: '2026-04-07',
};
