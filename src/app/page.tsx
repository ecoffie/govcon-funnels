import Link from 'next/link';
import { Metadata } from 'next';
import StatsCounter from '@/components/StatsCounter';

export const metadata: Metadata = {
  title: 'GovCon Giants - Win Federal Contracts | $82 Billion Unspent',
  description: 'The government is required to spend billions with small businesses every year. Learn how to position your business to win federal contracts.',
};

const stats = [
  { value: "$750B+", label: "Annual Federal Spending", numericValue: 750, prefix: "$", suffix: "B+" },
  { value: "23%", label: "Set Aside for Small Biz", numericValue: 23, suffix: "%" },
  { value: "5,000+", label: "Members Trained", numericValue: 5000, suffix: "+" },
  { value: "$2B+", label: "Contracts Won", numericValue: 2, prefix: "$", suffix: "B+" },
];

const freeResources = [
  {
    icon: "🎓",
    title: "January Bootcamp",
    desc: "Monthly training sessions with live Q&A to help start your GovCon journey.",
    link: "/bootcamp",
    cta: "Register Now →",
  },
  {
    icon: "🔥",
    title: "Surge Bootcamp",
    desc: "Q4 federal spending focus - learn how to capture end-of-year opportunities.",
    link: "/surge",
    cta: "Access Now →",
  },
  {
    icon: "📅",
    title: "Bid Bootcamp Downloads",
    desc: "Get bid forms and event details for the Feb 28 Specifics and Proposals bootcamp.",
    link: "https://funnels.govcongiants.org/proposal-bootcamp",
    cta: "Register Now →",
  },
];

const videoCategories = [
  {
    title: "Where Do I Start?",
    desc: "Getting started in government contracting",
    videos: 5,
    color: "green",
    link: "/resources/library",
  },
  {
    title: "Finding Contract Opportunities",
    desc: "How to find the right contracts for your business",
    videos: 4,
    color: "blue",
    link: "/resources/library",
  },
  {
    title: "Winning Without Past Performance",
    desc: "How to win when you're just starting out",
    videos: 5,
    color: "amber",
    link: "/resources/library",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-800 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE NOW
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-green-500">$82 BILLION</span><br />
            <span className="text-red-500">UNSPENT</span><br />
            <span className="text-white">FEDERAL MONEY</span>
          </h1>

          <p className="text-2xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Here&apos;s how to get it
          </p>

          <p className="text-lg text-slate-500 mb-10 max-w-3xl mx-auto">
            The government is required to spend billions with small businesses every year.
            We&apos;ll show you exactly how to position your business to win federal contracts.
          </p>

          {/* CTA Button - goes to Free Resources Library */}
          <div className="flex justify-center mb-12">
            <Link href="/resources" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all green-glow">
              Get Started Free
            </Link>
          </div>

          {/* Stats Bar */}
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Free Resources to Get Started - 3 cards */}
      <section id="resources" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Free <span className="text-green-500">Resources</span> to Get Started
            </h2>
            <p className="text-slate-500 text-lg">Everything you need to start winning federal contracts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-slate-700 transition"
                {...(resource.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">{resource.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-slate-500 mb-4">{resource.desc}</p>
                <span className="text-green-500 font-semibold">{resource.cta}</span>
              </Link>
            ))}
          </div>

          {/* Beginners Start Here - Pathway */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Beginners <span className="text-green-500">Start Here</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                The first things you need to do as a beginner
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-0">
              {/* Step 1 */}
              <Link href="/free-course" className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 1: Take the Beginner&apos;s Course</h3>
                  <p className="text-slate-500">Build your foundation from SAM.gov registration to landing your first contract.</p>
                  <span className="inline-block mt-2 text-green-500 font-semibold">Start Learning →</span>
                </div>
              </Link>
              <div className="flex justify-center py-1">
                <span className="text-slate-600">↓</span>
              </div>
              {/* Step 2 */}
              <Link href="/opp" className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 2: Use the Opportunity Hunter</h3>
                  <p className="text-slate-500">Find agencies and contracts by NAICS code and keywords. Free searches.</p>
                  <span className="inline-block mt-2 text-green-500 font-semibold">Try It Free →</span>
                </div>
              </Link>
              <div className="flex justify-center py-1">
                <span className="text-slate-600">↓</span>
              </div>
              {/* Step 3 */}
              <a href="https://govcongiants.com" className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group block">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 3: Schedule a call</h3>
                  <p className="text-slate-500">Talk with our team and see where you&apos;re at from there.</p>
                  <span className="inline-block mt-2 text-green-500 font-semibold">Book Now →</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-red-950 border border-red-900 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              URGENT OPPORTUNITY
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-red-500">$82 Billion</span> Must Be Spent
            </h2>

            <p className="text-xl text-slate-400 mb-8">
              Federal agencies are <span className="text-red-500 font-semibold">required by law</span> to meet small business spending goals.
              Right now, they&apos;re <span className="text-green-500 font-semibold">$82 billion behind</span>.
              This is YOUR opportunity.
            </p>

            <Link href="/bootcamp" className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all">
              Learn How to Get Your Share
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="training" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Free <span className="text-green-500">Training</span> Videos
            </h2>
            <p className="text-slate-500 text-lg">Learn from experts who&apos;ve won millions in federal contracts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCategories.map((cat, index) => (
              <Link
                key={index}
                href={cat.link}
                className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden block hover:border-${cat.color}-600/50 transition group`}
              >
                <div className={`aspect-video bg-gradient-to-br from-${cat.color}-900/40 to-slate-900 flex items-center justify-center relative`}>
                  <div className="text-center">
                    <svg className={`w-16 h-16 text-${cat.color}-500 mx-auto mb-2 group-hover:scale-110 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {cat.color === 'green' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>}
                      {cat.color === 'blue' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>}
                      {cat.color === 'amber' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>}
                    </svg>
                    <span className={`text-${cat.color}-500/60 text-sm font-medium`}>{cat.videos} Videos</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-1">{cat.title}</h3>
                  <p className="text-slate-500 text-sm">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/resources" className="text-green-500 hover:text-green-400 font-semibold transition">
              View All 17 Free Videos →
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Resources Section */}
      <section id="premium" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Link href="/premium-page" className="block group">
              <h2 className="text-4xl font-bold text-white mb-4 group-hover:text-green-400 transition">
                <span className="text-green-500">Premium</span> Resources
              </h2>
            </Link>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Take it to the next level with paid replays and ongoing support.
            </p>
            <Link href="/premium-page" className="inline-block mt-4 text-green-500 hover:text-green-400 font-semibold">
              See what level is right for you →
            </Link>
          </div>

          {/* Beginner */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Beginner</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/premium/pro-member-group" className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">👑</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Pro Member Group</h4>
                <p className="text-slate-500 text-sm mb-2">$99/month. Ongoing support, community, updates and training.</p>
                <span className="text-green-500 font-semibold text-sm">Learn More →</span>
              </Link>
              <Link href="/premium/pro-member-plan" className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Pro Member Plan</h4>
                <p className="text-slate-500 text-sm mb-2">$997 one-time. Lifetime Training License, 4,000+ community, Success Guide, bootcamps.</p>
                <span className="text-green-500 font-semibold text-sm">Learn More →</span>
              </Link>
            </div>
          </div>

          {/* Intermediate */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Intermediate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/jan-31-bootcamp-paid" className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">📹</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Jan 31 Bootcamp Replay</h4>
                <p className="text-slate-500 text-sm mb-2">One-time $99. Full replay plus handouts, lifetime access.</p>
                <span className="text-green-500 font-semibold text-sm">Get Access →</span>
              </Link>
              <Link href="/premium/accelerator" className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Accelerator Program</h4>
                <p className="text-slate-500 text-sm mb-2">$5,997 one-time. 90 days, 12 weekly 1:1 coaching sessions, access to Lifetime Program.</p>
                <span className="text-green-500 font-semibold text-sm">Learn More →</span>
              </Link>
            </div>
          </div>

          {/* Advanced */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Advanced</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/premium/white-glove" className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition md:max-w-md">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <p className="text-green-500 text-sm font-medium mb-1">Premium Service</p>
                <h4 className="text-lg font-bold text-white mb-2">White Glove Service</h4>
                <p className="text-slate-500 text-sm mb-2">Premium fractional business development and dedicated consultant support.</p>
                <span className="text-green-500 font-semibold text-sm">Learn More →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Win <span className="text-green-500">Federal Contracts</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of small businesses who&apos;ve used our resources to win their share of federal spending.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources" className="px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xl transition-all green-glow">
              Get Started Free
            </Link>
            <Link href="https://shop.govcongiants.org" className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold text-xl transition-all">
              Join Pro - $99/mo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-white">GovCon</span>
              <span className="text-2xl font-bold text-green-500">Giants</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <span className="text-green-500">📞</span>
                <span className="text-slate-400">Call or Text:</span>
                <a href="tel:7864770477" className="text-white font-semibold hover:text-green-500 transition">786-477-0477</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✉️</span>
                <span className="text-slate-400">Email:</span>
                <a href="mailto:hello@govconedu.com" className="text-white font-semibold hover:text-green-500 transition">hello@govconedu.com</a>
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-500">
              <Link href="/resources" className="hover:text-white transition">Resources</Link>
              <Link href="/training" className="hover:text-white transition">Training</Link>
              <Link href="/premium-page" className="hover:text-white transition">Premium</Link>
              <Link href="https://govcongiants.com" className="hover:text-white transition">Contact</Link>
            </div>

            <p className="text-slate-600 text-sm">
              © 2026 GovCon Giants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
