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

export const allPosts: BlogPost[] = [
  bdJobsGuide,
  captureManagerSalary,
  proposalManagerCareer,
  noExperienceJobs,
  pricingAnalystGuide,
  contractsAdminCareer,
  wishIKnew,
  whichCertification,
  samSearchTricks,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
