export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  content: string; // HTML
  faqs?: { question: string; answer: string }[];
  publishedDate: string;
  updatedDate?: string;
  author: string;
  category: string;
  relatedGuides: string[];
  featuredImage?: string;
  canonicalUrl?: string; // Point to canonical version if this is duplicate content
}

// Import all blog posts
import { post as wishIKnew } from './10-things-wish-i-knew';
import { post as whichCertification } from './which-sba-certification';
import { post as samSearchTricks } from './sam-gov-search-tricks';
import { post as bdJobsGuide } from './9-govcon-bd-jobs-150k';
import { post as captureManagerSalary } from './capture-manager-salary-guide';
import { post as proposalManagerCareer } from './proposal-manager-career-path';
import { post as noExperienceJobs } from './govcon-bd-jobs-no-experience';
import { post as pricingAnalystGuide } from './pricing-analyst-govcon-guide';
import { post as contractsAdminCareer } from './contracts-administrator-career';
// REMOVED: cage-code-lookup-guide - merged into /guides/cage-code with 301 redirect
import { post as samChecklist } from './sam-gov-registration-checklist';
import { post as certComparison } from './8a-vs-hubzone-vs-sdvosb';
import { post as winNoExperience } from './win-government-contracts-no-experience';
import { post as contractVehicles } from './federal-contract-vehicles-guide';
import { post as communicateWithCOs } from './communicate-with-contracting-officers';
import { post as vendorMistakes } from './vendor-mistakes-contracting-officers';
import { post as cmmcGuide } from './cmmc-2-compliance-guide';
import { post as oasisPlusGuide } from './oasis-plus-guide';
import { post as fy2026Trends } from './fy2026-contracting-trends';
// Migrated from the podcast SPA (2026-08-24 one-site consolidation) — slugs preserved exactly.
import { post as samNotStrategy } from './sam-gov-is-not-a-strategy';
import { post as eightAExplained } from './8a-program-explained';
import { post as firstProposalChecklist } from './first-proposal-checklist';
import { post as subcontractingSideDoor } from './subcontracting-side-door';
import { post as teamingAgreements101 } from './teaming-agreements-101';
import { post as progressPayments } from './progress-payments-guide';

export const allPosts: BlogPost[] = [
  // Migrated from the podcast SPA — one-site consolidation, 2026-08-24
  samNotStrategy,
  eightAExplained,
  firstProposalChecklist,
  subcontractingSideDoor,
  teamingAgreements101,
  progressPayments,
  // 2026 Trends & Hot Topics
  fy2026Trends,
  cmmcGuide,
  oasisPlusGuide,
  // GovCon Strategy
  vendorMistakes,
  communicateWithCOs,
  contractVehicles,
  winNoExperience,
  certComparison,
  samChecklist,
  // Jobs
  bdJobsGuide,
  captureManagerSalary,
  proposalManagerCareer,
  noExperienceJobs,
  pricingAnalystGuide,
  contractsAdminCareer,
  // Original posts
  wishIKnew,
  whichCertification,
  samSearchTricks,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
