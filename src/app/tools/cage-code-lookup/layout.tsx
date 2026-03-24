import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free CAGE Code Lookup Tool — Search by Code or Company Name | GovCon Giants',
  description: 'Look up any CAGE code instantly. Search 600,000+ government contractors by CAGE code or company name. Free tool powered by official SAM.gov data.',
  keywords: 'cage code lookup, cage code search, cage code search by company name, find cage code, cage code, sam.gov cage code, federal contractor lookup',
  alternates: {
    canonical: 'https://govcongiants.org/tools/cage-code-lookup',
  },
  openGraph: {
    title: 'Free CAGE Code Lookup Tool — Search by Code or Company Name',
    description: 'Look up any CAGE code instantly. Search 600,000+ government contractors by CAGE code or company name. Free tool powered by official SAM.gov data.',
    url: 'https://govcongiants.org/tools/cage-code-lookup',
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
