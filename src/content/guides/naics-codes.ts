import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'naics-codes',
  title: 'NAICS Codes: How to Find, Choose, and Use Them for Government Contracts',
  metaTitle: 'NAICS Code Lookup — Find Your Code + Size Standards in 2 Minutes',
  metaDescription:
    'Free NAICS code search: find the right codes for your business. Plus size standard lookup — are you "small" for that $50M contract? Check instantly.',
  keywords: [
    'naics code',
    'naics code lookup',
    'naics codes list',
    'what is a naics code',
    'how to find naics code',
    'naics code search',
    'naics code for my business',
    'sba naics codes',
    'naics code size standards',
    'government contracting naics codes',
  ],
  heroSubtitle:
    'NAICS codes determine which contracts you can bid on and whether you qualify as a small business. Over 6,600 people search for NAICS code information every month — here is everything you need to know.',
  sections: [
    {
      heading: 'What Is a NAICS Code?',
      content: `
        <p>A <strong>NAICS code</strong> (North American Industry Classification System code) is a <strong>six-digit number</strong> that identifies the type of business activities your company performs. It is the standard system used by the U.S. government to classify businesses by industry.</p>
        <p>Every federal contract solicitation is assigned a NAICS code that describes the work being procured. When you search for contract opportunities on <a href="https://sam.gov" target="_blank" rel="noopener">SAM.gov</a>, you can filter by NAICS code to find opportunities that match your business capabilities.</p>
        <p>NAICS codes matter for government contracting in three critical ways:</p>
        <ul>
          <li><strong>Finding opportunities</strong> — Search for contracts by NAICS code to find work that matches what you do</li>
          <li><strong>Size standards</strong> — Each NAICS code has a small business size standard (revenue or employees) that determines if you qualify as a "small business" for that type of work</li>
          <li><strong>Set-aside eligibility</strong> — Small business set-asides are based on the NAICS code assigned to the contract</li>
        </ul>
        <p>NAICS codes are hierarchical. The first two digits represent the economic sector, the third digit represents the subsector, and so on. For example:</p>
        <ul>
          <li><strong>54</strong> — Professional, Scientific, and Technical Services (sector)</li>
          <li><strong>541</strong> — Professional, Scientific, and Technical Services (subsector)</li>
          <li><strong>5415</strong> — Computer Systems Design and Related Services (industry group)</li>
          <li><strong>54151</strong> — Computer Systems Design and Related Services (industry)</li>
          <li><strong>541512</strong> — Computer Systems Design Services (national industry)</li>
        </ul>
      `,
    },
    {
      heading: 'How to Look Up NAICS Codes',
      content: `
        <p>There are several free tools to find the right NAICS codes for your business:</p>
        <p><strong>1. Census Bureau NAICS Search</strong></p>
        <p>The official NAICS lookup tool from the U.S. Census Bureau. Visit <a href="https://www.census.gov/naics/" target="_blank" rel="noopener">census.gov/naics</a> and use the search function to find codes by keyword. This is the authoritative source for NAICS code definitions.</p>
        <p><strong>2. SBA Size Standards Tool</strong></p>
        <p>The Small Business Administration maintains a <a href="https://www.sba.gov/size-standards/" target="_blank" rel="noopener">size standards tool</a> that shows NAICS codes along with their corresponding small business size standards. This is essential for determining whether you qualify as a small business for specific work.</p>
        <p><strong>3. SAM.gov Contract Search</strong></p>
        <p>Search for contracts similar to work you want to pursue on <a href="https://sam.gov" target="_blank" rel="noopener">SAM.gov</a>. Look at which NAICS codes are assigned to those opportunities — this shows you what codes agencies actually use for that type of work.</p>
        <p><strong>4. GovCon Giants Opportunity Hunter</strong></p>
        <p>Our <a href="/opp">Opportunity Hunter tool</a> lets you search federal spending by NAICS code to see which agencies buy what you sell and how much they spend.</p>
        <p><strong>Tips for NAICS Code Searches:</strong></p>
        <ul>
          <li>Search by keyword first, then review the detailed descriptions to find the best match</li>
          <li>Look at multiple codes — most businesses qualify for several NAICS codes</li>
          <li>Check the size standard for each code you are considering</li>
          <li>Review actual contract opportunities to see which codes agencies use</li>
        </ul>
      `,
    },
    {
      heading: 'How to Choose the Right NAICS Codes',
      content: `
        <p>Most businesses qualify for multiple NAICS codes. Here is how to choose the right ones:</p>
        <p><strong>Step 1: Identify All Applicable Codes</strong></p>
        <p>List every type of work your company performs. For each capability, search for relevant NAICS codes. A typical government contractor might have 5-15 applicable codes.</p>
        <p><strong>Step 2: Determine Your Primary NAICS Code</strong></p>
        <p>Your <strong>primary NAICS code</strong> should represent the work that generates the majority of your revenue — or the work you most want to pursue in government contracting. This is the code you will list first on your SAM.gov registration and capability statement.</p>
        <p><strong>Step 3: Check Size Standards</strong></p>
        <p>For each NAICS code, check the <a href="https://www.sba.gov/size-standards/" target="_blank" rel="noopener">SBA size standard</a>. Size standards are expressed as either:</p>
        <ul>
          <li><strong>Average annual revenue</strong> (most common) — usually $8M to $47M depending on the industry</li>
          <li><strong>Number of employees</strong> — typically 500 to 1,500 for manufacturing and some services</li>
        </ul>
        <p>You are considered a small business for a specific NAICS code if you are under the size standard for that code. This means you could be a small business for one type of work but not another.</p>
        <p><strong>Step 4: Add Codes to SAM.gov</strong></p>
        <p>During SAM.gov registration, you can add multiple NAICS codes to your profile. Add all codes that legitimately describe work you can perform — this increases your visibility in searches.</p>
        <p><strong>Common Mistakes to Avoid:</strong></p>
        <ul>
          <li><strong>Adding codes you cannot perform</strong> — Only list codes for work you can actually do. Misrepresentation can disqualify you from contracts.</li>
          <li><strong>Missing relevant codes</strong> — If you do IT support AND cybersecurity, list both. Missing codes means missing opportunities.</li>
          <li><strong>Ignoring size standards</strong> — You might be small for 541512 but not for 541511. This affects which set-asides you can bid on.</li>
        </ul>
      `,
    },
    {
      heading: 'NAICS Code Size Standards Explained',
      content: `
        <p>Size standards are the heart of the small business program. Each NAICS code has a specific size standard that determines whether your company qualifies as a "small business" for contracts under that code.</p>
        <p><strong>Why Size Standards Matter:</strong></p>
        <ul>
          <li>Small business <strong>set-asides</strong> are only open to companies that meet the size standard for the contract's NAICS code</li>
          <li>Your <strong>SBA certifications</strong> (8(a), HUBZone, WOSB, etc.) depend on meeting size standards</li>
          <li>Large businesses cannot compete for <strong>small business set-aside contracts</strong></li>
        </ul>
        <p><strong>How Size Standards Work:</strong></p>
        <p>The SBA calculates your size based on your average annual receipts (revenue) or number of employees over the past 3-5 years, depending on the standard. You are compared against the threshold for the specific NAICS code assigned to the contract.</p>
        <p><strong>Example Size Standards (2026):</strong></p>
        <ul>
          <li><strong>541512 (Computer Systems Design)</strong> — $34 million average annual revenue</li>
          <li><strong>541330 (Engineering Services)</strong> — $25.5 million average annual revenue</li>
          <li><strong>236220 (Commercial Building Construction)</strong> — $45 million average annual revenue</li>
          <li><strong>561210 (Facilities Support Services)</strong> — $47 million average annual revenue</li>
          <li><strong>238220 (Plumbing and HVAC Contractors)</strong> — $19 million average annual revenue</li>
        </ul>
        <p><strong>Important:</strong> Size standards change periodically. Always check the current standards on the <a href="https://www.sba.gov/size-standards/" target="_blank" rel="noopener">SBA website</a> before bidding on a contract.</p>
        <p><strong>Affiliates and Size:</strong></p>
        <p>The SBA counts revenue and employees from your company plus any <strong>affiliates</strong> (companies you control or that control you). This is a common trap — a company might be small on its own but exceed size standards when affiliates are included.</p>
      `,
    },
    {
      heading: 'Common NAICS Codes for Government Contractors',
      content: `
        <p>Certain NAICS codes appear frequently in federal contracting. Here are some of the most commonly used:</p>
        <p><strong>Professional Services:</strong></p>
        <ul>
          <li><strong>541611</strong> — Administrative Management and General Management Consulting Services ($24.5M)</li>
          <li><strong>541612</strong> — Human Resources Consulting Services ($19M)</li>
          <li><strong>541618</strong> — Other Management Consulting Services ($19M)</li>
          <li><strong>541690</strong> — Other Scientific and Technical Consulting Services ($19M)</li>
          <li><strong>541990</strong> — All Other Professional, Scientific, and Technical Services ($19M)</li>
        </ul>
        <p><strong>Information Technology:</strong></p>
        <ul>
          <li><strong>541512</strong> — Computer Systems Design Services ($34M)</li>
          <li><strong>541511</strong> — Custom Computer Programming Services ($34M)</li>
          <li><strong>541513</strong> — Computer Facilities Management Services ($34M)</li>
          <li><strong>541519</strong> — Other Computer Related Services ($30M)</li>
          <li><strong>518210</strong> — Computing Infrastructure Providers, Data Processing, Web Hosting ($40M)</li>
        </ul>
        <p><strong>Engineering & Construction:</strong></p>
        <ul>
          <li><strong>541330</strong> — Engineering Services ($25.5M)</li>
          <li><strong>541310</strong> — Architectural Services ($12.5M)</li>
          <li><strong>236220</strong> — Commercial and Institutional Building Construction ($45M)</li>
          <li><strong>237310</strong> — Highway, Street, and Bridge Construction ($45M)</li>
          <li><strong>562910</strong> — Environmental Remediation Services ($25M)</li>
        </ul>
        <p><strong>Facilities & Support:</strong></p>
        <ul>
          <li><strong>561210</strong> — Facilities Support Services ($47M)</li>
          <li><strong>561720</strong> — Janitorial Services ($22M)</li>
          <li><strong>561612</strong> — Security Guards and Patrol Services ($29M)</li>
          <li><strong>561621</strong> — Security Systems Services ($29M)</li>
          <li><strong>488190</strong> — Other Support Activities for Air Transportation ($40M)</li>
        </ul>
        <p><em>Note: Size standards shown in parentheses are average annual revenue thresholds. Check the SBA for current standards as they are updated periodically.</em></p>
      `,
    },
    {
      heading: 'How NAICS Codes Affect Your Bid Strategy',
      content: `
        <p>Understanding NAICS codes is essential for winning government contracts. Here is how they affect your strategy:</p>
        <p><strong>1. Finding the Right Opportunities</strong></p>
        <p>When searching for contracts on SAM.gov, filter by your NAICS codes to find relevant opportunities. Set up saved searches for your primary codes to get email alerts when new opportunities post.</p>
        <p><strong>2. Qualifying for Set-Asides</strong></p>
        <p>Small business set-asides are based on the NAICS code assigned to the contract. Before bidding, verify you meet the size standard for that specific code. If the contract uses a NAICS code where you are NOT small, you cannot compete for the set-aside.</p>
        <p><strong>3. Understanding Your Competition</strong></p>
        <p>Research who else holds the same NAICS codes. On SAM.gov, you can search for entities by NAICS code to see potential competitors and teaming partners. Our <a href="/opp">Opportunity Hunter</a> shows spending by NAICS code and which companies are winning.</p>
        <p><strong>4. Positioning Your Capability Statement</strong></p>
        <p>List your primary NAICS codes prominently on your <a href="/guides/capability-statement">capability statement</a>. When contracting officers search for vendors, they often filter by NAICS code. Make it easy for them to see you are a match.</p>
        <p><strong>5. NAICS Code Challenges</strong></p>
        <p>Sometimes a contracting officer assigns a NAICS code that does not accurately describe the work. You can challenge the NAICS code designation before the solicitation closes if you believe a different code is more appropriate — this could affect whether the contract is set aside for small business.</p>
      `,
    },
    {
      heading: 'NAICS Code Updates and Changes',
      content: `
        <p>NAICS codes are revised every five years by the Census Bureau, with the most recent update in 2022. Here is what you need to know about changes:</p>
        <p><strong>2022 NAICS Updates:</strong></p>
        <p>The 2022 revision added, modified, and deleted several codes. Key changes included new codes for emerging industries and consolidation of some outdated categories. If you registered on SAM.gov before 2022, review your NAICS codes to ensure they are still valid.</p>
        <p><strong>How Changes Affect You:</strong></p>
        <ul>
          <li><strong>Deleted codes</strong> — If your primary code was deleted, you need to update your SAM.gov registration with the replacement code</li>
          <li><strong>New codes</strong> — New codes may better describe your work than older, broader categories</li>
          <li><strong>Size standard changes</strong> — The SBA periodically adjusts size standards independent of NAICS revisions. A code's size standard may increase or decrease.</li>
        </ul>
        <p><strong>Staying Current:</strong></p>
        <ul>
          <li>Review your NAICS codes during your annual SAM.gov renewal</li>
          <li>Check the SBA size standards table at least annually</li>
          <li>Watch for SBA proposed rule changes that could affect your size status</li>
        </ul>
        <p><strong>Historical Note:</strong> NAICS replaced the older SIC (Standard Industrial Classification) system in 1997. You may still see references to SIC codes in older materials, but SIC codes are no longer used in federal contracting.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How many NAICS codes can I have?',
      answer:
        'There is no limit to the number of NAICS codes you can list on your SAM.gov registration. Most government contractors list 5-15 codes that represent their various capabilities. However, only list codes for work you can actually perform — misrepresentation can result in contract termination and debarment.',
    },
    {
      question: 'What is a primary NAICS code?',
      answer:
        'Your primary NAICS code is the code that best represents your main line of business — typically the work that generates the most revenue or the area you most want to pursue in government contracting. It is listed first on your SAM.gov registration and capability statement. You can change your primary NAICS code during your annual SAM renewal.',
    },
    {
      question: 'Can I be small for one NAICS code but not another?',
      answer:
        'Yes. Each NAICS code has its own size standard. You might be under the threshold for a code with a $34M size standard but over the threshold for a code with a $19M standard. This is why it is critical to check the size standard for the specific NAICS code on each contract you bid.',
    },
    {
      question: 'How do I find which NAICS codes an agency uses?',
      answer:
        'Search for past contract awards on SAM.gov and filter by the agency. Look at which NAICS codes were assigned to contracts similar to the work you want to pursue. You can also review agency forecasts on Acquisition Gateway or agency-specific procurement portals to see planned acquisitions and their likely NAICS codes.',
    },
    {
      question: 'What happens if the wrong NAICS code is assigned to a contract?',
      answer:
        'If you believe a solicitation has the wrong NAICS code or size standard, you can file a NAICS code appeal with the SBA Office of Hearings and Appeals. This must be done within 10 calendar days of the solicitation issuance. NAICS appeals are relatively common and can change whether a contract is set aside for small business.',
    },
    {
      question: 'Do NAICS codes expire?',
      answer:
        'No, NAICS codes themselves do not expire. However, the NAICS system is updated every five years (most recently in 2022), and some codes may be added, deleted, or modified. If a code you use is deleted, you will need to update your SAM.gov registration with the appropriate replacement code.',
    },
    {
      question: 'What is the difference between NAICS and PSC codes?',
      answer:
        'NAICS codes classify businesses by industry type and determine small business size standards. PSC (Product and Service Codes) classify what the government is buying. A single solicitation has both: the NAICS code identifies the type of company that should perform the work, while the PSC code identifies the specific product or service being purchased. Both are useful for finding relevant opportunities.',
    },
  ],
  cta: {
    heading: 'Ready to Find Contracts That Match Your NAICS Codes?',
    description:
      'Use our free Opportunity Hunter tool to search federal spending by NAICS code. See which agencies buy what you sell and identify your next opportunity.',
    buttonText: 'Try Opportunity Hunter Free',
    buttonHref: '/opp',
  },
  relatedGuides: [
    'sam-gov-registration',
    'finding-government-contracts',
    'sba-certifications',
    'capability-statement',
  ],
  publishedDate: '2026-03-20',
};
