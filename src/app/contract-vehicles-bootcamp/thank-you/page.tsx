'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const nextSteps = [
  {
    title: 'Review the Contract Vehicle Breakdown',
    desc: 'Start with IDIQs, BPAs, and sources sought so you can prioritize the right paths.',
  },
  {
    title: 'Map Your Offer to Vehicle Fit',
    desc: 'Identify where your capabilities best match agency buying patterns and contract structure.',
  },
  {
    title: 'Build Your 30-Day Action Plan',
    desc: 'Create your first shortlist of opportunities and a response timeline.',
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
            Your contract vehicles bootcamp access is confirmed. Check your email for the full breakdown and next steps.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10 text-left">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Next Moves</h2>
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
