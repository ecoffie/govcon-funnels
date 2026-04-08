import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'cmmc-certification',
  title: 'CMMC Certification: The Complete Guide for Small Contractors',
  metaTitle: 'CMMC Certification [2026 Deadline] — Costs, Levels & Requirements',
  metaDescription:
    'CMMC 2.0 for small contractors: 3 levels explained, costs ($34K-$112K), 6-12 month timeline. Prepare now before the 2026 DoD deadline.',
  keywords: [
    'cmmc certification',
    'cmmc 2.0',
    'cmmc requirements',
    'cmmc level 2',
    'cmmc for small business',
    'cmmc compliance',
    'cmmc certification cost',
    'cmmc timeline',
    'cybersecurity maturity model certification',
    'dod cybersecurity requirements',
  ],
  heroSubtitle:
    'Starting November 2026, most defense contractors must be CMMC certified to win DoD contracts. Here is everything small businesses need to know to prepare — before it is too late.',
  sections: [
    {
      heading: 'What Is CMMC Certification?',
      content: `
        <p>The <strong>Cybersecurity Maturity Model Certification (CMMC)</strong> is the Department of Defense's framework for ensuring contractors protect sensitive government information. If you want to work on DoD contracts, you will need to meet CMMC requirements.</p>
        <p>CMMC 2.0 streamlined the original five-level model into three levels:</p>
        <ul>
          <li><strong>Level 1 (Foundational):</strong> 17 basic cybersecurity practices for contractors handling Federal Contract Information (FCI). Annual self-assessment required.</li>
          <li><strong>Level 2 (Advanced):</strong> 110 practices aligned with NIST SP 800-171 for contractors handling Controlled Unclassified Information (CUI). Third-party assessment required for most contracts.</li>
          <li><strong>Level 3 (Expert):</strong> 110+ practices from NIST SP 800-172 for the most sensitive programs. Government-led assessment required.</li>
        </ul>
        <p>Most small business defense contractors will need <strong>Level 1 or Level 2</strong> certification. Level 3 is reserved for contractors on the most critical national security programs.</p>
        <p>The key difference from previous self-attestation requirements: CMMC requires <strong>verified compliance</strong> — either through self-assessment (Level 1 and some Level 2) or third-party certification (most Level 2 and all Level 3).</p>
      `,
    },
    {
      heading: 'CMMC Timeline: Key Dates for 2026 and Beyond',
      content: `
        <p>CMMC implementation follows a phased rollout:</p>
        <p><strong>Phase 1 (November 2025 - Present):</strong> Contracting officers began including CMMC self-assessment requirements in new solicitations. If you see a contract requiring CMMC, you need to be ready.</p>
        <p><strong>Phase 2 (November 2026):</strong> Third-party certification requirements become mandatory for applicable solicitations. This is when most Level 2 contractors will need C3PAO certification to compete.</p>
        <p><strong>Phase 3 (2027):</strong> Full compliance required for all new and existing contracts. No more grandfathering — every covered contractor must meet requirements.</p>
        <p><strong>What this means for your business:</strong></p>
        <ul>
          <li>If you only handle FCI (not CUI), you may qualify for Level 1 self-assessment</li>
          <li>If you handle CUI, start your Level 2 preparation now — the assessment pipeline is already backed up</li>
          <li>Many C3PAOs are booked through 2026, so waiting could mean missing contract opportunities</li>
        </ul>
        <p>The practical deadline is not 2027 — it is <strong>whenever a contract you want requires CMMC</strong>. And those solicitations are appearing now.</p>
      `,
    },
    {
      heading: 'Do You Need CMMC? Understanding FCI vs CUI',
      content: `
        <p>Your CMMC level depends on what type of information you handle:</p>
        <p><strong>Federal Contract Information (FCI)</strong> is information provided by or generated for the government under contract that is not intended for public release. Examples include:</p>
        <ul>
          <li>Contract deliverables and reports</li>
          <li>Project schedules and cost data</li>
          <li>Internal communications about contract work</li>
        </ul>
        <p>If you <strong>only</strong> handle FCI, you need <strong>Level 1</strong> — 17 practices with annual self-assessment.</p>
        <p><strong>Controlled Unclassified Information (CUI)</strong> is sensitive but unclassified information that requires safeguarding. Examples include:</p>
        <ul>
          <li>Technical drawings and specifications</li>
          <li>Export-controlled data (ITAR/EAR)</li>
          <li>Personally identifiable information (PII)</li>
          <li>Critical infrastructure information</li>
          <li>Law enforcement sensitive data</li>
        </ul>
        <p>If you handle CUI, you need <strong>Level 2</strong> — 110 practices with third-party assessment for most contracts.</p>
        <p><strong>How to determine your level:</strong></p>
        <ol>
          <li>Review your current and target contracts for CUI markings</li>
          <li>Check the contract's DD Form 254 (if applicable) for classification guidance</li>
          <li>Look for DFARS clause 252.204-7012 in solicitations — this indicates CUI handling</li>
          <li>When in doubt, assume Level 2 if you work on technical DoD programs</li>
        </ol>
      `,
    },
    {
      heading: 'CMMC Level 2 Requirements: The 110 Controls',
      content: `
        <p>Level 2 requires implementing 110 security practices across 14 control families from NIST SP 800-171. Here are the major areas:</p>
        <p><strong>Access Control (22 practices)</strong></p>
        <ul>
          <li>Limit system access to authorized users</li>
          <li>Control remote access and wireless access</li>
          <li>Implement least privilege principles</li>
        </ul>
        <p><strong>Identification and Authentication (11 practices)</strong></p>
        <ul>
          <li>Identify and authenticate users and devices</li>
          <li>Use multi-factor authentication (MFA)</li>
          <li>Manage and protect passwords</li>
        </ul>
        <p><strong>Configuration Management (9 practices)</strong></p>
        <ul>
          <li>Establish and maintain baseline configurations</li>
          <li>Track and control changes</li>
          <li>Restrict unauthorized software</li>
        </ul>
        <p><strong>Incident Response (3 practices)</strong></p>
        <ul>
          <li>Establish incident handling procedures</li>
          <li>Track and report incidents</li>
          <li>Test incident response capability</li>
        </ul>
        <p><strong>Other Control Families:</strong> Audit and Accountability, Awareness and Training, Media Protection, Personnel Security, Physical Protection, Risk Assessment, Security Assessment, System and Communications Protection, System and Information Integrity, Maintenance.</p>
        <p>The assessment covers <strong>320 objectives</strong> across these 110 practices. Each objective must be documented and demonstrated to your assessor.</p>
      `,
    },
    {
      heading: 'CMMC Certification Cost: What Small Businesses Should Budget',
      content: `
        <p>CMMC compliance costs vary significantly based on your current security posture and company size. Here is what to expect:</p>
        <p><strong>Level 1 Costs:</strong></p>
        <ul>
          <li>Implementation: $5,000 - $15,000 (if starting from scratch)</li>
          <li>Annual self-assessment: Internal time only</li>
          <li>Total first-year estimate: $5,000 - $20,000</li>
        </ul>
        <p><strong>Level 2 Costs:</strong></p>
        <ul>
          <li>Gap assessment and remediation: $15,000 - $50,000</li>
          <li>Technology upgrades (if needed): $10,000 - $40,000</li>
          <li>Documentation and policies: $5,000 - $15,000</li>
          <li>C3PAO assessment: $15,000 - $50,000</li>
          <li>Total first-year estimate: <strong>$34,000 - $112,000</strong></li>
        </ul>
        <p><strong>Ongoing Annual Costs:</strong></p>
        <ul>
          <li>Managed security services: $12,000 - $36,000/year</li>
          <li>Security tools and licenses: $5,000 - $15,000/year</li>
          <li>Triennial reassessment (Level 2): $15,000 - $50,000 every 3 years</li>
        </ul>
        <p><strong>Cost reduction strategies:</strong></p>
        <ul>
          <li>Use a CMMC-compliant cloud enclave (Microsoft GCC High, AWS GovCloud) to reduce infrastructure burden</li>
          <li>Limit CUI to specific systems rather than your entire network</li>
          <li>Leverage existing IT security investments (you may already meet some controls)</li>
          <li>Consider Managed Security Service Providers (MSSPs) specializing in CMMC</li>
        </ul>
      `,
    },
    {
      heading: 'The Assessment Process: Self-Assessment vs C3PAO',
      content: `
        <p><strong>Self-Assessment (Level 1 and some Level 2):</strong></p>
        <p>For Level 1 and select "non-prioritized" Level 2 contracts, you can perform your own assessment:</p>
        <ol>
          <li>Complete the self-assessment using the CMMC Assessment Guide</li>
          <li>Document your implementation of each practice</li>
          <li>Calculate your score (out of 110 for Level 2)</li>
          <li>Submit your score to the Supplier Performance Risk System (SPRS)</li>
          <li>Senior company official affirms accuracy annually</li>
        </ol>
        <p><strong>Third-Party Assessment (Most Level 2):</strong></p>
        <p>The default for Level 2 is certification by a CMMC Third-Party Assessment Organization (C3PAO):</p>
        <ol>
          <li><strong>Pre-assessment:</strong> Conduct readiness review (recommended)</li>
          <li><strong>Schedule assessment:</strong> Book with an authorized C3PAO (lead times are 3-6+ months)</li>
          <li><strong>Assessment:</strong> Assessors review documentation and interview personnel (typically 3-5 days on-site)</li>
          <li><strong>Report:</strong> C3PAO submits findings to CMMC Accreditation Body</li>
          <li><strong>Certification:</strong> If you meet requirements, certification is issued (valid 3 years)</li>
        </ol>
        <p><strong>Current bottleneck:</strong> There are fewer than 100 authorized C3PAOs serving an estimated 80,000 contractors needing Level 2 certification. Book your assessment early.</p>
        <p><strong>Plan of Action and Milestones (POA&M):</strong> Under CMMC 2.0, you can achieve conditional certification with a POA&M for certain gaps, giving you 180 days to remediate. However, POA&Ms are limited — you cannot have critical gaps.</p>
      `,
    },
    {
      heading: 'Preparing for CMMC: A Step-by-Step Approach',
      content: `
        <p>Start your CMMC journey now with this roadmap:</p>
        <p><strong>Step 1: Determine Your Required Level (Week 1)</strong></p>
        <ul>
          <li>Inventory your current and target DoD contracts</li>
          <li>Identify whether you handle FCI only or also CUI</li>
          <li>Review solicitations for CMMC requirements</li>
        </ul>
        <p><strong>Step 2: Conduct a Gap Assessment (Weeks 2-4)</strong></p>
        <ul>
          <li>Map your current security controls against NIST SP 800-171</li>
          <li>Identify which of the 110 practices you already meet</li>
          <li>Document gaps and estimate remediation effort</li>
          <li>Consider hiring a CMMC Registered Practitioner (RP) to help</li>
        </ul>
        <p><strong>Step 3: Create Your System Security Plan (SSP) (Weeks 4-8)</strong></p>
        <ul>
          <li>Document your CUI boundary (which systems handle sensitive data)</li>
          <li>Describe how you implement each applicable control</li>
          <li>This is the foundation document for your assessment</li>
        </ul>
        <p><strong>Step 4: Implement Remediation (Months 2-6)</strong></p>
        <ul>
          <li>Address gaps in priority order (critical controls first)</li>
          <li>Deploy required technologies (MFA, encryption, logging, etc.)</li>
          <li>Train employees on security policies</li>
          <li>Test your incident response procedures</li>
        </ul>
        <p><strong>Step 5: Conduct Internal Assessment (Month 6)</strong></p>
        <ul>
          <li>Perform mock assessment against all 320 objectives</li>
          <li>Identify remaining gaps</li>
          <li>Refine documentation</li>
        </ul>
        <p><strong>Step 6: Schedule and Complete C3PAO Assessment (Months 6-12)</strong></p>
        <ul>
          <li>Select a C3PAO and schedule assessment</li>
          <li>Prepare personnel for interviews</li>
          <li>Complete assessment and address any findings</li>
        </ul>
      `,
    },
    {
      heading: 'CMMC Impact on Small Business: Market Reality',
      content: `
        <p>CMMC represents a significant shift in the defense contractor landscape. Here is the reality for small businesses:</p>
        <p><strong>The Challenge:</strong></p>
        <ul>
          <li>Small businesses make up 73% of the Defense Industrial Base (DIB)</li>
          <li>Estimates suggest 33,000-44,000 companies may exit the defense market by 2027 as compliance costs exceed the value of their defense work</li>
          <li>Assessment costs ($34K-$112K) represent a significant investment for small contractors</li>
        </ul>
        <p><strong>The Opportunity:</strong></p>
        <ul>
          <li>Competitors who cannot meet requirements will exit, creating opportunities</li>
          <li>CMMC certification becomes a competitive differentiator</li>
          <li>Early compliance positions you for contracts others cannot pursue</li>
          <li>Security investments benefit your commercial work as well</li>
        </ul>
        <p><strong>Strategic considerations:</strong></p>
        <ul>
          <li><strong>Evaluate your defense portfolio:</strong> If DoD contracts represent a small portion of revenue, consider whether compliance costs make business sense</li>
          <li><strong>Consider subcontracting:</strong> You may be able to support prime contractors without handling CUI directly, reducing your compliance burden to Level 1</li>
          <li><strong>Specialize your systems:</strong> Isolate CUI to specific systems rather than your entire infrastructure to reduce scope</li>
          <li><strong>Factor compliance into pricing:</strong> CMMC costs are allowable contract costs — price accordingly</li>
        </ul>
        <p>The contractors who invest in compliance now will be positioned to capture market share as others exit. Those who wait may find themselves locked out of defense opportunities entirely.</p>
      `,
    },
    {
      heading: 'Common CMMC Mistakes to Avoid',
      content: `
        <p>Learn from others' errors as you pursue CMMC certification:</p>
        <ul>
          <li><strong>Waiting too long to start:</strong> With C3PAO availability limited, starting late means missing contract opportunities. Begin preparation 12-18 months before you need certification.</li>
          <li><strong>Underestimating documentation:</strong> CMMC is as much about proving compliance as achieving it. Every control needs documented evidence. Start building your SSP and supporting documentation early.</li>
          <li><strong>Ignoring the supply chain:</strong> Your subcontractors who handle CUI also need CMMC certification. Verify their compliance status before including them on proposals.</li>
          <li><strong>Treating it as an IT project:</strong> CMMC requires company-wide participation. HR, legal, operations, and leadership all have roles to play — not just IT.</li>
          <li><strong>Overlooking physical security:</strong> CMMC includes physical protection requirements. Locked doors, visitor logs, and media handling procedures matter.</li>
          <li><strong>Assuming cloud equals compliance:</strong> Using Microsoft 365 GCC High or AWS GovCloud helps but does not make you compliant. You still need to configure and use these tools correctly.</li>
          <li><strong>Skipping the gap assessment:</strong> You cannot remediate what you do not measure. Invest in a thorough gap assessment before spending on solutions.</li>
          <li><strong>Forgetting ongoing maintenance:</strong> CMMC is not one-and-done. You need continuous monitoring, annual assessments (Level 1) or triennial recertification (Level 2), and ongoing employee training.</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'When do I need to be CMMC certified?',
      answer:
        'CMMC requirements are already appearing in solicitations as of November 2025. Phase 2 (November 2026) makes third-party certification mandatory for most Level 2 contractors. The practical answer: you need certification before bidding on any contract that requires it. Start preparation now to avoid missing opportunities.',
    },
    {
      question: 'How much does CMMC certification cost?',
      answer:
        'Level 1 typically costs $5,000-$20,000 total. Level 2 costs $34,000-$112,000 depending on your current security posture, including gap assessment, remediation, technology, and the C3PAO assessment itself. Ongoing annual costs add $17,000-$50,000 for security tools, services, and eventual recertification.',
    },
    {
      question: 'Can I self-certify for CMMC Level 2?',
      answer:
        'In limited cases, yes. Some "non-prioritized" acquisitions may allow Level 2 self-assessment. However, the default for Level 2 is third-party certification by a C3PAO. Assume you will need third-party assessment unless the specific solicitation states otherwise.',
    },
    {
      question: 'What is the difference between CMMC and NIST 800-171?',
      answer:
        'NIST SP 800-171 defines the 110 security controls. CMMC is the verification mechanism that proves you actually implement them. Previously, contractors self-attested to NIST 800-171 compliance. CMMC adds third-party verification and a formal certification process.',
    },
    {
      question: 'Do subcontractors need CMMC certification?',
      answer:
        'Yes, if they handle FCI or CUI. The CMMC requirement flows down to subcontractors at any tier who process, store, or transmit covered information. Prime contractors are responsible for ensuring subcontractor compliance. This creates both a compliance burden and an opportunity for certified small businesses.',
    },
    {
      question: 'What is a C3PAO and how do I find one?',
      answer:
        'A C3PAO (CMMC Third-Party Assessment Organization) is an authorized entity that can conduct CMMC assessments. Find authorized C3PAOs on the CMMC Accreditation Body website (cyberab.org). With fewer than 100 C3PAOs serving 80,000+ contractors, book early — lead times are 3-6 months or more.',
    },
    {
      question: 'Can I get CMMC certified if I have gaps?',
      answer:
        'CMMC 2.0 allows a Plan of Action and Milestones (POA&M) for certain non-critical gaps. You can receive conditional certification and have 180 days to remediate. However, critical controls cannot be on a POA&M — you must fully implement them before assessment.',
    },
    {
      question: 'Is CMMC required for GSA Schedule contracts?',
      answer:
        'CMMC is specifically a DoD requirement. GSA Schedule contracts themselves do not require CMMC. However, if you use your GSA Schedule to sell to DoD and handle CUI, those specific task orders may require CMMC compliance.',
    },
  ],
  cta: {
    heading: 'Get CMMC-Ready with Expert Guidance',
    description:
      'CMMC certification is complex, but you do not have to navigate it alone. Our government contracting resources can help you understand requirements and prepare for compliance.',
    buttonText: 'Access Free Resources',
    buttonHref: '/resources/handouts',
  },
  relatedGuides: [
    'government-contracting-for-beginners',
    'finding-government-contracts',
    'sam-gov-registration',
  ],
  publishedDate: '2026-04-02',
};
