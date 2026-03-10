'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const downloads = [
  { num: 1, title: 'March 2026 Expiring Contracts List', desc: '15 sample contracts from 944 expiring in March 2026', file: '/march-surge/downloads/march-2026-expiring-contracts.html', label: 'View List', source: 'Recompete Tracker', sourceDesc: 'Get the full tracker with 6,900+ expiring contracts across 36 agencies', sourceUrl: 'https://shop.govcongiants.org/expiring-contracts', sourceLabel: 'Get Full Tracker - $397' },
  { num: 2, title: 'Recompete Positioning Checklist', desc: '18-month timeline for recompetes', file: '/march-surge/downloads/recompete-positioning-checklist.html', label: 'View Checklist', source: 'Recompete Tracker', sourceDesc: 'Filter by NAICS, agency, value & track 6,900+ contracts', sourceUrl: 'https://shop.govcongiants.org/expiring-contracts', sourceLabel: 'Get Full Tracker - $397' },
  { num: 3, title: '10 IDIQ Vehicles Guide', desc: 'The most active GWAC/IDIQ vehicles', file: '/march-surge/downloads/10-idiq-vehicles-guide.html', label: 'View Guide', source: 'The Vault', sourceDesc: '125+ premium GovCon templates, proposals & guides', sourceUrl: 'https://guides.govcongiants.org', sourceLabel: 'Access The Vault (Pro)' },
  { num: 4, title: 'Active IDIQ Vehicles List', desc: '50 vehicles with ceiling values & NAICS', file: '/march-surge/downloads/active-idiq-vehicles-list.html', label: 'View List', source: 'Recompete Tracker', sourceDesc: 'Full database with ceiling values, ordering agencies & task orders', sourceUrl: 'https://shop.govcongiants.org/expiring-contracts', sourceLabel: 'Get Full Tracker - $397' },
  { num: 5, title: 'Sources Sought Response Template', desc: 'Fill-in-the-blank template', file: '/march-surge/downloads/sources-sought-response-template.html', label: 'View Template', source: 'The Vault', sourceDesc: '125+ premium templates including proposals, contracts & bid forms', sourceUrl: 'https://guides.govcongiants.org', sourceLabel: 'Access The Vault (Pro)' },
  { num: 6, title: 'Task Order Response Template', desc: 'Framework for IDIQ task orders', file: '/march-surge/downloads/task-order-response-template.html', label: 'View Template', source: 'GovCon Shop', sourceDesc: 'Professional proposal templates, databases & contractor tools', sourceUrl: 'https://shop.govcongiants.org', sourceLabel: 'Browse All Products' },
];

const nextSteps = [
  {
    title: 'Download All Resources',
    desc: 'Save everything to your computer for easy reference before the bootcamp.',
  },
  {
    title: 'Review the IDIQ Vehicles Guide',
    desc: 'Understand which vehicles might be relevant for your business and NAICS codes.',
  },
  {
    title: 'Bring Questions to March 28',
    desc: 'Write down specific questions about contract vehicles and opportunities you find.',
  },
];

export default function ContractVehiclesThankYou() {
  const [userName, setUserName] = useState('Friend');

  useEffect(() => {
    const name = localStorage.getItem('leadName');
    if (name) {
      setUserName(name.split(' ')[0]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
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

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 bg-slate-900/50 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You&apos;re In, <span className="text-green-500">{userName}</span>!
          </h1>

          <p className="text-xl text-slate-500 mb-10">
            Download your 6 free resources below. We&apos;ll send event details to your email.
          </p>

          {/* Event Reminder */}
          <div className="bg-green-900/20 border border-green-700/50 rounded-2xl p-6 mb-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Mark Your Calendar</h2>
            <div className="text-green-400 text-lg font-semibold mb-2">March 28, 2026 | 9:00 AM ET | Live on Zoom</div>
            <p className="text-slate-400">Contract Vehicles Bootcamp - FREE</p>
            <p className="text-slate-500 text-sm mt-2">We&apos;ll send you the Zoom link before the event.</p>
          </div>

          {/* Download Grid */}
          <h2 className="text-2xl font-bold text-white text-center mb-6">Your 6 Free Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {downloads.map((d) => (
              <div key={d.num} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-900/50 border border-green-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{d.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{d.title}</h3>
                    <p className="text-slate-500 text-sm mb-2">{d.desc}</p>
                    <a
                      href={d.file}
                      download
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      {d.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10 text-left">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What To Do Before March 28</h2>
            <div className="space-y-5">
              {nextSteps.map((step) => (
                <div key={step.title} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all"
            >
              Browse Free Resources
            </Link>
            <a
              href="https://federalhelpcenter.com/pro"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold transition-all"
            >
              Explore Pro Membership
            </a>
          </div>

          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>We sent your bootcamp access details to your email inbox.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-xl font-bold text-white">GovCon</span>
            <span className="text-xl font-bold text-green-500">Giants</span>
          </div>
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
