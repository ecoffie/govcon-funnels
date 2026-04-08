import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'invoice-processing',
  title: 'Government Contract Invoice Processing: Getting Paid Faster',
  metaTitle: 'Government Invoice Processing Guide — Billing, Submission & Payment',
  metaDescription:
    'Learn government contract invoicing: proper invoice format, submission procedures, common rejection reasons, and how to accelerate payments on federal contracts.',
  keywords: [
    'government invoice',
    'contract invoicing',
    'invoice submission',
    'wawf',
    'ipp',
    'invoice processing',
    'prompt payment',
    'invoice rejection',
    'billing procedures',
    'payment processing',
  ],
  heroSubtitle:
    'Getting paid on government contracts requires following specific procedures. Proper invoicing means faster payment; errors cause costly delays.',
  sections: [
    {
      heading: 'Government Invoice Requirements',
      content: `
        <p>Federal contracts have specific requirements for invoice content and submission that differ from commercial invoicing.</p>
        <p><strong>Basic invoice elements:</strong></p>
        <ul>
          <li>Contractor name and address</li>
          <li>Invoice date and number</li>
          <li>Contract number and task/delivery order number</li>
          <li>Description of work/deliverables</li>
          <li>Quantity and unit price</li>
          <li>Total amount due</li>
          <li>Payment terms</li>
          <li>Taxpayer Identification Number (TIN)</li>
        </ul>
        <p><strong>Contract-specific requirements:</strong></p>
        <ul>
          <li>CLIN/SLIN breakdown</li>
          <li>Period of performance covered</li>
          <li>Cumulative amounts (current + prior invoices)</li>
          <li>Remaining contract balance</li>
          <li>Supporting documentation</li>
        </ul>
        <p><strong>Regulatory requirements:</strong></p>
        <p>FAR 32.905 specifies proper invoice requirements. Your contract may have additional requirements in the payment clause.</p>
      `,
    },
    {
      heading: 'Invoice Submission Systems',
      content: `
        <p><strong>Wide Area Workflow (WAWF):</strong></p>
        <p>DoD's electronic invoicing system at <a href="https://wawf.eb.mil" target="_blank">wawf.eb.mil</a>:</p>
        <ul>
          <li>Required for most DoD contracts</li>
          <li>Contractor creates and submits invoices</li>
          <li>Government reviews and approves</li>
          <li>Feeds to payment systems</li>
        </ul>
        <p><strong>Invoice Processing Platform (IPP):</strong></p>
        <p>Civilian agency system at <a href="https://ipp.gov" target="_blank">ipp.gov</a>:</p>
        <ul>
          <li>Treasury's government-wide invoicing platform</li>
          <li>Used by many civilian agencies</li>
          <li>Similar workflow to WAWF</li>
        </ul>
        <p><strong>Agency-specific systems:</strong></p>
        <p>Some agencies have proprietary invoice systems. Check your contract for specific requirements.</p>
        <p><strong>System access:</strong></p>
        <ul>
          <li>Register in the appropriate system before submitting</li>
          <li>Ensure proper user roles and permissions</li>
          <li>Train staff on system procedures</li>
          <li>Keep login credentials current</li>
        </ul>
      `,
    },
    {
      heading: 'Invoicing by Contract Type',
      content: `
        <p><strong>Firm Fixed Price (FFP):</strong></p>
        <ul>
          <li>Invoice upon delivery/acceptance of deliverables</li>
          <li>Or at milestones per contract schedule</li>
          <li>Simple invoice — deliverable, price, payment due</li>
          <li>No cost breakdown required</li>
        </ul>
        <p><strong>Time & Materials (T&M):</strong></p>
        <ul>
          <li>Invoice labor hours worked by category</li>
          <li>Invoice materials at cost (plus handling if allowed)</li>
          <li>Supporting timesheets may be required</li>
          <li>Monthly invoicing typical</li>
        </ul>
        <p><strong>Cost Reimbursable:</strong></p>
        <ul>
          <li>Invoice allowable costs incurred</li>
          <li>Detailed cost breakdown required</li>
          <li>Subject to incurred cost audit</li>
          <li>Provisional billing rates</li>
          <li>Fee billed separately</li>
        </ul>
        <p><strong>Progress payments (FFP):</strong></p>
        <ul>
          <li>Percentage of costs incurred</li>
          <li>Requires cost substantiation</li>
          <li>Liquidated from final payments</li>
        </ul>
        <p><strong>Milestone payments:</strong></p>
        <ul>
          <li>Defined payment upon reaching milestones</li>
          <li>Must demonstrate milestone achievement</li>
          <li>Documentation of completion required</li>
        </ul>
      `,
    },
    {
      heading: 'Invoice Approval Process',
      content: `
        <p><strong>Government review workflow:</strong></p>
        <ol>
          <li><strong>Submission</strong> — Contractor submits invoice electronically</li>
          <li><strong>COR review</strong> — Technical representative verifies work was done</li>
          <li><strong>Acceptance</strong> — COR accepts deliverables/services</li>
          <li><strong>CO approval</strong> — Contracting officer approves payment</li>
          <li><strong>DFAS/Finance</strong> — Payment office processes payment</li>
          <li><strong>Payment</strong> — Funds transferred to contractor</li>
        </ol>
        <p><strong>Prompt Payment Act:</strong></p>
        <p>Government must pay within:</p>
        <ul>
          <li>30 days for most invoices</li>
          <li>14 days for perishable/fast-pay contracts</li>
          <li>7 days for specified commodities</li>
        </ul>
        <p>Interest accrues on late payments (automatic, no need to request).</p>
        <p><strong>Clock starts when:</strong></p>
        <ul>
          <li>"Proper invoice" received, AND</li>
          <li>Goods/services accepted, AND</li>
          <li>All required documentation received</li>
        </ul>
      `,
    },
    {
      heading: 'Common Invoice Rejections',
      content: `
        <p><strong>Reasons invoices get rejected:</strong></p>
        <p><strong>Administrative errors:</strong></p>
        <ul>
          <li>Wrong contract or order number</li>
          <li>Missing required information</li>
          <li>Math errors</li>
          <li>Wrong format</li>
          <li>Missing supporting documentation</li>
        </ul>
        <p><strong>Performance issues:</strong></p>
        <ul>
          <li>Work not accepted by government</li>
          <li>Deliverable not received</li>
          <li>Quality problems requiring correction</li>
          <li>Incomplete performance</li>
        </ul>
        <p><strong>Billing issues:</strong></p>
        <ul>
          <li>Exceeds funded amount</li>
          <li>Wrong CLIN charged</li>
          <li>Rates don't match contract</li>
          <li>Cumulative billing exceeds contract value</li>
        </ul>
        <p><strong>Impact of rejections:</strong></p>
        <ul>
          <li>Payment clock resets when you resubmit</li>
          <li>Cash flow delays</li>
          <li>Administrative burden</li>
          <li>Pattern of rejections looks bad</li>
        </ul>
      `,
    },
    {
      heading: 'Best Practices for Faster Payment',
      content: `
        <p><strong>Invoice preparation:</strong></p>
        <ul>
          <li>Verify all information before submitting</li>
          <li>Use a checklist for required elements</li>
          <li>Match contract terms exactly</li>
          <li>Attach all required documentation</li>
        </ul>
        <p><strong>Timing:</strong></p>
        <ul>
          <li>Invoice promptly — every day delayed costs you</li>
          <li>Don't batch multiple periods unnecessarily</li>
          <li>Submit early in the week (not Friday afternoon)</li>
          <li>Align with government fiscal cycles when possible</li>
        </ul>
        <p><strong>Communication:</strong></p>
        <ul>
          <li>Coordinate with COR on acceptance timing</li>
          <li>Alert government before submitting large invoices</li>
          <li>Follow up if approval seems delayed</li>
          <li>Build relationships with payment office</li>
        </ul>
        <p><strong>Systems management:</strong></p>
        <ul>
          <li>Keep system access current</li>
          <li>Train backup personnel</li>
          <li>Test submission process periodically</li>
          <li>Monitor invoice status in system</li>
        </ul>
      `,
    },
    {
      heading: 'Supporting Documentation',
      content: `
        <p><strong>T&M and labor hour contracts:</strong></p>
        <ul>
          <li>Timesheets signed by employee and supervisor</li>
          <li>Hours by labor category and CLIN</li>
          <li>Description of work performed</li>
        </ul>
        <p><strong>Materials and ODCs:</strong></p>
        <ul>
          <li>Receipts or purchase orders</li>
          <li>Vendor invoices</li>
          <li>Travel vouchers and receipts</li>
          <li>Evidence of receipt/use</li>
        </ul>
        <p><strong>Cost reimbursable contracts:</strong></p>
        <ul>
          <li>Detailed cost breakdown</li>
          <li>Direct labor costs with hours</li>
          <li>Indirect costs applied</li>
          <li>Fee calculation</li>
          <li>Cumulative cost report</li>
        </ul>
        <p><strong>Milestone/deliverable payments:</strong></p>
        <ul>
          <li>Evidence of deliverable completion</li>
          <li>Government acceptance documentation</li>
          <li>Milestone achievement certification</li>
        </ul>
        <p><strong>Record retention:</strong></p>
        <p>Keep copies of all invoices and supporting documentation for at least 6 years (or contract requirement if longer).</p>
      `,
    },
    {
      heading: 'Handling Payment Issues',
      content: `
        <p><strong>Late payments:</strong></p>
        <ul>
          <li>Interest accrues automatically per Prompt Payment Act</li>
          <li>Track payment timing</li>
          <li>Follow up with CO if payment is late</li>
          <li>Interest should be paid without requesting</li>
        </ul>
        <p><strong>Partial payments:</strong></p>
        <ul>
          <li>Government may approve partial payment</li>
          <li>Remainder pending issue resolution</li>
          <li>Get clear explanation of shortfall</li>
          <li>Resolve and resubmit remaining amount</li>
        </ul>
        <p><strong>Disputed amounts:</strong></p>
        <ul>
          <li>Government may dispute specific charges</li>
          <li>Request written explanation</li>
          <li>Provide additional documentation</li>
          <li>Escalate through CO if necessary</li>
        </ul>
        <p><strong>Payment holds:</strong></p>
        <ul>
          <li>Various reasons: investigation, performance issues, contract disputes</li>
          <li>Understand the reason</li>
          <li>Work to resolve underlying issue</li>
          <li>May impact cash flow significantly</li>
        </ul>
        <p><strong>When to escalate:</strong></p>
        <ul>
          <li>Payment significantly late with no explanation</li>
          <li>Repeated improper rejections</li>
          <li>Unreasonable documentation demands</li>
          <li>Pattern of payment issues</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'How long does the government take to pay invoices?',
      answer:
        'The Prompt Payment Act requires payment within 30 days of a proper invoice (for most contracts). In practice, 30-45 days is typical. Complex cost-type invoices may take longer to process.',
    },
    {
      question: 'What happens if my invoice is rejected?',
      answer:
        'You must correct the issues and resubmit. The payment clock restarts when you resubmit a proper invoice. Track rejection reasons to prevent recurrence.',
    },
    {
      question: 'Can I invoice before work is accepted?',
      answer:
        'Generally no. Most contracts require acceptance before payment. Progress payments and milestone payments have specific substantiation requirements.',
    },
    {
      question: 'Do I get interest on late government payments?',
      answer:
        'Yes. The Prompt Payment Act requires interest on late payments, calculated automatically. You shouldn\'t need to request it, but verify you receive it.',
    },
    {
      question: 'What if the COR doesn\'t approve my invoice?',
      answer:
        'Understand why. If it\'s a documentation issue, provide what\'s needed. If it\'s a performance dispute, resolve with the CO. Don\'t wait — delayed approval means delayed payment.',
    },
    {
      question: 'Can I invoice for work not yet delivered on FFP?',
      answer:
        'Not typically. FFP pays upon delivery. Some contracts have progress payment or milestone provisions, but standard FFP requires delivery before payment.',
    },
    {
      question: 'How do I handle subcontractor invoices?',
      answer:
        'You pay your subs (typically within 30 days of their invoice). You then invoice the government including those costs. Don\'t hold sub payments waiting for government payment.',
    },
    {
      question: 'What documentation do I need for travel reimbursement?',
      answer:
        'Receipts for airfare, hotel, rental car; per diem calculations; travel authorization if required. Follow JTR (Joint Travel Regulations) for DoD or agency-specific rules for civilians.',
    },
  ],
  cta: {
    heading: 'Streamline Your Invoicing',
    description:
      'Proper invoicing means faster payment and better cash flow. Our team helps you establish compliant billing procedures and resolve payment issues.',
    buttonText: 'Get Invoice Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'contract-financing',
    'dcaa-audits',
    'time-and-materials-contracts',
    'cost-plus-contracts',
    'contract-closeout',
  ],
  publishedDate: '2026-04-07',
};
