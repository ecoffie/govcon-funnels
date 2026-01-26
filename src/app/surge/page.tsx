import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'SURGE Bootcamp - 10 Free GovCon Resources | GovCon Giants',
  description: 'Get everything you need to win federal contracts. Download 10 free resources including directories, templates, AI prompts, and more.',
};

const resources = [
  { icon: "🏢", title: "Prime/Subcontractor Directory", desc: "Find teaming partners and mentors" },
  { icon: "🪶", title: "Tribal 8(a) Directory", desc: "500+ Native American-owned firms" },
  { icon: "📈", title: "December Spending Forecast", desc: "Where agencies are spending now" },
  { icon: "🎯", title: "Low-Competition Contracts", desc: "Opportunities with few bidders" },
  { icon: "📅", title: "2026 Expiring Contracts", desc: "Recompete opportunities" },
  { icon: "📋", title: "12-Month Action Plan", desc: "Your step-by-step calendar" },
  { icon: "🤖", title: "75 AI Prompts Library", desc: "ChatGPT prompts for GovCon" },
  { icon: "📊", title: "Bootcamp Presentation Slides", desc: "All training materials" },
  { icon: "🎥", title: "Full Bootcamp Recording", desc: "Watch at your own pace" },
  { icon: "📞", title: "SBLO Contact Directory", desc: "100+ agency contacts" },
];

export default function SurgePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm mb-6">
                ⚡ SURGE BOOTCAMP
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-green-500">10 Free Resources</span> to Win Federal Contracts
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Get everything you need to start winning government contracts. Directories, templates, AI prompts, and more.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Download
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No Credit Card
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Free
                </span>
              </div>
            </div>
            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-6 text-center">Download Free Resources</h3>
              <LeadForm
                buttonText="Download Free Resources"
                redirectUrl="/surge/thank-you"
                source="surge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What&apos;s Included</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to start winning federal contracts
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="card hover:translate-y-[-4px] transition-transform flex items-start gap-4">
                <div className="text-3xl">{resource.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                  <p className="text-slate-400 text-sm">{resource.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="section bg-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Total Value: <span className="text-green-500">$2,500+</span></h2>
          <div className="card mb-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span>Prime/Subcontractor Directory</span>
                <span className="text-slate-400">$297 value</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span>Tribal 8(a) Directory</span>
                <span className="text-slate-400">$197 value</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span>75 AI Prompts Library</span>
                <span className="text-slate-400">$97 value</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span>Full Bootcamp Recording</span>
                <span className="text-slate-400">$997 value</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span>+ 6 More Resources</span>
                <span className="text-slate-400">$900+ value</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Your Price Today</span>
                <span className="text-green-500 font-bold text-2xl">FREE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get Instant Access</h2>
          <p className="text-slate-300 mb-8">
            Download all 10 resources right now. No strings attached.
          </p>
          <LeadForm
            buttonText="Download Free Resources"
            redirectUrl="/surge/thank-you"
            source="surge"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
