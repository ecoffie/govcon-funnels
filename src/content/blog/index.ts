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
import { post as cageCodeLookup } from './cage-code-lookup-guide';
import { post as samChecklist } from './sam-gov-registration-checklist';
import { post as certComparison } from './8a-vs-hubzone-vs-sdvosb';
import { post as winNoExperience } from './win-government-contracts-no-experience';
import { post as contractVehicles } from './federal-contract-vehicles-guide';
import { post as communicateWithCOs } from './communicate-with-contracting-officers';
import { post as vendorMistakes } from './vendor-mistakes-contracting-officers';

export const allPosts: BlogPost[] = [
  // GovCon Strategy
  vendorMistakes,
  communicateWithCOs,
  contractVehicles,
  winNoExperience,
  certComparison,
  cageCodeLookup,
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
