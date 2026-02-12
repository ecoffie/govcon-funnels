import { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from './CheckoutButton';

export const metadata: Metadata = {
  title: 'Checkout | Jan 31 Bootcamp Replay',
  description: 'Secure checkout for Jan 31 Bootcamp replay access.',
};

export default function Jan31PaidCheckoutPage() {
  const priceLabel = process.env.NEXT_PUBLIC_JAN31_PRICE_LABEL ?? '$99';

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/jan-31-bootcamp-paid"
            className="inline-block text-slate-400 hover:text-slate-200 text-sm mb-6"
          >
            ← Back to Jan 31 Bootcamp
          </Link>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Jan 31 Bootcamp Replay Access
            </h1>
            <p className="text-slate-400 mb-8">
              Complete recording + resources + chaptered lessons.
            </p>

            <div className="card">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div className="text-white font-semibold">Replay Access</div>
                <div className="text-2xl font-bold text-green-500">
                  {priceLabel}
                </div>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Full event replay
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Organized chapters
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Templates & handouts
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span> Lifetime access (as
                  long as the platform is live)
                </li>
              </ul>
            </div>
          </div>

          <div className="card green-glow">
            <h2 className="text-2xl font-bold text-white mb-2">
              Secure Checkout
            </h2>
            <p className="text-slate-400 mb-6">
              You’ll be redirected to Stripe to complete payment.
            </p>
            <CheckoutButton />
            <div className="mt-6 text-center text-xs text-slate-500">
              By purchasing, you agree this is a digital product and access is
              delivered immediately.
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center text-slate-600 text-sm">
          © 2026 GovCon Giants. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

