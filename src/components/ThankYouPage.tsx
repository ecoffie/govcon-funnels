import Link from 'next/link';

interface ThankYouPageProps {
  title: string;
  message: string;
  nextSteps?: string[];
  upsellTitle?: string;
  upsellDescription?: string;
  upsellLink?: string;
  upsellButtonText?: string;
}

export default function ThankYouPage({
  title,
  message,
  nextSteps = [],
  upsellTitle = "Want to Fast-Track Your Success?",
  upsellDescription = "Join GovCon Giants Pro for exclusive tools, live bootcamps, and weekly Q&A calls.",
  upsellLink = "https://shop.govcongiants.org",
  upsellButtonText = "Get Pro Access - $99/month"
}: ThankYouPageProps) {
  return (
    <main className="min-h-screen section">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-slate-300 mb-8">{message}</p>

        {/* Next Steps */}
        {nextSteps.length > 0 && (
          <div className="card text-left mb-12">
            <h2 className="font-bold text-lg mb-4">What&apos;s Next?</h2>
            <ol className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Upsell Section */}
        <div className="card green-glow">
          <h2 className="text-2xl font-bold mb-4">{upsellTitle}</h2>
          <p className="text-slate-300 mb-6">{upsellDescription}</p>
          <div className="space-y-4">
            <Link
              href={upsellLink}
              className="btn-primary block"
            >
              {upsellButtonText}
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
