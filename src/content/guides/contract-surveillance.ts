import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'contract-surveillance',
  title: 'Government Contract Surveillance: Understanding Oversight and Inspection',
  metaTitle: 'Contract Surveillance Guide — QASP, COR Oversight & Inspection Methods',
  metaDescription:
    'Learn about government contract surveillance: types of surveillance (QASP, inspection), COR/COTR roles, surveillance methods, contractor responsibilities, and how to address deficiencies.',
  keywords: [
    'contract surveillance',
    'QASP',
    'quality assurance surveillance plan',
    'COR',
    'COTR',
    'contract oversight',
    'government inspection',
    'contract monitoring',
    'performance evaluation',
    'contractor surveillance',
  ],
  heroSubtitle:
    'Government surveillance ensures you\'re meeting contract requirements. Understanding how you\'re monitored, what the COR looks for, and how to address deficiencies protects your performance ratings and future opportunities.',
  sections: [
    {
      heading: 'What Is Contract Surveillance?',
      content: `
        <p><strong>Contract surveillance</strong> is the government's systematic monitoring of contractor performance to ensure compliance with contract terms, specifications, and quality standards.</p>
        <p><strong>Purpose of surveillance:</strong></p>
        <ul>
          <li><strong>Verify compliance</strong> — Ensure work meets contract requirements</li>
          <li><strong>Protect government interests</strong> — Detect problems before they become costly</li>
          <li><strong>Document performance</strong> — Support payment decisions and <a href="/guides/cpars">CPARS</a> ratings</li>
          <li><strong>Support corrective action</strong> — Identify deficiencies requiring correction</li>
        </ul>
        <p><strong>Legal basis:</strong></p>
        <ul>
          <li>FAR 42.1 — Contract Auditing and Surveillance</li>
          <li>FAR 46 — Quality Assurance</li>
          <li>Agency-specific policies and procedures</li>
        </ul>
        <p><strong>Who performs surveillance:</strong></p>
        <ul>
          <li><strong>Contracting Officer's Representative (COR/COTR)</strong> — Primary surveillance role</li>
          <li><strong>Quality Assurance Evaluator (QAE)</strong> — Performs inspections per QASP</li>
          <li><strong>Contracting Officer (CO)</strong> — Overall responsibility, may delegate</li>
          <li><strong>Technical SMEs</strong> — Specialized reviews (security, safety, etc.)</li>
          <li><strong>DCMA</strong> — Defense Contract Management Agency for major DoD contracts</li>
        </ul>
        <p><strong>Surveillance vs. inspection vs. audit:</strong></p>
        <ul>
          <li><strong>Surveillance:</strong> Ongoing monitoring of performance (broad)</li>
          <li><strong>Inspection:</strong> Examination of specific deliverables or work (specific)</li>
          <li><strong>Audit:</strong> Independent review of financial records and compliance (financial)</li>
        </ul>
      `,
    },
    {
      heading: 'Quality Assurance Surveillance Plan (QASP)',
      content: `
        <p><strong>What is a QASP?</strong></p>
        <p>The Quality Assurance Surveillance Plan is a government document that defines how contract performance will be monitored and evaluated.</p>
        <p><strong>QASP components:</strong></p>
        <ul>
          <li><strong>Performance standards</strong> — What constitutes acceptable performance</li>
          <li><strong>Surveillance methods</strong> — How government will monitor (100% inspection, sampling, customer feedback, etc.)</li>
          <li><strong>Frequency</strong> — How often surveillance occurs (daily, weekly, monthly)</li>
          <li><strong>Acceptable Quality Level (AQL)</strong> — Threshold for acceptable defect rate</li>
          <li><strong>Roles and responsibilities</strong> — Who performs surveillance and evaluation</li>
        </ul>
        <p><strong>Performance-based vs. compliance-based QASPs:</strong></p>
        <ul>
          <li><strong>Performance-based:</strong> Measures outcomes and results (e.g., "95% customer satisfaction")</li>
          <li><strong>Compliance-based:</strong> Measures adherence to processes (e.g., "submit reports by 5th of month")</li>
        </ul>
        <p>Performance-based QASPs are preferred but require well-defined measurable standards.</p>
        <p><strong>When you receive the QASP:</strong></p>
        <ul>
          <li>May be included in solicitation (ideal)</li>
          <li>May be provided at <a href="/guides/kick-off-meetings">kickoff</a> or shortly after award</li>
          <li>Some agencies develop QASP post-award with contractor input</li>
        </ul>
        <p><strong>Reading your QASP:</strong></p>
        <p>The QASP tells you exactly what government will measure and how. Pay close attention to:</p>
        <ul>
          <li>Which deliverables get 100% inspection vs. sampling</li>
          <li>Acceptable defect rates (e.g., "no more than 5% errors")</li>
          <li>Response time requirements (e.g., "acknowledge within 2 hours")</li>
          <li>Criteria for "satisfactory" vs. "unsatisfactory"</li>
        </ul>
        <p><strong>Negotiating the QASP:</strong></p>
        <p>If QASP standards are unrealistic or unclear, raise concerns early. COR may adjust if you have valid rationale. Don't agree to standards you can't meet.</p>
      `,
    },
    {
      heading: 'COR and COTR Roles',
      content: `
        <p><strong>Contracting Officer's Representative (COR):</strong></p>
        <p>Government employee designated by CO to monitor contractor performance and provide technical oversight.</p>
        <p><strong>COR authorities (per delegation letter):</strong></p>
        <ul>
          <li>Monitor contractor performance</li>
          <li>Inspect and accept/reject deliverables</li>
          <li>Approve invoices (within limits)</li>
          <li>Coordinate with contractor on technical matters</li>
          <li>Recommend contract modifications to CO</li>
          <li>Document performance for CPARS</li>
        </ul>
        <p><strong>What COR cannot do:</strong></p>
        <ul>
          <li><strong>Modify contract</strong> — Only CO has this authority</li>
          <li><strong>Direct out-of-scope work</strong> — Cannot unilaterally change requirements</li>
          <li><strong>Make commitments</strong> — Cannot bind government financially</li>
          <li><strong>Accept late deliverables</strong> — Without CO approval</li>
        </ul>
        <p><strong>COTR (Contracting Officer's Technical Representative):</strong></p>
        <p>Same role as COR, just different terminology. Some agencies use COTR, others use COR. Functionally equivalent.</p>
        <p><strong>COR delegation letter:</strong></p>
        <p>CO issues formal letter delegating authority to COR. This letter specifies:</p>
        <ul>
          <li>Specific authorities delegated</li>
          <li>Limits of authority (e.g., "approve invoices up to $50K")</li>
          <li>Contract(s) covered by delegation</li>
        </ul>
        <p>Ask to see the COR delegation letter at <a href="/guides/kick-off-meetings">kickoff</a>. Understand what the COR can and cannot do.</p>
        <p><strong>Working with your COR:</strong></p>
        <ul>
          <li><strong>Primary point of contact</strong> — Day-to-day technical and administrative issues</li>
          <li><strong>Escalation path</strong> — COR → CO for issues beyond COR authority</li>
          <li><strong>Regular communication</strong> — Weekly or monthly check-ins, plus ad-hoc as needed</li>
          <li><strong>Document everything</strong> — COR directions, approvals, and feedback in writing</li>
        </ul>
        <p><strong>COR performance evaluation:</strong></p>
        <p>COR's input is critical for your <a href="/guides/cpars">CPARS</a> rating. Build a strong working relationship — responsive, transparent, proactive problem-solving.</p>
      `,
    },
    {
      heading: 'Surveillance Methods',
      content: `
        <p><strong>1. 100% Inspection:</strong></p>
        <ul>
          <li>Every deliverable or unit of work inspected</li>
          <li>Used for high-risk or critical items</li>
          <li>Time-consuming but ensures quality</li>
        </ul>
        <p><strong>Example:</strong> Every security clearance application reviewed before submission.</p>
        <p><strong>2. Random Sampling:</strong></p>
        <ul>
          <li>Statistically valid sample inspected</li>
          <li>Results extrapolated to entire lot</li>
          <li>Efficient for high-volume repetitive work</li>
        </ul>
        <p><strong>Example:</strong> Inspect 10% of data entry records selected randomly.</p>
        <p><strong>3. Periodic Inspection:</strong></p>
        <ul>
          <li>Scheduled inspections at regular intervals</li>
          <li>Common for ongoing services</li>
        </ul>
        <p><strong>Example:</strong> Monthly facility inspections for janitorial contracts.</p>
        <p><strong>4. Customer Feedback/Surveys:</strong></p>
        <ul>
          <li>End users rate contractor performance</li>
          <li>Qualitative data on satisfaction, responsiveness</li>
          <li>Common for help desk, support services</li>
        </ul>
        <p><strong>Example:</strong> IT support tickets rated by users: satisfied/neutral/dissatisfied.</p>
        <p><strong>5. Performance Metrics/Data Analysis:</strong></p>
        <ul>
          <li>Government reviews contractor-submitted metrics</li>
          <li>Looks for trends, outliers, patterns</li>
          <li>Common for performance-based contracts</li>
        </ul>
        <p><strong>Example:</strong> Review <a href="/guides/status-reporting">monthly status reports</a> for on-time delivery rates.</p>
        <p><strong>6. Direct Observation:</strong></p>
        <ul>
          <li>Government observes work being performed</li>
          <li>Common for services performed on government site</li>
        </ul>
        <p><strong>Example:</strong> COR walks through facility to observe maintenance work.</p>
        <p><strong>7. Record Review:</strong></p>
        <ul>
          <li>Examination of contractor records, logs, documentation</li>
          <li>Verifies compliance with processes and procedures</li>
        </ul>
        <p><strong>Example:</strong> Review training records to verify all staff completed required certification.</p>
        <p><strong>8. Testing and Validation:</strong></p>
        <ul>
          <li>Government tests deliverables to verify functionality</li>
          <li>Common for software, equipment, systems</li>
        </ul>
        <p><strong>Example:</strong> User acceptance testing (UAT) for custom software development.</p>
        <p><strong>Surveillance frequency:</strong></p>
        <ul>
          <li><strong>Continuous:</strong> Real-time monitoring (e.g., system uptime)</li>
          <li><strong>Daily:</strong> High-risk or critical services</li>
          <li><strong>Weekly:</strong> Routine services with moderate risk</li>
          <li><strong>Monthly:</strong> Standard for most contracts</li>
          <li><strong>Quarterly:</strong> Low-risk, stable performance</li>
          <li><strong>Random/Unannounced:</strong> Prevents gaming the system</li>
        </ul>
      `,
    },
    {
      heading: 'Contractor Responsibilities',
      content: `
        <p><strong>Facilitate surveillance:</strong></p>
        <ul>
          <li>Provide access to facilities, records, personnel</li>
          <li>Respond to government requests for information</li>
          <li>Make subject matter experts available for interviews</li>
          <li>Don't obstruct or delay surveillance activities</li>
        </ul>
        <p><strong>Self-inspection and quality control:</strong></p>
        <p>Government surveillance doesn't replace your internal <a href="/guides/quality-assurance">quality assurance</a>. You're responsible for delivering quality work, not relying on government to catch your mistakes.</p>
        <ul>
          <li>Implement internal QA processes</li>
          <li>Conduct self-inspections before government review</li>
          <li>Identify and fix defects proactively</li>
        </ul>
        <p><strong>Documentation:</strong></p>
        <ul>
          <li>Maintain records required by contract</li>
          <li>Provide documentation requested for surveillance</li>
          <li>Keep evidence of quality control measures</li>
        </ul>
        <p><strong>Cooperation and transparency:</strong></p>
        <ul>
          <li>Answer questions honestly and completely</li>
          <li>Alert COR to problems before they discover them</li>
          <li>Explain root causes when issues arise</li>
          <li>Propose corrective actions</li>
        </ul>
        <p><strong>Compliance with surveillance findings:</strong></p>
        <ul>
          <li>Acknowledge deficiencies identified</li>
          <li>Implement corrective actions promptly</li>
          <li>Demonstrate fixes have been applied</li>
          <li>Report on effectiveness of corrective actions</li>
        </ul>
        <p><strong>What you can push back on:</strong></p>
        <ul>
          <li><strong>Unreasonable access demands</strong> — Must balance with security, IP protection, other client work</li>
          <li><strong>Out-of-scope surveillance</strong> — Government can only inspect work covered by contract</li>
          <li><strong>Improper rejection</strong> — If work meets specs but is rejected, escalate to CO</li>
        </ul>
      `,
    },
    {
      heading: 'Addressing Deficiencies',
      content: `
        <p><strong>Types of deficiencies:</strong></p>
        <ul>
          <li><strong>Minor deficiency:</strong> Doesn't materially affect use, correctable quickly</li>
          <li><strong>Major deficiency:</strong> Materially affects use, function, or safety</li>
          <li><strong>Critical deficiency:</strong> Prevents use or poses safety/security risk</li>
        </ul>
        <p><strong>When deficiencies are identified:</strong></p>
        <p><strong>1. Acknowledgment:</strong></p>
        <ul>
          <li>Don't argue or make excuses immediately</li>
          <li>Acknowledge the finding</li>
          <li>Ask clarifying questions to fully understand</li>
        </ul>
        <p><strong>2. Root cause analysis:</strong></p>
        <ul>
          <li>Investigate why deficiency occurred</li>
          <li>Don't just fix the symptom, fix the cause</li>
          <li>Involve team in understanding what went wrong</li>
        </ul>
        <p><strong>3. Corrective action plan:</strong></p>
        <ul>
          <li><strong>Immediate fix:</strong> Correct the specific deficiency</li>
          <li><strong>Systemic fix:</strong> Prevent recurrence (process changes, training, etc.)</li>
          <li><strong>Timeline:</strong> When will fixes be complete?</li>
          <li><strong>Verification:</strong> How will you prove it's fixed?</li>
        </ul>
        <p><strong>4. Documentation:</strong></p>
        <ul>
          <li>Document the deficiency, root cause, and corrective actions</li>
          <li>Provide written response to COR</li>
          <li>Track corrective action completion</li>
        </ul>
        <p><strong>5. Verification:</strong></p>
        <ul>
          <li>Demonstrate to COR that issue is resolved</li>
          <li>Provide evidence of corrective actions implemented</li>
          <li>Show sustained improvement (not one-time fix)</li>
        </ul>
        <p><strong>Formal deficiency notifications:</strong></p>
        <p><strong>Letter of Concern:</strong></p>
        <ul>
          <li>Informal notice of performance issue</li>
          <li>Gives contractor opportunity to correct before formal action</li>
        </ul>
        <p><strong>Cure Notice (FAR 52.249-8 or 52.249-10):</strong></p>
        <ul>
          <li>Formal notice that you're failing to perform</li>
          <li>Specifies deficiencies and cure period (typically 10 days)</li>
          <li>Failure to cure can lead to termination for default</li>
        </ul>
        <p><strong>Show Cause Notice:</strong></p>
        <ul>
          <li>Demands explanation why contract shouldn't be terminated</li>
          <li>More serious than cure notice</li>
          <li>Termination likely if response is inadequate</li>
        </ul>
        <p><strong>If you disagree with findings:</strong></p>
        <ul>
          <li>Provide factual basis for disagreement</li>
          <li>Reference contract specifications</li>
          <li>Escalate to CO if COR won't reconsider</li>
          <li>Consider filing claim if material to payment or reputation</li>
        </ul>
      `,
    },
    {
      heading: 'Surveillance and CPARS',
      content: `
        <p><strong>Direct connection:</strong></p>
        <p>Government uses surveillance findings as primary basis for <a href="/guides/cpars">CPARS</a> performance ratings. Your surveillance record IS your CPARS rating.</p>
        <p><strong>What COR documents:</strong></p>
        <ul>
          <li>Deliverable acceptance/rejection rates</li>
          <li>Timeliness (on-time vs. late)</li>
          <li>Quality metrics (error rates, rework)</li>
          <li>Customer satisfaction (complaints, compliments)</li>
          <li>Responsiveness (how quickly you address issues)</li>
          <li>Deficiencies and corrective actions</li>
        </ul>
        <p><strong>Building a strong surveillance record:</strong></p>
        <ul>
          <li><strong>Exceed standards:</strong> Don't just meet minimums — exceed when possible</li>
          <li><strong>Early delivery:</strong> Submit deliverables ahead of deadlines</li>
          <li><strong>Proactive communication:</strong> Alert COR to issues before they find them</li>
          <li><strong>Responsive:</strong> Quick turnaround on requests and fixes</li>
          <li><strong>Quality first:</strong> Don't rush and submit defective work</li>
          <li><strong>Process improvement:</strong> Show continuous improvement over time</li>
        </ul>
        <p><strong>The "no surprises" rule:</strong></p>
        <p>COR should never be surprised. If there's a problem, tell them before they discover it. If there's a success, make sure they know. Control the narrative.</p>
        <p><strong>Surveillance documentation you should keep:</strong></p>
        <ul>
          <li>All correspondence with COR/QAE</li>
          <li>Inspection reports and findings</li>
          <li>Corrective action plans and completion evidence</li>
          <li>Acceptance memos for deliverables</li>
          <li>Meeting minutes discussing performance</li>
        </ul>
        <p>This documentation supports your CPARS review and future <a href="/guides/past-performance">past performance</a> references.</p>
        <p><strong>Quarterly performance reviews:</strong></p>
        <p>Some contracts have formal quarterly reviews where COR discusses performance. Treat these seriously — they preview your CPARS and give you opportunity to course-correct.</p>
      `,
    },
    {
      heading: 'Special Surveillance Situations',
      content: `
        <p><strong>DCMA surveillance (DoD contracts):</strong></p>
        <p>Defense Contract Management Agency provides surveillance for major DoD contracts. More rigorous than typical COR oversight.</p>
        <ul>
          <li>DCMA reviews schedules, earned value, quality systems</li>
          <li>May conduct on-site reviews and inspections</li>
          <li>Issues Contract Deficiency Reports (CDRs) for non-compliance</li>
          <li>Can recommend withholding payment or contract action</li>
        </ul>
        <p><strong>DCAA audits:</strong></p>
        <p>While not surveillance per se, <a href="/guides/dcaa-audits">DCAA audits</a> of cost-type contracts serve similar oversight function. Separate from COR surveillance but equally important.</p>
        <p><strong>Software development surveillance:</strong></p>
        <ul>
          <li>Code reviews and static analysis</li>
          <li>User acceptance testing (UAT)</li>
          <li>Security scanning (SAST, DAST)</li>
          <li>Agile sprint reviews and demos</li>
        </ul>
        <p><strong>Construction surveillance:</strong></p>
        <ul>
          <li>Daily inspection logs</li>
          <li>Progress photos and videos</li>
          <li>Material testing and certifications</li>
          <li>Safety inspections</li>
          <li>Punch lists and final walkthrough</li>
        </ul>
        <p><strong>Services surveillance (help desk, maintenance):</strong></p>
        <ul>
          <li>Ticket/call logs analysis</li>
          <li>Response time tracking</li>
          <li>Customer satisfaction surveys</li>
          <li>Facility walkthroughs</li>
          <li>Random sampling of completed work</li>
        </ul>
        <p><strong>Multiple-award IDIQ surveillance:</strong></p>
        <ul>
          <li>Surveillance at contract vehicle level (minimal)</li>
          <li>Surveillance at task order level (detailed)</li>
          <li>Different CORs for different task orders</li>
          <li>Maintain consistent quality across all orders</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Can the government surveil my subcontractors?',
      answer:
        'The government can request access to subcontractor facilities and records if relevant to contract performance. However, you (prime) are responsible for subcontractor surveillance and performance. Don\'t rely on government to monitor your subs.',
    },
    {
      question: 'What if COR keeps changing requirements during surveillance?',
      answer:
        'COR cannot unilaterally change requirements — only the CO can modify the contract. If COR is effectively directing new work, document it and escalate to CO. May require contract modification.',
    },
    {
      question: 'How much access must I give for surveillance?',
      answer:
        'Contract typically specifies access rights (FAR 52.246-2 or similar). Generally, you must provide reasonable access to facilities, records, and personnel. You can protect trade secrets and IP, but can\'t obstruct legitimate surveillance.',
    },
    {
      question: 'Can I see the surveillance reports?',
      answer:
        'You should request copies of formal inspection reports and findings. Informal COR notes may not be shared. If deficiencies are found, you have right to know what they are and respond.',
    },
    {
      question: 'What if I think the COR is being unreasonable?',
      answer:
        'Document specific instances of unreasonable demands. Escalate to CO with factual basis for concern. Don\'t circumvent COR or antagonize them — work through proper channels professionally.',
    },
    {
      question: 'Does more surveillance mean I\'m doing poorly?',
      answer:
        'Not necessarily. Surveillance intensity is often driven by contract type, risk level, or agency policy. However, if surveillance increases mid-contract, it may signal government concerns about your performance.',
    },
    {
      question: 'Can government surveillance my staff performance reviews?',
      answer:
        'Government can observe your staff\'s work performance but not access internal HR records (performance reviews, disciplinary actions) unless contract specifically requires it (rare). Protect employee privacy while facilitating legitimate oversight.',
    },
    {
      question: 'What records should I keep for surveillance?',
      answer:
        'Keep everything: correspondence, inspection reports, test results, acceptance memos, corrective action plans, and evidence of compliance. Retain per FAR record retention requirements (typically 3 years after final payment). Critical for CPARS and disputes.',
    },
  ],
  cta: {
    heading: 'Navigate Surveillance Successfully',
    description:
      'Effective response to government surveillance protects your performance ratings and builds trust. Our team helps you implement quality assurance processes, address deficiencies, and maintain strong government relationships.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'quality-assurance',
    'cpars',
    'kick-off-meetings',
    'deliverables-management',
    'contract-closeout',
  ],
  publishedDate: '2026-04-07',
};
