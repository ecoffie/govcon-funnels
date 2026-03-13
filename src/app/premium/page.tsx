import Link from 'next/link';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Premium GovCon Resources',
  description: 'Take the next step with premium training, consulting, and done-for-you support to win federal contracts.',
  path: '/premium',
  keywords: ['govcon premium training', 'government contracting consulting', 'federal contract support'],
});

const levels = [
  {
    id: 'training',
    label: 'Training',
    definition: 'You’re new to government contracting. You’ve started (or want to start) your SAM.gov registration and are learning the basics. You want structured training and a clear path to your first opportunity.',
    resources: [
      { title: 'Pro Member Group', desc: '$99/month. Ongoing support, community, live bootcamps, and training.', href: '/premium/pro-member-group', icon: '👑', badge: 'RECOMMENDED' },
      { title: 'Pro Member Plan', desc: '$997 one-time. Lifetime Training License, 4,000+ community, Success Guide, bootcamps.', href: '/premium/pro-member-plan', icon: '🎓' },
      { title: 'Jan 31 Bootcamp Replay', desc: 'Full replay plus handouts, lifetime access. One-time purchase.', href: '/jan-31-bootcamp-paid', icon: '📹' },
    ],
  },
  {
    id: 'consulting-101',
    label: 'Consulting (one-on-one)',
    definition: 'You’re past the basics. You’ve completed training, maybe attended bootcamps, and you’re ready to go deeper. You want lifetime access to materials and a community, or a structured program to get contract-ready.',
    resources: [
      { title: 'Consulting Pack', desc: '20 hours of one-on-one consulting support for strategy, opportunities, and execution.', href: '/premium/consulting-pack', icon: '🧠' },
      { title: 'Accelerator Program', desc: '90 days, 12 weekly 1:1 coaching sessions. Goal: contract-ready by completion.', href: '/premium/accelerator', icon: '⚡' },
    ],
  },
  {
    id: 'fractional-bd',
    label: 'White Glove Service (Done for You)',
    definition: 'You’re serious about winning and scaling. You want intensive coaching or hands-on business development support—someone in your corner to help you execute and win contracts.',
    resources: [
      { title: 'White Glove Service', desc: 'Premium fractional business development. Dedicated consultant, flexible retainers.', href: '/premium/white-glove', icon: '🤝', badge: 'RECOMMENDED' },
    ],
  },
];

export default function PremiumOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium <span className="text-green-500">Resources</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            Take the next step with paid training, community, and support. Here’s what we recommend at each level.
          </p>

          {levels.map((level) => (
            <div key={level.id} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-2">{level.label}</h2>
              <p className="text-slate-400 mb-6 max-w-2xl">{level.definition}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {level.resources.map((r) => (
                  <Link
                    key={r.href + r.title}
                    href={r.href}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition relative"
                  >
                    {r.badge && (
                      <span className="absolute -top-2 left-4 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {r.badge}
                      </span>
                    )}
                    <span className="text-2xl">{r.icon}</span>
                    <h3 className="text-lg font-bold text-white mt-3 mb-1">{r.title}</h3>
                    <p className="text-slate-500 text-sm mb-4">{r.desc}</p>
                    <span className="text-green-500 font-semibold text-sm">Learn More →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 text-center">
            <Link href="/" className="text-green-500 hover:text-green-400 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
