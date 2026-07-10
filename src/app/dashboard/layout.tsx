import type { ReactNode } from 'react';
import DashboardNav from './_components/DashboardNav';
import DashboardAuthGate from './_components/DashboardAuthGate';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Internal <span className="text-green-500">Dashboard</span>
        </h1>
        <p className="mb-6 text-slate-400">
          Internal AI workspace and task management hub.
        </p>
        <DashboardAuthGate>
          <DashboardNav />
          {children}
        </DashboardAuthGate>
      </div>
    </main>
  );
}
