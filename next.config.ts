import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
