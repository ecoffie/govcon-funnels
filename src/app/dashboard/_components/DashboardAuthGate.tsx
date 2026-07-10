'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'dashboard_admin_pw';

type AuthContextValue = {
  /** The admin password entered this session, or '' if not signed in. */
  password: string;
  /** Standard headers to attach to /api/dashboard/* fetches. */
  authHeaders: Record<string, string>;
  /** Clear the stored password and show the login screen again. */
  signOut: () => void;
};

const DashboardAuthContext = createContext<AuthContextValue>({
  password: '',
  authHeaders: {},
  signOut: () => {},
});

/**
 * Read the admin password + auth headers from any dashboard child component.
 * Attach `authHeaders` to every /api/dashboard/* fetch so the proxy gate
 * (src/proxy.ts) lets the request through. If a request still 401s, call
 * `signOut()` to bounce back to the login screen.
 */
export function useDashboardAuth(): AuthContextValue {
  return useContext(DashboardAuthContext);
}

export default function DashboardAuthGate({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  // Restore a previously-entered admin password (session-scoped).
  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (stored) setPassword(stored);
    setChecked(true);
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') sessionStorage.removeItem(STORAGE_KEY);
    setPassword(null);
  }, []);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pw = pwInput.trim();
    if (!pw) return;
    if (typeof window !== 'undefined') sessionStorage.setItem(STORAGE_KEY, pw);
    setPassword(pw);
    setPwInput('');
  };

  // Avoid a flash of the login screen before sessionStorage is read.
  if (!checked) {
    return (
      <div className="py-20 text-center text-slate-500">Loading…</div>
    );
  }

  if (!password) {
    return (
      <div className="mx-auto mt-10 max-w-sm rounded-xl border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="mb-1 text-xl font-semibold text-white">Staff sign-in</h2>
        <p className="mb-4 text-sm text-slate-400">
          Enter the admin password to access the internal dashboard.
        </p>
        <form onSubmit={onLogin} className="space-y-3">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 pr-10 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <DashboardAuthContext.Provider
      value={{
        password,
        authHeaders: { 'x-admin-password': password },
        signOut,
      }}
    >
      {children}
    </DashboardAuthContext.Provider>
  );
}
