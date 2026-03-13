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
  publishedDate: string;
}

// Import all guides
import { guide as governmentContractingForBeginners } from './government-contracting-for-beginners';
import { guide as samGovRegistration } from './sam-gov-registration';
import { guide as capabilityStatement } from './capability-statement';
import { guide as sbaCertifications } from './sba-certifications';
import { guide as findingGovernmentContracts } from './finding-government-contracts';
import { guide as proposalWriting } from './proposal-writing';
import { guide as subcontractingAndTeaming } from './subcontracting-and-teaming';
import { guide as federalMarketResearch } from './federal-market-research';

export const allGuides: GuideData[] = [
  governmentContractingForBeginners,
  samGovRegistration,
  capabilityStatement,
  sbaCertifications,
  findingGovernmentContracts,
  proposalWriting,
  subcontractingAndTeaming,
  federalMarketResearch,
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return allGuides.find((g) => g.slug === slug);
}
