import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free GovCon Resources Library | GovCon Giants',
  description: 'Tools, templates, videos, and guides to help you win federal contracts. Access our complete library of free government contracting resources.',
};

const gettingStarted = [
  { type: "VIDEO", title: "Government Contracting Basics", bullets: ["What is GovCon?", "How does it work?", "Is it right for you?"], link: "/free-course" },
  { type: "VIDEO", title: "SAM.gov Registration Guide", bullets: ["Step-by-step walkthrough", "Common mistakes to avoid", "Timeline expectations"], link: "/free-course" },
];

const findingOpportunities = [
  { type: "VIDEO", title: "Market Research Fundamentals", bullets: ["Finding your niche", "Analyzing competition", "Sizing the market"], link: "/free-course" },
  { type: "VIDEO", title: "Navigating SAM.gov", bullets: ["Search techniques", "Setting alerts", "Saved searches"], link: "/free-course" },
  { type: "VIDEO", title: "Understanding PSC & NAICS Codes", bullets: ["Code structure explained", "Finding your codes", "Using codes effectively"], link: "/free-course" },
  { type: "VIDEO", title: "Agency Pain Points", bullets: ["What agencies need", "Budget cycles", "Decision makers"], link: "/free-course" },
];

const winningContracts = [
  { type: "VIDEO", title: "Writing Winning Proposals", bullets: ["Proposal structure", "Evaluation criteria", "Common mistakes"], link: "/free-course" },
  { type: "VIDEO", title: "Capability Statement Mastery", bullets: ["One-page format", "Key differentiators", "Design tips"], link: "/free-course" },
  { type: "VIDEO", title: "Pricing Strategies", bullets: ["Cost analysis", "Competitive pricing", "Profit margins"], link: "/free-course" },
  { type: "VIDEO", title: "Past Performance Solutions", bullets: ["No past performance?", "Building credentials", "Commercial references"], link: "/free-course" },
  { type: "VIDEO", title: "Teaming Arrangements", bullets: ["Joint ventures", "Mentor-protégé", "Subcontracting"], link: "/free-course" },
  { type: "VIDEO", title: "Small Business Certifications", bullets: ["8(a), SDVOSB, HUBZone", "Application process", "Benefits & set-asides"], link: "/free-course" },
];

const templates = [
  { type: "PDF", title: "75 AI Prompts for GovCon", bullets: ["Proposal writing", "Market research", "Communication"], value: "$97", link: "/surge" },
  { type: "CSV", title: "SBLO Directory (100+ Contacts)", bullets: ["Agency contacts", "Direct emails", "Phone numbers"], value: "$197", link: "/surge" },
  { type: "PDF", title: "Hit List: Low-Competition Contracts", bullets: ["Under 3 bidders", "Small business set-asides", "Updated monthly"], value: "$147", link: "/surge" },
  { type: "PDF", title: "Tribal 8(a) Directory", bullets: ["500+ Native American firms", "Teaming opportunities", "Contact info"], value: "$197", link: "/surge" },
  { type: "PDF", title: "Contract Tracker Template", bullets: ["Opportunity pipeline", "Deadline tracking", "Status updates"], value: "$47", link: "/surge" },
  { type: "PDF", title: "Capability Statement Template", bullets: ["Professional design", "Editable format", "Multiple layouts"], value: "$27", link: "/surge" },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Free <span className="text-green-500">GovCon Resources</span> Library
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Tools, templates, videos, and guides to help you win federal contracts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#videos" className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors">
              📹 Videos
            </Link>
            <Link href="#templates" className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors">
              📄 Templates & Guides
            </Link>
            <Link href="https://shop.govcongiants.org" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-colors">
              ⭐ Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Getting Started Videos */}
      <section id="videos" className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {gettingStarted.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Finding Opportunities Videos */}
      <section className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Finding Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {findingOpportunities.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Winning Contracts Videos */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Winning Contracts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winningContracts.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Templates & Tools */}
      <section id="templates" className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Templates, Tools & Contact Lists</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((resource, index) => (
              <ResourceCard key={index} resource={resource} showValue />
            ))}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want More?</h2>
          <p className="text-slate-300 mb-8">
            Unlock exclusive tools, live bootcamps, and weekly Q&A calls with Pro membership.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Pro Membership</h3>
              <p className="text-3xl font-bold text-green-500 mb-2">$99<span className="text-lg text-slate-400">/mo</span></p>
              <p className="text-slate-400 text-sm mb-4">or $799/year (save 33%)</p>
              <Link href="https://shop.govcongiants.org" className="btn-primary block text-center">
                Get Pro Access
              </Link>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Starter</h3>
              <p className="text-3xl font-bold text-green-500 mb-2">$27<span className="text-lg text-slate-400">/mo</span></p>
              <p className="text-slate-400 text-sm mb-4">Basic tools & resources</p>
              <Link href="https://shop.govcongiants.org" className="btn-primary block text-center bg-slate-600 hover:bg-slate-500">
                Get Started
              </Link>
            </div>
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

interface Resource {
  type: string;
  title: string;
  bullets: string[];
  link: string;
  value?: string;
}

function ResourceCard({ resource, showValue = false }: { resource: Resource; showValue?: boolean }) {
  const typeColors: Record<string, string> = {
    VIDEO: 'bg-blue-500/20 text-blue-400',
    PDF: 'bg-red-500/20 text-red-400',
    CSV: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="card hover:translate-y-[-4px] transition-transform flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${typeColors[resource.type] || 'bg-slate-600'}`}>
          {resource.type}
        </span>
        {showValue && resource.value && (
          <span className="text-slate-400 text-sm">{resource.value} value</span>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-3">{resource.title}</h3>
      <ul className="space-y-1 mb-4 flex-grow">
        {resource.bullets.map((bullet, i) => (
          <li key={i} className="text-slate-400 text-sm flex items-center gap-2">
            <span className="text-green-500">•</span>
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href={resource.link}
        className="btn-primary text-center mt-auto"
      >
        {resource.type === 'VIDEO' ? 'Watch Now' : 'Download'}
      </Link>
    </div>
  );
}
