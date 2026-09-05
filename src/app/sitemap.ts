import type { MetadataRoute } from 'next';
import { allPosts } from '@/content/blog';
import { allVideos } from '@/content/videos';
import { agencies } from '@/content/agencies';
import { episodes } from '@/lib/episodes';
import { SITE_URL } from '@/lib/seo';

// Job board categories for SEO
const jobCategories = [
  'proposal-coordinator',
  'pricing-analyst',
  'contracts-administrator',
  'capture-manager',
  'bd-manager',
  'proposal-manager',
  'capture-director',
  'vp-business-development',
  'bd-consultant',
  'defense',  // New: defense contractor jobs (2,480/mo)
  'remote',   // New: remote govcon jobs (800/mo)
];

const guidesSlugs = [
  'government-contracting-for-beginners',
  'sam-gov-registration',
  'cage-code',
  'capability-statement',
  'sba-certifications',
  '8a-certification',
  'vosb-certification',
  'hubzone-certification',
  'wosb-certification',
  'finding-government-contracts',
  'proposal-writing',
  'subcontracting-and-teaming',
  'federal-market-research',
  'gsa-schedule',
  'naics-codes',
  'ai-government-contracting',
  'rfp-response',
  'cmmc-certification',
  'contract-vehicles',
  'sources-sought',
  'oasis-plus',
  'past-performance',
  'teaming-agreements',
  'sole-source',
  'cpars',
  'set-asides',
  'gsa-advantage',
  'simplified-acquisition',
  'cost-proposals',
  'contract-modifications',
  'bid-no-bid',
  'mentor-protege-program',
  'joint-venture-requirements',
  'sba-size-standards',
  'capture-management',
  'firm-fixed-price-contracts',
  'cost-plus-contracts',
  'time-and-materials-contracts',
  'idiq-contracts',
  'bpa-agreements',
  'far-overview',
  'dcaa-audits',
  'indirect-rates',
  'gao-protests',
  'debriefings',
  'service-contract-act',
  'organizational-conflicts-interest',
  'contract-closeout',
  'subcontracting-plan',
  'security-clearances',
  'proposal-compliance-matrix',
  'price-to-win',
  'competitive-analysis',
  'government-proposal-reviews',
  'oral-presentations',
  'key-personnel',
  'labor-categories',
  'technical-evaluation',
  'incumbent-capture',
  'small-business-teaming',
  'contract-financing',
  'contract-types-comparison',
  'task-order-management',
  'option-years',
  'invoice-processing',
  'quality-assurance',
  'federal-supply-schedules',
  'government-contract-law',
  'performance-work-statement',
  'undefinitized-contract-actions',
  'stop-work-orders',
  'contract-data-rights',
  'compliance-program',
  'request-for-information',
  'sdvosb-certification',
  'construction-contracting',
  'it-contracting',
  'sbir-sttr',
  'agency-budgets',
  'contract-exit-strategy',
  'government-furnished-property',
  'pre-award-survey',
  'business-development-plan',
  'recompete-strategy',
  'contract-disputes',
  'terminations',
  'change-orders',
  'consent-to-subcontract',
  'customer-relationship-building',
  'market-positioning',
  'pipeline-management',
  'teaming-partner-selection',
  'rate-development',
  'cost-accounting-standards',
  'unallowable-costs',
  'fringe-benefit-calculations',
  'proposal-team-building',
  'win-themes',
  'proposal-graphics',
  'executive-summary',
  // Batch 2: Certifications
  'edwosb-certification',
  'ability-one-program',
  'veteran-business-guide',
  'indian-incentive-program',
  'sdb-certification',
  // Batch 2: Contract Execution
  'kick-off-meetings',
  'status-reporting',
  'earned-value-management',
  'contract-surveillance',
  'deliverables-management',
  // Batch 2: Advanced BD
  'ghosting-competitors',
  'black-hat-reviews',
  'gate-reviews',
  'proposal-orals-prep',
  'capture-plans',
  // Batch 2: Compliance
  'cybersecurity-requirements',
  'export-controls',
  'conflict-minerals',
  'counterfeit-parts',
  'ethics-compliance',
  // Batch 3: GSA/Vehicle Guides
  'gsa-mas-guide',
  'sewp-contracts',
  'alliant-gwac',
  'cio-sp4',
  'schedule-ordering',
  // Batch 3: Proposal Volumes
  'technical-volume',
  'management-volume',
  'past-performance-volume',
  'small-business-participation',
  'pricing-volume',
  // Batch 3: Career/Industry
  'contract-specialist-career',
  'proposal-manager-career',
  'capture-manager-career',
  'healthcare-contracting',
  'professional-services',
  // Batch 3: Contract Admin
  'novation-agreements',
  'ratification',
  'award-fee-contracts',
  'letter-contracts',
  'agency-level-protests',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/resources/handouts`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/premium`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/mi-free`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/tools/cage-code-lookup`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/tools/expiring-contracts`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/consulting`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/government-contract-help`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/proposal-writing-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/federal-contractor`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // SaaS Pages - Features & Product
    { url: `${SITE_URL}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/demo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // SaaS Pages - Comparison
    { url: `${SITE_URL}/compare/deltek`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/govtribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/federal-compass`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/highergov`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/bloomberg-government`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/fedscout`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compare/fed-spend`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // SaaS Pages - Migration Guides
    { url: `${SITE_URL}/migration/govwin`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/migration/govtribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // SaaS Pages - Industry Verticals
    { url: `${SITE_URL}/for/it-contractors`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/construction`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/professional-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/staffing-agencies`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // SaaS Pages - Certification Verticals
    { url: `${SITE_URL}/for/8a-contractors`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/sdvosb`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/hubzone`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/for/wosb`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Partner Pages
    { url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/for/apex-accelerators`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/for/sbdc`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/for/chambers`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/upskilling`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const guidePages: MetadataRoute.Sitemap = guidesSlugs.map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedDate || post.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Job category landing pages for SEO (clean URLs)
  const jobPages: MetadataRoute.Sitemap = jobCategories.map((category) => ({
    url: `${SITE_URL}/jobs/${category}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Video landing pages
  const videoPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/videos`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...allVideos.map((video) => ({
      url: `${SITE_URL}/videos/${video.slug}`,
      lastModified: video.publishedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Agency profile pages
  const agencyPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/data/agencies`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...agencies.map((agency) => ({
      url: `${SITE_URL}/data/agencies/${agency.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Contractor index page (dynamic profiles are server-rendered, not in sitemap)
  const contractorPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/data/contractors`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Forecast page (gated content, index page for SEO)
  const forecastPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/data/forecasts`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Podcast: the index plus one entry per episode, addressed by STABLE SLUG.
  // Legacy `/podcast/:index` URLs are deliberately absent — they 308 to the slug, and
  // a sitemap should only ever list the canonical destination, never a redirect.
  // `lastModified` is the episode's own publish date, not the build time.
  const podcastPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/podcast`, lastModified: episodes[0]?.date ?? now, changeFrequency: 'daily' as const, priority: 0.9 },
    ...episodes.map((episode) => ({
      url: `${SITE_URL}/podcast/${episode.slug}`,
      lastModified: episode.date,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...guidePages, ...blogPages, ...jobPages, ...videoPages, ...agencyPages, ...contractorPages, ...forecastPages, ...podcastPages];
}
