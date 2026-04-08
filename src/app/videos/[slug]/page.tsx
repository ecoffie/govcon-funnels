import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allVideos, getVideoBySlug } from '@/content/videos';
import { allGuides } from '@/content/guides';
import { JOB_CATEGORIES } from '@/lib/job-categories';
import type { JobCategory } from '@/types/job';
import { generateSeo, videoJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import GuideEmailCapture from '@/components/GuideEmailCapture';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return {};

  return generateSeo({
    title: video.metaTitle,
    description: video.metaDescription,
    path: `/videos/${video.slug}`,
    keywords: video.keywords,
    type: 'article',
    publishedTime: video.publishedDate,
  });
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const relatedGuides = video.relatedGuides
    .map((s) => allGuides.find((g) => g.slug === s))
    .filter(Boolean);

  const relatedJobs = video.relatedJobs
    .map((s) => JOB_CATEGORIES[s as JobCategory])
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Videos', url: '/videos' },
    { name: video.title, url: `/videos/${video.slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={videoJsonLd({
        name: video.title,
        description: video.metaDescription,
        thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
        uploadDate: video.publishedDate,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
        duration: video.duration,
        chapters: video.chapters,
      })} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      {/* Video Hero */}
      <section className="bg-black">
        <div className="max-w-5xl mx-auto">
          {/* YouTube Embed */}
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <Link href="/videos" className="text-green-400 hover:text-green-300 text-sm font-medium mb-6 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> All Videos
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {video.title}
          </h1>

          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            {video.heroSubtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-12 pb-8 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {video.duration}
            </span>
            <span>•</span>
            <span className="capitalize">{video.category.replace('-', ' ')}</span>
          </div>

          {/* Key Takeaways */}
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/20 rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {video.takeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 mt-1">✓</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div
            className="guide-content text-slate-300 text-lg md:text-xl leading-relaxed mb-12
              [&_p]:mb-6
              [&_p:first-of-type]:text-xl [&_p:first-of-type]:md:text-2xl [&_p:first-of-type]:leading-relaxed [&_p:first-of-type]:text-slate-200
              [&_ul]:mb-6 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-3
              [&_ul>li]:pl-6 [&_ul>li]:relative [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-3 [&_ul>li]:before:w-2 [&_ul>li]:before:h-2 [&_ul>li]:before:bg-green-500 [&_ul>li]:before:rounded-full
              [&_ol]:mb-6 [&_ol]:list-none [&_ol]:pl-0 [&_ol]:space-y-4
              [&_strong]:text-white [&_strong]:font-semibold
              [&_a]:text-green-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-green-500/50 [&_a:hover]:text-green-300
              [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:pt-6 [&_h3]:border-t [&_h3]:border-slate-800"
            dangerouslySetInnerHTML={{ __html: video.content }}
          />

          {/* Email Capture */}
          <GuideEmailCapture guideTitle={video.title} />

          {/* CTA */}
          <section className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/20 rounded-3xl p-10 md:p-12 text-center relative overflow-hidden mt-12">
            <div className="absolute inset-0 bg-green-500/5 blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{video.cta.heading}</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">{video.cta.description}</p>
              <Link
                href={video.cta.buttonHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                {video.cta.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Related GovCon Jobs</h2>
                  <p className="text-slate-400">Roles that use these skills</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {relatedJobs.map((job) => (
                  <Link
                    key={job.slug}
                    href={`/jobs/${job.slug}`}
                    className="flex items-center justify-between bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-green-500/30 rounded-2xl p-5 transition-all group"
                  >
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{job.name}</h3>
                      <p className="text-green-400 font-medium">{job.salaryRange}</p>
                    </div>
                    <span className="text-slate-500 group-hover:text-green-400 transition-colors flex items-center gap-2">
                      View Jobs
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section className="mt-12 pt-12 border-t border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6">Related Guides</h2>
              <div className="space-y-4">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide!.slug}
                    href={`/guides/${guide!.slug}`}
                    className="flex items-center gap-4 bg-slate-900/30 hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700 rounded-xl p-5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">{guide!.title}</h3>
                    </div>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* More Videos */}
          <section className="mt-12 pt-12 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">More Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allVideos
                .filter((v) => v.slug !== video.slug)
                .slice(0, 4)
                .map((v) => (
                  <Link
                    key={v.slug}
                    href={`/videos/${v.slug}`}
                    className="bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-green-500/30 rounded-xl overflow-hidden transition-all group"
                  >
                    <div className="aspect-video relative bg-slate-800">
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors line-clamp-2">{v.title}</h3>
                      <p className="text-slate-500 text-sm mt-1">{v.duration}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
