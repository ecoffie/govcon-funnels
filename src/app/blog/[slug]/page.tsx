import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, getPostBySlug } from '@/content/blog';
import { allGuides } from '@/content/guides';
import { generateSeo, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return generateSeo({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: 'article',
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedDate,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedGuides = post.relatedGuides
    .map((s) => allGuides.find((g) => g.slug === s))
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={articleJsonLd({
        title: post.title,
        description: post.metaDescription,
        path: `/blog/${post.slug}`,
        publishedTime: post.publishedDate,
        modifiedTime: post.updatedDate,
      })} />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={faqJsonLd(post.faqs)} />
      )}
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-green-500 hover:text-green-400 text-sm font-medium mb-4 inline-block">
            ← All Articles
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.publishedDate}</span>
            <span>·</span>
            <span>{post.category}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div
            className="prose prose-invert prose-green max-w-none text-slate-300 leading-relaxed
              [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-2 [&_strong]:text-white [&_a]:text-green-500 [&_a:hover]:text-green-400
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
              [&_th]:bg-slate-800 [&_th]:text-white [&_th]:text-left [&_th]:px-4 [&_th]:py-2 [&_th]:border [&_th]:border-slate-700
              [&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-slate-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide!.slug}
                    href={`/guides/${guide!.slug}`}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 block hover:border-green-600/50 transition"
                  >
                    <h3 className="text-white font-bold mb-2 text-sm">{guide!.title}</h3>
                    <span className="text-green-500 text-sm font-medium">Read Guide →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Winning Contracts?</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Join thousands of small businesses learning how to break into the $700+ billion federal marketplace.
            </p>
            <Link
              href="/free-course"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Course →
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
