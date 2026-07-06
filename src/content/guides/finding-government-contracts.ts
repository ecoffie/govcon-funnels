import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'finding-government-contracts',
  title: 'How to Find Government Contracts: A Complete Guide',
  metaTitle: 'How to Find Government Contracts [Free Tool] — SAM.gov Search Guide',
  metaDescription:
    'Find federal contracts on SAM.gov: RFPs, RFQs, set-asides by NAICS code. Free search tool + 5 filters that surface opportunities your competitors miss.',
  keywords: [
    'how to find government contracts',
    'government contracts for small business',
    'SAM.gov contract opportunities',
    'federal contracts',
    'government RFP',
    'small business set-aside',
    'NAICS codes government contracting',
    'bid on government contracts',
    'government solicitations',
    'find federal contracts',
  ],
  heroSubtitle:
    'The federal government spends over $700 billion annually on contracts. Learn exactly where to find opportunities, how to evaluate them, and which tools give you a competitive edge.',
  sections: [
    {
      heading: 'Where to Find Federal Contracts on SAM.gov',
      content: `
        <p>The primary source for federal contract opportunities is <strong>SAM.gov</strong> (System for Award Management). Every federal agency is required to post contract opportunities over $25,000 on SAM.gov's Contract Opportunities section, which replaced the legacy FedBizOpps (FBO) platform.</p>
        <p>To search for opportunities on SAM.gov:</p>
        <ul>
          <li><strong>Visit sam.gov/search</strong> and select "Contract Opportunities" as the domain</li>
          <li><strong>Filter by keyword, NAICS code, set-aside type, agency, or location</strong> to narrow results</li>
          <li><strong>Set up saved searches</strong> with email notifications so new opportunities come to you automatically</li>
          <li><strong>Review the "Active" filter</strong> to see currently open solicitations you can bid on right now</li>
        </ul>
        <p>Beyond SAM.gov, there are additional sources worth monitoring. <strong>USAspending.gov</strong> shows historical spending data so you can see which agencies are buying what you sell. <strong>Agency-specific procurement forecast pages</strong> list upcoming opportunities that haven't been formally solicited yet, giving you a head start on capture. Understanding <a href="/guides/agency-budgets">agency budgets</a> helps you identify which programs have funding and are likely to result in contract awards.</p>
        <p>Many contractors also monitor <strong>GovWin</strong>, <strong>Bloomberg Government (BGOV)</strong>, and other paid platforms that aggregate opportunities and add intelligence layers. However, every opportunity on those platforms originates from SAM.gov, so mastering the free government source first is essential. Looking for a <a href="/compare/deltek">GovWin alternative</a> that doesn't cost $25K/year? There are more affordable options. The key is building a systematic daily or weekly search habit rather than checking sporadically.</p>
      `,
    },
    {
      heading: 'Understanding Solicitation Types: RFP, RFQ, RFI, and Sources Sought',
      content: `
        <p>Federal agencies use different solicitation types depending on what they're buying and how far along they are in the procurement process. Understanding these distinctions is critical for knowing how to respond appropriately.</p>
        <ul>
          <li><strong>Request for Proposal (RFP)</strong> — A formal solicitation where the government asks for a detailed technical and cost proposal. RFPs are used for complex services and products where the agency evaluates proposals based on a "best value" or "trade-off" methodology, not just lowest price.</li>
          <li><strong>Request for Quotation (RFQ)</strong> — Used primarily for commercial items and simpler procurements. The government describes what they need, and vendors provide a price quote. RFQs are common under the Federal Supply Schedule (GSA) and simplified acquisition procedures.</li>
          <li><strong>Request for Information (RFI)</strong> — Not a solicitation to bid. An RFI is the government doing market research, asking industry what's available and what's possible. <strong>Always respond to RFIs</strong> — they shape future solicitations and put your company on the agency's radar.</li>
          <li><strong>Sources Sought</strong> — Similar to an RFI, a sources sought notice asks industry to demonstrate capability. The agency uses responses to determine whether to set aside the procurement for small business or compete it full-and-open. Learn how to respond effectively in our <a href="/guides/sources-sought">Sources Sought Guide</a>.</li>
          <li><strong>Pre-Solicitation Notice</strong> — Advance notice that a solicitation is coming. Use this time to prepare your team, identify teaming partners, and study the requirement.</li>
        </ul>
        <p>A common mistake new contractors make is only responding to RFPs. By the time an RFP drops, competitors who responded to the RFI and sources sought notice already have a relationship with the agency. Engaging early in the procurement cycle dramatically improves your win probability.</p>
      `,
    },
    {
      heading: 'Using NAICS Codes Effectively',
      content: `
        <p>Every federal contract opportunity is classified under a <strong>North American Industry Classification System (NAICS) code</strong>. These six-digit codes categorize businesses by industry and are central to how the government finds vendors and how small businesses qualify for set-asides.</p>
        <p>Here's how to use NAICS codes strategically:</p>
        <ul>
          <li><strong>Identify your primary and secondary NAICS codes.</strong> Most businesses qualify under multiple codes. For example, an IT company might use 541512 (Computer Systems Design) as its primary code but also qualify under 541519 (Other Computer Related Services) and 541611 (Administrative Management Consulting).</li>
          <li><strong>Verify size standards for each code.</strong> The SBA assigns a size standard to every NAICS code — measured by annual revenue or number of employees. You must be under the threshold to qualify as "small" for that code. Check the <a href="https://www.sba.gov/size-standards" target="_blank" rel="noopener">SBA Size Standards Tool</a> for current thresholds.</li>
          <li><strong>Add all relevant NAICS codes to your SAM.gov registration.</strong> Contracting officers search by NAICS code when doing market research. If your code isn't listed, you won't appear in their searches.</li>
          <li><strong>Research spending by NAICS code on USAspending.gov.</strong> This tells you which agencies spend the most in your industry and what the average contract value looks like.</li>
        </ul>
        <p>A strategic approach is to look at NAICS codes where you meet the size standard but larger competitors might not. This creates less competitive pools where your chances of winning are significantly higher. Also pay attention to <strong>PSC (Product Service Codes)</strong>, which provide an additional layer of classification that agencies use alongside NAICS codes in their procurement planning.</p>
      `,
    },
    {
      heading: 'Set-Aside Opportunities for Small Business',
      content: `
        <p>The federal government is required by law to award at least <strong>23% of prime contract dollars to small businesses</strong>. To meet this goal, agencies use "set-asides" — contracts restricted to specific categories of small businesses. Understanding set-asides is one of the biggest advantages a small contractor can have.</p>
        <p>The main set-aside categories are:</p>
        <ul>
          <li><strong>Small Business Set-Aside</strong> — Open to any business that qualifies as small under the relevant NAICS code size standard</li>
          <li><strong>8(a) Business Development</strong> — For socially and economically disadvantaged small businesses enrolled in SBA's 8(a) program. 8(a) firms can receive <a href="/guides/sole-source">sole-source contracts</a> up to $4.5 million (services) or $7 million (manufacturing). See our <a href="/guides/8a-certification">8(a) Certification Guide</a>.</li>
          <li><strong>HUBZone</strong> — For businesses located in Historically Underutilized Business Zones with employees who live in HUBZones. Provides a 10% price evaluation preference.</li>
          <li><strong>Service-Disabled Veteran-Owned Small Business (SDVOSB)</strong> — Now certified through the SBA's Veteran Small Business Certification program (vetcert.sba.gov). Previously self-certified, now requires formal SBA certification.</li>
          <li><strong>Women-Owned Small Business (WOSB/EDWOSB)</strong> — Certified through SBA or an approved third-party certifier. Set-asides available in designated NAICS codes where WOSBs are underrepresented.</li>
        </ul>
        <p>To find set-aside opportunities, filter by "Set Aside" on SAM.gov Contract Opportunities. You can also use the <strong>SBA Small Business Search</strong> at <a href="https://search.certifications.sba.gov" target="_blank" rel="noopener">search.certifications.sba.gov</a> to find other certified small businesses for potential teaming arrangements. Certifications significantly reduce competition — a full-and-open contract might have 50 bidders, while an SDVOSB set-aside might have 5.</p>
      `,
    },
    {
      heading: 'State and Local Government Contracts',
      content: `
        <p>While federal contracts get the most attention, <strong>state and local governments collectively spend over $2 trillion annually</strong> on goods and services. These opportunities are often easier to win, have lower barriers to entry, and can build the past performance you need for federal work.</p>
        <p>Key sources for state and local opportunities:</p>
        <ul>
          <li><strong>State procurement portals</strong> — Every state has a centralized procurement website. Search for "[your state] procurement" or "[your state] vendor registration." Many states also maintain approved vendor lists.</li>
          <li><strong>Local government purchasing departments</strong> — Cities, counties, school districts, and special districts all buy goods and services. Contact the purchasing department directly or check their websites for bid postings.</li>
          <li><strong>Cooperative purchasing agreements</strong> — Programs like NASPO ValuePoint, U.S. Communities, and Sourcewell allow governments to buy from pre-competed contracts. Getting on these vehicles gives you access to thousands of government buyers.</li>
          <li><strong>Substate entities</strong> — Don't overlook transit authorities, water districts, housing authorities, and public universities. These agencies often have significant budgets and less competition.</li>
        </ul>
        <p>Many state and local contracts have <strong>lower dollar thresholds for formal solicitations</strong>, meaning more opportunities go through simplified purchasing processes. Some jurisdictions also have their own small business preference programs, minority business enterprise (MBE) programs, and local preference policies. Register as a vendor in the states and municipalities where you operate — this alone can generate inbound opportunities via vendor notification systems.</p>
      `,
    },
    {
      heading: 'Using Tools to Streamline Your Contract Search',
      content: `
        <p>Manually searching SAM.gov every day is time-consuming and inefficient. Smart contractors use tools to automate their opportunity pipeline and focus their energy on opportunities they can actually win. A growing number now use <a href="/guides/ai-government-contracting">AI for government contracting</a> to find matched opportunities, research competitors, and draft proposals in a fraction of the time.</p>
        <p>Here's what a streamlined search process looks like:</p>
        <ul>
          <li><strong>Automated alerts</strong> — Set up saved searches on SAM.gov with email notifications. Configure alerts for your NAICS codes, keywords, and target agencies so new opportunities arrive in your inbox daily.</li>
          <li><strong>Opportunity tracking spreadsheet or CRM</strong> — Track every opportunity you're monitoring with key dates (due date, Q&A deadline, site visit), your bid/no-bid decision, and your capture status. Even a simple spreadsheet beats keeping everything in your head.</li>
          <li><strong>Pipeline management</strong> — Categorize opportunities by stage: monitoring, pursuing, proposal in progress, submitted, awarded. This gives you a clear picture of your business development pipeline at any time.</li>
          <li><strong>Historical data research</strong> — Use USAspending.gov and SAM.gov's contract data search to see who won previous iterations of a contract, what they bid, and what the evaluation criteria were. This intelligence is gold for competitive positioning.</li>
          <li><strong>Expiring contracts finder</strong> — Use our free <a href="/tools/expiring-contracts">Expiring Contracts Finder</a> to identify federal contracts coming up for recompete. When an incumbent's contract is ending, that's your opportunity to position for the follow-on award.</li>
        </ul>
        <p>The GovCon Giants <strong>Mindy</strong> tool is designed specifically for this workflow — aggregating federal opportunities, filtering by your profile, and surfacing the ones where you have the best chance of winning. The goal is to spend less time searching and more time on capture activities: meeting with agency contacts, building teaming relationships, and writing competitive proposals.</p>
        <p>Whatever tools you use, the key is <strong>consistency</strong>. The contractors who win are the ones who review opportunities daily, respond to every relevant RFI, and maintain a disciplined pipeline.</p>
      `,
    },
    {
      heading: 'Evaluating Opportunities: The Bid/No-Bid Decision',
      content: `
        <p>One of the most important skills in government contracting is knowing which opportunities to pursue and which to pass on. Chasing every solicitation wastes time and money on proposals you're unlikely to win. A disciplined <strong>bid/no-bid process</strong> is what separates profitable contractors from those burning resources.</p>
        <p>Use these criteria to evaluate every opportunity. For a complete framework, see our <a href="/guides/bid-no-bid">Bid/No-Bid Decision Guide</a>.</p>
        <ul>
          <li><strong>Can you do the work?</strong> Do you have the technical capability, staff, and <a href="/guides/past-performance">past performance</a> to deliver? If the solicitation requires qualifications you don't have, it's a no-bid unless you can team with a partner who does.</li>
          <li><strong>Is it the right size?</strong> A contract that's too small won't be profitable. One that's too large might exceed your capacity. Target opportunities that align with your current revenue and staffing levels.</li>
          <li><strong>Do you have a competitive advantage?</strong> Incumbent contractors win recompetes at a high rate. If you're bidding against an incumbent with no differentiator, your odds are low. Look for opportunities where you have an edge — better technical approach, relevant past performance, set-aside eligibility, or a relationship with the agency.</li>
          <li><strong>Do you have enough time?</strong> If you find a solicitation with a response due in 5 days and you have no preparation, that's usually a no-bid. Winning proposals take time to research, write, review, and refine.</li>
          <li><strong>What's the evaluation criteria?</strong> If it's Lowest Price Technically Acceptable (LPTA), you need to be the cheapest. If it's best value, you can compete on quality. Know which game you're playing.</li>
        </ul>
        <p>Create a simple <strong>bid/no-bid scorecard</strong> with weighted criteria. Score every opportunity objectively before committing resources. Most experienced contractors pursue only 20-30% of the opportunities they review, and their win rates are dramatically higher as a result.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Where is the best place to find government contracts?',
      answer:
        'SAM.gov is the official, free source for all federal contract opportunities over $25,000. Every federal agency is required to post solicitations there. For state and local contracts, check individual state procurement portals. You can also use USAspending.gov to research historical spending and identify agencies that buy what you sell.',
    },
    {
      question: 'Do I need to be registered anywhere before I can bid on government contracts?',
      answer:
        'Yes. At minimum, you need an active SAM.gov registration (which includes obtaining a UEI number). The registration process typically takes 7-10 business days. Some opportunities also require a GSA Schedule contract or specific certifications like 8(a) or SDVOSB. Complete your SAM.gov registration before you start searching for opportunities.',
    },
    {
      question: 'How much does it cost to find and bid on government contracts?',
      answer:
        'Searching for opportunities on SAM.gov is completely free, and SAM.gov registration is free. There is no cost to submit proposals to the federal government. However, writing proposals requires a significant time investment, and some contractors invest in paid tools, databases, or consultants to improve their search efficiency and win rates.',
    },
    {
      question: 'What is the difference between an RFP and an RFQ?',
      answer:
        'An RFP (Request for Proposal) asks for a detailed technical and cost proposal and is used for complex procurements evaluated on best value. An RFQ (Request for Quotation) asks for a price quote on a specific item or service and is common for commercial products and simpler requirements. RFPs require significantly more effort to respond to than RFQs.',
    },
    {
      question: 'Can a brand new company win government contracts?',
      answer:
        'Yes, but it takes strategic positioning. New companies often start with micro-purchases (under $10,000), simplified acquisitions (under $250,000), set-aside contracts where competition is limited, or subcontracting under an established prime contractor. Building past performance through smaller contracts is the typical path to winning larger opportunities.',
    },
    {
      question: 'How long does it take from finding a contract to getting paid?',
      answer:
        'The timeline varies significantly. After finding an opportunity, proposal deadlines are typically 15-45 days out. The evaluation and award process can take 2-6 months or longer. Once awarded and work begins, federal agencies are required by the Prompt Payment Act to pay within 30 days of receiving a proper invoice. The full cycle from finding an opportunity to first payment can be 6-12 months.',
    },
  ],
  cta: {
    heading: 'Stop Searching. Start Finding.',
    description:
      'Mindy surfaces the federal contracts that match your business, so you spend less time searching and more time winning.',
    buttonText: 'Try Mindy Free',
    buttonHref: '/mi-free',
  },
  relatedGuides: [
    'ai-government-contracting',
    'sbir-sttr',
    'agency-budgets',
    'government-contracting-for-beginners',
    'federal-market-research',
    'proposal-writing',
    'bid-no-bid',
    'sources-sought',
    'set-asides',
  ],
  publishedDate: '2026-03-13',
};
