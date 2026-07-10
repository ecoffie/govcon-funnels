'use client';

import { useState } from 'react';
import { useDashboardAuth } from './DashboardAuthGate';

export default function DashboardAskBot() {
  const { authHeaders, signOut } = useDashboardAuth();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function onAsk() {
    const q = question.trim();
    if (!q) {
      setAnswer(
        'Please type a question about funnels, plans, lead flow, integrations, or updates.'
      );
      return;
    }
    setLoading(true);
    setAnswer('Thinking...');
    try {
      const response = await fetch('/api/dashboard/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ question: q }),
      });
      if (response.status === 401) {
        signOut();
        setAnswer('Session expired — please sign in again.');
        return;
      }
      const data = await response.json();
      if (data.answer) {
        setAnswer(String(data.answer));
      } else if (data.error) {
        setAnswer(`Error: ${String(data.error)}`);
      } else {
        setAnswer('No response returned.');
      }
    } catch {
      setAnswer('Could not reach the AI endpoint right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold text-white">Internal AI</h2>
      <p className="mb-3 text-sm text-slate-400">
        Ask questions about internal funnels, plans, lead flow, and operations.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) onAsk();
          }}
          placeholder="Ask a question..."
          className="min-w-[240px] flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-green-500"
        />
        <button
          type="button"
          onClick={onAsk}
          disabled={loading}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>
      {answer ? (
        <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm whitespace-pre-wrap text-slate-300">
          {answer}
        </div>
      ) : null}
    </section>
  );
}
