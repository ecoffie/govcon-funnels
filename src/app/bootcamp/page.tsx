import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Free GovCon Bootcamp - Win Federal Contracts in Q1 2026 | GovCon Giants',
  description: 'Full-Day Intensive: Win Federal Contracts in Q1 2026. Get personalized agency lists, 5+ opportunities, and your 90-day plan.',
};

const stats = [
  { value: "$82.8B+", label: "Unobligated Balances", desc: "Must be spent by agencies" },
  { value: "$848B", label: "FY2026 NDAA Signed", desc: "Defense spending approved" },
  { value: "$8M-$10M", label: "New Sole Source Thresholds", desc: "Easier direct awards" },
  { value: "23%", label: "Small Business Goals", desc: "Mandated set-asides" },
];

const deliverables = [
  { icon: "🎯", title: "Personalized Agency List", desc: "Top 5 agencies that buy what you sell" },
  { icon: "📋", title: "5+ Matching Opportunities", desc: "Real contracts you can bid on now" },
  { icon: "📅", title: "90-Day Action Plan", desc: "Step-by-step roadmap to your first win" },
  { icon: "📹", title: "Full Recording", desc: "Replay the bootcamp anytime" },
  { icon: "📊", title: "Market Research Data", desc: "Spending trends in your industry" },
  { icon: "🤝", title: "Contact Lists", desc: "SBLO and contracting officer contacts" },
];

const handouts = [
  "Agency Pain Points & Priorities List",
  "Hit List: Low-Competition Contracts",
  "2026 NDAA Summary Report",
  "Tribal 8(a) Directory (500+ firms)",
  "SBLO Contact Directory (100+ contacts)",
  "12-Month GovCon Calendar",
];

export default function BootcampPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                LIVE EVENT - JAN 31, 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Full-Day Intensive: <span className="text-green-500">Win Federal Contracts</span> in Q1 2026
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Walk away with a personalized agency list, 5+ matching opportunities, and your complete 90-day action plan.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Jan 31, 9am-5pm ET
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  8-Hour Live Training
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  FREE Handouts
                </span>
              </div>
            </div>
            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-6 text-center">Get Free Bootcamp Handouts</h3>
              <LeadForm
                buttonText="Send Me the Free Handouts"
                redirectUrl="/bootcamp/thank-you"
                source="bootcamp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Q1 2026 Stats */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Q1 2026 Is Your Moment</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            The federal market is primed for small businesses right now
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What You&apos;ll Walk Away With</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Tangible outputs you can use immediately
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div key={index} className="card hover:translate-y-[-4px] transition-transform">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Handouts */}
      <section className="section bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Free Resources You&apos;ll Get</h2>
          <p className="text-slate-400 text-center mb-12">
            Download these handouts before the bootcamp
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {handouts.map((handout, index) => (
              <div key={index} className="flex items-center gap-3 card">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{handout}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Reserve Your Spot Now</h2>
          <p className="text-slate-300 mb-8">
            Get instant access to all the free handouts and bootcamp details.
          </p>
          <LeadForm
            buttonText="Send Me the Free Handouts"
            redirectUrl="/bootcamp/thank-you"
            source="bootcamp"
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
