import type { VideoData } from './index';

export const video: VideoData = {
  slug: 'find-government-contracts',
  title: 'How to Find Government Contract Opportunities',
  metaTitle: 'How to Find Government Contracts | SAM.gov Search Guide',
  metaDescription:
    'Master the art of finding federal contract opportunities. Learn to search SAM.gov effectively, use filters, and identify contracts perfect for your business.',
  keywords: [
    'how to find government contracts',
    'sam.gov search',
    'find federal contracts',
    'government contract opportunities',
    'search sam.gov',
    'federal contract search',
    'government rfp search',
  ],
  youtubeUrl: 'https://www.youtube.com/live/Ko1N0TMAAs0',
  youtubeId: 'Ko1N0TMAAs0',
  thumbnail: '/images/videos/Navigating Government bid.jpg',
  duration: '52:00',
  publishedDate: '2025-07-20',
  category: 'finding-opportunities',
  heroSubtitle:
    'Stop missing opportunities. Learn exactly where to find contracts and how to filter for the ones that match your business.',

  content: `
    <p>One of the biggest challenges for new government contractors is simply <strong>finding the right opportunities</strong>. With thousands of solicitations posted daily across multiple platforms, it is easy to feel overwhelmed — or worse, miss perfect-fit contracts entirely.</p>

    <p>This video shows you exactly where to search, how to set up alerts, and what to look for when evaluating opportunities.</p>

    <h3>Where Government Contracts Are Posted</h3>

    <p>Federal contract opportunities are posted across several platforms. Here is where you need to look:</p>

    <ul>
      <li><strong>SAM.gov</strong> — The primary source for all federal contract opportunities over $25,000. This is where you will spend most of your time searching.</li>
      <li><strong>Agency Forecast Portals</strong> — Many agencies publish upcoming opportunities before they hit SAM.gov. The Acquisition Gateway Forecast Tool consolidates these.</li>
      <li><strong>GovWin IQ</strong> — A commercial intelligence platform that aggregates opportunities and provides competitive insights (paid subscription).</li>
      <li><strong>USAspending.gov</strong> — Not for finding new opportunities, but essential for researching expiring contracts that may be recompeted.</li>
    </ul>

    <h3>Mastering SAM.gov Search</h3>

    <p>SAM.gov can be frustrating if you do not know how to use it properly. Here are the key techniques:</p>

    <p><strong>Use NAICS Code Filters</strong> — Every solicitation is tagged with NAICS codes. Filter by your primary NAICS codes to see only relevant opportunities.</p>

    <p><strong>Set-Aside Filters</strong> — If you have small business certifications (8(a), HUBZone, SDVOSB, WOSB), filter for set-aside opportunities where you have an advantage.</p>

    <p><strong>Geographic Filters</strong> — Some contracts require work in specific locations. Filter by place of performance if location matters for your business.</p>

    <p><strong>Saved Searches</strong> — Create saved searches with your filters and receive daily email alerts when new matching opportunities are posted.</p>

    <h3>Types of Opportunities to Look For</h3>

    <p>Not all opportunities are created equal. Here is what to prioritize:</p>

    <ul>
      <li><strong>Sources Sought / RFI</strong> — These are market research notices. Responding helps you get on the agency's radar before the solicitation drops.</li>
      <li><strong>Sole Source Notices</strong> — When an agency plans to award without competition, they must justify it. These reveal who the incumbent is and what the agency values.</li>
      <li><strong>Presolicitation Notices</strong> — Early announcements of upcoming solicitations. Start preparing before the official RFP drops.</li>
      <li><strong>Combined Synopsis/Solicitation</strong> — Active opportunities accepting proposals. This is where the action is.</li>
    </ul>

    <h3>Red Flags to Avoid</h3>

    <p>Not every opportunity is worth pursuing. Watch out for:</p>

    <ul>
      <li><strong>Short response windows</strong> — If you only have 5 days to respond to a complex RFP, the incumbent likely has an advantage.</li>
      <li><strong>Highly specific requirements</strong> — Requirements that seem tailored to one company often indicate a wired contract.</li>
      <li><strong>Past performance requirements you cannot meet</strong> — Do not waste time on contracts requiring 3+ similar projects if you have none.</li>
      <li><strong>Below your capacity</strong> — Chasing $50K contracts when you can handle $500K spreads you too thin.</li>
    </ul>

    <h3>Building Your Opportunity Pipeline</h3>

    <p>Winning contractors do not chase random opportunities. They build a <strong>pipeline</strong> of targeted contracts:</p>

    <ol>
      <li><strong>Identify 5-10 target agencies</strong> that buy what you sell most often</li>
      <li><strong>Track their expiring contracts</strong> using USAspending.gov contract data</li>
      <li><strong>Monitor their forecast</strong> for upcoming procurements</li>
      <li><strong>Build relationships</strong> with their small business offices (OSDBU)</li>
      <li><strong>Respond to market research</strong> notices to get on their radar</li>
    </ol>

    <p>This proactive approach beats reactive searching every time.</p>
  `,

  takeaways: [
    'SAM.gov is the primary source for federal contract opportunities over $25K',
    'Use NAICS codes and set-aside filters to find relevant opportunities',
    'Set up saved searches with email alerts to never miss a match',
    'Sources Sought notices help you get on agency radar before RFPs drop',
    'Build a pipeline of target agencies rather than chasing random opportunities',
  ],

  relatedGuides: [
    'finding-government-contracts',
    'naics-codes',
    'sam-gov-registration',
    'federal-market-research',
  ],

  relatedJobs: ['capture-manager', 'bd-manager', 'proposal-coordinator'],

  cta: {
    heading: 'Want Help Finding Contracts?',
    description:
      'Our Opportunity Hunter tool automatically finds and analyzes contracts matching your business. Stop spending hours searching SAM.gov.',
    buttonText: 'Try Opportunity Hunter',
    buttonHref: '/opp',
  },
};
