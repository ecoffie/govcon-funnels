import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchGovConJobs } from '@/lib/jsearch';
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

// SEO-optimized titles for category pages (based on DataForSEO keyword research)
const CATEGORY_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  'contracts-administrator': {
    title: 'Contracts Administrator & Contracts Manager Jobs | $110K-$170K',
    description: 'Find contracts administrator and contracts manager jobs in government contracting. Manage contract lifecycle, modifications, compliance. Salaries $110K-$170K.',
    keywords: ['contracts administrator jobs', 'contracts manager jobs', 'contract specialist jobs', 'government contract jobs', 'federal contracts jobs'],
  },
  'pricing-analyst': {
    title: 'Pricing Analyst Jobs | Government Contractor Careers | $120K-$180K',
    description: 'Find pricing analyst and cost analyst jobs in government contracting. Develop cost proposals, build pricing models. Salaries $120K-$180K.',
    keywords: ['pricing analyst jobs', 'cost analyst jobs', 'government pricing jobs', 'federal contractor jobs', 'cost proposal analyst'],
  },
  'proposal-manager': {
    title: 'Proposal Manager Jobs | GovCon Careers | $160K-$240K',
    description: 'Find proposal manager jobs in government contracting. Lead proposal teams, manage development lifecycle. Salaries $160K-$240K.',
    keywords: ['proposal manager jobs', 'proposal director jobs', 'federal proposal jobs', 'government contractor jobs', 'proposal management careers'],
  },
  'capture-manager': {
    title: 'Capture Manager Jobs | $150K-$220K Government Contractor Careers',
    description: 'Find capture manager jobs in government contracting. Lead captures, develop win strategies, build relationships. Salaries $150K-$220K.',
    keywords: ['capture manager jobs', 'capture manager salary', 'capture management jobs', 'government bd jobs', 'federal capture jobs'],
  },
  'bd-manager': {
    title: 'Business Development Manager Jobs | Federal BD Careers | $150K-$250K',
    description: 'Find business development manager jobs in government contracting. Build pipeline, develop customer relationships. Salaries $150K-$250K.',
    keywords: ['business development manager jobs', 'bd manager federal', 'government bd jobs', 'federal contractor jobs', 'govcon bd careers'],
  },
};

// Generate metadata for each category
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const catInfo = JOB_CATEGORIES[category as JobCategory];

  if (!catInfo || category === 'other') {
    return {};
  }

  // Use SEO-optimized meta if available, otherwise generate from category info
  const seoData = CATEGORY_SEO[category];

  return generateSeo({
    title: seoData?.title || `${catInfo.name} Jobs | ${catInfo.salaryRange} GovCon Careers`,
    description: seoData?.description || `Find ${catInfo.name.toLowerCase()} jobs in government contracting. ${catInfo.description} Salaries from ${catInfo.salaryRange}.`,
    path: `/jobs/${category}`,
    keywords: seoData?.keywords || [
      `${catInfo.name.toLowerCase()} jobs`,
      `${catInfo.name.toLowerCase()} salary`,
      `govcon ${catInfo.name.toLowerCase()}`,
      'government contractor jobs',
      'federal jobs',
    ],
  });
}

// Evergreen on-page copy for each category. Live job counts fluctuate (and the
// JSearch feed can return few or zero matches), so this static section keeps the
// page substantive for users and prevents thin-content / soft-404 classifications.
const CATEGORY_CONTENT: Record<string, { overview: string; responsibilities: string[]; skills: string[] }> = {
  'proposal-coordinator': {
    overview: 'Proposal coordinators keep federal proposals on track: building compliance matrices, managing calendars, formatting volumes, and making sure every RFP requirement is answered before the deadline. It is the most common entry point into GovCon proposal work.',
    responsibilities: ['Build compliance matrices from RFP requirements', 'Manage proposal schedules and color team reviews', 'Format and production-check proposal volumes', 'Coordinate inputs from technical writers and SMEs'],
    skills: ['Shipley / APMP process', 'Microsoft Word & Excel', 'FAR basics', 'Deadline management'],
  },
  'pricing-analyst': {
    overview: 'Pricing analysts build the cost volumes that win (or lose) federal contracts. They develop pricing models, analyze labor categories and rates, ensure cost proposals are compliant and competitive, and support negotiations with contracting officers.',
    responsibilities: ['Develop cost proposals and pricing models', 'Analyze labor rates, indirect rates, and wrap rates', 'Ensure compliance with RFP pricing instructions', 'Support price-to-win and competitive analysis'],
    skills: ['Advanced Excel modeling', 'Cost volume development', 'FAR Part 15 pricing', 'Price-to-win analysis'],
  },
  'contracts-administrator': {
    overview: 'Contracts administrators manage the contract lifecycle after award: modifications, compliance tracking, deliverables, and closeout. They work directly with contracting officers and keep the company on the right side of the FAR.',
    responsibilities: ['Administer contract modifications and change orders', 'Track deliverables, milestones, and compliance', 'Support contract closeout and audits', 'Interface with government contracting officers'],
    skills: ['FAR / DFARS knowledge', 'Contract lifecycle management', 'Deltek Costpoint or similar', 'NCMA certification (CFCM/CPCM)'],
  },
  'capture-manager': {
    overview: 'Capture managers own a pursuit from opportunity identification through proposal submission. They develop win strategies, assess competitors, build teaming arrangements, and position the company before the RFP ever drops.',
    responsibilities: ['Qualify and pursue new opportunities', 'Develop win themes and capture plans', 'Build teaming and subcontracting strategies', 'Run gate reviews and competitive assessments'],
    skills: ['Shipley capture process', 'Opportunity qualification', 'Competitive analysis', 'Customer relationship building'],
  },
  'bd-manager': {
    overview: 'Business development managers build the pipeline: identifying opportunities, developing relationships with federal buyers, and moving pursuits from cold lead to qualified capture. BD is where every GovCon win starts.',
    responsibilities: ['Identify and qualify new business opportunities', 'Build relationships with agency buyers and primes', 'Manage pipeline in CRM tools', 'Support capture and proposal efforts'],
    skills: ['Federal sales & pipeline development', 'SAM.gov and FPDS research', 'CRM proficiency', 'Agency outreach'],
  },
  'proposal-manager': {
    overview: 'Proposal managers lead the entire proposal effort: running kickoffs, managing writers and color teams, enforcing compliance, and delivering a compelling, compliant submission on time. Senior proposal managers command some of the highest salaries in GovCon.',
    responsibilities: ['Lead proposal development end-to-end', 'Manage color team reviews (pink, red, gold)', 'Enforce RFP compliance and win themes', 'Coordinate writers, SMEs, and volume leads'],
    skills: ['Shipley proposal process', 'APMP certification', 'Team leadership', 'RFP compliance management'],
  },
  'capture-director': {
    overview: 'Capture directors oversee multiple capture campaigns, mentor capture managers, and drive the strategic pursuits that define company growth. They set pursuit strategy for the largest and most competitive opportunities.',
    responsibilities: ['Direct portfolio of major captures', 'Mentor and develop capture managers', 'Shape win strategy on must-win pursuits', 'Engage C-level customers and partners'],
    skills: ['Portfolio capture leadership', 'Strategic account planning', 'Executive engagement', 'Mentoring & team building'],
  },
  'vp-business-development': {
    overview: 'VPs of Business Development own company growth: setting the growth strategy, leading BD and capture teams, managing executive relationships with agencies and primes, and answering to the board on pipeline and bookings.',
    responsibilities: ['Set corporate growth and pipeline strategy', 'Lead BD, capture, and proposal organizations', 'Manage executive-level customer relationships', 'Report bookings and pipeline to leadership'],
    skills: ['Growth strategy', 'Executive leadership', 'P&L and pipeline accountability', 'M&A and partnership development'],
  },
  'bd-consultant': {
    overview: 'BD consultants advise government contractors on capture strategy, pipeline development, and proposals — often commanding $200K-$500K+ as independents or through consulting firms. It is the most flexible and highest-leverage path for experienced GovCon BD professionals.',
    responsibilities: ['Advise clients on capture and proposal strategy', 'Provide fractional BD leadership', 'Lead proposal support and color team reviews', 'Coach client BD and capture teams'],
    skills: ['Deep GovCon BD experience', 'Consulting & client management', 'Capture and proposal expertise', 'Independent business development'],
  },
};

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

  // Validate category. Unknown slugs are typically expired job-detail URLs
  // (e.g. /jobs/<base64-id> from the old site); send them to /jobs instead of
  // 404ing, matching the /jobs/:id(\d+) redirect in vercel.json.
  if (!JOB_CATEGORIES[category as JobCategory] || category === 'other') {
    permanentRedirect('/jobs');
  }

  const catInfo = getCategoryInfo(category as JobCategory);
  const content = CATEGORY_CONTENT[category];
  const { jobs: initialJobs, total } = await searchGovConJobs({
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

      {/* About the Role (evergreen content) */}
      {content && (
        <section className="py-8 px-6 border-b border-slate-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Does a <span className="text-green-500">{catInfo.name}</span> Do?
            </h2>
            <p className="text-slate-400 max-w-3xl mb-8">{content.overview}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Typical Responsibilities</h3>
                <ul className="space-y-2">
                  {content.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-400">
                      <span className="text-green-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Skills Employers Want</h3>
                <ul className="space-y-2">
                  {content.skills.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-400">
                      <span className="text-green-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

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
