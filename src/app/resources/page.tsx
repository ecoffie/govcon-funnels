'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Category = 'all' | 'videos' | 'templates' | 'contacts' | 'tools';

interface Resource {
  category: Category;
  gated: boolean;
  title: string;
  description: string;
  features: string[];
  value: string;
  buttonText: string;
  link?: string;
  /** Direct download path in /handouts/ (for gated resources) */
  downloadFile?: string;
  thumbnail?: string;
  section: string;
}

const resources: Resource[] = [
  // GETTING STARTED
  {
    section: "Getting Started",
    category: "videos",
    gated: false,
    title: "Where Do I Start in GovCon?",
    description: "Complete introduction to government contracting. Perfect for beginners who want to understand the fundamentals.",
    features: ["GovCon basics explained", "How to get registered", "Finding your first contract"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://www.youtube.com/live/VwerrdguYTE",
    thumbnail: "/images/videos/Does the government buy.jpg"
  },
  {
    section: "Getting Started",
    category: "videos",
    gated: false,
    title: "SBA Profile Setup",
    description: "Complete guide to setting up your SBA profile and certifications for small business set-asides.",
    features: ["Profile setup walkthrough", "Certification options", "Set-aside eligibility"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/g0NsG4SogDM",
    thumbnail: "/images/videos/SBA profile setup.jpg"
  },
  // FINDING OPPORTUNITIES
  {
    section: "Finding Opportunities",
    category: "videos",
    gated: false,
    title: "Market Research for GovCon",
    description: "How to conduct market research to find the right federal opportunities that match your business.",
    features: ["Research techniques", "Finding target agencies", "Analyzing competition"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtube.com/live/JAa1qkOrtic",
    thumbnail: "/images/videos/Does the government buy.jpg"
  },
  {
    section: "Finding Opportunities",
    category: "videos",
    gated: false,
    title: "Finding Contract Opportunities",
    description: "Master the art of finding federal contract opportunities using SAM.gov, agency websites, and more.",
    features: ["SAM.gov navigation", "Opportunity sources", "Search strategies"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://www.youtube.com/live/Ko1N0TMAAs0",
    thumbnail: "/images/videos/Navigating Government bid.jpg"
  },
  {
    section: "Finding Opportunities",
    category: "videos",
    gated: false,
    title: "Understanding PSC Codes",
    description: "Complete guide to Product Service Codes (PSC) and how to use them to find relevant opportunities.",
    features: ["What are PSC codes", "Finding your PSC codes", "PSC vs NAICS"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/eCtnAM0j5gY",
    thumbnail: "/images/videos/How to determine potential Untapped.jpg"
  },
  {
    section: "Finding Opportunities",
    category: "videos",
    gated: false,
    title: "The Dangers of Being a Government Consultant",
    description: "Learn the risks and pitfalls of government consulting and how to protect yourself and your business.",
    features: ["Common consulting mistakes", "Risk mitigation strategies", "Protecting your business"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://www.youtube.com/live/ke5RmuRQN_8",
    thumbnail: "/images/videos/The dangers of being a government contractors.jpg"
  },
  // WINNING CONTRACTS
  {
    section: "Winning Contracts",
    category: "videos",
    gated: false,
    title: "Proposal Writing & Bidding",
    description: "Learn the essentials of writing winning government proposals and how to bid effectively on contracts.",
    features: ["Proposal structure", "Winning strategies", "Common mistakes to avoid"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/MTaIUOBbE1Q",
    thumbnail: "/images/videos/No Proposal Writer.jpg"
  },
  {
    section: "Winning Contracts",
    category: "videos",
    gated: false,
    title: "Capability Statements",
    description: "How to create compelling capability statements that get you noticed by federal buyers and prime contractors.",
    features: ["What to include", "Design best practices", "Real examples"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtube.com/live/paUgQSU5v6c",
    thumbnail: "/images/videos/How to create compelling capability statements.jpg"
  },
  {
    section: "Winning Contracts",
    category: "videos",
    gated: false,
    title: "Pricing Strategies",
    description: "How to price your government contracts competitively while maintaining healthy profit margins.",
    features: ["Pricing models", "Cost analysis", "Competitive positioning"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/5o5V8YkNjIM",
    thumbnail: "/images/videos/How to estimate government bid.jpg"
  },
  {
    section: "Winning Contracts",
    category: "videos",
    gated: false,
    title: "Pricing Strategies Part 2",
    description: "Advanced pricing techniques for federal contracts. Build on the fundamentals with deeper strategies.",
    features: ["Advanced pricing methods", "Rate development", "Profit optimization"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/3eBlk6J1Hig",
    thumbnail: "/images/videos/cost evaluation secerets.jpg"
  },
  {
    section: "Winning Contracts",
    category: "videos",
    gated: false,
    title: "Winning Without Past Performance",
    description: "Strategies to win government contracts when you don't have federal past performance history.",
    features: ["Overcoming no experience", "Alternative qualifications", "Building your track record"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/uR8vdTtvuyU",
    thumbnail: "/images/videos/Strategies to win government contracts.jpg"
  },
  // FULFILLMENT & GROWTH
  {
    section: "Fulfillment & Growth",
    category: "videos",
    gated: false,
    title: "Financing Your Contract",
    description: "Learn financing options for government contracts including factoring, lines of credit, and SBA loans.",
    features: ["Contract financing options", "Cash flow management", "Factoring explained"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtube.com/live/HSWGMzkD0Vg",
    thumbnail: "/images/videos/How to build your business credit.jpg"
  },
  {
    section: "Fulfillment & Growth",
    category: "videos",
    gated: false,
    title: "Vendor & Supplier Credit",
    description: "Understand vendor credit, supplier relationships, and how to leverage credit for contract fulfillment.",
    features: ["Vendor credit basics", "Building supplier relationships", "Credit terms negotiation"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://www.youtube.com/live/TDtk3mVWZDQ",
    thumbnail: "/images/videos/How to build 1000000.jpg"
  },
  // INDUSTRY SPECIFIC
  {
    section: "Industry Specific",
    category: "videos",
    gated: false,
    title: "How to Start a Construction Business",
    description: "Complete guide to starting a construction business in federal contracting, including bonding and certifications.",
    features: ["Construction bonding", "Required certifications", "Bidding process"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtube.com/live/gHcWcYFWa4I",
    thumbnail: "/images/videos/from 0 to 125,000.jpg"
  },
  {
    section: "Industry Specific",
    category: "videos",
    gated: false,
    title: "Foreign-Based Companies",
    description: "How foreign-owned businesses can participate in US government contracting legally and effectively.",
    features: ["Eligibility requirements", "US entity options", "Compliance considerations"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/XvWaAownrZU",
    thumbnail: "/images/videos/supporting small business.jpg"
  },
  {
    section: "Industry Specific",
    category: "videos",
    gated: false,
    title: "GSA Schedule Overview",
    description: "Everything you need to know about GSA Schedules and how to get on contract with the government.",
    features: ["What is GSA?", "Application process", "Benefits & requirements"],
    value: "$97",
    buttonText: "Watch Now",
    link: "https://youtu.be/SdefXaGSS5Q",
    thumbnail: "/images/videos/GSA Business mastery.jpg"
  },
  // CONTACT LISTS
  {
    section: "Contact Lists",
    category: "contacts",
    gated: true,
    title: "SBLO Contact Directory",
    description: "Small Business Liaison Officers by agency with direct email and phone contacts.",
    features: ["100+ SBLO Contacts", "Direct Email Addresses", "Phone Numbers", "Agency Breakdown"],
    value: "$297",
    buttonText: "Download PDF",
    downloadFile: "prime-contractor-directory.pdf"
  },
  {
    section: "Contact Lists",
    category: "contacts",
    gated: true,
    title: "Tier-2 Supplier List",
    description: "Access Tier-2 supplier contacts and vendor registration portals at major prime contractors.",
    features: ["50+ Prime Contractors", "Vendor Portal Links", "Supplier Contacts", "Organized by NAICS"],
    value: "$697",
    buttonText: "Download PDF",
    downloadFile: "subcontractor-directory.pdf"
  },
  {
    section: "Templates",
    category: "templates",
    gated: true,
    title: "75 GovCon AI Prompts",
    description: "Ready-to-use AI prompts for proposals, research, capability statements, and business development.",
    features: ["Proposal Writing Prompts", "Research Prompts", "Cap Statement Prompts", "Outreach Templates"],
    value: "$47",
    buttonText: "Download PDF",
    downloadFile: "ai-prompts.pdf"
  },
  {
    section: "Tools",
    category: "tools",
    gated: true,
    title: "Expiring Contracts Data",
    description: "Sample of expiring federal contracts data. Import into Excel, Sheets, or your CRM.",
    features: ["Sample Contract Data", "Prime Contractor Info", "Expiration Dates", "Works with Any CRM"],
    value: "$697",
    buttonText: "Download XLSX",
    downloadFile: "expiring-contracts-2025.xlsx"
  },
  {
    section: "Tools",
    category: "tools",
    gated: false,
    title: "Opportunity Hunter Tool",
    description: "Find federal agencies that buy what you sell. Analyze spending data by NAICS code or keyword.",
    features: ["Agency Spending Data", "NAICS Code Search", "Top Buyers List", "5 Free Searches/Day"],
    value: "$500/yr",
    buttonText: "Launch Tool",
    link: "https://tools.govcongiants.org/opportunity-hunter"
  },
  {
    section: "Templates",
    category: "templates",
    gated: true,
    title: "2026 GovCon Action Plan",
    description: "Your step-by-step roadmap to winning government contracts in 2026.",
    features: ["Monthly action items", "Key milestones", "Goal tracking"],
    value: "$97",
    buttonText: "Download PDF",
    downloadFile: "2026-action-plan.pdf"
  },
  {
    section: "Tools",
    category: "tools",
    gated: true,
    title: "Low-Competition Contracts",
    description: "Curated list of 30+ low-competition federal contracts perfect for small businesses.",
    features: ["Hand-picked opportunities", "Less competition", "Small business friendly"],
    value: "$297",
    buttonText: "Download PDF",
    downloadFile: "low-competition-contracts.pdf"
  },
  {
    section: "Tools",
    category: "tools",
    gated: true,
    title: "Spend Forecast + Immediate Buyers",
    description: "Forecasted government spending and a list of agencies actively buying right now.",
    features: ["Spending predictions", "Active buyers list", "Hot opportunities"],
    value: "$297",
    buttonText: "Download PDF",
    downloadFile: "december-spend-forecast.pdf"
  },
  {
    section: "Contact Lists",
    category: "contacts",
    gated: true,
    title: "Tribal Small Business Directory",
    description: "Directory of tribal-owned small businesses for teaming and subcontracting opportunities.",
    features: ["Tribal business contacts", "Teaming opportunities", "8(a) eligible partners"],
    value: "$297",
    buttonText: "Download CSV",
    downloadFile: "tribal-list.csv"
  },
];

// Group resources by section (order: video sections first, then Templates, Tools, Contact Lists)
const sectionOrder = ['Getting Started', 'Finding Opportunities', 'Winning Contracts', 'Fulfillment & Growth', 'Industry Specific', 'Templates', 'Tools', 'Contact Lists'];
const sections = [...new Set(resources.map(r => r.section))].sort((a, b) => {
  const i = sectionOrder.indexOf(a);
  const j = sectionOrder.indexOf(b);
  return (i === -1 ? 99 : i) - (j === -1 ? 99 : j);
});

function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const leads = JSON.parse(localStorage.getItem('govcon_leads') || '[]');
    return leads.some((l: { source?: string }) => l.source === 'free-handouts');
  } catch {
    return false;
  }
}

export default function ResourceLibrary() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isUnlocked());
  }, []);

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  const filteredSections = sections.filter(section =>
    filteredResources.some(r => r.section === section)
  );

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-12 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free <span className="text-green-500">GovCon Resource Library</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tools, templates, videos, and guides to help you win federal contracts. Some resources are open access, others require a free email signup.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">FREE</span>
              <span className="text-slate-400 text-sm">Open access - no signup required</span>
            </div>
            {unlocked ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">UNLOCKED</span>
                <span className="text-slate-400 text-sm">Downloads unlocked - click to download</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">FREE + EMAIL</span>
                <span className="text-slate-400 text-sm">Requires free email signup</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Everything Free - Start Here */}
      <section className="py-12 px-6 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Everything Free — Start Here</h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            All our free tools, bootcamps, downloads, and the beginner&apos;s course in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/resources/handouts" className="bg-slate-900 border border-green-600/50 rounded-xl p-5 block hover:bg-slate-800 transition">
              <span className="text-2xl">📅</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Action Plan Free Download</h3>
              <p className="text-slate-400 text-sm mb-3">2026 GovCon Action Plan, templates, contact lists, AI prompts.</p>
              <span className="text-green-500 font-semibold text-sm">Get Free Handouts →</span>
            </Link>
            <Link href="/bootcamp" className="bg-slate-900 border border-slate-700 rounded-xl p-5 block hover:bg-slate-800 transition">
              <span className="text-2xl">🎓</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">January Bootcamp</h3>
              <p className="text-slate-400 text-sm mb-3">Monthly live training and Q&A. Register free.</p>
              <span className="text-green-500 font-semibold text-sm">Register Now →</span>
            </Link>
            <Link href="/surge" className="bg-slate-900 border border-slate-700 rounded-xl p-5 block hover:bg-slate-800 transition">
              <span className="text-2xl">🔥</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Surge Bootcamp</h3>
              <p className="text-slate-400 text-sm mb-3">Q4 federal spending focus. Access free.</p>
              <span className="text-green-500 font-semibold text-sm">Access Now →</span>
            </Link>
            <Link href="https://funnels.govcongiants.org/proposal-bootcamp" className="bg-slate-900 border border-slate-700 rounded-xl p-5 block hover:bg-slate-800 transition" target="_blank" rel="noopener noreferrer">
              <span className="text-2xl">📅</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Bid Bootcamp Downloads</h3>
              <p className="text-slate-400 text-sm mb-3">Bid forms and event details for the Feb 28 bootcamp.</p>
              <span className="text-green-500 font-semibold text-sm">Get Bid Forms →</span>
            </Link>
            <Link href="/free-course" className="bg-slate-900 border border-slate-700 rounded-xl p-5 block hover:bg-slate-800 transition">
              <span className="text-2xl">📚</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Beginner&apos;s Course</h3>
              <p className="text-slate-400 text-sm mb-3">Full curriculum from SAM.gov to your first contract.</p>
              <span className="text-green-500 font-semibold text-sm">Start Learning →</span>
            </Link>
            <Link href="/opp" className="bg-slate-900 border border-slate-700 rounded-xl p-5 block hover:bg-slate-800 transition">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Opportunity Hunter</h3>
              <p className="text-slate-400 text-sm mb-3">Find agencies and contracts by NAICS or keyword. Free searches.</p>
              <span className="text-green-500 font-semibold text-sm">Try It Free →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 px-6 border-b border-slate-800 sticky top-[73px] bg-slate-950/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {(['all', 'videos', 'templates', 'contacts', 'tools'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 bg-slate-900 border rounded-full text-sm font-medium transition hover:border-green-500 ${
                  activeCategory === cat
                    ? 'border-green-500 text-green-500 bg-slate-800'
                    : 'border-slate-700 text-white'
                }`}
              >
                {cat === 'all' ? 'All Resources' : cat === 'templates' ? 'Templates & Guides' : cat === 'contacts' ? 'Contact Lists' : cat === 'tools' ? 'Tools & Data' : 'Videos'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredSections.map((section) => {
            const sectionResources = filteredResources.filter(r => r.section === section);
            if (sectionResources.length === 0) return null;

            return (
              <div key={section} id={section.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')} className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-white mb-2">{section}</h2>
                <p className="text-slate-400 mb-6">
                  {section === "Getting Started" && "New to GovCon? Start here to learn the fundamentals."}
                  {section === "Finding Opportunities" && "Learn how to find and research federal contract opportunities."}
                  {section === "Winning Contracts" && "Master proposals, pricing, and capability statements to win contracts."}
                  {section === "Fulfillment & Growth" && "Financing, suppliers, and scaling your government contracting business."}
                  {section === "Industry Specific" && "Specialized guidance for specific industries and situations."}
                  {section === "Templates" && "Downloadable guides and templates—enter your email for free access."}
                  {section === "Tools" && "Data, hit lists, and tools to find and track opportunities."}
                  {section === "Contact Lists" && "SBLO directories, supplier lists, and contact lists—enter your email for free access."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sectionResources.map((resource, index) => (
                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:translate-y-[-4px] hover:shadow-xl transition-all"
                    >
                      {/* Thumbnail for videos */}
                      {resource.thumbnail && (
                        <div className="h-48 bg-gradient-to-br from-purple-900/50 to-slate-900 relative">
                          <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Icon placeholder for non-videos */}
                      {!resource.thumbnail && (
                        <div className="h-48 bg-gradient-to-br from-blue-900/50 to-slate-900 p-4 flex items-center justify-center">
                          <div className="bg-white rounded-lg shadow-xl p-3 transform -rotate-3">
                            <div className="w-40 h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded flex flex-col items-center justify-center">
                              <div className="text-3xl mb-1">
                                {resource.category === 'templates' && '\u{1F4C4}'}
                                {resource.category === 'contacts' && '\u{1F4CB}'}
                                {resource.category === 'tools' && '\u{1F6E0}\u{FE0F}'}
                              </div>
                              <div className="text-xs text-slate-600 font-medium">
                                {resource.category === 'templates' && 'PDF Template'}
                                {resource.category === 'contacts' && 'Contact List'}
                                {resource.category === 'tools' && 'Tool / Data'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        {resource.gated ? (
                          unlocked ? (
                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">UNLOCKED</span>
                          ) : (
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">FREE + EMAIL</span>
                          )
                        ) : (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">FREE VIDEO</span>
                        )}
                        <h3 className="text-xl font-bold text-white mt-3 mb-2">{resource.title}</h3>
                        <p className="text-slate-400 text-sm mb-4">{resource.description}</p>
                        <ul className="space-y-2 mb-6">
                          {resource.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                              <span className="text-green-500">&#10003;</span> {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-slate-500 text-sm line-through">{resource.value} value</div>
                            <div className="text-2xl font-bold text-green-500">FREE</div>
                          </div>
                          {resource.gated ? (
                            unlocked && resource.downloadFile ? (
                              <a
                                href={`/handouts/${resource.downloadFile}`}
                                download
                                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                              >
                                {resource.buttonText}
                              </a>
                            ) : resource.link ? (
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                              >
                                {resource.buttonText}
                              </a>
                            ) : (
                              <Link
                                href="/resources/handouts"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                              >
                                Get Free Access
                              </Link>
                            )
                          ) : (
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                            >
                              {resource.buttonText}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Access to Even More Resources?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Pro members get exclusive access to live bootcamps, weekly Q&A calls, the full Opportunity Hunter tool, and our private community.
          </p>
          <a
            href="https://federalhelpcenter.com/pro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all green-glow"
          >
            Upgrade to Pro &rarr;
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
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
