import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPremiumBySlug, PREMIUM_SLUGS } from '../config';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PREMIUM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getPremiumBySlug(slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: `${product.title} | GovCon Giants`,
    description: product.description,
  };
}

export default async function PremiumLandingPage({ params }: Props) {
  const { slug } = await params;
  const product = getPremiumBySlug(slug);
  if (!product) notFound();

  const isExternalCta = product.ctaUrl.startsWith('http') || product.ctaUrl.startsWith('mailto:');

  return (
    <main className="min-h-screen">
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {product.badge && (
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {product.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {product.slug === 'white-glove' ? (
                  <>
                    <span className="text-green-500 text-2xl md:text-3xl font-medium block mb-1">Premium Service</span>
                    <span className="text-green-500">{product.title}</span>
                  </>
                ) : (
                  <span className="text-green-500">{product.title}</span>
                )}
              </h1>
              <p className="text-xl text-slate-300 mb-6">{product.description}</p>
              {product.price ? (
                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-10">
                  <span className="font-semibold text-green-500">{product.price}</span>
                </div>
              ) : null}
              <div className="flex flex-col sm:flex-row gap-4">
                {isExternalCta ? (
                  <a
                    href={product.ctaUrl}
                    target={product.ctaUrl.startsWith('http') ? '_blank' : undefined}
                    rel={product.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="btn-primary inline-block green-glow text-center"
                  >
                    {product.ctaText}
                  </a>
                ) : (
                  <Link
                    href={product.ctaUrl}
                    className="btn-primary inline-block green-glow text-center"
                  >
                    {product.ctaText}
                  </Link>
                )}
                <Link
                  href="/#premium"
                  className="inline-block text-center px-6 py-4 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  View All Premium Options
                </Link>
              </div>
            </div>
            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-4 text-center">What You Get</h3>
              <div className="space-y-4">
                {product.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="flex gap-4 items-start p-4 rounded-xl border border-slate-700 bg-slate-900/40"
                  >
                    <span className="text-2xl flex-shrink-0">{h.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{h.title}</div>
                      <div className="text-sm text-slate-400">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                {isExternalCta ? (
                  <a
                    href={product.ctaUrl}
                    target={product.ctaUrl.startsWith('http') ? '_blank' : undefined}
                    rel={product.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="btn-primary w-full block text-center green-glow"
                  >
                    {product.ctaText}
                  </a>
                ) : (
                  <Link
                    href={product.ctaUrl}
                    className="btn-primary w-full block text-center green-glow"
                  >
                    {product.ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why {product.shortTitle}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Get the support and structure you need to win federal contracts.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {product.highlights.map((h) => (
              <div key={h.title} className="card hover:translate-y-[-4px] transition-transform">
                <div className="text-4xl mb-4">{h.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{h.title}</h3>
                <p className="text-slate-400">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="card green-glow text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            {product.price ? <p className="text-slate-300 mb-6">{product.price}</p> : null}
            {isExternalCta ? (
              <a
                href={product.ctaUrl}
                target={product.ctaUrl.startsWith('http') ? '_blank' : undefined}
                rel={product.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary inline-block green-glow"
              >
                {product.ctaText}
              </a>
            ) : (
              <Link href={product.ctaUrl} className="btn-primary inline-block green-glow">
                {product.ctaText}
              </Link>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
