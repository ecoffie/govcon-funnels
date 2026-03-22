'use client';

import { useState } from 'react';

interface GuideEmailCaptureProps {
  guideTitle: string;
}

export default function GuideEmailCapture({ guideTitle }: GuideEmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: `guide-${guideTitle.toLowerCase().replace(/\s+/g, '-')}`,
          tags: ['guide-reader', 'email-capture'],
        }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="my-12 p-8 bg-green-500/10 border border-green-500/30 rounded-2xl text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re In!</h3>
        <p className="text-slate-400">Check your inbox for your free resources and weekly GovCon insights.</p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 md:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-green-950/30 border border-slate-800 rounded-2xl relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              Get the Cheat Sheet
            </h3>
            <p className="text-slate-400">
              Join 5,000+ GovCon professionals. Get weekly insights and free templates.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 font-bold rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Sending...' : 'Get Free Access'}
          </button>
        </form>

        {status === 'error' && (
          <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}

        <p className="mt-4 text-slate-500 text-sm">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
