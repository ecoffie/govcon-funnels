export type ArticleCategory =
  | 'Getting Started'
  | 'Registrations'
  | 'Certifications'
  | 'Proposals'
  | 'Money & Billing'
  | 'Strategy';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  /** ISO date string (YYYY-MM) */
  date: string;
  readTime: string;
  /** Thumbnail served from /public */
  thumbnail: string;
  featured?: boolean;
}

/** 9 posts per design/blog.md (metadata only — article bodies owned elsewhere). */
export const articles: Article[] = [
  {
    slug: 'sam-gov-is-not-a-strategy',
    title: 'SAM.gov Is Not a Strategy: Where Contracts Actually Come From',
    excerpt:
      'Everyone tells you to register on SAM.gov and wait. Nobody tells you that the contractors winning consistently treat SAM.gov as the last step, not the first. Here is where federal deals actually originate — and how to get in front of them early.',
    category: 'Strategy',
    date: '2026-07',
    readTime: '9 min',
    thumbnail: '/blog-thumb-samgov.png',
    featured: true,
  },
  {
    slug: '8a-program-explained',
    title: "The 8(a) Program, Explained Like You're Busy",
    excerpt:
      'Nine years of sole-source eligibility, a Business Opportunity Specialist, and set-aside contracts most small businesses never touch. The 8(a) program in plain English: who qualifies, what it actually gets you, and the mistakes that stall applications for years.',
    category: 'Certifications',
    date: '2026-07',
    readTime: '7 min',
    thumbnail: '/blog-thumb-8a.png',
  },
  {
    slug: 'cmmc-real-math',
    title: "CMMC Won't Cost You $250K. Here's the Real Math.",
    excerpt:
      'Consultants love quoting six-figure CMMC numbers because fear sells gap assessments. The real cost depends on your level, your CUI footprint, and how much you can self-perform. A line-item breakdown of what small contractors actually spend.',
    category: 'Certifications',
    date: '2026-06',
    readTime: '6 min',
    thumbnail: '/blog-thumb-cmmc.png',
  },
  {
    slug: 'first-proposal-checklist',
    title: 'Your First Federal Proposal: The 12-Point Checklist',
    excerpt:
      'Most first proposals lose on compliance, not price. Twelve checks — from Section L instructions to page limits, past performance write-ups, and the pricing volume — that keep your bid out of the rejection pile.',
    category: 'Proposals',
    date: '2026-06',
    readTime: '11 min',
    thumbnail: '/blog-thumb-proposal.png',
  },
  {
    slug: 'subcontracting-side-door',
    title: 'The Side Door: Winning Subcontracts With Defense Primes',
    excerpt:
      'You do not need to win the prime contract to get federal revenue. Primes are required to subcontract to small businesses — and they are actively looking for reliable partners. How to find, pitch, and keep subcontract work flowing.',
    category: 'Strategy',
    date: '2026-05',
    readTime: '8 min',
    thumbnail: '/blog-thumb-subcontract.png',
  },
  {
    slug: 'teaming-agreements-101',
    title: 'Teaming Agreements 101: Partner Without Getting Burned',
    excerpt:
      'A teaming agreement can double your capacity — or hand your customer to a competitor. The clauses that matter (exclusivity, workshare, non-solicitation), when to sign, and the red flags that mean walk away.',
    category: 'Strategy',
    date: '2026-05',
    readTime: '8 min',
    thumbnail: '/blog-thumb-teaming.png',
  },
  {
    slug: 'register-right-first-time',
    title: 'SAM.gov Registration, Right the First Time',
    excerpt:
      'UEI, CAGE code, reps and certs, NAICS selection — one wrong field and your registration sits in review for weeks. A field-by-field walkthrough of SAM.gov registration that gets you active in days, not months.',
    category: 'Registrations',
    date: '2026-04',
    readTime: '10 min',
    thumbnail: '/blog-thumb-samgov.png',
  },
  {
    slug: 'progress-payments-guide',
    title: 'Progress Payments: How Contractors Actually Get Paid',
    excerpt:
      'Federal contracts do not have to starve your cash flow. Progress payments, milestone billing, and the Prompt Payment Act let you invoice as you perform. How to structure payment terms before you sign.',
    category: 'Money & Billing',
    date: '2026-04',
    readTime: '7 min',
    thumbnail: '/blog-thumb-proposal.png',
  },
  {
    slug: 'start-govcon-no-experience',
    title: 'Starting in GovCon With Zero Experience: The 90-Day Path',
    excerpt:
      'No past performance, no network, no certifications — yet. A week-by-week 90-day plan that takes you from registration to your first bid, using only free resources and the playbook Eric used to win his first contract.',
    category: 'Getting Started',
    date: '2026-03',
    readTime: '12 min',
    thumbnail: '/blog-thumb-8a.png',
  },
];

export const articleCategories: ('All' | ArticleCategory)[] = [
  'All',
  'Getting Started',
  'Registrations',
  'Certifications',
  'Proposals',
  'Money & Billing',
  'Strategy',
];

export const latestArticles = (n: number): Article[] => articles.slice(0, n);
