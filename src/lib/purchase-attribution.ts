import { Redis } from "@upstash/redis";

const NS = "gfd:purchase";
export const ATTR_COOKIE = "gca_attr";

// Which property this deployment represents. Tags every record so a single
// shared Upstash DB can hold purchases from both govcongiants.com ("gcg") and
// getmindy.ai ("mindy") and the dashboard can show them in one unified view.
export const SITE = process.env.PURCHASE_SITE || "gcg";

let redisClient: Redis | null = null;

// Vercel forces a variable prefix when connecting a store that's already linked
// to another project, so the shared market-assassin-codes store injects
// STORAGE_KV_REST_API_* here. Accept the prefixed names first, then fall back to
// the unprefixed defaults so the lib stays portable.
function getRedis(): Redis {
  const url = process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL;
  const token = process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error(
      "KV_REST_API_URL/TOKEN (or STORAGE_KV_REST_API_URL/TOKEN) are required for purchase attribution",
    );
  }
  if (!redisClient) redisClient = new Redis({ url, token });
  return redisClient;
}

export type CheckoutProduct = {
  id: string;
  name: string;
  priceLabel: string;
  amountCents?: number;
  checkoutUrl: string;
  type: "stripe_payment_link" | "external";
};

export const CHECKOUT_PRODUCTS: Record<string, CheckoutProduct> = {
  "mindy-pro-monthly": {
    id: "mindy-pro-monthly",
    name: "Mindy Pro Monthly",
    priceLabel: "$149/mo",
    amountCents: 14900,
    checkoutUrl: "https://buy.stripe.com/dRmfZi9UO3MS20RdpefnO0C",
    type: "stripe_payment_link",
  },
  "mindy-pro-annual": {
    id: "mindy-pro-annual",
    name: "Mindy Pro Annual",
    priceLabel: "$1,490/yr",
    amountCents: 149000,
    checkoutUrl: "https://buy.stripe.com/eVqfZi5Eydns0WNgBqfnO0D",
    type: "stripe_payment_link",
  },
  "pro-member-plan": {
    id: "pro-member-plan",
    name: "Pro Member Plan",
    priceLabel: "$997 one-time",
    amountCents: 99700,
    checkoutUrl: "https://buy.stripe.com/fZuaEYaKY4QWbBr26W",
    type: "stripe_payment_link",
  },
  "ultimate-giant-bundle": {
    id: "ultimate-giant-bundle",
    name: "Ultimate Giant Bundle",
    priceLabel: "$1,497 one-time",
    amountCents: 149700,
    checkoutUrl: "https://shop.govcongiants.com/bundles/ultimate",
    type: "external",
  },
  "jan-31-bootcamp-paid": {
    id: "jan-31-bootcamp-paid",
    name: "Jan 31 Bootcamp Paid",
    priceLabel: "$99 one-time",
    amountCents: 9900,
    checkoutUrl: "/jan-31-bootcamp-paid/checkout",
    type: "external",
  },
};

export type AttributionTouch = {
  url?: string;
  path?: string;
  referrer?: string;
  captured_at?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
};

export type AttributionState = {
  first_touch?: AttributionTouch;
  last_touch?: AttributionTouch;
  visit_count?: number;
};

export type CheckoutStart = {
  id: string;
  product_id: string;
  product_name: string;
  product_price: string;
  amount_cents?: number;
  checkout_type: CheckoutProduct["type"];
  status: "started" | "completed" | "failed";
  created_at: string;
  updated_at: string;
  source_url: string;
  attribution: AttributionState;
};

export type PurchaseRecord = {
  id: string;
  site?: string;
  event_id: string;
  event_type: string;
  status: "paid" | "failed" | "open" | "unknown";
  product_id: string;
  product_name: string;
  product_price?: string;
  amount_cents?: number;
  currency?: string;
  customer_email?: string;
  customer_name?: string;
  stripe_checkout_session_id?: string;
  stripe_payment_intent_id?: string;
  stripe_customer_id?: string;
  attribution_id?: string;
  attribution?: AttributionState;
  created_at: string;
  raw_created?: number;
};

const KNOWN_SITES = Array.from(new Set([SITE, "gcg", "mindy"]));

// Per-record purchase keys are site-scoped so IDs can never collide across
// properties. The purchases index set is SHARED (no site segment) so the unified
// dashboard reads every property in one pass; each member is stored as
// "<site>:<id>" so the reader knows which site-scoped key to fetch.
const key = {
  checkout: (id: string) => `${NS}:${SITE}:checkout:${id}`,
  checkoutForSite: (site: string, id: string) => `${NS}:${site}:checkout:${id}`,
  checkoutGlobal: (id: string) => `${NS}:checkout:${id}`,
  purchase: (site: string, id: string) => `${NS}:${site}:purchase:${id}`,
  purchaseLegacy: (id: string) => `${NS}:purchase:${id}`,
  purchases: () => `${NS}:purchases`,
  event: (id: string) => `${NS}:stripe-event:${id}`,
  eventForSite: (site: string, id: string) => `${NS}:${site}:stripe-event:${id}`,
};

function safeString(input: unknown, max = 500): string | undefined {
  if (input === null || input === undefined || input === "") return undefined;
  return String(input).slice(0, max);
}

export function parseAttributionCookie(raw: string | undefined | null): AttributionState {
  if (!raw) return {};
  try {
    return JSON.parse(decodeURIComponent(raw)) as AttributionState;
  } catch {
    try {
      return JSON.parse(raw) as AttributionState;
    } catch {
      return {};
    }
  }
}

export function attributionSummary(attribution?: AttributionState): {
  first_source?: string;
  first_medium?: string;
  first_campaign?: string;
  last_source?: string;
  last_medium?: string;
  last_campaign?: string;
  landing_page?: string;
  last_page?: string;
  referrer?: string;
} {
  const first = attribution?.first_touch ?? {};
  const last = attribution?.last_touch ?? {};
  return {
    first_source: safeString(first.utm_source, 100),
    first_medium: safeString(first.utm_medium, 100),
    first_campaign: safeString(first.utm_campaign, 150),
    last_source: safeString(last.utm_source, 100),
    last_medium: safeString(last.utm_medium, 100),
    last_campaign: safeString(last.utm_campaign, 150),
    landing_page: safeString(first.path || first.url, 500),
    last_page: safeString(last.path || last.url, 500),
    referrer: safeString(first.referrer || last.referrer, 500),
  };
}

export function buildStripeRedirectUrl(product: CheckoutProduct, attributionId: string): string {
  const url = new URL(product.checkoutUrl);
  url.searchParams.set("client_reference_id", attributionId);
  url.searchParams.set("gcaid", attributionId);
  return url.toString();
}

export async function createCheckoutStart(args: {
  product: CheckoutProduct;
  sourceUrl: string;
  attribution: AttributionState;
}): Promise<CheckoutStart> {
  const now = new Date().toISOString();
  const record: CheckoutStart = {
    id: crypto.randomUUID(),
    product_id: args.product.id,
    product_name: args.product.name,
    product_price: args.product.priceLabel,
    amount_cents: args.product.amountCents,
    checkout_type: args.product.type,
    status: "started",
    created_at: now,
    updated_at: now,
    source_url: args.sourceUrl,
    attribution: args.attribution,
  };

  const r = getRedis();
  await r.set(key.checkout(record.id), record, { ex: 180 * 24 * 60 * 60 });
  await r.set(key.checkoutGlobal(record.id), record, { ex: 180 * 24 * 60 * 60 });
  return record;
}

export async function getCheckoutStart(id: string | undefined | null): Promise<CheckoutStart | null> {
  if (!id) return null;
  const r = getRedis();
  const lookupKeys = [
    key.checkout(id),
    key.checkoutGlobal(id),
    ...KNOWN_SITES.map((site) => key.checkoutForSite(site, id)),
  ];

  for (const lookupKey of Array.from(new Set(lookupKeys))) {
    const record = await r.get<CheckoutStart>(lookupKey);
    if (record) return record;
  }

  return null;
}

export async function markCheckoutStatus(id: string, status: CheckoutStart["status"]) {
  const existing = await getCheckoutStart(id);
  if (!existing) return;
  const r = getRedis();
  const updated = { ...existing, status, updated_at: new Date().toISOString() };
  const lookupKeys = Array.from(
    new Set([
      key.checkout(id),
      key.checkoutGlobal(id),
      ...KNOWN_SITES.map((site) => key.checkoutForSite(site, id)),
    ]),
  );
  await Promise.all(
    lookupKeys.map(async (lookupKey) => {
      const shouldWrite =
        lookupKey === key.checkout(id) ||
        lookupKey === key.checkoutGlobal(id) ||
        !!(await r.get<CheckoutStart>(lookupKey));
      if (shouldWrite) {
        await r.set(lookupKey, updated, { ex: 180 * 24 * 60 * 60 });
      }
    }),
  );
}

export async function hasProcessedStripeEvent(eventId: string): Promise<boolean> {
  const r = getRedis();
  const lookupKeys = [
    key.event(eventId),
    ...KNOWN_SITES.map((site) => key.eventForSite(site, eventId)),
  ];

  for (const lookupKey of Array.from(new Set(lookupKeys))) {
    const existing = await r.get<string>(lookupKey);
    if (existing) return true;
  }

  return false;
}

export async function markStripeEventProcessed(eventId: string): Promise<void> {
  const r = getRedis();
  await r.set(key.event(eventId), "1", { ex: 30 * 24 * 60 * 60 });
}

export async function savePurchase(record: PurchaseRecord): Promise<void> {
  const r = getRedis();
  const site = record.site || SITE;
  const stamped: PurchaseRecord = { ...record, site };
  await r.set(key.purchase(site, stamped.id), stamped);
  // Index member encodes the site so the shared dashboard can resolve the
  // site-scoped record key without scanning every namespace.
  await r.sadd(key.purchases(), `${site}:${stamped.id}`);
}

export type PurchaseReport = {
  generated_at: string;
  totals: {
    count: number;
    paid_count: number;
    failed_count: number;
    other_count: number;
    paid_revenue_cents: number;
  };
  by_site: Array<{ site: string; count: number; paid_count: number; paid_revenue_cents: number }>;
  by_source: Array<{ source: string; count: number; paid_count: number; paid_revenue_cents: number }>;
  by_product: Array<{ product_id: string; product_name: string; count: number; paid_count: number; paid_revenue_cents: number }>;
  purchases: PurchaseRecord[];
};

export async function listPurchases(limit = 500): Promise<PurchaseRecord[]> {
  const r = getRedis();
  const members = await r.smembers(key.purchases());
  if (!members.length) return [];
  const records: Array<PurchaseRecord | null> = await Promise.all(
    members.map(async (member) => {
      // Members are "<site>:<id>". Legacy members (pre-namespacing) have no
      // ":" and their records live at the original unscoped purchase key.
      const idx = member.indexOf(":");
      if (idx === -1) {
        const legacy = await r.get<PurchaseRecord>(key.purchaseLegacy(member));
        if (legacy) return { ...legacy, site: legacy.site || SITE };

        const scoped = await r.get<PurchaseRecord>(key.purchase(SITE, member));
        return scoped ? { ...scoped, site: scoped.site || SITE } : null;
      }

      const site = member.slice(0, idx);
      const id = member.slice(idx + 1);
      const record = await r.get<PurchaseRecord>(key.purchase(site, id));
      return record ? { ...record, site: record.site || site } : null;
    }),
  );
  const present = records.filter((rec): rec is PurchaseRecord => rec !== null);
  return present
    .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
    .slice(0, limit);
}

export async function buildPurchaseReport(limit = 500): Promise<PurchaseReport> {
  const purchases = await listPurchases(limit);

  const totals = {
    count: purchases.length,
    paid_count: 0,
    failed_count: 0,
    other_count: 0,
    paid_revenue_cents: 0,
  };

  const siteMap = new Map<string, { count: number; paid_count: number; paid_revenue_cents: number }>();
  const sourceMap = new Map<string, { count: number; paid_count: number; paid_revenue_cents: number }>();
  const productMap = new Map<string, { product_id: string; product_name: string; count: number; paid_count: number; paid_revenue_cents: number }>();

  for (const p of purchases) {
    const isPaid = p.status === "paid";
    if (isPaid) totals.paid_count += 1;
    else if (p.status === "failed") totals.failed_count += 1;
    else totals.other_count += 1;
    if (isPaid && p.amount_cents) totals.paid_revenue_cents += p.amount_cents;

    const site = p.site || "unknown";
    const siteAgg = siteMap.get(site) ?? { count: 0, paid_count: 0, paid_revenue_cents: 0 };
    siteAgg.count += 1;
    if (isPaid) {
      siteAgg.paid_count += 1;
      if (p.amount_cents) siteAgg.paid_revenue_cents += p.amount_cents;
    }
    siteMap.set(site, siteAgg);

    const summary = attributionSummary(p.attribution);
    const source = summary.last_source || summary.first_source || "unknown";
    const s = sourceMap.get(source) ?? { count: 0, paid_count: 0, paid_revenue_cents: 0 };
    s.count += 1;
    if (isPaid) {
      s.paid_count += 1;
      if (p.amount_cents) s.paid_revenue_cents += p.amount_cents;
    }
    sourceMap.set(source, s);

    const prod = productMap.get(p.product_id) ?? {
      product_id: p.product_id,
      product_name: p.product_name,
      count: 0,
      paid_count: 0,
      paid_revenue_cents: 0,
    };
    prod.count += 1;
    if (isPaid) {
      prod.paid_count += 1;
      if (p.amount_cents) prod.paid_revenue_cents += p.amount_cents;
    }
    productMap.set(p.product_id, prod);
  }

  return {
    generated_at: new Date().toISOString(),
    totals,
    by_site: Array.from(siteMap.entries())
      .map(([site, v]) => ({ site, ...v }))
      .sort((a, b) => b.paid_revenue_cents - a.paid_revenue_cents || b.count - a.count),
    by_source: Array.from(sourceMap.entries())
      .map(([source, v]) => ({ source, ...v }))
      .sort((a, b) => b.paid_revenue_cents - a.paid_revenue_cents || b.count - a.count),
    by_product: Array.from(productMap.values()).sort(
      (a, b) => b.paid_revenue_cents - a.paid_revenue_cents || b.count - a.count,
    ),
    purchases,
  };
}

export async function sendPurchaseSlackNotification(record: PurchaseRecord): Promise<void> {
  const webhookUrl = process.env.SLACK_PURCHASE_WEBHOOK_URL || process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const summary = attributionSummary(record.attribution);
  const amount = record.amount_cents == null
    ? record.product_price || "unknown amount"
    : `$${(record.amount_cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const statusIcon = record.status === "paid" ? "✅" : record.status === "failed" ? "❌" : "ℹ️";

  const lines = [
    `${statusIcon} ${record.status === "paid" ? "New purchase" : "Stripe purchase event"}: ${record.product_name}`,
    `Amount: ${amount}${record.currency ? ` ${record.currency.toUpperCase()}` : ""}`,
    record.customer_email ? `Customer: ${record.customer_email}` : undefined,
    `Source: ${summary.last_source || summary.first_source || "unknown"} / ${summary.last_medium || summary.first_medium || "unknown"}`,
    summary.last_campaign || summary.first_campaign ? `Campaign: ${summary.last_campaign || summary.first_campaign}` : undefined,
    summary.landing_page ? `Landing: ${summary.landing_page}` : undefined,
    record.stripe_checkout_session_id ? `Stripe session: ${record.stripe_checkout_session_id}` : undefined,
  ].filter(Boolean);

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  }).catch((err) => {
    console.error("Purchase Slack notification failed:", err);
  });
}
