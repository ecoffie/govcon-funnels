import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'GovCon Opportunity Finder - Find Agencies That Buy What You Sell | GovCon Giants',
  description: 'Discover which federal agencies buy what you sell. AI-powered analysis of $700B+ in federal spending to find your perfect matches.',
};

const agencies = [
  "DoD", "GSA", "VA", "DHS", "HHS", "NASA", "DOE", "USDA"
];

const steps = [
  { num: "1", title: "Enter Your Details", desc: "Tell us your NAICS code, certifications, and location" },
  { num: "2", title: "AI Analyzes Data", desc: "We scan $700B+ in federal procurement data" },
  { num: "3", title: "Get Your List", desc: "Receive your ranked agency recommendations" },
];

const features = [
  { icon: "🎯", title: "NAICS Matching", desc: "Find agencies buying in your industry codes" },
  { icon: "💰", title: "Spending Data", desc: "See how much each agency spends annually" },
  { icon: "🏷️", title: "Set-Aside Matching", desc: "Match your certifications to preferences" },
  { icon: "📋", title: "Agency Pain Points", desc: "Learn what each agency needs most" },
  { icon: "📊", title: "Ranked Results", desc: "Agencies sorted by opportunity score" },
  { icon: "⚡", title: "Instant Delivery", desc: "Results in minutes, not days" },
];

export default function OpportunityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
                🔍 AI-POWERED TOOL
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find Which Agencies <span className="text-green-500">Buy What You Sell</span>
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Our AI analyzes $700B+ in federal spending to identify which agencies are the best match for your products or services.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Find your top 5 target agencies quickly
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View spending data by NAICS code
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Understand agency priorities & pain points
                </li>
              </ul>
            </div>
            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-6 text-center">Get Free Access</h3>
              <LeadForm
                buttonText="Get Free Access"
                redirectUrl="/opp/upsell"
                source="opp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-slate-800 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-400 mb-4">Trusted data from these agencies:</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {agencies.map((agency, index) => (
              <span key={index} className="text-slate-300 font-semibold">{agency}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Get your personalized agency list in 3 simple steps
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What You&apos;ll Discover</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Detailed intelligence on every recommended agency
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card hover:translate-y-[-4px] transition-transform">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="section bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sample Agency Card</h2>
          <div className="card border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Department of Veterans Affairs</h3>
                <p className="text-green-500 text-sm">92% Match Score</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Annual Spending (Your NAICS)</p>
                <p className="font-semibold text-xl text-green-500">$2.4B</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Small Business Set-Asides</p>
                <p className="font-semibold text-xl">34%</p>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Top Priorities:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">IT Modernization</span>
                <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Veteran Services</span>
                <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Healthcare Tech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="card green-glow text-center">
            <h2 className="text-2xl font-bold mb-4">Find Your Target Agencies</h2>
            <p className="text-slate-300 mb-6">
              Stop guessing. Let our AI show you exactly where to focus.
            </p>
            <LeadForm
              buttonText="Get Free Access"
              redirectUrl="/opp/upsell"
              source="opp"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
