import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripeApi';
import {
  ATTR_COOKIE,
  CHECKOUT_PRODUCTS,
  createCheckoutStart,
  parseAttributionCookie,
} from '@/lib/purchase-attribution';

export const runtime = 'nodejs';

function getSiteUrl(request: NextRequest) {
  // Prefer explicit env for prod; fallback to request origin for local dev.
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json().catch(() => ({}))) as {
      email?: string;
    };

    const siteUrl = getSiteUrl(request);
    const successUrl = `${siteUrl}/jan-31-bootcamp-paid/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/jan-31-bootcamp-paid/checkout`;

    const productId = process.env.STRIPE_JAN31_PRODUCT_ID;
    const priceId = process.env.STRIPE_JAN31_PRICE_ID;
    const product = CHECKOUT_PRODUCTS['jan-31-bootcamp-paid'];
    const attribution = parseAttributionCookie(request.cookies.get(ATTR_COOKIE)?.value);
    const checkoutStart = await createCheckoutStart({
      product,
      sourceUrl: request.headers.get('referer') || request.url,
      attribution,
    }).catch((err) => {
      console.error('Jan31 checkout attribution start failed:', err);
      return null;
    });
    const metadata = {
      funnel: 'jan-31-bootcamp-paid' as const,
      product_id: product.id,
      product_name: product.name,
      ...(checkoutStart ? { attribution_id: checkoutStart.id } : {}),
    };

    if (!productId && !priceId) {
      return NextResponse.json(
        { error: 'Missing STRIPE_JAN31_PRODUCT_ID or STRIPE_JAN31_PRICE_ID' },
        { status: 500 }
      );
    }

    const session = await createCheckoutSession(
      productId
        ? { productId, unitAmountCents: 9900, successUrl, cancelUrl, customerEmail: email, clientReferenceId: checkoutStart?.id, metadata }
        : { priceId: priceId!, successUrl, cancelUrl, customerEmail: email, clientReferenceId: checkoutStart?.id, metadata }
    );

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
