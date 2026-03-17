import Link from 'next/link';
import StatsCounter from '@/components/StatsCounter';
import { sharedHomepageContent } from '@/lib/shared-content';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'GovCon Giants - Win Federal Contracts | $82 Billion Unspent',
  description: 'The government is required to spend billions with small businesses every year. Learn how to position your business to win federal contracts.',
  path: '/',
  keywords: [
    'government contracting',
    'federal contracts',
    'small business government contracts',
    'govcon',
    'win federal contracts',
    'SAM.gov',
    'government contracting for beginners',
  ],
});

const stats = [
  { value: "$750B+", label: "Annual Federal Spending", numericValue: 750, prefix: "$", suffix: "B+" },
  { value: "23%", label: "Set Aside for Small Biz", numericValue: 23, suffix: "%" },
  { value: "5,000+", label: "Members Trained", numericValue: 5000, suffix: "+" },
  { value: "$2B+", label: "Contracts Won", numericValue: 2, prefix: "$", suffix: "B+" },
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
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-12 md:pb-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span className="text-green-500">$82 BILLION</span><br />
            <span className="text-red-500">UNSPENT</span><br />
            <span className="text-white">FEDERAL MONEY</span>
          </h1>

          <p className="text-2xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Here&apos;s how to get it
          </p>

          <p className="text-lg text-slate-500 mb-8 max-w-3xl mx-auto">
            The government is required to spend billions with small businesses every year.
            We&apos;ll show you exactly how to position your business to win federal contracts.
          </p>

          {/* CTA Button - scrolls to Beginners Start Here */}
          <div className="flex justify-center mb-8">
            <Link href="#beginners-start-here" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all green-glow">
              Get Started Free
            </Link>
          </div>

          {/* Stats Bar */}
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Beginners Start Here */}
      <section id="resources" className="py-20 px-6 bg-slate-900/50">
        <div id="beginners-start-here" className="scroll-mt-40" />
        <div className="max-w-6xl mx-auto">
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
            <a
              href="https://govcongiants.org/resources/handouts"
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group block"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 1: Download the free action plan</h3>
                <p className="text-slate-500">Get your free action plan and the exact first moves to start winning federal contracts.</p>
                <span className="inline-block mt-2 text-green-500 font-semibold">Download Now →</span>
              </div>
            </a>
            <div className="flex justify-center py-1">
              <span className="text-slate-600">↓</span>
            </div>
            {/* Step 2 */}
            <Link href="/free-course" className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 2: Take our free beginner&apos;s course</h3>
                <p className="text-slate-500">Build your foundation from SAM.gov registration to landing your first contract.</p>
                <span className="inline-block mt-2 text-green-500 font-semibold">Start Learning →</span>
              </div>
            </Link>
            <div className="flex justify-center py-1">
              <span className="text-slate-600">↓</span>
            </div>
            {/* Step 3 */}
            <Link href="/opp" className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 3: Research using our free Opportunity Hunter tool</h3>
                <p className="text-slate-500">Find agencies and contracts by NAICS code and keywords with free searches.</p>
                <span className="inline-block mt-2 text-green-500 font-semibold">Try It Free →</span>
              </div>
            </Link>
            <div className="flex justify-center py-1">
              <span className="text-slate-600">↓</span>
            </div>
            {/* Step 4 */}
            <a
              href="https://calendly.com/govconedumeet/gcg-beginnerscall"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-600/50 transition group block"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">4</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">Step 4: Schedule a call</h3>
                <p className="text-slate-500">Talk with our team and get clear next steps for your business.</p>
                <span className="inline-block mt-2 text-green-500 font-semibold">Book Now →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Guides - SEO Internal Links */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Popular <span className="text-green-500">Guides</span>
            </h2>
            <p className="text-slate-500">Essential reading for government contractors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/guides/cage-code" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">CAGE Code Guide</h3>
              <p className="text-slate-500 text-sm">Get your 5-character ID for federal contracting</p>
            </Link>
            <Link href="/guides/sam-gov-registration" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">SAM.gov Registration</h3>
              <p className="text-slate-500 text-sm">Step-by-step registration walkthrough</p>
            </Link>
            <Link href="/guides/8a-certification" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">8(a) Certification</h3>
              <p className="text-slate-500 text-sm">Sole-source contracts up to $4.5M</p>
            </Link>
            <Link href="/guides/gsa-schedule" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">GSA Schedule</h3>
              <p className="text-slate-500 text-sm">Pre-approved vendor access to agencies</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Link href="/guides/sba-certifications" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">SBA Certifications</h3>
              <p className="text-slate-500 text-sm">HUBZone, WOSB, SDVOSB explained</p>
            </Link>
            <Link href="/glossary" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">GovCon Glossary</h3>
              <p className="text-slate-500 text-sm">45+ terms every contractor should know</p>
            </Link>
            <Link href="/government-contract-help" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">Get Expert Help</h3>
              <p className="text-slate-500 text-sm">Professional contract consulting services</p>
            </Link>
            <Link href="/proposal-writing-services" className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group">
              <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">Proposal Writing</h3>
              <p className="text-slate-500 text-sm">Professional proposal development</p>
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link href="/guides" className="text-green-500 hover:text-green-400 font-semibold">
              View All 16 Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Free Resources to Get Started - 3 cards */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Free <span className="text-green-500">Resources</span> to Get Started
            </h2>
            <p className="text-slate-500 text-lg">Everything you need to start winning federal contracts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sharedHomepageContent.freeResources.map((resource, index) => (
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
                <span className="text-green-500 font-semibold">{resource.cta.replace('->', '→')}</span>
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

          {sharedHomepageContent.premiumLevels.map((level, levelIndex) => (
            <div key={level.title} className={levelIndex < sharedHomepageContent.premiumLevels.length - 1 ? 'mb-12' : ''}>
              <h3 className="text-xl font-bold text-white mb-4">{level.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {level.cards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={`bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition ${level.cards.length === 1 ? 'md:max-w-md' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    {card.badge ? (
                      <p className="text-green-500 text-sm font-medium mb-1">{card.badge}</p>
                    ) : null}
                    <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                    <p className="text-slate-500 text-sm mb-2">{card.description}</p>
                    <span className="text-green-500 font-semibold text-sm">{card.cta.replace('->', '→')}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
      <footer className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-2xl font-bold text-white">GovCon</span>
                <span className="text-2xl font-bold text-green-500">Giants</span>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                Helping small businesses win federal government contracts.
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:7864770477" className="text-slate-400 hover:text-white transition block">786-477-0477</a>
                <a href="mailto:hello@govconedu.com" className="text-slate-400 hover:text-white transition block">hello@govconedu.com</a>
              </div>
            </div>

            {/* Learn (Guides) */}
            <div>
              <h3 className="text-white font-bold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/guides/government-contracting-for-beginners" className="text-slate-500 hover:text-white transition">GovCon for Beginners</Link></li>
                <li><Link href="/guides/sam-gov-registration" className="text-slate-500 hover:text-white transition">SAM.gov Registration</Link></li>
                <li><Link href="/guides/cage-code" className="text-slate-500 hover:text-white transition">CAGE Code Guide</Link></li>
                <li><Link href="/guides/sba-certifications" className="text-slate-500 hover:text-white transition">SBA Certifications</Link></li>
                <li><Link href="/guides/gsa-schedule" className="text-slate-500 hover:text-white transition">GSA Schedule</Link></li>
                <li><Link href="/guides/proposal-writing" className="text-slate-500 hover:text-white transition">Proposal Writing</Link></li>
                <li><Link href="/glossary" className="text-slate-500 hover:text-white transition">GovCon Glossary</Link></li>
                <li><Link href="/guides" className="text-green-500 hover:text-green-400 transition font-medium">All Guides →</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-bold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/free-course" className="text-slate-500 hover:text-white transition">Free Course</Link></li>
                <li><Link href="/resources" className="text-slate-500 hover:text-white transition">Resources</Link></li>
                <li><Link href="/tools" className="text-slate-500 hover:text-white transition">Tools</Link></li>
                <li><Link href="/premium-page" className="text-slate-500 hover:text-white transition">Premium</Link></li>
                <li><Link href="/consulting" className="text-slate-500 hover:text-white transition">Consulting</Link></li>
                <li><Link href="/upskilling" className="text-slate-500 hover:text-white transition">BD Training</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/training" className="text-slate-500 hover:text-white transition">Training</Link></li>
                <li><Link href="https://govcongiants.com" className="text-slate-500 hover:text-white transition">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-slate-500 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-500 hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-600 text-sm">
              © 2026 GovCon Giants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
