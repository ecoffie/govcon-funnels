import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'government-contract-law',
  title: 'Government Contract Law Basics: What Contractors Need to Know',
  metaTitle: 'Government Contract Law Guide — FAR, Legal Framework & Contractor Rights',
  metaDescription:
    'Learn government contract law basics: the FAR framework, contract interpretation, disputes, compliance requirements, and when to get legal help.',
  keywords: [
    'government contract law',
    'far',
    'federal acquisition regulation',
    'contract disputes',
    'contract interpretation',
    'contractor rights',
    'contract compliance',
    'cda',
    'contract disputes act',
    'procurement law',
  ],
  heroSubtitle:
    'Government contracting operates under a complex legal framework. Understanding the basics helps you navigate contracts, disputes, and compliance.',
  sections: [
    {
      heading: 'The Federal Acquisition Framework',
      content: `
        <p>Government contracting is governed by a hierarchy of laws, regulations, and policies.</p>
        <p><strong>Statutory framework:</strong></p>
        <ul>
          <li><strong>Competition in Contracting Act (CICA)</strong> — Requires full and open competition</li>
          <li><strong>Contract Disputes Act (CDA)</strong> — Governs contract disputes</li>
          <li><strong>Truth in Negotiations Act (TINA)</strong> — Requires cost or pricing data</li>
          <li><strong>False Claims Act</strong> — Penalizes fraudulent claims</li>
        </ul>
        <p><strong>Regulatory framework:</strong></p>
        <ul>
          <li><strong>Federal Acquisition Regulation (FAR)</strong> — Primary regulation</li>
          <li><strong>Agency supplements</strong> — DFARS (DoD), GSARS, etc.</li>
          <li><strong>Executive Orders</strong> — Policy requirements</li>
        </ul>
        <p><strong>The FAR:</strong></p>
        <p>FAR is codified at 48 CFR. It covers:</p>
        <ul>
          <li>Acquisition planning</li>
          <li>Competition requirements</li>
          <li>Contract types</li>
          <li>Contract clauses</li>
          <li>Contract administration</li>
        </ul>
        <p><strong>See:</strong> <a href="/guides/far-overview">FAR Overview Guide</a></p>
      `,
    },
    {
      heading: 'Contract Formation',
      content: `
        <p><strong>How government contracts are formed:</strong></p>
        <ol>
          <li><strong>Solicitation</strong> — Government issues RFP/RFQ</li>
          <li><strong>Offer</strong> — Contractor submits proposal</li>
          <li><strong>Evaluation</strong> — Government evaluates offers</li>
          <li><strong>Award</strong> — Government accepts offer</li>
        </ol>
        <p><strong>Key differences from commercial contracts:</strong></p>
        <ul>
          <li>Must follow statutory/regulatory requirements</li>
          <li>Standardized terms and conditions</li>
          <li>Limited negotiation of terms</li>
          <li>Special government rights (termination, changes)</li>
        </ul>
        <p><strong>What creates a binding contract:</strong></p>
        <ul>
          <li>Signature by authorized contracting officer</li>
          <li>Funds availability</li>
          <li>Compliance with all statutory requirements</li>
        </ul>
        <p><strong>Who can bind the government:</strong></p>
        <p>Only contracting officers (COs) with delegated authority can enter contracts. Commitments by other government personnel generally don't bind the government.</p>
      `,
    },
    {
      heading: 'Contract Interpretation',
      content: `
        <p><strong>Rules of interpretation:</strong></p>
        <p>When contract language is unclear, courts and boards apply these principles:</p>
        <ul>
          <li>Read contract as a whole</li>
          <li>Give effect to all provisions</li>
          <li>Interpret consistently with contract purpose</li>
          <li>Specific terms prevail over general</li>
          <li>Handwritten prevails over typed, which prevails over printed</li>
        </ul>
        <p><strong>Order of precedence:</strong></p>
        <p>FAR 52.215-8 establishes precedence if conflicts exist:</p>
        <ol>
          <li>Schedule (prices, line items)</li>
          <li>Representations and certifications</li>
          <li>Contract clauses</li>
          <li>Other documents (SOW, attachments)</li>
        </ol>
        <p><strong>Ambiguities:</strong></p>
        <ul>
          <li><strong>Patent ambiguity</strong> — Obvious on face; duty to inquire before bid</li>
          <li><strong>Latent ambiguity</strong> — Not obvious until performance; contractor may get relief</li>
        </ul>
        <p><strong>Practical guidance:</strong></p>
        <ul>
          <li>Read contract carefully before signing</li>
          <li>Ask questions during solicitation</li>
          <li>Document assumptions</li>
          <li>Request modifications if terms are unclear</li>
        </ul>
      `,
    },
    {
      heading: 'Contract Changes',
      content: `
        <p><strong>Changes Clause (FAR 52.243):</strong></p>
        <p>Government has unilateral right to make changes within the general scope:</p>
        <ul>
          <li>Drawings, designs, specifications</li>
          <li>Method of shipment or packing</li>
          <li>Place of delivery</li>
          <li>Acceleration of performance</li>
        </ul>
        <p><strong>Constructive changes:</strong></p>
        <p>Government actions that change contract without formal modification:</p>
        <ul>
          <li>Defective specifications</li>
          <li>Oral direction by government personnel</li>
          <li>Interference with contractor performance</li>
          <li>Changed interpretations</li>
        </ul>
        <p><strong>Equitable adjustment:</strong></p>
        <p>For changes, contractor entitled to adjustment in:</p>
        <ul>
          <li>Contract price</li>
          <li>Delivery schedule</li>
        </ul>
        <p><strong>Cardinal changes:</strong></p>
        <p>Changes outside the general scope of the contract. Contractor may refuse or treat as breach. Line between allowable change and cardinal change is often disputed.</p>
      `,
    },
    {
      heading: 'Contract Disputes',
      content: `
        <p><strong>Contract Disputes Act (CDA):</strong></p>
        <p>Primary law governing contract disputes (41 U.S.C. § 7101 et seq.)</p>
        <p><strong>Dispute process:</strong></p>
        <ol>
          <li><strong>Claim submission</strong> — Contractor submits written claim to CO</li>
          <li><strong>CO decision</strong> — CO issues final decision (or deemed denial)</li>
          <li><strong>Appeal</strong> — To Board of Contract Appeals or Court of Federal Claims</li>
        </ol>
        <p><strong>Claim requirements:</strong></p>
        <ul>
          <li>Written demand for money or adjustment</li>
          <li>Claims over $100K require certification</li>
          <li>Submit within 6 years of accrual</li>
        </ul>
        <p><strong>Appeal options:</strong></p>
        <ul>
          <li><strong>Board of Contract Appeals</strong> — Agency-specific (ASBCA for DoD, CBCA for civilian)</li>
          <li><strong>Court of Federal Claims</strong> — Alternative forum</li>
        </ul>
        <p><strong>Interest on claims:</strong></p>
        <p>CDA provides for interest on successful claims from date of claim submission.</p>
      `,
    },
    {
      heading: 'Terminations',
      content: `
        <p><strong>Termination for Convenience (T4C):</strong></p>
        <p>Government can terminate any contract when in its best interest:</p>
        <ul>
          <li>No fault of contractor</li>
          <li>Contractor entitled to recovery of costs plus profit on work done</li>
          <li>Settlement negotiated</li>
        </ul>
        <p><strong>Termination for Default (T4D):</strong></p>
        <p>Government terminates due to contractor failure:</p>
        <ul>
          <li>Failure to perform or make progress</li>
          <li>Contractor may be liable for reprocurement costs</li>
          <li>May be converted to T4C if default was excusable</li>
        </ul>
        <p><strong>Excusable delays:</strong></p>
        <p>Defaults may be excused by:</p>
        <ul>
          <li>Acts of God</li>
          <li>Government actions</li>
          <li>Freight embargoes</li>
          <li>Quarantine restrictions</li>
        </ul>
        <p><strong>Cure notice:</strong></p>
        <p>Generally required before T4D — gives contractor opportunity to cure deficiency (typically 10 days).</p>
      `,
    },
    {
      heading: 'Compliance Requirements',
      content: `
        <p><strong>Major compliance areas:</strong></p>
        <p><strong>Procurement integrity (41 U.S.C. § 2102):</strong></p>
        <ul>
          <li>Don't obtain non-public procurement information improperly</li>
          <li>Restrictions on contacts during competition</li>
          <li>Post-employment restrictions</li>
        </ul>
        <p><strong>Organizational conflicts of interest:</strong></p>
        <ul>
          <li>Avoid unfair competitive advantage</li>
          <li>Avoid impaired objectivity</li>
          <li>Disclose potential conflicts</li>
          <li>See <a href="/guides/organizational-conflicts-interest">OCI Guide</a></li>
        </ul>
        <p><strong>Cost accounting standards (CAS):</strong></p>
        <ul>
          <li>Consistent cost measurement and allocation</li>
          <li>Applies to negotiated contracts over threshold</li>
          <li>Full or modified coverage depending on size</li>
        </ul>
        <p><strong>False Claims Act:</strong></p>
        <ul>
          <li>Severe penalties for false claims</li>
          <li>Civil and criminal liability</li>
          <li>Treble damages plus penalties per claim</li>
        </ul>
      `,
    },
    {
      heading: 'When to Get Legal Help',
      content: `
        <p><strong>Situations requiring legal counsel:</strong></p>
        <ul>
          <li>Contract disputes or claims</li>
          <li>Termination notices</li>
          <li>Cure or show cause notices</li>
          <li>Investigation or audit concerns</li>
          <li>Suspension or debarment proceedings</li>
          <li>False Claims Act investigations</li>
          <li>Complex contract interpretation issues</li>
        </ul>
        <p><strong>Finding qualified counsel:</strong></p>
        <ul>
          <li>Look for government contracts experience</li>
          <li>Relevant agency and subject matter expertise</li>
          <li>References from other contractors</li>
          <li>Consider size of firm vs. your needs</li>
        </ul>
        <p><strong>Early engagement saves money:</strong></p>
        <p>Getting legal advice early often prevents bigger problems:</p>
        <ul>
          <li>Review contracts before signing</li>
          <li>Address compliance questions before issues arise</li>
          <li>Document disputes as they develop</li>
        </ul>
        <p><strong>Self-help limitations:</strong></p>
        <p>Some actions require professional help:</p>
        <ul>
          <li>Appearances before Boards/Courts</li>
          <li>Formal claims drafting</li>
          <li>Investigations and enforcement</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'Can I negotiate government contract terms?',
      answer:
        'Limited. Many clauses are required by law and not negotiable. Some clauses can be tailored. Commercial item contracts have more flexibility. Ask during solicitation — after award, terms are generally fixed.',
    },
    {
      question: 'What if I disagree with a CO decision?',
      answer:
        'You can appeal to the appropriate Board of Contract Appeals or Court of Federal Claims within 90 days (Board) or 12 months (COFC). Consider implications of litigation before appealing.',
    },
    {
      question: 'How long do I have to submit a claim?',
      answer:
        'Six years from when the claim accrued (CDA statute of limitations). Don\'t wait — evidence deteriorates and memories fade. Claims should be submitted promptly.',
    },
    {
      question: 'Can government employees make binding commitments?',
      answer:
        'Only contracting officers with delegated authority can bind the government. CORs, program managers, and other personnel cannot authorize changes or commit funds. Get written CO authorization.',
    },
    {
      question: 'What is the difference between a claim and a request for equitable adjustment?',
      answer:
        'A request for equitable adjustment (REA) is a negotiating position. A claim is a formal demand under the CDA that starts the disputes process and requires CO decision. REAs often become claims if not resolved.',
    },
    {
      question: 'Can the government terminate my contract for any reason?',
      answer:
        'Yes. Termination for convenience allows the government to end any contract when in its best interest. However, you\'re entitled to fair compensation for work performed and costs incurred.',
    },
    {
      question: 'What should I do if I receive a cure notice?',
      answer:
        'Take it seriously. Respond within the timeframe given. Either cure the deficiency or provide credible explanation why it\'s not your fault. Document everything. Consider getting legal advice.',
    },
    {
      question: 'Do I need a government contracts attorney?',
      answer:
        'Not for routine contracting, but highly recommended for disputes, compliance issues, terminations, and investigations. Government contracts law is specialized — general business attorneys may not have required expertise.',
    },
  ],
  cta: {
    heading: 'Navigate Contract Law Complexities',
    description:
      'Government contract law has unique rules that can trip up even experienced contractors. Our team helps you understand your rights and obligations under federal contracts.',
    buttonText: 'Get Legal Guidance',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'far-overview',
    'gao-protests',
    'organizational-conflicts-interest',
    'contract-modifications',
    'debriefings',
  ],
  publishedDate: '2026-04-07',
};
