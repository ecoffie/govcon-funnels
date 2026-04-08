import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'novation-agreements',
  title: 'Novation Agreements: Transferring Government Contracts During Mergers and Acquisitions',
  metaTitle: 'Novation Agreements [Guide] — Contract Transfer After M&A',
  metaDescription:
    'Learn how novation agreements work when transferring government contracts after mergers, acquisitions, or name changes. Process, documentation, timing, and common pitfalls.',
  keywords: [
    'novation agreement',
    'contract transfer',
    'government contract merger',
    'contract acquisition',
    'change of name agreement',
    'novation vs assignment',
    'contract succession',
    'government contract m&a',
    'novation process',
    'successor contractor',
  ],
  heroSubtitle:
    'When your company is acquired, merged, or changes ownership, government contracts don\'t automatically transfer. Novation agreements are required to legally transfer rights and obligations to the successor entity.',
  sections: [
    {
      heading: 'What Is a Novation Agreement?',
      content: `
        <p>A <strong>novation agreement</strong> is a legal instrument that transfers all rights and obligations under a government contract from one contractor (the transferor) to another (the transferee). This is required when there's a change in ownership or corporate structure.</p>
        <p><strong>When novation is required:</strong></p>
        <ul>
          <li><strong>Asset sale</strong> — Company sells assets including government contracts</li>
          <li><strong>Stock purchase</strong> — New owner acquires all stock of the contractor</li>
          <li><strong>Merger</strong> — Two companies merge into a single entity</li>
          <li><strong>Corporate reorganization</strong> — Restructuring that changes the contracting entity</li>
        </ul>
        <p><strong>Why novation matters:</strong></p>
        <ul>
          <li>Contracts are legally binding on specific entities — they don't automatically transfer</li>
          <li>Without novation, the original contractor remains liable</li>
          <li>Government must consent to transfer its contractual relationship</li>
          <li>Payments cannot be made to new entity without proper novation</li>
        </ul>
        <p><strong>Three parties to novation:</strong></p>
        <ol>
          <li><strong>Transferor</strong> — Original contractor</li>
          <li><strong>Transferee</strong> — New contractor (successor)</li>
          <li><strong>Government</strong> — Represented by contracting officer</li>
        </ol>
        <p>All three must sign. The government's signature represents its consent to release the transferor and accept the transferee as the new contractor.</p>
      `,
    },
    {
      heading: 'Novation vs. Assignment vs. Change of Name',
      content: `
        <p>Not all business changes require novation. Understanding the differences is critical:</p>
        <p><strong>Novation (FAR 42.1204):</strong></p>
        <ul>
          <li>Used when there's a change in ownership or business structure</li>
          <li>Requires government consent</li>
          <li>Three-party agreement</li>
          <li>Transfers all rights and obligations</li>
        </ul>
        <p><strong>Assignment (rare in government contracting):</strong></p>
        <p>Assignment transfers rights (like payments) but not obligations. Government contracts generally prohibit assignment without novation — you can't transfer just the benefits while leaving obligations behind.</p>
        <p><strong>Change of Name Agreement (FAR 42.1205):</strong></p>
        <p>Simpler process used when:</p>
        <ul>
          <li>Company changes its name only</li>
          <li>No change in ownership or legal identity</li>
          <li>Same legal entity, different name</li>
        </ul>
        <p><strong>When to use change of name instead of novation:</strong></p>
        <ul>
          <li>DBA (doing business as) name change</li>
          <li>Rebranding without restructuring</li>
          <li>State-authorized name amendment</li>
        </ul>
        <p>Change of name agreements are faster (typically 30 days vs. 90-120 days for novation) and require less documentation.</p>
        <p><strong>Key distinction:</strong></p>
        <p>If the legal entity remains the same, use change of name. If a different legal entity assumes the contract, use novation. When in doubt, consult your legal counsel — using the wrong instrument can invalidate the transfer.</p>
      `,
    },
    {
      heading: 'When Novation Is Required',
      content: `
        <p><strong>Transactions requiring novation:</strong></p>
        <p><strong>1. Asset purchases:</strong></p>
        <p>When Company A purchases Company B's assets (including government contracts), the contracts must be novated to Company A. The contracts don't automatically transfer with the assets.</p>
        <p><strong>2. Stock purchases:</strong></p>
        <p>When Company A purchases all stock of Company B, the legal entity (Company B) remains the same — technically no novation required. However, if Company B will be merged into Company A or dissolved after purchase, novation is required.</p>
        <p><strong>3. Mergers:</strong></p>
        <p>When companies merge:</p>
        <ul>
          <li><strong>Statutory merger</strong> — One entity survives, the other dissolves (novation required)</li>
          <li><strong>Consolidation</strong> — Both entities dissolve, new entity formed (novation required)</li>
        </ul>
        <p><strong>4. Corporate spin-offs:</strong></p>
        <p>When a division is spun off into a separate company and takes its contracts, novation transfers the contracts to the new entity.</p>
        <p><strong>Transactions NOT requiring novation:</strong></p>
        <ul>
          <li>Minority ownership changes (less than 50%)</li>
          <li>Internal reorganizations without change of legal entity</li>
          <li>Change in shareholders without change in corporate structure</li>
          <li>Name changes only (use change of name agreement)</li>
        </ul>
        <p><strong>Government's discretion:</strong></p>
        <p>The government can refuse novation if:</p>
        <ul>
          <li>Transferee lacks financial capacity</li>
          <li>Transferee has poor past performance</li>
          <li>Transferee lacks technical capability</li>
          <li>Security clearances or special requirements can't transfer</li>
        </ul>
        <p>Novation isn't automatic — the government evaluates whether the successor is a responsible contractor.</p>
      `,
    },
    {
      heading: 'The Novation Process',
      content: `
        <p><strong>Step-by-step novation process:</strong></p>
        <p><strong>Step 1: Pre-transaction planning (before deal closes)</strong></p>
        <ul>
          <li>Identify all government contracts affected</li>
          <li>Review contracts for novation requirements and restrictions</li>
          <li>Notify relevant contracting officers of pending transaction</li>
          <li>Assess potential government concerns (clearances, responsibility)</li>
        </ul>
        <p><strong>Step 2: Submit novation request (within 30 days of transaction)</strong></p>
        <p>Submit to each contracting officer a novation request package including:</p>
        <ul>
          <li><strong>Cover letter</strong> explaining transaction and requesting novation</li>
          <li><strong>Proposed novation agreement</strong> (use FAR template)</li>
          <li><strong>Document of transfer</strong> (merger agreement, sale agreement, etc.)</li>
          <li><strong>Opinion of counsel</strong> confirming legal authority</li>
          <li><strong>Financial statements</strong> of transferee</li>
          <li><strong>List of affected contracts</strong></li>
          <li><strong>UEI/CAGE code</strong> information for transferee</li>
        </ul>
        <p><strong>Step 3: Government review (30-90 days)</strong></p>
        <p>Contracting officers will:</p>
        <ul>
          <li>Review submission for completeness</li>
          <li>Evaluate transferee's responsibility (financial capacity, past performance)</li>
          <li>Verify transferee's representations and certifications</li>
          <li>Coordinate with legal counsel and program office</li>
          <li>Request additional information if needed</li>
        </ul>
        <p><strong>Step 4: Execution (once approved)</strong></p>
        <p>Contracting officer signs novation agreement, completing the transfer. Typically one novation agreement covers all contracts with that agency (not one per contract).</p>
        <p><strong>Step 5: Post-novation updates</strong></p>
        <ul>
          <li>Update SAM.gov registration with new entity information</li>
          <li>Update CAGE code if new entity has different code</li>
          <li>Update contract files and systems</li>
          <li>Notify subcontractors and teaming partners</li>
        </ul>
        <p><strong>Timing considerations:</strong></p>
        <p>Novation can take 90-120 days or longer. During this period:</p>
        <ul>
          <li>Continue performance under existing contracts</li>
          <li>Transferor remains legally liable until novation executes</li>
          <li>Payment may be delayed if government holds pending novation</li>
        </ul>
        <p>Plan for this gap. Don't assume instant transfer on closing date.</p>
      `,
    },
    {
      heading: 'Required Documentation',
      content: `
        <p><strong>Core documents for novation request:</strong></p>
        <p><strong>1. Novation agreement (use FAR format):</strong></p>
        <p>The novation agreement itself must follow the template in FAR 42.1204(i). Key provisions:</p>
        <ul>
          <li>Identification of all parties</li>
          <li>Description of transaction (merger, acquisition, etc.)</li>
          <li>List of contracts being transferred (or statement covering all contracts)</li>
          <li>Transferor's representation that it transferred all assets</li>
          <li>Transferee's assumption of all obligations</li>
          <li>Transferee's ratification of previous performance</li>
          <li>Government's release of transferor and acceptance of transferee</li>
        </ul>
        <p><strong>2. Document evidencing the transfer:</strong></p>
        <ul>
          <li><strong>Merger:</strong> Certificate of merger from the state</li>
          <li><strong>Asset sale:</strong> Asset purchase agreement (may be redacted)</li>
          <li><strong>Stock sale:</strong> Stock purchase agreement or evidence of stock transfer</li>
        </ul>
        <p><strong>3. Opinion of transferee's legal counsel:</strong></p>
        <p>Attorney opinion stating:</p>
        <ul>
          <li>Transaction was validly executed under applicable law</li>
          <li>Transferee has legal authority to assume contracts</li>
          <li>All necessary corporate approvals obtained</li>
          <li>No legal impediments to performance</li>
        </ul>
        <p><strong>4. Financial information:</strong></p>
        <ul>
          <li>Transferee's latest audited financial statements</li>
          <li>Balance sheet and income statement</li>
          <li>Evidence of financial capacity to perform</li>
        </ul>
        <p><strong>5. List of contracts:</strong></p>
        <p>Spreadsheet identifying each contract to be novated:</p>
        <ul>
          <li>Contract number</li>
          <li>Contracting office</li>
          <li>Contract value</li>
          <li>Period of performance</li>
        </ul>
        <p><strong>6. SAM.gov information:</strong></p>
        <ul>
          <li>Transferee's UEI (Unique Entity Identifier)</li>
          <li>CAGE code</li>
          <li>SAM registration status</li>
          <li>Representations and certifications</li>
        </ul>
        <p><strong>Additional documents (if applicable):</strong></p>
        <ul>
          <li>DD Form 2345 (Militarily Critical Technical Data Agreement)</li>
          <li>Security clearance information (facility clearance)</li>
          <li>Small business status documentation (if claiming set-aside eligibility)</li>
          <li>Consent of surety (if performance bonds involved)</li>
        </ul>
      `,
    },
    {
      heading: 'Common Novation Issues and Pitfalls',
      content: `
        <p><strong>Timing problems:</strong></p>
        <p><strong>Late submission:</strong> Submitting novation request months after transaction closes raises red flags. Government expects prompt notification (within 30 days). Late requests may face additional scrutiny.</p>
        <p><strong>Performing before approval:</strong> Don't assume novation is automatic. Until the government signs, the original contractor remains liable. New entity performing without novation creates payment and liability issues.</p>
        <p><strong>Small business status issues:</strong></p>
        <p><strong>Loss of set-aside eligibility:</strong> If a small business is acquired by a large business, set-aside contracts may be affected. FAR limits on novation for small business set-asides (FAR 19.301-2):</p>
        <ul>
          <li>Government may require recompetition if more than 50% of contract remains</li>
          <li>SBA must approve novation in some cases</li>
          <li>Size determinations may need to be revisited</li>
        </ul>
        <p><strong>Security clearances and facility approvals:</strong></p>
        <p>If contracts require facility security clearances (FCL), transferee must have equivalent clearances. Obtaining new FCL can take months. Don't assume transferee's general clearance covers specific contracts.</p>
        <p><strong>Subcontractor consent:</strong></p>
        <p>Some subcontracts include "consent to assignment" clauses. Ensure subcontractors are notified and consent is obtained where required. Failure to do so may create subcontract disputes.</p>
        <p><strong>Incomplete documentation:</strong></p>
        <ul>
          <li>Missing legal opinion (common error)</li>
          <li>Outdated financial statements (must be recent)</li>
          <li>Incomplete contract lists (omitting task orders or mods)</li>
          <li>Unsigned novation agreement (all parties must sign)</li>
        </ul>
        <p><strong>Multiple agencies:</strong></p>
        <p>If contracts span multiple agencies, each agency's contracting officers must execute novation agreements. One agency's approval doesn't bind others. Track each agency separately.</p>
        <p><strong>Payment issues during transition:</strong></p>
        <ul>
          <li>Government may hold payment pending novation approval</li>
          <li>Banking/payment information must be updated</li>
          <li>Tax ID changes require new payment registration</li>
        </ul>
        <p>Coordinate with finance teams to avoid payment disruptions.</p>
      `,
    },
    {
      heading: 'Government Approval Considerations',
      content: `
        <p><strong>What the government evaluates:</strong></p>
        <p><strong>1. Transferee responsibility:</strong></p>
        <p>The government must determine the transferee is a responsible contractor under FAR 9.104:</p>
        <ul>
          <li><strong>Adequate financial resources</strong> — Can they perform?</li>
          <li><strong>Technical capacity</strong> — Do they have skills/facilities/equipment?</li>
          <li><strong>Past performance</strong> — What's their track record?</li>
          <li><strong>Integrity and ethics</strong> — Are they in SAM exclusions? Any debarment?</li>
          <li><strong>Necessary certifications</strong> — Security clearances, licenses, etc.</li>
        </ul>
        <p><strong>2. Continuity of performance:</strong></p>
        <p>Government wants assurance that:</p>
        <ul>
          <li>Current work will continue uninterrupted</li>
          <li>Key personnel will remain in place</li>
          <li>No degradation in quality or schedule</li>
        </ul>
        <p><strong>3. Set-aside compliance:</strong></p>
        <p>For contracts set aside for small businesses or socioeconomic categories, government evaluates:</p>
        <ul>
          <li>Does transferee maintain eligibility?</li>
          <li>If not, can novation proceed under exceptions?</li>
          <li>Does percentage of contract remaining warrant recompetition?</li>
        </ul>
        <p><strong>When government may deny novation:</strong></p>
        <ul>
          <li>Transferee is not responsible (failed financial/technical/past performance review)</li>
          <li>Loss of small business status on set-aside with >50% remaining</li>
          <li>Security clearances can't transfer</li>
          <li>Transferee is debarred or suspended</li>
          <li>Transaction is structured to avoid competition (sham transaction)</li>
        </ul>
        <p><strong>Negotiating with the government:</strong></p>
        <p>If government raises concerns, you can:</p>
        <ul>
          <li>Provide additional financial assurances (bonding, letters of credit)</li>
          <li>Offer key personnel retention guarantees</li>
          <li>Provide past performance from affiliated entities</li>
          <li>Address specific concerns raised by program office</li>
        </ul>
        <p><strong>If novation is denied:</strong></p>
        <ul>
          <li>Original contractor must continue performance or face default</li>
          <li>Contracts may be terminated for convenience</li>
          <li>Transaction may need restructuring (keep contracts in separate subsidiary)</li>
        </ul>
      `,
    },
    {
      heading: 'Best Practices for Smooth Novation',
      content: `
        <p><strong>1. Plan early (before M&A closes):</strong></p>
        <ul>
          <li>Identify government contracts in due diligence</li>
          <li>Review contracts for novation restrictions</li>
          <li>Engage government early (informal heads-up before formal request)</li>
          <li>Assess responsibility concerns and address proactively</li>
        </ul>
        <p><strong>2. Prepare complete packages:</strong></p>
        <ul>
          <li>Use FAR templates (don't invent new formats)</li>
          <li>Include all required documents upfront</li>
          <li>Anticipate questions and provide explanatory materials</li>
          <li>Have legal counsel review before submission</li>
        </ul>
        <p><strong>3. Communicate proactively:</strong></p>
        <ul>
          <li>Notify contracting officers promptly (within 30 days of closing)</li>
          <li>Provide transaction overview and timeline</li>
          <li>Designate single point of contact for novation questions</li>
          <li>Follow up regularly on status</li>
        </ul>
        <p><strong>4. Coordinate across agencies:</strong></p>
        <ul>
          <li>Track novation status by agency/contracting office</li>
          <li>Tailor approach to each agency's requirements</li>
          <li>Some agencies have streamlined novation processes — use them</li>
        </ul>
        <p><strong>5. Maintain continuity during transition:</strong></p>
        <ul>
          <li>Keep contract teams intact</li>
          <li>Maintain quality of performance</li>
          <li>Brief government customers on transition plan</li>
          <li>Minimize disruption to ongoing work</li>
        </ul>
        <p><strong>6. Update all systems post-novation:</strong></p>
        <ul>
          <li>SAM.gov registration (critical for payment)</li>
          <li>Banking information in government systems</li>
          <li>Contract files and documentation</li>
          <li>Subcontractor notifications</li>
        </ul>
        <p><strong>7. Preserve records:</strong></p>
        <ul>
          <li>Original contractor's records must transfer to successor</li>
          <li>Government may audit pre-novation performance</li>
          <li>Maintain complete file including pre-transaction documentation</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'How long does novation take?',
      answer:
        'Typically 90-120 days from submission to execution, but can be faster (30-60 days) if documentation is complete and no complications arise, or longer (6+ months) for complex transactions or if government raises responsibility concerns. Plan for delays and don\'t assume instant transfer.',
    },
    {
      question: 'Can I perform on contracts before novation is approved?',
      answer:
        'Performance can continue during novation review, but the original contractor remains legally responsible until novation executes. The new entity should not invoice or receive payment until novation is complete. Coordinate payment arrangements with government to avoid disruption.',
    },
    {
      question: 'What happens if the government denies novation?',
      answer:
        'If denied, the original contractor remains obligated to perform. The transaction parties may need to restructure (e.g., keep contracts in a separate subsidiary), provide additional assurances, or the government may terminate contracts for convenience. Denial is rare but possible if transferee is not responsible.',
    },
    {
      question: 'Do I need separate novation for each contract?',
      answer:
        'No. One novation agreement can cover all contracts with a given agency or contracting office. The agreement typically includes language like "all contracts, including those awarded in the future, until this agreement is terminated." However, each agency must execute its own novation.',
    },
    {
      question: 'What\'s the difference between novation and change of name agreement?',
      answer:
        'Novation is used when there\'s a change in ownership or legal entity (merger, acquisition). Change of name is used when the same legal entity changes its name only (no ownership change). Change of name is faster and requires less documentation. Use the wrong one and the transfer may be invalid.',
    },
    {
      question: 'Does novation affect small business set-aside contracts?',
      answer:
        'Yes. If a small business is acquired by a large business, set-aside contracts may be affected. If more than 50% of the contract period remains, the government may require recompetition rather than novation (FAR 19.301-2). SBA approval may be required. Address this early in M&A due diligence.',
    },
    {
      question: 'Can task orders under IDIQ contracts be novated separately?',
      answer:
        'No. Novation typically covers the master IDIQ contract and all task orders under it. You cannot selectively novate individual task orders while leaving others with the original contractor. The government evaluates the entire contractual relationship.',
    },
    {
      question: 'What if my company is acquired by a foreign entity?',
      answer:
        'Foreign ownership can complicate novation, especially for classified or sensitive contracts. Issues include FOCI (Foreign Ownership, Control, or Influence) mitigation, facility security clearances, and potential restrictions on foreign contractor performance. Consult with DCSA and contracting officers early in such transactions.',
    },
  ],
  cta: {
    heading: 'Navigate M&A Transitions Successfully',
    description:
      'Novation is complex but manageable with proper planning. Our consulting team helps buyers and sellers structure transactions, prepare novation packages, and coordinate government approvals to ensure contract continuity.',
    buttonText: 'Get M&A Support',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'contract-modifications',
    'sam-gov-registration',
    'government-contract-law',
    'contract-closeout',
    'far-overview',
  ],
  publishedDate: '2026-04-07',
};
