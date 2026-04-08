import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'far-overview',
  title: 'FAR Overview: Understanding the Federal Acquisition Regulation',
  metaTitle: 'Federal Acquisition Regulation (FAR) Guide — Key Rules for Contractors',
  metaDescription:
    'Understand the Federal Acquisition Regulation: key FAR parts every contractor must know, how FAR governs procurement, and navigating FAR compliance requirements.',
  keywords: [
    'federal acquisition regulation',
    'far government contracting',
    'far clauses',
    'far compliance',
    'far part 15',
    'far part 12',
    'far procurement',
    'government contracting rules',
    'far requirements',
    'acquisition regulation',
  ],
  heroSubtitle:
    'The FAR is the rulebook for federal procurement. Every contractor must understand it — ignorance doesn\'t excuse non-compliance, and violations can end your government business.',
  sections: [
    {
      heading: 'What Is the Federal Acquisition Regulation?',
      content: `
        <p>The <strong>Federal Acquisition Regulation (FAR)</strong> is the primary regulation governing federal government purchasing. It establishes uniform policies and procedures for all executive branch agencies when acquiring supplies and services.</p>
        <p><strong>What FAR covers:</strong></p>
        <ul>
          <li><strong>Acquisition planning</strong> — How agencies identify and plan procurements</li>
          <li><strong>Competition requirements</strong> — When and how competitions must be held</li>
          <li><strong>Contract types</strong> — Fixed-price, cost-reimbursement, T&M, etc.</li>
          <li><strong>Socioeconomic programs</strong> — Small business, disadvantaged business requirements</li>
          <li><strong>Contract administration</strong> — Managing, modifying, and closing contracts</li>
          <li><strong>Standard clauses</strong> — Required terms and conditions for contracts</li>
        </ul>
        <p><strong>Who FAR applies to:</strong></p>
        <ul>
          <li>All executive branch agencies</li>
          <li>All contractors doing business with the government</li>
          <li>Subcontractors (many clauses flow down)</li>
        </ul>
        <p><strong>Where to find FAR:</strong></p>
        <p>Official version: <a href="https://www.acquisition.gov/far" target="_blank">acquisition.gov/far</a></p>
        <p>FAR is codified at Title 48, Chapter 1 of the Code of Federal Regulations (CFR).</p>
      `,
    },
    {
      heading: 'FAR Structure: Parts and Subparts',
      content: `
        <p>FAR is organized into 53 parts, grouped by topic. Here are the most important:</p>
        <p><strong>Parts 1-4: General</strong></p>
        <ul>
          <li><strong>Part 1</strong> — FAR system and guiding principles</li>
          <li><strong>Part 2</strong> — Definitions (critical for understanding terms)</li>
          <li><strong>Part 3</strong> — Improper business practices, ethics</li>
          <li><strong>Part 4</strong> — Administrative matters (SAM, reporting)</li>
        </ul>
        <p><strong>Parts 5-12: Competition and Acquisition Methods</strong></p>
        <ul>
          <li><strong>Part 5</strong> — Publicizing contract actions</li>
          <li><strong>Part 6</strong> — Competition requirements</li>
          <li><strong>Part 8</strong> — Required sources (GSA, AbilityOne)</li>
          <li><strong>Part 12</strong> — Commercial item acquisitions</li>
        </ul>
        <p><strong>Parts 13-18: Contracting Methods</strong></p>
        <ul>
          <li><strong>Part 13</strong> — Simplified acquisition procedures</li>
          <li><strong>Part 14</strong> — Sealed bidding</li>
          <li><strong>Part 15</strong> — Negotiated procurements (most common for services)</li>
          <li><strong>Part 16</strong> — Contract types (FFP, T&M, cost-plus)</li>
        </ul>
        <p><strong>Parts 19-26: Socioeconomic Programs</strong></p>
        <ul>
          <li><strong>Part 19</strong> — Small business programs</li>
          <li><strong>Part 22</strong> — Labor laws (Service Contract Act, prevailing wages)</li>
          <li><strong>Part 25</strong> — Buy American Act</li>
        </ul>
        <p><strong>Parts 27-51: Contract Administration</strong></p>
        <ul>
          <li><strong>Part 31</strong> — Cost principles (what costs are allowable)</li>
          <li><strong>Part 32</strong> — Contract financing</li>
          <li><strong>Part 42</strong> — Contract administration</li>
          <li><strong>Part 49</strong> — Termination</li>
        </ul>
        <p><strong>Parts 52-53: Clauses and Forms</strong></p>
        <ul>
          <li><strong>Part 52</strong> — All standard contract clauses</li>
          <li><strong>Part 53</strong> — Standard forms</li>
        </ul>
      `,
    },
    {
      heading: 'Key FAR Parts Every Contractor Must Know',
      content: `
        <p><strong>FAR Part 12 — Commercial Items</strong></p>
        <p>Governs acquisition of commercial products and services. Streamlined procedures, simplified clauses, more contractor-friendly terms. If your product/service qualifies as "commercial," this is your preferred path.</p>
        <p><strong>FAR Part 15 — Negotiated Procurements</strong></p>
        <p>How most services contracts are competed. Covers:</p>
        <ul>
          <li>Source selection procedures</li>
          <li>Proposal evaluation factors</li>
          <li>Discussions and negotiations</li>
          <li>Best value determinations</li>
        </ul>
        <p><strong>FAR Part 16 — Contract Types</strong></p>
        <p>Defines all contract types: <a href="/guides/firm-fixed-price-contracts">FFP</a>, <a href="/guides/cost-plus-contracts">cost-plus</a>, <a href="/guides/time-and-materials-contracts">T&M</a>, <a href="/guides/idiq-contracts">IDIQ</a>. Critical for pricing strategy and risk management.</p>
        <p><strong>FAR Part 19 — Small Business Programs</strong></p>
        <p>All small business rules: set-asides, <a href="/guides/sba-size-standards">size standards</a>, certification requirements, subcontracting plans. Essential for anyone using small business status.</p>
        <p><strong>FAR Part 31 — Cost Principles</strong></p>
        <p>Defines what costs are allowable, allocable, and reasonable. Critical for <a href="/guides/cost-plus-contracts">cost-type contracts</a> and <a href="/guides/cost-proposals">cost proposals</a>. Unallowable costs can't be reimbursed and can trigger audits.</p>
        <p><strong>FAR Part 52 — Clauses</strong></p>
        <p>Every standard clause is here. When a contract references "FAR 52.XXX-X," look it up to understand your obligations.</p>
      `,
    },
    {
      heading: 'FAR Supplements: DFARS, GSAM, and More',
      content: `
        <p>Many agencies supplement FAR with additional regulations specific to their needs.</p>
        <p><strong>DFARS (Defense FAR Supplement)</strong></p>
        <p>DoD's supplement to FAR. Adds requirements for defense contractors:</p>
        <ul>
          <li>Cybersecurity requirements (DFARS 252.204-7012)</li>
          <li>CMMC compliance</li>
          <li>Cost accounting standards</li>
          <li>DoD-specific clauses</li>
        </ul>
        <p>If you work for DoD, DFARS is as important as FAR.</p>
        <p><strong>GSAM (GSA Acquisition Manual)</strong></p>
        <p>GSA's supplement. Important for GSA Schedule contractors and anyone working on GSA-managed vehicles.</p>
        <p><strong>Other Agency Supplements:</strong></p>
        <ul>
          <li><strong>HHSAR</strong> — HHS</li>
          <li><strong>VAAR</strong> — VA</li>
          <li><strong>NFS</strong> — NASA</li>
          <li><strong>DEAR</strong> — DOE</li>
          <li><strong>DIAR</strong> — Interior</li>
        </ul>
        <p><strong>How supplements work:</strong></p>
        <p>Supplements follow FAR numbering. FAR Part 15 → DFARS Part 215. Supplements can add requirements but generally can't contradict FAR. When in doubt, FAR controls unless the supplement is specifically authorized to deviate.</p>
        <p><strong>Finding supplements:</strong></p>
        <p>Most are at <a href="https://www.acquisition.gov" target="_blank">acquisition.gov</a> or the agency's acquisition website.</p>
      `,
    },
    {
      heading: 'Important FAR Clauses for Contractors',
      content: `
        <p>Your contract incorporates specific FAR clauses by reference. Key ones to understand:</p>
        <p><strong>General Clauses:</strong></p>
        <ul>
          <li><strong>52.203-13</strong> — Contractor Code of Business Ethics</li>
          <li><strong>52.204-21</strong> — Basic Safeguarding of Covered Contractor Information</li>
          <li><strong>52.212-4</strong> — Commercial Items terms and conditions</li>
          <li><strong>52.219-8</strong> — Utilization of Small Business Concerns</li>
        </ul>
        <p><strong>Performance Clauses:</strong></p>
        <ul>
          <li><strong>52.232-25</strong> — Prompt Payment</li>
          <li><strong>52.232-33</strong> — Payment by Electronic Funds Transfer</li>
          <li><strong>52.242-15</strong> — Stop-Work Order</li>
          <li><strong>52.243-1</strong> — Changes clause (how contract changes work)</li>
        </ul>
        <p><strong>Termination Clauses:</strong></p>
        <ul>
          <li><strong>52.249-1</strong> — Termination for Convenience (government can end contract anytime)</li>
          <li><strong>52.249-8</strong> — Default (termination for your failures)</li>
        </ul>
        <p><strong>Small Business Clauses:</strong></p>
        <ul>
          <li><strong>52.219-6</strong> — Notice of Total Small Business Set-Aside</li>
          <li><strong>52.219-14</strong> — Limitations on Subcontracting</li>
          <li><strong>52.219-27</strong> — Notice of Set-Aside for SDVOSB</li>
        </ul>
        <p><strong>Labor Clauses:</strong></p>
        <ul>
          <li><strong>52.222-41</strong> — Service Contract Labor Standards</li>
          <li><strong>52.222-43</strong> — Fair Labor Standards Act and Service Contract Labor Standards</li>
        </ul>
        <p><strong>Read your clauses.</strong> They define your rights and obligations. Ignorance is not a defense.</p>
      `,
    },
    {
      heading: 'FAR Compliance for Contractors',
      content: `
        <p><strong>Contractor obligations under FAR:</strong></p>
        <ul>
          <li><strong>Ethical conduct</strong> — Avoid fraud, false claims, conflicts of interest</li>
          <li><strong>Accurate representations</strong> — Size status, past performance, pricing</li>
          <li><strong>Record keeping</strong> — Maintain records per contract terms</li>
          <li><strong>Cost accounting</strong> — For cost-type contracts, CAS compliance</li>
          <li><strong>Flow-down clauses</strong> — Pass required terms to subcontractors</li>
        </ul>
        <p><strong>Common compliance failures:</strong></p>
        <ul>
          <li><strong>False Claims</strong> — Billing for work not performed, inflating costs</li>
          <li><strong>Size misrepresentation</strong> — Claiming small business status incorrectly</li>
          <li><strong>OCI violations</strong> — Organizational conflicts of interest</li>
          <li><strong>Cost mischarging</strong> — Allocating costs to wrong contracts</li>
          <li><strong>Subcontracting violations</strong> — Not meeting small business subcontracting goals</li>
        </ul>
        <p><strong>Consequences of non-compliance:</strong></p>
        <ul>
          <li>Contract termination</li>
          <li>Suspension or debarment</li>
          <li>False Claims Act liability (triple damages)</li>
          <li>Criminal prosecution (in serious cases)</li>
        </ul>
        <p><strong>Building compliance systems:</strong></p>
        <ul>
          <li>Written policies and procedures</li>
          <li>Regular training for employees</li>
          <li>Internal controls and audits</li>
          <li>Hotline for reporting concerns</li>
          <li>Prompt disclosure of violations</li>
        </ul>
      `,
    },
    {
      heading: 'Navigating FAR: Practical Tips',
      content: `
        <p><strong>How to read FAR:</strong></p>
        <ol>
          <li><strong>Start with definitions (Part 2)</strong> — Terms have specific meanings</li>
          <li><strong>Read the relevant part</strong> — Don't read FAR cover to cover; focus on what applies</li>
          <li><strong>Check prescriptions</strong> — Each clause has a prescription explaining when it's used</li>
          <li><strong>Look at supplementing guidance</strong> — DFARS, agency supplements may add requirements</li>
        </ol>
        <p><strong>FAR resources:</strong></p>
        <ul>
          <li><strong>acquisition.gov</strong> — Official FAR, supplements, and regulations</li>
          <li><strong>DAU (Defense Acquisition University)</strong> — Training, glossary, tools</li>
          <li><strong>FAR Smart Matrix</strong> — Shows which clauses apply to which contract types</li>
        </ul>
        <p><strong>When you need help:</strong></p>
        <ul>
          <li><strong>PTAC</strong> — Free counseling for small businesses</li>
          <li><strong>Government contracts attorney</strong> — For compliance questions, disputes</li>
          <li><strong>Contracting officer</strong> — Can answer questions about specific procurements</li>
        </ul>
        <p><strong>Staying current:</strong></p>
        <p>FAR changes regularly through Federal Acquisition Circulars (FACs). Subscribe to updates at acquisition.gov. Major changes are announced in the Federal Register.</p>
        <p><strong>Don't fear FAR:</strong></p>
        <p>FAR is large but logical. You don't need to memorize it — you need to know where to look and when to ask for help. Build familiarity over time through practical use.</p>
      `,
    },
    {
      heading: 'FAR and Small Business Contractors',
      content: `
        <p><strong>FAR Part 19 — Small Business Programs:</strong></p>
        <p>Most important FAR part for small businesses. Covers:</p>
        <ul>
          <li><a href="/guides/sba-size-standards">Size standards</a> — How small business size is determined</li>
          <li>Set-aside procedures — How contracts are reserved for small business</li>
          <li>Certification requirements — <a href="/guides/8a-certification">8(a)</a>, <a href="/guides/hubzone-certification">HUBZone</a>, SDVOSB, WOSB</li>
          <li>Subcontracting requirements — Small business subcontracting plans</li>
        </ul>
        <p><strong>Limitations on Subcontracting (FAR 52.219-14):</strong></p>
        <p>Critical clause for set-aside contracts. The small business prime must perform:</p>
        <ul>
          <li><strong>Services:</strong> At least 50% of labor cost</li>
          <li><strong>Supplies:</strong> At least 50% of manufacturing cost</li>
          <li><strong>Construction:</strong> At least 15% of labor cost</li>
        </ul>
        <p>Violations can result in contract termination and debarment.</p>
        <p><strong>Small Business Subcontracting Plans (FAR 52.219-9):</strong></p>
        <p>Large business primes must submit plans showing how they'll use small business subcontractors. Creates opportunities for small businesses to team with large primes.</p>
        <p><strong>Good faith compliance:</strong></p>
        <p>Government expects good faith efforts to meet small business goals. Document your efforts even if you fall short. Patterns of non-compliance can affect future awards.</p>
        <p><strong>Mentor-protégé programs:</strong></p>
        <p>FAR and agency supplements provide for <a href="/guides/mentor-protege-program">mentor-protégé arrangements</a> that benefit both large and small businesses.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Do I need to know the entire FAR to be a government contractor?',
      answer:
        'No. Focus on parts relevant to your work: Part 12 (commercial items), Part 15 (proposals), Part 16 (contract types), Part 19 (small business), Part 31 (cost principles), and Part 52 (clauses). Learn others as needed for specific contracts.',
    },
    {
      question: 'Where can I find the current FAR?',
      answer:
        'The official FAR is at acquisition.gov/far. It\'s updated through Federal Acquisition Circulars (FACs) issued periodically. Always use the current version — outdated FAR can mislead you on requirements.',
    },
    {
      question: 'What\'s the difference between FAR and DFARS?',
      answer:
        'FAR applies to all federal agencies. DFARS (Defense FAR Supplement) adds requirements specific to DoD contracts. If you work for DoD, you must comply with both FAR and DFARS. DFARS follows FAR numbering (FAR Part 15 → DFARS Part 215).',
    },
    {
      question: 'Can agencies deviate from FAR?',
      answer:
        'Yes, but deviations require approval. Individual deviations (one contract) need head of contracting activity approval. Class deviations (multiple contracts) need senior approval. Deviations are supposed to be rare.',
    },
    {
      question: 'How often does FAR change?',
      answer:
        'FAR is updated through Federal Acquisition Circulars (FACs) issued several times per year. Some changes are minor; others are significant. Major changes go through public notice and comment. Subscribe to updates at acquisition.gov.',
    },
    {
      question: 'What happens if I violate FAR?',
      answer:
        'Consequences range from contract-level remedies (termination, withholding payment) to government-wide sanctions (suspension, debarment) to civil/criminal liability (False Claims Act, fraud). Severity depends on the violation and whether it was intentional.',
    },
    {
      question: 'Do FAR clauses automatically apply to my contract?',
      answer:
        'Only clauses specifically incorporated apply. Your contract lists applicable clauses — some by full text, others "incorporated by reference." Read the clause matrix in your contract to know which clauses apply.',
    },
    {
      question: 'How do I find which FAR clause applies to a situation?',
      answer:
        'Each clause in Part 52 has a "prescription" in the relevant FAR part explaining when it\'s required. For example, FAR 16.203-4 prescribes when to use the economic price adjustment clause (52.216-4). The FAR Smart Matrix at acquisition.gov also helps.',
    },
  ],
  cta: {
    heading: 'Navigate FAR with Confidence',
    description:
      'FAR compliance is non-negotiable in government contracting. Our training helps you understand the regulations that govern your business and avoid costly compliance failures.',
    buttonText: 'View Training',
    buttonHref: '/training',
  },
  relatedGuides: [
    'proposal-writing',
    'firm-fixed-price-contracts',
    'cost-plus-contracts',
    'simplified-acquisition',
    'sba-certifications',
  ],
  publishedDate: '2026-04-07',
};
