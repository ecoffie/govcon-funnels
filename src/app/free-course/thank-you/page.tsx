import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "You're In! Access Your Free Course | GovCon Giants",
  description: 'Your free 12-day government contracting course is ready. Start learning now!',
};

export default function FreeCourseThankYou() {
  return (
    <main className="min-h-screen bg-slate-950 section">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">You&apos;re In! 🎉</h1>
        <p className="text-xl text-slate-300 mb-8">
          Your free 12-day government contracting course is ready. Click below to start learning!
        </p>

        {/* Access Course Button */}
        <div className="card green-glow mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Free Course Now</h2>
          <p className="text-slate-400 mb-6">
            12 video lessons that will teach you everything you need to know to get started in government contracting.
          </p>
          <a
            href="/free-course/course"
            className="btn-primary block w-full text-center green-glow"
          >
            Access Your Free Course →
          </a>
        </div>

        {/* Next Steps */}
        <div className="card text-left mb-8">
          <h2 className="font-bold text-lg text-white mb-4">What&apos;s Next?</h2>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </span>
              <span className="text-slate-300">Watch Day 1: What is a Government Contract?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </span>
              <span className="text-slate-300">Complete one lesson per day for best results</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </span>
              <span className="text-slate-300">Check your email for additional resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </span>
              <span className="text-slate-300">Share your progress with #GovConGiants</span>
            </li>
          </ol>
        </div>

        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
