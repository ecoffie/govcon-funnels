'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = [
  { icon: "📢", name: "Marketing" },
  { icon: "🎬", name: "Videos" },
  { icon: "📋", name: "Contacts" },
  { icon: "📚", name: "Knowledge" },
  { icon: "🛠️", name: "Tools" },
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
        <div className="max-w-2xl mx-auto text-center">
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

          <p className="text-xl text-slate-500 mb-8">
            Your free resource library is ready and waiting. Access 35+ tools, templates, videos, and guides to help you win federal contracts.
          </p>

          {/* CTA Button */}
          <Link
            href="/resources"
            className="inline-block px-10 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xl transition-all shadow-lg shadow-rose-900/50 animate-pulse"
          >
            Access Your Resource Library →
          </Link>

          {/* What's Inside Preview */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <span className="text-slate-400 text-sm">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Email Confirmation Note */}
          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>We&apos;ve also sent you an email with your access link. Check your inbox!</span>
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
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
