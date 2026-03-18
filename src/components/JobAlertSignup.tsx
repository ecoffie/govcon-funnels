'use client';

import { useState } from 'react';

interface JobAlertSignupProps {
  category?: string;
  categoryName?: string;
}

export default function JobAlertSignup({ category, categoryName }: JobAlertSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: category ? `job-alerts-${category}` : 'job-alerts',
          tags: ['job-alerts', category ? `category-${category}` : 'all-jobs'],
        }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setSuccess(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-white mb-1">You&apos;re subscribed!</h3>
        <p className="text-slate-400 text-sm">
          We&apos;ll email you when new {categoryName || 'BD'} jobs are posted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold">Get Job Alerts</h3>
          <p className="text-slate-400 text-sm">
            New {categoryName || 'GovCon BD'} jobs delivered to your inbox
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}

      <p className="mt-3 text-slate-500 text-xs">
        Free. Unsubscribe anytime. No spam.
      </p>
    </div>
  );
}
