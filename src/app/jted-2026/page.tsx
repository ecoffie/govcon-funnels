import LeadForm from '@/components/LeadForm';
import { generateSeo } from '@/lib/seo';
import Image from 'next/image';

export const metadata = generateSeo({
  title: 'JTED 2026 AEC Industry Day Resources | Free Intel Pack',
  description: 'Download your free A/E/C Federal Contracting Intel Pack from the JTED 2026 MacDill AFB Industry Day. Real contract data, teaming plays, and AI prompts.',
  path: '/jted-2026',
  keywords: ['JTED 2026', 'MacDill AFB', 'AEC industry day', 'federal construction contracts', 'NAVFAC', 'USACE'],
});

const downloads = [
  {
    icon: "📊",
    title: "A/E/C Federal Intel Pack",
    desc: "10 expiring contracts worth $10B+, 5 teaming plays, AI prompts, and actionable templates",
    file: "/downloads/JTED-2026-Intel-Pack.pdf"
  },
  {
    icon: "📑",
    title: "Presentation Slides",
    desc: "All 98 slides from the JTED 2026 presentation for your reference",
    file: "/downloads/JTED-2026-Slides.pdf"
  },
];

const highlights = [
  { number: "10", label: "Expiring Contracts", desc: "Real opportunities from USASpending totaling $10B+" },
  { number: "5", label: "Teaming Plays", desc: "Scripts to approach primes at industry day" },
  { number: "4", label: "AI Prompts", desc: "Copy-paste prompts for RFPs, competitors, capability statements" },
  { number: "$18.7B", label: "Market Size", desc: "Federal A/E/C contract volume you can tap into" },
];

export default function JTED2026Landing() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section id="top" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700/50 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>🏗️</span> JTED 2026 AEC Industry Day | MacDill AFB | April 1, 2026
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Free <span className="text-green-500">A/E/C Federal Intel Pack</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Get real contract data, teaming scripts, and AI prompts to win federal construction contracts.
            Everything from today&apos;s presentation — plus actionable intel you can use immediately.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {highlights.map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className="text-2xl md:text-3xl font-bold text-green-500">{item.number}</div>
                <div className="text-white font-medium text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Email Capture Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Download Free Resources</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your email to get instant access to both downloads</p>
            <LeadForm
              buttonText="Get Free Intel Pack"
              redirectUrl="/jted-2026/thank-you"
              source="jted-2026-landing"
              hidePhone={true}
            />
          </div>
        </div>
      </section>

      {/* What's In The Intel Pack */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What&apos;s In The Intel Pack</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            This isn&apos;t a copy of the slides — it&apos;s <span className="text-green-500 font-medium">actionable intelligence</span> you
            can use TODAY to find and win federal construction contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">10 Expiring A/E/C Contracts</h3>
              <p className="text-slate-500 text-sm">
                Real contracts from USASpending worth $10B+ combined. Includes incumbent name, contract value,
                agency, and <span className="text-green-500">why they&apos;re vulnerable</span> to competition.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-900/50 border border-green-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5 Teaming Plays</h3>
              <p className="text-slate-500 text-sm">
                Specific primes to approach (PCL, Balfour Beatty, Skanska, etc.) with word-for-word
                <span className="text-green-500"> opening scripts</span> for industry day conversations.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-900/50 border border-blue-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">SAM.gov Alert Setup</h3>
              <p className="text-slate-500 text-sm">
                Step-by-step guide to setting up saved searches for NAICS 236220, 237310, 541330.
                Plus <span className="text-green-500">5 alert templates</span> you can copy.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-yellow-900/50 border border-yellow-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sources Sought Template</h3>
              <p className="text-slate-500 text-sm">
                Copy-paste template for responding to Sources Sought notices. Fill in the blanks and
                <span className="text-green-500"> submit in under 30 minutes</span>.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-900/50 border border-red-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Top 5 SAT Agencies</h3>
              <p className="text-slate-500 text-sm">
                Best agencies for contracts under $350K. USACE districts, NAVFAC regions, VA VISN — with
                <span className="text-green-500"> SAM.gov search prefixes</span>.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-900/50 border border-cyan-700/50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4 AI Prompts</h3>
              <p className="text-slate-500 text-sm">
                Ready-to-use prompts for analyzing RFPs, drafting capability statements, researching
                competitors, and <span className="text-green-500">preparing for industry days</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Preview */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Your Free Downloads</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Intel Pack Preview Image */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/images/jted-intel-pack-preview.png"
                  alt="A/E/C Federal Intel Pack Preview"
                  width={400}
                  height={518}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Download Cards */}
            <div className="space-y-6">
              {downloads.map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm mb-3">{item.desc}</p>
                      <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-700/50 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                        <span>✓</span> Free Download
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">Ready to get started?</p>
            <a href="#top"
               className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition">
              Get Free Intel Pack
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* About GovCon Giants */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">About GovCon Giants</h2>
          <p className="text-slate-400 mb-6">
            We help small businesses win federal contracts through training, tools, and intelligence.
            Our YouTube channel has 500+ free videos, and our Market Assassin platform helps contractors
            find opportunities faster.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="https://youtube.com/@govcongiants" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-white transition">
              YouTube
            </a>
            <a href="https://tools.govcongiants.org" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-white transition">
              Market Assassin
            </a>
            <a href="https://govcongiants.org/free-course" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-white transition">
              Free Course
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">
            &copy; 2026 GovCon Giants. All rights reserved. |
            Data sourced from USASpending.gov and SAM.gov
          </p>
        </div>
      </footer>
    </main>
  );
}
