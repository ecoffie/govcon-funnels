import { sharedDashboardContent } from '@/lib/shared-content';

export default function DashboardInfoPage() {
  const section = sharedDashboardContent.dashboardInfo;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Dashboard info</h2>
        <h3 className="mb-3 text-lg font-semibold text-white">Dashboard snapshot</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {section.snapshotCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-700 bg-slate-900/80 p-5"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-slate-400">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-white">Quick links</h3>
        <div className="flex flex-wrap gap-3">
          {section.quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener"
              className="rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-green-400 hover:bg-slate-700"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold text-white">Active funnels</h3>
        <p className="mb-3 text-sm text-slate-400">
          All active lead capture pages and funnels. Source tags in parentheses.
        </p>
        <ul className="grid list-disc gap-1 pl-6 md:grid-cols-2">
          {section.activeFunnels.map((funnel) => (
            <li key={funnel.label}>
              <a
                href={funnel.url}
                target="_blank"
                rel="noopener"
                className="text-green-400 hover:underline"
              >
                {funnel.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
