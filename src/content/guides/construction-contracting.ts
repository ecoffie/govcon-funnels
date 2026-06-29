import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'construction-contracting',
  title: 'Federal Construction Contracting: Guide for Contractors',
  metaTitle: 'Government Construction Contracting Guide — Davis-Bacon, Bonds & Requirements',
  metaDescription:
    'Learn federal construction contracting: Davis-Bacon Act requirements, bonding, contractor qualifications, construction set-asides, and bid strategies.',
  keywords: [
    'federal construction',
    'government construction',
    'davis bacon',
    'construction bonds',
    'construction contractor',
    'federal building',
    'usace construction',
    'navfac',
    'construction bid',
    'federal construction contract',
  ],
  heroSubtitle:
    'Federal construction contracting has unique requirements including prevailing wages, bonds, and specialized qualifications. Understanding these rules is essential for success.',
  sections: [
    {
      heading: 'Federal Construction Market Overview',
      content: `
        <p>The federal government spends billions annually on construction, renovation, and infrastructure projects.</p>
        <p><strong>Major federal construction agencies:</strong></p>
        <ul>
          <li><strong>USACE</strong> — Army Corps of Engineers (civil and military)</li>
          <li><strong>NAVFAC</strong> — Naval Facilities Engineering Command</li>
          <li><strong>GSA</strong> — General Services Administration (federal buildings)</li>
          <li><strong>VA</strong> — Veterans Affairs (medical facilities)</li>
          <li><strong>USAF</strong> — Air Force Civil Engineering</li>
        </ul>
        <p><strong>Types of construction work:</strong></p>
        <ul>
          <li>New construction</li>
          <li>Renovation and modernization</li>
          <li>Repair and maintenance</li>
          <li>Design-build projects</li>
          <li>Environmental remediation</li>
        </ul>
        <p><strong>Contract types:</strong></p>
        <ul>
          <li>Firm fixed-price (most common)</li>
          <li>Design-build</li>
          <li>Multiple award construction contracts (MACC)</li>
          <li>Job order contracts (JOC)</li>
          <li>IDIQ for construction</li>
        </ul>
      `,
    },
    {
      heading: 'Davis-Bacon Act Requirements',
      content: `
        <p>The <strong>Davis-Bacon Act</strong> requires payment of prevailing wages on federal construction contracts over $2,000.</p>
        <p><strong>Key requirements:</strong></p>
        <ul>
          <li>Pay locally prevailing wage rates</li>
          <li>Rates determined by Department of Labor</li>
          <li>Applies to laborers and mechanics</li>
          <li>Includes fringe benefits</li>
        </ul>
        <p><strong>Prevailing wage determination:</strong></p>
        <ul>
          <li>DOL publishes rates by location and trade</li>
          <li>Wage determination included in solicitation</li>
          <li>Must use applicable rates for project location</li>
        </ul>
        <p><strong>Compliance requirements:</strong></p>
        <ul>
          <li>Weekly certified payrolls</li>
          <li>Employee classification</li>
          <li>Proper documentation</li>
          <li>Posting of wage determination</li>
        </ul>
        <p><strong>Related acts:</strong></p>
        <ul>
          <li><strong>Copeland Act</strong> — Anti-kickback provisions</li>
          <li><strong>Contract Work Hours</strong> — Overtime requirements</li>
        </ul>
        <p><strong>Penalties:</strong></p>
        <ul>
          <li>Withholding of payments</li>
          <li>Contract termination</li>
          <li>Debarment for willful violations</li>
        </ul>
      `,
    },
    {
      heading: 'Bonding Requirements',
      content: `
        <p>Federal construction contracts over $150,000 require bonds under the <strong>Miller Act</strong>.</p>
        <p><strong>Required bonds:</strong></p>
        <p><strong>Performance bond:</strong></p>
        <ul>
          <li>100% of contract value</li>
          <li>Guarantees completion</li>
          <li>Protects government from non-performance</li>
        </ul>
        <p><strong>Payment bond:</strong></p>
        <ul>
          <li>100% of contract value</li>
          <li>Guarantees payment to subs and suppliers</li>
          <li>Protects subcontractors and material suppliers</li>
        </ul>
        <p><strong>Bid bond (for competitive bids):</strong></p>
        <ul>
          <li>Typically 20% of bid amount</li>
          <li>Ensures bidder will honor bid if selected</li>
          <li>Required with bid submission</li>
        </ul>
        <p><strong>Getting bonding:</strong></p>
        <ul>
          <li>Work with surety company</li>
          <li>Build relationship with bonding agent</li>
          <li>Maintain financial strength</li>
          <li>Start with smaller bonds to build capacity</li>
        </ul>
        <p><strong>SBA Surety Bond Guarantee:</strong></p>
        <ul>
          <li>SBA can guarantee bonds up to $6.5M</li>
          <li>Helps small businesses obtain bonding</li>
          <li>Applies to construction and service contracts</li>
        </ul>
        <p>Construction ties up cash early — payroll, materials, and mobilization hit long before the government pays. <a href="https://encoregov.com/financing/construction-contract-factoring" rel="noopener">Construction contract factoring</a> advances your progress-payment invoices so you can fund the next phase.</p>
      `,
    },
    {
      heading: 'Contractor Qualifications',
      content: `
        <p><strong>Responsibility determination:</strong></p>
        <p>Construction contractors must demonstrate:</p>
        <ul>
          <li>Financial capability</li>
          <li>Technical capability</li>
          <li>Past performance</li>
          <li>Adequate resources</li>
          <li>Integrity and ethics</li>
        </ul>
        <p><strong>Registration requirements:</strong></p>
        <ul>
          <li>SAM.gov registration</li>
          <li>NAICS codes for construction (23xxxx)</li>
          <li>Proper size status</li>
          <li>State licenses as applicable</li>
        </ul>
        <p><strong>Experience requirements:</strong></p>
        <ul>
          <li>Many solicitations require relevant experience</li>
          <li>Past performance on similar projects</li>
          <li>Key personnel qualifications</li>
          <li>Safety record</li>
        </ul>
        <p><strong>Safety requirements:</strong></p>
        <ul>
          <li>Experience Modification Rate (EMR)</li>
          <li>OSHA compliance history</li>
          <li>Safety program documentation</li>
          <li>EM 385-1-1 compliance (USACE)</li>
        </ul>
        <p><strong>Security clearances:</strong></p>
        <ul>
          <li>May be required for military installations</li>
          <li>Facility clearance for some projects</li>
          <li>Personnel clearances as specified</li>
        </ul>
      `,
    },
    {
      heading: 'Construction Set-Asides',
      content: `
        <p><strong>Small business construction opportunities:</strong></p>
        <ul>
          <li>Many construction contracts are set aside</li>
          <li>Size standards vary by type of construction</li>
          <li>Typically $16.5M-$45M depending on NAICS</li>
        </ul>
        <p><strong>Socioeconomic set-asides:</strong></p>
        <ul>
          <li>8(a) construction set-asides</li>
          <li>SDVOSB construction</li>
          <li>HUBZone construction</li>
          <li>WOSB/EDWOSB construction</li>
        </ul>
        <p><strong>VA Veterans First:</strong></p>
        <ul>
          <li>VA prioritizes SDVOSBs for construction</li>
          <li>Significant VA construction program</li>
        </ul>
        <p><strong>Joint ventures:</strong></p>
        <ul>
          <li>Small businesses can JV for larger projects</li>
          <li>Mentor-protégé JVs</li>
          <li>8(a) joint ventures</li>
        </ul>
        <p><strong>Subcontracting:</strong></p>
        <ul>
          <li>Large contracts have small business goals</li>
          <li>Subcontracting plans required</li>
          <li>Path to larger roles</li>
        </ul>
      `,
    },
    {
      heading: 'Bidding and Proposals',
      content: `
        <p><strong>Sealed bidding (IFB):</strong></p>
        <ul>
          <li>Common for construction</li>
          <li>Award to lowest responsive, responsible bidder</li>
          <li>No negotiation after bid opening</li>
          <li>Bid bond required</li>
        </ul>
        <p><strong>Negotiated procurement (RFP):</strong></p>
        <ul>
          <li>Used for complex projects</li>
          <li>Design-build typical</li>
          <li>Best value evaluation</li>
          <li>Technical and price factors</li>
        </ul>
        <p><strong>Two-phase design-build:</strong></p>
        <ol>
          <li>Phase 1: Qualifications</li>
          <li>Phase 2: Technical/price proposals (shortlisted firms)</li>
        </ol>
        <p><strong>Bid preparation:</strong></p>
        <ul>
          <li>Attend site visit</li>
          <li>Review all documents carefully</li>
          <li>Price accurately</li>
          <li>Include all required forms</li>
        </ul>
        <p><strong>Common bid mistakes:</strong></p>
        <ul>
          <li>Mathematical errors</li>
          <li>Missing required documents</li>
          <li>Failure to acknowledge amendments</li>
          <li>Late submission</li>
        </ul>
      `,
    },
    {
      heading: 'Contract Administration',
      content: `
        <p><strong>Key construction contract documents:</strong></p>
        <ul>
          <li>Contract drawings and specifications</li>
          <li>Quality control plan</li>
          <li>Safety plan</li>
          <li>Schedule of values</li>
          <li>Construction schedule</li>
        </ul>
        <p><strong>Quality control:</strong></p>
        <ul>
          <li>Contractor QC system required</li>
          <li>Government QA oversight</li>
          <li>Three-phase control (prep, initial, follow-up)</li>
          <li>Documentation of inspections</li>
        </ul>
        <p><strong>Progress payments:</strong></p>
        <ul>
          <li>Monthly progress payments typical</li>
          <li>Based on work completed</li>
          <li>Retention held (typically 10%)</li>
          <li>Final payment after acceptance</li>
        </ul>
        <p><strong>Changes and modifications:</strong></p>
        <ul>
          <li>Changes clause applies</li>
          <li>Differing site conditions</li>
          <li>REA for changed work</li>
          <li>Document impacts promptly</li>
        </ul>
        <p><strong>Submittals:</strong></p>
        <ul>
          <li>Shop drawings</li>
          <li>Product data</li>
          <li>Samples</li>
          <li>Certifications</li>
        </ul>
      `,
    },
    {
      heading: 'Specialty Construction Areas',
      content: `
        <p><strong>Design-build:</strong></p>
        <ul>
          <li>Single contract for design and construction</li>
          <li>A/E team with construction firm</li>
          <li>Best value evaluation</li>
          <li>Growing federal preference</li>
        </ul>
        <p><strong>Environmental construction:</strong></p>
        <ul>
          <li>CERCLA/Superfund work</li>
          <li>FUDS (Formerly Used Defense Sites)</li>
          <li>Environmental remediation</li>
          <li>Specialized certifications required</li>
        </ul>
        <p><strong>Job Order Contracting (JOC):</strong></p>
        <ul>
          <li>IDIQ for small to medium projects</li>
          <li>Unit price book pricing</li>
          <li>Quick turnaround work</li>
          <li>Repair and renovation</li>
        </ul>
        <p><strong>Military construction (MILCON):</strong></p>
        <ul>
          <li>Major military facility projects</li>
          <li>Congressional authorization</li>
          <li>Large, complex projects</li>
          <li>Security requirements</li>
        </ul>
        <p><strong>Sustainable construction:</strong></p>
        <ul>
          <li>LEED certification requirements</li>
          <li>Energy efficiency standards</li>
          <li>Green building practices</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is the Davis-Bacon Act?',
      answer:
        'The Davis-Bacon Act requires contractors on federal construction contracts over $2,000 to pay locally prevailing wages as determined by the Department of Labor. It covers laborers and mechanics on the project.',
    },
    {
      question: 'Do I need bonds for federal construction work?',
      answer:
        'Yes. The Miller Act requires performance and payment bonds for federal construction contracts over $150,000. Bid bonds are also typically required for competitive procurements.',
    },
    {
      question: 'How do I get bonding capacity?',
      answer:
        'Work with a surety company and bonding agent. Build your financial strength, start with smaller projects, maintain good banking relationships, and consider the SBA Surety Bond Guarantee Program.',
    },
    {
      question: 'What size standard applies to construction?',
      answer:
        'Construction size standards vary by NAICS code, typically ranging from $16.5M to $45M in average annual receipts. Check the specific NAICS code for your type of construction work.',
    },
    {
      question: 'Is federal construction mostly sealed bidding?',
      answer:
        'Sealed bidding (IFB) is common for simpler construction projects. Complex projects, design-build, and best value procurements use negotiated RFPs. The trend is toward more design-build.',
    },
    {
      question: 'How important is safety record?',
      answer:
        'Very important. Many solicitations require a favorable EMR (Experience Modification Rate), review your OSHA history, and evaluate your safety program. Poor safety record can disqualify you.',
    },
    {
      question: 'Can small businesses win large construction contracts?',
      answer:
        'Yes, through joint ventures, mentor-protégé relationships, and teaming. Many large contracts have small business subcontracting goals. Start smaller and build your past performance.',
    },
    {
      question: 'What is the three-phase QC system?',
      answer:
        'Federal construction quality control typically requires three phases: Preparatory (before work starts), Initial (first day of work), and Follow-up (ongoing). Each phase has specific inspection and documentation requirements.',
    },
  ],
  cta: {
    heading: 'Win Federal Construction Contracts',
    description:
      'Federal construction has unique requirements from Davis-Bacon to bonding. Our team helps construction contractors navigate federal requirements and win more work.',
    buttonText: 'Get Construction Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'service-contract-act',
    'firm-fixed-price-contracts',
    'sba-certifications',
    'finding-government-contracts',
    'proposal-writing',
  ],
  publishedDate: '2026-04-07',
};
