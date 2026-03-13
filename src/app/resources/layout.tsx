import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Free GovCon Resource Library',
  description: 'Free tools, templates, videos, and guides to help you win federal contracts. Everything free in one place.',
  path: '/resources',
  keywords: ['government contracting resources', 'free govcon tools', 'federal contracting templates', 'govcon videos'],
});

export default function ResourcesLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
