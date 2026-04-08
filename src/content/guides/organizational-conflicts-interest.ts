import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'organizational-conflicts-interest',
  title: 'Organizational Conflicts of Interest: Understanding and Managing OCI in Government Contracts',
  metaTitle: 'Organizational Conflicts of Interest (OCI) Guide — Types, Mitigation & Compliance',
  metaDescription:
    'Learn about organizational conflicts of interest in government contracting: the three OCI types, identification, mitigation strategies, and compliance requirements.',
  keywords: [
    'organizational conflict of interest',
    'oci government contracts',
    'oci mitigation',
    'conflict of interest',
    'biased ground rules',
    'impaired objectivity',
    'unequal access',
    'oci waiver',
    'far oci',
    'oci plan',
  ],
  heroSubtitle:
    'OCIs can disqualify you from competitions, terminate contracts, and damage your reputation. Understanding and managing conflicts isn\'t optional — it\'s a survival skill.',
  sections: [
    {
      heading: 'What Is an Organizational Conflict of Interest?',
      content: `
        <p>An <strong>Organizational Conflict of Interest (OCI)</strong> exists when a contractor's other activities or relationships could impair its objectivity or give it an unfair competitive advantage in a government procurement.</p>
        <p><strong>Why OCIs matter:</strong></p>
        <ul>
          <li>Can disqualify you from contract awards</li>
          <li>Can result in contract termination</li>
          <li>May lead to debarment</li>
          <li>Damage customer relationships and reputation</li>
        </ul>
        <p><strong>OCI regulatory basis:</strong></p>
        <p>FAR Subpart 9.5 governs OCIs. It requires contracting officers to:</p>
        <ul>
          <li>Identify potential OCIs early in acquisition planning</li>
          <li>Evaluate the significance of potential conflicts</li>
          <li>Avoid, neutralize, or mitigate conflicts</li>
          <li>Include appropriate clauses in contracts</li>
        </ul>
        <p><strong>The core principle:</strong></p>
        <p>Government contracting must be fair and objective. Any situation where a contractor's interests could compromise that fairness is an OCI — even if the contractor acts with complete integrity.</p>
        <p><strong>Perception matters:</strong></p>
        <p>OCIs are about potential for conflict, not just actual misconduct. Even the appearance of conflict can be disqualifying.</p>
      `,
    },
    {
      heading: 'The Three Types of OCI',
      content: `
        <p>FAR recognizes three distinct OCI types. Understanding each is critical for identification and mitigation.</p>
        <p><strong>1. Biased Ground Rules</strong></p>
        <p>A contractor sets the "rules" for a competition in which it will compete.</p>
        <p><strong>Example:</strong> Company writes the SOW for a contract, then bids on that contract. They may have tilted requirements toward their capabilities.</p>
        <p><strong>Key question:</strong> Did you help define requirements you'll compete to fulfill?</p>
        <p><strong>2. Unequal Access to Information</strong></p>
        <p>A contractor has access to non-public information that gives competitive advantage.</p>
        <p><strong>Example:</strong> Contractor performing pre-award support sees competitor pricing or proprietary technical approaches, then competes against those competitors.</p>
        <p><strong>Key question:</strong> Do you have information competitors don't have that would affect the competition?</p>
        <p><strong>3. Impaired Objectivity</strong></p>
        <p>A contractor's judgment may be compromised by its financial or other interests.</p>
        <p><strong>Example:</strong> Contractor evaluates its own products/services or those of a competitor when the evaluation affects who wins work.</p>
        <p><strong>Key question:</strong> Would your recommendations affect your own business interests?</p>
        <p><strong>Multiple OCIs:</strong></p>
        <p>A situation can involve multiple OCI types simultaneously. Each requires separate analysis and potentially different mitigation approaches.</p>
      `,
    },
    {
      heading: 'Identifying Potential OCIs',
      content: `
        <p><strong>When to look for OCIs:</strong></p>
        <ul>
          <li>During capture — before pursuing an opportunity</li>
          <li>At proposal time — before committing resources</li>
          <li>During contract performance — as situations change</li>
          <li>When acquiring companies or teaming</li>
        </ul>
        <p><strong>Questions to ask:</strong></p>
        <p><strong>For Biased Ground Rules:</strong></p>
        <ul>
          <li>Did we help write the SOW, specifications, or evaluation criteria?</li>
          <li>Did we provide systems engineering or technical direction?</li>
          <li>Did we conduct studies that influenced requirements?</li>
        </ul>
        <p><strong>For Unequal Access:</strong></p>
        <ul>
          <li>Do we have non-public information about competitors?</li>
          <li>Did we see proposal or pricing information?</li>
          <li>Do we have access to source selection information?</li>
        </ul>
        <p><strong>For Impaired Objectivity:</strong></p>
        <ul>
          <li>Would our evaluation affect our own products/services?</li>
          <li>Are we evaluating work we might perform or compete for?</li>
          <li>Could our advice steer business to ourselves?</li>
        </ul>
        <p><strong>Common OCI scenarios:</strong></p>
        <ul>
          <li>SETA (Systems Engineering and Technical Assistance) work</li>
          <li>Advisory and assistance services</li>
          <li>Pre-award support followed by competition</li>
          <li>Acquisition of companies with government work</li>
          <li>Teaming with competitors on some contracts</li>
        </ul>
      `,
    },
    {
      heading: 'OCI Mitigation Strategies',
      content: `
        <p>When OCIs are identified, you must either avoid the conflict or mitigate it effectively.</p>
        <p><strong>Avoidance:</strong></p>
        <p>The cleanest solution — don't pursue the conflicting opportunity:</p>
        <ul>
          <li>Decline to compete on work you helped define</li>
          <li>Choose between SETA and implementation work</li>
          <li>Exclude certain business lines from competitions</li>
        </ul>
        <p><strong>Mitigation measures:</strong></p>
        <p><strong>For Biased Ground Rules:</strong></p>
        <ul>
          <li>Exclude personnel who wrote requirements from proposal team</li>
          <li>Document that requirements reflect government needs, not company capabilities</li>
          <li>Ensure government independently validated requirements</li>
        </ul>
        <p><strong>For Unequal Access:</strong></p>
        <ul>
          <li>Implement firewalls — physical and electronic separation</li>
          <li>Restrict information access to need-to-know</li>
          <li>Non-disclosure agreements and training</li>
          <li>Independent verification of separation</li>
        </ul>
        <p><strong>For Impaired Objectivity:</strong></p>
        <ul>
          <li>Use independent reviewers for assessments</li>
          <li>Recuse company from affected evaluations</li>
          <li>Structural separation between advisory and competitive work</li>
        </ul>
        <p><strong>Mitigation plan elements:</strong></p>
        <ul>
          <li>Specific measures to address each identified OCI</li>
          <li>Personnel restrictions and firewalls</li>
          <li>Monitoring and enforcement procedures</li>
          <li>Training requirements</li>
          <li>Verification and audit provisions</li>
        </ul>
      `,
    },
    {
      heading: 'OCI Disclosures and Proposals',
      content: `
        <p><strong>Disclosure obligations:</strong></p>
        <p>You must disclose potential OCIs to the contracting officer. Failure to disclose can result in:</p>
        <ul>
          <li>Disqualification from award</li>
          <li>Contract termination</li>
          <li>False Claims Act liability (if you knowingly concealed)</li>
        </ul>
        <p><strong>When to disclose:</strong></p>
        <ul>
          <li>With your proposal — before award</li>
          <li>When circumstances change during performance</li>
          <li>When you acquire companies or hire personnel with potential conflicts</li>
        </ul>
        <p><strong>What to disclose:</strong></p>
        <ul>
          <li>Nature of the potential conflict</li>
          <li>Relevant work, contracts, or relationships</li>
          <li>Personnel involved</li>
          <li>Proposed mitigation measures</li>
        </ul>
        <p><strong>Proposal OCI language:</strong></p>
        <p>Many solicitations require OCI representations. Respond carefully:</p>
        <ul>
          <li>Certify no OCI if true</li>
          <li>Disclose and propose mitigation if potential exists</li>
          <li>Never misrepresent — it's worse than the OCI itself</li>
        </ul>
        <p><strong>OCI mitigation plans in proposals:</strong></p>
        <p>If you identify a potential OCI, include a detailed mitigation plan. Show the government you've thought through the issue and have credible solutions.</p>
      `,
    },
    {
      heading: 'Contracting Officer Decisions',
      content: `
        <p><strong>CO authority:</strong></p>
        <p>The contracting officer decides whether an OCI exists and whether mitigation is sufficient. This is a judgment call with significant discretion.</p>
        <p><strong>What COs consider:</strong></p>
        <ul>
          <li>Nature and severity of potential conflict</li>
          <li>Likelihood conflict would affect objectivity</li>
          <li>Effectiveness of proposed mitigation</li>
          <li>Impact on the acquisition if contractor excluded</li>
          <li>Government's ability to independently verify work</li>
        </ul>
        <p><strong>Possible CO decisions:</strong></p>
        <ul>
          <li><strong>No OCI</strong> — Issue doesn't rise to the level of conflict</li>
          <li><strong>OCI mitigated</strong> — Your mitigation plan is acceptable</li>
          <li><strong>OCI not mitigable</strong> — You're excluded from competition</li>
          <li><strong>Waiver</strong> — OCI exists but is waived in government's interest</li>
        </ul>
        <p><strong>OCI waivers:</strong></p>
        <p>Waivers are rare. They require:</p>
        <ul>
          <li>Head of contracting activity (or delegate) approval</li>
          <li>Determination that it's in government's interest</li>
          <li>Documentation of rationale</li>
        </ul>
        <p>Don't count on waivers — build your strategy around avoiding or mitigating.</p>
        <p><strong>Challenging OCI decisions:</strong></p>
        <p>If you're excluded based on OCI, you can protest. GAO reviews whether the CO's determination was reasonable based on the facts.</p>
      `,
    },
    {
      heading: 'OCI in SETA and Advisory Contracts',
      content: `
        <p><strong>Why SETA work is high-risk:</strong></p>
        <p>Systems Engineering and Technical Assistance (SETA) contractors often:</p>
        <ul>
          <li>Help define requirements (biased ground rules risk)</li>
          <li>See proprietary information (unequal access risk)</li>
          <li>Evaluate contractor performance (impaired objectivity risk)</li>
        </ul>
        <p>SETA work frequently precludes competing on related implementation contracts.</p>
        <p><strong>Common restrictions:</strong></p>
        <ul>
          <li>Can't compete for work you helped define</li>
          <li>Can't evaluate competitors' proposals</li>
          <li>Can't access source selection information</li>
          <li>May be barred from entire program competitions</li>
        </ul>
        <p><strong>Strategic considerations:</strong></p>
        <ul>
          <li>SETA provides deep customer insight but limits future opportunities</li>
          <li>Implementation work has larger revenue but requires winning competitions</li>
          <li>Company structure may separate SETA and implementation units</li>
        </ul>
        <p><strong>Firewall approach:</strong></p>
        <p>Large companies often establish organizational firewalls:</p>
        <ul>
          <li>Separate business units for SETA vs. implementation</li>
          <li>Physical separation of personnel and systems</li>
          <li>Information flow restrictions</li>
          <li>Compliance monitoring</li>
        </ul>
        <p>Firewalls don't always work — government may still find OCIs exist despite separation.</p>
      `,
    },
    {
      heading: 'Managing OCIs: Best Practices',
      content: `
        <p><strong>Establish an OCI program:</strong></p>
        <ul>
          <li>Written policies and procedures</li>
          <li>Designated OCI officer/team</li>
          <li>Regular training for business development and contracts staff</li>
          <li>Database tracking potential conflicts</li>
        </ul>
        <p><strong>Early identification:</strong></p>
        <ul>
          <li>Evaluate OCI risk at capture phase</li>
          <li>Include OCI review in bid/no-bid decisions</li>
          <li>Don't wait until proposal submission</li>
        </ul>
        <p><strong>Due diligence:</strong></p>
        <p>When acquiring companies or hiring key personnel:</p>
        <ul>
          <li>Assess their existing OCI obligations</li>
          <li>Review contracts for OCI restrictions</li>
          <li>Plan for inherited conflicts</li>
        </ul>
        <p><strong>Documentation:</strong></p>
        <ul>
          <li>Document OCI analysis for every opportunity</li>
          <li>Keep records of disclosures and responses</li>
          <li>Maintain mitigation plan implementation evidence</li>
        </ul>
        <p><strong>Monitor and update:</strong></p>
        <ul>
          <li>Circumstances change — revisit OCI assessments</li>
          <li>New wins can create new conflicts</li>
          <li>Personnel moves can trigger issues</li>
        </ul>
        <p><strong>Proactive communication:</strong></p>
        <p>When potential OCIs arise, proactively discuss with the contracting officer. Early engagement shows good faith and allows collaborative problem-solving.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Does personal conflict of interest differ from organizational conflict?',
      answer:
        'Yes. Personal conflicts involve individual employees (e.g., financial interests, relationships). Organizational conflicts involve the company\'s business relationships. Both matter, but FAR Subpart 9.5 specifically addresses organizational conflicts. Personal conflicts are addressed through contractor ethics requirements.',
    },
    {
      question: 'Can subcontractors create OCI issues for the prime?',
      answer:
        'Yes. A subcontractor\'s conflicts can be imputed to the prime contractor. You must evaluate subcontractor OCIs and ensure they don\'t compromise the team. Include OCI representations in teaming and subcontract agreements.',
    },
    {
      question: 'How long do OCI restrictions last?',
      answer:
        'Depends on the nature of the conflict and contract terms. Some solicitations specify exclusion periods (e.g., "cannot compete for implementation for 2 years after SETA work"). Without specific terms, conflicts typically persist while the underlying conditions exist.',
    },
    {
      question: 'Can I protest if a competitor has an OCI?',
      answer:
        'Yes. If you believe a competitor has an unmitigated OCI that should have disqualified them, you can protest. You\'ll need evidence of the conflict and its materiality to the competition.',
    },
    {
      question: 'Do firewalls always work to mitigate OCIs?',
      answer:
        'No. Government may determine that firewalls are insufficient for certain conflicts. The effectiveness depends on the nature of the conflict, credibility of the firewall, and government\'s ability to verify compliance. Firewalls are one tool, not a universal solution.',
    },
    {
      question: 'What if I discover an OCI after contract award?',
      answer:
        'Disclose immediately to the contracting officer. Propose mitigation. Failure to disclose can result in termination and potential fraud allegations. Prompt disclosure with a mitigation plan demonstrates good faith.',
    },
    {
      question: 'Are there OCIs on fixed-price contracts?',
      answer:
        'Yes. Contract type doesn\'t eliminate OCI concerns. Even on FFP contracts, you can have biased ground rules (writing specs you\'ll bid on) or impaired objectivity (evaluating your own work). OCI analysis applies to all contract types.',
    },
    {
      question: 'How do mergers and acquisitions affect OCIs?',
      answer:
        'Acquiring a company means inheriting their OCIs. Conduct OCI due diligence before acquisition. Post-acquisition, you may need to divest conflicting work, establish firewalls, or notify contracting officers of changed circumstances.',
    },
  ],
  cta: {
    heading: 'Navigate OCI Challenges',
    description:
      'OCI management requires proactive identification and effective mitigation. Our team helps you assess conflicts, develop mitigation strategies, and protect your competitive position.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'far-overview',
    'capture-management',
    'proposal-writing',
    'teaming-agreements',
    'bid-no-bid',
  ],
  publishedDate: '2026-04-07',
};
