import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allGuides, getGuideBySlug } from '@/content/guides';
import { generateSeo, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return generateSeo({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    type: 'article',
    publishedTime: guide.publishedDate,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = guide.relatedGuides
    .map((s) => allGuides.find((g) => g.slug === s))
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={articleJsonLd({
        title: guide.title,
        description: guide.metaDescription,
        path: `/guides/${guide.slug}`,
        publishedTime: guide.publishedDate,
      })} />
      <JsonLd data={faqJsonLd(guide.faqs)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/guides" className="text-green-500 hover:text-green-400 text-sm font-medium mb-4 inline-block">
            ← All Guides
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-slate-400">{guide.heroSubtitle}</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <nav className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">In This Guide</h2>
            <ol className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-green-500 hover:text-green-400 transition"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-green-500 hover:text-green-400 transition">
                  FAQ
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <article className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {guide.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {section.heading}
              </h2>
              <div
                className="prose prose-invert prose-green max-w-none text-slate-300 leading-relaxed
                  [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
                  [&_li]:mb-2 [&_strong]:text-white [&_a]:text-green-500 [&_a:hover]:text-green-400
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">{guide.cta.heading}</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">{guide.cta.description}</p>
            <Link
              href={guide.cta.buttonHref}
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              {guide.cta.buttonText}
            </Link>
          </section>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related!.slug}
                    href={`/guides/${related!.slug}`}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 block hover:border-green-600/50 transition"
                  >
                    <h3 className="text-white font-bold mb-2 text-sm">{related!.title}</h3>
                    <span className="text-green-500 text-sm font-medium">Read Guide →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
