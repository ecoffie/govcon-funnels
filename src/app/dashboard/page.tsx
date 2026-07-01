import DashboardAskBot from './_components/DashboardAskBot';

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Top priority</h2>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-6">
          <h3 className="mb-2 text-xl font-semibold text-green-400">
            HUBZone Webinar
          </h3>
          <p className="mb-3 text-slate-300">
            Current active funnel: free live HUBZone webinar with registration
            tracking, scarcity banner (first 100 get Zoom access), and follow-up.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://govcongiants.com/hubzone"
              target="_blank"
              rel="noopener"
              className="inline-block rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              Open funnel →
            </a>
            <a
              href="/hubzone/registrations"
              className="inline-block rounded-md bg-slate-700 px-4 py-2 font-semibold text-white hover:bg-slate-600"
            >
              Registration command center →
            </a>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Also running: Mindy re-ignite email drip (automated daily cron to
            ~4,300 profile-incomplete alumni). All leads: GHL + Slack enabled.
          </p>
        </div>
      </section>

      <section>
        <DashboardAskBot />
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Task manager</h2>
        <p className="mb-3 text-sm text-slate-400">
          task management for marketing and delivery
        </p>
        <div className="rounded-xl bg-transparent p-0">
          <iframe
            title="Legacy task manager"
            src="/dashboard.html?embed=task-manager"
            className="h-[1100px] w-full rounded-lg border-0"
          />
        </div>
      </section>
    </div>
  );
}
