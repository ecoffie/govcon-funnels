import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'it-contracting',
  title: 'Federal IT Contracting: Guide for Technology Companies',
  metaTitle: 'Federal IT Contracting Guide — Government Tech Contracts & Requirements',
  metaDescription:
    'Learn federal IT contracting: technology contract vehicles, cybersecurity requirements, cloud procurement, FITARA compliance, and winning IT contracts.',
  keywords: [
    'federal it contracting',
    'government it contracts',
    'technology contracts',
    'federal cybersecurity',
    'cloud contracting',
    'fitara',
    'fedramp',
    'it modernization',
    'government technology',
    'federal software',
  ],
  heroSubtitle:
    'Federal IT spending exceeds $100 billion annually. Understanding government technology procurement is essential for tech companies pursuing this market.',
  sections: [
    {
      heading: 'Federal IT Market Overview',
      content: `
        <p>The federal government is one of the world's largest buyers of information technology, spending over $100 billion annually.</p>
        <p><strong>Major IT spending areas:</strong></p>
        <ul>
          <li>Cybersecurity and defense</li>
          <li>Cloud computing and infrastructure</li>
          <li>Software development and modernization</li>
          <li>IT services and support</li>
          <li>Hardware and equipment</li>
        </ul>
        <p><strong>Key IT buyers:</strong></p>
        <ul>
          <li><strong>DoD</strong> — Largest IT buyer</li>
          <li><strong>DHS</strong> — Cybersecurity focus</li>
          <li><strong>VA</strong> — Healthcare IT</li>
          <li><strong>IRS/Treasury</strong> — Financial systems</li>
          <li><strong>All agencies</strong> — IT is everywhere</li>
        </ul>
        <p><strong>Common NAICS codes:</strong></p>
        <ul>
          <li>541512 — Computer Systems Design Services</li>
          <li>541511 — Custom Computer Programming</li>
          <li>541519 — Other Computer Related Services</li>
          <li>518210 — Data Processing/Hosting</li>
          <li>511210 — Software Publishers</li>
        </ul>
      `,
    },
    {
      heading: 'Major IT Contract Vehicles',
      content: `
        <p><strong>Government-wide Acquisition Contracts (GWACs):</strong></p>
        <ul>
          <li><strong>8(a) STARS III</strong> — 8(a) IT services</li>
          <li><strong>Alliant 2</strong> — Full IT services</li>
          <li><strong>VETS 2</strong> — SDVOSB IT services</li>
          <li><strong>Polaris</strong> — Small business IT (GSA)</li>
        </ul>
        <p><strong>GSA Schedule:</strong></p>
        <ul>
          <li>IT Schedule 70 (now MAS Category 54151)</li>
          <li>Professional Services (541)</li>
          <li>Software and software services</li>
        </ul>
        <p><strong>Agency-specific vehicles:</strong></p>
        <ul>
          <li><strong>CIO-SP4</strong> — NIH IT services</li>
          <li><strong>SEWP V</strong> — NASA IT products (transition to VI)</li>
          <li><strong>ENCORE III</strong> — DoD IT services</li>
        </ul>
        <p><strong>BPAs and task orders:</strong></p>
        <ul>
          <li>BPAs against GSA Schedule</li>
          <li>Task orders under GWACs</li>
          <li>Agency blanket purchase agreements</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/contract-vehicles">Contract Vehicles Guide</a></p>
      `,
    },
    {
      heading: 'Cybersecurity Requirements',
      content: `
        <p><strong>CMMC (Cybersecurity Maturity Model Certification):</strong></p>
        <ul>
          <li>Required for DoD contracts</li>
          <li>Levels 1-3 based on data sensitivity</li>
          <li>Third-party certification required</li>
          <li>Implementation underway</li>
        </ul>
        <p><strong>NIST 800-171:</strong></p>
        <ul>
          <li>Protecting Controlled Unclassified Information (CUI)</li>
          <li>110 security controls</li>
          <li>Self-attestation currently</li>
          <li>Foundation for CMMC</li>
        </ul>
        <p><strong>FedRAMP:</strong></p>
        <ul>
          <li>Cloud security authorization</li>
          <li>Required for cloud services to government</li>
          <li>Standardized security assessment</li>
          <li>Agency ATOs based on FedRAMP</li>
        </ul>
        <p><strong>Supply chain security:</strong></p>
        <ul>
          <li>Section 889 compliance (no covered equipment)</li>
          <li>SCRM requirements</li>
          <li>Software Bill of Materials (SBOM)</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/cmmc-certification">CMMC Guide</a></p>
      `,
    },
    {
      heading: 'Cloud and Software Procurement',
      content: `
        <p><strong>Cloud procurement:</strong></p>
        <ul>
          <li>Cloud Smart policy</li>
          <li>FedRAMP authorization required</li>
          <li>IaaS, PaaS, SaaS models</li>
          <li>Security and compliance focus</li>
        </ul>
        <p><strong>Cloud contract vehicles:</strong></p>
        <ul>
          <li>AWS, Azure, Google Cloud agreements</li>
          <li>Agency cloud contracts</li>
          <li>GSA cloud offerings</li>
        </ul>
        <p><strong>Software licensing:</strong></p>
        <ul>
          <li>Enterprise license agreements</li>
          <li>Government-specific terms</li>
          <li>Volume licensing</li>
          <li>SaaS subscriptions</li>
        </ul>
        <p><strong>Agile/DevSecOps:</strong></p>
        <ul>
          <li>Modern software development approaches</li>
          <li>Agile contracts gaining favor</li>
          <li>DevSecOps requirements</li>
          <li>Continuous delivery expectations</li>
        </ul>
        <p><strong>Open source:</strong></p>
        <ul>
          <li>Federal Source Code Policy</li>
          <li>Code.gov requirements</li>
          <li>Open source security considerations</li>
        </ul>
      `,
    },
    {
      heading: 'FITARA and IT Governance',
      content: `
        <p><strong>FITARA (Federal IT Acquisition Reform Act):</strong></p>
        <ul>
          <li>CIO authority over IT spending</li>
          <li>IT acquisition improvements</li>
          <li>Data center consolidation</li>
          <li>Portfolio review</li>
        </ul>
        <p><strong>Impact on contractors:</strong></p>
        <ul>
          <li>CIO involvement in IT acquisitions</li>
          <li>Standardization emphasis</li>
          <li>Transparency requirements</li>
          <li>Portfolio-based buying</li>
        </ul>
        <p><strong>Technology Business Management (TBM):</strong></p>
        <ul>
          <li>IT cost transparency</li>
          <li>Value demonstration</li>
          <li>Cost allocation requirements</li>
        </ul>
        <p><strong>IT Dashboard:</strong></p>
        <ul>
          <li>Public visibility of major IT investments</li>
          <li>Project health ratings</li>
          <li>CIO ratings</li>
        </ul>
        <p><strong>MGT Act:</strong></p>
        <ul>
          <li>IT modernization fund</li>
          <li>Working capital funds</li>
          <li>Modernization emphasis</li>
        </ul>
      `,
    },
    {
      heading: 'IT Services vs. Products',
      content: `
        <p><strong>IT services contracting:</strong></p>
        <ul>
          <li>Staff augmentation</li>
          <li>Managed services</li>
          <li>Systems integration</li>
          <li>Help desk/support</li>
          <li>Development services</li>
        </ul>
        <p><strong>Services contract types:</strong></p>
        <ul>
          <li>Time & Materials</li>
          <li>Labor Hour</li>
          <li>Firm Fixed Price (tasks)</li>
          <li>Cost-plus (complex development)</li>
        </ul>
        <p><strong>IT products contracting:</strong></p>
        <ul>
          <li>Hardware procurement</li>
          <li>Software licenses</li>
          <li>Commercial off-the-shelf (COTS)</li>
          <li>Subscriptions and maintenance</li>
        </ul>
        <p><strong>Product contract types:</strong></p>
        <ul>
          <li>Firm Fixed Price</li>
          <li>BPAs for recurring needs</li>
          <li>Blanket agreements</li>
        </ul>
        <p><strong>Combination contracts:</strong></p>
        <ul>
          <li>Products and services together</li>
          <li>Implementation included</li>
          <li>Support and maintenance</li>
        </ul>
      `,
    },
    {
      heading: 'Winning IT Contracts',
      content: `
        <p><strong>Positioning strategies:</strong></p>
        <ul>
          <li>Get on relevant contract vehicles</li>
          <li>Build agency relationships</li>
          <li>Demonstrate past performance</li>
          <li>Stay current on technology trends</li>
        </ul>
        <p><strong>Technical differentiation:</strong></p>
        <ul>
          <li>Leading-edge capabilities</li>
          <li>Proven methodologies</li>
          <li>Security credentials</li>
          <li>Innovation culture</li>
        </ul>
        <p><strong>Personnel qualifications:</strong></p>
        <ul>
          <li>Certifications (security, cloud, project management)</li>
          <li>Clearances for cleared work</li>
          <li>Agency experience</li>
          <li>Technical depth</li>
        </ul>
        <p><strong>Proposal strategies:</strong></p>
        <ul>
          <li>Understand the mission</li>
          <li>Show relevant experience</li>
          <li>Address security requirements</li>
          <li>Demonstrate innovation</li>
        </ul>
        <p><strong>Teaming:</strong></p>
        <ul>
          <li>Large integrator relationships</li>
          <li>Small business teaming</li>
          <li>Technology partnerships</li>
        </ul>
      `,
    },
    {
      heading: 'IT Contracting Trends',
      content: `
        <p><strong>Current trends:</strong></p>
        <ul>
          <li><strong>Cloud migration</strong> — Accelerating to cloud</li>
          <li><strong>Cybersecurity</strong> — Zero trust, CMMC</li>
          <li><strong>AI/ML</strong> — Growing government interest</li>
          <li><strong>Modernization</strong> — Legacy system replacement</li>
          <li><strong>DevSecOps</strong> — Modern development practices</li>
        </ul>
        <p><strong>Emerging opportunities:</strong></p>
        <ul>
          <li>Zero trust architecture</li>
          <li>AI and automation</li>
          <li>Data analytics</li>
          <li>Customer experience</li>
          <li>5G and edge computing</li>
        </ul>
        <p><strong>Buying behavior changes:</strong></p>
        <ul>
          <li>Commercial solutions preference</li>
          <li>Agile acquisition</li>
          <li>Outcome-based contracting</li>
          <li>Shorter contract cycles</li>
        </ul>
        <p><strong>Strategic positioning:</strong></p>
        <ul>
          <li>Invest in emerging capabilities</li>
          <li>Build security credentials</li>
          <li>Develop agency expertise</li>
          <li>Stay flexible and innovative</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Do I need FedRAMP to sell cloud to the government?',
      answer:
        'For cloud services that will process, store, or transmit federal information, yes. FedRAMP authorization is typically required. The level (Low, Moderate, High) depends on data sensitivity.',
    },
    {
      question: 'What certifications help win IT contracts?',
      answer:
        'Key certifications include: CMMC for DoD, FedRAMP for cloud, ISO 27001 for security management, PMP for project management, AWS/Azure/GCP certifications for cloud, and ITIL for service management.',
    },
    {
      question: 'How do I get on a GWAC like Alliant or STARS?',
      answer:
        'GWACs have periodic on-ramps. Monitor for solicitations, meet qualification requirements (experience, financials, socioeconomic status), and submit a strong proposal. Some GWACs are closed to new entrants.',
    },
    {
      question: 'Is GSA Schedule enough for IT contracting?',
      answer:
        'GSA Schedule is a good start and provides access to many opportunities. However, GWACs often provide better access to large IT task orders. Having both Schedule and GWAC positions is ideal.',
    },
    {
      question: 'What is Section 889 compliance?',
      answer:
        'Section 889 prohibits federal agencies from procuring or using covered telecommunications equipment or services from certain Chinese companies (Huawei, ZTE, etc.). Contractors must certify compliance.',
    },
    {
      question: 'Do I need security clearances for IT work?',
      answer:
        'Depends on the work. Unclassified IT work may not require clearances. Work involving classified systems requires cleared personnel. Many positions require at least a Secret clearance.',
    },
    {
      question: 'How important is Agile experience?',
      answer:
        'Increasingly important. Many agencies are adopting Agile methodologies for software development. Demonstrate Agile experience, certifications (SAFe, Scrum), and successful Agile project delivery.',
    },
    {
      question: 'What size standards apply to IT?',
      answer:
        'IT services (NAICS 541512) size standard is $34 million average annual receipts. Software publishing (511210) is 1,250 employees. Check the specific NAICS code for your services.',
    },
  ],
  cta: {
    heading: 'Win Federal IT Contracts',
    description:
      'The federal IT market offers tremendous opportunity for technology companies. Our team helps you navigate requirements, get on vehicles, and win contracts.',
    buttonText: 'Get IT Contracting Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'contract-vehicles',
    'cmmc-certification',
    'gsa-schedule',
    'finding-government-contracts',
    'security-clearances',
  ],
  publishedDate: '2026-04-07',
};
