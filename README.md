This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Funnels

### Jan 31 Paid Bootcamp Replay

- **Landing**: `/jan-31-bootcamp-paid`
- **Checkout**: `/jan-31-bootcamp-paid/checkout`
- **Success**: `/jan-31-bootcamp-paid/success`
- **Course (gated)**: `/jan-31-bootcamp-paid/course`

#### Stripe (one-time $99 payment)

Use either a **Product ID** or a **Price ID**:

- **Product ID** (e.g. `prod_TxBahPLLcszpnl`): set `STRIPE_JAN31_PRODUCT_ID`. Checkout will charge $99 one-time using this product.
- **Price ID** (e.g. `price_1ABC...`): create a $99 one-time Price in Stripe and set `STRIPE_JAN31_PRICE_ID`.

#### Required environment variables

Create a `.env.local` with:

```bash
# Stripe (one-time $99 checkout)
STRIPE_SECRET_KEY=sk_live_...   # or sk_test_... for testing
# Use one of:
STRIPE_JAN31_PRODUCT_ID=prod_...   # Product ID → $99 charged at checkout
# OR
STRIPE_JAN31_PRICE_ID=price_...    # $99 one-time Price ID

# Used to sign the access cookie after payment
ACCESS_TOKEN_SECRET=some-long-random-string

# Optional (recommended in production)
NEXT_PUBLIC_SITE_URL=https://govcongiants.org

# Optional: display on checkout (defaults to $99)
NEXT_PUBLIC_JAN31_PRICE_LABEL=$99
```

### CRM / lead automation

Form submissions (all funnel lead forms) are sent to your CRM automatically. Copy `env.example` to `.env.local` and set at least one of:

- **GoHighLevel**: `GHL_API_KEY` and `GHL_LOCATION_ID` — leads are created as contacts with tags like `funnel-bootcamp`, `funnel-surge`, etc.
- **Webhook**: `CRM_WEBHOOK_URL` — any URL that accepts POST JSON (Zapier, Make, n8n, or your CRM's inbound webhook). Payload: `{ name, email, phone, source, redirectUrl, timestamp }`.

You can use both: leads are sent to GHL and to the webhook in parallel.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
