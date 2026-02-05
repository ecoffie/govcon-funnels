import { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Free GovCon Handouts & Templates | GovCon Giants',
  description: 'Get free access to our complete collection of templates, contact lists, AI prompts, and downloadable resources for government contracting.',
};

const handouts = [
  { icon: "📄", title: "GovCon Guides & Templates", desc: "SAM Registration Guide, SBLO Email Templates, Proposal Checklists" },
  { icon: "📋", title: "SBLO Contact Directory", desc: "100+ Small Business Liaison Officers with direct contact info" },
  { icon: "🎯", title: "Tier-2 Supplier List", desc: "50+ Prime Contractor vendor portals and supplier contacts" },
  { icon: "🤖", title: "75 GovCon AI Prompts", desc: "Ready-to-use prompts for proposals, research, and outreach" },
  { icon: "📊", title: "Hit Lists & Forecasts", desc: "Low-competition contracts and spending forecasts" },
  { icon: "📅", title: "2026 Action Plan", desc: "Your step-by-step roadmap to winning contracts" },
];

export default function HandoutsLanding() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
          <Link href="/resources" className="text-slate-400 hover:text-white text-sm transition">
            ← Back to Resources
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>📥</span> FREE DOWNLOAD - No Credit Card Required
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Get Your Free <span className="text-green-500">GovCon Handouts</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Enter your email to instantly access our complete library of templates, contact lists, AI prompts, and downloadable resources.
          </p>

          {/* Email Capture Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto mb-12">
            <h3 className="text-xl font-bold text-white mb-2">Unlock Free Downloads</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your info to access all handouts instantly</p>
            <LeadForm
              buttonText="Get Free Handouts"
              redirectUrl="/resources/handouts/upsell"
              source="free-handouts"
            />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What You&apos;ll Get</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {handouts.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-900/50 border border-blue-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Value Stack */}
          <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-2">Total Value</p>
            <p className="text-4xl font-bold text-white mb-2">
              <span className="line-through text-slate-500 text-2xl mr-2">$1,500+</span>
              <span className="text-green-500">FREE</span>
            </p>
            <p className="text-slate-500 text-sm">Just enter your email above to get instant access</p>
          </div>
        </div>
      </section>

      {/* Already have videos note */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-500">
            Looking for free training videos? <Link href="/resources" className="text-green-500 hover:text-green-400">Browse our video library →</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
