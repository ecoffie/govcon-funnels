'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard home' },
  { href: '/dashboard/dashboard-info', label: 'Dashboard info' },
  { href: '/dashboard/plans-overview', label: 'Plans overview' },
  { href: '/dashboard/how-it-all-fits-together', label: 'How it all fits together' },
  { href: '/dashboard/lead-automation', label: 'Lead automation' },
  { href: '/dashboard/funnels-and-lead-flow', label: 'Funnels and lead flow' },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 border-b border-slate-700 pb-3">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'rounded-md border px-3 py-2 text-sm font-semibold transition',
                active
                  ? 'border-slate-500 bg-slate-700 text-white'
                  : 'border-transparent bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:bg-slate-700',
              ].join(' ')}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
