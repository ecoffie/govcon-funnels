import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  CHECKOUT_PRODUCTS,
  getCheckoutStart,
  hasProcessedStripeEvent,
  markStripeEventProcessed,
  markCheckoutStatus,
  savePurchase,
  sendPurchaseSlackNotification,
  type AttributionState,
  type PurchaseRecord,
} from "@/lib/purchase-attribution";

export const runtime = "nodejs";

type StripeEvent = {
  id: string;
  type: string;
  created?: number;
  data: {
    object: StripeCheckoutSession | StripePaymentIntent;
  };
};

type StripeCheckoutSession = {
  id: string;
  object: "checkout.session";
  client_reference_id?: string | null;
  payment_status?: "paid" | "unpaid" | "no_payment_required";
  status?: "open" | "complete" | "expired";
  customer?: string | null;
  customer_email?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  payment_intent?: string | null;
  amount_total?: number | null;
  currency?: string | null;
  metadata?: Record<string, string> | null;
};

type StripePaymentIntent = {
  id: string;
  object: "payment_intent";
  amount?: number | null;
  currency?: string | null;
  customer?: string | null;
  metadata?: Record<string, string> | null;
  last_payment_error?: {
    message?: string | null;
  } | null;
};

function verifyStripeSignature(payload: string, signatureHeader: string | null): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=", 2);
      return [key, value];
    }),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function statusForSession(session: StripeCheckoutSession, eventType: string): PurchaseRecord["status"] {
  if (eventType.includes("failed")) return "failed";
  if (session.payment_status === "paid" || session.payment_status === "no_payment_required") return "paid";
  if (session.status === "open") return "open";
  return "unknown";
}

async function recordCheckoutSession(event: StripeEvent, session: StripeCheckoutSession) {
  const attributionId = session.client_reference_id || session.metadata?.attribution_id || null;
  const checkoutStart = await getCheckoutStart(attributionId);
  const product = checkoutStart
    ? CHECKOUT_PRODUCTS[checkoutStart.product_id]
    : undefined;
  const status = statusForSession(session, event.type);
  const record: PurchaseRecord = {
    id: session.id,
    event_id: event.id,
    event_type: event.type,
    status,
    product_id: checkoutStart?.product_id || session.metadata?.product_id || "unknown",
    product_name: checkoutStart?.product_name || product?.name || session.metadata?.product_name || "Unknown Stripe Checkout",
    product_price: checkoutStart?.product_price || product?.priceLabel,
    amount_cents: session.amount_total ?? checkoutStart?.amount_cents ?? product?.amountCents,
    currency: session.currency ?? undefined,
    customer_email: session.customer_details?.email || session.customer_email || undefined,
    customer_name: session.customer_details?.name || undefined,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent ?? undefined,
    stripe_customer_id: typeof session.customer === "string" ? session.customer : undefined,
    attribution_id: attributionId ?? undefined,
    attribution: checkoutStart?.attribution as AttributionState | undefined,
    created_at: new Date().toISOString(),
    raw_created: event.created,
  };

  await savePurchase(record);
  if (attributionId) await markCheckoutStatus(attributionId, status === "failed" ? "failed" : "completed");
  await sendPurchaseSlackNotification(record);
}

async function recordPaymentIntent(event: StripeEvent, paymentIntent: StripePaymentIntent) {
  const record: PurchaseRecord = {
    id: paymentIntent.id,
    event_id: event.id,
    event_type: event.type,
    status: event.type.includes("failed") ? "failed" : "unknown",
    product_id: paymentIntent.metadata?.product_id || "unknown",
    product_name: paymentIntent.metadata?.product_name || "Unknown Stripe Payment",
    amount_cents: paymentIntent.amount ?? undefined,
    currency: paymentIntent.currency ?? undefined,
    stripe_payment_intent_id: paymentIntent.id,
    stripe_customer_id: typeof paymentIntent.customer === "string" ? paymentIntent.customer : undefined,
    attribution_id: paymentIntent.metadata?.attribution_id,
    created_at: new Date().toISOString(),
    raw_created: event.created,
  };

  await savePurchase(record);
  await sendPurchaseSlackNotification(record);
}

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!verifyStripeSignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (await hasProcessedStripeEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const object = event.data.object;
  try {
    if (
      object.object === "checkout.session" &&
      [
        "checkout.session.completed",
        "checkout.session.async_payment_succeeded",
        "checkout.session.async_payment_failed",
        "checkout.session.expired",
      ].includes(event.type)
    ) {
      await recordCheckoutSession(event, object);
    } else if (
      object.object === "payment_intent" &&
      ["payment_intent.payment_failed"].includes(event.type)
    ) {
      await recordPaymentIntent(event, object);
    }
  } catch (err) {
    console.error("Stripe webhook processing failed:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  await markStripeEventProcessed(event.id);
  return NextResponse.json({ received: true });
}
