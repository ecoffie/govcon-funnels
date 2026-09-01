import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle the private /team HTML (served by src/app/team/[[...slug]]/route.ts, gated
  // by middleware) into that route's serverless function so readFile works on Vercel.
  outputFileTracingIncludes: {
    "/team/[[...slug]]": ["./private-team/**/*"],
  },
  async redirects() {
    return [
      // SEO Migration: .org → .com (May 2026) - canonical is govcongiants.com (no www)
      {
        source: "/:path*",
        has: [{ type: "host", value: "govcongiants.org" }],
        destination: "https://govcongiants.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.govcongiants.org" }],
        destination: "https://govcongiants.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.govcongiants.com" }],
        destination: "https://govcongiants.com/:path*",
        permanent: true,
      },
      // ── ONE-SITE CONSOLIDATION (2026-08-24) ──────────────────────────────────
      // govcongiants.com is the single public site. app.govcongiants.org and
      // podcast.govcongiants.org are LEGACY ENTRANCES ONLY: path-preserving, permanent.
      //
      // These are never removed. The live Libsyn RSS feed carries ~1,694 links to
      // govcongiants.org inside episode descriptions, already distributed to every
      // podcast platform and not retroactively editable. Same reasoning for the
      // podcast subdomain, which has been shared directly for years.
      //
      // ⚠️ NOTHING HERE MAY MATCH A LIBSYN HOSTNAME. Podcast distribution
      // (govcongiants.libsyn.com/rss, traffic.libsyn.com/*, static.libsyn.com/*) is
      // outside this consolidation and must keep resolving untouched.
      // ⚠️ app.govcongiants.org → .com rule TEMPORARILY REMOVED (2026-08-24):
      // it shipped with #176 before the Phase 3 domain flip, but govcongiants.com
      // is still served by the govcon-giants-site SPA, which 308s ~35 Next-owned
      // path families (/funding, /jobs, /guides, /hubzone, ...) right back to
      // app.govcongiants.org — an infinite redirect loop on all of them.
      // Re-add this rule in the same deploy that moves the govcongiants.com
      // domain to this project (tasks/PHASE3-domain-flip-runbook.md).
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "app.govcongiants.org" }],
      //   destination: "https://govcongiants.com/:path*",
      //   permanent: true,
      // },
      {
        source: "/:path*",
        has: [{ type: "host", value: "podcast.govcongiants.org" }],
        destination: "https://govcongiants.com/:path*",
        permanent: true,
      },
      {
        source: "/vault",
        destination: "https://vault.govcongiants.org/",
        permanent: false,
      },
      {
        source: "/vault/:path*",
        destination: "https://vault.govcongiants.org/:path*",
        permanent: false,
      },
      // GSC 404 fixes (May 2026)
      {
        source: "/surge/bc",
        destination: "/",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/consulting",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/blog/cage-code-lookup-guide",
        destination: "/guides/cage-code",
        permanent: true,
      },
      // One-site consolidation (2026-08-24): three podcast-SPA articles merged into the
      // stronger existing posts. Unique material was folded into the destination first.
      // All three source slugs had 0 GSC clicks / 0 impressions over 90 days, so nothing
      // ranked is being redirected — the merge consolidates topical authority instead of
      // splitting it. Permanent, because the slugs may exist in old emails and links.
      {
        source: "/blog/start-govcon-no-experience",
        destination: "/blog/win-government-contracts-no-experience",
        permanent: true,
      },
      {
        source: "/blog/register-right-first-time",
        destination: "/blog/sam-gov-registration-checklist",
        permanent: true,
      },
      {
        source: "/blog/cmmc-real-math",
        destination: "/blog/cmmc-2-compliance-guide",
        permanent: true,
      },
      // Encore Funding partner tracking link (2026-09-01).
      // /encore is the short URL published in Encore's own materials and used as
      // the tracked entry point for the partnership. It previously resolved to a
      // landing page that was removed in a later cleanup, leaving it to serve the
      // homepage at HTTP 200 — a silent dead end that no uptime check would flag,
      // so every click on it was lost. Forward it to the real partner page.
      // Temporary (307) because the destination may be repointed to a dedicated
      // qualifying page; query strings (utm_*) are preserved by Next automatically.
      {
        source: "/encore",
        destination: "/encore-funding",
        permanent: false,
      },
      {
        source: "/encore/:path*",
        destination: "/encore-funding",
        permanent: false,
      },
      // OH landing page → direct to tool (no funnel, tool is ungated)
      {
        source: "/opp",
        destination: "https://getmindy.ai/opportunity-hunter",
        permanent: true,
      },
      // Fix misleading checkout URL - accelerator is a call, not payment
      {
        source: "/premium/accelerator/checkout",
        destination: "https://calendly.com/govconedumeet/discovery-call",
        permanent: true,
      },
      // Consolidate duplicate premium URLs (April 14, 2026)
      {
        source: "/premium-page",
        destination: "/premium",
        permanent: true,
      },
      // GSC 404 fixes (April 2026) - only ones not in vercel.json
      {
        source: "/events",
        destination: "/",
        permanent: true,
      },
      {
        source: "/events/",
        destination: "/",
        permanent: true,
      },
      // Done-for-you → White Glove section (May 2026)
      {
        source: "/done-for-you",
        destination: "/premium#tier-whiteglove",
        permanent: true,
      },
      // /mi is now a local Mindy Pro sales page (removed redirect)
      // /platform is the archived pre-Mindy homepage. Its metadata still
      // has path='/' which creates an SEO duplicate of the homepage.
      // Redirect to / so search engines consolidate on canonical Mindy.
      {
        source: "/platform",
        destination: "/",
        permanent: true,
      },
      // /mi-free is the old-branded free landing ("MI Free"). The new
      // free landing is /mi (Mindy). SiteNav update below points at /mi
      // directly; this redirect handles any stale external links.
      {
        source: "/mi-free",
        destination: "/mi",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Baseline security headers applied to every route. These are the
    // zero-functional-risk set a vendor security review expects:
    //  - HSTS: force HTTPS for a year incl. subdomains (site is HTTPS-only
    //    on Vercel; safe). preload-eligible.
    //  - X-Content-Type-Options: block MIME sniffing.
    //  - X-Frame-Options SAMEORIGIN: we only frame our own /dashboard.html;
    //    all other iframes are US embedding YouTube/Vimeo (child direction,
    //    unaffected). Stops clickjacking of our pages.
    //  - Referrer-Policy: send origin cross-site, full same-origin — keeps
    //    UTM/attribution working internally without leaking full paths out.
    //  - Permissions-Policy: deny sensors we never use.
    // NOTE: a full Content-Security-Policy is intentionally NOT set here — it
    // requires whitelisting every third-party origin (GA4, Google Ads, Vimeo,
    // YouTube, Stripe, Calendly, GHL) and a wrong list silently breaks video
    // playback + conversion tracking. Ship CSP as a separately-tested pass.
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/march-surge/downloads/:path*.html",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/quiz", destination: "/quiz/index.html" },
        { source: "/upskilling", destination: "/upskilling/index.html" },
        { source: "/market-intel", destination: "/market-intel/index.html" },
        // Mindy Launch (Sat June 27, 2026): proxy the static funnel so the URL
        // stays on govcongiants.com/mindy-launch (rewrite, not redirect).
        { source: "/mindy-launch", destination: "https://funnels-one.vercel.app/mindy-launch/index.html" },
        { source: "/mindy-launch/:path*", destination: "https://funnels-one.vercel.app/mindy-launch/:path*" },
      ],
      afterFiles: [
        { source: "/dashboard.html", destination: "/api/dashboard-page" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
