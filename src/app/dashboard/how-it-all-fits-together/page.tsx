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
    </div>
  );
}
