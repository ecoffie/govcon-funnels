import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/feb-28-bootcamp',
        destination: 'https://funnels.govcongiants.org/proposal-bootcamp',
        permanent: true,
      },
      {
        source: '/feb-28-bootcamp/:path*',
        destination: 'https://funnels.govcongiants.org/proposal-bootcamp',
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
