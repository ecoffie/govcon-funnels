import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'deliverables-management',
  title: 'Managing Contract Deliverables: CDRLs, Submission & Acceptance',
  metaTitle: 'Deliverables Management Guide — CDRL Requirements & Submission Process',
  metaDescription:
    'Learn how to manage government contract deliverables: types of deliverables, CDRL requirements, submission procedures, government acceptance process, and handling rejections.',
  keywords: [
    'contract deliverables',
    'CDRL',
    'contract data requirements list',
    'DD Form 1423',
    'deliverable submission',
    'deliverable acceptance',
    'technical deliverables',
    'data deliverables',
    'contract requirements',
    'deliverable management',
  ],
  heroSubtitle:
    'Deliverables are how government measures your performance. Understanding CDRL requirements, submission procedures, and acceptance criteria ensures your work is accepted on time and protects your CPARS ratings.',
  sections: [
    {
      heading: 'What Are Contract Deliverables?',
      content: `
        <p><strong>Contract deliverables</strong> are tangible items, reports, data, or services you must provide to the government to fulfill contract requirements.</p>
        <p><strong>Types of deliverables:</strong></p>
        <ul>
          <li><strong>Technical deliverables</strong> — Hardware, software, prototypes, systems</li>
          <li><strong>Data deliverables</strong> — Reports, documentation, drawings, datasets</li>
          <li><strong>Management deliverables</strong> — Plans, <a href="/guides/status-reporting">status reports</a>, schedules</li>
          <li><strong>Service deliverables</strong> — Completed tasks, support hours, training sessions</li>
        </ul>
        <p><strong>Why deliverables matter:</strong></p>
        <ul>
          <li><strong>Payment trigger</strong> — Many contracts withhold payment until deliverable is accepted</li>
          <li><strong>Performance measure</strong> — On-time delivery rate directly impacts <a href="/guides/cpars">CPARS</a></li>
          <li><strong>Contractual obligation</strong> — Failure to deliver can trigger cure notice or default</li>
          <li><strong>Technical proof</strong> — Demonstrates you're meeting technical requirements</li>
        </ul>
        <p><strong>Deliverable vs. milestone:</strong></p>
        <ul>
          <li><strong>Deliverable:</strong> Something tangible you provide to government</li>
          <li><strong>Milestone:</strong> A point in time or event (may or may not have deliverable)</li>
        </ul>
        <p>Example: "System design complete" is a milestone. "System Design Document" is the deliverable proving milestone completion.</p>
      `,
    },
    {
      heading: 'Contract Data Requirements List (CDRL)',
      content: `
        <p><strong>What is a CDRL?</strong></p>
        <p>The Contract Data Requirements List is a formal list of all data deliverables required by the contract, defined using DD Form 1423.</p>
        <p><strong>DD Form 1423:</strong></p>
        <p>Standard DoD form specifying each deliverable's requirements:</p>
        <ul>
          <li><strong>Block 1:</strong> Data item number/identifier</li>
          <li><strong>Block 2:</strong> Title of data item</li>
          <li><strong>Block 3:</strong> Subtitle or description</li>
          <li><strong>Block 4:</strong> Authority (Data Item Description reference)</li>
          <li><strong>Block 5:</strong> Contract reference (SOW paragraph)</li>
          <li><strong>Block 6:</strong> Requirement code (TDP, TM, etc.)</li>
          <li><strong>Block 7:</strong> Date of first submission</li>
          <li><strong>Block 8:</strong> Date of subsequent submissions</li>
          <li><strong>Block 9:</strong> Distribution (who receives it)</li>
          <li><strong>Block 10-16:</strong> Frequency, format, and other details</li>
        </ul>
        <p><strong>Data Item Description (DID):</strong></p>
        <p>Standardized specification for common deliverable types (e.g., DI-MGMT-80368 for monthly status reports). DIDs specify format, content, and preparation instructions.</p>
        <p><strong>Common CDRL items:</strong></p>
        <ul>
          <li>Monthly/quarterly progress reports</li>
          <li>Technical documentation (manuals, specifications, drawings)</li>
          <li>Test reports and results</li>
          <li>Plans (quality, security, transition, etc.)</li>
          <li>Meeting minutes</li>
          <li>Financial reports (cost-type contracts)</li>
          <li>Final reports and lessons learned</li>
        </ul>
        <p><strong>Non-DoD contracts:</strong></p>
        <p>Other agencies may not use DD 1423 but will specify deliverables in the <a href="/guides/performance-work-statement">SOW/PWS</a> or separate deliverables schedule. Same principles apply.</p>
        <p><strong>Review CDRLs during proposal:</strong></p>
        <ul>
          <li>Identify all deliverables and due dates</li>
          <li>Estimate effort to create each deliverable</li>
          <li>Include deliverable costs in your <a href="/guides/cost-proposals">price</a></li>
          <li>Flag unrealistic requirements early (Q&A or proposal assumptions)</li>
        </ul>
      `,
    },
    {
      heading: 'Deliverable Submission Process',
      content: `
        <p><strong>Standard submission workflow:</strong></p>
        <p><strong>1. Internal review (before government submission):</strong></p>
        <ul>
          <li>Technical review (content accuracy, completeness)</li>
          <li>QA review (formatting, compliance with CDRL/DID)</li>
          <li>Management review (consistency with contract requirements)</li>
        </ul>
        <p>Never submit first draft directly to government. Internal QA reduces rejection risk.</p>
        <p><strong>2. Prepare submission package:</strong></p>
        <ul>
          <li>Format per CDRL specifications (Word, PDF, hardcopy, etc.)</li>
          <li>Include required front matter (cover page, title page, etc.)</li>
          <li>Number pages and figures</li>
          <li>Create table of contents (if required)</li>
          <li>Include all required appendices/attachments</li>
        </ul>
        <p><strong>3. Submit via specified method:</strong></p>
        <ul>
          <li><strong>Email:</strong> To designated COR/CO email address</li>
          <li><strong>Secure portal:</strong> Agency-specific systems (PIEE, eDocs, etc.)</li>
          <li><strong>Hardcopy:</strong> Mailed or hand-delivered (rare but still happens)</li>
          <li><strong>File sharing:</strong> SharePoint, Google Drive, etc. (with government access)</li>
        </ul>
        <p><strong>4. Document submission:</strong></p>
        <ul>
          <li>Save proof of submission (email confirmation, upload receipt)</li>
          <li>Note submission date/time (timeliness matters)</li>
          <li>Track in deliverables log</li>
        </ul>
        <p><strong>5. Await government review:</strong></p>
        <ul>
          <li>Government has specified review period (typically 10-30 days)</li>
          <li>Follow up if no response within review period</li>
          <li>Don't assume silence means acceptance</li>
        </ul>
        <p><strong>Submission timing:</strong></p>
        <ul>
          <li><strong>Submit early:</strong> Aim for 2-3 days before deadline when possible</li>
          <li><strong>Avoid last-minute:</strong> System failures, email issues, or unexpected issues can cause late submission</li>
          <li><strong>Coordinate if late:</strong> If you'll miss deadline, notify COR immediately and request extension in writing</li>
        </ul>
        <p><strong>Cover letter best practices:</strong></p>
        <p>Include transmittal memo/email with each submission:</p>
        <ul>
          <li>Contract number and deliverable reference (CDRL number)</li>
          <li>Due date (confirm you're on time)</li>
          <li>Brief description of deliverable</li>
          <li>Point of contact for questions</li>
          <li>Note any deviations from CDRL (with justification)</li>
        </ul>
      `,
    },
    {
      heading: 'Government Acceptance Process',
      content: `
        <p><strong>Inspection and acceptance:</strong></p>
        <p>Government has right to inspect deliverables before acceptance. Acceptance means government agrees the deliverable meets contract requirements.</p>
        <p><strong>Inspection methods:</strong></p>
        <ul>
          <li><strong>Document review</strong> — COR/SME reads and evaluates content</li>
          <li><strong>Testing</strong> — Functional testing of software, equipment, systems</li>
          <li><strong>Demonstration</strong> — You demonstrate functionality or capability</li>
          <li><strong>Measurement</strong> — Physical inspection, measurement, or analysis</li>
        </ul>
        <p><strong>Acceptance outcomes:</strong></p>
        <p><strong>1. Accepted:</strong></p>
        <ul>
          <li>Deliverable meets requirements</li>
          <li>Government issues acceptance memo/email</li>
          <li>Payment processed (if tied to deliverable)</li>
          <li>Obligation complete</li>
        </ul>
        <p><strong>2. Accepted with comments:</strong></p>
        <ul>
          <li>Deliverable substantially meets requirements</li>
          <li>Minor issues noted but don't prevent acceptance</li>
          <li>Comments may inform future deliverables</li>
          <li>Still counts as accepted for payment/performance</li>
        </ul>
        <p><strong>3. Conditionally accepted:</strong></p>
        <ul>
          <li>Accepted pending minor corrections</li>
          <li>Specific changes required</li>
          <li>Payment may be held until conditions met</li>
          <li>Resubmit corrected version</li>
        </ul>
        <p><strong>4. Rejected:</strong></p>
        <ul>
          <li>Deliverable does not meet requirements</li>
          <li>Government provides deficiency list</li>
          <li>Must correct and resubmit</li>
          <li>Payment withheld</li>
          <li>May impact schedule and <a href="/guides/cpars">CPARS</a></li>
        </ul>
        <p><strong>Acceptance timeframes:</strong></p>
        <p>Contract typically specifies government review period (e.g., "30 days after submission"). If no timeframe specified, "reasonable time" applies (usually 30 days).</p>
        <p><strong>Constructive acceptance:</strong></p>
        <p>If government uses/implements deliverable without formal acceptance (and doesn't reject within timeframe), may constitute constructive acceptance. Document this carefully if payment is delayed.</p>
        <p><strong>Get written acceptance:</strong></p>
        <p>Always get formal written acceptance. Verbal "looks good" doesn't count. Request acceptance memo if not provided within review period.</p>
      `,
    },
    {
      heading: 'Handling Rejections and Deficiencies',
      content: `
        <p><strong>When a deliverable is rejected:</strong></p>
        <p><strong>1. Understand the deficiencies:</strong></p>
        <ul>
          <li>Request detailed rejection rationale in writing</li>
          <li>Schedule meeting with COR to discuss specific issues</li>
          <li>Clarify acceptance criteria</li>
          <li>Understand what "good" looks like</li>
        </ul>
        <p><strong>2. Assess root cause:</strong></p>
        <ul>
          <li>Did you misunderstand requirements?</li>
          <li>Did requirements change or were they unclear?</li>
          <li>Was technical approach wrong?</li>
          <li>Was it formatting/compliance vs. technical substance?</li>
        </ul>
        <p><strong>3. Corrective action:</strong></p>
        <ul>
          <li>Fix identified deficiencies</li>
          <li>Address root causes (not just symptoms)</li>
          <li>Have SME review before resubmission</li>
          <li>Consider requesting government review of draft before formal resubmission</li>
        </ul>
        <p><strong>4. Resubmission:</strong></p>
        <ul>
          <li>Clearly mark as "REVISED" or "RESUBMISSION"</li>
          <li>Include cover letter noting what was changed</li>
          <li>Reference original submission and rejection</li>
          <li>Highlight changes for easy review</li>
        </ul>
        <p><strong>5. Prevent recurrence:</strong></p>
        <ul>
          <li>Update internal templates/processes</li>
          <li>Brief team on lessons learned</li>
          <li>Strengthen QA for similar deliverables</li>
        </ul>
        <p><strong>Common rejection reasons:</strong></p>
        <ul>
          <li><strong>Incomplete:</strong> Missing required sections or information</li>
          <li><strong>Non-compliant format:</strong> Doesn't follow DID or CDRL specifications</li>
          <li><strong>Inadequate detail:</strong> Too superficial, lacks analysis or substance</li>
          <li><strong>Incorrect technical approach:</strong> Doesn't meet technical requirements</li>
          <li><strong>Poor quality:</strong> Errors, inconsistencies, lack of rigor</li>
          <li><strong>Missed the point:</strong> Deliverable doesn't address the actual need</li>
        </ul>
        <p><strong>If you disagree with rejection:</strong></p>
        <ul>
          <li>Document how deliverable meets contract specifications</li>
          <li>Reference specific SOW/CDRL requirements</li>
          <li>Request reconsideration from COR</li>
          <li>Escalate to CO if COR won't reconsider</li>
          <li>Consider filing claim if material impact (payment, schedule)</li>
        </ul>
        <p><strong>Impact of rejections:</strong></p>
        <ul>
          <li>Delays payment tied to deliverable</li>
          <li>Consumes additional effort (uncompensated on FFP)</li>
          <li>Damages relationship with COR</li>
          <li>Lowers <a href="/guides/cpars">CPARS</a> quality/management ratings</li>
          <li>May delay dependent work or milestones</li>
        </ul>
      `,
    },
    {
      heading: 'Best Practices for Deliverable Management',
      content: `
        <p><strong>During proposal phase:</strong></p>
        <ul>
          <li>Create deliverables matrix listing all required items, due dates, and effort</li>
          <li>Price adequately — don't underestimate deliverable effort</li>
          <li>Challenge unrealistic requirements (Q&A or proposal assumptions)</li>
          <li>Clarify ambiguous deliverables before contract award</li>
        </ul>
        <p><strong>After contract award:</strong></p>
        <ul>
          <li><strong>Create deliverables schedule:</strong> Calendar with all due dates</li>
          <li><strong>Set internal deadlines:</strong> 5-7 days before contract due date</li>
          <li><strong>Assign ownership:</strong> Specific person responsible for each deliverable</li>
          <li><strong>Track status:</strong> Dashboard or spreadsheet showing progress</li>
        </ul>
        <p><strong>During execution:</strong></p>
        <ul>
          <li><strong>Start early:</strong> Don't wait until deadline week to begin</li>
          <li><strong>Use templates:</strong> Develop templates for recurring deliverables</li>
          <li><strong>QA everything:</strong> Peer review + senior review before submission</li>
          <li><strong>Request feedback:</strong> For early deliverables, ask COR "How can we improve next time?"</li>
        </ul>
        <p><strong>Communication:</strong></p>
        <ul>
          <li>Notify COR 2-3 days before submission (heads-up)</li>
          <li>If running late, alert COR immediately and request extension</li>
          <li>After submission, confirm receipt and ask about review timeline</li>
          <li>If no feedback within review period, follow up</li>
        </ul>
        <p><strong>Quality control checklist:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Check</th>
            <th class="p-2 border border-slate-700 text-white">Status</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Meets CDRL/DID format requirements</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">All required sections included</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Technical content accurate and complete</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Proofread (no typos, grammar errors)</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Consistent with proposal commitments</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Figures/tables properly labeled</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">References cited correctly</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Proper markings (proprietary, classification)</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
        </table>
        <p><strong>Tools for tracking:</strong></p>
        <ul>
          <li><strong>Spreadsheet:</strong> Simple deliverables log (deliverable, owner, due date, status, acceptance date)</li>
          <li><strong>Project management software:</strong> MS Project, Smartsheet, Asana</li>
          <li><strong>Contract management systems:</strong> Costpoint, Deltek, Unanet</li>
        </ul>
      `,
    },
    {
      heading: 'Common Deliverable Types',
      content: `
        <p><strong>Management deliverables:</strong></p>
        <ul>
          <li><strong>Monthly status reports:</strong> Progress, metrics, issues (see <a href="/guides/status-reporting">status reporting</a>)</li>
          <li><strong>Project plans:</strong> Management plan, quality plan, security plan</li>
          <li><strong>Schedules:</strong> Integrated Master Schedule (IMS), updated periodically</li>
          <li><strong>Meeting minutes:</strong> <a href="/guides/kick-off-meetings">Kickoff</a>, monthly reviews, technical interchange meetings</li>
          <li><strong>Risk register:</strong> Identified risks, mitigation plans, status</li>
        </ul>
        <p><strong>Technical deliverables:</strong></p>
        <ul>
          <li><strong>Design documents:</strong> System design, architecture, specifications</li>
          <li><strong>Test plans and reports:</strong> Test procedures, results, acceptance test reports</li>
          <li><strong>Technical manuals:</strong> User manuals, maintenance manuals, training materials</li>
          <li><strong>Drawings and diagrams:</strong> Engineering drawings, schematics, network diagrams</li>
          <li><strong>Source code:</strong> Software code with documentation (if government has rights)</li>
        </ul>
        <p><strong>Financial deliverables (cost-type contracts):</strong></p>
        <ul>
          <li><strong>SF 1408:</strong> Preaward Survey of Prospective Contractor</li>
          <li><strong>SF 1411:</strong> Contract Pricing Proposal Cover Sheet</li>
          <li><strong>Incurred Cost submissions:</strong> Annual submission of actual costs</li>
          <li><strong>Cost performance reports:</strong> EVM reports (see <a href="/guides/earned-value-management">earned value management</a>)</li>
        </ul>
        <p><strong>Closeout deliverables:</strong></p>
        <ul>
          <li><strong>Final report:</strong> Summary of accomplishments, lessons learned</li>
          <li><strong>Final invoice:</strong> Marked "FINAL" (see <a href="/guides/contract-closeout">contract closeout</a>)</li>
          <li><strong>Property accountability:</strong> Final inventory and disposition</li>
          <li><strong>Final technical data:</strong> As-built drawings, final documentation</li>
        </ul>
        <p><strong>Special deliverable types:</strong></p>
        <p><strong>Draft vs. final:</strong></p>
        <ul>
          <li>Some CDRLs require draft for government review, then final incorporating feedback</li>
          <li>Draft = working document, final = official deliverable</li>
          <li>Both may have separate due dates</li>
        </ul>
        <p><strong>Interim vs. final:</strong></p>
        <ul>
          <li>Interim = periodic progress deliverables (monthly, quarterly)</li>
          <li>Final = end-of-contract comprehensive deliverable</li>
        </ul>
        <p><strong>Incremental deliverables:</strong></p>
        <ul>
          <li>Delivered in phases or increments</li>
          <li>Common in agile/iterative development</li>
          <li>Each increment must be accepted before next</li>
        </ul>
      `,
    },
    {
      heading: 'Digital Deliverables and Data Rights',
      content: `
        <p><strong>Format specifications:</strong></p>
        <ul>
          <li><strong>Native format:</strong> Editable source files (Word, Excel, CAD)</li>
          <li><strong>PDF:</strong> Non-editable, preserved formatting</li>
          <li><strong>Hardcopy:</strong> Printed/bound documents (increasingly rare)</li>
          <li><strong>Electronic media:</strong> CD/DVD/USB (rare, typically secure portal now)</li>
        </ul>
        <p><strong>Naming conventions:</strong></p>
        <ul>
          <li>Use consistent file naming (contract number, CDRL number, version, date)</li>
          <li>Example: <code>N00014-26-C-1234_CDRL-A001_Monthly-Status-Report_v1.0_2026-04-15.pdf</code></li>
        </ul>
        <p><strong>Version control:</strong></p>
        <ul>
          <li>Track version numbers for all deliverables</li>
          <li>Maintain version history (what changed between versions)</li>
          <li>Clearly mark revised submissions</li>
        </ul>
        <p><strong>Data rights and markings:</strong></p>
        <p>Government's rights to use, modify, reproduce, and disclose your deliverables depend on FAR 52.227 clauses:</p>
        <ul>
          <li><strong>Unlimited rights:</strong> Government can do anything (typical for deliverables created under contract)</li>
          <li><strong>Government Purpose Rights:</strong> Government can use for government purposes, not commercial</li>
          <li><strong>Limited rights:</strong> Government can use but not disclose externally (protects your proprietary data)</li>
          <li><strong>Restricted rights:</strong> Government can use but not modify (commercial software)</li>
        </ul>
        <p><strong>Marking requirements:</strong></p>
        <ul>
          <li>If deliverable contains proprietary information, mark it properly</li>
          <li>Header/footer: "Contains Proprietary Information — Limited Rights"</li>
          <li>Follow FAR 52.227-14 legend requirements</li>
          <li>Don't over-mark — government pushes back on excessive restrictions</li>
        </ul>
        <p><strong>Security markings:</strong></p>
        <ul>
          <li>Classified deliverables: Proper classification markings (SECRET, TOP SECRET, etc.)</li>
          <li>CUI (Controlled Unclassified Information): Mark per NIST SP 800-171</li>
          <li>ITAR/EAR: If export-controlled, mark accordingly</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What happens if I miss a deliverable deadline?',
      answer:
        'Late deliverables violate contract terms. Government may issue cure notice, withhold payment, lower CPARS ratings, or decline to exercise option years. If you\'ll be late, notify COR immediately and request extension in writing before the deadline.',
    },
    {
      question: 'Can I submit a draft for feedback before formal submission?',
      answer:
        'If not formally required, ask COR if they\'re willing to review draft. Many will, especially for complex deliverables or if you have good relationship. Increases acceptance likelihood and reduces rework. Frame as "collaborative approach to quality."',
    },
    {
      question: 'Who pays for rejected deliverable rework on FFP contracts?',
      answer:
        'You do. On firm-fixed-price contracts, you\'re obligated to deliver acceptable work within the contract price. Rework is at your expense. This is why internal QA before submission is critical.',
    },
    {
      question: 'Can government change deliverable requirements mid-contract?',
      answer:
        'Only through formal contract modification. If COR requests changes to CDRL specs or adds new deliverables, that requires CO approval and may warrant equitable adjustment (more money/time). Don\'t accept scope creep on deliverables.',
    },
    {
      question: 'How long does government have to accept/reject?',
      answer:
        'Contract typically specifies (e.g., 30 days). If not specified, "reasonable time" applies (usually 30 days). If government exceeds timeframe without accepting or rejecting, follow up. May constitute constructive acceptance if they use/implement without formal acceptance.',
    },
    {
      question: 'Can I reuse deliverables from other contracts?',
      answer:
        'Depends on data rights. If you have rights to prior deliverable (not government-funded or you retained rights), yes. If prior deliverable was created under government contract with unlimited rights, government owns it and you can\'t sell it again without permission. Check data rights clauses.',
    },
    {
      question: 'What if government loses my deliverable?',
      answer:
        'Keep proof of submission (email confirmation, portal receipt). If government loses it, resubmit but document that you submitted on time. Don\'t accept late performance ding for government\'s record-keeping problem.',
    },
    {
      question: 'Do I need to deliver in the exact CDRL format?',
      answer:
        'Yes, unless you get written approval to deviate. CDRL format is part of contract requirements. If format is impractical or outdated, negotiate change through modification. Unilateral deviation risks rejection.',
    },
  ],
  cta: {
    heading: 'Master Deliverable Management',
    description:
      'Effective deliverable management ensures on-time acceptance, protects your CPARS ratings, and maintains strong customer relationships. Our team helps you set up tracking systems, develop quality processes, and navigate complex CDRL requirements.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'status-reporting',
    'quality-assurance',
    'kick-off-meetings',
    'contract-surveillance',
    'contract-closeout',
  ],
  publishedDate: '2026-04-07',
};
