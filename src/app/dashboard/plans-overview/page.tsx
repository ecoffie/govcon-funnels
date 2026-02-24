import { sharedDashboardContent } from '@/lib/shared-content';

export default function PlansOverviewPage() {
  const section = sharedDashboardContent.plansOverview;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Plans overview</h2>
        <p className="text-slate-400">{section.intro}</p>
      </section>

      {section.levels.map((level) => (
        <section key={level.title} className="space-y-3">
          <h3 className="text-xl font-semibold text-green-400">{level.title}</h3>
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
