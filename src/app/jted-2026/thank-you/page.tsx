'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const downloads = [
  {
    icon: "📊",
    title: "A/E/C Federal Intel Pack",
    desc: "10 expiring contracts, 5 teaming plays, AI prompts, and actionable templates",
    file: "/downloads/JTED-2026-Intel-Pack.pdf",
    pages: "26 pages"
  },
  {
    icon: "📑",
    title: "Presentation Slides",
    desc: "All 98 slides from the JTED 2026 presentation",
    file: "/downloads/JTED-2026-Slides.pdf",
    pages: "98 slides"
  },
];

export default function JTED2026ThankYou() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Get name from localStorage
    const storedName = localStorage.getItem('leadName');
    if (storedName) {
      setName(storedName.split(' ')[0]); // First name only
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/50 border border-green-700/50 rounded-full mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {name ? `Thanks, ${name}!` : 'You\'re All Set!'}
          </h1>
          <p className="text-xl text-slate-400">
            Your JTED 2026 resources are ready to download.
          </p>
        </div>

        {/* Download Cards */}
        <div className="space-y-4 mb-12">
          {downloads.map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center gap-6">
              <div className="text-4xl">{item.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
                <p className="text-slate-600 text-xs mt-1">{item.pages}</p>
              </div>
              <a
                href={item.file}
                download
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition flex-shrink-0"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">What To Do Next</h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <p><strong>Read the Intel Pack</strong> — Focus on the 10 expiring contracts and identify 2-3 that match your capabilities</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <p><strong>Set up SAM.gov alerts</strong> — Use Section 3 of the Intel Pack to configure your saved searches today</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <p><strong>Use the teaming scripts</strong> — Approach at least 2 primes at the industry day using the scripts in Section 2</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <p><strong>Respond to a Sources Sought</strong> — Use our template to submit your first response this week</p>
            </div>
          </div>
        </div>

        {/* Free Daily Alerts Promo */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-bold text-white mb-2">Want Daily Contract Alerts?</h3>
          <p className="text-slate-400 mb-6">
            Get free daily alerts for opportunities matching your NAICS codes.
            No credit card required.
          </p>
          <Link
            href="https://tools.govcongiants.org/alerts"
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Set Up Free Alerts
            <span>→</span>
          </Link>
        </div>

        {/* Resources */}
        <div className="text-center">
          <p className="text-slate-500 mb-4">More resources from GovCon Giants:</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link href="https://youtube.com/@govcongiants" target="_blank" className="text-slate-400 hover:text-white transition">
              YouTube (500+ videos)
            </Link>
            <Link href="https://govcongiants.org/free-course" target="_blank" className="text-slate-400 hover:text-white transition">
              Free Course
            </Link>
            <Link href="https://tools.govcongiants.org" target="_blank" className="text-slate-400 hover:text-white transition">
              Market Assassin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
