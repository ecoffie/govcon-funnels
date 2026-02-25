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
          destination: "https://govcon-resources.vercel.app/vault",
        },
        {
          source: "/vault/:path*",
          destination: "https://govcon-resources.vercel.app/vault/:path*",
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
