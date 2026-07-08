'use client';

import { useCallback, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  display_name: string;
  email: string | null;
  active: boolean;
}

export default function TeamDirectoryPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? sessionStorage.getItem('dashboard_admin_pw') : null;
    if (stored) setPassword(stored);
    setAuthChecked(true);
  }, []);

  const handleUnauthorized = useCallback(() => {
    if (typeof window !== 'undefined') sessionStorage.removeItem('dashboard_admin_pw');
    setPassword(null);
    setAuthError('Wrong password — please sign in again.');
    setLoading(false);
  }, []);

  const loadUsers = useCallback(() => {
    if (!password) return;
    setLoading(true);
    setError(null);
    fetch('/api/dashboard/users', { headers: { 'x-admin-password': password } })
      .then((res) => {
        if (res.status === 401) {
          handleUnauthorized();
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error('Failed to load team');
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        if (err instanceof Error && err.message !== 'Unauthorized') setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [password, handleUnauthorized]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pw = pwInput.trim();
    if (!pw) return;
    if (typeof window !== 'undefined') sessionStorage.setItem('dashboard_admin_pw', pw);
    setAuthError(null);
    setPassword(pw);
  };

  if (!authChecked) return null;

  if (!password) {
    return (
      <div className="mx-auto max-w-sm rounded-xl border border-slate-700 bg-slate-900/70 p-8">
        <h2 className="mb-2 text-xl font-bold text-white">Team directory</h2>
        <p className="mb-4 text-sm text-slate-400">Enter the admin password to continue.</p>
        <form onSubmit={onLogin} className="space-y-3">
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="Admin password"
            autoFocus
            className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500"
          />
          {authError && <p className="text-sm text-red-400">{authError}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
        Loading team...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-slate-900/70 p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Team directory</h2>
      <p className="text-sm text-slate-400">
        Team members and contact info
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border border-slate-700 bg-slate-900/70 p-5"
          >
            <h3 className="mb-1 font-semibold text-white">{user.display_name}</h3>
            {user.email ? (
              <a
                href={`mailto:${user.email}`}
                className="text-sm text-green-400 hover:text-green-300"
              >
                {user.email}
              </a>
            ) : (
              <span className="text-sm text-slate-500">No email</span>
            )}
            {user.username && (
              <p className="mt-2 text-xs text-slate-500">@{user.username}</p>
            )}
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
          No team members found. Import users via the dashboard API.
        </div>
      )}
    </div>
  );
}
