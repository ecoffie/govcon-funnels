'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const downloads = [
  { name: "75 GovCon AI Prompts", file: "ai-prompts.pdf", icon: "\u{1F916}", desc: "Ready-to-use prompts for proposals and research" },
  { name: "2026 GovCon Action Plan", file: "2026-action-plan.pdf", icon: "\u{1F4C5}", desc: "Your step-by-step roadmap for 2026" },
  { name: "SBLO Contact Directory", file: "prime-contractor-directory.pdf", icon: "\u{1F4CB}", desc: "100+ Small Business Liaison Officers" },
  { name: "Tier-2 Supplier List", file: "subcontractor-directory.pdf", icon: "\u{1F3AF}", desc: "50+ prime contractor vendor portals" },
  { name: "Expiring Contracts", file: "expiring-contracts-2025.xlsx", icon: "\u{1F4CA}", desc: "Expiring federal contracts data" },
  { name: "Low-Competition Contracts", file: "low-competition-contracts.pdf", icon: "\u{1F3C6}", desc: "30+ curated low-competition opportunities" },
  { name: "Spend Forecast", file: "december-spend-forecast.pdf", icon: "\u{1F4B0}", desc: "Agency spending predictions + active buyers" },
  { name: "Tribal Directory", file: "tribal-list.csv", icon: "\u{1F465}", desc: "Tribal small business contacts for teaming" },
];

export default function ResourcesThankYou() {
  const [userName, setUserName] = useState('Friend');

  useEffect(() => {
    const name = localStorage.getItem('leadName');
    if (name) {
      setUserName(name.split(' ')[0]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar - Complete */}
      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-500 font-medium">Step 4 of 4</span>
            <span className="text-green-500">Complete!</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full green-glow" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-slate-900/50 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You&apos;re In, <span className="text-green-500">{userName}</span>!
          </h1>

          <p className="text-xl text-slate-500 mb-12">
            Your free resources are ready. Download them all below.
          </p>

          {/* Download Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
            {downloads.map((item, i) => (
              <a
                key={i}
                href={`/handouts/${item.file}`}
                download
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-green-600 rounded-xl p-5 transition-all group"
              >
                <div className="w-12 h-12 bg-green-900/30 border border-green-700/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-900/50">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold mb-1 group-hover:text-green-400 transition">{item.name}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
                <svg className="w-5 h-5 text-slate-600 group-hover:text-green-500 flex-shrink-0 mt-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Resource Library Link */}
          <Link
            href="/resources"
            className="inline-block px-10 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xl transition-all shadow-lg shadow-rose-900/50"
          >
            Browse Full Resource Library &rarr;
          </Link>

          {/* Email Confirmation Note */}
          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>We&apos;ve also sent these download links to your email. Check your inbox!</span>
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
