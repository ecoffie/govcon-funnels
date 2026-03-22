import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allGuides, getGuideBySlug, GUIDE_JOB_MAPPING } from '@/content/guides';
import { generateSeo, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { JOB_CATEGORIES } from '@/lib/job-categories';
import type { JobCategory } from '@/types/job';
import JsonLd from '@/components/JsonLd';
import GuideEmailCapture from '@/components/GuideEmailCapture';

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

  // Get related jobs for this guide
  const relatedJobSlugs = GUIDE_JOB_MAPPING[guide.slug] || [];
  const relatedJobs = relatedJobSlugs
    .map((slug) => JOB_CATEGORIES[slug as JobCategory])
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
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-2xl mx-auto text-center">
          <Link href="/guides" className="text-green-400 hover:text-green-300 text-sm font-medium mb-6 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> All Guides
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {guide.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">{guide.heroSubtitle}</p>

          {/* Reading time estimate */}
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>{Math.ceil(guide.sections.reduce((acc, s) => acc + s.content.length, 0) / 1500)} min read</span>
            <span>•</span>
            <span>{guide.sections.length} sections</span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <nav className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 backdrop-blur">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Jump to Section</h2>
            <ol className="space-y-3">
              {guide.sections.map((section, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="text-green-500/70 font-mono text-sm w-6">{String(i + 1).padStart(2, '0')}</span>
                  <a
                    href={`#section-${i}`}
                    className="text-slate-300 hover:text-white transition-colors text-lg"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              <li className="flex items-baseline gap-3 pt-2 border-t border-slate-800">
                <span className="text-green-500/70 font-mono text-sm w-6">?</span>
                <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-lg">
                  Frequently Asked Questions
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <article className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          {guide.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="scroll-mt-24 mb-16">
              {/* Section Divider */}
              {i > 0 && (
                <div className="flex items-center justify-center mb-12">
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  <div className="w-16 h-px bg-slate-700 mx-4"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                {section.heading}
              </h2>
              <div
                className="guide-content text-slate-300 text-lg md:text-xl leading-relaxed
                  [&_p]:mb-6
                  [&_p:first-of-type]:text-xl [&_p:first-of-type]:md:text-2xl [&_p:first-of-type]:leading-relaxed [&_p:first-of-type]:text-slate-200
                  [&_ul]:mb-6 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-3
                  [&_ul>li]:pl-6 [&_ul>li]:relative [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-3 [&_ul>li]:before:w-2 [&_ul>li]:before:h-2 [&_ul>li]:before:bg-green-500 [&_ul>li]:before:rounded-full
                  [&_ol]:mb-6 [&_ol]:list-none [&_ol]:pl-0 [&_ol]:space-y-4 [&_ol]:counter-reset-[step]
                  [&_ol>li]:pl-12 [&_ol>li]:relative [&_ol>li]:counter-increment-[step]
                  [&_ol>li]:before:content-[counter(step)] [&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:top-0
                  [&_ol>li]:before:w-8 [&_ol>li]:before:h-8 [&_ol>li]:before:bg-green-500/20 [&_ol>li]:before:border [&_ol>li]:before:border-green-500/50
                  [&_ol>li]:before:rounded-full [&_ol>li]:before:flex [&_ol>li]:before:items-center [&_ol>li]:before:justify-center
                  [&_ol>li]:before:text-green-400 [&_ol>li]:before:font-bold [&_ol>li]:before:text-sm
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_a]:text-green-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-green-500/50 [&_a:hover]:text-green-300 [&_a:hover]:decoration-green-400
                  [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:pt-6 [&_h3]:border-t [&_h3]:border-slate-800"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />

              {/* Mid-article email capture - insert after section 2 (index 2) */}
              {i === 2 && guide.sections.length > 4 && (
                <GuideEmailCapture guideTitle={guide.title} />
              )}
            </section>
          ))}

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-24 mb-16">
            {/* Section Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              <div className="w-16 h-px bg-slate-700 mx-4"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="group">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="text-green-500 font-mono text-lg mt-1">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed pl-8 border-l-2 border-green-500/30">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/20 rounded-3xl p-10 md:p-12 text-center relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-green-500/5 blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{guide.cta.heading}</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">{guide.cta.description}</p>
              <Link
                href={guide.cta.buttonHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                {guide.cta.buttonText}
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
                  <h2 className="text-2xl font-bold text-white">Land a High-Paying GovCon Role</h2>
                  <p className="text-slate-400">Jobs that use the skills from this guide</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">Continue Learning</h2>
              <div className="space-y-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related!.slug}
                    href={`/guides/${related!.slug}`}
                    className="flex items-center gap-4 bg-slate-900/30 hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700 rounded-xl p-5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">{related!.title}</h3>
                    </div>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
