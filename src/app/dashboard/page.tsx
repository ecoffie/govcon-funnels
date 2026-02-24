import Link from 'next/link';
import RecentUpdates from './_components/RecentUpdates';

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Top priority</h2>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-6">
          <h3 className="mb-2 text-xl font-semibold text-green-400">
            February 28 Proposal Bootcamp
          </h3>
          <p className="mb-3 text-slate-300">
            Feb 28 Specifics and Proposals bootcamp. Free proposal resources and
            live 8-hour training.
          </p>
          <a
            href="https://funnels.govcongiants.org/proposal-bootcamp"
            target="_blank"
            rel="noopener"
            className="inline-block rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
          >
            Open funnel →
          </a>
          <p className="mt-3 text-sm text-slate-400">
            Active funnel: Free proposal resources (IDIQ templates, Sources
            Sought template, task order checklist) → Live 8-hour bootcamp Feb 28
            → Upsell/Downsell offers. All leads: GHL + Slack notifications enabled.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Recent updates</h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <RecentUpdates />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Dashboard home</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Open task manager workspace
            </h3>
            <p className="mb-3 text-sm text-slate-400">
              Continue working in the full task workspace while page navigation
              moves to route-based dashboard pages.
            </p>
            <Link
              href="/dashboard.html"
              className="text-sm font-semibold text-green-400 hover:text-green-300"
            >
              Open workspace →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Browse dashboard sections
            </h3>
            <p className="mb-3 text-sm text-slate-400">
              Use the navigation bar above to open each section on its own page.
            </p>
            <Link
              href="/dashboard/dashboard-info"
              className="text-sm font-semibold text-green-400 hover:text-green-300"
            >
              Go to dashboard info →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
