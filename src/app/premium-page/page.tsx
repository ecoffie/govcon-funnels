import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Premium Resources | GovCon Giants',
  description: 'Find the right premium resource for your level - from beginner to advanced.',
};

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-block text-slate-400 hover:text-white text-sm mb-8 transition">
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-green-500">Path</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Select the premium resource that matches your current level in government contracting.
          </p>
        </div>
      </section>

      {/* Beginner Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          {/* Level Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-900/50 border border-green-700/50 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Beginner</h2>
              <p className="text-slate-400">Just starting your GovCon journey</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              You're new to federal contracting and need foundational knowledge. You may not have SAM.gov registration yet,
              or you're just learning about set-asides, NAICS codes, and how government procurement works. You need community
              support, ongoing training, and a clear roadmap to get started.
            </p>
          </div>

          {/* Beginner Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pro Member Group */}
            <Link
              href="/premium/pro-member-group"
              className="bg-slate-900 border-2 border-green-600 rounded-xl p-8 block hover:bg-slate-800 transition relative group"
            >
              <div className="absolute -top-3 left-4">
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-green-900/50 border border-green-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">👑</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Member Group</h3>
                  <p className="text-green-500 font-semibold mb-3">$99/month</p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                Ongoing support, community resources, and regular updates and training materials. Join thousands of contractors
                getting guidance and accountability.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Access to 4,000+ member community</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Weekly live training and Q&A sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Monthly bootcamps and workshops</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Ongoing support from experts</span>
                </div>
              </div>

              <span className="text-green-500 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Learn More <span>→</span>
              </span>
            </Link>

            {/* Pro Member Plan */}
            <Link
              href="/premium/pro-member-plan"
              className="bg-slate-900 border border-slate-800 rounded-xl p-8 block hover:border-green-600/50 transition group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Member Plan</h3>
                  <p className="text-green-500 font-semibold mb-3">$997 one-time</p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                Lifetime Training License, access to the 4,000+ member community, Step-by-Step Success Guide,
                First Partner Bootcamp, and Proposal Bootcamp.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Lifetime access to all training</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">4,000+ member community access</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Step-by-Step Success Guide</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">First Partner & Proposal Bootcamps</span>
                </div>
              </div>

              <span className="text-green-500 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Learn More <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Intermediate Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Level Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Intermediate</h2>
              <p className="text-slate-400">Ready to accelerate your progress</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              You understand the basics of government contracting and have your SAM.gov registration. You may have submitted
              proposals or won small contracts. Now you need specific strategies, proposal training, and personalized guidance
              to scale your business and win larger contracts consistently.
            </p>
          </div>

          {/* Intermediate Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bootcamp Replay */}
            <Link
              href="/jan-31-bootcamp-paid"
              className="bg-slate-900 border border-slate-800 rounded-xl p-8 block hover:border-blue-600/50 transition group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-blue-900/50 border border-blue-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">📹</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Jan 31 Bootcamp Replay</h3>
                  <p className="text-blue-400 font-semibold mb-3">$99 one-time</p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                Full replay of the intensive Jan 31 bootcamp plus all handouts and resources. Lifetime access to watch
                at your own pace and implement the strategies.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Complete bootcamp recording</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">All handouts and worksheets</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Lifetime access to content</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Watch and rewatch anytime</span>
                </div>
              </div>

              <span className="text-blue-400 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Get Access <span>→</span>
              </span>
            </Link>

            {/* Accelerator Program */}
            <Link
              href="/premium/accelerator"
              className="bg-slate-900 border border-slate-800 rounded-xl p-8 block hover:border-blue-600/50 transition group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-blue-900/50 border border-blue-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Accelerator Program</h3>
                  <p className="text-blue-400 font-semibold mb-3">$5,997 one-time</p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                90 days of intensive support with 12 weekly one-on-one coaching sessions. Get personalized guidance through
                the federal contracting process with step-by-step implementation support.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">12 weekly 1:1 coaching sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">90-day intensive program</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Full Lifetime Program access</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300">Goal: contract-ready by completion</span>
                </div>
              </div>

              <span className="text-blue-400 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Apply Now <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          {/* Level Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Advanced</h2>
              <p className="text-slate-400">Established business seeking premium support</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              You're an established business with government contracting experience. You've won contracts and understand the process,
              but you need dedicated support to scale operations, pursue larger opportunities, and maximize your federal revenue.
              You want a fractional business development team working exclusively for your company.
            </p>
          </div>

          {/* Advanced Option */}
          <div className="max-w-3xl mx-auto">
            <Link
              href="/premium/white-glove"
              className="bg-slate-900 border-2 border-purple-600 rounded-xl p-8 block hover:bg-slate-800 transition relative group"
            >
              <div className="absolute -top-3 left-4">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">PREMIUM SERVICE</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-purple-900/50 border border-purple-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🤝</span>
                </div>
                <div>
                  <p className="text-purple-400 text-sm font-medium mb-1">Premium Service</p>
                  <h3 className="text-3xl font-bold text-white mb-2">White Glove Service</h3>
                  <p className="text-slate-400 text-sm">Custom pricing - Contact us for details</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6 text-lg">
                Premium fractional business development services with dedicated consultant support tailored to your company.
                Get a team of experts working exclusively on your federal contracting goals.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 flex-shrink-0 mt-1 text-lg">✓</span>
                  <div>
                    <span className="text-white font-semibold block">Dedicated Consultant</span>
                    <span className="text-slate-400 text-sm">Fractional BD support exclusively for your team</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 flex-shrink-0 mt-1 text-lg">✓</span>
                  <div>
                    <span className="text-white font-semibold block">Tailored Strategy</span>
                    <span className="text-slate-400 text-sm">Custom strategy and execution designed for your company</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 flex-shrink-0 mt-1 text-lg">✓</span>
                  <div>
                    <span className="text-white font-semibold block">Monthly Retainer Options</span>
                    <span className="text-slate-400 text-sm">Flexible retainer packages to fit your needs</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 flex-shrink-0 mt-1 text-lg">✓</span>
                  <div>
                    <span className="text-white font-semibold block">Full-Service Support</span>
                    <span className="text-slate-400 text-sm">From opportunity identification to proposal submission and beyond</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 mb-6">
                <p className="text-purple-300 text-sm">
                  <strong>Perfect for:</strong> Companies generating $500K+ in revenue, pursuing contracts $250K+,
                  or seeking to scale their federal contracting operations significantly.
                </p>
              </div>

              <span className="text-purple-400 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all text-lg">
                Contact Us <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Which Level?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Schedule a call with our team to find the right premium resource for your goals.
          </p>
          <a
            href="mailto:hello@govconedu.com?subject=Premium%20Resource%20Inquiry"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
