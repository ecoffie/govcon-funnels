import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'quality-assurance',
  title: 'Quality Assurance for Government Contractors: QA Plans and Compliance',
  metaTitle: 'Quality Assurance Guide — Government Contract QA Requirements & Plans',
  metaDescription:
    'Learn quality assurance requirements for government contracts: QA plans, quality control procedures, inspection requirements, ISO standards, and corrective actions.',
  keywords: [
    'quality assurance',
    'qa plan',
    'quality control',
    'government contract quality',
    'qasp',
    'inspection',
    'iso certification',
    'quality management',
    'corrective action',
    'quality standards',
  ],
  heroSubtitle:
    'Quality isn\'t optional in government contracting. Robust QA processes protect your performance ratings, contract compliance, and long-term success.',
  sections: [
    {
      heading: 'Quality Requirements in Government Contracts',
      content: `
        <p>Government contracts typically include quality requirements that contractors must meet. These vary by contract type and complexity.</p>
        <p><strong>Common quality clauses:</strong></p>
        <ul>
          <li><strong>FAR 52.246-1</strong> — Contractor Inspection Requirements (Supplies)</li>
          <li><strong>FAR 52.246-4</strong> — Inspection of Services—Fixed Price</li>
          <li><strong>FAR 52.246-5</strong> — Inspection of Services—Cost Reimbursement</li>
          <li><strong>DFARS supplements</strong> for defense contracts</li>
        </ul>
        <p><strong>Quality Assurance Surveillance Plan (QASP):</strong></p>
        <p>Government document that describes how performance will be monitored:</p>
        <ul>
          <li>What will be inspected/evaluated</li>
          <li>Performance standards and metrics</li>
          <li>Inspection methods and frequency</li>
          <li>Consequences of non-conformance</li>
        </ul>
        <p><strong>Your Quality Control Plan (QCP):</strong></p>
        <p>Your internal plan for ensuring quality before government inspection.</p>
      `,
    },
    {
      heading: 'Developing a Quality Control Plan',
      content: `
        <p><strong>QCP elements:</strong></p>
        <ul>
          <li><strong>Quality policy</strong> — Your commitment to quality</li>
          <li><strong>Organization</strong> — Who is responsible for QC</li>
          <li><strong>Procedures</strong> — How quality is assured at each step</li>
          <li><strong>Inspection points</strong> — Where/when inspections occur</li>
          <li><strong>Documentation</strong> — Records of quality activities</li>
          <li><strong>Corrective action</strong> — How deficiencies are addressed</li>
        </ul>
        <p><strong>Process-based approach:</strong></p>
        <ol>
          <li>Identify key processes</li>
          <li>Define quality requirements for each</li>
          <li>Establish controls and checkpoints</li>
          <li>Train personnel</li>
          <li>Monitor and measure</li>
          <li>Improve continuously</li>
        </ol>
        <p><strong>Tailoring to contract:</strong></p>
        <ul>
          <li>Match QCP to QASP requirements</li>
          <li>Address all contract deliverables</li>
          <li>Scale to contract size/complexity</li>
          <li>Don't over-engineer for simple contracts</li>
        </ul>
      `,
    },
    {
      heading: 'Quality Standards and Certifications',
      content: `
        <p><strong>ISO 9001:</strong></p>
        <p>International standard for quality management systems:</p>
        <ul>
          <li>Not always required but often preferred</li>
          <li>Demonstrates systematic quality approach</li>
          <li>Requires certification audit</li>
          <li>Annual surveillance audits</li>
        </ul>
        <p><strong>AS9100:</strong></p>
        <p>Quality management for aerospace/defense:</p>
        <ul>
          <li>Based on ISO 9001 with additional requirements</li>
          <li>Often required for DoD manufacturing</li>
          <li>More rigorous than ISO 9001</li>
        </ul>
        <p><strong>CMMI:</strong></p>
        <p>Capability Maturity Model Integration for processes:</p>
        <ul>
          <li>Levels 1-5 indicate process maturity</li>
          <li>Common for software development</li>
          <li>Some contracts specify minimum level</li>
        </ul>
        <p><strong>When certifications help:</strong></p>
        <ul>
          <li>Required by specific contracts</li>
          <li>Competitive differentiator in proposals</li>
          <li>Reduces customer audit burden</li>
          <li>Demonstrates organizational commitment</li>
        </ul>
      `,
    },
    {
      heading: 'Inspection and Acceptance',
      content: `
        <p><strong>Government inspection rights:</strong></p>
        <p>The government has broad rights to inspect contractor performance:</p>
        <ul>
          <li>Access to work areas</li>
          <li>Review of documentation</li>
          <li>Testing of products/deliverables</li>
          <li>Surveillance of processes</li>
        </ul>
        <p><strong>Acceptance process:</strong></p>
        <ol>
          <li>Contractor completes work/deliverable</li>
          <li>Contractor performs internal QC</li>
          <li>Contractor submits for government inspection</li>
          <li>Government inspects/tests</li>
          <li>Government accepts or rejects</li>
        </ol>
        <p><strong>Types of inspection:</strong></p>
        <ul>
          <li><strong>In-process</strong> — During performance</li>
          <li><strong>Final</strong> — Upon completion</li>
          <li><strong>Surveillance</strong> — Ongoing monitoring</li>
          <li><strong>Random sampling</strong> — Statistical approach</li>
        </ul>
        <p><strong>Non-conforming work:</strong></p>
        <ul>
          <li>Government can reject deficient work</li>
          <li>Contractor must correct at own expense (usually)</li>
          <li>May impact CPARS and future awards</li>
        </ul>
      `,
    },
    {
      heading: 'Performance-Based Contracting',
      content: `
        <p><strong>Performance-based service contracts:</strong></p>
        <p>Many service contracts use performance-based approaches:</p>
        <ul>
          <li>Outcomes defined, not specific methods</li>
          <li>Performance standards with metrics</li>
          <li>Incentives/penalties tied to performance</li>
        </ul>
        <p><strong>Performance metrics:</strong></p>
        <p>Common types of metrics:</p>
        <ul>
          <li><strong>Quality</strong> — Defect rates, accuracy, compliance</li>
          <li><strong>Timeliness</strong> — On-time delivery, response time</li>
          <li><strong>Customer satisfaction</strong> — Surveys, complaints</li>
          <li><strong>Quantity</strong> — Volume, throughput</li>
        </ul>
        <p><strong>Acceptable Quality Levels (AQL):</strong></p>
        <ul>
          <li>Minimum acceptable performance level</li>
          <li>Defines threshold for acceptance</li>
          <li>Below AQL = non-compliance</li>
        </ul>
        <p><strong>Performance incentives:</strong></p>
        <ul>
          <li>Positive incentives for exceeding standards</li>
          <li>Negative incentives (deductions) for falling short</li>
          <li>Award fee tied to performance evaluation</li>
        </ul>
      `,
    },
    {
      heading: 'Corrective and Preventive Action',
      content: `
        <p><strong>When quality issues occur:</strong></p>
        <p>A systematic approach to addressing problems:</p>
        <p><strong>Corrective Action:</strong></p>
        <ol>
          <li>Identify the problem</li>
          <li>Contain immediate effects</li>
          <li>Determine root cause</li>
          <li>Develop corrective action</li>
          <li>Implement and verify effectiveness</li>
          <li>Document and close</li>
        </ol>
        <p><strong>Preventive Action:</strong></p>
        <ol>
          <li>Identify potential problems</li>
          <li>Assess risk</li>
          <li>Develop preventive measures</li>
          <li>Implement controls</li>
          <li>Monitor effectiveness</li>
        </ol>
        <p><strong>Root cause analysis:</strong></p>
        <ul>
          <li>Don't just fix symptoms</li>
          <li>Use structured methods (5 Whys, fishbone diagram)</li>
          <li>Address underlying causes</li>
          <li>Prevent recurrence</li>
        </ul>
        <p><strong>Corrective Action Requests (CARs):</strong></p>
        <ul>
          <li>Formal documentation of quality issues</li>
          <li>Track from identification to closure</li>
          <li>Demonstrate systematic quality management</li>
        </ul>
      `,
    },
    {
      heading: 'Quality Documentation',
      content: `
        <p><strong>What to document:</strong></p>
        <ul>
          <li>Quality procedures and work instructions</li>
          <li>Inspection and test records</li>
          <li>Non-conformance reports</li>
          <li>Corrective action records</li>
          <li>Training records</li>
          <li>Audit reports</li>
        </ul>
        <p><strong>Record retention:</strong></p>
        <ul>
          <li>Contract specifies retention period</li>
          <li>Typically 6+ years</li>
          <li>May be longer for certain programs</li>
          <li>Organize for easy retrieval</li>
        </ul>
        <p><strong>Documentation best practices:</strong></p>
        <ul>
          <li>Create as work is performed, not after</li>
          <li>Be specific and factual</li>
          <li>Include dates, names, specifics</li>
          <li>Make retrievable and organized</li>
        </ul>
        <p><strong>Government access:</strong></p>
        <p>Quality records may be subject to government review:</p>
        <ul>
          <li>During performance</li>
          <li>At contract closeout</li>
          <li>During audits</li>
          <li>In dispute resolution</li>
        </ul>
      `,
    },
    {
      heading: 'Building a Quality Culture',
      content: `
        <p><strong>Quality is everyone's responsibility:</strong></p>
        <ul>
          <li>Leadership commitment visible and consistent</li>
          <li>Quality expectations communicated</li>
          <li>Resources provided for quality activities</li>
          <li>Quality performance recognized</li>
        </ul>
        <p><strong>Training:</strong></p>
        <ul>
          <li>Quality awareness for all staff</li>
          <li>Specific training for QC personnel</li>
          <li>Procedure-specific training</li>
          <li>Refresher training as needed</li>
        </ul>
        <p><strong>Continuous improvement:</strong></p>
        <ul>
          <li>Regular review of quality metrics</li>
          <li>Learn from problems</li>
          <li>Seek opportunities to improve</li>
          <li>Benchmark against best practices</li>
        </ul>
        <p><strong>Customer focus:</strong></p>
        <ul>
          <li>Understand what the customer values</li>
          <li>Align quality efforts with customer needs</li>
          <li>Seek and act on feedback</li>
          <li>Build trust through consistent quality</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Is ISO 9001 certification required for government contracts?',
      answer:
        'Not always, but it\'s often preferred and sometimes specified. ISO certification demonstrates systematic quality management and can be a competitive advantage. Check individual contract requirements.',
    },
    {
      question: 'What happens if the government rejects my deliverable?',
      answer:
        'You typically must correct deficiencies at your own cost (on FFP). Repeated rejections affect CPARS ratings. Severe or persistent quality failures can lead to contract termination.',
    },
    {
      question: 'Who is responsible for quality — contractor or government?',
      answer:
        'Contractor is responsible for quality of deliverables. Government\'s role is oversight and acceptance. You must ensure quality before submission; don\'t rely on government inspection to find problems.',
    },
    {
      question: 'Do I need a dedicated Quality Manager?',
      answer:
        'Depends on contract size and complexity. Large contracts often require a dedicated QA function. Smaller contracts may have quality as a part-time role. What matters is that someone owns quality.',
    },
    {
      question: 'How detailed should my Quality Control Plan be?',
      answer:
        'Match the contract. Simple services may need a basic plan. Complex manufacturing or software development needs more detailed procedures. Over-engineering creates unnecessary burden.',
    },
    {
      question: 'Can quality failures lead to debarment?',
      answer:
        'Severe or fraudulent quality failures can contribute to debarment proceedings. Pattern of failures, misrepresentation of quality, or knowingly delivering defective work are serious matters.',
    },
    {
      question: 'How do I handle subcontractor quality?',
      answer:
        'You\'re responsible for subcontractor quality as prime. Flow down requirements, verify capabilities, inspect sub deliverables, and take corrective action when needed.',
    },
    {
      question: 'What\'s the difference between QA and QC?',
      answer:
        'QA (Quality Assurance) is proactive — processes and systems to prevent defects. QC (Quality Control) is reactive — inspection and testing to identify defects. Both are necessary.',
    },
  ],
  cta: {
    heading: 'Strengthen Your Quality Program',
    description:
      'Quality problems destroy contract performance ratings and future opportunities. Our team helps you develop robust QA programs that protect your government contracting business.',
    buttonText: 'Get QA Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'cpars',
    'proposal-compliance-matrix',
    'cmmc-certification',
    'debriefings',
    'contract-closeout',
  ],
  publishedDate: '2026-04-07',
};
