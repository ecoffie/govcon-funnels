import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'cybersecurity-requirements',
  title: 'Federal Cybersecurity Requirements for Government Contractors',
  metaTitle: 'Cybersecurity Requirements Guide — NIST 800-171, DFARS, FedRAMP Compliance',
  metaDescription:
    'Complete guide to federal cybersecurity requirements for contractors: NIST 800-171, FedRAMP, DFARS 252.204-7012, CMMC, assessment requirements, and compliance strategies.',
  keywords: [
    'cybersecurity requirements',
    'NIST 800-171',
    'FedRAMP compliance',
    'DFARS 7012',
    'CMMC',
    'CUI protection',
    'contractor cybersecurity',
    'federal security requirements',
    'cyber assessment',
    'defense contractor security',
  ],
  heroSubtitle:
    'Government contractors must meet strict cybersecurity requirements to protect federal data. Learn the key requirements, assessment processes, and how to achieve compliance.',
  sections: [
    {
      heading: 'Overview of Federal Cybersecurity Requirements',
      content: `
        <p>Federal agencies require contractors to protect sensitive government information through robust cybersecurity measures. These requirements vary based on the type of data you handle.</p>
        <p><strong>Why cybersecurity compliance matters:</strong></p>
        <ul>
          <li>Required for contracts involving federal data</li>
          <li>Protection of Controlled Unclassified Information (CUI)</li>
          <li>Mandatory for defense contracts (CMMC)</li>
          <li>Avoids breach liability and contract loss</li>
          <li>Demonstrates trustworthiness to agencies</li>
        </ul>
        <p><strong>Primary frameworks:</strong></p>
        <ul>
          <li><strong>NIST 800-171</strong> — Controls for protecting CUI in non-federal systems</li>
          <li><strong>FedRAMP</strong> — Cloud service provider authorization program</li>
          <li><strong>CMMC</strong> — Defense Industrial Base cybersecurity certification</li>
          <li><strong>FISMA</strong> — Information security for federal systems</li>
          <li><strong>DFARS 252.204-7012</strong> — DoD safeguarding requirements</li>
        </ul>
        <p><strong>Who must comply:</strong></p>
        <ul>
          <li>Contractors processing, storing, or transmitting CUI</li>
          <li>Defense contractors (CMMC required by 2026)</li>
          <li>Cloud service providers serving federal agencies</li>
          <li>Subcontractors handling federal data</li>
        </ul>
      `,
    },
    {
      heading: 'NIST 800-171: Protecting CUI',
      content: `
        <p><strong>What is NIST 800-171:</strong></p>
        <p>NIST Special Publication 800-171 provides security requirements for protecting Controlled Unclassified Information (CUI) in non-federal systems. It applies to contractors across all federal agencies.</p>
        <p><strong>The 14 control families (110 total controls):</strong></p>
        <ul>
          <li><strong>Access Control</strong> — Limit system access to authorized users</li>
          <li><strong>Awareness and Training</strong> — Ensure users understand security responsibilities</li>
          <li><strong>Audit and Accountability</strong> — Track and log system activity</li>
          <li><strong>Configuration Management</strong> — Establish and maintain baseline configurations</li>
          <li><strong>Identification and Authentication</strong> — Verify user identities</li>
          <li><strong>Incident Response</strong> — Detect, report, and respond to incidents</li>
          <li><strong>Maintenance</strong> — Perform periodic and timely system maintenance</li>
          <li><strong>Media Protection</strong> — Protect CUI on system media</li>
          <li><strong>Personnel Security</strong> — Screen individuals prior to access</li>
          <li><strong>Physical Protection</strong> — Limit physical access to systems</li>
          <li><strong>Risk Assessment</strong> — Assess security risks periodically</li>
          <li><strong>Security Assessment</strong> — Monitor and assess security controls</li>
          <li><strong>System and Communications Protection</strong> — Monitor and control communications</li>
          <li><strong>System and Information Integrity</strong> — Identify and address system flaws</li>
        </ul>
        <p><strong>Key implementation requirements:</strong></p>
        <ul>
          <li>Multi-factor authentication (MFA) for all users</li>
          <li>Encryption of CUI at rest and in transit</li>
          <li>Network segmentation to isolate CUI systems</li>
          <li>Security event logging and monitoring</li>
          <li>Incident response plan and procedures</li>
        </ul>
        <p><strong>Self-assessment requirement:</strong></p>
        <p>Contractors must complete a self-assessment and upload their score to the Supplier Performance Risk System (SPRS) in SAM.gov. Scores range from -203 to 110 based on control implementation.</p>
      `,
    },
    {
      heading: 'DFARS 252.204-7012: DoD Safeguarding Requirements',
      content: `
        <p><strong>What is DFARS 7012:</strong></p>
        <p>Defense Federal Acquisition Regulation Supplement (DFARS) clause 252.204-7012 requires DoD contractors to safeguard Covered Defense Information (CDI) and report cyber incidents.</p>
        <p><strong>Key requirements:</strong></p>
        <ul>
          <li>Implement NIST 800-171 security controls</li>
          <li>Report cyber incidents within 72 hours</li>
          <li>Conduct damage assessment after incidents</li>
          <li>Provide media with CDI to DoD for review</li>
          <li>Flow down requirements to subcontractors</li>
        </ul>
        <p><strong>Cyber incident reporting:</strong></p>
        <p>Contractors must report to DoD within 72 hours when:</p>
        <ul>
          <li>Successful penetration of contractor network</li>
          <li>Suspected or confirmed loss of CDI</li>
          <li>Denial of service affecting DoD operations</li>
          <li>Malicious software installation on contractor systems</li>
        </ul>
        <p><strong>Reporting process:</strong></p>
        <ol>
          <li>Report to DoD CIO via <a href="https://dibnet.dod.mil" target="_blank" rel="noopener">DIBNet portal</a> within 72 hours</li>
          <li>Provide initial incident description</li>
          <li>Conduct internal investigation and damage assessment</li>
          <li>Submit follow-up reports with findings</li>
          <li>Preserve affected systems for DoD analysis</li>
        </ol>
        <p><strong>Contractor obligations:</strong></p>
        <ul>
          <li>Isolate affected systems immediately</li>
          <li>Do not destroy evidence</li>
          <li>Cooperate with DoD investigators</li>
          <li>Implement corrective measures</li>
          <li>Document lessons learned</li>
        </ul>
      `,
    },
    {
      heading: 'CMMC: Cybersecurity Maturity Model Certification',
      content: `
        <p><strong>CMMC overview:</strong></p>
        <p>The Cybersecurity Maturity Model Certification (CMMC) program requires third-party assessment and certification of defense contractors' cybersecurity practices. CMMC 2.0 streamlines requirements into three levels.</p>
        <p><strong>CMMC 2.0 levels:</strong></p>
        <p><strong>Level 1 — Foundational</strong></p>
        <ul>
          <li>17 basic cybersecurity practices from FAR 52.204-21</li>
          <li>Annual self-assessment</li>
          <li>Required for contracts with Federal Contract Information (FCI)</li>
        </ul>
        <p><strong>Level 2 — Advanced</strong></p>
        <ul>
          <li>All 110 NIST 800-171 controls</li>
          <li>Self-assessment for most contractors</li>
          <li>Third-party assessment for critical programs</li>
          <li>Required for contracts with CUI</li>
        </ul>
        <p><strong>Level 3 — Expert</strong></p>
        <ul>
          <li>Enhanced controls beyond NIST 800-171</li>
          <li>Government-led assessment required</li>
          <li>Required for highest-priority programs</li>
          <li>Very limited applicability</li>
        </ul>
        <p><strong>CMMC timeline and implementation:</strong></p>
        <ul>
          <li>Phased implementation through 2026-2027</li>
          <li>New contracts will require CMMC certification</li>
          <li>Certification valid for 3 years (Level 2 and 3)</li>
          <li>Must maintain compliance between assessments</li>
        </ul>
        <p><strong>Preparing for CMMC:</strong></p>
        <ol>
          <li>Determine required CMMC level for your contracts</li>
          <li>Conduct gap assessment against requirements</li>
          <li>Develop System Security Plan (SSP)</li>
          <li>Implement missing controls</li>
          <li>Engage C3PAO (certified assessor) for Level 2/3</li>
          <li>Complete assessment and remediate findings</li>
          <li>Receive certification</li>
        </ol>
        <p><strong>See:</strong> <a href="/guides/cmmc-certification">CMMC Certification Guide</a></p>
      `,
    },
    {
      heading: 'FedRAMP: Cloud Service Provider Authorization',
      content: `
        <p><strong>What is FedRAMP:</strong></p>
        <p>The Federal Risk and Authorization Management Program (FedRAMP) is a government-wide program providing standardized security assessment, authorization, and continuous monitoring for cloud products and services.</p>
        <p><strong>Who needs FedRAMP:</strong></p>
        <ul>
          <li>Cloud Service Providers (CSPs) selling to federal agencies</li>
          <li>SaaS, PaaS, and IaaS offerings used by government</li>
          <li>Commercial cloud products processing federal data</li>
        </ul>
        <p><strong>FedRAMP authorization levels:</strong></p>
        <p><strong>Low Impact (LI-SaaS):</strong></p>
        <ul>
          <li>125 baseline controls</li>
          <li>Streamlined authorization process</li>
          <li>For low-impact cloud services</li>
        </ul>
        <p><strong>Moderate Impact:</strong></p>
        <ul>
          <li>325 baseline controls from NIST 800-53</li>
          <li>Most common authorization level</li>
          <li>Required for CUI and moderate-impact data</li>
        </ul>
        <p><strong>High Impact:</strong></p>
        <ul>
          <li>421 baseline controls</li>
          <li>Most rigorous requirements</li>
          <li>For law enforcement, emergency services, financial systems</li>
        </ul>
        <p><strong>FedRAMP authorization paths:</strong></p>
        <ol>
          <li><strong>Agency Authorization</strong> — Sponsoring agency conducts assessment</li>
          <li><strong>JAB Provisional Authorization</strong> — Joint Authorization Board (DoD, DHS, GSA) grants authorization</li>
          <li><strong>CSP Supplied Package</strong> — CSP completes package for agency review</li>
        </ol>
        <p><strong>FedRAMP process timeline:</strong></p>
        <ul>
          <li>Readiness Assessment: 2-4 weeks</li>
          <li>Security package development: 3-6 months</li>
          <li>Third-party assessment: 2-3 months</li>
          <li>Agency authorization: 1-3 months</li>
          <li><strong>Total:</strong> 12-18 months on average</li>
        </ul>
        <p><strong>Ongoing requirements:</strong></p>
        <ul>
          <li>Continuous monitoring and reporting</li>
          <li>Monthly vulnerability scanning</li>
          <li>Annual assessment</li>
          <li>Incident reporting within timeframes</li>
        </ul>
      `,
    },
    {
      heading: 'Cybersecurity Assessment and Compliance',
      content: `
        <p><strong>Conducting a gap assessment:</strong></p>
        <ol>
          <li><strong>Identify applicable requirements</strong> — Determine which frameworks apply to your contracts</li>
          <li><strong>Document current state</strong> — Inventory systems, data flows, existing controls</li>
          <li><strong>Compare to requirements</strong> — Map controls to framework requirements</li>
          <li><strong>Identify gaps</strong> — Document missing or partially implemented controls</li>
          <li><strong>Prioritize remediation</strong> — Focus on high-risk gaps first</li>
          <li><strong>Develop implementation plan</strong> — Timeline, resources, responsibilities</li>
        </ol>
        <p><strong>System Security Plan (SSP):</strong></p>
        <p>The SSP documents how your organization meets cybersecurity requirements:</p>
        <ul>
          <li>System description and boundaries</li>
          <li>Security controls implementation</li>
          <li>Roles and responsibilities</li>
          <li>Policies and procedures</li>
          <li>Network diagrams and data flows</li>
        </ul>
        <p><strong>Key implementation areas:</strong></p>
        <p><strong>Technical controls:</strong></p>
        <ul>
          <li>Multi-factor authentication (MFA)</li>
          <li>Encryption (AES-256 for data at rest, TLS 1.2+ for transit)</li>
          <li>Network segmentation and firewalls</li>
          <li>Intrusion detection/prevention systems</li>
          <li>Vulnerability scanning and patch management</li>
        </ul>
        <p><strong>Administrative controls:</strong></p>
        <ul>
          <li>Security policies and procedures</li>
          <li>Security awareness training</li>
          <li>Incident response plan</li>
          <li>Risk assessment process</li>
          <li>System security plan</li>
        </ul>
        <p><strong>Physical controls:</strong></p>
        <ul>
          <li>Facility access controls</li>
          <li>Visitor logs and escort procedures</li>
          <li>Surveillance systems</li>
          <li>Media destruction procedures</li>
        </ul>
        <p><strong>Assessment preparation:</strong></p>
        <ul>
          <li>Complete System Security Plan</li>
          <li>Gather evidence of control implementation</li>
          <li>Conduct internal testing</li>
          <li>Remediate known issues</li>
          <li>Train staff on assessment procedures</li>
        </ul>
      `,
    },
    {
      heading: 'Common Cybersecurity Compliance Challenges',
      content: `
        <p><strong>Technical challenges:</strong></p>
        <ul>
          <li><strong>Legacy systems</strong> — Older systems may not support modern security controls</li>
          <li><strong>Cloud environments</strong> — Shared responsibility model requires clear delineation</li>
          <li><strong>Network segmentation</strong> — Isolating CUI systems from corporate networks</li>
          <li><strong>Mobile devices</strong> — BYOD policies conflict with security requirements</li>
          <li><strong>Encryption implementation</strong> — Performance impacts and key management</li>
        </ul>
        <p><strong>Organizational challenges:</strong></p>
        <ul>
          <li><strong>Cost and resources</strong> — Compliance investments can be significant</li>
          <li><strong>Expertise gap</strong> — Cybersecurity talent is expensive and scarce</li>
          <li><strong>User resistance</strong> — Security controls may impact usability</li>
          <li><strong>Documentation burden</strong> — Plans, procedures, evidence collection</li>
          <li><strong>Continuous monitoring</strong> — Ongoing effort beyond initial compliance</li>
        </ul>
        <p><strong>Subcontractor flow-down:</strong></p>
        <ul>
          <li>Prime contractors must flow down cybersecurity requirements</li>
          <li>Verify subcontractor compliance before contract award</li>
          <li>Monitor subcontractor cybersecurity posture</li>
          <li>Include in subcontract agreements</li>
        </ul>
        <p><strong>Practical solutions:</strong></p>
        <ul>
          <li><strong>Scope reduction</strong> — Minimize systems processing CUI</li>
          <li><strong>Cloud solutions</strong> — Use FedRAMP-authorized cloud providers</li>
          <li><strong>Managed services</strong> — Outsource security operations to experts</li>
          <li><strong>Phased implementation</strong> — Prioritize high-risk controls first</li>
          <li><strong>Expert consultants</strong> — Engage specialists for gap assessment and remediation</li>
        </ul>
        <p><strong>Cost considerations:</strong></p>
        <ul>
          <li>Initial implementation: $50K-$500K+ depending on scope</li>
          <li>CMMC assessment fees: $15K-$150K depending on level and scope</li>
          <li>Ongoing monitoring and maintenance: 15-25% of initial costs annually</li>
          <li>Factor into pricing and contract negotiations</li>
        </ul>
      `,
    },
    {
      heading: 'Maintaining Compliance and Continuous Monitoring',
      content: `
        <p><strong>Continuous monitoring requirements:</strong></p>
        <ul>
          <li>Security event logging and review</li>
          <li>Vulnerability scanning (monthly minimum)</li>
          <li>Patch management within timeframes</li>
          <li>Access reviews (quarterly recommended)</li>
          <li>Security control testing (annual minimum)</li>
        </ul>
        <p><strong>Incident response:</strong></p>
        <ol>
          <li><strong>Detection</strong> — Identify potential security incident</li>
          <li><strong>Containment</strong> — Isolate affected systems</li>
          <li><strong>Notification</strong> — Report to DoD within 72 hours if CDI affected</li>
          <li><strong>Investigation</strong> — Determine scope and impact</li>
          <li><strong>Remediation</strong> — Remove threat and restore services</li>
          <li><strong>Lessons learned</strong> — Document and improve processes</li>
        </ol>
        <p><strong>Record keeping:</strong></p>
        <ul>
          <li>System Security Plan and updates</li>
          <li>Assessment reports and POA&Ms</li>
          <li>Security event logs (1 year minimum)</li>
          <li>Incident reports and responses</li>
          <li>Training completion records</li>
          <li>Vulnerability scan results</li>
        </ul>
        <p><strong>Annual reassessment:</strong></p>
        <ul>
          <li>Review and update System Security Plan</li>
          <li>Test security controls</li>
          <li>Conduct vulnerability assessment</li>
          <li>Update SPRS score if changed</li>
          <li>Document findings and improvements</li>
        </ul>
        <p><strong>Staying current:</strong></p>
        <ul>
          <li>Monitor NIST and DoD guidance updates</li>
          <li>Track CMMC program developments</li>
          <li>Join industry working groups (e.g., NDIA)</li>
          <li>Attend cybersecurity conferences</li>
          <li>Engage with peers and consultants</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is the difference between NIST 800-171 and CMMC?',
      answer:
        'NIST 800-171 is the underlying cybersecurity standard defining 110 controls for protecting CUI. CMMC is a certification program that requires third-party assessment of compliance with NIST 800-171 (Level 2) or other standards. CMMC verifies you actually implement the controls.',
    },
    {
      question: 'Do I need CMMC if I only work with civilian agencies?',
      answer:
        'No. CMMC is specific to DoD contracts. Civilian agencies typically require NIST 800-171 compliance but do not require third-party CMMC certification. However, you may need to self-attest or provide evidence of compliance.',
    },
    {
      question: 'How much does it cost to become NIST 800-171 compliant?',
      answer:
        'Costs vary widely based on current security posture, number of systems, and scope. Small companies may spend $50K-$150K. Medium companies often spend $200K-$500K. Large enterprises can exceed $1M for initial implementation. Ongoing costs run 15-25% annually.',
    },
    {
      question: 'What is a SPRS score and where do I submit it?',
      answer:
        'The Supplier Performance Risk System (SPRS) score reflects your NIST 800-171 compliance level, ranging from -203 to 110. You must complete a self-assessment and submit your score in SAM.gov under "Reps and Certs." Contracting officers review this score.',
    },
    {
      question: 'Can I use commercial cloud providers like AWS or Azure for CUI?',
      answer:
        'Yes, but you must use FedRAMP-authorized cloud services at the appropriate impact level. AWS GovCloud and Azure Government offer FedRAMP Moderate and High authorized services. Regular commercial cloud services are not sufficient for CUI.',
    },
    {
      question: 'What happens if I have a cybersecurity incident?',
      answer:
        'You must report to DoD within 72 hours if CDI/CUI is affected. Isolate systems immediately, preserve evidence, cooperate with government investigators, and conduct damage assessment. Failure to report can result in contract termination or debarment.',
    },
    {
      question: 'How long does CMMC certification take?',
      answer:
        'Preparation time varies (6-18 months for most). The actual C3PAO assessment takes 1-3 weeks depending on scope. Budget 12-24 months total from starting gap remediation to receiving certification, especially for first-time applicants.',
    },
    {
      question: 'Are subcontractors required to comply with the same cybersecurity requirements?',
      answer:
        'Yes. Prime contractors must flow down DFARS cybersecurity clauses to subcontractors who will handle CUI/CDI. Subcontractors must implement NIST 800-171, report incidents, and eventually obtain CMMC certification for DoD work.',
    },
  ],
  cta: {
    heading: 'Need Help with Cybersecurity Compliance?',
    description:
      'Federal cybersecurity requirements are complex and constantly evolving. Our team helps contractors assess gaps, implement controls, and prepare for CMMC certification.',
    buttonText: 'Get Compliance Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'cmmc-certification',
    'compliance-program',
    'far-overview',
    'contract-data-rights',
    'it-contracting',
  ],
  publishedDate: '2026-04-07',
};
