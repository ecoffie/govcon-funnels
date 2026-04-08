import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'counterfeit-parts',
  title: 'Counterfeit Parts Prevention for Government Contractors',
  metaTitle: 'Counterfeit Parts Guide — DFARS Detection, Prevention & Quality Requirements',
  metaDescription:
    'Complete guide to counterfeit parts prevention for defense contractors: DFARS counterfeit requirements, detection methods, supplier qualification, reporting, and quality system controls.',
  keywords: [
    'counterfeit parts',
    'DFARS counterfeit',
    'suspect counterfeit',
    'electronic parts counterfeit',
    'GIDEP',
    'approved supplier list',
    'OCM original component manufacturer',
    'counterfeit detection',
    'quality control',
    'supply chain risk',
  ],
  heroSubtitle:
    'Counterfeit parts pose serious safety, performance, and security risks in defense systems. Learn the DFARS requirements, detection methods, supplier controls, and reporting obligations to prevent counterfeit parts.',
  sections: [
    {
      heading: 'Overview of Counterfeit Parts Risk',
      content: `
        <p>Counterfeit parts are unauthorized copies, clones, or recycled components misrepresented as genuine. They threaten mission readiness, safety, and national security.</p>
        <p><strong>Why counterfeit parts are a major concern:</strong></p>
        <ul>
          <li><strong>Safety risk:</strong> Parts may fail catastrophically in aircraft, weapons, or critical systems</li>
          <li><strong>Performance degradation:</strong> Counterfeit components often have inferior specifications</li>
          <li><strong>Cybersecurity threat:</strong> Malicious modifications or backdoors in electronics</li>
          <li><strong>Supply chain integrity:</strong> Undermines trust and reliability</li>
          <li><strong>Financial impact:</strong> Rework, recalls, warranty claims, contract penalties</li>
        </ul>
        <p><strong>Types of counterfeit parts:</strong></p>
        <ul>
          <li><strong>Recycled/remarked:</strong> Used parts cleaned, remarked, and sold as new</li>
          <li><strong>Overproduced:</strong> Unauthorized additional production runs</li>
          <li><strong>Out-of-spec:</strong> Parts that failed quality tests, then remarked</li>
          <li><strong>Cloned:</strong> Unauthorized copies of genuine designs</li>
          <li><strong>Forged documentation:</strong> Fake certifications, test reports, traceability</li>
          <li><strong>Tampered:</strong> Genuine parts altered (date codes, grades, ratings)</li>
        </ul>
        <p><strong>High-risk categories:</strong></p>
        <ul>
          <li>Electronic components (ICs, semiconductors, microprocessors)</li>
          <li>Obsolete or hard-to-find parts</li>
          <li>High-demand, expensive components</li>
          <li>Parts sourced through independent distributors or brokers</li>
          <li>Commercial off-the-shelf (COTS) items</li>
        </ul>
        <p><strong>Counterfeit entry points:</strong></p>
        <ul>
          <li>Gray market and independent distributors</li>
          <li>Internet and e-commerce sales</li>
          <li>Overseas manufacturers and suppliers</li>
          <li>Unauthorized subcontractors</li>
          <li>Surplus and excess inventory resellers</li>
        </ul>
      `,
    },
    {
      heading: 'DFARS Counterfeit Prevention Requirements',
      content: `
        <p><strong>DFARS 252.246-7007 and 252.246-7008:</strong></p>
        <p>Defense contractors must implement counterfeit prevention systems and controls.</p>
        <p><strong>DFARS 252.246-7007 — Contractor Counterfeit Electronic Part Detection and Avoidance System:</strong></p>
        <p>Applies to contractors supplying electronic parts or assemblies to DoD. Requires:</p>
        <ul>
          <li>Establish and maintain counterfeit electronic part detection and avoidance system</li>
          <li>Detect and avoid use, purchase, or inclusion of counterfeit or suspect counterfeit parts</li>
          <li>System must meet industry-recognized standards (e.g., AS6171, AS6496)</li>
          <li>Flow down to subcontractors at all tiers</li>
        </ul>
        <p><strong>Key definitions:</strong></p>
        <ul>
          <li><strong>Counterfeit electronic part:</strong> Unlawful or unauthorized reproduction, substitution, or alteration that has been misidentified or misrepresented</li>
          <li><strong>Suspect counterfeit:</strong> Part with credible evidence it is counterfeit</li>
          <li><strong>Electronic part:</strong> Integrated circuit, discrete electronic component, or assembly</li>
        </ul>
        <p><strong>DFARS 252.246-7008 — Sources of Electronic Parts:</strong></p>
        <p>Establishes sourcing hierarchy to minimize counterfeit risk:</p>
        <ol>
          <li><strong>Original Component Manufacturer (OCM)</strong> or OCM-authorized distributor</li>
          <li><strong>Contractors with counterfeit detection systems</strong> (AS6171, AS6496 compliant)</li>
          <li><strong>Independent distributors</strong> — only if (1) and (2) unavailable, with additional counterfeit risk mitigation</li>
        </ol>
        <p><strong>Sourcing from independent distributors:</strong></p>
        <p>If using non-authorized sources, contractor must:</p>
        <ul>
          <li>Conduct inspection, testing, and authentication</li>
          <li>Maintain records of authenticity determinations</li>
          <li>Make records available to government upon request</li>
        </ul>
        <p><strong>Reporting requirement:</strong></p>
        <ul>
          <li>Report suspected counterfeit parts to:</li>
          <li>Government-Industry Data Exchange Program (GIDEP)</li>
          <li>Contracting Officer</li>
          <li>Within 60 days of discovery</li>
        </ul>
        <p><strong>Contractor liability:</strong></p>
        <ul>
          <li>Contractor responsible for costs of counterfeit or suspect counterfeit parts and rework</li>
          <li>Unless counterfeit part was provided by government as Government Furnished Property (GFP)</li>
        </ul>
      `,
    },
    {
      heading: 'Industry Standards: AS6171 and AS6496',
      content: `
        <p><strong>AS6171 — Test Methods Standard: Counterfeit Electronic Parts; Avoidance, Detection, Mitigation, and Disposition:</strong></p>
        <p>Defines test methods and procedures for authenticating electronic parts:</p>
        <ul>
          <li>Visual inspection (marking, leads, package)</li>
          <li>X-ray inspection (internal construction, die attach)</li>
          <li>Destructive physical analysis (DPA)</li>
          <li>Electrical testing (parametric, functional)</li>
          <li>Material analysis (XRF, FTIR, SEM/EDS)</li>
          <li>Solderability and thermal cycling</li>
        </ul>
        <p><strong>AS6496 — Counterfeit Electronic Parts; Avoidance, Detection, Mitigation, and Disposition – Distributors:</strong></p>
        <p>Establishes requirements for independent distributors and test laboratories:</p>
        <ul>
          <li>Establish counterfeit parts avoidance program</li>
          <li>Qualify and monitor suppliers</li>
          <li>Implement receiving inspection and testing</li>
          <li>Maintain traceability and documentation</li>
          <li>Report suspect counterfeit to GIDEP</li>
          <li>Third-party certification available (IDEA, ERAI)</li>
        </ul>
        <p><strong>AS5553 — Counterfeit Electronic Parts; Avoidance, Detection, Mitigation, and Disposition:</strong></p>
        <p>Broader standard covering counterfeit avoidance programs for organizations:</p>
        <ul>
          <li>Management policies and procedures</li>
          <li>Training and awareness</li>
          <li>Supplier qualification and approved supplier lists</li>
          <li>Parts procurement controls</li>
          <li>Inspection and testing requirements</li>
          <li>Reporting and disposition</li>
        </ul>
        <p><strong>AS6081 — Counterfeit Electronic Parts; Avoidance, Detection, Mitigation, and Disposition – Plastic Encapsulated Microcircuits:</strong></p>
        <p>Specialized standard for plastic-encapsulated parts (largest counterfeit risk category):</p>
        <ul>
          <li>X-ray and decapsulation techniques</li>
          <li>Die and bond wire inspection</li>
          <li>Blacktopping detection (remarked ICs)</li>
        </ul>
        <p><strong>Implementing AS6171/AS6496 compliant system:</strong></p>
        <ol>
          <li>Adopt applicable SAE aerospace standards</li>
          <li>Develop written counterfeit prevention plan</li>
          <li>Establish supplier qualification and ASL</li>
          <li>Define inspection and testing protocols</li>
          <li>Train procurement and quality personnel</li>
          <li>Implement traceability and documentation requirements</li>
          <li>Establish GIDEP reporting procedures</li>
        </ol>
      `,
    },
    {
      heading: 'Supplier Qualification and Approved Supplier Lists',
      content: `
        <p><strong>Supplier risk assessment:</strong></p>
        <p>Evaluate suppliers based on counterfeit risk factors:</p>
        <ul>
          <li><strong>Source type:</strong> OCM, authorized distributor, independent distributor, broker</li>
          <li><strong>Certification:</strong> AS6496, IDEA-ICE-3000, ISO 9001, AS9100</li>
          <li><strong>Track record:</strong> Past performance, quality history, counterfeit incidents</li>
          <li><strong>Traceability:</strong> Ability to trace to OCM</li>
          <li><strong>Quality systems:</strong> Inspection, testing, storage capabilities</li>
        </ul>
        <p><strong>Approved Supplier List (ASL):</strong></p>
        <ul>
          <li>Maintain list of qualified, low-risk suppliers</li>
          <li>Prioritize OCMs and authorized distributors</li>
          <li>Qualify independent distributors meeting AS6496 or equivalent</li>
          <li>Periodically re-evaluate and audit ASL suppliers</li>
          <li>Require procurement from ASL for critical/high-risk parts</li>
        </ul>
        <p><strong>OCM and authorized distributor verification:</strong></p>
        <ul>
          <li>Confirm authorization status directly with OCM</li>
          <li>Check OCM websites for authorized distributor lists</li>
          <li>Maintain evidence of authorization (letters, certificates)</li>
          <li>Beware of counterfeit authorization documents</li>
        </ul>
        <p><strong>Independent distributor qualification:</strong></p>
        <p>If using independent distributors, verify:</p>
        <ul>
          <li>AS6496 or IDEA-ICE-3000 certification</li>
          <li>Counterfeit prevention program documentation</li>
          <li>Inspection and testing capabilities</li>
          <li>GIDEP membership and reporting</li>
          <li>Traceability to OCM (certificates of conformance, datasheets)</li>
        </ul>
        <p><strong>Procurement controls:</strong></p>
        <ul>
          <li>Purchase orders specify sourcing requirements (OCM, authorized distributor)</li>
          <li>Include counterfeit prevention flow-down clauses</li>
          <li>Require traceability documentation (C of C, test reports)</li>
          <li>Prohibit use of remarked, reclaimed, or refurbished parts without disclosure and approval</li>
          <li>Require parts be shipped in OCM packaging when possible</li>
        </ul>
        <p><strong>Supplier audits:</strong></p>
        <ul>
          <li>Conduct on-site audits of high-risk suppliers</li>
          <li>Verify counterfeit prevention controls</li>
          <li>Inspect storage and handling facilities</li>
          <li>Review inspection/testing records</li>
          <li>Document findings and corrective actions</li>
        </ul>
      `,
    },
    {
      heading: 'Counterfeit Detection and Inspection',
      content: `
        <p><strong>Receiving inspection protocol:</strong></p>
        <ol>
          <li><strong>Visual inspection:</strong>
            <ul>
              <li>Markings: font, spacing, alignment, legibility</li>
              <li>Date codes: format, consistency, age vs. claimed new parts</li>
              <li>Packaging: OCM-consistent labels, seals, moisture barrier bags</li>
              <li>Lead finish: oxidation, damage, re-tinning evidence</li>
              <li>Uniformity: compare parts within lot for consistency</li>
            </ul>
          </li>
          <li><strong>Documentation review:</strong>
            <ul>
              <li>Certificates of conformance (match part numbers, date codes)</li>
              <li>Test reports (verify authenticity, contact lab if questionable)</li>
              <li>Traceability to OCM (invoices, packing slips)</li>
            </ul>
          </li>
          <li><strong>Advanced inspection (for high-risk parts):</strong>
            <ul>
              <li>X-ray inspection (internal bond wires, die attach, package integrity)</li>
              <li>Electrical testing (parametric, functional per datasheet)</li>
              <li>Material analysis (XRF for lead finish, decapsulation for die inspection)</li>
              <li>Acetone test (check for blacktopping/remarking)</li>
            </ul>
          </li>
        </ol>
        <p><strong>Red flags indicating suspect counterfeit:</strong></p>
        <ul>
          <li>Inconsistent or irregular markings</li>
          <li>Sanding, polishing, or remarking evidence</li>
          <li>Mismatched date codes within a lot</li>
          <li>Parts older than expected for "new" stock</li>
          <li>Non-standard packaging or labeling</li>
          <li>Damaged, oxidized, or non-uniform leads</li>
          <li>Parts offered at prices significantly below market</li>
          <li>Supplier unable to provide OCM traceability</li>
        </ul>
        <p><strong>Test methods summary (AS6171):</strong></p>
        <table>
          <tr>
            <th>Test</th>
            <th>Purpose</th>
            <th>Equipment</th>
          </tr>
          <tr>
            <td>External visual</td>
            <td>Detect remarking, package anomalies</td>
            <td>Microscope, calipers</td>
          </tr>
          <tr>
            <td>X-ray</td>
            <td>Verify internal construction, die, bond wires</td>
            <td>X-ray inspection system</td>
          </tr>
          <tr>
            <td>Decapsulation</td>
            <td>Visual inspection of die and internal features</td>
            <td>Acid/plasma etch, microscope</td>
          </tr>
          <tr>
            <td>XRF</td>
            <td>Analyze material composition (lead finish, die)</td>
            <td>X-ray fluorescence analyzer</td>
          </tr>
          <tr>
            <td>Acetone test</td>
            <td>Detect blacktopping (remarked ICs)</td>
            <td>Acetone, cotton swabs</td>
          </tr>
          <tr>
            <td>Electrical test</td>
            <td>Verify functionality and parametrics</td>
            <td>ATE, curve tracer, datasheet specs</td>
          </tr>
        </table>
        <p><strong>Using third-party test labs:</strong></p>
        <ul>
          <li>Engage accredited labs for advanced testing (AS6171 compliant)</li>
          <li>Provide clear test scope and criteria</li>
          <li>Review test reports for thoroughness and conclusions</li>
          <li>Common labs: Creative Electron, ERAI, GIDEP member labs</li>
        </ul>
        <p><strong>Sampling strategy:</strong></p>
        <ul>
          <li>100% visual inspection of high-risk parts</li>
          <li>Sample-based advanced testing (typically 5-10% of lot)</li>
          <li>Increase sampling for new suppliers or suspect lots</li>
          <li>Risk-based approach (critical parts, expensive parts, obsolete parts)</li>
        </ul>
      `,
    },
    {
      heading: 'Reporting and Disposition of Suspect Counterfeit Parts',
      content: `
        <p><strong>GIDEP reporting requirement:</strong></p>
        <p>Contractors must report suspect counterfeit parts to the Government-Industry Data Exchange Program (GIDEP):</p>
        <ul>
          <li>Within 60 days of discovery</li>
          <li>Submit via GIDEP online portal (<a href="https://www.gidep.org" target="_blank" rel="noopener">www.gidep.org</a>)</li>
          <li>Include detailed description, photos, test results</li>
          <li>Identify supplier and part number</li>
        </ul>
        <p><strong>GIDEP membership:</strong></p>
        <ul>
          <li>Free to government and defense contractors</li>
          <li>Access to counterfeit alerts and database</li>
          <li>Participate in information sharing</li>
          <li>Register at <a href="https://www.gidep.org" target="_blank" rel="noopener">www.gidep.org</a></li>
        </ul>
        <p><strong>What to report:</strong></p>
        <ul>
          <li>Confirmed counterfeit parts (after testing/analysis)</li>
          <li>Suspect counterfeit (credible evidence, pending confirmation)</li>
          <li>Include photos of markings, packaging, internal features</li>
          <li>Test reports and findings</li>
          <li>Source information (supplier, date purchased)</li>
        </ul>
        <p><strong>Notification to contracting officer:</strong></p>
        <ul>
          <li>Inform CO of suspect or confirmed counterfeit within 60 days</li>
          <li>Describe impact to contract performance</li>
          <li>Outline corrective actions and replacement plan</li>
          <li>Provide GIDEP report reference number</li>
        </ul>
        <p><strong>Disposition of counterfeit parts:</strong></p>
        <ul>
          <li><strong>Quarantine:</strong> Immediately segregate suspect parts to prevent use</li>
          <li><strong>Mark:</strong> Clearly identify as suspect or confirmed counterfeit</li>
          <li><strong>Testing:</strong> Conduct or arrange testing to confirm counterfeit status</li>
          <li><strong>Return to supplier:</strong> If feasible, return for credit or replacement</li>
          <li><strong>Destruction:</strong> Physically destroy to prevent re-entry to supply chain (shredding, crushing)</li>
          <li><strong>Documentation:</strong> Maintain records of disposition actions</li>
        </ul>
        <p><strong>Impact assessment:</strong></p>
        <ul>
          <li>Identify all contracts, assemblies, and end items affected</li>
          <li>Assess risk to safety, performance, security</li>
          <li>Determine if fielded systems require retrofit or recall</li>
          <li>Notify government customers of potential impact</li>
        </ul>
        <p><strong>Corrective and preventive actions:</strong></p>
        <ul>
          <li>Investigate root cause (supplier, process gap, control failure)</li>
          <li>Implement corrective actions to address immediate issue</li>
          <li>Preventive actions to avoid recurrence (ASL update, supplier termination, enhanced testing)</li>
          <li>Document lessons learned and update procedures</li>
        </ul>
        <p><strong>Cost recovery:</strong></p>
        <ul>
          <li>Pursue recovery from supplier if counterfeit was delivered</li>
          <li>Contractual remedies (indemnification, warranty)</li>
          <li>Legal action if supplier knowingly provided counterfeit</li>
          <li>Report to law enforcement if fraud suspected</li>
        </ul>
      `,
    },
    {
      heading: 'Building a Counterfeit Prevention Program',
      content: `
        <p><strong>Program elements (aligned with AS5553):</strong></p>
        <p><strong>1. Leadership and policy</strong></p>
        <ul>
          <li>Management commitment and counterfeit prevention policy</li>
          <li>Designated program manager or responsible individual</li>
          <li>Resources and authority to implement controls</li>
        </ul>
        <p><strong>2. Risk assessment</strong></p>
        <ul>
          <li>Identify high-risk parts (electronic, obsolete, COTS)</li>
          <li>Assess supplier and sourcing risks</li>
          <li>Prioritize controls based on risk</li>
        </ul>
        <p><strong>3. Supplier management</strong></p>
        <ul>
          <li>Approved Supplier List (ASL)</li>
          <li>Supplier qualification and audits</li>
          <li>Procurement controls and flow-down requirements</li>
        </ul>
        <p><strong>4. Inspection and testing</strong></p>
        <ul>
          <li>Receiving inspection procedures (visual, documentation review)</li>
          <li>Risk-based advanced testing (X-ray, electrical, material analysis)</li>
          <li>Third-party lab engagement for complex testing</li>
        </ul>
        <p><strong>5. Training and awareness</strong></p>
        <ul>
          <li>Train procurement, engineering, quality personnel</li>
          <li>Counterfeit recognition and red flags</li>
          <li>DFARS and industry standard requirements</li>
        </ul>
        <p><strong>6. Reporting and disposition</strong></p>
        <ul>
          <li>GIDEP reporting procedures</li>
          <li>CO notification process</li>
          <li>Quarantine, testing, and destruction protocols</li>
        </ul>
        <p><strong>7. Continuous improvement</strong></p>
        <ul>
          <li>Monitor GIDEP alerts and industry trends</li>
          <li>Review and update procedures</li>
          <li>Lessons learned from counterfeit incidents</li>
        </ul>
        <p><strong>Documentation requirements:</strong></p>
        <ul>
          <li>Counterfeit prevention plan or quality manual section</li>
          <li>Approved Supplier List and qualification records</li>
          <li>Inspection and test procedures</li>
          <li>Training records</li>
          <li>Supplier purchase orders with flow-down clauses</li>
          <li>Receiving inspection and test reports</li>
          <li>GIDEP reports and CO notifications</li>
          <li>Disposition records for suspect/confirmed counterfeits</li>
        </ul>
        <p><strong>Integration with quality management system:</strong></p>
        <ul>
          <li>Align with AS9100, ISO 9001, or other QMS</li>
          <li>Include in supplier management and receiving inspection processes</li>
          <li>Internal audits of counterfeit controls</li>
          <li>Management review of counterfeit incidents and metrics</li>
        </ul>
        <p><strong>Metrics and KPIs:</strong></p>
        <ul>
          <li>Number of suspect counterfeit parts detected</li>
          <li>Percentage of parts sourced from OCM/authorized distributors</li>
          <li>Supplier qualification and ASL coverage</li>
          <li>Inspection and testing completion rates</li>
          <li>GIDEP report timeliness</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What are the DFARS counterfeit prevention requirements?',
      answer:
        'DFARS 252.246-7007 requires contractors to establish counterfeit electronic part detection and avoidance systems meeting AS6171/AS6496 standards. DFARS 252.246-7008 establishes a sourcing hierarchy: OCM first, then authorized distributors, then independent distributors with enhanced controls.',
    },
    {
      question: 'What is the difference between counterfeit and suspect counterfeit?',
      answer:
        'Counterfeit parts are confirmed to be unauthorized copies or altered components. Suspect counterfeit means credible evidence suggests the part is counterfeit, but testing/analysis has not yet confirmed it. Both must be reported to GIDEP.',
    },
    {
      question: 'Do I need to report suspect counterfeit parts to GIDEP?',
      answer:
        'Yes. DFARS requires reporting suspect or confirmed counterfeit electronic parts to GIDEP and the contracting officer within 60 days of discovery. GIDEP membership is free at www.gidep.org.',
    },
    {
      question: 'Can I purchase from independent distributors or brokers?',
      answer:
        'Yes, but only if OCMs and authorized distributors are unavailable. You must conduct enhanced inspection, testing, and authentication per AS6171/AS6496, and maintain records of authenticity determinations.',
    },
    {
      question: 'What inspection and testing is required for counterfeit detection?',
      answer:
        'At a minimum: visual inspection of markings, packaging, and leads; documentation review for traceability. For high-risk parts: X-ray, electrical testing, material analysis, or destructive physical analysis per AS6171 test methods.',
    },
    {
      question: 'How do I verify a supplier is an authorized distributor?',
      answer:
        'Check the OCM website for authorized distributor lists. Contact the OCM directly to confirm authorization status. Request authorization letters or certificates from the distributor. Be aware that counterfeit authorization documents exist.',
    },
    {
      question: 'Who is responsible for the cost of counterfeit parts?',
      answer:
        'The contractor is responsible for costs of counterfeit or suspect counterfeit parts, including rework and replacement—unless the counterfeit part was provided by the government as Government Furnished Property (GFP).',
    },
    {
      question: 'What should I do if I discover a counterfeit part after delivery to the government?',
      answer:
        'Immediately notify the contracting officer. Report to GIDEP. Assess impact to fielded systems. Develop corrective action plan including replacement or retrofit. Document lessons learned and update your counterfeit prevention procedures.',
    },
  ],
  cta: {
    heading: 'Need Help with Counterfeit Prevention?',
    description:
      'Counterfeit parts pose serious risks to defense programs. Our team helps contractors implement DFARS-compliant detection and avoidance systems, qualify suppliers, and establish robust quality controls.',
    buttonText: 'Get Counterfeit Prevention Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'compliance-program',
    'quality-assurance',
    'subcontracting-plan',
    'far-overview',
    'government-contract-law',
  ],
  publishedDate: '2026-04-07',
};
