import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'sba-size-standards',
  title: 'SBA Size Standards: How to Determine if Your Business Qualifies as Small',
  metaTitle: 'SBA Size Standards [2026 Table] — Small Business Size Limits by NAICS',
  metaDescription:
    'Learn how SBA size standards work, find the limit for your NAICS code, calculate your size, and understand affiliation rules. Complete guide to small business qualification.',
  keywords: [
    'sba size standards',
    'small business size standards',
    'naics size standards',
    'sba size standard table',
    'small business definition',
    'small business revenue limit',
    'small business employee limit',
    'sba size calculation',
    'affiliation rules',
    'size standard exceptions',
  ],
  heroSubtitle:
    'Size standards determine whether you qualify as a "small business" for government contracts. Miss the threshold by a dollar, and you lose access to set-asides worth billions annually.',
  sections: [
    {
      heading: 'What Are SBA Size Standards?',
      content: `
        <p><strong>SBA size standards</strong> are numerical definitions of what constitutes a "small business" for each industry. They vary by industry because a $10 million company might be tiny in construction but massive in consulting.</p>
        <p><strong>Two types of size standards:</strong></p>
        <p><strong>Revenue-based:</strong> Most industries use average annual receipts over the past 3-5 years. Example: Management consulting (NAICS 541611) has a $24.5 million standard.</p>
        <p><strong>Employee-based:</strong> Manufacturing and some other industries use number of employees. Example: General construction (NAICS 236220) has a 1,500 employee standard.</p>
        <p><strong>Why size matters:</strong></p>
        <ul>
          <li><strong>Small business set-asides</strong> — Can't compete if you're not small</li>
          <li><strong>SBA certifications</strong> — <a href="/guides/8a-certification">8(a)</a>, <a href="/guides/hubzone-certification">HUBZone</a>, etc. require small status</li>
          <li><strong>Subcontracting goals</strong> — Primes need small business subs to meet goals</li>
          <li><strong>Contract vehicles</strong> — Many GWACs and IDIQs are small business only</li>
        </ul>
        <p><strong>Where to find size standards:</strong></p>
        <p>Official table: <a href="https://www.sba.gov/size-standards" target="_blank">sba.gov/size-standards</a></p>
        <p>Each <a href="/guides/naics-codes">NAICS code</a> has its own size standard. You must check the standard for your specific code — don't assume they're all the same.</p>
      `,
    },
    {
      heading: 'Common Size Standards by Industry',
      content: `
        <p><strong>Professional Services:</strong></p>
        <ul>
          <li>Management Consulting (541611): <strong>$24.5 million</strong></li>
          <li>Computer Systems Design (541512): <strong>$34 million</strong></li>
          <li>Engineering Services (541330): <strong>$25.5 million</strong></li>
          <li>Accounting Services (541211): <strong>$27.5 million</strong></li>
          <li>Marketing Research (541910): <strong>$22 million</strong></li>
        </ul>
        <p><strong>IT and Technology:</strong></p>
        <ul>
          <li>Custom Computer Programming (541511): <strong>$34 million</strong></li>
          <li>Data Processing Services (518210): <strong>$40 million</strong></li>
          <li>Software Publishers (511210): <strong>$47 million</strong></li>
          <li>IT Training (611420): <strong>$15 million</strong></li>
        </ul>
        <p><strong>Construction:</strong></p>
        <ul>
          <li>Commercial Building (236220): <strong>$45 million</strong></li>
          <li>Electrical Contractors (238210): <strong>$19 million</strong></li>
          <li>HVAC Contractors (238220): <strong>$19 million</strong></li>
          <li>Highway Construction (237310): <strong>$45 million</strong></li>
        </ul>
        <p><strong>Manufacturing (by employees):</strong></p>
        <ul>
          <li>Most manufacturing: <strong>500-1,500 employees</strong></li>
          <li>Check specific NAICS for exact standard</li>
        </ul>
        <p><strong>Important:</strong> These standards change periodically. Always verify current standards at <a href="https://www.sba.gov/size-standards" target="_blank">sba.gov</a> before bidding.</p>
      `,
    },
    {
      heading: 'How to Calculate Your Size',
      content: `
        <p><strong>Revenue-based calculation:</strong></p>
        <ol>
          <li>Find your primary <a href="/guides/naics-codes">NAICS code</a></li>
          <li>Look up the size standard for that NAICS</li>
          <li>Calculate your average annual receipts for the past <strong>5 fiscal years</strong></li>
          <li>Compare: If average receipts < size standard, you're small</li>
        </ol>
        <p><strong>Example calculation:</strong></p>
        <p>NAICS 541611 (Management Consulting) — $24.5 million standard</p>
        <ul>
          <li>Year 1: $18 million</li>
          <li>Year 2: $20 million</li>
          <li>Year 3: $22 million</li>
          <li>Year 4: $25 million</li>
          <li>Year 5: $28 million</li>
          <li><strong>Average: $22.6 million</strong> — Still qualifies as small</li>
        </ul>
        <p><strong>Employee-based calculation:</strong></p>
        <ol>
          <li>Count all employees (full-time, part-time, temporary)</li>
          <li>Any person on payroll counts as one employee regardless of hours</li>
          <li>Average over the past <strong>24 months</strong> (changed from 12 months per Public Law 116-283)</li>
          <li>Compare to standard for your NAICS</li>
        </ol>
        <p><strong>What counts as "receipts":</strong></p>
        <ul>
          <li>All revenue from sales of products/services</li>
          <li>Interest, dividends, rents, royalties</li>
          <li>Commissions, fees, other income</li>
          <li><strong>Excludes:</strong> Net capital gains, taxes collected for government</li>
        </ul>
      `,
    },
    {
      heading: 'Affiliation Rules: Why Your Size Might Be Larger Than You Think',
      content: `
        <p><strong>Affiliation</strong> is the biggest trap in size determination. If SBA considers you affiliated with another business, their revenue/employees count toward YOUR size.</p>
        <p><strong>Common affiliation triggers:</strong></p>
        <ul>
          <li><strong>Ownership</strong> — Own 50%+ of another business, or they own 50%+ of you</li>
          <li><strong>Common management</strong> — Same people control both businesses</li>
          <li><strong>Family relationships</strong> — Businesses owned by family members may be affiliated</li>
          <li><strong>Economic dependence</strong> — 70%+ of revenue from one source may indicate affiliation</li>
          <li><strong>Newly organized concern</strong> — Created to avoid size standards</li>
          <li><strong>Joint ventures</strong> — JV partners may be affiliated (see exceptions below)</li>
        </ul>
        <p><strong>How affiliation affects you:</strong></p>
        <p>If you're affiliated with a $50 million company, SBA adds their $50 million to your revenue for size calculation — even if you're a tiny firm.</p>
        <p><strong>Affiliation exceptions:</strong></p>
        <ul>
          <li><strong>Mentor-protégé</strong> — Approved mentor-protégé relationships don't create affiliation</li>
          <li><strong>SBA-licensed investment companies</strong> — SBICs have special rules</li>
          <li><strong>Franchise agreements</strong> — Franchisees may not be affiliated with franchisor</li>
        </ul>
        <p><strong>When in doubt:</strong> Consult with an attorney experienced in SBA size matters. Affiliation mistakes can result in False Claims Act liability.</p>
      `,
    },
    {
      heading: 'Size Determination Timing',
      content: `
        <p>When does your size get evaluated? It depends on the type of procurement.</p>
        <p><strong>Negotiated procurements (most services):</strong></p>
        <p>Size determined at time of <strong>initial offer including price</strong>. If you're small when you submit, you're small for that contract — even if you grow during performance.</p>
        <p><strong>Sealed bidding:</strong></p>
        <p>Size determined at time of <strong>bid opening</strong>.</p>
        <p><strong>Multiple Award Contracts (IDIQs, GWACs):</strong></p>
        <p>Size determined at time of <strong>initial offer</strong> for the base contract. For task orders, you generally don't need to re-certify size unless the vehicle requires it.</p>
        <p><strong>Long-term contracts:</strong></p>
        <p>Some contracts require <strong>recertification</strong>:</p>
        <ul>
          <li>At option exercise</li>
          <li>When contract is novated (transferred)</li>
          <li>When acquiring another company</li>
        </ul>
        <p><strong>SBA certifications:</strong></p>
        <p>For <a href="/guides/8a-certification">8(a)</a>, <a href="/guides/hubzone-certification">HUBZone</a>, etc., you must remain small throughout certification. SBA reviews annually.</p>
        <p><strong>Strategic planning:</strong></p>
        <p>If you're approaching the size threshold, pursue contracts NOW while you still qualify. Once you exceed the standard, you lose access to set-asides in that NAICS.</p>
      `,
    },
    {
      heading: 'Size Protests and Appeals',
      content: `
        <p><strong>Size protests:</strong></p>
        <p>Competitors can challenge your size status by filing a protest with SBA's Office of Hearings and Appeals (OHA).</p>
        <p><strong>Who can protest:</strong></p>
        <ul>
          <li>Other offerors on the same procurement</li>
          <li>The contracting officer</li>
          <li>SBA</li>
        </ul>
        <p><strong>Protest timing:</strong></p>
        <ul>
          <li>Must be filed within <strong>5 business days</strong> of learning apparent awardee</li>
          <li>For certain contracts, may be filed before award</li>
        </ul>
        <p><strong>What happens during a protest:</strong></p>
        <ol>
          <li>SBA issues a size determination request to you</li>
          <li>You have <strong>3 business days</strong> to respond with documentation</li>
          <li>SBA Area Office makes size determination</li>
          <li>Either party can appeal to OHA</li>
        </ol>
        <p><strong>Consequences of being found "other than small":</strong></p>
        <ul>
          <li>You're ineligible for that contract award</li>
          <li>May affect other pending set-aside contracts</li>
          <li>Must update SAM.gov size representations</li>
        </ul>
        <p><strong>Best defense:</strong> Maintain accurate records. Document your size calculation methodology. Keep affiliation analysis current. Don't wait for a protest to gather information.</p>
      `,
    },
    {
      heading: 'Strategies for Managing Your Size',
      content: `
        <p><strong>Approaching the threshold:</strong></p>
        <p>If you're growing toward the size limit, take action NOW:</p>
        <ul>
          <li><strong>Get on contract vehicles</strong> — Win IDIQs while still small; you can compete for task orders even after exceeding the threshold</li>
          <li><strong>Pursue large set-asides aggressively</strong> — Win what you can while you qualify</li>
          <li><strong>Consider NAICS code strategy</strong> — Different NAICS may have higher thresholds</li>
        </ul>
        <p><strong>Exceeding the threshold:</strong></p>
        <p>When you grow beyond small business size:</p>
        <ul>
          <li><strong>Update SAM.gov</strong> — Misrepresenting size is fraud</li>
          <li><strong>Transition to full-and-open</strong> — Compete on capabilities, not status</li>
          <li><strong>Become a mentor</strong> — Use the <a href="/guides/mentor-protege-program">Mentor-Protégé Program</a> to access small business work</li>
          <li><strong>Subcontract to small businesses</strong> — Help primes meet their small business goals</li>
        </ul>
        <p><strong>Multiple NAICS codes:</strong></p>
        <p>You may be small under some NAICS codes but not others. Track your size status by NAICS. Pursue set-asides only in NAICS where you qualify.</p>
        <p><strong>Acquisitions and growth:</strong></p>
        <p>If you acquire another company or merge, recalculate your size immediately. The combined entity's revenue/employees count from day one of the transaction.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How often do SBA size standards change?',
      answer:
        'SBA reviews size standards every 5 years and adjusts them periodically based on industry data and inflation. Standards can change significantly between reviews. Always verify the current standard before bidding — don\'t rely on old information.',
    },
    {
      question: 'Is the size standard based on revenue or profit?',
      answer:
        'Revenue (receipts), not profit. Your gross receipts over the measurement period determine size, regardless of whether you made a profit. A company losing money can still exceed size standards if revenue is high enough.',
    },
    {
      question: 'How do joint ventures affect my size?',
      answer:
        'Regular joint venture partners may be considered affiliated, combining their revenues for size purposes. However, JVs formed under the SBA Mentor-Protégé Program have an exception — the protégé\'s size is not affected by the mentor\'s size. Non-MP JVs are also subject to the "3-in-2" rule limiting awards.',
    },
    {
      question: 'What if I have multiple NAICS codes?',
      answer:
        'Each NAICS code has its own size standard. You evaluate size separately for each code. You might qualify as small under NAICS 541611 ($24.5M) but not under 541330 ($25.5M) if your revenues are $25M. Bid only on set-asides for NAICS codes where you qualify.',
    },
    {
      question: 'Does subcontract revenue count toward my size?',
      answer:
        'Yes. All revenue counts, including revenue from subcontracts. If you perform $5M as a subcontractor, that counts toward your average annual receipts just like prime contract revenue.',
    },
    {
      question: 'What happens if I grow past the size standard mid-contract?',
      answer:
        'For most contracts, size is determined at time of offer, not during performance. If you qualified when you bid, you remain eligible for that contract even if you grow. However, you may need to recertify at option exercise or for new procurements.',
    },
    {
      question: 'Are there different standards for different agencies?',
      answer:
        'Generally no — SBA size standards apply government-wide. However, some specific programs have exceptions, and contracting officers occasionally request SBA to establish different size standards for particular procurements. Always check the solicitation for the applicable standard.',
    },
    {
      question: 'How do I calculate size if I\'ve been in business less than 5 years?',
      answer:
        'Use the years you have been in business. If you\'ve been operating for 3 years, average those 3 years of receipts. SBA regulations specify how to handle partial years and new businesses.',
    },
  ],
  cta: {
    heading: 'Know Your Size Before You Bid',
    description:
      'Size determination is complex, especially with affiliation rules. Get it wrong, and you face contract loss, debarment, or worse. Our consulting team can help you calculate your size accurately and plan for growth.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'naics-codes',
    'sba-certifications',
    '8a-certification',
    'mentor-protege-program',
    'sam-gov-registration',
  ],
  publishedDate: '2026-04-07',
};
