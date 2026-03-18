export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroSubtitle: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  relatedGuides: string[];
  relatedJobs?: string[]; // Job category slugs for internal linking
  publishedDate: string;
  updatedDate?: string;
}

// Map guides to relevant job categories for internal linking
export const GUIDE_JOB_MAPPING: Record<string, string[]> = {
  'proposal-writing': ['proposal-manager', 'proposal-coordinator', 'pricing-analyst'],
  'finding-government-contracts': ['bd-manager', 'capture-manager', 'bd-consultant'],
  'federal-market-research': ['capture-manager', 'bd-manager', 'pricing-analyst'],
  'capability-statement': ['bd-manager', 'proposal-coordinator', 'capture-manager'],
  'subcontracting-and-teaming': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'government-contracting-for-beginners': ['bd-manager', 'proposal-coordinator', 'contracts-administrator'],
  'gsa-schedule': ['contracts-administrator', 'bd-manager', 'pricing-analyst'],
  'sam-gov-registration': ['contracts-administrator', 'bd-manager'],
  'cage-code': ['contracts-administrator'],
  'sba-certifications': ['bd-manager', 'capture-manager'],
  '8a-certification': ['bd-manager', 'capture-manager'],
  'ai-government-contracting': ['proposal-manager', 'capture-manager', 'bd-consultant'],
};

// Import all guides
import { guide as governmentContractingForBeginners } from './government-contracting-for-beginners';
import { guide as samGovRegistration } from './sam-gov-registration';
import { guide as capabilityStatement } from './capability-statement';
import { guide as sbaCertifications } from './sba-certifications';
import { guide as findingGovernmentContracts } from './finding-government-contracts';
import { guide as proposalWriting } from './proposal-writing';
import { guide as subcontractingAndTeaming } from './subcontracting-and-teaming';
import { guide as federalMarketResearch } from './federal-market-research';
import { guide as cageCode } from './cage-code';
import { guide as vosbCertification } from './vosb-certification';
import { guide as hubzoneCertification } from './hubzone-certification';
import { guide as aiGovernmentContracting } from './ai-government-contracting';
import { guide as eightACertification } from './8a-certification';
import { guide as wosbCertification } from './wosb-certification';
import { guide as gsaSchedule } from './gsa-schedule';

export const allGuides: GuideData[] = [
  governmentContractingForBeginners,
  samGovRegistration,
  cageCode,
  capabilityStatement,
  sbaCertifications,
  eightACertification,
  vosbCertification,
  hubzoneCertification,
  wosbCertification,
  findingGovernmentContracts,
  proposalWriting,
  subcontractingAndTeaming,
  federalMarketResearch,
  gsaSchedule,
  aiGovernmentContracting,
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return allGuides.find((g) => g.slug === slug);
}
