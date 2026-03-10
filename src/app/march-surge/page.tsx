import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'March 28 Recompete Surge - Free Registration | GovCon Giants',
  description: '$221 Billion in federal contracts are expiring. Learn how to find, position for, and win recompete contracts and IDIQ task orders. Register FREE and get 6 downloadable resources.',
};

const resources = [
  'Expiring Contracts List',
  'Positioning Checklist',
  'IDIQ Vehicles Guide',
  'Active IDIQ List',
  'Sources Sought Template',
  'Task Order Template',
];

const stats = [
  { value: '$221B', label: 'Expiring 2026-2027' },
  { value: '6,000+', label: 'Contracts Tracked' },
  { value: '$77T', label: 'In Expiring IDIQs' },
  { value: '20%', label: 'Go to New Contractors' },
];

const downloads = [
  { num: 1, title: 'March 2026 Expiring Contracts List', desc: '100+ contracts expiring Q2-Q3 with agency, NAICS, incumbent, and value' },
  { num: 2, title: 'Recompete Positioning Checklist', desc: '12-18 month timeline from research through proposal submission' },
  { num: 3, title: '10 IDIQ Vehicles Guide', desc: 'The most active IDIQ/GWAC vehicles with eligibility and how to get on' },
  { num: 4, title: 'Active IDIQ Vehicles List', desc: 'Excel with ceiling values, ordering agencies, and NAICS codes' },
  { num: 5, title: 'Sources Sought Response Template', desc: 'Fill-in-the-blank template to respond and get on agency radar' },
  { num: 6, title: 'Task Order Response Template', desc: 'Framework for responding to IDIQ task order solicitations' },
];

const learnings = [
  { title: 'Find Expiring Contracts in Your NAICS', desc: 'Use the Recompete Tracker to identify contracts expiring in your industry' },
  { title: 'Research the Incumbent', desc: 'Learn who holds the contract and whether to compete or team' },
  { title: 'Understand IDIQ Vehicles', desc: 'OASIS+, GSA MAS, CIO-SP4, Alliant 2 - which ones matter for you' },
  { title: 'Position 12-18 Months Early', desc: 'Contact SBLOs and respond to Sources Sought before the RFP' },
  { title: 'Team With the Incumbent', desc: 'How to approach primes about subcontracting on their recompete bid' },
  { title: 'Use AI to Accelerate Research', desc: 'Live demo of AI tools for contract research and outreach' },
];

export default function MarchSurgeLanding() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-900/50 border border-amber-700/50 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>FREE EVENT</span> March 28, 2026 | 9am-5pm ET
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="text-green-500">$221 Billion</span> in Federal Contracts Are Expiring
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-500 mb-8 leading-relaxed">
            Learn how to find, position for, and win recompete contracts and IDIQ task orders.
            Register FREE and get 6 downloadable resources instantly.
          </p>

          {/* What's Included Preview */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {resources.map((r, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-400 text-sm">
                {i + 1}. {r}
              </div>
            ))}
          </div>

          {/* Email Capture Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Register Free + Get Resources</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your info for instant access to 6 free downloads</p>
            <LeadForm
              buttonText="Register Free for March 28"
              redirectUrl="/march-surge/upsell"
              source="march-surge"
            />
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">The Biggest Untapped Opportunity</h2>
          <p className="text-slate-400 text-center mb-12">Every federal contract expires. The work doesn&apos;t go away - it gets rebid.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{s.value}</div>
                <p className="text-slate-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Free Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">6 Free Resources Included</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map((d) => (
              <div key={d.num} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-900/50 border border-green-700/50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-400 font-bold">
                    {d.num}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{d.title}</h3>
                    <p className="text-slate-500 text-sm">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What You&apos;ll Learn March 28</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((l, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-green-500 text-xl mt-1">&gt;</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{l.title}</h3>
                  <p className="text-slate-500 text-sm">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Recompete Opportunities?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Register free for March 28 and download all 6 resources instantly.
          </p>
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <LeadForm
                buttonText="Register Free Now"
                redirectUrl="/march-surge/upsell"
                source="march-surge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-xl font-bold text-white">GovCon</span>
            <span className="text-xl font-bold text-green-500">Giants</span>
          </div>
          <p className="text-slate-600 text-sm">&copy; 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
