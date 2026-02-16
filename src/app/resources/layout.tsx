import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GovCon Resource Library | GovCon Giants',
  description: 'Free tools, templates, videos, and guides to help you win federal contracts. Everything free in one place.',
};

export default function ResourcesLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
