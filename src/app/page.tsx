import HomePage from '@/components/home/HomePage';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'GovCon Giants — Win Federal Contracts Like a Giant',
  description: 'Eric Coffie teaches everyday people how to win extraordinary federal contracts — free podcast, guides, and the Billion Dollar Playbook.',
  path: '/',
  ogImage: '/podcast-cover.png',
  keywords: [
    'government contracting',
    'federal contracts',
    'GovCon education',
    'GovCon podcast',
    'small business contracting',
  ],
});

export default function Home() {
  return (
    <HomePage />
  );
}
