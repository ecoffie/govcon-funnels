import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchUSAJobs } from '@/lib/usajobs';
import { JOB_CATEGORIES, getDisplayCategories, getCategoryInfo, CERTIFICATION_WEEKS } from '@/lib/job-categories';
import type { JobCategory } from '@/types/job';
import JobListClient from '../JobListClient';
import JobAlertSignup from '@/components/JobAlertSignup';

export const dynamic = 'force-dynamic';

// Generate static params for all categories
export function generateStaticParams() {
  return getDisplayCategories().map((cat) => ({
    category: cat.slug,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const catInfo = JOB_CATEGORIES[category as JobCategory];

  if (!catInfo || category === 'other') {
    return {};
  }

  return generateSeo({
    title: `${catInfo.name} Jobs | ${catInfo.salaryRange} GovCon Careers`,
    description: `Find ${catInfo.name.toLowerCase()} jobs in government contracting. ${catInfo.description} Salaries from ${catInfo.salaryRange}.`,
    path: `/jobs/${category}`,
    keywords: [
      `${catInfo.name.toLowerCase()} jobs`,
      `${catInfo.name.toLowerCase()} salary`,
      `govcon ${catInfo.name.toLowerCase()}`,
      'government contractor jobs',
      'federal jobs',
    ],
  });
}

// JSON-LD for category page - use CollectionPage, not JobPosting
// JobPosting schema is on individual job detail pages
function categoryJsonLd(catInfo: typeof JOB_CATEGORIES[JobCategory], jobCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${catInfo.name} Jobs`,
    description: `Find ${catInfo.name.toLowerCase()} jobs in government contracting. ${catInfo.description} Typical salary range: ${catInfo.salaryRange}.`,
    about: {
      '@type': 'Occupation',
      name: catInfo.name,
      occupationalCategory: 'Business Development',
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        currency: 'USD',
        minValue: catInfo.salaryMin,
        maxValue: catInfo.salaryMax,
        unitText: 'YEAR',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: jobCount,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      name: `${catInfo.name} Job Listings`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // Validate category
  if (!JOB_CATEGORIES[category as JobCategory] || category === 'other') {
    notFound();
  }

  const catInfo = getCategoryInfo(category as JobCategory);
  const { jobs: initialJobs, total } = await searchUSAJobs({
    category: category as JobCategory,
    limit: 25
  });

  // Get certification weeks for this category
  const certWeeks = catInfo.certificationWeeks.map(w => CERTIFICATION_WEEKS[w as keyof typeof CERTIFICATION_WEEKS]);

  // Breadcrumb items for JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' },
    { name: catInfo.name, url: `/jobs/${category}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* JSON-LD: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd(catInfo, total)) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Link href="/" className="hover:text-green-300">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/jobs" className="hover:text-green-300">Jobs</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{catInfo.name}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {catInfo.name} <span className="text-green-500">Jobs</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-6">
            {catInfo.description}
          </p>

          {/* Salary badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-green-400 font-semibold">{catInfo.salaryRange}</span>
            <span className="text-slate-400">typical salary range</span>
          </div>

          {/* Other categories */}
          <div className="flex flex-wrap gap-2">
            {getDisplayCategories()
              .filter(c => c.slug !== category)
              .slice(0, 5)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/jobs/${cat.slug}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm transition-colors"
                >
                  {cat.shortName}
                </Link>
              ))}
            <Link
              href="/jobs"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm transition-colors"
            >
              All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{total}+</div>
              <div className="text-sm text-slate-400">Active Jobs</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{catInfo.salaryRange.split(' - ')[0]}</div>
              <div className="text-sm text-slate-400">Min Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{catInfo.salaryRange.split(' - ')[1]}</div>
              <div className="text-sm text-slate-400">Max Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">Daily</div>
              <div className="text-sm text-slate-400">Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Job Alerts Signup */}
          <div className="mb-8">
            <JobAlertSignup category={category} categoryName={catInfo.name} />
          </div>

          <JobListClient
            initialJobs={initialJobs}
            initialTotal={total}
            fixedCategory={category as JobCategory}
          />
        </div>
      </section>

      {/* Certification CTA */}
      {certWeeks.length > 0 && (
        <section className="py-12 px-6 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Want to Land a <span className="text-green-500">{catInfo.name}</span> Role?
              </h2>
              <p className="text-slate-400 mb-6">
                Our BD training program teaches the exact skills employers are looking for:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {certWeeks.map((week, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">{catInfo.certificationWeeks[i]}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{week.title}</div>
                      <div className="text-slate-400 text-sm">{week.skills.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/upskilling"
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors text-center"
                >
                  Learn About BD Training
                </Link>
                <Link
                  href="/free-course"
                  className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  Start Free Course
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Explore Other <span className="text-green-500">BD Roles</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {getDisplayCategories()
              .filter(c => c.slug !== category)
              .slice(0, 6)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/jobs/${cat.slug}`}
                  className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-4 transition-colors"
                >
                  <div className="text-white font-semibold mb-1">{cat.name}</div>
                  <div className="text-green-400 text-sm">{cat.salaryRange}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
