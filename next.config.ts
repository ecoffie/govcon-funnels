import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // OH landing page → direct to tool (no funnel, tool is ungated)
      {
        source: "/opp",
        destination: "https://mi.govcongiants.com/opportunity-hunter",
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
