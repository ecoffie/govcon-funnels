import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GovCon Bootcamps & Training | GovCon Giants',
  description: 'Live bootcamps and training to help you win federal contracts. January Bootcamp, Surge Bootcamp, Bid Bootcamp, and more.',
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GovCon <span className="text-green-500">Bootcamps & Training</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            We run live bootcamps and on-demand training so you can learn exactly what you need—from getting registered to winning your first contract.
          </p>

          <div className="space-y-12">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🎓</span>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">January Bootcamp</h2>
                  <p className="text-slate-400 mb-4">
                    Monthly live training with Q&A to help you start your GovCon journey. Get a clear roadmap, ask questions, and connect with other contractors.
                  </p>
                  <Link href="/bootcamp" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition">
                    Register Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🔥</span>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Surge Bootcamp</h2>
                  <p className="text-slate-400 mb-4">
                    Q4 federal spending focus. Learn how to capture end-of-year opportunities when agencies are under pressure to spend their budgets.
                  </p>
                  <Link href="/surge" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition">
                    Access Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">📅</span>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Bid Bootcamp Downloads</h2>
                  <p className="text-slate-400 mb-4">
                    Get bid forms and event details for our live bootcamps. Specifics and Proposals training—everything you need to show up prepared.
                  </p>
                  <Link href="/feb-28-bootcamp" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition">
                    Get Bid Forms →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">📚</span>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Beginner&apos;s Course</h2>
                  <p className="text-slate-400 mb-4">
                    Free 12-day curriculum from SAM.gov registration to landing your first contract. Start at your own pace and build a solid foundation.
                  </p>
                  <Link href="/free-course" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition">
                    Start Learning →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/resources" className="text-green-500 hover:text-green-400 font-semibold">
              ← Back to Free Resource Library
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
