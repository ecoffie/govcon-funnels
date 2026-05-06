import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import StatsCounter from '@/components/StatsCounter';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Market Intelligence for Federal Contractors | GovCon Giants',
  description: 'AI-powered market intelligence for government contractors. Save 10+ hours/week searching SAM.gov. Daily briefings matched to your NAICS codes. Used by 5,000+ small businesses.',
  path: '/',
  keywords: [
    'government contracting',
    'federal contracts',
    'market intelligence',
    'govcon',
    'opportunity alerts',
    'federal contractor',
    'government contractor',
    'SAM.gov',
  ],
});

const stats = [
  { value: "$750B+", label: "Federal Spending", numericValue: 750, prefix: "$", suffix: "B+" },
  { value: "10+", label: "Hours Saved/Week", numericValue: 10, suffix: "+" },
  { value: "5,000+", label: "Contractors", numericValue: 5000, suffix: "+" },
  { value: "$2B+", label: "Contracts Won", numericValue: 2, prefix: "$", suffix: "B+" },
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
      {/* Hero Section - Email Capture First */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Value Prop */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">We find contracts.</span><br />
            <span className="text-green-500">You win them.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-2xl mx-auto">
            Stop wasting 10+ hours/week searching SAM.gov.
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            Get AI-matched opportunities delivered to your inbox daily.
          </p>

          {/* Email Capture - Primary CTA */}
          <div className="max-w-md mx-auto mb-8">
            <LeadForm
              buttonText="Get Free Market Intelligence"
              redirectUrl="https://tools.govcongiants.org/market-intelligence"
              source="homepage-hero"
              hidePhone={true}
              buttonClassName="btn-primary w-full green-glow disabled:opacity-50 text-lg py-4"
            />
          </div>

          {/* Stats Bar */}
          <div className="mt-12">
            <StatsCounter stats={stats} />
          </div>
        </div>
      </section>

      {/* Pain Statement - Close the Imagination Gap */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-black text-red-500 mb-2">10+</div>
              <div className="text-slate-400">Hours/week spent searching SAM.gov</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-red-500 mb-2">90%</div>
              <div className="text-slate-400">Of opportunities missed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-green-500 mb-2">$0</div>
              <div className="text-slate-400">Cost to fix this</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 simple steps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg">Three steps. Zero hours on SAM.gov.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enter Your NAICS</h3>
              <p className="text-slate-400">
                Tell us what you do. Takes 30 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Matches You</h3>
              <p className="text-slate-400">
                Our AI scans 1,000+ daily opportunities and finds yours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Win Contracts</h3>
              <p className="text-slate-400">
                Get briefings in your inbox. Focus on winning, not searching.
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

      {/* Core Benefits - Just 2 (Not 6) */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Two Things That Matter
            </h2>
            <p className="text-slate-400 text-lg">Everything else is noise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-3">Find Contracts</h3>
              <p className="text-slate-400">
                AI scans SAM.gov, Grants.gov, and 7,700+ agency forecasts.
                You get matched opportunities — not a firehose.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-2xl font-bold text-white mb-3">Daily Briefings</h3>
              <p className="text-slate-400">
                Wake up to opportunities scored by win probability.
                Know what to pursue. Know what to skip.
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
                href="https://tools.govcongiants.org/market-intelligence"
                className="block w-full py-3 text-center bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Email Capture */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop searching.<br />
            <span className="text-green-500">Start winning.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Join 5,000+ contractors who get matched opportunities daily.
          </p>
          <div className="max-w-md mx-auto">
            <LeadForm
              buttonText="Get Free Access"
              redirectUrl="https://tools.govcongiants.org/market-intelligence"
              source="homepage-footer"
              hidePhone={true}
              buttonClassName="btn-primary w-full green-glow disabled:opacity-50 text-lg py-4"
            />
          </div>
        </div>
      </section>

      {/* SEO Links - Condensed */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
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
