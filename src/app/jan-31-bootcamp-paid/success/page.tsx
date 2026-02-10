import Link from 'next/link';
import { cookies } from 'next/headers';
import { createAccessCookieValue } from '@/lib/accessToken';
import { retrieveCheckoutSession } from '@/lib/stripeApi';

export const runtime = 'nodejs';

export default async function Jan31PaidSuccessPage(props: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await props.searchParams;

  let isPaid = false;
  let sessionId: string | null = null;

  try {
    if (session_id) {
      const session = await retrieveCheckoutSession(session_id);
      sessionId = session.id;
      isPaid = session.payment_status === 'paid';
    }
  } catch {
    // handled below
  }

  if (isPaid && sessionId) {
    const value = createAccessCookieValue({
      scope: 'jan31',
      sessionId,
    });

    cookies().set('jan31_bootcamp_access', value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          {isPaid ? (
            <>
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                PAYMENT CONFIRMED
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                You&apos;re In.
              </h1>
              <p className="text-slate-300 mb-10">
                Your access has been unlocked. Click below to start watching
                the bootcamp replay.
              </p>
              <Link
                href="/jan-31-bootcamp-paid/course"
                className="btn-primary inline-block green-glow"
              >
                Go to the Course →
              </Link>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                UNABLE TO CONFIRM PAYMENT
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Let&apos;s Get You Set Up
              </h1>
              <p className="text-slate-300 mb-10">
                We couldn&apos;t verify your checkout session. If you just paid,
                wait a moment and refresh. Otherwise, head back to checkout.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/jan-31-bootcamp-paid/checkout"
                  className="btn-primary inline-block green-glow text-center"
                >
                  Back to Checkout →
                </Link>
                <Link
                  href="/"
                  className="inline-block text-center px-6 py-4 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Go Home
                </Link>
              </div>
              <p className="text-slate-500 text-sm mt-6">
                Tip: Make sure `STRIPE_SECRET_KEY`, `STRIPE_JAN31_PRICE_ID`, and
                `ACCESS_TOKEN_SECRET` are set.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

