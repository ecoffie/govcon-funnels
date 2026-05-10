import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CAGE Code Lookup [Free] — Search 600K+ Contractors',
  description: 'Free CAGE code lookup tool. Search any contractor by code or company name in seconds. Updated daily from SAM.gov. No login required.',
  keywords: 'cage code lookup, cage code search, cage code search by company name, find cage code, cage code, sam.gov cage code, federal contractor lookup',
  alternates: {
    canonical: 'https://govcongiants.com/tools/cage-code-lookup',
  },
  openGraph: {
    title: 'CAGE Code Lookup [Free] — Search 600K+ Contractors',
    description: 'Free CAGE code lookup tool. Search any contractor by code or company name in seconds. Updated daily from SAM.gov. No login required.',
    url: 'https://govcongiants.com/tools/cage-code-lookup',
    siteName: 'GovCon Giants',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CAGE Code Lookup Tool',
    description: 'Look up any CAGE code instantly. Search 600,000+ government contractors free.',
  },
};

export default function CageCodeLookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
