import Link from 'next/link';
import { allPosts } from '@/content/blog';
import { generateSeo } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Government Contracting Blog',
  description: 'Expert insights, tips, and strategies for winning federal government contracts. Learn from experienced contractors and stay ahead of the competition.',
  path: '/blog',
  keywords: [
    'government contracting blog',
    'govcon tips',
    'federal contracting advice',
    'government contractor blog',
  ],
});

function itemListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GovCon Giants Blog',
    description: 'Expert government contracting articles and insights.',
    numberOfItems: allPosts.length,
    itemListElement: allPosts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };
}

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-blue-600/20 text-blue-400',
  'Certifications': 'bg-purple-600/20 text-purple-400',
  'Winning Contracts': 'bg-green-600/20 text-green-400',
  'Tools & AI': 'bg-orange-600/20 text-orange-400',
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={itemListJsonLd()} />

      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GovCon <span className="text-green-500">Blog</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Expert insights and strategies for winning federal contracts. Real advice from real contractors.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-slate-700 text-slate-300'}`}>
                  {post.category}
                </span>
                <span className="text-slate-600 text-xs">{post.publishedDate}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm mb-3">{post.excerpt}</p>
              <span className="text-green-500 text-sm font-semibold">Read Article →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
