import type { Metadata } from 'next';

const SITE_URL = 'https://govcongiants.org';
const SITE_NAME = 'GovCon Giants';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  canonicalUrl?: string; // Override canonical URL (for duplicate content consolidation)
}

export function generateSeo({
  title,
  description,
  path,
  ogImage,
  keywords,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
  canonicalUrl,
}: SeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: canonicalUrl || url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: type === 'article' ? 'article' : 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

// JSON-LD helpers
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: 'GovCon Giants helps small businesses win federal government contracts through training, tools, and consulting.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-786-477-0477',
      contactType: 'customer service',
      email: 'hello@govconedu.com',
    },
    sameAs: [
      'https://www.youtube.com/@GovConGiants',
      'https://www.instagram.com/govcongiants/',
      'https://www.linkedin.com/company/govcon-giants/',
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function courseJsonLd({
  name,
  description,
  url,
  provider,
}: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider || SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function itemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${item.url}`,
      name: item.name,
    })),
  };
}

// Helper to convert "MM:SS" or "H:MM:SS" to seconds
function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

export function videoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  contentUrl,
  duration,
  chapters,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  contentUrl?: string;
  duration?: string;
  chapters?: Array<{ title: string; startTime: string }>;
}) {
  // Extract YouTube ID from embed URL for contentUrl if not provided
  const youtubeIdMatch = embedUrl.match(/embed\/([^?]+)/);
  const youtubeId = youtubeIdMatch ? youtubeIdMatch[1] : null;
  const videoContentUrl = contentUrl || (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined);

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    inLanguage: 'en-US',
    ...(videoContentUrl && { contentUrl: videoContentUrl }),
    ...(duration && {
      duration: (() => {
        const [minutes, seconds] = duration.split(':').map(Number);
        return seconds > 0 ? `PT${minutes}M${seconds}S` : `PT${minutes}M`;
      })()
    }),
    // Add chapters as Clip segments for rich snippets
    ...(chapters && chapters.length > 0 && {
      hasPart: chapters.map((chapter) => ({
        '@type': 'Clip',
        name: chapter.title,
        startOffset: timeToSeconds(chapter.startTime),
        url: `${videoContentUrl}?t=${timeToSeconds(chapter.startTime)}`,
      })),
    }),
    // Required: indicate this is a "watch page" by setting potentialAction
    potentialAction: {
      '@type': 'WatchAction',
      target: videoContentUrl || embedUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };
}

export { SITE_URL, SITE_NAME };
