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

export const allPosts: BlogPost[] = [
  wishIKnew,
  whichCertification,
  samSearchTricks,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
