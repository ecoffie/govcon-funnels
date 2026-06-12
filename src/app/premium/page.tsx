import Link from 'next/link';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Federal BD Services',
  description: 'Training, coaching, and done-for-you business development to help you win federal contracts. Find the right level of support for where you are.',
  path: '/premium',
  keywords: ['federal BD services', 'govcon consulting', 'government contracting coaching', 'federal contract support', 'fractional BD'],
});

export default function PremiumOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-950">

      {/* S1 — Hero */}
      <section className="py-20 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-500 font-semibold text-sm uppercase tracking-widest mb-4">
            Federal BD Services
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Work With Us
          </h1>
          <div className="text-lg text-slate-400 space-y-2 mb-10 max-w-2xl mx-auto">
            <p>New to GovCon and need a clear starting point?</p>
            <p>Growing a business and need coaching to break through?</p>
            <p>Ready to scale and need BD done for you?</p>
          </div>
          <a
            href="#qualifier"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition text-lg"
          >
            See What Fits →
          </a>
        </div>
      </section>

      {/* S2 — Qualifier Cards */}
      <section id="qualifier" className="py-16 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Where Are You Right Now?</h2>
          <p className="text-slate-400 text-center mb-10">Pick the one that fits — we'll point you to the right level of support.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#tier-training"
              className="block bg-slate-800 border border-slate-700 hover:border-green-600/60 rounded-xl p-6 transition group"
            >
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition">Just Starting Out</h3>
              <p className="text-slate-400 text-sm mb-4">New to government contracting. You want structured training, a clear path, and a community around you.</p>
              <span className="text-green-500 text-sm font-semibold">→ Training</span>
            </a>
            <a
              href="#tier-consulting"
              className="block bg-slate-800 border border-slate-700 hover:border-green-600/60 rounded-xl p-6 transition group"
            >
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition">Building Systems</h3>
              <p className="text-slate-400 text-sm mb-4">You've done some training. Now you want 1:1 coaching to get contract-ready and build a real pipeline.</p>
              <span className="text-green-500 text-sm font-semibold">→ Consulting</span>
            </a>
            <a
              href="#tier-whiteglove"
              className="block bg-slate-800 border border-slate-700 hover:border-green-600/60 rounded-xl p-6 transition group"
            >
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition">Need BD Done For You</h3>
              <p className="text-slate-400 text-sm mb-4">Running a business. You need a dedicated BD partner — someone to execute alongside you, not just advise.</p>
              <span className="text-green-500 text-sm font-semibold">→ White Glove</span>
            </a>
          </div>
        </div>
      </section>

      {/* S3 — Three Tiers Intro */}
      <section className="py-16 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Three Ways We Help</h2>
          <p className="text-slate-400 text-center mb-10">
            Learn it yourself. Have us coach you through it. Or have us just do it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-white font-bold text-lg mb-2">Learn It Yourself</h3>
              <p className="text-slate-400 text-sm">Self-paced training, community access, and live bootcamps to build your foundation.</p>
            </div>
            <div className="bg-slate-900 border border-green-800/40 rounded-xl p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-white font-bold text-lg mb-2">We Coach You</h3>
              <p className="text-slate-400 text-sm">1:1 coaching and consulting to get you contract-ready and build a real federal pipeline.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-white font-bold text-lg mb-2">We Do It For You</h3>
              <p className="text-slate-400 text-sm">Dedicated fractional BD support. We operate as an extension of your company.</p>
            </div>
          </div>
        </div>
      </section>

      {/* S4 — Tier 1: Training */}
      <section id="tier-training" className="py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-500 font-semibold text-sm uppercase tracking-widest mb-3">Tier 1</p>
          <h2 className="text-3xl font-bold text-white mb-2">Training</h2>
          <p className="text-slate-400 max-w-2xl mb-10">
            You're new to government contracting. You've started (or want to start) your SAM.gov registration and are learning the basics. You want structured training and a clear path to your first opportunity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/premium/pro-member-group"
              className="bg-slate-800 border border-green-600/50 rounded-xl p-6 block hover:border-green-500 transition relative"
            >
              <span className="absolute -top-2 left-4 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                RECOMMENDED
              </span>
              <span className="text-2xl">👑</span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Pro Member Group</h3>
              <p className="text-green-400 font-semibold text-sm mb-2">$99/month</p>
              <p className="text-slate-400 text-sm mb-4">Ongoing support, 4,000+ community, live bootcamps, and regular training. The best way to stay accountable and keep moving.</p>
              <span className="text-green-500 font-semibold text-sm">Join the Community →</span>
            </Link>
            <Link
              href="/premium/pro-member-plan"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 block hover:border-green-600/50 transition"
            >
              <span className="text-2xl">🎓</span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Pro Member Plan</h3>
              <p className="text-green-400 font-semibold text-sm mb-2">$997 one-time</p>
              <p className="text-slate-400 text-sm mb-4">Lifetime Training License, 4,000+ member community, Step-by-Step Success Guide, First Partner Bootcamp, and Proposal Bootcamp. Own it forever.</p>
              <span className="text-green-500 font-semibold text-sm">Get Lifetime Access →</span>
            </Link>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">Not sure yet?</span> Start with the{' '}
              <Link href="/jan-31-bootcamp-paid" className="text-green-500 hover:text-green-400 underline">
                January Bootcamp Replay
              </Link>{' '}
              — full replay plus handouts, lifetime access. A low-commitment first step.
            </p>
          </div>
        </div>
      </section>

      {/* S5 — Tier 2: Consulting */}
      <section id="tier-consulting" className="py-20 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-500 font-semibold text-sm uppercase tracking-widest mb-3">Tier 2</p>
          <h2 className="text-3xl font-bold text-white mb-2">Consulting</h2>
          <p className="text-slate-400 max-w-2xl mb-10">
            You're past the basics. You want procurement readiness — a dedicated program or flexible consulting hours to build your strategy, identify opportunities, and execute. Let's get you contract-ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/premium/accelerator"
              className="bg-slate-800 border border-green-600/50 rounded-xl p-6 block hover:border-green-500 transition relative"
            >
              <span className="absolute -top-2 left-4 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                RECOMMENDED
              </span>
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">90-Day Accelerator</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-green-400 font-bold text-lg">$749/mo</p>
                <p className="text-slate-500 text-sm">($5,997 total)</p>
              </div>
              <p className="text-slate-400 text-sm mb-4">12 weekly 1:1 coaching sessions. Access to the Lifetime Program. Goal: contract-ready by completion. The most direct path to your first federal win.</p>
              <span className="text-green-500 font-semibold text-sm">Apply Now →</span>
            </Link>
            <Link
              href="/premium/consulting-pack"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 block hover:border-green-600/50 transition"
            >
              <span className="text-2xl">🧠</span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Consulting Pack</h3>
              <p className="text-green-400 font-semibold text-sm mb-2">20 Hours — Flexible</p>
              <p className="text-slate-400 text-sm mb-4">20 hours of 1:1 consulting focused on your federal growth strategy, target opportunities, proposal reviews, and execution plan. Use the hours as you need them.</p>
              <span className="text-green-500 font-semibold text-sm">Book Consulting →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* S6 — Tier 3: White Glove */}
      <section id="tier-whiteglove" className="py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-500 font-semibold text-sm uppercase tracking-widest mb-3">Tier 3</p>
          <h2 className="text-3xl font-bold text-white mb-2">White Glove Service</h2>
          <p className="text-slate-400 max-w-2xl mb-4">
            We become an extension of your company. A dedicated consultant handles your federal BD — market research, opportunity identification, teaming, and pipeline development — so you can focus on running your business.
          </p>
          <div className="bg-green-900/20 border border-green-800/40 rounded-lg px-5 py-4 mb-10 max-w-2xl">
            <p className="text-green-300 text-sm italic">
              "Once clients understand we're operating as part of their team — not just advising — they stop asking about deliverables and start asking about targets."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Starter', price: '$4,000/mo', desc: 'Market research, opportunity identification, and pipeline setup.' },
              { label: 'Growth', price: '$6,000/mo', desc: 'All of Starter plus teaming strategy and capability statement support.' },
              { label: 'Scale', price: '$8,000/mo', desc: 'All of Growth plus proposal support and agency outreach.' },
              { label: 'Enterprise', price: '$10,000+/mo', desc: 'Full fractional BD — strategy, execution, and dedicated consultant time.' },
            ].map((tier) => (
              <div key={tier.label} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-bold mb-1">{tier.label}</h3>
                <p className="text-green-400 font-semibold text-sm mb-3">{tier.price}</p>
                <p className="text-slate-400 text-xs">{tier.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/premium/white-glove"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition"
          >
            Learn More About White Glove →
          </Link>
        </div>
      </section>

      {/* S7 — Objection Busters */}
      <section className="py-20 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Common Questions</h2>
          <p className="text-slate-400 text-center mb-10">Straight answers before you commit to anything.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-3">Burned by consultants before?</h3>
              <p className="text-slate-400 text-sm">
                We get it. Most GovCon consultants sell hope. We sell a process. Every engagement starts with an honest assessment — if we don't think we can help you win, we'll tell you before you spend a dollar.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-3">How long does it take to win a contract?</h3>
              <p className="text-slate-400 text-sm">
                It depends on your starting point, but most of our clients are pursuing opportunities within 90 days. Winning your first award typically takes 6–18 months. We focus on getting you in the pipeline fast.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-3">What do you actually deliver?</h3>
              <p className="text-slate-400 text-sm">
                Concrete outputs: target opportunity lists, capability statement reviews, teaming introductions, proposal feedback, agency research. Not advice decks — actual work product you can act on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* S8 — Not Ready Yet? */}
      <section className="py-16 px-6 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Not Ready to Invest Yet?</h2>
          <p className="text-slate-400 mb-8">Start with our free tools. They're the same resources we reference in every paid engagement.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/free-course/action-plan"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 block hover:border-green-600/50 transition text-left"
            >
              <div className="text-2xl mb-3">📋</div>
              <h3 className="text-white font-bold mb-1">Free Action Plan</h3>
              <p className="text-slate-400 text-sm mb-3">The exact first steps to start positioning your business for federal contracts.</p>
              <span className="text-green-500 font-semibold text-sm">Download Now →</span>
            </Link>
            <Link
              href="/mi-free"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 block hover:border-green-600/50 transition text-left"
            >
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="text-white font-bold mb-1">Free Mindy</h3>
              <p className="text-slate-400 text-sm mb-3">Find agencies and contracts by NAICS code and keywords with free searches.</p>
              <span className="text-green-500 font-semibold text-sm">Try It Free →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* S9 — Book the Call */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start with a conversation.</h2>
          <p className="text-lg text-slate-400 mb-10">
            That call doesn't cost you anything. It just gives you real clarity on whether this makes sense for you.
          </p>
          <a
            href="mailto:hello@govconedu.com"
            className="inline-block px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition text-lg green-glow"
          >
            Schedule a Call →
          </a>
        </div>
      </section>

    </main>
  );
}
