export interface VideoData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  publishedDate: string;
  category: 'getting-started' | 'finding-opportunities' | 'winning-contracts' | 'business-growth' | 'case-study';
  heroSubtitle: string;
  /** Written content for SEO - can include HTML */
  content: string;
  /** Key takeaways as bullet points */
  takeaways: string[];
  /** Related guide slugs for internal linking */
  relatedGuides: string[];
  /** Related job category slugs */
  relatedJobs: string[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return '';
}

// Import all videos
import { video as getStartedGovCon } from './get-started-government-contracting';
import { video as findGovernmentContracts } from './find-government-contracts';
import { video as marketResearchGovCon } from './market-research-govcon';
import { video as proposalWritingGuide } from './proposal-writing-guide';
import { video as capabilityStatementGuide } from './capability-statement-guide';
import { video as pricingGovernmentContracts } from './pricing-government-contracts';
import { video as winWithoutPastPerformance } from './win-without-past-performance';
import { video as gsaScheduleGuide } from './gsa-schedule-guide';

export const allVideos: VideoData[] = [
  // Getting Started
  getStartedGovCon,
  // Finding Opportunities
  findGovernmentContracts,
  marketResearchGovCon,
  // Winning Contracts
  proposalWritingGuide,
  capabilityStatementGuide,
  pricingGovernmentContracts,
  winWithoutPastPerformance,
  gsaScheduleGuide,
];

export function getVideoBySlug(slug: string): VideoData | undefined {
  return allVideos.find((v) => v.slug === slug);
}

export function getVideosByCategory(category: VideoData['category']): VideoData[] {
  return allVideos.filter((v) => v.category === category);
}
