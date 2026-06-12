import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Switch from GovTribe to Mindy [Migration Guide] — GovCon Giants',
  description: 'Step-by-step guide to migrating from GovTribe to Mindy. Export saved searches, recreate filters, and unlock AI-powered briefings.',
  path: '/migration/govtribe',
  keywords: [
    'switch from govtribe',
    'govtribe alternative migration',
    'govtribe vs market intelligence',
    'govtribe migration guide',
    'migrate from govtribe',
    'govtribe replacement',
    'how to leave govtribe',
    'govtribe to market intelligence',
  ],
});

const migrationSteps = [
  {
    step: 1,
    title: 'Export Your Saved Searches from GovTribe',
    duration: '5 minutes',
    description: 'Document your current search criteria so nothing gets lost in the transition.',
    instructions: [
      'Log into GovTribe and go to your Saved Searches',
      'For each search, note: NAICS codes, keywords, agencies, set-asides, and states',
      'Screenshot or write down your alert frequency settings',
      'Export any saved opportunity lists to CSV (if you have active pursuits)',
    ],
    tip: 'Take screenshots of your dashboard. You\'ll want to recreate your same workflow in MI.',
  },
  {
    step: 2,
    title: 'Sign Up for Mindy Free (No Credit Card)',
    duration: '2 minutes',
    description: 'Start with the free tier to test your searches before committing.',
    instructions: [
      'Go to govcongiants.com/mi-free',
      'Enter email and password (no credit card required)',
      'Verify your email',
      'You\'re in — 5 opportunity alerts/month to test',
    ],
    tip: 'Free tier lets you test search quality before upgrading. Take your time.',
  },
  {
    step: 3,
    title: 'Recreate Your Saved Searches in MI',
    duration: '10-15 minutes',
    description: 'Build your search profiles using the same criteria from GovTribe.',
    instructions: [
      'Click "Search Opportunities" in the MI dashboard',
      'Enter your NAICS codes (one per search — MI works best with focused searches)',
      'Add keywords, states, and set-aside filters',
      'Save each search profile',
      'Set alert frequency (daily recommended)',
    ],
    tip: 'MI\'s AI briefings work best with 3-5 focused search profiles vs. 1 broad search.',
  },
  {
    step: 4,
    title: 'Set Up Daily Briefings (The Killer Feature)',
    duration: '3 minutes',
    description: 'Enable AI-powered briefings that analyze opportunities and suggest priorities.',
    instructions: [
      'Go to Settings > Briefing Preferences',
      'Enable "Daily Briefing" (sent every morning at 8 AM EST)',
      'Choose briefing format: Summary, Detailed, or Pursuit-focused',
      'Optional: Enable "Weekly Digest" for high-level trends',
    ],
    tip: 'This is what GovTribe doesn\'t have. AI that tells you what to bid on, not just what\'s available.',
  },
  {
    step: 5,
    title: 'Compare Results for 2 Weeks',
    duration: '14 days',
    description: 'Run both tools in parallel to verify you\'re not missing opportunities.',
    instructions: [
      'Keep your GovTribe alerts active for 2 weeks',
      'Compare MI alerts to GovTribe alerts daily',
      'Check if MI catches the same opportunities (it should — same SAM.gov source)',
      'Note any differences in filtering or relevance',
    ],
    tip: 'Most users find MI matches or exceeds GovTribe coverage. The AI briefings are the real differentiator.',
  },
  {
    step: 6,
    title: 'Cancel GovTribe When Confident',
    duration: '5 minutes',
    description: 'Once you verify MI is working, cancel GovTribe to stop paying $112-$333/mo.',
    instructions: [
      'Log into GovTribe and go to Account Settings',
      'Click "Cancel Subscription" (may need to email support for annual plans)',
      'Export any final data you need',
      'Upgrade to Mindy Pro ($149/mo) if you need unlimited alerts',
    ],
    tip: 'GovTribe requires 30-day notice for cancellation. Start the process early if on annual billing.',
  },
];

const featureComparison = [
  {
    category: 'What\'s the Same',
    features: [
      'SAM.gov opportunity alerts',
      'Grants.gov integration',
      'Expiring contracts finder',
      'Contractor profiles',
      'Forecast intelligence',
      'Pipeline tracking',
    ],
  },
  {
    category: 'What\'s Different (Better in MI)',
    features: [
      'AI-powered daily briefings (GovTribe has none)',
      'Agency pain points database (200+ agencies)',
      'SBLO contact database (800+ with emails)',
      'Go/no-go recommendations (AI-driven)',
      'Month-to-month billing (vs. annual lock-in)',
      'Free tier forever (vs. 14-day trial)',
    ],
  },
  {
    category: 'What\'s Missing (GovTribe Has)',
    features: [
      'Salesforce integration (coming Q3 2026)',
      'Longer track record (GovTribe est. 2011)',
      'Lower entry price if annual ($112/mo vs. $149/mo)',
    ],
  },
];

const whyUsersSwitchReasons = [
  {
    icon: '🤖',
    title: 'AI Briefings That Actually Help',
    description: 'GovTribe sends you opportunities. MI tells you which ones to pursue and why. Daily briefings analyze bid count, agency pain points, and teaming opportunities.',
  },
  {
    icon: '🎯',
    title: 'Agency Pain Points',
    description: '200+ agencies analyzed for challenges, budget priorities, and procurement patterns. Position your solution to solve their actual problems.',
  },
  {
    icon: '📞',
    title: 'SBLO Contacts',
    description: '800+ Small Business Liaison Officers with direct email and phone. Build relationships before RFPs drop.',
  },
  {
    icon: '💰',
    title: 'Better Value',
    description: '$149/mo month-to-month vs. $333/mo ($4,000/yr) for GovTribe Growth. All features included, no annual lock-in.',
  },
  {
    icon: '🆓',
    title: 'Forever Free Tier',
    description: 'Mindy Free lets you test indefinitely. GovTribe gives you 14 days then requires payment.',
  },
  {
    icon: '📊',
    title: 'Actionable Intelligence',
    description: 'Not just data dumps. MI scores opportunities, flags recompetes, and identifies teaming partners.',
  },
];

const faqs = [
  {
    question: 'Will I lose my saved opportunities when I switch?',
    answer: 'No. GovTribe lets you export your saved opportunities to CSV. Import them into MI\'s pipeline tracker, or manually add active pursuits. The SAM.gov opportunity data is public, so all opportunities are available in both tools.',
  },
  {
    question: 'How long does migration take?',
    answer: 'About 30 minutes of active work. You\'ll spend 5 minutes exporting from GovTribe, 2 minutes signing up for MI, 15 minutes recreating searches, and 3 minutes configuring briefings. Then run both in parallel for 2 weeks before canceling GovTribe.',
  },
  {
    question: 'What if I find MI is missing opportunities GovTribe catches?',
    answer: 'Both tools pull from the same SAM.gov and Grants.gov sources, so coverage should be identical. If you find gaps, contact support — we\'ll add missing filters or sources. Most users find MI catches more opportunities due to broader keyword matching.',
  },
  {
    question: 'Can I keep using GovTribe for some searches and MI for others?',
    answer: 'Yes, but you\'d be paying for two tools. Most users migrate fully to save $112-$333/mo. Start with Mindy Free to test, then decide. The 2-week parallel testing period helps you verify before committing.',
  },
  {
    question: 'Does MI have the same filtering options as GovTribe?',
    answer: 'Yes, and more. MI filters by NAICS, PSC, keywords, agencies, states, set-asides, contract type, and dollar thresholds. We also filter by "expiring soon" (recompetes) and "low bid count" (less competition) — filters GovTribe doesn\'t have.',
  },
];

export default function GovTribeMigrationPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* JSON-LD Schema */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Switch from GovTribe to Mindy',
        description: 'Step-by-step migration guide for switching from GovTribe to Mindy.',
        url: `${SITE_URL}/migration/govtribe`,
        step: migrationSteps.map((step) => ({
          '@type': 'HowToStep',
          name: step.title,
          text: step.description,
          position: step.step,
        })),
        totalTime: 'PT45M',
      }} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">MIGRATION GUIDE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Switching from GovTribe?</span><br />
            <span className="text-green-500">Here&apos;s Your Migration Guide</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Export your saved searches, test Mindy Free side-by-side, and migrate when you&apos;re ready.{' '}
            <span className="text-green-400 font-semibold">45 minutes total work, 2 weeks parallel testing.</span>
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-black text-green-400">45 min</div>
              <div className="text-sm text-slate-400">Total migration time</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-black text-green-400">2 weeks</div>
              <div className="text-sm text-slate-400">Parallel testing period</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-black text-green-400">$0</div>
              <div className="text-sm text-slate-400">Risk (test free first)</div>
            </div>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Start Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* Price Comparison Banner */}
      <section className="py-12 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Price Comparison: What You&apos;ll Save
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="text-sm text-red-400 font-medium mb-1">GovTribe Starter</div>
              <div className="text-4xl font-black text-white">$112<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400 mb-4">$1,350/yr • Annual billing required</div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Basic opportunity alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> SAM.gov integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span> No AI briefings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span> No agency pain points
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span> No SBLO contacts
                </li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">Mindy Pro</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400 mb-4">Month-to-month • Cancel anytime</div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Unlimited opportunity alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> SAM.gov + Grants.gov
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> AI-powered briefings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 200+ agency pain points
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 800+ SBLO contacts
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-400">
              <span className="text-green-400 font-semibold">$37/mo more</span> for AI briefings, agency intelligence, and SBLO contacts.{' '}
              <span className="text-green-400 font-semibold">No annual lock-in.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Migration Guide */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            6-Step Migration Process
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Follow this checklist to migrate without missing opportunities or losing data.
          </p>

          <div className="space-y-8">
            {migrationSteps.map((step) => (
              <div key={step.step} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-green-400">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <span className="text-sm text-green-400 font-medium">{step.duration}</span>
                    </div>
                    <p className="text-slate-400 mb-4">{step.description}</p>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4">
                      <div className="text-sm font-semibold text-slate-300 mb-2">Instructions:</div>
                      <ul className="space-y-2">
                        {step.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="text-green-500 mt-0.5">→</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <span className="text-blue-400 text-sm font-semibold mt-0.5">💡 TIP:</span>
                      <p className="text-sm text-blue-200">{step.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison: Same vs Different */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Feature Comparison: What&apos;s Similar, What&apos;s Different
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Both tools cover SAM.gov and Grants.gov. The differences are in intelligence features.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {featureComparison.map((category) => (
              <div key={category.category} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className={`mt-0.5 ${category.category.includes('Missing') ? 'text-red-400' : 'text-green-500'}`}>
                        {category.category.includes('Missing') ? '○' : '●'}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Users Switch */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Contractors Switch from GovTribe to MI
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            GovTribe is a good tool. These are the features that make MI better for small businesses.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {whyUsersSwitchReasons.map((reason, i) => (
              <div key={i} className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-slate-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Migration FAQs
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/govtribe" className="text-sm text-slate-400 hover:text-white transition">
              Feature Comparison: GovCon Giants vs GovTribe →
            </Link>
            <Link href="/compare/deltek" className="text-sm text-slate-400 hover:text-white transition">
              vs Deltek GovWin →
            </Link>
            <Link href="/compare/federal-compass" className="text-sm text-slate-400 hover:text-white transition">
              vs Federal Compass →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Migration?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Test Mindy Free side-by-side with GovTribe for 2 weeks. No credit card. No risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/compare/govtribe"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See Full Comparison
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
