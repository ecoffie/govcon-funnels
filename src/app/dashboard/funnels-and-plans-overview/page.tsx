import { sharedDashboardContent } from '@/lib/shared-content';

export default function FunnelsAndPlansOverviewPage() {
  const funnels = sharedDashboardContent.funnelsLeadFlow;
  const plans = sharedDashboardContent.plansOverview;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">
          Funnels and Plans Overview
        </h2>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-white">How lead capture works</h3>
        <p className="mb-3 text-slate-400">
          All forms use the <code>LeadForm</code> component which posts to{' '}
          <code>/api/lead</code>.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {funnels.leadCaptureSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-green-900/40 bg-slate-900/70 p-5">
        <h3 className="mb-3 text-lg font-semibold text-green-400">
          Testing lead automation
        </h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {funnels.testingSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-400">
          View function logs in{' '}
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener"
            className="text-green-400 hover:underline"
          >
            Vercel Dashboard
          </a>{' '}
          for debugging.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold text-white">Active funnels and pages</h3>
        <p className="mb-3 text-sm text-slate-400">
          All active lead capture pages and funnels. Source tags in parentheses.
        </p>
        <ul className="grid list-disc gap-1 pl-6 md:grid-cols-2">
          {funnels.activeFunnels.map((funnel) => (
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
        <h3 className="mb-3 text-lg font-semibold text-white">Plans overview</h3>
        <p className="text-slate-400">{plans.intro}</p>
      </section>

      {plans.levels.map((level) => (
        <section key={level.title} className="space-y-3">
          <h4 className="text-xl font-semibold text-green-400">{level.title}</h4>
          <p className="text-sm text-slate-400">{level.description}</p>
          <div className="space-y-3">
            {level.cards.map((card) => (
              <a
                key={card.title}
                href={card.link}
                target="_blank"
                rel="noopener"
                className="block rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-green-600/50"
              >
                <p className="text-lg font-semibold text-white">{card.title}</p>
                <p className="text-sm text-slate-300">{card.price}</p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-medium text-slate-200">Where sold:</span>{' '}
                  {card.whereSold}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  <span className="font-medium text-slate-300">After signup:</span>{' '}
                  {card.afterSignup}
                </p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
