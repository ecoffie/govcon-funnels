import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPremiumBySlug, PREMIUM_SLUGS } from '../../config';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PREMIUM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getPremiumBySlug(slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: `Checkout | ${product.title} | GovCon Giants`,
    description: `Complete your purchase for ${product.title}.`,
  };
}

export default async function PremiumCheckoutPage({ params }: Props) {
  const { slug } = await params;
  const product = getPremiumBySlug(slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/premium/${slug}`}
            className="inline-block text-slate-400 hover:text-slate-200 text-sm mb-8"
          >
            ← Back to {product.title}
          </Link>
          <div className="card green-glow p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Checkout: {product.title}</h1>
            <p className="text-slate-400 mb-4">{product.price}</p>
            <p className="text-slate-300 mb-8">
              Secure checkout for this package is being set up. To complete your order now, contact us and we’ll get you set up right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@govconedu.com?subject=Premium%20Purchase%20Inquiry"
                className="btn-primary inline-block green-glow text-center"
              >
                Email Us to Complete Order
              </a>
              <a
                href="tel:7864770477"
                className="inline-block text-center px-6 py-4 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Call 786-477-0477
              </a>
            </div>
            <p className="text-slate-500 text-sm mt-6">
              Or return to <Link href="/#premium" className="text-green-500 hover:underline">all premium options</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
