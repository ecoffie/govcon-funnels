import Link from 'next/link';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Mindy | Free Federal Contract Alerts & Market Intelligence',
  description: 'Get daily federal contract opportunities matched to your business. Free forever. AI-powered alerts from SAM.gov, Grants.gov, and 7,600+ agency forecasts. The big contractors have armies. You have Mindy.',
  path: '/mi',
  keywords: [
    'federal contract alerts',
    'government contracting',
    'SAM.gov alerts',
    'federal opportunities',
    'small business contracting',
    'free govcon alerts',
    'daily briefings',
    'market intelligence',
  ],
});

// URLs
const FREE_SIGNUP_URL = 'https://mi.govcongiants.com/alerts/signup';
const DASHBOARD_URL = 'https://mi.govcongiants.com/briefings';

export default function MindyFreePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Mindy Logo */}
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl shadow-purple-500/30">
              <span className="text-white font-bold text-4xl">M</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Meet Mindy.
          </h1>
          <h2 className="text-2xl md:text-3xl text-purple-200 mb-6">
            Your 24/7 Federal Market Intelligence Analyst.
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
            While you sleep, Mindy scans 24,000+ federal opportunities and delivers
            the ones that match YOUR business — before your first coffee.
          </p>

          {/* Free Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-8">
            <span className="text-green-400 font-bold">FREE FOREVER</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">No credit card required</span>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <Link
              href={FREE_SIGNUP_URL}
              className="px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xl shadow-xl transition-all hover:scale-105 border border-purple-400"
            >
              Get Your First Briefing Free
            </Link>
            <p className="text-slate-400 text-sm">
              Join 5,000+ contractors already using Mindy
            </p>
          </div>

          {/* Already have access */}
          <div className="mt-6">
            <Link
              href={DASHBOARD_URL}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Already have access? Go to your dashboard &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          The Big Contractors Have Armies.
          <span className="text-purple-400 block mt-2">You Have... Spreadsheets.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">1,500+</div>
            <p className="text-slate-300">New opportunities posted daily</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
            <p className="text-slate-300">Government sites to monitor</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">$750B</div>
            <p className="text-slate-300">In annual federal spending</p>
          </div>
        </div>

        <div className="mt-10 bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center">
          <p className="text-xl text-white font-semibold">
            No human can track it all. <span className="text-purple-400">But Mindy can.</span>
          </p>
        </div>
      </section>

      {/* What You Get Free */}
      <section className="bg-slate-900/50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What You Get <span className="text-green-400">Free</span>
          </h2>
          <p className="text-slate-400 text-center mb-12">
            No credit card. No trial period. Free forever.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">📬</div>
              <h3 className="text-lg font-semibold text-white mb-2">Daily Opportunity Alerts</h3>
              <p className="text-slate-400 text-sm">Matched to YOUR NAICS codes and delivered to your inbox every morning</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="text-lg font-semibold text-white mb-2">7,600+ Forecasts</h3>
              <p className="text-slate-400 text-sm">See what agencies plan to buy 6-18 months before RFPs drop</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">NAICS Matching</h3>
              <p className="text-slate-400 text-sm">Tell Mindy your codes once, get relevant opportunities forever</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-semibold text-white mb-2">Agency Pain Points</h3>
              <p className="text-slate-400 text-sm">Know what 50+ agencies are struggling with before you bid</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-white mb-2">Expiring Contract Finder</h3>
              <p className="text-slate-400 text-sm">Find recompete opportunities before they hit the street</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-white mb-2">Contractor Database</h3>
              <p className="text-slate-400 text-sm">Search 600,000+ federal contractors by CAGE code</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          From Signup to Briefing in 3 Minutes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">1</div>
            <h3 className="text-lg font-bold text-white mb-2">Tell Mindy About Your Business</h3>
            <p className="text-slate-400">Your NAICS codes, target agencies, set-aside status. Takes 2 minutes.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">2</div>
            <h3 className="text-lg font-bold text-white mb-2">Wake Up to Intelligence</h3>
            <p className="text-slate-400">Every morning, Mindy delivers opportunities matched to YOUR profile.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">3</div>
            <h3 className="text-lg font-bold text-white mb-2">Go Win Contracts</h3>
            <p className="text-slate-400">Spend your time on proposals, not searching. Mindy handles the hunting.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-900/50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl text-white mb-6 italic">
            &ldquo;Finally, intelligence I can afford. Found 3 recompete opportunities in my first week that I would have missed.&rdquo;
          </blockquote>
          <div className="text-slate-400">
            &mdash; Small Business Owner, 8(a) Certified IT Services
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Is it really free?</h3>
            <p className="text-slate-300">
              Yes. No credit card required, no trial period. You get daily alerts and access to forecasts forever. We have paid upgrades for AI briefings if you want them later.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">How is this different from SAM.gov alerts?</h3>
            <p className="text-slate-300">
              SAM.gov sends you everything. Mindy learns your business and sends you what actually matters &mdash; plus forecasts, agency pain points, and recompete opportunities SAM.gov doesn&apos;t track.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">What if I&apos;m new to federal contracting?</h3>
            <p className="text-slate-300">
              Perfect. Mindy explains opportunities in plain English. She&apos;s like having a mentor who never sleeps.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">What&apos;s in the paid upgrade?</h3>
            <p className="text-slate-300">
              Mindy Pro ($149/mo) adds AI-powered briefings with win probability scores, competitor tracking, weekly deep dives, and pursuit briefs. But the free tier is plenty to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Missing Opportunities.
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            The contractors winning federal work aren&apos;t smarter than you &mdash; they just have better intelligence. Now you do too.
          </p>

          <Link
            href={FREE_SIGNUP_URL}
            className="inline-block px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xl shadow-xl transition-all hover:scale-105 border border-purple-400"
          >
            Get Your First Briefing Free
          </Link>

          <p className="text-slate-400 text-sm mt-4">
            No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold">Mindy</span>
            <span className="text-slate-500">by GovCon Giants</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">
            <a href="tel:7864770477" className="text-slate-400 hover:text-white transition">786-477-0477</a>
            <span className="mx-4">&bull;</span>
            <a href="mailto:hello@govconedu.com" className="text-slate-400 hover:text-white transition">hello@govconedu.com</a>
            <span className="mx-4">&bull;</span>
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition">Privacy</Link>
            <span className="mx-4">&bull;</span>
            <Link href="/terms" className="text-slate-400 hover:text-white transition">Terms</Link>
          </p>
          <p className="text-slate-600 text-xs">
            &copy; 2026 GovCon Giants
          </p>
          <p className="text-slate-700 text-xs mt-2 italic">
            &quot;The big contractors have armies. You have Mindy.&quot;
          </p>
        </div>
      </footer>
    </main>
  );
}
