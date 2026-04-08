import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'contract-closeout',
  title: 'Contract Closeout: Completing Government Contracts Properly',
  metaTitle: 'Contract Closeout Guide — Final Steps, Documentation & Compliance',
  metaDescription:
    'Learn how to properly close out government contracts: final documentation, invoice requirements, CPARS, property disposition, and avoiding closeout pitfalls.',
  keywords: [
    'contract closeout',
    'contract completion',
    'final invoice',
    'closeout documentation',
    'government contract closeout',
    'contract administration',
    'closeout checklist',
    'quick closeout',
    'contract settlement',
    'final payment',
  ],
  heroSubtitle:
    'Contract closeout seems like paperwork, but it affects your CPARS, future proposals, and cash flow. A clean closeout protects your reputation and releases retained funds.',
  sections: [
    {
      heading: 'What Is Contract Closeout?',
      content: `
        <p><strong>Contract closeout</strong> is the formal process of completing all contractual obligations, settling all administrative matters, and formally closing the contract file. It's not finished until the government says it's finished.</p>
        <p><strong>When closeout begins:</strong></p>
        <ul>
          <li>All deliverables have been accepted</li>
          <li>All services have been performed</li>
          <li>Period of performance has ended</li>
          <li>All options have been exercised or declined</li>
        </ul>
        <p><strong>Why closeout matters:</strong></p>
        <ul>
          <li><strong>Final payment</strong> — Retained funds aren't released until closeout</li>
          <li><strong>CPARS</strong> — Final performance evaluation impacts future bids</li>
          <li><strong>Liability</strong> — Some obligations continue until formally closed</li>
          <li><strong>Records</strong> — Retention requirements depend on closeout date</li>
        </ul>
        <p><strong>Closeout timeframes (FAR 4.804-1):</strong></p>
        <ul>
          <li><strong>FFP contracts</strong> — 6 months after completion</li>
          <li><strong>Cost-reimbursement</strong> — 36 months after completion</li>
          <li><strong>T&M/Labor Hour</strong> — 36 months after completion</li>
          <li><strong>Other</strong> — 20 months after completion</li>
        </ul>
        <p>These are government targets, not guarantees. Closeout often takes longer — especially for cost-type contracts requiring audit.</p>
      `,
    },
    {
      heading: 'Closeout Process Steps',
      content: `
        <p><strong>1. Verify all work is complete:</strong></p>
        <ul>
          <li>All deliverables submitted and accepted</li>
          <li>All services performed</li>
          <li>Documentation complete</li>
          <li>Outstanding issues resolved</li>
        </ul>
        <p><strong>2. Settle subcontracts:</strong></p>
        <ul>
          <li>Close out all subcontracts first</li>
          <li>Obtain releases from subcontractors</li>
          <li>Resolve any outstanding claims</li>
        </ul>
        <p><strong>3. Final property accounting:</strong></p>
        <ul>
          <li>Inventory government property</li>
          <li>Dispose of property per contract terms</li>
          <li>Obtain clearance from property administrator</li>
        </ul>
        <p><strong>4. Final patent/royalty reporting:</strong></p>
        <ul>
          <li>Report any inventions made under contract</li>
          <li>Submit final patent report</li>
          <li>Resolve any IP issues</li>
        </ul>
        <p><strong>5. Final invoice:</strong></p>
        <ul>
          <li>Submit final invoice marked "FINAL"</li>
          <li>Include all remaining costs</li>
          <li>Reconcile with funding</li>
        </ul>
        <p><strong>6. Release of claims:</strong></p>
        <ul>
          <li>Sign release of claims/contractor release</li>
          <li>Releases government from further obligations</li>
          <li>Except for specified reservations</li>
        </ul>
        <p><strong>7. Final CPARS:</strong></p>
        <p>Government completes final performance evaluation. You have 30 days to comment.</p>
      `,
    },
    {
      heading: 'Documentation Requirements',
      content: `
        <p><strong>Administrative closeout checklist:</strong></p>
        <ul>
          <li>Final invoice (marked "FINAL")</li>
          <li>Release of claims</li>
          <li>Final patent report</li>
          <li>Final royalty report</li>
          <li>Government property clearance</li>
          <li>Small business subcontracting report (if applicable)</li>
          <li>Final CPARS acknowledgment</li>
        </ul>
        <p><strong>For cost-type contracts, add:</strong></p>
        <ul>
          <li>Incurred cost submissions (for all contract years)</li>
          <li>Final indirect rate settlement</li>
          <li>DCAA audit completion (or quick closeout)</li>
          <li>Final cost reconciliation</li>
        </ul>
        <p><strong>What the final invoice must include:</strong></p>
        <ul>
          <li>Statement that it's the final invoice</li>
          <li>All remaining costs/fees claimed</li>
          <li>Reconciliation with prior billings</li>
          <li>Supporting documentation</li>
        </ul>
        <p><strong>Release of claims:</strong></p>
        <p>Standard form requires you to release the government from further claims EXCEPT:</p>
        <ul>
          <li>Specified claims you reserve</li>
          <li>Claims already pending</li>
          <li>Government property issues not yet resolved</li>
        </ul>
        <p><strong>If you have unresolved issues:</strong></p>
        <p>Don't sign away your rights. Reserve specific claims in the release, or resolve them before signing.</p>
      `,
    },
    {
      heading: 'Cost-Type Contract Closeout',
      content: `
        <p>Cost-reimbursement contracts have additional closeout complexity due to audit requirements.</p>
        <p><strong>Incurred cost submission:</strong></p>
        <ul>
          <li>Submit for each fiscal year of performance</li>
          <li>Due 6 months after fiscal year end</li>
          <li>Required before final settlement</li>
        </ul>
        <p><strong>Final rate settlement:</strong></p>
        <ul>
          <li><a href="/guides/dcaa-audits">DCAA audits</a> your incurred costs</li>
          <li>Final <a href="/guides/indirect-rates">indirect rates</a> determined</li>
          <li>Difference between provisional and final rates settled</li>
        </ul>
        <p><strong>Quick closeout procedure (FAR 42.708):</strong></p>
        <p>For contracts meeting criteria, you can close without full audit:</p>
        <ul>
          <li>Contract performed satisfactorily</li>
          <li>Indirect costs are final (or will be soon)</li>
          <li>Unsettled direct costs are insignificant</li>
          <li>Government determines audit isn't cost-effective</li>
        </ul>
        <p>Quick closeout expedites final payment and releases you from extended audit exposure.</p>
        <p><strong>Settlement negotiation:</strong></p>
        <p>If audited costs are questioned:</p>
        <ul>
          <li>Negotiate with contracting officer</li>
          <li>Provide additional documentation</li>
          <li>May result in disallowed costs</li>
          <li>Final settlement documented in modification</li>
        </ul>
      `,
    },
    {
      heading: 'Government Property Disposition',
      content: `
        <p><strong>Types of government property:</strong></p>
        <ul>
          <li><strong>GFE</strong> — Government-furnished equipment (provided by government)</li>
          <li><strong>GFM</strong> — Government-furnished material</li>
          <li><strong>CAP</strong> — Contractor-acquired property (purchased for government)</li>
        </ul>
        <p><strong>Before closeout:</strong></p>
        <ul>
          <li>Inventory all government property</li>
          <li>Reconcile with property records</li>
          <li>Report any discrepancies</li>
        </ul>
        <p><strong>Disposition options:</strong></p>
        <ul>
          <li><strong>Return to government</strong> — Ship to specified location</li>
          <li><strong>Transfer to another contract</strong> — If authorized</li>
          <li><strong>Abandon in place</strong> — For items with no residual value</li>
          <li><strong>Donate</strong> — To educational institutions or nonprofits</li>
          <li><strong>Sell</strong> — With government authorization</li>
          <li><strong>Purchase</strong> — Buy at fair market value</li>
        </ul>
        <p><strong>Property clearance:</strong></p>
        <p>You need written clearance from the property administrator before closeout. Without clearance, contract can't close.</p>
        <p><strong>Lost or damaged property:</strong></p>
        <ul>
          <li>Report to property administrator</li>
          <li>May require investigation</li>
          <li>Contractor may be liable for loss</li>
          <li>Document circumstances carefully</li>
        </ul>
      `,
    },
    {
      heading: 'Final Payment and Retainage',
      content: `
        <p><strong>Withheld funds:</strong></p>
        <p>During performance, the government may withhold:</p>
        <ul>
          <li><strong>Retainage</strong> — Percentage held until completion</li>
          <li><strong>Fee withholds</strong> — Portion of fee pending completion</li>
          <li><strong>Provisional rate reserves</strong> — For final rate settlement</li>
        </ul>
        <p><strong>Releasing withholds:</strong></p>
        <p>Withheld funds are released when:</p>
        <ul>
          <li>All work is complete and accepted</li>
          <li>Documentation is satisfactory</li>
          <li>Final costs are settled</li>
          <li>No claims are outstanding</li>
        </ul>
        <p><strong>Final invoice processing:</strong></p>
        <ul>
          <li>Submit marked "FINAL"</li>
          <li>Reconcile all prior payments</li>
          <li>Account for withholds being released</li>
          <li>Allow for audit adjustments if applicable</li>
        </ul>
        <p><strong>Interest on late payment:</strong></p>
        <p>If government delays payment beyond Prompt Payment Act deadlines, interest accrues. Track final payment timing.</p>
        <p><strong>Cash flow impact:</strong></p>
        <p>Delayed closeout = delayed final payment. Push for timely closeout, especially on contracts with significant retainage or fee withholds.</p>
      `,
    },
    {
      heading: 'Common Closeout Problems',
      content: `
        <p><strong>1. Missing documentation:</strong></p>
        <ul>
          <li>Can't locate records from years ago</li>
          <li>Personnel who knew details have left</li>
          <li>Subcontractor records incomplete</li>
        </ul>
        <p><strong>Prevention:</strong> Maintain organized contract files throughout performance.</p>
        <p><strong>2. Unresolved subcontract issues:</strong></p>
        <ul>
          <li>Subcontractor disputes delaying closeout</li>
          <li>Missing subcontractor releases</li>
          <li>Subcontractor went out of business</li>
        </ul>
        <p><strong>Prevention:</strong> Close subcontracts promptly as work completes.</p>
        <p><strong>3. Government property discrepancies:</strong></p>
        <ul>
          <li>Property can't be located</li>
          <li>Records don't match physical inventory</li>
          <li>Unclear disposition instructions</li>
        </ul>
        <p><strong>Prevention:</strong> Maintain accurate property records continuously.</p>
        <p><strong>4. Cost audit findings:</strong></p>
        <ul>
          <li><a href="/guides/dcaa-audits">DCAA</a> questions significant costs</li>
          <li>Documentation doesn't support charges</li>
          <li>Indirect rates not finalized</li>
        </ul>
        <p><strong>Prevention:</strong> Maintain audit-ready records, submit incurred cost timely.</p>
        <p><strong>5. Pending claims or disputes:</strong></p>
        <ul>
          <li>Unresolved change orders</li>
          <li>Pending equitable adjustments</li>
          <li>Disputes in Claims process</li>
        </ul>
        <p><strong>Prevention:</strong> Resolve issues during performance, not at closeout.</p>
      `,
    },
    {
      heading: 'Best Practices for Clean Closeout',
      content: `
        <p><strong>During performance:</strong></p>
        <ul>
          <li>Maintain organized contract files</li>
          <li>Track government property meticulously</li>
          <li>Resolve issues promptly</li>
          <li>Submit incurred costs on time</li>
          <li>Close subcontracts as work completes</li>
        </ul>
        <p><strong>As performance ends:</strong></p>
        <ul>
          <li>Create closeout checklist early</li>
          <li>Assign closeout responsibility</li>
          <li>Inventory all government property</li>
          <li>Notify subcontractors of closeout</li>
          <li>Gather all required documentation</li>
        </ul>
        <p><strong>During closeout:</strong></p>
        <ul>
          <li>Communicate proactively with CO/ACO</li>
          <li>Respond promptly to requests</li>
          <li>Push for timely government action</li>
          <li>Track status and follow up</li>
        </ul>
        <p><strong>Closeout checklist items:</strong></p>
        <table class="w-full text-left border-collapse text-sm my-4">
          <tr class="bg-slate-800">
            <th class="p-2 border border-slate-700 text-white">Item</th>
            <th class="p-2 border border-slate-700 text-white">Status</th>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">All deliverables accepted</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Final invoice submitted</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Subcontracts closed</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Property disposition complete</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Release of claims signed</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-700">Final CPARS reviewed</td>
            <td class="p-2 border border-slate-700">☐</td>
          </tr>
        </table>
      `,
    },
  ],
  faqs: [
    {
      question: 'How long does contract closeout take?',
      answer:
        'FAR targets are 6 months for FFP, 36 months for cost-type. Reality often takes longer — cost-type contracts awaiting audit can take years. Push for quick closeout when eligible. Track your closeout status actively.',
    },
    {
      question: 'Can I get paid before closeout is complete?',
      answer:
        'You receive payments during performance. Final payment (including withholds) requires closeout. For cost-type, you may receive partial releases of withholds as rates are settled, even before complete closeout.',
    },
    {
      question: 'What is a release of claims?',
      answer:
        'A document where you release the government from liability for further payment (except specified reservations). Signing it finalizes your claims. Reserve any unresolved issues specifically before signing.',
    },
    {
      question: 'What happens to records after closeout?',
      answer:
        'Retain records per FAR 4.703: 3 years after final payment for most records. Some records (indirect costs, payroll) may require longer retention. Government may audit retained records during retention period.',
    },
    {
      question: 'Can a closed contract be reopened?',
      answer:
        'Rarely. Contracts can be reopened for fraud, unresolved reserved claims, or errors discovered post-closeout. Generally, closeout is final — resolve issues before signing the release.',
    },
    {
      question: 'What if the government doesn\'t close out timely?',
      answer:
        'Delayed closeout delays your final payment. Document your submissions and follow up regularly. Escalate to ACO/CO if delays are unreasonable. In extreme cases, consider filing a claim for final payment.',
    },
    {
      question: 'Do I need DCAA audit before closeout?',
      answer:
        'For cost-type contracts over threshold, usually yes. But quick closeout (FAR 42.708) allows closing without audit if criteria are met. Quick closeout saves time but requires government agreement.',
    },
    {
      question: 'What about CPARS at closeout?',
      answer:
        'Government completes final CPARS evaluation. You have 30 days to respond. Final CPARS affects future competitions — engage seriously. Request meeting to discuss if rating seems unfair.',
    },
  ],
  cta: {
    heading: 'Close Contracts Cleanly',
    description:
      'Proper closeout protects your CPARS, releases retained funds, and sets you up for future success. Our team helps you navigate closeout requirements and resolve outstanding issues.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'dcaa-audits',
    'contract-modifications',
    'indirect-rates',
    'far-overview',
    'cost-plus-contracts',
  ],
  publishedDate: '2026-04-07',
};
