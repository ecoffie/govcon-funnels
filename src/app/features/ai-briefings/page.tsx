import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'AI Contract Briefings — Daily Federal Contracting Intelligence',
  description: 'Get daily AI-powered briefings matched to your NAICS codes and certifications. New opportunities, agency updates, and competitive intel delivered every morning.',
  path: '/features/ai-briefings',
  keywords: [
    'government contract alerts',
    'federal contracting intelligence',
    'daily contract briefings',
    'federal contract notifications',
    'government bid alerts',
    'contract opportunity alerts',
    'federal contracting news',
  ],
});

const briefingTypes = [
  {
    name: 'Daily Briefing',
    description: 'Your morning intelligence report',
    frequency: 'Every morning at 6 AM',
    icon: '🌅',
    includes: [
      'New opportunities matched to your profile',
      'Amendments to opportunities you\'re tracking',
      'Closing deadlines in the next 7 days',
      'Competitor activity on your pursuits',
    ],
  },
  {
    name: 'Weekly Digest',
    description: 'Big-picture strategic view',
    frequency: 'Every Monday morning',
    icon: '📊',
    includes: [
      'Opportunities you may have missed',
      'Pipeline health summary',
      'Win probability changes',
      'Agency spending trends',
    ],
  },
  {
    name: 'Pursuit Briefing',
    description: 'Deep dive on active pursuits',
    frequency: 'On-demand',
    icon: '🎯',
    includes: [
      'Incumbent analysis',
      'Competitive landscape',
      'Agency pain points',
      'Recommended positioning',
    ],
  },
];

const aiCapabilities = [
  {
    title: 'Semantic Matching',
    description: 'Our AI understands context, not just keywords. When you do "IT support," we find "technology services," "help desk," and "systems administration" too.',
    icon: '🧠',
  },
  {
    title: 'Fit Scoring',
    description: 'Every opportunity scored 0-100% based on NAICS alignment, set-aside match, contract size, geography, and your past performance.',
    icon: '🎯',
  },
  {
    title: 'Trend Detection',
    description: 'AI spots patterns you\'d miss: agencies ramping up spending in your area, new requirements emerging, or competitors changing strategy.',
    icon: '📈',
  },
  {
    title: 'Risk Flagging',
    description: 'Automatic alerts when deadlines approach, incumbents are strong, or requirements exceed your capabilities.',
    icon: '⚠️',
  },
];

const customizationOptions = [
  { name: 'NAICS Codes', description: 'Primary and secondary codes you\'re registered under' },
  { name: 'Certifications', description: '8(a), SDVOSB, WOSB, HUBZone, etc.' },
  { name: 'Contract Size', description: 'Minimum and maximum dollar values' },
  { name: 'Geography', description: 'States, regions, or nationwide' },
  { name: 'Agencies', description: 'Focus on specific agencies or exclude others' },
  { name: 'Keywords', description: 'Specific terms to watch for or avoid' },
];

const comparisonData = [
  { feature: 'Daily email alerts', samGov: true, govWin: true, gcg: true },
  { feature: 'AI matching', samGov: false, govWin: true, gcg: true },
  { feature: 'Fit scoring', samGov: false, govWin: true, gcg: true },
  { feature: 'Amendment alerts', samGov: false, govWin: true, gcg: true },
  { feature: 'Competitor tracking', samGov: false, govWin: true, gcg: true },
  { feature: 'Weekly digest', samGov: false, govWin: true, gcg: true },
  { feature: 'Pursuit briefings', samGov: false, govWin: true, gcg: true },
  { feature: 'Agency intelligence', samGov: false, govWin: true, gcg: true },
  { feature: 'Price', samGov: 'Free', govWin: '$13K+/yr', gcg: '$149/mo' },
];

const faqs = [
  {
    question: 'When are briefings delivered?',
    answer: 'Daily briefings arrive by 6 AM Eastern. Weekly digests arrive Monday mornings. Pursuit briefings are generated on-demand when you request them.',
  },
  {
    question: 'Can I get briefings via Slack or Teams?',
    answer: 'Currently briefings are email-only. Slack and Teams integration is on our roadmap for Q3 2026.',
  },
  {
    question: 'How many opportunities are in each briefing?',
    answer: 'We prioritize quality over quantity. Daily briefings typically include 5-15 high-fit opportunities. You can adjust the fit threshold to get more or fewer matches.',
  },
  {
    question: 'What if I miss something important?',
    answer: 'Your weekly digest catches anything you might have missed. Plus, all opportunities are saved in your dashboard — nothing disappears.',
  },
  {
    question: 'How is this different from SAM.gov\'s saved search emails?',
    answer: 'SAM.gov sends keyword matches — often hundreds of irrelevant results. Our AI filters to only relevant opportunities, scores them by fit, and adds context like agency history and competition.',
  },
];

export default function AIBriefingsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants AI Briefings',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'AI-powered federal contracting intelligence briefings delivered daily.',
        url: `${SITE_URL}/features/ai-briefings`,
        offers: {
          '@type': 'Offer',
          price: '149',
          priceCurrency: 'USD',
        },
        featureList: [
          'Daily opportunity briefings',
          'AI-powered matching',
          'Fit scoring',
          'Amendment alerts',
          'Competitor tracking',
          'Pursuit analysis',
        ],
      }} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6">
            <span className="text-violet-400 font-semibold">AI BRIEFINGS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Start Every Morning With</span><br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Contract Intelligence
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Wake up to <span className="text-violet-400 font-semibold">AI-curated opportunities</span> matched to your NAICS codes and certifications.
            No more hours searching SAM.gov. No more missed deadlines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Getting Briefings
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-violet-400">6 AM</div>
              <div className="text-sm text-slate-500">Delivered daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-violet-400">10+</div>
              <div className="text-sm text-slate-500">Hours saved weekly</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-violet-400">92%</div>
              <div className="text-sm text-slate-500">Match relevance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Briefing Types */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Three Briefing Types
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Different intelligence for different needs — from daily tactical to strategic planning.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {briefingTypes.map((briefing) => (
              <div key={briefing.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition">
                <div className="text-4xl mb-4">{briefing.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{briefing.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{briefing.description}</p>
                <div className="text-violet-400 text-sm font-medium mb-4">{briefing.frequency}</div>
                <div className="border-t border-slate-800 pt-4">
                  <div className="text-slate-500 text-xs uppercase mb-2">Includes:</div>
                  <ul className="space-y-1">
                    {briefing.includes.map((item) => (
                      <li key={item} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-violet-400">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            AI That Actually Helps
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Not buzzword AI. Practical intelligence that saves you time and helps you win.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {aiCapabilities.map((capability) => (
              <div key={capability.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{capability.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{capability.title}</h3>
                    <p className="text-slate-400">{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Tuned to Your Business
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Set your profile once. Get relevant briefings every day. No manual filtering.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {customizationOptions.map((option) => (
              <div key={option.name} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-white font-semibold mb-1">{option.name}</div>
                <div className="text-slate-500 text-sm">{option.description}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-slate-900 border border-violet-500/30 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Example: IT Services Company Profile</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-violet-400">NAICS:</span>{' '}
                <span className="text-slate-300">541512, 541519, 541611</span>
              </div>
              <div>
                <span className="text-violet-400">Certifications:</span>{' '}
                <span className="text-slate-300">8(a), SDVOSB</span>
              </div>
              <div>
                <span className="text-violet-400">Contract Size:</span>{' '}
                <span className="text-slate-300">$500K - $10M</span>
              </div>
              <div>
                <span className="text-violet-400">Geography:</span>{' '}
                <span className="text-slate-300">DC Metro, Virginia, Nationwide</span>
              </div>
              <div>
                <span className="text-violet-400">Focus Agencies:</span>{' '}
                <span className="text-slate-300">DoD, VA, DHS</span>
              </div>
              <div>
                <span className="text-violet-400">Keywords:</span>{' '}
                <span className="text-slate-300">cybersecurity, cloud, help desk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Briefing */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What You&apos;ll Receive
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Here&apos;s what a typical daily briefing looks like:
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-violet-900/30 border-b border-slate-800 p-4">
              <div className="text-white font-bold">Your Daily Contract Briefing</div>
              <div className="text-slate-400 text-sm">Friday, May 9, 2026</div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-violet-400 font-semibold mb-3">New Opportunities (8 matches)</h4>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold">94% FIT</span>
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">8(a)</span>
                    </div>
                    <div className="text-white font-semibold">IT Help Desk Support Services</div>
                    <div className="text-slate-400 text-sm">Department of Veterans Affairs • $5.2M • Closes Jun 15</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded font-bold">78% FIT</span>
                      <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">SDVOSB</span>
                    </div>
                    <div className="text-white font-semibold">Cybersecurity Assessment Services</div>
                    <div className="text-slate-400 text-sm">DHS • $2.8M • Closes Jun 22</div>
                  </div>
                  <div className="text-violet-400 text-sm">+ 6 more opportunities →</div>
                </div>
              </div>

              <div>
                <h4 className="text-amber-400 font-semibold mb-3">Closing Soon (3 opportunities)</h4>
                <div className="text-slate-300 text-sm space-y-2">
                  <div>• <span className="text-white">Network Support Services</span> — Closes Monday</div>
                  <div>• <span className="text-white">Cloud Migration</span> — Closes Wednesday</div>
                  <div>• <span className="text-white">Data Center Ops</span> — Closes Friday</div>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 font-semibold mb-3">Amendments (2 updates)</h4>
                <div className="text-slate-300 text-sm space-y-2">
                  <div>• <span className="text-white">GSA IT Services</span> — Due date extended to Jul 1</div>
                  <div>• <span className="text-white">DoD Help Desk</span> — Q&A responses posted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Better Alerts, Lower Cost
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Enterprise-quality intelligence without the enterprise price tag.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th className="pb-4 pr-4">Feature</th>
                  <th className="pb-4 px-4 text-center">SAM.gov</th>
                  <th className="pb-4 px-4 text-center">GovWin</th>
                  <th className="pb-4 px-4 text-center">GovCon Giants</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.samGov === 'boolean' ? (
                        row.samGov ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-slate-400">{row.samGov}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.govWin === 'boolean' ? (
                        row.govWin ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-slate-400">{row.govWin}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.gcg === 'boolean' ? (
                        row.gcg ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-violet-400 font-semibold">{row.gcg}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Related Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/features/opportunity-finder" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition">
              <h3 className="text-white font-bold mb-2">Opportunity Finder</h3>
              <p className="text-slate-400 text-sm">Search on-demand when you need more.</p>
              <span className="text-violet-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/pipeline-crm" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition">
              <h3 className="text-white font-bold mb-2">Pipeline CRM</h3>
              <p className="text-slate-400 text-sm">Add briefing matches to your pipeline.</p>
              <span className="text-violet-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/recompete-tracker" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition">
              <h3 className="text-white font-bold mb-2">Recompete Tracker</h3>
              <p className="text-slate-400 text-sm">Get alerts on expiring contracts.</p>
              <span className="text-violet-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-violet-900/30 to-slate-900 border border-violet-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Morning Smarter
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Get your first AI briefing tomorrow morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Today
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
