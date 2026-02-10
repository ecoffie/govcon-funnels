'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/jan31/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to start checkout');
      }
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={startCheckout}
        disabled={isLoading}
        className="btn-primary w-full green-glow disabled:opacity-50"
      >
        {isLoading ? 'Redirecting to Stripe...' : 'Pay $99 & Get Instant Access →'}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
      )}
      <p className="mt-3 text-center text-sm text-slate-400">
        Secure payment powered by Stripe.
      </p>
    </div>
  );
}

