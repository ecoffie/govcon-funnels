import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'ratification',
  title: 'Ratification of Unauthorized Commitments: When Government Employees Make Binding Promises',
  metaTitle: 'Ratification Guide — Unauthorized Commitments in Government Contracts',
  metaDescription:
    'Learn how ratification works when government employees without authority promise work or payment. Process, requirements, risks, and how to avoid unauthorized commitments.',
  keywords: [
    'ratification',
    'unauthorized commitment',
    'government contract ratification',
    'contracting officer authority',
    'unauthorized work',
    'ratification process',
    'cor authority',
    'warranted contracting officer',
    'ratification approval',
    'government contract authority',
  ],
  heroSubtitle:
    'Not all government employees can commit the government to pay. When unauthorized personnel direct work, ratification may validate the commitment — or you may never get paid. Know the rules.',
  sections: [
    {
      heading: 'What Is Ratification?',
      content: `
        <p><strong>Ratification</strong> is the act of approving an unauthorized commitment by a government employee who lacked contracting authority. It's a legal mechanism to make valid a commitment that was invalid when made.</p>
        <p><strong>The fundamental rule:</strong></p>
        <p>Only a <strong>warranted contracting officer</strong> can legally commit the government to a contract. When anyone else promises work or payment, it's an "unauthorized commitment" — and technically, you can perform the work and never be paid.</p>
        <p><strong>What is an unauthorized commitment?</strong></p>
        <ul>
          <li>A program manager verbally agrees to additional work outside contract scope</li>
          <li>A COR (Contracting Officer's Representative) signs a change order</li>
          <li>A technical lead directs work without a contract modification</li>
          <li>An agency employee promises payment without CO involvement</li>
        </ul>
        <p>These individuals may have technical authority but lack <strong>contracting authority</strong> — only the CO can bind the government.</p>
        <p><strong>Why ratification exists:</strong></p>
        <p>Without ratification, the government couldn't pay for work performed under unauthorized commitments, even if the work was necessary, properly performed, and beneficial. Ratification allows the CO to retroactively validate the commitment.</p>
        <p><strong>The catch:</strong></p>
        <p>Ratification is discretionary. The government can refuse to ratify — leaving you unpaid for work performed. This is why understanding who can authorize work is critical.</p>
      `,
    },
    {
      heading: 'When Ratification Is Required',
      content: `
        <p><strong>Situations requiring ratification:</strong></p>
        <p><strong>1. Work directed by unauthorized personnel:</strong></p>
        <ul>
          <li>COR directs scope change or additional work</li>
          <li>Program manager commits to deliverables not in SOW</li>
          <li>Technical monitor approves costs without CO authorization</li>
        </ul>
        <p><strong>2. Exceeding delegated authority limits:</strong></p>
        <ul>
          <li>COR approves modification exceeding their delegated ceiling</li>
          <li>Junior CO exceeds their warrant authority (e.g., $500K warrant, $1M commitment)</li>
          <li>Contracting officer exceeds their specific contract authority</li>
        </ul>
        <p><strong>3. Work performed before contract execution:</strong></p>
        <ul>
          <li>Agency requests work to start before contract is signed</li>
          <li>Letter of intent mistakenly treated as binding contract</li>
          <li>Emergency work performed before proper authorization</li>
        </ul>
        <p><strong>4. Defective contract actions:</strong></p>
        <ul>
          <li>Contract signed by employee lacking authority</li>
          <li>Required approvals missing (legal, competition advocate)</li>
          <li>Procurement violated FAR procedures materially</li>
        </ul>
        <p><strong>Red flags you're dealing with unauthorized commitment:</strong></p>
        <ul>
          <li>Direction comes from someone other than CO</li>
          <li>No contract modification or task order issued</li>
          <li>Request is verbal only (no written authorization)</li>
          <li>Signer's title isn't "Contracting Officer"</li>
          <li>Work exceeds contract scope without mod</li>
        </ul>
        <p><strong>What's NOT an unauthorized commitment:</strong></p>
        <ul>
          <li>COR technical direction within existing contract scope</li>
          <li>Program manager requesting deliverables already in SOW</li>
          <li>Minor administrative changes not affecting price/schedule</li>
        </ul>
        <p>CORs can direct technical aspects of performance — just not changes to contract terms, scope, price, or schedule.</p>
      `,
    },
    {
      heading: 'The Ratification Process (FAR 1.602-3)',
      content: `
        <p><strong>Who can ratify:</strong></p>
        <p>Only the head of the contracting activity (HCA) or a higher official can ratify unauthorized commitments. Regular contracting officers cannot ratify — it requires senior approval.</p>
        <p><strong>Ratification requirements (all must be met):</strong></p>
        <p>FAR 1.602-3(c) sets strict requirements. Ratification is only proper if:</p>
        <ol>
          <li><strong>Supplies or services were provided to the government</strong> — Actual performance occurred</li>
          <li><strong>Ratifying official had authority at the time</strong> — Official now ratifying could have authorized originally</li>
          <li><strong>Resulting contract would be proper</strong> — If done correctly, would comply with FAR</li>
          <li><strong>Contracting officer recommends payment</strong> — CO determines price is fair and reasonable</li>
          <li><strong>Funds are available</strong> — Appropriation is available and not expired</li>
          <li><strong>Ratification is in the government's interest</strong> — Work was necessary and beneficial</li>
          <li><strong>Contractor acted in good faith</strong> — Contractor didn't induce unauthorized commitment</li>
        </ol>
        <p>If any requirement is not met, ratification should be denied.</p>
        <p><strong>The ratification package:</strong></p>
        <p>The contracting officer prepares a ratification package for HCA approval:</p>
        <ul>
          <li><strong>Ratification memorandum</strong> — Explaining the unauthorized commitment and recommending ratification</li>
          <li><strong>Justification</strong> — Why the work was necessary and in government's interest</li>
          <li><strong>Statement of facts</strong> — What happened, who authorized, when performed</li>
          <li><strong>Legal review</strong> — Agency counsel opinion on propriety of ratification</li>
          <li><strong>Price analysis</strong> — Demonstrating price is fair and reasonable</li>
          <li><strong>Funds certification</strong> — Confirming funds available</li>
          <li><strong>Contractor invoice/documentation</strong> — Evidence of work performed and costs</li>
        </ul>
        <p><strong>Timeline:</strong></p>
        <p>Ratification can take 60-180 days or longer. Senior officials are busy, legal review is thorough, and the process isn't fast. Don't expect quick payment on ratification requests.</p>
        <p><strong>Approval or denial:</strong></p>
        <ul>
          <li><strong>If approved:</strong> CO issues contract or modification formalizing the commitment; payment proceeds</li>
          <li><strong>If denied:</strong> No contract exists; contractor has no legal claim for payment under contract law (though may pursue quantum meruit or other remedies)</li>
        </ul>
      `,
    },
    {
      heading: 'Risks of Unauthorized Commitments',
      content: `
        <p><strong>For contractors:</strong></p>
        <p><strong>1. Non-payment risk:</strong></p>
        <p>If ratification is denied, you may never be paid. Even if ratification is approved, you'll wait months without payment while the package is processed.</p>
        <p><strong>2. Legal uncertainty:</strong></p>
        <p>Until ratified, you have no enforceable contract. You can't pursue contract remedies (claims, disputes, appeals) for unauthorized work.</p>
        <p><strong>3. Reputational damage:</strong></p>
        <p>Being party to unauthorized commitments can harm your reputation, even if you weren't at fault. Agencies may view you as someone who performs without proper authority.</p>
        <p><strong>4. Disincentive to future business:</strong></p>
        <p>COs may avoid working with contractors who have history of unauthorized commitments — even if the contractor was the victim, not the instigator.</p>
        <p><strong>For government employees:</strong></p>
        <p><strong>1. Personal liability:</strong></p>
        <p>Government employees who make unauthorized commitments can be personally liable for the amount (Anti-Deficiency Act violations). This is serious — potential fines, suspension, or termination.</p>
        <p><strong>2. Disciplinary action:</strong></p>
        <p>Making unauthorized commitments violates agency policy and procurement law. Employees can face discipline ranging from reprimand to removal.</p>
        <p><strong>3. Criminal penalties:</strong></p>
        <p>Intentional unauthorized commitments can be criminal violations of the Anti-Deficiency Act (31 U.S.C. 1341) — fines up to $5,000 and/or 2 years imprisonment.</p>
        <p><strong>For the government agency:</strong></p>
        <ul>
          <li>Violation of appropriations law</li>
          <li>Audit findings and corrective action requirements</li>
          <li>Waste of funds if work wasn't properly competed</li>
          <li>Potential GAO/IG investigations</li>
        </ul>
        <p><strong>The bottom line:</strong></p>
        <p>Unauthorized commitments hurt everyone. They're avoidable with proper procedures. Don't accept them as "normal" in your customer relationships.</p>
      `,
    },
    {
      heading: 'Avoiding Unauthorized Commitments',
      content: `
        <p><strong>Contractor best practices:</strong></p>
        <p><strong>1. Know who has authority:</strong></p>
        <ul>
          <li>Ask for the contracting officer's name and contact information</li>
          <li>Verify that person is the warranted CO for your contract</li>
          <li>Understand the COR's delegated authority and limitations</li>
          <li>Don't assume program managers or technical leads can authorize changes</li>
        </ul>
        <p><strong>2. Get everything in writing:</strong></p>
        <ul>
          <li>Never accept verbal authorization for changes</li>
          <li>Require written modification signed by CO</li>
          <li>If someone other than CO directs work, ask them to coordinate with CO</li>
          <li>Document all requests and your response</li>
        </ul>
        <p><strong>3. Push back professionally:</strong></p>
        <p>When a COR or program manager directs out-of-scope work:</p>
        <ul>
          <li>"I'd be happy to help, but this appears to be outside our current contract scope. Can we get the contracting officer involved to issue a modification?"</li>
          <li>"My understanding is that only the CO can authorize changes to scope or price. Let's coordinate with [CO name] to make this official."</li>
          <li>Provide written notice: "We received a request for [work]. We believe this requires a contract modification. Please advise."</li>
        </ul>
        <p><strong>4. Don't enable unauthorized commitments:</strong></p>
        <ul>
          <li>Don't perform work you know is unauthorized hoping for later ratification</li>
          <li>Don't encourage government employees to "work around" the CO</li>
          <li>Don't invoice for unauthorized work as if it were authorized</li>
        </ul>
        <p><strong>5. Understand COR delegation letters:</strong></p>
        <p>CORs receive formal delegation letters specifying their authority. Ask to see the letter. It will define what the COR can and cannot approve.</p>
        <p><strong>Government best practices:</strong></p>
        <p><strong>For contracting officers:</strong></p>
        <ul>
          <li>Educate program staff on contracting authority limits</li>
          <li>Make yourself accessible for modification requests</li>
          <li>Delegate COR authority clearly with written limits</li>
          <li>Process modifications promptly to reduce pressure for workarounds</li>
        </ul>
        <p><strong>For CORs and program managers:</strong></p>
        <ul>
          <li>Know your delegation limits and stay within them</li>
          <li>Route all scope/price/schedule changes through the CO</li>
          <li>Don't pressure contractors to perform without proper authority</li>
          <li>When emergencies arise, call the CO — don't improvise</li>
        </ul>
      `,
    },
    {
      heading: 'What to Do If You Receive an Unauthorized Direction',
      content: `
        <p><strong>Step-by-step response:</strong></p>
        <p><strong>Step 1: Identify the issue</strong></p>
        <p>Recognize when direction comes from someone without authority or exceeds contract scope without a modification.</p>
        <p><strong>Step 2: Document the request</strong></p>
        <ul>
          <li>Confirm request in writing (email to person who made request)</li>
          <li>Summarize what was requested, when, by whom</li>
          <li>Keep copy for your files</li>
        </ul>
        <p><strong>Step 3: Notify the contracting officer</strong></p>
        <p>Send written notice to the CO:</p>
        <ul>
          <li>"We received a request from [person] to [perform work]. This appears to be outside our current contract scope."</li>
          <li>"We're prepared to perform this work if authorized by contract modification."</li>
          <li>"Please advise on how to proceed."</li>
        </ul>
        <p><strong>Step 4: Don't perform until authorized</strong></p>
        <p>Unless it's a true emergency affecting safety or critical operations, wait for proper authorization before performing.</p>
        <p><strong>Step 5: If pressured to perform:</strong></p>
        <ul>
          <li>Politely but firmly decline: "I'd like to help, but I need authorization from the contracting officer first."</li>
          <li>Suggest the requester contact the CO directly</li>
          <li>Don't be intimidated by rank or urgency claims — protect yourself</li>
        </ul>
        <p><strong>Emergency situations:</strong></p>
        <p>In genuine emergencies (safety, national security, critical system failure), use judgment. You may need to perform to prevent harm. But:</p>
        <ul>
          <li>Notify CO immediately (same day)</li>
          <li>Document emergency circumstances thoroughly</li>
          <li>Limit work to minimum necessary</li>
          <li>Request ratification promptly</li>
          <li>Understand you're taking a risk — ratification isn't guaranteed</li>
        </ul>
        <p><strong>After performing unauthorized work:</strong></p>
        <p>If you've already performed work under unauthorized commitment:</p>
        <ol>
          <li><strong>Stop further work</strong> until authorized</li>
          <li><strong>Notify CO in writing</strong> of what occurred</li>
          <li><strong>Segregate costs</strong> for unauthorized work</li>
          <li><strong>Prepare documentation</strong> (invoices, timesheets, deliverables)</li>
          <li><strong>Submit ratification request</strong> (if CO doesn't initiate)</li>
          <li><strong>Wait for ratification</strong> before invoicing</li>
        </ol>
        <p>Don't invoice unauthorized work as part of regular contract invoices — that can look like you're trying to hide it.</p>
      `,
    },
    {
      heading: 'Quantum Meruit and Other Remedies',
      content: `
        <p><strong>If ratification is denied:</strong></p>
        <p>You performed work in good faith, but the government refuses to ratify. Do you have any recourse?</p>
        <p><strong>Quantum meruit:</strong></p>
        <p><strong>Quantum meruit</strong> ("as much as deserved") is an equitable remedy for work performed where no valid contract exists. If ratification is denied, you may be able to recover under quantum meruit by proving:</p>
        <ul>
          <li>You provided valuable services to the government</li>
          <li>Government accepted and used those services</li>
          <li>You expected compensation</li>
          <li>Government would be unjustly enriched if not required to pay</li>
        </ul>
        <p><strong>Limitations on quantum meruit:</strong></p>
        <ul>
          <li>Recovery limited to fair value of work, not necessarily your costs or contract price</li>
          <li>No recovery for profit — only reasonable value</li>
          <li>Difficult to prove if you knowingly performed unauthorized work</li>
          <li>Government can raise defenses (appropriations law, statute of limitations)</li>
        </ul>
        <p><strong>Other potential remedies:</strong></p>
        <p><strong>Contract Disputes Act claim:</strong> Generally not available for unauthorized commitments (no valid contract to dispute), but may be argued if government's actions created a constructive change.</p>
        <p><strong>Court of Federal Claims:</strong> Jurisdiction to hear quantum meruit claims against the government. Litigation is expensive and time-consuming — often not worth it for small amounts.</p>
        <p><strong>Congressional relief:</strong> In rare cases, contractors have sought private bills from Congress authorizing payment. This is extraordinarily rare and requires compelling circumstances.</p>
        <p><strong>The harsh reality:</strong></p>
        <p>Even with these remedies, recovery is uncertain, slow, and expensive. The best strategy is prevention — don't perform unauthorized work in the first place.</p>
        <p><strong>Negotiated settlement:</strong></p>
        <p>Sometimes agencies will negotiate a settlement even if ratification is denied — paying a reduced amount to avoid litigation or bad publicity. This is agency discretion, not a legal right.</p>
      `,
    },
    {
      heading: 'Special Situations: Emergency Acquisitions',
      content: `
        <p><strong>Emergency ratifications:</strong></p>
        <p>True emergencies (natural disasters, urgent national security threats, immediate safety hazards) may justify unauthorized work followed by ratification. But "emergency" is narrowly defined.</p>
        <p><strong>What qualifies as emergency:</strong></p>
        <ul>
          <li>Immediate threat to life, health, or safety</li>
          <li>Urgent operational necessity (military operations, critical infrastructure)</li>
          <li>Disaster response where normal procedures impossible</li>
        </ul>
        <p><strong>What doesn't qualify:</strong></p>
        <ul>
          <li>Poor planning or late realization of need</li>
          <li>Convenience or speed preference</li>
          <li>Budget pressures or end-of-year spending</li>
          <li>Contractor's cash flow problems</li>
        </ul>
        <p><strong>Emergency acquisition procedures (FAR 18):</strong></p>
        <p>FAR Part 18 provides streamlined procedures for emergency acquisitions. Even in emergencies, proper contracting authority is required — but procedures are faster and more flexible.</p>
        <p><strong>Better approach than unauthorized commitment:</strong></p>
        <p>Use emergency acquisition authority properly rather than unauthorized commitments followed by ratification. Emergency doesn't excuse contracting officer involvement — it just accelerates the process.</p>
        <p><strong>Documenting emergency ratifications:</strong></p>
        <p>If emergency work is performed and ratified, documentation must clearly establish:</p>
        <ul>
          <li>Nature of the emergency</li>
          <li>Why normal procedures couldn't be followed</li>
          <li>Who authorized and when</li>
          <li>Efforts to obtain proper authority</li>
        </ul>
        <p>Weak emergency justifications will result in ratification denial and potential employee liability.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Can a COR authorize contract changes?',
      answer:
        'No. CORs (Contracting Officer\'s Representatives) can provide technical direction within the existing contract scope, but cannot change contract terms, price, schedule, or scope. Only the warranted contracting officer has authority to modify contracts. Always verify COR delegation letters to understand their specific authorities.',
    },
    {
      question: 'What should I do if my customer asks me to start work before the contract is signed?',
      answer:
        'Politely decline and explain you need a signed contract or modification before beginning. If they claim urgency, ask them to contact the contracting officer to expedite. Don\'t risk performing work you may never be paid for. Verbal promises and letters of intent are not binding contracts.',
    },
    {
      question: 'How long does ratification take?',
      answer:
        'Typically 60-180 days, sometimes longer. Ratification requires senior approval (head of contracting activity), legal review, price analysis, and documentation. It\'s not a fast process. Budget for significant payment delay if you\'re relying on ratification.',
    },
    {
      question: 'Can I recover my costs if ratification is denied?',
      answer:
        'Possibly, but it\'s difficult. You may pursue quantum meruit (equitable remedy for unjust enrichment) in Court of Federal Claims, but success is uncertain, recovery is limited to fair value (no profit), and litigation is expensive. Prevention is far better than trying to recover after the fact.',
    },
    {
      question: 'What happens to the government employee who made an unauthorized commitment?',
      answer:
        'They may face disciplinary action (reprimand to termination), potential personal liability for the amount committed (Anti-Deficiency Act), and in severe cases, criminal penalties (fines up to $5,000, imprisonment up to 2 years). This is serious for them — which is why you should help them avoid it by insisting on proper authority.',
    },
    {
      question: 'Is ratification guaranteed if all requirements are met?',
      answer:
        'No. Ratification is discretionary even if all FAR 1.602-3 requirements are met. The ratifying official has discretion to deny based on policy concerns, precedent, or other factors. Never assume ratification will be approved — it\'s a remedy of last resort, not a workaround for proper procedures.',
    },
    {
      question: 'Can I invoice for unauthorized work while waiting for ratification?',
      answer:
        'No. Don\'t invoice unauthorized work until ratification is approved and a contract or modification is executed. Invoicing unauthorized work as if it were authorized can create legal problems and appears to be hiding the issue. Wait for formal authorization.',
    },
    {
      question: 'What if the unauthorized commitment was made by a very senior official?',
      answer:
        'Rank doesn\'t grant contracting authority. Even a Cabinet secretary or general officer can\'t bind the government without a warrant. If a senior official directs work, respectfully explain you need the contracting officer to formalize it. Most senior officials will understand and appreciate your protecting them from violating procurement law.',
    },
  ],
  cta: {
    heading: 'Protect Yourself from Unauthorized Commitments',
    description:
      'Understanding contracting authority prevents costly mistakes. Our training helps contractors and government employees recognize and avoid unauthorized commitments before they become problems.',
    buttonText: 'Learn More',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'contract-modifications',
    'far-overview',
    'government-contract-law',
    'contract-disputes',
    'change-orders',
  ],
  publishedDate: '2026-04-07',
};
