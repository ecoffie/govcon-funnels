import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "guides.govcongiants.org" }],
        destination: "https://govcongiants.org/vault/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/vault",
          destination: "https://vault.govcongiants.org/",
        },
        {
          source: "/vault/:path*",
          destination: "https://vault.govcongiants.org/:path*",
        },
      ],
      afterFiles: [
        { source: "/dashboard.html", destination: "/api/dashboard-page" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
