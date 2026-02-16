import { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Feb 28 Bootcamp: Specifics and Proposals | GovCon Giants',
  description: 'Get all the bid forms for the Feb 28 bootcamp. Saturday February 28th – Specifics and Proposals. Enter your email for instant access.',
};

const deliverables = [
  { icon: '📄', title: 'Bid Forms Pack', desc: 'All the forms you need for proposals and specifics' },
  { icon: '📋', title: 'Proposal Templates', desc: 'Ready-to-use templates for the bootcamp' },
  { icon: '🎯', title: 'Specifics Checklist', desc: 'Step-by-step specifics and compliance checklists' },
  { icon: '📅', title: 'Feb 28 Event Details', desc: 'Date, time, and access info for the live bootcamp' },
];

export default function Feb28BootcampLanding() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-block text-slate-400 hover:text-white text-sm mb-8 transition">
            ← Back to Home
          </Link>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-900/50 border border-red-700/50 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Saturday, February 28th – Live Bootcamp
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Get All the <span className="text-green-500">Bid Forms</span>
          </h1>
          <p className="text-xl text-slate-400 mb-2 font-medium">
            Feb 28 Bootcamp: Specifics and Proposals
          </p>

          {/* Subheadline */}
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Enter your email to get instant access to all the bid forms and event details for the February 28th bootcamp.
          </p>

          {/* Email Capture Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto mb-12">
            <h3 className="text-xl font-bold text-white mb-2">Unlock Your Bid Forms</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your info to access all bid forms and bootcamp details</p>
            <LeadForm
              buttonText="Get My Bid Forms"
              redirectUrl="/feb-28-bootcamp/upsell"
              source="feb28-bootcamp"
            />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What You&apos;ll Get</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-900/50 border border-green-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-2">Free access</p>
            <p className="text-2xl font-bold text-white mb-2">
              <span className="text-green-500">No credit card required</span>
            </p>
            <p className="text-slate-500 text-sm">Enter your email above to get your bid forms and bootcamp info</p>
          </div>
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
