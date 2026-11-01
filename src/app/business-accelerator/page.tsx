import BusinessAcceleratorPage from '@/components/business-accelerator/BusinessAcceleratorPage';
import { generateSeo } from '@/lib/seo';

// Private until Eric approves the launch: noindex, not in the sitemap or nav.
export const metadata = generateSeo({
  title: 'Business Ownership Accelerator | GovCon Giants',
  description:
    'Turn your skills into a business. An eight-week GovCon Giants program that takes skilled people from what they can do to a clear offer, real customers and an operating business.',
  path: '/business-accelerator',
  noIndex: true,
});

export default function Page() {
  return <BusinessAcceleratorPage />;
}
