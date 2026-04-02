import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'sam-gov-registration',
  title: 'SAM.gov Registration: Complete Step-by-Step Guide',
  metaTitle: 'SAM.gov Registration (Free): 7 Steps to Get Your UEI + CAGE Code',
  metaDescription:
    'Register on SAM.gov in 7 steps — free, no paid services needed. Get your UEI and CAGE code in 7-10 days. Avoid the 3 mistakes that cause 60% of rejections.',
  keywords: [
    'SAM.gov registration',
    'sam.gov registration step by step',
    'SAM registration',
    'system for award management',
    'UEI number',
    'how to register on SAM.gov',
    'SAM.gov registration for small business',
    'CAGE code',
    'government contractor registration',
    'sam.gov login',
    'sam registration help',
  ],
  heroSubtitle:
    'SAM.gov registration is free and mandatory for every federal contractor. This guide walks you through every step so you can get registered correctly the first time.',
  sections: [
    {
      heading: 'What Is SAM.gov?',
      content: `
        <p><strong>SAM.gov</strong> (System for Award Management) is the official U.S. government system where businesses register to do business with the federal government. It is the central hub that consolidated multiple legacy systems — including CCR, ORCA, EPLS, and the former FPDS — into a single platform. Today, SAM.gov handles entity registration, contract opportunity postings, federal contract data, exclusions, and wage determinations.</p>
        <p>Think of SAM.gov as the federal government's "vendor database." When a contracting officer needs to verify that a business is eligible to receive a contract or payment, they check SAM.gov. If your registration is not active, you <strong>cannot be awarded a federal contract</strong> and you <strong>cannot receive payment</strong> on existing contracts.</p>
        <p>SAM.gov registration is <strong>completely free</strong>. The government does not charge any fees to register or renew your entity. Be cautious of third-party services that charge hundreds or thousands of dollars to "help" with SAM registration — in most cases, you can complete the process yourself by following this guide. If you need assistance, the Federal Service Desk (<a href="https://www.fsd.gov" target="_blank" rel="noopener">fsd.gov</a>) provides free support.</p>
        <p>Your SAM.gov registration is also where you will receive your <strong>Unique Entity Identifier (UEI)</strong>, which replaced the DUNS number in April 2022 as the official identifier for federal contracting. The UEI is generated automatically during the SAM.gov registration process at no cost.</p>
      `,
    },
    {
      heading: 'Why SAM.gov Registration Is Mandatory',
      content: `
        <p>Federal Acquisition Regulation (FAR) 4.1102 requires that contractors be registered in SAM.gov before a contracting officer can award a contract, basic agreement, basic ordering agreement, or blanket purchase agreement. There are very limited exceptions (such as certain emergency acquisitions or classified contracts), but for all practical purposes, <strong>every business pursuing federal work must be registered</strong>.</p>
        <p>Beyond eligibility, your SAM.gov registration serves several critical functions:</p>
        <ul>
          <li><strong>Entity validation:</strong> SAM.gov verifies your business is legitimate and matches IRS records, establishing trust with government buyers.</li>
          <li><strong>Payment processing:</strong> Your banking information in SAM.gov is used for Electronic Funds Transfer (EFT) payments. No active registration means no payments.</li>
          <li><strong>Representations and certifications:</strong> During registration, you make legally binding statements about your business size, ownership, and socioeconomic status. These determine what set-aside contracts you are eligible for.</li>
          <li><strong>Searchability:</strong> Government buyers and prime contractors use SAM.gov to search for qualified vendors. Your registration is your profile in the federal marketplace.</li>
          <li><strong>Contract data history:</strong> SAM.gov now includes federal contract award data (formerly hosted on FPDS), allowing buyers to see your past performance history.</li>
        </ul>
        <p>An incomplete or inaccurate registration can delay contract awards, hold up payments, or make you invisible to agencies that are actively looking for businesses like yours. Getting it right from the start saves significant time and frustration.</p>
      `,
    },
    {
      heading: 'Step-by-Step SAM.gov Registration Process',
      content: `
        <p>Here is the complete registration process, broken into clear steps:</p>
        <p><strong>Step 1: Create a Login.gov Account</strong></p>
        <p>SAM.gov uses <a href="https://login.gov" target="_blank" rel="noopener">Login.gov</a> for authentication. Create an account with your business email address and set up multi-factor authentication. You will need this login for all SAM.gov interactions.</p>
        <p><strong>Step 2: Start Your Entity Registration</strong></p>
        <p>Log in to SAM.gov, navigate to "Entity Registration," and select "Register New Entity." Choose the purpose of your registration — for federal contracting, select "I want to be able to bid on federal contracts or assistance awards." You will also indicate whether you are registering as a domestic or foreign entity.</p>
        <p><strong>Step 3: Validate Your Entity and Get Your UEI</strong></p>
        <p>SAM.gov will validate your business information against several federal databases. You will need your <strong>legal business name</strong> (exactly as it appears on IRS records), <strong>physical address</strong>, and <strong>EIN/TIN</strong>. During this step, SAM.gov assigns your <strong>Unique Entity Identifier (UEI)</strong> — a 12-character alphanumeric code that replaces the former DUNS number. Keep this number on file; you will use it everywhere in government contracting.</p>
        <p><strong>Step 4: Obtain Your CAGE Code</strong></p>
        <p>The Commercial and Government Entity (CAGE) code is a five-character identifier assigned by the Defense Logistics Agency (DLA). For domestic entities, the CAGE code is assigned automatically during SAM.gov registration. International entities must obtain a NATO CAGE (NCAGE) code separately before registering. <strong>Pro tip:</strong> Use our free <a href="/tools/cage-code-lookup">CAGE Code Lookup Tool</a> to search for competitors or verify your code once assigned.</p>
        <p><strong>Step 5: Complete Core Data</strong></p>
        <p>Enter your business details including NAICS codes, Product/Service Codes (PSCs), business type, and organization structure. Select all NAICS codes relevant to your products or services — this is how agencies will find you when searching for vendors.</p>
        <p><strong>Step 6: Enter Financial Information</strong></p>
        <p>Provide your banking information for EFT payments. You will need your bank routing number, account number, and account type. This information must match your bank records exactly.</p>
        <p><strong>Step 7: Complete Representations and Certifications</strong></p>
        <p>Answer all questions about your business size, ownership, and certifications. These are <strong>legally binding</strong> statements — answer accurately. Misrepresentation can result in penalties under the False Claims Act.</p>
        <p><strong>Step 8: Submit and Wait for Activation</strong></p>
        <p>Review everything carefully and submit. Your registration will go through a validation process that typically takes <strong>7-10 business days</strong> but can take longer depending on the volume of registrations being processed.</p>
      `,
    },
    {
      heading: 'Common SAM.gov Registration Mistakes and How to Avoid Them',
      content: `
        <p>After helping thousands of businesses through the SAM.gov registration process, these are the most frequent errors that cause delays or rejections:</p>
        <ul>
          <li><strong>Business name mismatch:</strong> Your legal business name in SAM.gov must <strong>exactly match</strong> your IRS records (your EIN assignment letter or IRS Letter 147C). Even small differences — like "LLC" vs "L.L.C." or "&" vs "and" — will cause validation failures. If you are unsure of your exact legal name, call the IRS Business line at 1-800-829-4933.</li>
          <li><strong>Wrong address format:</strong> Use the same address format as your IRS records. Do not abbreviate "Street" to "St" unless that is exactly how it appears in your tax records. P.O. Boxes are not accepted as physical addresses.</li>
          <li><strong>Expired TIN/EIN:</strong> If the IRS does not recognize your EIN, your registration will stall. This sometimes happens with newly formed entities. Allow at least two weeks after receiving your EIN before starting SAM registration.</li>
          <li><strong>Incomplete banking information:</strong> EFT setup errors are a leading cause of payment delays. Double-check your routing and account numbers. Some banks require specific account formatting for government payments — contact your bank to verify.</li>
          <li><strong>Skipping optional but important fields:</strong> Fields like your entity's URL, capability narrative, and secondary NAICS codes are technically optional but strongly recommended. Government buyers use this information to find and evaluate potential vendors.</li>
          <li><strong>Paying a third party unnecessarily:</strong> SAM.gov registration is free. The government will never ask you to pay for registration. Some companies send official-looking invoices demanding payment — these are scams. Only use <a href="https://sam.gov" target="_blank" rel="noopener">sam.gov</a> directly.</li>
        </ul>
        <p>If your registration is rejected, the system will explain why. Fix the specific issue, resubmit, and allow another processing period. Most rejections are resolved in one correction cycle.</p>
      `,
    },
    {
      heading: 'How Long Does SAM.gov Registration Take?',
      content: `
        <p>The official timeline for SAM.gov registration processing is <strong>7-10 business days</strong> after submission. However, several factors can affect the actual timeline:</p>
        <p><strong>Typical Timeline:</strong></p>
        <ul>
          <li><strong>Login.gov account creation:</strong> 15-30 minutes</li>
          <li><strong>Gathering required documents:</strong> 1-3 days (if you need to locate your EIN letter, banking details, etc.)</li>
          <li><strong>Completing the registration form:</strong> 1-2 hours for a straightforward registration</li>
          <li><strong>Entity validation (UEI assignment):</strong> Typically 1-2 business days</li>
          <li><strong>CAGE code assignment:</strong> Usually processed concurrently with registration</li>
          <li><strong>Full registration activation:</strong> 7-10 business days after complete submission</li>
        </ul>
        <p><strong>Factors that cause delays:</strong></p>
        <ul>
          <li>Entity validation failures (name/address mismatch with IRS records)</li>
          <li>Incomplete financial information requiring correction</li>
          <li>High processing volume (common at the start of the federal fiscal year in October)</li>
          <li>International entities requiring NCAGE code coordination</li>
          <li>Entities with complex organizational structures</li>
        </ul>
        <p>The best practice is to <strong>start your SAM.gov registration immediately</strong> — do not wait until you find an opportunity you want to bid on. Many businesses miss out on contracts because they start registration too late and cannot become active before the solicitation deadline. If you are considering government contracting even casually, get registered now so you are ready when the right opportunity appears.</p>
        <p>If your registration has been pending for more than 10 business days, contact the Federal Service Desk at <a href="https://www.fsd.gov" target="_blank" rel="noopener">fsd.gov</a> or call 1-866-606-8220 for status updates.</p>
      `,
    },
    {
      heading: 'Keeping Your SAM.gov Registration Active',
      content: `
        <p>SAM.gov registration is <strong>not a one-time event</strong>. Your registration expires after <strong>365 days</strong> and must be renewed annually. Letting your registration lapse has serious consequences:</p>
        <ul>
          <li>You become ineligible to receive new contract awards</li>
          <li>Payments on existing contracts may be delayed or suspended</li>
          <li>Your entity becomes invisible in SAM.gov searches to government buyers</li>
          <li>Some contract vehicles require continuous active registration as a condition of participation</li>
        </ul>
        <p><strong>Renewal Best Practices:</strong></p>
        <ul>
          <li><strong>Set calendar reminders at 90 and 60 days before expiration.</strong> SAM.gov sends email notifications, but do not rely solely on those — they sometimes go to spam or are missed.</li>
          <li><strong>Review and update your information during renewal.</strong> Has your address changed? Did you add new NAICS codes? Do you have new certifications? Renewal is the perfect time to refresh your profile.</li>
          <li><strong>Update your representations and certifications.</strong> Your business size status may change year to year. Ensure your certifications reflect your current situation.</li>
          <li><strong>Verify your banking information.</strong> If you changed banks or accounts since last year, update your EFT details during renewal.</li>
        </ul>
        <p>The renewal process is generally faster than the initial registration because your entity has already been validated. Most renewals are processed within <strong>3-5 business days</strong>. However, if significant changes are made to your entity data, it may require revalidation.</p>
        <p>Consider designating a specific person in your organization as the <strong>SAM.gov administrator</strong> responsible for maintaining the registration. This prevents the common situation where a registration lapses because the original registrant left the company and no one else had access to the account.</p>
      `,
    },
    {
      heading: 'Troubleshooting Common SAM.gov Issues',
      content: `
        <p>If you hit a roadblock during registration or renewal, here are the most common issues and their fixes:</p>
        <p><strong>"Entity not found" during validation</strong></p>
        <p>This usually means your business name or EIN does not match IRS records exactly. Request an IRS Letter 147C (call 1-800-829-4933) to confirm your exact legal name and EIN. Use that exact name — including punctuation, capitalization, and suffixes like "LLC" — in SAM.gov.</p>
        <p><strong>"CAGE code assignment pending" for weeks</strong></p>
        <p>CAGE codes are assigned by the DLA, which processes them separately. If your SAM registration is active but you still lack a CAGE code after 3 weeks, contact the DLA CAGE Program Office at cage@dla.mil. For more on CAGE codes, see our <a href="/guides/cage-code">complete CAGE code guide</a>.</p>
        <p><strong>Cannot log in / Login.gov issues</strong></p>
        <p>SAM.gov uses Login.gov for authentication. If you cannot log in, go to <a href="https://login.gov" target="_blank" rel="noopener">login.gov</a> directly to reset your password or reconfigure multi-factor authentication. SAM.gov support cannot help with Login.gov account issues.</p>
        <p><strong>Registration stuck on "Submitted" status</strong></p>
        <p>After 10+ business days with no progress, contact the Federal Service Desk at <a href="https://www.fsd.gov" target="_blank" rel="noopener">fsd.gov</a> or call 1-866-606-8220. Have your UEI ready. Common causes: IRS TIN matching delays, DLA CAGE processing backlog, or incomplete information that was not flagged.</p>
        <p><strong>EFT/banking validation failure</strong></p>
        <p>Ensure your bank account is set up to receive ACH (Automated Clearing House) transactions from the U.S. government. Some banks require you to specifically authorize government ACH payments. Contact your bank to verify your routing number format for government payments.</p>
        <p><strong>Renewal shows different information than expected</strong></p>
        <p>If your business has undergone changes (name change, address change, new ownership), you may need to update your IRS records first and then renew SAM.gov with the corrected information. SAM validates against IRS data on every renewal.</p>
      `,
    },
    {
      heading: 'What You Can Do on SAM.gov Beyond Registration',
      content: `
        <p>Many new contractors think of SAM.gov only as a registration portal, but it is actually the central hub for much of the federal procurement ecosystem. Here are the key features available to you:</p>
        <p><strong>Contract Opportunities</strong></p>
        <p>SAM.gov is where all federal contract opportunities above $25,000 are posted (this capability was formerly known as FedBizOpps). You can search for active solicitations, Sources Sought notices, and presolicitation announcements. Set up <strong>saved searches</strong> with your NAICS codes and keywords to receive daily email notifications of new opportunities. For a deeper dive on finding and evaluating opportunities, see our <a href="/guides/finding-government-contracts">guide to finding government contracts</a>.</p>
        <p><strong>Federal Contract Data</strong></p>
        <p>SAM.gov includes comprehensive federal contract award data (formerly hosted on the separate FPDS system). Search by agency, NAICS code, contractor name, or location to research the competitive landscape — who is winning contracts in your space, how much agencies are spending, and what types of contracts are being awarded. You can also use our <a href="/tools/expiring-contracts">Expiring Contracts Finder</a> to identify contracts coming up for recompete in your NAICS code.</p>
        <p><strong>Exclusions Search</strong></p>
        <p>Before teaming with another contractor or hiring a subcontractor, check the SAM.gov exclusions database. Excluded entities are barred from receiving federal contracts. Working with an excluded entity can put your own contracts at risk.</p>
        <p><strong>Wage Determinations</strong></p>
        <p>If you perform service contracts, SAM.gov provides Service Contract Act wage determinations that specify minimum wages and fringe benefits for workers on government contracts in specific geographic areas. These are critical for accurate pricing on service contracts.</p>
        <p><strong>Entity Information Search</strong></p>
        <p>Search for other registered entities to find potential teaming partners, verify competitor registrations, or research companies you might subcontract with. This is a valuable tool for building your government contracting network.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How do I register on SAM.gov step by step?',
      answer:
        'SAM.gov registration takes 7 steps: 1) Create a Login.gov account with your email, 2) Start entity registration on SAM.gov, 3) Validate your business name/EIN to get your UEI, 4) Your CAGE code is assigned automatically, 5) Enter core data (NAICS codes, business type), 6) Add banking info for payments, 7) Complete representations and certifications, then submit. Processing takes 7-10 business days.',
    },
    {
      question: 'What documents do I need for SAM.gov registration?',
      answer:
        'You need: 1) EIN/TIN from the IRS (your EIN assignment letter), 2) Legal business name exactly as it appears on IRS records, 3) Physical business address (no P.O. boxes), 4) Bank account and routing number for payments, 5) NAICS codes for your business activities, and 6) Contact information for your government business POC. Have your IRS Letter 147C ready if name validation fails.',
    },
    {
      question: 'Is SAM.gov registration really free?',
      answer:
        'Yes, SAM.gov registration is 100% free. The U.S. government does not charge any fee to register, renew, or update your entity registration. If someone contacts you demanding payment for SAM registration, it is a scam. Only use the official website at sam.gov. If you need free help, contact the Federal Service Desk at fsd.gov.',
    },
    {
      question: 'What is a UEI number and how do I get one?',
      answer:
        'The Unique Entity Identifier (UEI) is a 12-character alphanumeric code that identifies your business for federal contracting purposes. It replaced the DUNS number in April 2022. You receive your UEI automatically as part of the SAM.gov registration process at no cost. You do not need to apply for it separately.',
    },
    {
      question: 'What is a CAGE code and do I need one?',
      answer:
        'A Commercial and Government Entity (CAGE) code is a five-character identifier assigned by the Defense Logistics Agency. For domestic U.S. businesses, the CAGE code is assigned automatically during SAM.gov registration. You need it for government contracting and it will appear on your registration confirmation. International entities must obtain an NCAGE code before registering.',
    },
    {
      question: 'Can I register on SAM.gov as a sole proprietor?',
      answer:
        'Yes. Sole proprietors, LLCs, corporations, partnerships, and other business types can all register on SAM.gov. Sole proprietors use their Social Security Number (SSN) or EIN as their Tax Identification Number during registration. If you plan to pursue government contracts regularly, obtaining an EIN from the IRS is recommended for security purposes.',
    },
    {
      question: 'What happens if my SAM.gov registration expires?',
      answer:
        'If your registration expires, you become ineligible for new contract awards and may experience payment delays on existing contracts. Your entity will no longer appear in active SAM.gov searches. To restore your registration, log in to SAM.gov and complete the renewal process, which typically takes 3-5 business days. There is no penalty for lapsed registration — you simply renew and wait for reactivation.',
    },
    {
      question: 'I registered on SAM.gov but my status shows "inactive." What should I do?',
      answer:
        'An inactive status usually means your entity validation is still processing, your registration has expired, or there was an issue with your submitted information. Log in to SAM.gov to check for any error messages or action items. If no issues are shown and it has been more than 10 business days since submission, contact the Federal Service Desk at fsd.gov or call 1-866-606-8220 for assistance.',
    },
  ],
  cta: {
    heading: 'Get Registered and Start Competing for Contracts',
    description:
      'SAM.gov registration is just the first step. Our free GovCon course covers everything from registration through winning your first contract — including NAICS codes, capability statements, and proposal writing.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'government-contracting-for-beginners',
    'cage-code',
    'capability-statement',
  ],
  publishedDate: '2026-03-13',
};
