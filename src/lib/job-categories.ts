import type { JobCategory, CategoryInfo } from '@/types/job';

// The 9 GovCon BD roles from Eric's viral content
// Source: "9 Boring Government Contracting Business Jobs That Pay $150K+"
export const JOB_CATEGORIES: Record<JobCategory, CategoryInfo> = {
  'proposal-coordinator': {
    slug: 'proposal-coordinator',
    name: 'Proposal Coordinator',
    shortName: 'Proposal Coord',
    salaryRange: '$95,000 - $150,000',
    salaryMin: 95000,
    salaryMax: 150000,
    description: 'Coordinate proposal development, manage schedules, ensure compliance with RFP requirements.',
    certificationWeeks: [4],
    keywords: [
      'proposal coordinator',
      'proposal specialist',
      'proposal analyst',
      'proposal support',
      'proposal associate',
    ],
  },
  'pricing-analyst': {
    slug: 'pricing-analyst',
    name: 'Pricing Analyst',
    shortName: 'Pricing',
    salaryRange: '$120,000 - $180,000',
    salaryMin: 120000,
    salaryMax: 180000,
    description: 'Develop cost proposals, analyze pricing strategies, ensure competitive and compliant bids.',
    certificationWeeks: [2],
    keywords: [
      'pricing analyst',
      'cost analyst',
      'cost volume',
      'price analyst',
      'cost proposal',
      'pricing specialist',
    ],
  },
  'contracts-administrator': {
    slug: 'contracts-administrator',
    name: 'Contracts Administrator',
    shortName: 'Contracts',
    salaryRange: '$110,000 - $170,000',
    salaryMin: 110000,
    salaryMax: 170000,
    description: 'Manage contract administration, modifications, compliance, and closeout procedures.',
    certificationWeeks: [1],
    keywords: [
      'contract administrator',
      'contract specialist',
      'contracts manager',
      'contract management',
      'contracts analyst',
    ],
  },
  'capture-manager': {
    slug: 'capture-manager',
    name: 'Capture Manager',
    shortName: 'Capture Mgr',
    salaryRange: '$150,000 - $220,000',
    salaryMin: 150000,
    salaryMax: 220000,
    description: 'Lead capture efforts from opportunity identification through proposal submission. Develop win strategies and competitive assessments.',
    certificationWeeks: [1, 2, 3, 4],
    keywords: [
      'capture manager',
      'capture lead',
      'capture specialist',
      'capture analyst',
      'business capture',
    ],
  },
  'bd-manager': {
    slug: 'bd-manager',
    name: 'Business Development Manager',
    shortName: 'BD Manager',
    salaryRange: '$150,000 - $250,000',
    salaryMin: 150000,
    salaryMax: 250000,
    description: 'Identify and qualify new business opportunities, build customer relationships, develop pipeline.',
    certificationWeeks: [1, 2, 3],
    keywords: [
      'business development manager',
      'bd manager',
      'business development specialist',
      'business development lead',
      'bd lead',
      'growth manager',
    ],
  },
  'proposal-manager': {
    slug: 'proposal-manager',
    name: 'Proposal Manager',
    shortName: 'Proposal Mgr',
    salaryRange: '$160,000 - $240,000',
    salaryMin: 160000,
    salaryMax: 240000,
    description: 'Lead proposal teams, manage proposal development lifecycle, ensure compliant and compelling submissions.',
    certificationWeeks: [4],
    keywords: [
      'proposal manager',
      'proposal director',
      'proposal lead',
      'senior proposal manager',
      'proposal management',
    ],
  },
  'capture-director': {
    slug: 'capture-director',
    name: 'Capture Director',
    shortName: 'Capture Dir',
    salaryRange: '$180,000 - $300,000',
    salaryMin: 180000,
    salaryMax: 300000,
    description: 'Direct multiple capture campaigns, mentor capture managers, drive strategic pursuits.',
    certificationWeeks: [1, 2, 3, 4],
    keywords: [
      'capture director',
      'director of capture',
      'senior capture manager',
      'capture executive',
      'director capture management',
    ],
  },
  'vp-business-development': {
    slug: 'vp-business-development',
    name: 'VP of Business Development',
    shortName: 'VP BD',
    salaryRange: '$200,000 - $350,000',
    salaryMin: 200000,
    salaryMax: 350000,
    description: 'Lead business development organization, set growth strategy, manage executive relationships.',
    certificationWeeks: [1, 2, 3, 4],
    keywords: [
      'vp business development',
      'vice president bd',
      'svp growth',
      'vp growth',
      'vice president business development',
      'svp business development',
    ],
  },
  'bd-consultant': {
    slug: 'bd-consultant',
    name: 'BD Consultant',
    shortName: 'BD Consultant',
    salaryRange: '$200,000 - $500,000',
    salaryMin: 200000,
    salaryMax: 500000,
    description: 'Provide expert BD consulting, capture strategy, and proposal support to government contractors.',
    certificationWeeks: [1, 2, 3, 4],
    keywords: [
      'bd consultant',
      'capture consultant',
      'growth consultant',
      'proposal consultant',
      'business development consultant',
    ],
  },
  'other': {
    slug: 'other',
    name: 'Other GovCon Roles',
    shortName: 'Other',
    salaryRange: '$80,000 - $200,000',
    salaryMin: 80000,
    salaryMax: 200000,
    description: 'Other government contracting business development and support roles.',
    certificationWeeks: [],
    keywords: [],
  },
};

// Get all categories except 'other' for display
export function getDisplayCategories(): CategoryInfo[] {
  return Object.values(JOB_CATEGORIES).filter(c => c.slug !== 'other');
}

// Map a job title to a category
export function categorizeJob(title: string): JobCategory {
  const normalizedTitle = title.toLowerCase();

  for (const [category, info] of Object.entries(JOB_CATEGORIES)) {
    if (category === 'other') continue;

    for (const keyword of info.keywords) {
      if (normalizedTitle.includes(keyword)) {
        return category as JobCategory;
      }
    }
  }

  return 'other';
}

// Get category info by slug
export function getCategoryInfo(slug: JobCategory): CategoryInfo {
  return JOB_CATEGORIES[slug] || JOB_CATEGORIES['other'];
}

// Format salary range for display
export function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return 'Salary not specified';
  if (min && !max) return `$${(min / 1000).toFixed(0)}K+`;
  if (!min && max) return `Up to $${(max / 1000).toFixed(0)}K`;
  return `$${(min! / 1000).toFixed(0)}K - $${(max! / 1000).toFixed(0)}K`;
}

// Get certification weeks description
export function getCertificationMatch(category: JobCategory): string {
  const info = getCategoryInfo(category);
  if (info.certificationWeeks.length === 0) return '';
  if (info.certificationWeeks.length === 4) return 'Full 4-week program';
  return `Week ${info.certificationWeeks.join(', ')} of program`;
}

// Week descriptions for certification CTA
export const CERTIFICATION_WEEKS = {
  1: { title: 'Opportunity ID & Qualification', skills: ['Find opportunities', 'Qualify pursuits', 'Build pipeline'] },
  2: { title: 'Market Intel & Agency Analysis', skills: ['Research agencies', 'Analyze spending', 'Identify incumbents'] },
  3: { title: 'Teaming & Outreach Strategy', skills: ['Find partners', 'Build relationships', 'Develop teaming strategy'] },
  4: { title: 'Proposal Dev & Capture Planning', skills: ['Write proposals', 'Develop capture plans', 'Win strategies'] },
};
