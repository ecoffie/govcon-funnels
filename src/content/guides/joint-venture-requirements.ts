import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'joint-venture-requirements',
  title: 'Joint Venture Requirements for Government Contracts: Rules, Structure & Compliance',
  metaTitle: 'Joint Venture Requirements [2026] — Small Business JV Rules & Compliance',
  metaDescription:
    'Learn joint venture requirements for government contracts: SBA rules, ownership structure, work share requirements, affiliation rules, and how to form a compliant JV for set-aside contracts.',
  keywords: [
    'joint venture requirements',
    'government contract joint venture',
    'small business joint venture',
    'jv requirements',
    'sba joint venture rules',
    'joint venture affiliation',
    'joint venture work share',
    'unpopulated joint venture',
    'populated joint venture',
    'jv compliance',
  ],
  heroSubtitle:
    'Joint ventures let small businesses combine capabilities to pursue larger contracts. But JVs for government contracts have specific rules — get them wrong, and you risk losing contracts, certifications, or worse.',
  sections: [
    {
      heading: 'What Is a Joint Venture in Government Contracting?',
      content: `
        <p>A <strong>joint venture (JV)</strong> is a formal business arrangement where two or more companies combine resources to pursue and perform government contracts. In federal contracting, JVs are commonly used by small businesses to access larger opportunities.</p>
        <p><strong>Why form a joint venture?</strong></p>
        <ul>
          <li><strong>Combine capabilities</strong> — Pool technical expertise, past performance, and resources</li>
          <li><strong>Access larger contracts</strong> — Pursue opportunities too large for one party alone</li>
          <li><strong>Maintain small business status</strong> — Properly structured JVs can qualify for set-asides</li>
          <li><strong>Share risk</strong> — Spread financial and performance risk across parties</li>
        </ul>
        <p><strong>JV vs. subcontracting vs. teaming:</strong></p>
        <p><strong>Subcontracting:</strong> One company is prime, the other is sub. Prime has full responsibility to the government.</p>
        <p><strong>Teaming agreement:</strong> Companies agree to pursue an opportunity together before award. Structure determined later.</p>
        <p><strong>Joint venture:</strong> A separate legal entity that bids and performs contracts. Both parties share responsibility.</p>
        <p>JVs offer more flexibility than subcontracting (partners share decisions) but require more structure than teaming agreements. The SBA has specific rules about how JVs must be organized to qualify for small business set-asides.</p>
      `,
    },
    {
      heading: 'Types of Joint Ventures',
      content: `
        <p><strong>By size status:</strong></p>
        <p><strong>Small business JV:</strong> Two small businesses joining forces. JV qualifies as small if it meets SBA size rules.</p>
        <p><strong>Mentor-protégé JV:</strong> Approved under the <a href="/guides/mentor-protege-program">SBA Mentor-Protégé Program</a>. JV size is based on protégé alone, even if mentor is large. Most powerful structure for small businesses.</p>
        <p><strong>Large-small teaming:</strong> Not technically a JV for set-aside purposes, but large and small businesses can team on full-and-open competitions.</p>
        <p><strong>By structure:</strong></p>
        <p><strong>Unpopulated JV:</strong> The JV has no employees. Work is performed by employees of the member companies who are assigned to the JV. Most common structure — easier to manage, lower overhead.</p>
        <p><strong>Populated JV:</strong> The JV has its own employees on payroll. More complex to administer but may be required for certain long-term contracts or when the JV will operate as an ongoing business.</p>
        <p><strong>By duration:</strong></p>
        <p><strong>Contract-specific JV:</strong> Formed for a single procurement. Dissolves after contract completion.</p>
        <p><strong>Ongoing JV:</strong> Formed to pursue multiple contracts over time. May be required for IDIQ vehicles where the JV will compete for multiple task orders.</p>
      `,
    },
    {
      heading: 'Ownership and Control Requirements',
      content: `
        <p>For a JV to qualify for small business set-asides, SBA has specific ownership and control requirements.</p>
        <p><strong>For small business set-asides:</strong></p>
        <ul>
          <li>Each JV member must independently qualify as small</li>
          <li>JV agreement must specify responsibilities of each party</li>
          <li>JV must comply with work share requirements (see below)</li>
        </ul>
        <p><strong>For 8(a), SDVOSB, WOSB, or HUBZone set-asides:</strong></p>
        <ul>
          <li>The certified firm must own at least <strong>51% of the JV</strong></li>
          <li>The certified firm must <strong>control the JV</strong> — including managing member/officer positions</li>
          <li>The certified firm's personnel must hold <strong>project manager</strong> role on JV contracts</li>
          <li>The certified firm must receive <strong>profits commensurate with work performed</strong></li>
        </ul>
        <p><strong>For mentor-protégé JVs:</strong></p>
        <ul>
          <li>Protégé must own at least <strong>51%</strong></li>
          <li>Protégé must control JV decision-making</li>
          <li>Protégé's personnel must serve as project manager</li>
          <li>JV size is based on protégé's size alone (mentor can be large business)</li>
        </ul>
        <p><strong>Operating agreement requirements:</strong></p>
        <p>The JV operating agreement must include specific provisions required by SBA regulations, including management structure, profit distribution, work allocation, and dissolution procedures.</p>
      `,
    },
    {
      heading: 'Work Share Requirements',
      content: `
        <p>SBA requires that the small business member(s) perform a minimum percentage of the work on JV contracts. This prevents "pass-through" arrangements where small businesses just front for large contractors.</p>
        <p><strong>General small business JVs:</strong></p>
        <ul>
          <li>Small business members must perform at least <strong>40%</strong> of the work</li>
          <li>Measured by cost of contract performance</li>
        </ul>
        <p><strong>Mentor-protégé JVs:</strong></p>
        <ul>
          <li>Protégé must perform at least <strong>40%</strong> of the work</li>
          <li>This ensures protégé builds genuine capability</li>
        </ul>
        <p><strong>How work share is calculated:</strong></p>
        <ul>
          <li>Based on <strong>cost of performance</strong>, not revenue</li>
          <li>Includes labor, materials, subcontracts allocated to each party</li>
          <li>Administrative functions (accounting, HR) typically excluded</li>
          <li>Calculated across the <strong>life of the contract</strong> (not each task order individually for IDIQs)</li>
        </ul>
        <p><strong>Compliance monitoring:</strong></p>
        <p>The contracting officer and SBA may review JV compliance at any time. Failure to meet work share requirements can result in:</p>
        <ul>
          <li>Contract termination</li>
          <li>Loss of small business certifications</li>
          <li>Debarment in egregious cases</li>
          <li>Referral to SBA Office of Inspector General</li>
        </ul>
      `,
    },
    {
      heading: 'Affiliation Rules and JV Exceptions',
      content: `
        <p><strong>The affiliation problem:</strong></p>
        <p>Normally, when two businesses work closely together, SBA may find them "affiliated" — meaning their revenues and employees are combined for size determination. This would make most JVs exceed small business size standards.</p>
        <p><strong>JV affiliation exceptions:</strong></p>
        <p>SBA provides specific exceptions that allow JVs to maintain small business status:</p>
        <ul>
          <li><strong>Mentor-protégé exception</strong> — Approved MP JVs are not affiliated with mentor</li>
          <li><strong>Small business JV exception</strong> — Two small businesses can JV without affiliation if requirements met</li>
          <li><strong>2-year rule</strong> — JV can win unlimited contracts during a 2-year window, after which members may be affiliated</li>
        </ul>
        <p><strong>The 2-year rule (formerly 3-in-2):</strong></p>
        <p>In November 2020, SBA removed the 3-contract limit. JVs can now receive <strong>unlimited contracts within a 2-year period</strong> starting from the date of first award. After the 2-year window closes, submitting new offers as that JV will cause the members to be considered affiliated.</p>
        <ul>
          <li>Multiple task orders under a single IDIQ count as 1 contract for the 2-year clock</li>
          <li>Offers submitted before the 2-year window closes can be awarded after it closes</li>
          <li>Form a new JV entity after the 2-year period to continue pursuing work together</li>
        </ul>
        <p><strong>Avoiding affiliation issues:</strong></p>
        <ul>
          <li>Keep JV relationships arm's-length beyond contract work</li>
          <li>Don't share employees, facilities, or management outside the JV</li>
          <li>Document all JV activities clearly</li>
          <li>Track your 2-year window start date carefully</li>
        </ul>
      `,
    },
    {
      heading: 'Forming Your Joint Venture',
      content: `
        <p><strong>Step 1: Find the right partner</strong></p>
        <ul>
          <li>Complementary capabilities (they have what you lack)</li>
          <li>Shared target markets (same agencies, NAICS codes)</li>
          <li>Compatible cultures and working styles</li>
          <li>Financial stability and good reputation</li>
        </ul>
        <p><strong>Step 2: Create the JV entity</strong></p>
        <ul>
          <li>Form an LLC or similar entity in your state</li>
          <li>Obtain EIN from IRS</li>
          <li>Register in SAM.gov (separate from member companies)</li>
          <li>Obtain any required business licenses</li>
        </ul>
        <p><strong>Step 3: Draft the operating agreement</strong></p>
        <p>Include SBA-required provisions:</p>
        <ul>
          <li>Ownership percentages and capital contributions</li>
          <li>Management structure and decision authority</li>
          <li>Work allocation and responsibilities</li>
          <li>Profit/loss distribution</li>
          <li>Dispute resolution procedures</li>
          <li>Dissolution and wind-up procedures</li>
        </ul>
        <p><strong>Step 4: For mentor-protégé JVs</strong></p>
        <p>Submit JV agreement to SBA for approval through <a href="https://certify.sba.gov" target="_blank">certify.sba.gov</a>. Wait for SBA approval before bidding on set-aside contracts.</p>
        <p><strong>Step 5: Obtain bonding and insurance</strong></p>
        <p>The JV typically needs its own bonding capacity and insurance. One member may be able to extend bonding to the JV, but verify with your surety.</p>
      `,
    },
    {
      heading: 'Managing the Joint Venture',
      content: `
        <p><strong>Governance best practices:</strong></p>
        <ul>
          <li><strong>Regular partner meetings</strong> — Weekly or bi-weekly to review opportunities and operations</li>
          <li><strong>Clear decision authority</strong> — Who can commit the JV to contracts, expenses, personnel</li>
          <li><strong>Documented communications</strong> — Keep records of all significant decisions</li>
          <li><strong>Separate accounting</strong> — JV finances must be clearly separated from member companies</li>
        </ul>
        <p><strong>Pursuing contracts together:</strong></p>
        <ul>
          <li><strong>Opportunity identification</strong> — Both parties should bring opportunities to the JV</li>
          <li><strong>Bid/no-bid decisions</strong> — Use your <a href="/guides/bid-no-bid">bid/no-bid framework</a></li>
          <li><strong>Proposal development</strong> — Assign clear roles based on each party's strengths</li>
          <li><strong>Pricing strategy</strong> — Agree on rates, margins, and profit-sharing upfront</li>
        </ul>
        <p><strong>Contract performance:</strong></p>
        <ul>
          <li><strong>Project manager</strong> — For set-aside JVs, must be from the certified small business</li>
          <li><strong>Work assignment</strong> — Track work share to ensure compliance with 40% requirement</li>
          <li><strong>Quality control</strong> — JV is responsible for all work, regardless of which member performs it</li>
          <li><strong>Invoicing</strong> — JV submits invoices, distributes payments to members per agreement</li>
        </ul>
        <p><strong>Reporting requirements:</strong></p>
        <p>For mentor-protégé JVs, annual reports to SBA are required documenting assistance provided and work performed. Keep detailed records for compliance reviews.</p>
      `,
    },
    {
      heading: 'Common JV Mistakes and How to Avoid Them',
      content: `
        <p><strong>1. Treating the JV as a paper entity</strong></p>
        <p>The JV must be a real, operating business — not just a vehicle to get past eligibility screens. SBA investigates JVs that appear to be pass-throughs. Real meetings, real decision-making, real work allocation.</p>
        <p><strong>2. Ignoring work share requirements</strong></p>
        <p>Track work share from day one. Don't assume you'll catch up later. If you're falling short, reallocate work proactively. Document everything.</p>
        <p><strong>3. Poor operating agreements</strong></p>
        <p>Generic LLC templates don't work for government contracting JVs. Include SBA-required provisions. Have an attorney experienced in government contracting review your agreement.</p>
        <p><strong>4. Not registering properly</strong></p>
        <p>The JV needs its own SAM.gov registration, CAGE code, and potentially its own contract vehicles. Don't bid until registrations are complete.</p>
        <p><strong>5. Misunderstanding the 2-year rule</strong></p>
        <p>Track your 2-year window start date carefully (from first contract award). Plan to form a new JV entity before the window closes if you want to continue. Consider mentor-protégé structure if you expect significant JV activity.</p>
        <p><strong>6. Unclear profit-sharing</strong></p>
        <p>Disputes over money destroy partnerships. Define profit distribution clearly upfront, including how to handle cost overruns, disputes, and contract modifications.</p>
        <p><strong>7. No exit strategy</strong></p>
        <p>What happens if the relationship doesn't work? Include clear dissolution procedures in your operating agreement. Don't wait until there's conflict to figure it out.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Does a joint venture need its own SAM.gov registration?',
      answer:
        'Yes. A joint venture is a separate legal entity and must have its own SAM.gov registration, including its own Unique Entity ID (UEI) and CAGE code. The JV cannot bid on contracts using a member company\'s registration.',
    },
    {
      question: 'How is joint venture size determined for small business set-asides?',
      answer:
        'For small business JVs (not mentor-protégé), the JV\'s size is determined by combining the revenues/employees of all members. All members must independently qualify as small. For mentor-protégé JVs, only the protégé\'s size is considered — even if the mentor is a large business.',
    },
    {
      question: 'What is the 2-year rule for joint ventures?',
      answer:
        'Since November 2020, JVs can receive unlimited contracts during a 2-year window starting from first award. After 2 years, submitting new offers as that JV causes affiliation. Solution: form a new JV entity (ABJV2, LLC) to continue pursuing work. Mentor-protégé JVs are exempt.',
    },
    {
      question: 'Can two large businesses form a JV for government contracts?',
      answer:
        'Yes, but the JV cannot qualify for small business set-asides. Two large businesses can JV for full-and-open competitions where size doesn\'t matter. They may also team (rather than JV) on large contracts.',
    },
    {
      question: 'Who should be the project manager on a JV contract?',
      answer:
        'For set-aside contracts (8(a), SDVOSB, WOSB, HUBZone), the project manager must be an employee of the small/disadvantaged business member — not the large business partner or mentor. This is a compliance requirement.',
    },
    {
      question: 'How long does SBA approval take for a mentor-protégé JV?',
      answer:
        'After your mentor-protégé agreement is approved, you must separately submit the JV agreement for SBA review. This typically takes 30-60 days. Don\'t bid on set-aside contracts until approval is received.',
    },
    {
      question: 'Can a JV have more than two members?',
      answer:
        'Yes, but it\'s uncommon and adds complexity. All members must meet applicable requirements, and control/work share rules become more complicated. Most JVs have two members for simplicity.',
    },
    {
      question: 'What happens to active contracts if the JV dissolves?',
      answer:
        'The JV remains responsible for completing active contracts even during dissolution. The operating agreement should specify how ongoing contract obligations will be handled, who continues to manage performance, and how final payments are distributed.',
    },
  ],
  cta: {
    heading: 'Structure Your JV for Success',
    description:
      'Joint ventures are powerful but complex. Our consulting team helps you find partners, structure compliant JVs, and navigate SBA requirements to maximize your opportunities.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'mentor-protege-program',
    'teaming-agreements',
    'sba-certifications',
    '8a-certification',
    'subcontracting-and-teaming',
  ],
  publishedDate: '2026-04-07',
};
