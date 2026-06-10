import Link from 'next/link';
import ABTestLeadForm from '@/components/ABTestLeadForm';
import { generateSeo } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'MI Free — Government Contracting Intelligence | No Credit Card',
  description: 'Get daily federal contract alerts, agency pain points, and SBLO contacts free. AI-matched opportunities for your NAICS codes. Start winning government contracts with Market Intelligence.',
  path: '/mi-free',
  keywords: [
    'government contract alerts',
    'federal opportunity alerts',
    'SAM.gov alerts',
    'govcon intelligence',
    'market intelligence free',
    'federal contractor tools',
  ],
});

const freeFeatures = [
  {
    icon: '📬',
    title: 'Daily Opportunity Alerts',
    description: '5 AI-matched opportunities per month delivered to your inbox',
  },
  {
    icon: '🎯',
    title: 'Agency Pain Points',
    description: 'See what agencies are struggling with and how you can help',
  },
  {
    icon: '📅',
    title: 'Expiring Contract Finder',
    description: 'Search recompete opportunities 6-18 months before they hit the street',
  },
  {
    icon: '🤝',
    title: 'SBLO Contact Previews',
    description: 'See small business liaison officer names (full contact in Core)',
  },
  {
    icon: '📊',
    title: 'Forecast Notifications',
    description: '10 forecast views per month from 7,700+ upcoming procurements',
  },
  {
    icon: '🔍',
    title: 'CAGE Code Lookup',
    description: 'Search 600,000+ federal contractors by CAGE or company name',
  },
];

const comparisonTable = [
  { feature: 'Daily Opportunity Alerts', free: '5/month', core: 'Unlimited', team: 'Unlimited' },
  { feature: 'AI-Powered Briefings', free: '—', core: '✓', team: '✓' },
  { feature: 'Agency Pain Points', free: 'View only', core: 'Full analysis', team: 'Full analysis' },
  { feature: 'SBLO Contacts', free: 'Name only', core: 'Email + Phone', team: 'Email + Phone' },
  { feature: 'Forecast Access', free: '10/month', core: 'Unlimited', team: 'Unlimited' },
  { feature: 'Pipeline CRM', free: '—', core: '✓', team: '✓' },
  { feature: 'Contractor Database', free: '—', core: '3,500+', team: '3,500+' },
  { feature: 'Team Seats', free: '1', core: '1', team: '5' },
  { feature: 'Price', free: '$0', core: '$149/mo', team: '$499/mo' },
];

export default function MIFreePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MI Free - Government Contracting Intelligence',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free government contracting intelligence platform with daily opportunity alerts, agency pain points, and federal contractor data.',
        url: `${SITE_URL}/mi-free`,
      }} />

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">MI FREE</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">No Credit Card Required</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Government Contracting</span><br />
            <span className="text-green-500">Intelligence</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Stop missing opportunities. Get AI-matched federal contracts delivered to your inbox daily. Free forever.
          </p>

          {/* Email Capture - A/B Testing CTA */}
          <div className="max-w-md mx-auto mb-8">
            <ABTestLeadForm
              testId="mi-free-cta"
              fallbackButtonText="Get Free Access"
              redirectUrl="https://getmindy.ai/alerts/signup"
              source="mi-free-landing"
              hidePhone={true}
              buttonClassName="btn-primary w-full green-glow disabled:opacity-50 text-lg py-4"
            />
            <p className="text-sm text-slate-500 mt-3">
              Join 5,000+ contractors already using MI Free
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What You Get <span className="text-green-500">Free</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/30 transition"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            MI Free vs. MI Core vs. MI Team
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Start free, upgrade when you&apos;re ready
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-green-400 font-bold">FREE</div>
                    <div className="text-slate-500 text-sm">$0</div>
                  </th>
                  <th className="text-center py-4 px-4 bg-green-500/5 rounded-t-lg">
                    <div className="text-white font-bold">CORE</div>
                    <div className="text-green-400 text-sm">$149/mo</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-white font-bold">TEAM</div>
                    <div className="text-slate-400 text-sm">$499/mo</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.slice(0, -1).map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-slate-400">{row.free}</td>
                    <td className="py-4 px-4 text-center text-white bg-green-500/5">{row.core}</td>
                    <td className="py-4 px-4 text-center text-slate-300">{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="https://getmindy.ai/alerts/signup"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all text-center"
            >
              Start Free
            </Link>
            <Link
              href="https://getmindy.ai/market-intelligence"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all text-center border border-slate-700"
            >
              See MI Core Features
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl text-white font-medium mb-6">
            &ldquo;Finally, intelligence I can afford. Found 3 recompete opportunities in my first week that I would have missed.&rdquo;
          </blockquote>
          <div className="text-slate-400">
            — Small Business Owner, 8(a) Certified IT Services
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How MI Free Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Enter Your NAICS</h3>
              <p className="text-slate-400 text-sm">Tell us your industry codes and target agencies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Get Matched Daily</h3>
              <p className="text-slate-400 text-sm">AI scans SAM.gov, Grants.gov, and 7,700+ forecasts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Win More Contracts</h3>
              <p className="text-slate-400 text-sm">Focus on bidding, not searching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Stop Missing Opportunities?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 5,000+ contractors getting daily intelligence. No credit card required.
          </p>

          <div className="max-w-md mx-auto">
            <ABTestLeadForm
              testId="mi-free-cta"
              fallbackButtonText="Get Free Access Now"
              redirectUrl="https://getmindy.ai/alerts/signup"
              source="mi-free-landing-bottom"
              hidePhone={true}
              buttonClassName="btn-primary w-full green-glow disabled:opacity-50 text-lg py-4"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is MI Free really free?</h3>
              <p className="text-slate-400">Yes. No credit card required, no trial period. You get 5 matched opportunities per month and access to our free tools forever.</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What&apos;s the difference between MI Free and MI Core?</h3>
              <p className="text-slate-400">MI Free gives you basic alerts and access to free tools. MI Core ($149/mo) adds AI-powered briefings, full SBLO contact info, unlimited forecasts, Pipeline CRM, and access to our 3,500+ contractor database.</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">How is this different from searching SAM.gov myself?</h3>
              <p className="text-slate-400">We scan SAM.gov, Grants.gov, and 7,700+ agency forecasts daily and match opportunities to your NAICS codes. Most contractors save 10+ hours/week.</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I upgrade later?</h3>
              <p className="text-slate-400">Yes. You can upgrade to MI Core or MI Team anytime from your dashboard. No long-term contracts.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
