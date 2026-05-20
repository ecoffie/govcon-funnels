import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import StatsCounter from '@/components/StatsCounter';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Government Contracting Intelligence Platform | GovCon Giants',
  description: 'Compete like a $50M contractor starting at $149/month. The intelligence Deltek charges $25K for — built for small businesses. 7,700+ forecasts, 800+ SBLO contacts, AI-powered briefings.',
  path: '/',
  keywords: [
    'government contracting',
    'federal contracts',
    'market intelligence',
    'govcon',
    'deltek alternative',
    'govwin alternative',
    'federal contractor',
    'government contractor',
    'SAM.gov',
  ],
});

const stats = [
  { value: "7,700+", label: "Forecasts", numericValue: 7700, suffix: "+" },
  { value: "3,500+", label: "Contractors in DB", numericValue: 3500, suffix: "+" },
  { value: "800+", label: "SBLO Contacts", numericValue: 800, suffix: "+" },
  { value: "50+", label: "Agency Pain Points", numericValue: 50, suffix: "+" },
];

const testimonials = [
  {
    quote: "I used to spend hours every day on SAM.gov. Now I get matched opportunities in my inbox. Game changer.",
    name: "Marcus T.",
    title: "8(a) IT Services",
  },
  {
    quote: "Found a $2.4M recompete I would have missed. The AI briefings pay for themselves.",
    name: "Sandra K.",
    title: "SDVOSB Construction",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section - Platform Positioning */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Platform Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-medium text-sm">Trusted by 5,000+ contractors</span>
          </div>

          {/* Value Prop */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Compete Like a</span><br />
            <span className="text-green-500">$50M Contractor.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-2 max-w-2xl mx-auto">
            Starting at $149/month.
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            The intelligence Deltek charges $25K for — built for small businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free
            </Link>
            <Link
              href="/compare/deltek"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See How We Compare
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-12">
            <StatsCounter stats={stats} />
          </div>
        </div>
      </section>

      {/* Comparison Strip */}
      <section className="py-12 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-black text-red-400 mb-2">$13K-$119K</div>
              <div className="text-slate-400">Deltek GovWin IQ pricing</div>
            </div>
            <div className="p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">YOU</span>
              </div>
              <div className="text-4xl font-black text-green-500 mb-2">$149/mo</div>
              <div className="text-slate-400">GovCon Giants (flat rate)</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-green-500 mb-2">98%</div>
              <div className="text-slate-400">Savings vs. enterprise tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything Big Contractors Have
            </h2>
            <p className="text-slate-400 text-lg">Without the enterprise price tag.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-green-500/50 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">AI Briefings</h3>
              <p className="text-slate-400 text-sm">
                Daily opportunities scored by win probability
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-green-500/50 transition">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-lg font-bold text-white mb-2">7,700+ Forecasts</h3>
              <p className="text-slate-400 text-sm">
                See what agencies plan to buy before RFPs drop
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-green-500/50 transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-white mb-2">800+ SBLOs</h3>
              <p className="text-slate-400 text-sm">
                Direct contacts at prime contractors for teaming
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-green-500/50 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Agency Pain Points</h3>
              <p className="text-slate-400 text-sm">
                Know what 50+ agencies need before you bid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <p className="text-slate-300 text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why 5,000+ Contractors Switched
            </h2>
            <p className="text-slate-400 text-lg">From enterprise tools to GovCon Giants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">98% Less Cost</h3>
              <p className="text-slate-400">
                Deltek charges $13K-$119K/year. We charge $149/month. Same intel, fraction of the price.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-slate-400">
                Our AI scores opportunities by win probability. Stop chasing contracts you won't win.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3">Built for Small Biz</h3>
              <p className="text-slate-400">
                No per-seat fees. No annual contracts. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Simple Free vs Pro (Mailchimp Model) */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-slate-400 text-lg">Start free. Upgrade when you're winning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-black text-white">$0</div>
                <p className="text-slate-500 mt-1">Forever</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  Daily opportunity alerts
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  5 market research reports/month
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  NAICS matching
                </li>
              </ul>
              <Link
                href="/free-course"
                className="block w-full py-3 text-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-600/50 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-black text-white">$149<span className="text-lg font-normal text-slate-400">/mo</span></div>
                <p className="text-slate-500 mt-1">Everything</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  <strong>AI Daily Briefings</strong>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  <strong>Weekly Deep Dives</strong>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  7,700+ agency forecasts
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  Unlimited market research
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  Pipeline tracker + CRM
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span>
                  Training included
                </li>
              </ul>
              <Link
                href="https://mi.govcongiants.com/market-intelligence"
                className="block w-full py-3 text-center bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Compete with the Big Players?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Start free. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Data Platform Links */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-slate-500 text-sm font-medium mb-6 uppercase tracking-wide">Market Intelligence Platform</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/data/agencies" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-500/50 transition text-center group">
              <div className="text-2xl font-bold text-green-400 mb-1">35+</div>
              <div className="text-sm text-slate-400 group-hover:text-white transition">Agency Profiles</div>
            </Link>
            <Link href="/data/contractors" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-500/50 transition text-center group">
              <div className="text-2xl font-bold text-blue-400 mb-1">500K+</div>
              <div className="text-sm text-slate-400 group-hover:text-white transition">Contractors</div>
            </Link>
            <Link href="/data/forecasts" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-500/50 transition text-center group">
              <div className="text-2xl font-bold text-amber-400 mb-1">7,700+</div>
              <div className="text-sm text-slate-400 group-hover:text-white transition">Forecasts</div>
            </Link>
            <Link href="/tools/expiring-contracts" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-500/50 transition text-center group">
              <div className="text-2xl font-bold text-purple-400 mb-1">Live</div>
              <div className="text-sm text-slate-400 group-hover:text-white transition">Expiring Contracts</div>
            </Link>
          </div>
          {/* Industry & Product Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
            <Link href="/for/it-contractors" className="text-slate-400 hover:text-green-400 transition">IT Contractors</Link>
            <span className="text-slate-700">•</span>
            <Link href="/for/construction" className="text-slate-400 hover:text-green-400 transition">Construction</Link>
            <span className="text-slate-700">•</span>
            <Link href="/for/professional-services" className="text-slate-400 hover:text-green-400 transition">Professional Services</Link>
            <span className="text-slate-700">•</span>
            <Link href="/features" className="text-slate-400 hover:text-green-400 transition">All Features</Link>
            <span className="text-slate-700">•</span>
            <Link href="/demo" className="text-slate-400 hover:text-green-400 transition">Product Demo</Link>
            <span className="text-slate-700">•</span>
            <Link href="/compare/deltek" className="text-slate-400 hover:text-green-400 transition">vs. GovWin</Link>
          </div>
          {/* Resource Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/guides" className="text-slate-400 hover:text-green-400 transition">140+ Free Guides</Link>
            <span className="text-slate-700">•</span>
            <Link href="/guides/sam-gov-registration" className="text-slate-400 hover:text-green-400 transition">SAM.gov Registration</Link>
            <span className="text-slate-700">•</span>
            <Link href="/guides/cage-code" className="text-slate-400 hover:text-green-400 transition">CAGE Code</Link>
            <span className="text-slate-700">•</span>
            <Link href="/guides/8a-certification" className="text-slate-400 hover:text-green-400 transition">8(a) Certification</Link>
            <span className="text-slate-700">•</span>
            <Link href="/glossary" className="text-slate-400 hover:text-green-400 transition">GovCon Glossary</Link>
            <span className="text-slate-700">•</span>
            <Link href="/jobs" className="text-slate-400 hover:text-green-400 transition">GovCon Jobs</Link>
            <span className="text-slate-700">•</span>
            <Link href="/blog" className="text-slate-400 hover:text-green-400 transition">Blog</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-white">GovCon</span>
              <span className="text-xl font-bold text-green-500">Giants</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="tel:7864770477" className="text-slate-400 hover:text-white transition">786-477-0477</a>
              <a href="mailto:hello@govconedu.com" className="text-slate-400 hover:text-white transition">hello@govconedu.com</a>
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition">Terms</Link>
            </div>
            <p className="text-slate-600 text-sm">
              © 2026 GovCon Giants
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
