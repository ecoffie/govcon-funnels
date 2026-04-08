import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'conflict-minerals',
  title: 'Conflict Minerals Reporting for Government Contractors',
  metaTitle: 'Conflict Minerals Guide — Dodd-Frank 3TG Reporting & Due Diligence',
  metaDescription:
    'Complete guide to conflict minerals compliance for government contractors: Dodd-Frank Section 1502 requirements, 3TG minerals, due diligence, reporting, and supply chain management.',
  keywords: [
    'conflict minerals',
    'dodd-frank 1502',
    '3TG minerals',
    'conflict minerals reporting',
    'tin tantalum tungsten gold',
    'CMRT',
    'supply chain due diligence',
    'DRC conflict minerals',
    'SEC reporting',
    'responsible sourcing',
  ],
  heroSubtitle:
    'Conflict minerals regulations require certain government contractors to trace and report on tin, tantalum, tungsten, and gold in their supply chains. Learn the requirements, due diligence process, and reporting obligations.',
  sections: [
    {
      heading: 'Overview of Conflict Minerals Regulations',
      content: `
        <p>Conflict minerals rules aim to reduce funding for armed groups in the Democratic Republic of Congo (DRC) and adjoining countries by requiring supply chain transparency for certain minerals.</p>
        <p><strong>What are conflict minerals (3TG):</strong></p>
        <ul>
          <li><strong>Tin</strong> — Used in solder, coatings, plastics</li>
          <li><strong>Tantalum</strong> — Used in capacitors, superalloys</li>
          <li><strong>Tungsten</strong> — Used in cutting tools, electrodes, filaments</li>
          <li><strong>Gold</strong> — Used in electronics, connectors, bonding wire</li>
        </ul>
        <p><strong>Legislative basis:</strong></p>
        <p>Section 1502 of the Dodd-Frank Wall Street Reform and Consumer Protection Act (2010) requires publicly traded companies to:</p>
        <ul>
          <li>Determine if products contain conflict minerals</li>
          <li>Conduct reasonable country of origin inquiry (RCOI)</li>
          <li>Perform supply chain due diligence if minerals may originate from covered countries</li>
          <li>File annual Form SD with SEC</li>
          <li>Publish Conflict Minerals Report (CMR) if applicable</li>
        </ul>
        <p><strong>Covered countries:</strong></p>
        <ul>
          <li>Democratic Republic of Congo (DRC)</li>
          <li>Adjoining countries: Angola, Burundi, Central African Republic, Republic of Congo, Rwanda, South Sudan, Tanzania, Uganda, Zambia</li>
        </ul>
        <p><strong>How this affects government contractors:</strong></p>
        <ul>
          <li>Prime contractors (if publicly traded) must comply with SEC rules</li>
          <li>Subcontractors receive survey requests from primes</li>
          <li>Defense contractors face additional scrutiny</li>
          <li>Electronics, aerospace, and manufacturing sectors most affected</li>
          <li>Demonstrates corporate social responsibility</li>
        </ul>
      `,
    },
    {
      heading: 'Who Must Comply',
      content: `
        <p><strong>SEC filing requirement applies to:</strong></p>
        <ul>
          <li>Publicly traded companies (SEC registrants)</li>
          <li>Companies that manufacture or contract to manufacture products</li>
          <li>Products for which 3TG is necessary to functionality or production</li>
        </ul>
        <p><strong>"Necessary to functionality or production":</strong></p>
        <ul>
          <li><strong>Functionality:</strong> Mineral is contained in and necessary for product's purpose</li>
          <li><strong>Production:</strong> Mineral is intentionally added during manufacturing, even if not in final product</li>
          <li><strong>Examples:</strong> Tin in solder, tantalum in capacitors, gold in connectors, tungsten in tooling</li>
        </ul>
        <p><strong>Exemptions:</strong></p>
        <ul>
          <li>Products manufactured before January 31, 2013</li>
          <li>Products containing conflict minerals from recycled or scrap sources only</li>
          <li>Products outside the manufacture date range if de minimis</li>
        </ul>
        <p><strong>Private companies and contractors:</strong></p>
        <p>While not required to file with SEC, private companies may face:</p>
        <ul>
          <li>Survey requests from publicly traded customers</li>
          <li>Contractual requirements to provide conflict minerals information</li>
          <li>Competitive pressure to demonstrate responsible sourcing</li>
          <li>Industry-specific requirements (e.g., RBA/EICC)</li>
        </ul>
        <p><strong>Government contractor considerations:</strong></p>
        <ul>
          <li>Large defense primes are publicly traded → Must comply</li>
          <li>Subcontractors receive Conflict Minerals Reporting Template (CMRT) requests</li>
          <li>May be included in contractor responsibility evaluations</li>
          <li>Align with Federal Acquisition Regulation (FAR) sustainability goals</li>
        </ul>
      `,
    },
    {
      heading: 'The Due Diligence Process',
      content: `
        <p><strong>Step 1: Reasonable Country of Origin Inquiry (RCOI)</strong></p>
        <p>Determine if conflict minerals in your products may have originated from covered countries:</p>
        <ul>
          <li>Survey direct suppliers using CMRT</li>
          <li>Review supplier contracts and specifications</li>
          <li>Examine product designs and BOMs</li>
          <li>Assess whether minerals are necessary to functionality or production</li>
        </ul>
        <p><strong>Step 2: Due diligence on source and chain of custody</strong></p>
        <p>If RCOI indicates minerals may be from covered countries, conduct supply chain due diligence:</p>
        <ul>
          <li>Identify smelters and refiners in supply chain</li>
          <li>Verify smelter/refiner participation in conflict-free programs</li>
          <li>Request declarations and supporting documentation</li>
          <li>Assess risk of contributing to conflict</li>
        </ul>
        <p><strong>Due diligence framework — OECD Guidance:</strong></p>
        <p>SEC rules reference the OECD Due Diligence Guidance for Responsible Supply Chains:</p>
        <ol>
          <li><strong>Establish management systems</strong> — Policies, communication, controls</li>
          <li><strong>Identify and assess risks</strong> — Map supply chain, evaluate risks</li>
          <li><strong>Design and implement risk mitigation</strong> — Engage suppliers, monitor, report</li>
          <li><strong>Conduct independent audit</strong> — Third-party verification of smelters/refiners</li>
          <li><strong>Report annually</strong> — Disclose findings and efforts</li>
        </ol>
        <p><strong>Tools and resources:</strong></p>
        <ul>
          <li><strong>CMRT (Conflict Minerals Reporting Template)</strong> — Standardized supplier survey form</li>
          <li><strong>RMI (Responsible Minerals Initiative)</strong> — Industry program for smelter audits</li>
          <li><strong>Conformant Smelter Lists</strong> — RMI-audited conflict-free smelters</li>
          <li><strong>RBA (Responsible Business Alliance)</strong> — Industry coalition for responsible sourcing</li>
        </ul>
        <p><strong>Conflict Minerals Reporting Template (CMRT):</strong></p>
        <p>The CMRT is the industry-standard Excel template used to collect conflict minerals data:</p>
        <ul>
          <li><strong>Company information:</strong> Your company details, contact, reporting period</li>
          <li><strong>Product information:</strong> Product descriptions, 3TG presence</li>
          <li><strong>Smelter information:</strong> Identified smelters and refiners, conflict-free status</li>
          <li><strong>Declaration:</strong> DRC conflict-free, conflict undeterminable, not DRC conflict-free</li>
        </ul>
        <p><strong>Smelter/refiner identification:</strong></p>
        <ul>
          <li>Smelters and refiners are chokepoints where ore is processed</li>
          <li>Identifying them allows verification of responsible sourcing</li>
          <li>Request CMRT completion by direct suppliers</li>
          <li>Consolidate supplier responses to identify smelters in your supply chain</li>
          <li>Cross-reference with RMI Conformant Smelter List</li>
        </ul>
      `,
    },
    {
      heading: 'SEC Reporting Requirements',
      content: `
        <p><strong>Form SD filing (Specialized Disclosure Report):</strong></p>
        <p>SEC registrants must file Form SD by May 31 each year covering the prior calendar year:</p>
        <ul>
          <li>Filed via EDGAR system</li>
          <li>Publicly available disclosure</li>
          <li>Due 150 days after fiscal year end (May 31 for calendar year companies)</li>
        </ul>
        <p><strong>Form SD scenarios:</strong></p>
        <p><strong>Scenario 1: No 3TG necessary to products</strong></p>
        <ul>
          <li>File brief Form SD stating conflict minerals not necessary</li>
          <li>No Conflict Minerals Report (CMR) required</li>
        </ul>
        <p><strong>Scenario 2: 3TG from recycled/scrap sources only</strong></p>
        <ul>
          <li>File Form SD describing determination process</li>
          <li>No CMR required if solely from recycled/scrap</li>
        </ul>
        <p><strong>Scenario 3: 3TG necessary, from covered countries or origin unknown</strong></p>
        <ul>
          <li>File Form SD with attached Conflict Minerals Report (CMR)</li>
          <li>CMR describes due diligence, supply chain, smelters, product determinations</li>
          <li>Independent Private Sector Audit (IPSA) of CMR required (with exceptions)</li>
        </ul>
        <p><strong>Conflict Minerals Report (CMR) contents:</strong></p>
        <ul>
          <li>Description of products containing conflict minerals</li>
          <li>Description of due diligence measures</li>
          <li>Country of origin determinations</li>
          <li>List of processing facilities (smelters/refiners)</li>
          <li>Product-level conflict-free determinations</li>
          <li>Independent audit report (if required)</li>
        </ul>
        <p><strong>Product-level determinations:</strong></p>
        <ul>
          <li><strong>"DRC conflict-free"</strong> — Minerals did not benefit armed groups</li>
          <li><strong>"DRC conflict undeterminable"</strong> — Unable to determine origin or conflict-free status</li>
          <li><strong>"Not found to be DRC conflict-free"</strong> — Minerals may have benefited armed groups</li>
        </ul>
        <p><strong>Independent Private Sector Audit (IPSA):</strong></p>
        <ul>
          <li>Required if products are "DRC conflict undeterminable" or "not DRC conflict-free"</li>
          <li>Auditor assesses CMR design and due diligence procedures</li>
          <li>Not an assurance-level audit, but meets AICPA standards</li>
          <li>Audit report included with CMR</li>
        </ul>
        <p><strong>Disclosure on company website:</strong></p>
        <ul>
          <li>Post CMR on publicly accessible website</li>
          <li>Include URL in Form SD</li>
          <li>Maintain for at least one year</li>
        </ul>
      `,
    },
    {
      heading: 'Supply Chain Management and Engagement',
      content: `
        <p><strong>Engaging suppliers:</strong></p>
        <ol>
          <li><strong>Identify in-scope suppliers</strong> — Those providing components with potential 3TG content</li>
          <li><strong>Send CMRT requests</strong> — Request completion of standardized template</li>
          <li><strong>Provide guidance</strong> — Educate suppliers on expectations and deadlines</li>
          <li><strong>Track responses</strong> — Monitor completion rates and follow up</li>
          <li><strong>Validate data</strong> — Review for completeness and reasonableness</li>
          <li><strong>Escalate non-responsive suppliers</strong> — Engage procurement, consider sourcing alternatives</li>
        </ol>
        <p><strong>Supplier contracts and terms:</strong></p>
        <ul>
          <li>Include conflict minerals representation in purchase agreements</li>
          <li>Require participation in annual surveys</li>
          <li>Flow down due diligence expectations</li>
          <li>Reserve right to audit or inspect</li>
          <li>Specify remedies for non-compliance</li>
        </ul>
        <p><strong>Improving response rates:</strong></p>
        <ul>
          <li>Communicate early and often (start in Q1 for May deadline)</li>
          <li>Provide training and support materials</li>
          <li>Use supplier portals for submission and tracking</li>
          <li>Recognize and reward responsive suppliers</li>
          <li>Tie compliance to supplier scorecards</li>
        </ul>
        <p><strong>Handling incomplete or inconsistent data:</strong></p>
        <ul>
          <li>Request clarification or resubmission</li>
          <li>Escalate to supplier management</li>
          <li>Conduct targeted outreach or interviews</li>
          <li>Document efforts in due diligence records</li>
          <li>Disclose data gaps and limitations in CMR</li>
        </ul>
        <p><strong>Multi-tier supply chain challenges:</strong></p>
        <ul>
          <li>Direct suppliers may not know smelter sources</li>
          <li>Survey must cascade through multiple tiers</li>
          <li>Collaboration with industry peers on smelter engagement</li>
          <li>Leverage RMI and other industry programs</li>
        </ul>
        <p><strong>Sourcing from conflict-free smelters:</strong></p>
        <ul>
          <li>Use RMI Conformant Smelter List</li>
          <li>Request suppliers source from audited smelters</li>
          <li>Engage in industry initiatives to expand conflict-free sourcing</li>
          <li>Consider supplier diversity and geographic risk</li>
        </ul>
      `,
    },
    {
      heading: 'Compliance Program Best Practices',
      content: `
        <p><strong>Governance and oversight:</strong></p>
        <ul>
          <li>Designate conflict minerals program owner (procurement, compliance, sustainability)</li>
          <li>Cross-functional team: procurement, legal, finance, engineering, quality</li>
          <li>Executive sponsorship and board reporting</li>
          <li>Integration with corporate social responsibility (CSR) programs</li>
        </ul>
        <p><strong>Policy and procedures:</strong></p>
        <ul>
          <li>Conflict minerals policy statement</li>
          <li>RCOI and due diligence procedures</li>
          <li>Supplier engagement and survey process</li>
          <li>Data management and validation</li>
          <li>Reporting and disclosure procedures</li>
        </ul>
        <p><strong>Systems and tools:</strong></p>
        <ul>
          <li>Supplier survey platform (dedicated or procurement system)</li>
          <li>Data aggregation and validation tools</li>
          <li>Smelter list management and cross-referencing</li>
          <li>Document management and record retention</li>
          <li>Reporting dashboards and analytics</li>
        </ul>
        <p><strong>Training and communication:</strong></p>
        <ul>
          <li>Train procurement and engineering on 3TG identification</li>
          <li>Educate suppliers on requirements and expectations</li>
          <li>Communicate program updates and deadlines</li>
          <li>Share best practices and lessons learned</li>
        </ul>
        <p><strong>Documentation and records:</strong></p>
        <ul>
          <li>Maintain RCOI analysis and conclusions</li>
          <li>Retain supplier surveys and responses</li>
          <li>Document smelter identification and verification</li>
          <li>Preserve audit trails of due diligence efforts</li>
          <li>Keep copies of Form SD and CMR filings</li>
          <li>Retention: at least 5 years recommended</li>
        </ul>
        <p><strong>Continuous improvement:</strong></p>
        <ul>
          <li>Analyze data quality and completeness trends</li>
          <li>Benchmark against industry peers</li>
          <li>Refine processes based on lessons learned</li>
          <li>Monitor regulatory and industry developments</li>
          <li>Engage in RMI and other collaborative initiatives</li>
        </ul>
        <p><strong>Metrics and KPIs:</strong></p>
        <ul>
          <li>Supplier response rate and timeliness</li>
          <li>CMRT completeness and data quality scores</li>
          <li>Percentage of smelters on conformant lists</li>
          <li>Product-level conflict-free determination rates</li>
          <li>Supply chain coverage (tiers reached)</li>
        </ul>
      `,
    },
    {
      heading: 'Enforcement and Penalties',
      content: `
        <p><strong>SEC enforcement:</strong></p>
        <ul>
          <li>SEC reviews Form SD filings for compliance</li>
          <li>Comment letters requesting clarification or correction</li>
          <li>Investigation of materially false or misleading disclosures</li>
          <li>Enforcement actions for violations</li>
        </ul>
        <p><strong>Potential violations:</strong></p>
        <ul>
          <li>Failure to file Form SD by deadline</li>
          <li>Inadequate RCOI or due diligence</li>
          <li>Inaccurate or incomplete CMR</li>
          <li>Missing or inadequate IPSA</li>
          <li>False or misleading statements</li>
        </ul>
        <p><strong>Penalties:</strong></p>
        <ul>
          <li>Civil penalties for securities law violations</li>
          <li>Officer and director liability</li>
          <li>Reputation damage and stakeholder scrutiny</li>
          <li>Potential civil litigation or shareholder suits</li>
        </ul>
        <p><strong>Liability protection:</strong></p>
        <p>Safe harbor from liability if:</p>
        <ul>
          <li>Conflict minerals report describes due diligence exercised</li>
          <li>Independent audit conducted (if required)</li>
          <li>Statements made in good faith</li>
          <li>Protects against private rights of action</li>
        </ul>
        <p><strong>Recent developments:</strong></p>
        <ul>
          <li>2017: D.C. Circuit Court ruled certain disclosure requirements violate First Amendment</li>
          <li>SEC suspended "conflict-free" determination requirement for Form SD</li>
          <li>Companies must still conduct due diligence and file CMR if applicable</li>
          <li>Monitor SEC guidance and court rulings for changes</li>
        </ul>
        <p><strong>Beyond compliance — reputational benefits:</strong></p>
        <ul>
          <li>Demonstrates corporate responsibility</li>
          <li>Meets investor and customer expectations</li>
          <li>Differentiates in competitive procurements</li>
          <li>Aligns with sustainability and ESG goals</li>
          <li>Reduces supply chain risk</li>
        </ul>
        <p><strong>Industry initiatives:</strong></p>
        <ul>
          <li><strong>RMI (Responsible Minerals Initiative):</strong> Smelter audits, training, tools</li>
          <li><strong>RBA (Responsible Business Alliance):</strong> Conflict minerals program, CMRT</li>
          <li><strong>OECD Guidance:</strong> Due diligence framework</li>
          <li><strong>ITRI Tin Supply Chain Initiative (iTSCi):</strong> Traceability in Central Africa</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Do conflict minerals rules apply to private government contractors?',
      answer:
        'SEC filing requirements apply only to publicly traded companies. However, private contractors may receive survey requests from publicly traded customers (prime contractors) and may have contractual obligations to provide conflict minerals information.',
    },
    {
      question: 'What is the CMRT and how do I use it?',
      answer:
        'The Conflict Minerals Reporting Template (CMRT) is an industry-standard Excel form used to collect conflict minerals data from suppliers. You request suppliers to complete it, consolidate responses to identify smelters, and use the data for your due diligence and SEC reporting if applicable.',
    },
    {
      question: 'How do I know if my products contain conflict minerals?',
      answer:
        'Review your bill of materials (BOM) for components containing tin, tantalum, tungsten, or gold. Common sources: solder (tin), capacitors (tantalum), electronics connectors (gold), tooling (tungsten). Survey suppliers using CMRT to confirm 3TG presence.',
    },
    {
      question: 'What does "necessary to functionality or production" mean?',
      answer:
        'Necessary to functionality means the mineral is contained in the product and necessary for its purpose. Necessary to production means the mineral is intentionally added during manufacturing, even if not in the final product (e.g., tungsten tooling used in machining).',
    },
    {
      question: 'What if my supplier does not respond to the CMRT survey?',
      answer:
        'Follow up multiple times with reminders and escalations. Engage procurement to apply pressure. Document efforts in your due diligence records. If still non-responsive, consider alternative sourcing or disclose the data gap and limitation in your CMR.',
    },
    {
      question: 'How do I identify smelters in my supply chain?',
      answer:
        'Survey your direct suppliers using CMRT, which requests smelter information. Suppliers should cascade the survey to their suppliers (multi-tier). Consolidate responses to create a list of smelters. Cross-reference with RMI Conformant Smelter List to verify conflict-free status.',
    },
    {
      question: 'What is the deadline for Form SD filing?',
      answer:
        'Form SD is due 150 days after fiscal year end. For calendar year companies, the deadline is May 31. The report covers the prior calendar year (e.g., Form SD filed May 31, 2026 covers 2025).',
    },
    {
      question: 'Can I claim my products are conflict-free without knowing all smelters?',
      answer:
        'No. To claim "DRC conflict-free" status, you must have sufficient information to determine that conflict minerals did not benefit armed groups. If you cannot identify smelters or determine origin, the appropriate declaration is "DRC conflict undeterminable."',
    },
  ],
  cta: {
    heading: 'Need Help with Conflict Minerals Compliance?',
    description:
      'Conflict minerals reporting and supply chain due diligence can be complex. Our team helps contractors conduct RCOI, engage suppliers, identify smelters, and prepare SEC filings.',
    buttonText: 'Get Compliance Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'compliance-program',
    'far-overview',
    'subcontracting-plan',
    'quality-assurance',
    'government-contract-law',
  ],
  publishedDate: '2026-04-07',
};
