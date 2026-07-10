'use client';

import { useEffect, useState } from 'react';
import { useDashboardAuth } from '../_components/DashboardAuthGate';

interface User {
  id: string;
  username: string;
  display_name: string;
  email: string | null;
  active: boolean;
}

export default function TeamDirectoryPage() {
  const { authHeaders, signOut } = useDashboardAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/users', { headers: authHeaders })
      .then((res) => {
        if (res.status === 401) {
          signOut();
          throw new Error('Session expired — please sign in again.');
        }
        if (!res.ok) throw new Error('Failed to load team');
        return res.json();
      })
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // authHeaders/signOut are stable per session; load once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
