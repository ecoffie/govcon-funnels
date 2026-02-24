import { sharedDashboardContent } from '@/lib/shared-content';

export default function LeadAutomationPage() {
  const section = sharedDashboardContent.leadAutomation;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Lead automation</h2>
        <p className="text-slate-400">
          All form submissions on this site post to <code>/api/lead</code> which
          handles CRM and notifications.
        </p>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Active integrations</h3>
        <ul className="space-y-3">
          {section.integrations.map((item) => (
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
          {section.sourceTags.map((tag) => (
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
          {section.envVars.map((envVar) => (
            <li key={envVar}>
              <code>{envVar}</code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
