import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'One-Time Offer - Federal Help Center Pro | GovCon Giants',
  description: 'Get full access to the live bootcamp with Pro membership. Includes live training, Q&A, workshops, and recordings.',
};

export default function BootcampUpsell() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6 border-b border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-500 font-medium">Step 2 of 3</span>
            <span className="text-slate-500">Almost there!</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Wait Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-900/50 border border-amber-700/50 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚠️</span> WAIT! Your Registration is NOT Complete
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              You&apos;re Registered, But There&apos;s a Catch...
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed">
              The bootcamp is FREE, but you need to be a <span className="text-green-500 font-semibold">Federal Help Center Pro Member</span> to attend live and get the full experience.
            </p>
          </div>

          {/* Video */}
          <div className="mb-10">
            <div className="aspect-video rounded-xl overflow-hidden border border-slate-800">
              <iframe
                src="https://player.vimeo.com/video/1150980959?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                className="w-full h-full"
                title="Pro Member Group"
              ></iframe>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Free Registration */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-slate-500 text-sm font-medium mb-2">WITHOUT PRO MEMBERSHIP</div>
              <h3 className="text-xl font-bold text-white mb-4">Free Registration</h3>
              <ul className="space-y-3 text-slate-500">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>5 Free Handouts (instant download)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Live bootcamp access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Q&A with experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Live workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Recording access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Community access</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="text-slate-600 text-sm">Handouts only</div>
              </div>
            </div>

            {/* Pro Membership */}
            <div className="bg-slate-900 border-2 border-green-600 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <div className="text-green-500 text-sm font-medium mb-2">WITH PRO MEMBERSHIP</div>
              <h3 className="text-xl font-bold text-white mb-4">Full Bootcamp Access</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>5 Free Handouts (instant download)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>LIVE</strong> 8-hour bootcamp access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Direct Q&A with GovCon experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Hands-on workshops (build YOUR plan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Full recording for lifetime access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Private community + future bootcamps</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="text-green-500 text-sm">Monthly or annual options available</div>
              </div>
            </div>
          </div>

          {/* What Pro Members Get */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">What You Get as a Pro Member</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-white text-sm font-medium">Pro Member Group</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📅</div>
                <div className="text-white text-sm font-medium">Monthly Bootcamps</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white text-sm font-medium">Opportunity Hunter Pro</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📚</div>
                <div className="text-white text-sm font-medium">Mini Courses</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🎬</div>
                <div className="text-white text-sm font-medium">Bootcamp Replays</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📹</div>
                <div className="text-white text-sm font-medium">Webinar Replays</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <a
              href="https://federalhelpcenter.com/pro"
              target="_blank"
              rel="noopener noreferrer"
              className="green-glow block w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg text-center transition-all"
            >
              Yes! Join Pro
            </a>

            <a
              href="https://federalhelpcenter.com/pro-annual"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg text-center transition-all border border-slate-700"
            >
              Get Annual (Save More)
            </a>

            <Link
              href="/bootcamp/downsell"
              className="block w-full py-3 text-slate-500 hover:text-slate-400 text-sm text-center transition-all"
            >
              No thanks, show me other options →
            </Link>
          </div>

          {/* Guarantee */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>30-day money-back guarantee • Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">
            © 2026 GovCon Giants. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
