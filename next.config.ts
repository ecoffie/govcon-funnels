import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "guides.govcongiants.org" }],
        destination: "https://vault.govcongiants.org/:path*",
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
        destination: "https://tools.govcongiants.org/opportunity-hunter",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
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
      ],
      afterFiles: [
        { source: "/dashboard.html", destination: "/api/dashboard-page" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
