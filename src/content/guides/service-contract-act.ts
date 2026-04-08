import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'service-contract-act',
  title: 'Service Contract Act: Wage Determinations and Compliance Requirements',
  metaTitle: 'Service Contract Act (SCA) Guide — Wage Requirements & Compliance',
  metaDescription:
    'Learn Service Contract Act requirements: wage determinations, fringe benefits, compliance obligations, and how SCA affects your government contract pricing.',
  keywords: [
    'service contract act',
    'sca compliance',
    'wage determination',
    'sca fringe benefits',
    'prevailing wage',
    'service contract labor',
    'dol wage determination',
    'sca requirements',
    'service employee',
    'labor standards',
  ],
  heroSubtitle:
    'The Service Contract Act sets minimum wages and benefits for service workers on federal contracts. Non-compliance means back wages, penalties, and debarment. Get it right.',
  sections: [
    {
      heading: 'What Is the Service Contract Act?',
      content: `
        <p>The <strong>Service Contract Act (SCA)</strong> of 1965 (41 U.S.C. 6701-6707) requires contractors and subcontractors performing services on federal contracts exceeding $2,500 to pay service employees no less than locally prevailing wages and fringe benefits.</p>
        <p><strong>Purpose of SCA:</strong></p>
        <ul>
          <li>Protect service workers from substandard wages</li>
          <li>Ensure fair competition (contractors can't win by underpaying workers)</li>
          <li>Maintain local wage standards for federal work</li>
        </ul>
        <p><strong>When SCA applies:</strong></p>
        <ul>
          <li>Prime contracts and subcontracts for services</li>
          <li>Contract value exceeds $2,500</li>
          <li>Principal purpose is furnishing services through service employees</li>
          <li>Services performed in the United States</li>
        </ul>
        <p><strong>When SCA doesn't apply:</strong></p>
        <ul>
          <li>Contracts for construction (Davis-Bacon Act applies)</li>
          <li>Contracts for supplies/manufacturing</li>
          <li>Professional/administrative employees exempt from FLSA</li>
          <li>Contracts with individuals (no employees)</li>
          <li>Work outside the U.S.</li>
        </ul>
        <p><strong>Who is covered:</strong></p>
        <p>"Service employees" — workers engaged in performing the contract work, excluding bona fide executives, administrators, and professionals exempt under the Fair Labor Standards Act.</p>
      `,
    },
    {
      heading: 'Wage Determinations',
      content: `
        <p>The Department of Labor (DOL) issues <strong>wage determinations (WDs)</strong> that specify minimum wages and fringe benefits by job classification and geographic area.</p>
        <p><strong>Types of wage determinations:</strong></p>
        <p><strong>Area-wide WDs:</strong></p>
        <ul>
          <li>Cover specific geographic areas</li>
          <li>List occupations common to many contracts</li>
          <li>Updated periodically</li>
          <li>Most common type</li>
        </ul>
        <p><strong>Contract-specific WDs:</strong></p>
        <ul>
          <li>Issued for specific contracts</li>
          <li>May include unique occupations</li>
          <li>Requested when area-wide doesn't cover needed classifications</li>
        </ul>
        <p><strong>Finding wage determinations:</strong></p>
        <p>Available at <a href="https://sam.gov/content/wage-determinations" target="_blank">SAM.gov Wage Determinations</a> (formerly WDOL.gov).</p>
        <p><strong>Using wage determinations:</strong></p>
        <ul>
          <li>Match job classifications to WD occupations</li>
          <li>Pay at least the listed hourly rate</li>
          <li>Provide at least the listed fringe benefits (or cash equivalent)</li>
          <li>Apply correct geographic area</li>
        </ul>
        <p><strong>When WDs change:</strong></p>
        <p>New WDs apply to:</p>
        <ul>
          <li>New contracts</li>
          <li>Contract renewals/extensions</li>
          <li>Option exercises (may incorporate new WD)</li>
        </ul>
        <p>Existing contracts generally use the WD in effect at award, unless options incorporate updates.</p>
      `,
    },
    {
      heading: 'Fringe Benefits Under SCA',
      content: `
        <p>SCA requires not just minimum wages but also minimum <strong>fringe benefits</strong> — currently $4.98/hour (as of 2024, adjusted annually).</p>
        <p><strong>What counts as fringe:</strong></p>
        <ul>
          <li>Health insurance</li>
          <li>Retirement/pension contributions</li>
          <li>Life insurance</li>
          <li>Vacation and holidays</li>
          <li>Sick leave</li>
        </ul>
        <p><strong>Providing fringe benefits:</strong></p>
        <p>You can satisfy the fringe requirement by:</p>
        <ol>
          <li><strong>Benefits in-kind</strong> — Actually providing health insurance, retirement, etc. valued at required amount</li>
          <li><strong>Cash equivalent (H&W)</strong> — Paying additional cash equal to fringe requirement</li>
          <li><strong>Combination</strong> — Mix of benefits and cash</li>
        </ol>
        <p><strong>Health and Welfare (H&W) rate:</strong></p>
        <p>If you don't provide benefits worth $4.98/hour, you must pay the difference as additional wages. Many contractors pay the full H&W amount as cash, especially for low-hour employees.</p>
        <p><strong>Calculating fringe value:</strong></p>
        <ul>
          <li>Employer contribution to health insurance (per hour worked)</li>
          <li>Employer 401k match</li>
          <li>Paid leave value</li>
          <li>Other qualifying benefits</li>
        </ul>
        <p><strong>Documentation:</strong></p>
        <p>Maintain records proving you provide required fringe value. DOL audits verify both wages and fringes.</p>
      `,
    },
    {
      heading: 'Job Classifications and Conformance',
      content: `
        <p><strong>Matching employees to WD classifications:</strong></p>
        <p>Each WD lists job classifications with corresponding wages. You must:</p>
        <ul>
          <li>Match each employee's actual duties to the appropriate classification</li>
          <li>Pay at least the listed rate for that classification</li>
          <li>Not artificially classify employees in lower-paid categories</li>
        </ul>
        <p><strong>When classifications don't match:</strong></p>
        <p>If your workers don't fit any WD classification, request a <strong>conformance</strong>:</p>
        <ol>
          <li>Identify the job duties not covered</li>
          <li>Request DOL add a classification</li>
          <li>DOL determines appropriate wage rate</li>
        </ol>
        <p><strong>Conformance process:</strong></p>
        <ul>
          <li>Submit request through contracting officer</li>
          <li>Provide job description and proposed rate</li>
          <li>DOL reviews and issues determination</li>
          <li>Until approved, pay closest comparable rate</li>
        </ul>
        <p><strong>Common classification issues:</strong></p>
        <ul>
          <li>Using generic titles that don't match WD language</li>
          <li>Misclassifying skilled workers as lower-level</li>
          <li>Failing to account for actual work performed</li>
        </ul>
        <p><strong>Multiple classifications:</strong></p>
        <p>If an employee works in multiple classifications, pay the higher rate when performing higher-classified work. Track time by classification.</p>
      `,
    },
    {
      heading: 'Pricing SCA Contracts',
      content: `
        <p><strong>Impact on labor rates:</strong></p>
        <p>SCA sets a floor, not a ceiling. Your pricing must account for:</p>
        <ul>
          <li>SCA minimum wages (may exceed your normal pay for some positions)</li>
          <li>Fringe benefit requirements (H&W rate)</li>
          <li>Paid sick leave requirements (Executive Order 13706)</li>
        </ul>
        <p><strong>Common pricing mistakes:</strong></p>
        <ul>
          <li>Using company rates lower than WD rates</li>
          <li>Forgetting H&W fringe requirement</li>
          <li>Not accounting for paid sick leave mandate</li>
          <li>Ignoring geographic rate differences</li>
        </ul>
        <p><strong>SCA price adjustments:</strong></p>
        <p>FAR 52.222-43 provides for contract price adjustments when:</p>
        <ul>
          <li>DOL issues a new or revised WD</li>
          <li>Changes affect your actual labor costs</li>
          <li>Adjustments must be requested</li>
        </ul>
        <p>Don't assume automatic adjustments — you must track WD changes and request increases.</p>
        <p><strong>Competitive considerations:</strong></p>
        <ul>
          <li>All compliant bidders face same SCA minimums</li>
          <li>Competition occurs above the floor</li>
          <li>Efficiency and productivity differentiate</li>
          <li>Underbidding SCA costs is a compliance trap</li>
        </ul>
      `,
    },
    {
      heading: 'Compliance Requirements',
      content: `
        <p><strong>Required contract clauses:</strong></p>
        <p>SCA contracts must include FAR 52.222-41 (Service Contract Labor Standards). This clause:</p>
        <ul>
          <li>Incorporates the wage determination</li>
          <li>Establishes compliance obligations</li>
          <li>Provides for enforcement</li>
        </ul>
        <p><strong>Contractor obligations:</strong></p>
        <ul>
          <li><strong>Pay required wages</strong> — At least WD rates for each classification</li>
          <li><strong>Provide fringe benefits</strong> — H&W rate through benefits or cash</li>
          <li><strong>Post the WD</strong> — Conspicuously at the worksite</li>
          <li><strong>Maintain records</strong> — Payroll records for 3 years</li>
          <li><strong>Submit payrolls</strong> — If required by contract</li>
          <li><strong>Flow down to subs</strong> — Subcontracts must include SCA requirements</li>
        </ul>
        <p><strong>Record-keeping requirements:</strong></p>
        <ul>
          <li>Employee name, address, SSN</li>
          <li>Job classification</li>
          <li>Wage rate and fringe benefits</li>
          <li>Hours worked daily and weekly</li>
          <li>Deductions</li>
          <li>Total wages paid</li>
        </ul>
        <p><strong>Posted notice:</strong></p>
        <p>Display WH-1313 (Notice to Employees Working on Government Contracts) at work sites.</p>
      `,
    },
    {
      heading: 'Enforcement and Penalties',
      content: `
        <p><strong>Who enforces SCA:</strong></p>
        <p>The Department of Labor's Wage and Hour Division investigates complaints and conducts audits.</p>
        <p><strong>Investigation triggers:</strong></p>
        <ul>
          <li>Employee complaints</li>
          <li>Random audits</li>
          <li>Competitor complaints</li>
          <li>Contracting officer referrals</li>
        </ul>
        <p><strong>Penalties for violations:</strong></p>
        <p><strong>Back wages:</strong></p>
        <ul>
          <li>Pay employees the difference between what was paid and what was owed</li>
          <li>Plus interest</li>
          <li>Can cover multiple years of underpayment</li>
        </ul>
        <p><strong>Contract remedies:</strong></p>
        <ul>
          <li>Withholding of contract payments</li>
          <li>Contract termination</li>
          <li>Funds held for back wage payment</li>
        </ul>
        <p><strong>Debarment:</strong></p>
        <p>Repeated or willful violations can result in debarment — exclusion from federal contracts for 3 years.</p>
        <p><strong>Criminal penalties:</strong></p>
        <p>Intentional violations can result in fines and imprisonment.</p>
        <p><strong>Common violation findings:</strong></p>
        <ul>
          <li>Underpayment of required wages</li>
          <li>Failure to pay H&W fringe</li>
          <li>Misclassification of employees</li>
          <li>Inadequate record-keeping</li>
        </ul>
      `,
    },
    {
      heading: 'Special Situations',
      content: `
        <p><strong>Successor contractors:</strong></p>
        <p>When you take over an SCA contract from another contractor, you may be required to offer employment to predecessor employees at rates no less than they were receiving (successor contractor provisions).</p>
        <p><strong>Executive Order requirements:</strong></p>
        <p>Additional requirements beyond basic SCA:</p>
        <ul>
          <li><strong>EO 13706</strong> — Paid sick leave (1 hour per 30 hours worked)</li>
          <li><strong>EO 14026</strong> — Minimum wage ($17.20/hour in 2024, adjusted annually)</li>
        </ul>
        <p>These apply to SCA-covered contracts and may exceed WD rates.</p>
        <p><strong>Exempt employees:</strong></p>
        <p>Bona fide executives, administrators, and professionals may be exempt from SCA. Tests for exemption:</p>
        <ul>
          <li>Salary basis test (currently $684/week minimum)</li>
          <li>Duties tests (must perform exempt-type work)</li>
        </ul>
        <p>Don't assume exemption — misclassification is a common violation.</p>
        <p><strong>Part-time and temporary workers:</strong></p>
        <ul>
          <li>All hours worked count for SCA purposes</li>
          <li>Fringe benefits apply (including to part-time)</li>
          <li>No exemption for short-term employment</li>
        </ul>
        <p><strong>Subcontractor compliance:</strong></p>
        <p>You're responsible for ensuring subcontractor compliance. Flow down requirements and monitor their compliance.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is the current SCA Health and Welfare rate?',
      answer:
        'The H&W fringe benefit rate is $4.98/hour (as of 2024). This rate is adjusted annually. Check SAM.gov or DOL for current rates. You must provide this value through benefits, cash equivalent, or combination.',
    },
    {
      question: 'Does SCA apply to professional services contracts?',
      answer:
        'SCA applies to service employees, not bona fide professionals. If your staff are true professionals (engineers, accountants, attorneys meeting FLSA exemption tests), they\'re exempt. But support staff performing non-exempt work are covered.',
    },
    {
      question: 'What happens if the WD rate exceeds what I pay commercially?',
      answer:
        'You must pay at least the WD rate for SCA-covered work, even if it exceeds your normal rate. This is a cost of doing government work. Price your proposals accordingly.',
    },
    {
      question: 'Can I pay SCA wages only for government work?',
      answer:
        'Yes. SCA applies to hours worked on the covered contract. If employees split time between government and commercial work, SCA rates apply only to government hours. Track time accurately.',
    },
    {
      question: 'How do I handle employees who perform multiple WD classifications?',
      answer:
        'Pay the higher rate when performing higher-classified work. If work is mixed within a shift and can\'t be separated, pay the higher rate for the entire period. Document time by classification.',
    },
    {
      question: 'What if there\'s no WD classification for my workers?',
      answer:
        'Request a conformance through the contracting officer. Propose a rate comparable to similar WD classifications. Until DOL rules, pay at least the rate for the closest comparable classification.',
    },
    {
      question: 'Does SCA apply to fixed-price contracts?',
      answer:
        'Yes. Contract type doesn\'t affect SCA applicability. You must pay required wages regardless of whether you\'re cost-reimbursed. Build SCA costs into your fixed price.',
    },
    {
      question: 'How long must I keep SCA records?',
      answer:
        'Maintain SCA payroll records for at least 3 years after contract completion. Include all information specified in the regulations — employee data, hours, wages, fringe benefits provided.',
    },
  ],
  cta: {
    heading: 'Get SCA Compliance Right',
    description:
      'SCA violations can destroy contracts and careers. Our team helps you understand wage determinations, price SCA work accurately, and maintain compliance throughout performance.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'far-overview',
    'cost-proposals',
    'firm-fixed-price-contracts',
    'time-and-materials-contracts',
    'indirect-rates',
  ],
  publishedDate: '2026-04-07',
};
