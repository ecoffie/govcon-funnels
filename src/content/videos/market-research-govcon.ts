import type { VideoData } from './index';

export const video: VideoData = {
  slug: 'market-research-govcon',
  title: 'Federal Market Research: Find Your Target Agencies',
  metaTitle: 'Federal Market Research | Find Government Contract Opportunities',
  metaDescription:
    'Learn how to conduct federal market research. Find which agencies buy what you sell, analyze spending patterns, and identify your best opportunities.',
  keywords: [
    'federal market research',
    'government market research',
    'find government agencies',
    'usaspending research',
    'federal spending data',
    'agency spending analysis',
    'govcon market research',
  ],
  youtubeUrl: 'https://youtube.com/live/JAa1qkOrtic',
  youtubeId: 'JAa1qkOrtic',
  thumbnail: '/images/videos/Does the government buy.jpg',
  duration: '52:00',
  publishedDate: '2025-07-01',
  category: 'finding-opportunities',
  heroSubtitle:
    'Stop chasing random opportunities. Learn to identify the agencies most likely to buy from you.',

  content: `
    <p>Most contractors waste months chasing opportunities that were never a good fit. <strong>Smart contractors do their homework first.</strong> They know which agencies buy what they sell, how much they spend, and who they are currently buying from.</p>

    <p>This video shows you how to conduct proper federal market research using free government data sources.</p>

    <h3>Why Market Research Matters</h3>

    <p>Before you invest time in proposals, you need to know:</p>

    <ul>
      <li><strong>Does the government buy what you sell?</strong> — Not everything is purchased federally</li>
      <li><strong>Which agencies are the biggest buyers?</strong> — Focus where the money flows</li>
      <li><strong>What are they paying?</strong> — Understand price expectations</li>
      <li><strong>Who are the incumbents?</strong> — Know your competition</li>
      <li><strong>Are contracts expiring?</strong> — Find recompete opportunities</li>
    </ul>

    <h3>USASpending.gov: Your Primary Tool</h3>

    <p>USASpending.gov is the most powerful free tool for federal market research. Here is how to use it:</p>

    <p><strong>Step 1: Search by NAICS Code</strong></p>
    <p>Enter your primary NAICS code to see all federal spending in your industry. Filter by fiscal year to see recent trends.</p>

    <p><strong>Step 2: Identify Top Agencies</strong></p>
    <p>Sort results by agency. Which agencies spend the most in your NAICS? These are your primary targets.</p>

    <p><strong>Step 3: Analyze Contract Types</strong></p>
    <p>Filter by contract type (fixed-price, cost-plus, IDIQ, etc.) to understand how agencies prefer to buy.</p>

    <p><strong>Step 4: Research Incumbents</strong></p>
    <p>Click into individual contracts to see who won. These are your competitors — study them.</p>

    <p><strong>Step 5: Find Expiring Contracts</strong></p>
    <p>Filter by end date to identify contracts that will be recompeted. Early awareness gives you time to prepare.</p>

    <h3>Other Research Sources</h3>

    <p><strong>SAM.gov Contract Data</strong></p>
    <p>Search historical contract awards. Useful for finding specific contract vehicles and understanding award patterns.</p>

    <p><strong>Agency Forecast Portals</strong></p>
    <p>Many agencies publish forecasts of upcoming procurements. The Acquisition Gateway Forecast Tool aggregates these. Check forecasts quarterly.</p>

    <p><strong>Agency Strategic Plans</strong></p>
    <p>Every agency publishes strategic plans outlining priorities. These reveal where they will spend money in coming years.</p>

    <p><strong>Budget Documents</strong></p>
    <p>Agency budget justifications (available on agency websites) show specific program funding. Match your capabilities to funded programs.</p>

    <h3>Building Your Target Agency List</h3>

    <p>Based on your research, build a focused list of target agencies:</p>

    <p><strong>Tier 1: Primary Targets (3-5 agencies)</strong></p>
    <ul>
      <li>Highest spending in your NAICS</li>
      <li>Current or upcoming opportunities</li>
      <li>Good fit for your capabilities and certifications</li>
    </ul>

    <p><strong>Tier 2: Secondary Targets (5-10 agencies)</strong></p>
    <ul>
      <li>Moderate spending in your area</li>
      <li>Growing programs or new initiatives</li>
      <li>Less competition than Tier 1</li>
    </ul>

    <p><strong>Tier 3: Watch List</strong></p>
    <ul>
      <li>Agencies with potential but limited current spending</li>
      <li>Emerging opportunities to monitor</li>
    </ul>

    <h3>Competitive Intelligence</h3>

    <p>Once you know your target agencies, research the competition:</p>

    <ul>
      <li><strong>Who holds current contracts?</strong> — Search USASpending for recent awards</li>
      <li><strong>What are their strengths?</strong> — Review their capability statements and past performance</li>
      <li><strong>Where are they weak?</strong> — Identify gaps you can exploit</li>
      <li><strong>Are they vulnerable?</strong> — Check for CPARS issues, protests, or incumbents likely to lose recompetes</li>
    </ul>

    <h3>Tracking Your Research</h3>

    <p>Document everything in a structured format:</p>

    <ul>
      <li><strong>Agency profiles</strong> — Key contacts, spending patterns, buying preferences</li>
      <li><strong>Opportunity tracker</strong> — Active and upcoming solicitations with due dates</li>
      <li><strong>Competitor files</strong> — Strengths, weaknesses, contract history</li>
      <li><strong>Expiring contract calendar</strong> — Recompete opportunities 12-18 months out</li>
    </ul>

    <p>Update your research monthly. Markets change, and early awareness of shifts gives you competitive advantage.</p>
  `,

  takeaways: [
    'USASpending.gov shows which agencies spend the most in your NAICS codes',
    'Build a tiered target agency list (Tier 1: primary, Tier 2: secondary, Tier 3: watch)',
    'Research incumbents to understand your competition',
    'Use agency forecasts to identify opportunities before they hit SAM.gov',
    'Track expiring contracts for recompete opportunities',
  ],

  relatedGuides: [
    'federal-market-research',
    'finding-government-contracts',
    'naics-codes',
    'government-contracting-for-beginners',
  ],

  relatedJobs: ['capture-manager', 'bd-manager', 'bd-consultant'],

  cta: {
    heading: 'Want Automated Market Research?',
    description:
      'Our Mindy tool monitors your target agencies and alerts you to new opportunities automatically.',
    buttonText: 'Try Mindy Free',
    buttonHref: '/mi-free',
  },
};
