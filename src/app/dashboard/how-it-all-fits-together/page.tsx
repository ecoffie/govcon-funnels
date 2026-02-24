import { sharedDashboardContent } from '@/lib/shared-content';

const onlineFlow = [
  'Traffic',
  'Funnels',
  'Upsell / Downsell',
  'Product / Download',
  'Confirmation email',
  'Follow-up sequence',
];

const manualFlow = [
  'Traffic',
  'Email or phone reach out',
  'First meeting',
  'Sale or second meeting',
  'Contract / Invoice',
];

export default function HowItAllFitsTogetherPage() {
  const section = sharedDashboardContent.howItFits;
  const dashboardInfo = sharedDashboardContent.dashboardInfo;
  const leadAutomation = sharedDashboardContent.leadAutomation;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">How it all fits together</h2>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Online funnels flow</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {onlineFlow.map((item, idx) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200">
                {item}
              </span>
              {idx < onlineFlow.length - 1 ? (
                <span className="text-green-400">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Manual call flow</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {manualFlow.map((item, idx) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200">
                {item}
              </span>
              {idx < manualFlow.length - 1 ? (
                <span className="text-green-400">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-white">Definitions</h3>
        <ul className="space-y-2">
          {section.definitions.map((item) => (
            <li
              key={item.term}
              className="rounded-md border border-slate-800 bg-slate-900/50 p-3"
            >
              <span className="font-semibold text-green-400">{item.term}</span>
              <span className="ml-2 text-sm text-slate-300">- {item.def}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-white">Dashboard snapshot</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardInfo.snapshotCards.map((card) => (
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
          {dashboardInfo.quickLinks.map((link) => (
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
          {dashboardInfo.activeFunnels.map((funnel) => (
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

      <section>
        <h3 className="mb-3 text-lg font-semibold text-white">Lead automation</h3>
        <p className="text-slate-400">
          All form submissions on this site post to <code>/api/lead</code> which
          handles CRM and notifications.
        </p>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Active integrations</h3>
        <ul className="space-y-3">
          {leadAutomation.integrations.map((item) => (
            <li key={item.title} className="border-b border-slate-800 pb-3 last:border-b-0">
              <p className="font-semibold text-green-400">{item.title}</p>
              <p className="text-sm text-slate-300">Status: {item.status}</p>
              <p className="text-sm text-slate-400">{item.detail}</p>
              <p className="text-sm text-slate-400">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Lead source tags</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {leadAutomation.sourceTags.map((tag) => (
            <div key={tag} className="rounded-md bg-slate-800 px-3 py-2 text-sm">
              <code>{tag}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">
          Environment variables (Vercel)
        </h3>
        <ul className="space-y-1 text-sm text-slate-300">
          {leadAutomation.envVars.map((envVar) => (
            <li key={envVar}>
              <code>{envVar}</code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
