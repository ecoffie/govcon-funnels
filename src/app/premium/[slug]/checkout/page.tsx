import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
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

  // Products with automated checkout route through /checkout first so
  // attribution can be joined back to Stripe webhook events.
  if (product.ctaUrl && (
    product.ctaUrl.startsWith('/checkout/') ||
    product.ctaUrl.startsWith('https://buy.stripe.com') ||
    product.ctaUrl.startsWith('https://calendly.com')
  )) {
    redirect(product.ctaUrl);
  }

  // Fallback for products without direct checkout (consulting, white glove, etc.)
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
            <h1 className="text-2xl font-bold text-white mb-2">Get Started: {product.title}</h1>
            {product.price ? <p className="text-slate-400 mb-4">{product.price}</p> : null}
            <p className="text-slate-300 mb-8">
              This is a premium service. Contact us to discuss your needs and get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/govconedumeet/discovery-call"
                className="btn-primary inline-block green-glow text-center"
              >
                Schedule a Discovery Call
              </a>
              <a
                href="mailto:hello@govconedu.com?subject=Premium%20Inquiry%20-%20{product.title}"
                className="inline-block text-center px-6 py-4 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Email Us
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
