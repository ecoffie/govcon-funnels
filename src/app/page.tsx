import { Merriweather, Public_Sans } from 'next/font/google';
import HomePage from '@/components/home/HomePage';
import { generateSeo } from '@/lib/seo';

const display = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
});

const sans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

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
    <div className={`${display.variable} ${sans.variable}`}>
      <HomePage />
    </div>
  );
}
