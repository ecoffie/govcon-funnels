import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GovCon Giants - Win Federal Contracts | $82 Billion Unspent',
  description: 'The government is required to spend billions with small businesses every year. Learn how to position your business to win federal contracts.',
};

const stats = [
  { value: "$750B+", label: "Annual Federal Spending" },
  { value: "23%", label: "Set Aside for Small Biz" },
  { value: "5,000+", label: "Members Trained" },
  { value: "$2B+", label: "Contracts Won" },
];

const resources = [
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
    icon: "📚",
    title: "Free GovCon Course",
    desc: "Beginner curriculum from SAM.gov registration to landing your first contract.",
    link: "/free-course",
    cta: "Start Learning →",
  },
  {
    icon: "🎯",
    title: "Opportunity Hunter",
    desc: "Agency search tool to find contracts by NAICS code and keywords.",
    link: "https://tools.govcongiants.org/opportunity-hunter",
    cta: "Try It Free →",
  },
  {
    icon: "📂",
    title: "Free Resources Library",
    desc: "35+ free downloads: templates, contact lists, videos, and AI prompts.",
    link: "/resources",
    cta: "Browse Library →",
  },
  {
    icon: "👑",
    title: "Pro Member Group",
    desc: "Bootcamps, tools, calls, and expert support - $99/mo.",
    link: "https://shop.govcongiants.org",
    cta: "Join Pro →",
    featured: true,
  },
];

const videoCategories = [
  {
    title: "Where Do I Start?",
    desc: "Getting started in government contracting",
    videos: 5,
    color: "green",
    link: "/resources#getting-started",
  },
  {
    title: "Finding Contract Opportunities",
    desc: "How to find the right contracts for your business",
    videos: 4,
    color: "blue",
    link: "/resources#finding-opportunities",
  },
  {
    title: "Winning Without Past Performance",
    desc: "How to win when you're just starting out",
    videos: 5,
    color: "amber",
    link: "/resources#winning-contracts",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="py-4 px-6 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#resources" className="text-slate-400 hover:text-white transition">Resources</a>
            <a href="#training" className="text-slate-400 hover:text-white transition">Training</a>
            <Link href="https://shop.govcongiants.org" className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition">
              Join Pro
            </Link>
          </nav>
        </div>
      </header>

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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/free-course" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all green-glow">
              Get Started Free
            </Link>
            <Link href="/bootcamp" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold text-lg transition-all">
              Watch Free Training
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-black text-green-500 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Free <span className="text-green-500">Resources</span> to Get Started
            </h2>
            <p className="text-slate-500 text-lg">Everything you need to start winning federal contracts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className={`bg-slate-900 border rounded-xl p-6 block hover:border-slate-700 transition relative ${
                  resource.featured ? 'border-2 border-green-600 hover:bg-slate-800' : 'border-slate-800'
                }`}
              >
                {resource.featured && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  resource.featured ? 'bg-green-900/50 border border-green-800' : 'bg-slate-800'
                }`}>
                  <span className="text-2xl">{resource.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-slate-500 mb-4">{resource.desc}</p>
                <span className="text-green-500 font-semibold">{resource.cta}</span>
              </Link>
            ))}
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
            <Link href="/free-course" className="px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xl transition-all green-glow">
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
              <a href="#resources" className="hover:text-white transition">Resources</a>
              <a href="#training" className="hover:text-white transition">Training</a>
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
