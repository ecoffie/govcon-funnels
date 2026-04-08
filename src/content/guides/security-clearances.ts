import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'security-clearances',
  title: 'Security Clearances for Government Contractors: Requirements and Process',
  metaTitle: 'Security Clearance Guide — Facility Clearances & Personnel Requirements',
  metaDescription:
    'Learn about security clearances for government contractors: facility clearance levels, personnel clearances, sponsorship requirements, and maintaining cleared status.',
  keywords: [
    'security clearance',
    'facility clearance',
    'fcl',
    'secret clearance',
    'top secret clearance',
    'clearance sponsor',
    'dcsa clearance',
    'nispom',
    'classified contracts',
    'personnel clearance',
  ],
  heroSubtitle:
    'Many federal contracts require security clearances. Without them, you can\'t compete. But getting cleared takes time — often 6-12+ months. Start early.',
  sections: [
    {
      heading: 'What Are Security Clearances?',
      content: `
        <p><strong>Security clearances</strong> allow individuals and organizations to access classified national security information. For government contractors, clearances open doors to work involving sensitive defense and intelligence programs.</p>
        <p><strong>Two types of clearances:</strong></p>
        <p><strong>Facility Clearance (FCL):</strong></p>
        <ul>
          <li>Clearance for your company/organization</li>
          <li>Allows you to bid on and perform classified contracts</li>
          <li>Required before personnel clearances can be processed</li>
          <li>Managed by Defense Counterintelligence and Security Agency (DCSA)</li>
        </ul>
        <p><strong>Personnel Security Clearance (PCL):</strong></p>
        <ul>
          <li>Clearance for individuals</li>
          <li>Allows access to classified information at appropriate level</li>
          <li>Requires investigation and adjudication</li>
          <li>Tied to employment (no clearance without a job needing it)</li>
        </ul>
        <p><strong>Clearance levels:</strong></p>
        <ul>
          <li><strong>Confidential</strong> — Lowest level; unauthorized disclosure could cause damage</li>
          <li><strong>Secret</strong> — Mid-level; unauthorized disclosure could cause serious damage</li>
          <li><strong>Top Secret (TS)</strong> — Highest level; unauthorized disclosure could cause grave damage</li>
          <li><strong>TS/SCI</strong> — Top Secret with Sensitive Compartmented Information access</li>
        </ul>
      `,
    },
    {
      heading: 'Getting a Facility Clearance',
      content: `
        <p><strong>When you need an FCL:</strong></p>
        <ul>
          <li>Contract requires access to classified information</li>
          <li>Subcontract involves classified work</li>
          <li>Facility will store classified materials</li>
        </ul>
        <p><strong>FCL requirements:</strong></p>
        <ul>
          <li><strong>Sponsorship</strong> — A government agency or cleared prime contractor must sponsor your FCL</li>
          <li><strong>Need</strong> — Must have legitimate need for classified access</li>
          <li><strong>Security agreement</strong> — Execute DD Form 441 (DoD contracts)</li>
          <li><strong>Key Management Personnel (KMP)</strong> — Officers/directors must be cleared or excluded</li>
          <li><strong>Foreign ownership/control</strong> — Foreign ownership may disqualify or require mitigation</li>
        </ul>
        <p><strong>FCL process:</strong></p>
        <ol>
          <li>Sponsor submits request to DCSA</li>
          <li>DCSA initiates verification</li>
          <li>Company completes security documentation</li>
          <li>KMP submit for personnel clearances</li>
          <li>DCSA conducts facility inspection</li>
          <li>FCL granted (if requirements met)</li>
        </ol>
        <p><strong>Timeline:</strong></p>
        <p>FCL processing typically takes <strong>3-12 months</strong> depending on complexity. Companies with foreign ownership or complicated structures take longer.</p>
        <p><strong>Maintaining FCL:</strong></p>
        <p>Annual reviews, continuous monitoring, reporting requirements, and compliance with NISPOM (National Industrial Security Program Operating Manual).</p>
      `,
    },
    {
      heading: 'Personnel Clearance Process',
      content: `
        <p><strong>Eligibility requirements:</strong></p>
        <ul>
          <li>U.S. citizenship (for most clearances)</li>
          <li>Employment by a cleared contractor (sponsorship)</li>
          <li>Need to access classified information</li>
        </ul>
        <p><strong>The investigation:</strong></p>
        <p>DCSA conducts background investigations looking at:</p>
        <ul>
          <li>Criminal history</li>
          <li>Financial history (debt, bankruptcies)</li>
          <li>Drug use</li>
          <li>Foreign contacts and travel</li>
          <li>Mental health (only if relevant to judgment)</li>
          <li>Loyalty and associations</li>
          <li>Personal conduct</li>
        </ul>
        <p><strong>SF-86:</strong></p>
        <p>The SF-86 (Questionnaire for National Security Positions) is the primary form. It's extensive — 100+ pages covering your life history. Complete it accurately; inconsistencies cause delays or denials.</p>
        <p><strong>Investigation levels:</strong></p>
        <ul>
          <li><strong>Tier 3 (Secret)</strong> — National Agency Check, credit check, employment/residence verification</li>
          <li><strong>Tier 5 (Top Secret)</strong> — Single Scope Background Investigation, interviews, more extensive checks</li>
        </ul>
        <p><strong>Timeline:</strong></p>
        <ul>
          <li>Secret: <strong>2-6 months</strong> average</li>
          <li>Top Secret: <strong>4-12 months</strong> average</li>
        </ul>
        <p>Timelines vary based on complexity, backlog, and completeness of your application.</p>
      `,
    },
    {
      heading: 'Sponsorship Requirements',
      content: `
        <p><strong>No clearance without sponsorship:</strong></p>
        <p>You cannot get a clearance "just in case." Someone must sponsor you with a demonstrated need.</p>
        <p><strong>Who can sponsor:</strong></p>
        <ul>
          <li><strong>Government agencies</strong> — For direct contracts requiring clearances</li>
          <li><strong>Cleared prime contractors</strong> — For subcontracts requiring clearances</li>
          <li><strong>DCSA</strong> — For Key Management Personnel of cleared facilities</li>
        </ul>
        <p><strong>Facility clearance sponsorship:</strong></p>
        <p>To get your FCL:</p>
        <ul>
          <li>Win a contract requiring classified access, OR</li>
          <li>Be selected for a subcontract requiring clearances</li>
          <li>Prime or agency sponsors your FCL</li>
        </ul>
        <p><strong>Personnel clearance sponsorship:</strong></p>
        <p>Your employer (with valid FCL) sponsors your clearance for specific position/contract.</p>
        <p><strong>Pre-award sponsorship:</strong></p>
        <p>Some procurements allow contractors to begin clearance processing before award. This helps avoid delays when classified work begins. Check solicitation for provisions.</p>
        <p><strong>Interim clearances:</strong></p>
        <p>For urgent needs, interim clearances may be granted based on preliminary investigation. Not guaranteed, but allows work to begin while full investigation continues.</p>
      `,
    },
    {
      heading: 'Cleared Workforce Strategy',
      content: `
        <p><strong>Building cleared capability:</strong></p>
        <p>If you want classified work, you need cleared employees. Strategies:</p>
        <ul>
          <li><strong>Hire already-cleared personnel</strong> — Clearances transfer between employers</li>
          <li><strong>Sponsor new clearances</strong> — For employees who can pass investigation</li>
          <li><strong>Partner with cleared companies</strong> — JV or team with cleared primes</li>
        </ul>
        <p><strong>Hiring cleared personnel:</strong></p>
        <ul>
          <li>Clearances are "portable" — employees bring them to new employer</li>
          <li>Must be transferred/validated by new sponsor</li>
          <li>Clearance must be current (not expired/inactive)</li>
        </ul>
        <p><strong>Recruiting challenges:</strong></p>
        <ul>
          <li>Cleared workforce is limited</li>
          <li>Compensation expectations higher</li>
          <li>Competition for cleared talent intense</li>
          <li>Geographic constraints (cleared work locations)</li>
        </ul>
        <p><strong>Retention matters:</strong></p>
        <p>Losing cleared employees means:</p>
        <ul>
          <li>Time to replace and clear new staff</li>
          <li>Contract performance risk</li>
          <li>Investment in security training lost</li>
        </ul>
        <p><strong>Proposal considerations:</strong></p>
        <p>When proposing on classified work:</p>
        <ul>
          <li>Identify cleared personnel available</li>
          <li>Plan for clearance processing timeline</li>
          <li>Factor clearance costs into pricing</li>
          <li>Address how you'll maintain cleared workforce</li>
        </ul>
      `,
    },
    {
      heading: 'Maintaining Clearances',
      content: `
        <p><strong>Continuous evaluation:</strong></p>
        <p>Clearances are now continuously monitored, not just reinvestigated every 5-10 years. DCSA monitors:</p>
        <ul>
          <li>Financial records</li>
          <li>Criminal databases</li>
          <li>Court records</li>
          <li>Other data sources</li>
        </ul>
        <p><strong>Self-reporting requirements:</strong></p>
        <p>Cleared individuals must report:</p>
        <ul>
          <li>Foreign travel</li>
          <li>Foreign contacts</li>
          <li>Financial problems (bankruptcy, significant debt)</li>
          <li>Arrests or legal issues</li>
          <li>Security incidents</li>
        </ul>
        <p><strong>Reinvestigation:</strong></p>
        <ul>
          <li>Secret: Reinvestigated every <strong>10 years</strong></li>
          <li>Top Secret: Reinvestigated every <strong>6 years</strong></li>
        </ul>
        <p>Continuous evaluation may reduce formal reinvestigation needs.</p>
        <p><strong>Clearance loss:</strong></p>
        <p>Clearances can be suspended or revoked for:</p>
        <ul>
          <li>Security violations</li>
          <li>Criminal conduct</li>
          <li>Financial irresponsibility</li>
          <li>Drug use</li>
          <li>Falsification on security forms</li>
        </ul>
        <p><strong>Appeal rights:</strong></p>
        <p>If clearance is denied or revoked, you have rights to appeal and present your case.</p>
      `,
    },
    {
      heading: 'Classified Contract Requirements',
      content: `
        <p><strong>DD Form 254:</strong></p>
        <p>The Contract Security Classification Specification (DD 254) defines security requirements for each classified contract:</p>
        <ul>
          <li>Classification level required</li>
          <li>Access requirements</li>
          <li>Safeguarding requirements</li>
          <li>Special access programs (if any)</li>
        </ul>
        <p><strong>Facility requirements:</strong></p>
        <p>Depending on classification level and work nature:</p>
        <ul>
          <li>Secure storage (safes, vaults)</li>
          <li>Secure workspaces</li>
          <li>Access controls</li>
          <li>Intrusion detection</li>
          <li>Security officer designation</li>
        </ul>
        <p><strong>NISPOM compliance:</strong></p>
        <p>Cleared contractors must comply with the National Industrial Security Program Operating Manual:</p>
        <ul>
          <li>Security procedures</li>
          <li>Personnel security</li>
          <li>Information security</li>
          <li>Safeguarding classified info</li>
          <li>Visits and meetings</li>
        </ul>
        <p><strong>Inspections:</strong></p>
        <p>DCSA conducts periodic security inspections of cleared facilities. Findings can affect your FCL status.</p>
        <p><strong>Security violations:</strong></p>
        <p>Report security incidents immediately. Violations can result in:</p>
        <ul>
          <li>Administrative actions</li>
          <li>Contract termination</li>
          <li>FCL downgrade or revocation</li>
          <li>Criminal prosecution (serious cases)</li>
        </ul>
      `,
    },
    {
      heading: 'Getting Started Without Clearances',
      content: `
        <p><strong>The chicken-and-egg problem:</strong></p>
        <p>You need a contract to get cleared, but some contracts require clearances to bid. Strategies:</p>
        <p><strong>Build toward classified work:</strong></p>
        <ol>
          <li>Start with unclassified contracts in relevant areas</li>
          <li>Build relationships with agencies that do classified work</li>
          <li>Position for contracts that will sponsor your FCL</li>
        </ol>
        <p><strong>Team with cleared companies:</strong></p>
        <ul>
          <li>Subcontract to cleared primes</li>
          <li>Joint venture with cleared partner</li>
          <li>They can sponsor your clearances</li>
        </ul>
        <p><strong>Hire cleared personnel:</strong></p>
        <ul>
          <li>Bring in people with active clearances</li>
          <li>Their clearances can be transferred</li>
          <li>Helps you perform while building capability</li>
        </ul>
        <p><strong>Small business programs:</strong></p>
        <p>Some agencies have programs to help small businesses enter cleared work:</p>
        <ul>
          <li>Mentor-protégé with cleared mentors</li>
          <li>Pre-award clearance sponsorship</li>
          <li>Small business set-asides for classified work</li>
        </ul>
        <p><strong>Be patient:</strong></p>
        <p>Building cleared capability takes <strong>1-3 years</strong> typically. Plan ahead if classified work is in your strategy.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How much does a security clearance cost?',
      answer:
        'Personnel clearance investigations are funded by the government. However, employers bear costs of employee time during processing, security infrastructure, cleared facility compliance, and potential downtime. Budget $5,000-$50,000+ depending on level and infrastructure needs.',
    },
    {
      question: 'Can I get a security clearance on my own?',
      answer:
        'No. Clearances require sponsorship from an employer with a valid need. You cannot apply independently. The "need to know" principle means clearances are only granted when specific work requires them.',
    },
    {
      question: 'Do clearances expire?',
      answer:
        'Clearances can lapse if not used (typically 24 months of inactivity). They require periodic reinvestigation (6 years for TS, 10 years for Secret). Continuous evaluation now monitors cleared individuals between formal reinvestigations.',
    },
    {
      question: 'What disqualifies someone from getting a clearance?',
      answer:
        'No automatic disqualifiers, but serious issues include: criminal history, significant financial problems, drug use, foreign influence, dishonesty on security forms. Each case is evaluated individually — context matters. Honesty about past issues is critical.',
    },
    {
      question: 'Can non-citizens get security clearances?',
      answer:
        'Generally no for most clearances. U.S. citizenship is typically required for access to classified national security information. Limited exceptions exist for specific circumstances, but most classified work requires U.S. citizens only.',
    },
    {
      question: 'How do I transfer my clearance to a new employer?',
      answer:
        'Your new employer (must have valid FCL) requests your clearance records be transferred. Process typically takes days to weeks. Clearance must be current (not lapsed). The new employer sponsors your continued access.',
    },
    {
      question: 'What is a Facility Security Officer (FSO)?',
      answer:
        'The FSO is responsible for your company\'s security program — processing clearances, managing security training, handling classified materials, interfacing with DCSA. Required position for cleared facilities.',
    },
    {
      question: 'Can foreign ownership prevent getting cleared?',
      answer:
        'Foreign ownership, control, or influence (FOCI) complicates FCL processing. Mitigation measures (Special Security Agreement, Proxy Board) may allow clearances. Significant foreign ownership may preclude certain clearance levels. Evaluate early.',
    },
  ],
  cta: {
    heading: 'Navigate the Clearance Process',
    description:
      'Security clearances open doors to high-value contracts but require careful planning. Our team helps you understand requirements, build cleared capability, and maintain compliance.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'capability-statement',
    'finding-government-contracts',
    'proposal-writing',
    'teaming-agreements',
    'capture-management',
  ],
  publishedDate: '2026-04-07',
};
