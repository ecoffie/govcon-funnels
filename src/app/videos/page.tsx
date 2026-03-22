import Link from 'next/link';
import type { Metadata } from 'next';
import { allVideos } from '@/content/videos';
import { generateSeo, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = generateSeo({
  title: 'Free Government Contracting Videos | GovCon Training',
  description:
    'Watch free government contracting training videos. Learn how to find contracts, write proposals, and win federal business. From beginners to advanced.',
  path: '/videos',
  keywords: [
    'government contracting videos',
    'govcon training',
    'federal contracting tutorials',
    'free govcon course',
    'government contract training',
  ],
});

const categories = [
  { slug: 'getting-started', name: 'Getting Started', description: 'New to GovCon? Start here.' },
  { slug: 'finding-opportunities', name: 'Finding Opportunities', description: 'Find contracts that fit your business.' },
  { slug: 'winning-contracts', name: 'Winning Contracts', description: 'Write winning proposals.' },
  { slug: 'business-growth', name: 'Business Growth', description: 'Scale your GovCon business.' },
];

export default function VideosPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Videos', url: '/videos' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={itemListJsonLd({
        name: 'Government Contracting Video Library',
        description: 'Free training videos for government contractors',
        items: allVideos.map((v) => ({ name: v.title, url: `/videos/${v.slug}` })),
      })} />

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Free GovCon <span className="text-green-500">Training Videos</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Learn everything you need to win government contracts. From registration basics to advanced proposal strategies.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-sm transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid by Category */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {categories.map((cat) => {
            const catVideos = allVideos.filter((v) => v.category === cat.slug);
            if (catVideos.length === 0) return null;

            return (
              <div key={cat.slug} id={cat.slug}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{cat.name}</h2>
                  <p className="text-slate-400">{cat.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catVideos.map((video) => (
                    <Link
                      key={video.slug}
                      href={`/videos/${video.slug}`}
                      className="bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-green-500/30 rounded-2xl overflow-hidden transition-all group"
                    >
                      <div className="aspect-video relative bg-slate-800">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-16 h-16 rounded-full bg-green-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{video.heroSubtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Structured Training?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Our free 5-day course takes you from registration to finding your first opportunities.
          </p>
          <Link
            href="/free-course"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Start Free Course
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
