import Link from 'next/link';
import { generateSeo, SITE_URL, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Switch from GovWin to Market Intelligence [2026 Migration Guide]',
  description: 'Complete migration guide for switching from Deltek GovWin to GovCon Giants Market Intelligence. Step-by-step instructions, ROI calculator, and honest comparison. Save $23K+/year.',
  path: '/migration/govwin',
  keywords: [
    'switch from govwin',
    'govwin alternative migration',
    'cancel govwin subscription',
    'migrate from deltek govwin',
    'govwin to market intelligence',
    'leave govwin',
    'govwin replacement',
    'cancel deltek',
  ],
});

const migrationSteps = [
  {
    step: 1,
    title: 'Export Your Pipeline from GovWin',
    duration: '15 minutes',
    instructions: [
      'Log into your GovWin IQ account',
      'Go to Pipeline > Export Data',
      'Select all active opportunities',
      'Export as CSV or Excel format',
      'Download to your local drive',
    ],
    tip: 'Export both active and forecasted opportunities so you don\'t lose any leads.',
  },
  {
    step: 2,
    title: 'Sign Up for MI Free (No Credit Card)',
    duration: '5 minutes',
    instructions: [
      'Go to govcongiants.com/mi-free',
      'Enter your email and create password',
      'Verify your email address',
      'Complete your profile (NAICS, set-asides)',
      'Start exploring the free tier',
    ],
    tip: 'Keep both systems running for 30 days to ensure smooth transition.',
  },
  {
    step: 3,
    title: 'Set Up Your NAICS Codes & Alerts',
    duration: '10 minutes',
    instructions: [
      'Navigate to Settings > Profile in MI',
      'Add your primary NAICS codes (up to 10)',
      'Select your set-aside categories (8(a), SDVOSB, etc.)',
      'Configure alert preferences (daily or weekly)',
      'Add keywords for targeted opportunities',
    ],
    tip: 'Use the same NAICS codes you had in GovWin for consistent results.',
  },
  {
    step: 4,
    title: 'Import Your Target Opportunities',
    duration: '20 minutes',
    instructions: [
      'Open your exported GovWin CSV file',
      'In MI, go to Pipeline > Import',
      'Map your CSV columns to MI fields',
      'Review and validate the import preview',
      'Complete import and verify all records',
    ],
    tip: 'Contact support@govconedu.com if you need help mapping complex fields.',
  },
  {
    step: 5,
    title: 'Cancel GovWin When Ready',
    duration: '10 minutes',
    instructions: [
      'Use MI exclusively for 2-4 weeks first',
      'Verify all critical workflows are covered',
      'Contact GovWin account manager to cancel',
      'Request final data export (if needed)',
      'Confirm cancellation in writing',
    ],
    tip: 'Most GovWin contracts require 30-day notice. Check your agreement.',
  },
];

const comparisonData = [
  {
    feature: 'Opportunity Alerts',
    govwin: { value: '✓', detail: 'Daily alerts' },
    mi: { value: '✓', detail: 'AI-matched daily/weekly' },
  },
  {
    feature: 'SAM.gov Integration',
    govwin: { value: '✓', detail: 'Real-time sync' },
    mi: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    govwin: { value: '✓', detail: 'Full coverage' },
    mi: { value: '✓', detail: 'Full coverage' },
  },
  {
    feature: 'Agency Pain Points',
    govwin: { value: 'Limited', detail: 'Via analyst calls' },
    mi: { value: '✓', detail: '200+ agencies' },
  },
  {
    feature: 'SBLO Contacts',
    govwin: { value: '✗', detail: 'Not included' },
    mi: { value: '✓', detail: '800+ with email/phone' },
  },
  {
    feature: 'Expiring Contracts',
    govwin: { value: '✓', detail: 'Contract history' },
    mi: { value: '✓', detail: '5,000+ recompetes' },
  },
  {
    feature: 'Forecast Intelligence',
    govwin: { value: '✓', detail: 'Agency forecasts' },
    mi: { value: '✓', detail: '7,700+ forecasts' },
  },
  {
    feature: 'Pipeline CRM',
    govwin: { value: '✓', detail: 'Full CRM suite' },
    mi: { value: '✓', detail: 'Built-in tracking' },
  },
  {
    feature: 'AI Briefings',
    govwin: { value: '✗', detail: 'Manual research' },
    mi: { value: '✓', detail: 'Daily summaries' },
  },
  {
    feature: 'Analyst Reports',
    govwin: { value: '✓', detail: 'Human analysts' },
    mi: { value: '✗', detail: 'Self-service tools' },
  },
  {
    feature: 'Price (Annual)',
    govwin: { value: '$6,000+', detail: '12-month contract' },
    mi: { value: '$1,788', detail: 'Month-to-month' },
  },
  {
    feature: 'Additional Users',
    govwin: { value: '$2,000+', detail: 'Per user/year' },
    mi: { value: '$0', detail: 'Unlimited in Team plan' },
  },
];

const faqs = [
  {
    question: 'How long does the migration take?',
    answer: 'The technical migration takes about 1 hour to export from GovWin and import into MI. We recommend running both systems in parallel for 2-4 weeks to ensure a smooth transition before canceling GovWin.',
  },
  {
    question: 'Will I lose any data during migration?',
    answer: 'No. You can export your complete pipeline from GovWin as CSV/Excel, which includes all opportunity details, notes, and status. Our import tool preserves all this data when moving to MI.',
  },
  {
    question: 'What if I\'m locked into a GovWin contract?',
    answer: 'Most GovWin contracts are annual with 30-day cancellation notice. You can start using MI Free immediately while you wait for your GovWin contract to expire. This lets you learn the system without paying for both.',
  },
  {
    question: 'Do you have the same agency data as GovWin?',
    answer: 'We pull from the same public sources (SAM.gov, Grants.gov, USASpending, agency forecasts). Our agency pain points data is proprietary and actually more detailed than what GovWin provides. The main difference: GovWin has human analyst reports, while we provide AI-powered self-service tools.',
  },
  {
    question: 'Can you help me with the migration?',
    answer: 'Yes! Email support@govconedu.com after signing up. Our team will schedule a 30-minute onboarding call to help you import your pipeline, set up alerts, and configure your profile. This is included free with MI Core and MI Team subscriptions.',
  },
];

export default function GovWinMigrationPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Switch from GovWin to Market Intelligence',
        description: 'Complete step-by-step guide for migrating from Deltek GovWin to GovCon Giants Market Intelligence.',
        totalTime: 'PT1H',
        step: migrationSteps.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.instructions.join(' '),
          position: s.step,
        })),
      }} />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">MIGRATION GUIDE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Switching from GovWin?</span><br />
            <span className="text-green-400">Here&apos;s Your Migration Guide</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Complete step-by-step instructions for migrating from Deltek GovWin to Market Intelligence.
            Keep your pipeline, save money, gain better tools.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl font-black text-green-400 mb-1">1 Hour</div>
              <div className="text-sm text-slate-400">Migration Time</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl font-black text-green-400 mb-1">$23K+</div>
              <div className="text-sm text-slate-400">5-Year Savings</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl font-black text-green-400 mb-1">0</div>
              <div className="text-sm text-slate-400">Data Lost</div>
            </div>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Start Free Migration — No Credit Card
          </Link>
        </div>
      </section>

      {/* Migration Steps */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            5-Step Migration Process
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Follow this checklist to switch from GovWin to Market Intelligence without losing any data or missing opportunities.
          </p>

          <div className="space-y-8">
            {migrationSteps.map((step) => (
              <div key={step.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-white">{step.step}</span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <span className="text-sm text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {step.instructions.map((instruction, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-slate-300">{instruction}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 text-lg">💡</span>
                        <div>
                          <div className="text-amber-400 font-semibold text-sm mb-1">Pro Tip</div>
                          <div className="text-slate-300 text-sm">{step.tip}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            ROI Calculator: Save $23K+ by Switching
          </h2>
          <p className="text-slate-400 text-center mb-12">
            See how much money you&apos;ll save over 5 years by switching from GovWin to Market Intelligence.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {/* Year 1 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-red-400 font-semibold mb-4">GovWin Cost (Year 1)</div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span>Base subscription</span>
                    <span className="font-mono">$6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional user (2)</span>
                    <span className="font-mono">$4,000</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-bold text-white">
                    <span>Year 1 Total</span>
                    <span className="font-mono">$10,000</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-green-400 font-semibold mb-4">MI Team Cost (Year 1)</div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span>MI Team (5 users)</span>
                    <span className="font-mono">$5,988</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup fee</span>
                    <span className="font-mono">$0</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-bold text-white">
                    <span>Year 1 Total</span>
                    <span className="font-mono">$5,988</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-green-400 font-semibold mb-2">Year 1 Savings</div>
                <div className="text-4xl font-black text-white mb-1">$4,012</div>
                <div className="text-sm text-slate-400">Enough to hire a part-time proposal writer</div>
              </div>
            </div>

            {/* 5-Year Projection */}
            <div className="grid grid-cols-5 gap-2 text-center mb-4">
              {[1, 2, 3, 4, 5].map((year) => (
                <div key={year} className="bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Year {year}</div>
                  <div className="text-sm font-bold text-green-400">
                    ${(4012 * year).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-2">$23,412</div>
              <div className="text-slate-400">Total 5-Year Savings (GovWin vs MI Team)</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Miss vs What You'll Gain */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Honest Comparison: What Changes When You Switch
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What You'll Miss */}
            <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-400 mb-6">What You&apos;ll Miss</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Human Analyst Reports</div>
                    <div className="text-slate-400 text-sm">
                      GovWin has dedicated analysts who write market intelligence reports. MI is self-service with AI-powered tools.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Advanced Bid/Capture Suite</div>
                    <div className="text-slate-400 text-sm">
                      GovWin has enterprise-level bid management features. MI has basic pipeline tracking (sufficient for most small businesses).
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Dedicated Account Manager</div>
                    <div className="text-slate-400 text-sm">
                      GovWin assigns account managers. MI provides email support (responses within 24 hours).
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* What You'll Gain */}
            <div className="bg-green-500/5 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6">What You&apos;ll Gain</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-semibold mb-1">$4,000+ Annual Savings</div>
                    <div className="text-slate-400 text-sm">
                      Money you can reinvest in proposals, hiring, or certifications. GovWin is designed for enterprises with big budgets.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Unlimited Users (Team Plan)</div>
                    <div className="text-slate-400 text-sm">
                      GovWin charges $2,000+ per additional user. MI Team includes 5 users at $499/mo total.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-semibold mb-1">AI-Powered Daily Briefings</div>
                    <div className="text-slate-400 text-sm">
                      Automated summaries of opportunities, agency pain points, and recompetes. GovWin requires manual research.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-semibold mb-1">800+ SBLO Contacts</div>
                    <div className="text-slate-400 text-sm">
                      Direct email/phone for Small Business Liaison Officers. Not available in GovWin.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Month-to-Month Pricing</div>
                    <div className="text-slate-400 text-sm">
                      No 12-month contracts. Cancel anytime if it&apos;s not working for you.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Feature Comparison: GovWin vs Market Intelligence
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-slate-300 font-bold">GovWin</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 bg-green-500/5 rounded-t-lg">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-green-400 font-bold">Market Intelligence</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.govwin.value === '✓' ? 'text-slate-300' : row.govwin.value === '✗' ? 'text-red-400' : row.govwin.value.includes('$') ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.govwin.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.govwin.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.mi.value === '✓' ? 'text-green-400' : row.mi.value === '✗' ? 'text-red-400' : row.mi.value.includes('$') ? 'text-green-400' : 'text-white'}`}>
                        {row.mi.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.mi.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* Pricing CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Start with Free, Upgrade When Ready
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="text-green-400 font-semibold mb-2">MI FREE</div>
              <div className="text-4xl font-black text-white mb-1">$0</div>
              <div className="text-slate-500 mb-6">Forever free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> 5 alerts/month
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Pain points preview
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> CAGE lookup
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Expiring contracts
                </li>
              </ul>
              <Link
                href="/mi-free"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Start Free Migration
              </Link>
            </div>

            {/* Core Tier */}
            <div className="bg-slate-900 border-2 border-green-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-green-400 font-semibold mb-2">MI CORE</div>
              <div className="text-4xl font-black text-white mb-1">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-slate-500 mb-6">vs $500+/mo GovWin</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Unlimited alerts
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> AI briefings
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> SBLO contacts
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Pipeline CRM
                </li>
              </ul>
              <Link
                href="https://mi.govcongiants.com/market-intelligence"
                className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
              >
                Upgrade to Core
              </Link>
            </div>

            {/* Team Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="text-blue-400 font-semibold mb-2">MI TEAM</div>
              <div className="text-4xl font-black text-white mb-1">$499<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-slate-500 mb-6">vs $10K+/yr GovWin</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Everything in Core
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> 5 team seats
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Team pipeline
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Priority support
                </li>
              </ul>
              <Link
                href="https://mi.govcongiants.com/market-intelligence"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Upgrade to Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make the Switch?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start with MI Free today. No credit card, no contract, no risk.
            Keep GovWin running while you test-drive Market Intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Migration
            </Link>
            <Link
              href="/compare/deltek"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Detailed Comparison
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/deltek" className="text-sm text-slate-400 hover:text-white transition">
              GovWin vs MI Comparison →
            </Link>
            <Link href="/compare/govtribe" className="text-sm text-slate-400 hover:text-white transition">
              vs GovTribe →
            </Link>
            <Link href="/compare/federal-compass" className="text-sm text-slate-400 hover:text-white transition">
              vs Federal Compass →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
