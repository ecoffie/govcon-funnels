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
        // Proxy handouts to resources app when file not in public/ (fixes download redirect-to-home)
        {
          source: "/handouts/:path*",
          destination: "https://govcon-resources.vercel.app/handouts/:path*",
        },
        // Proxy proposal-bootcamp downloads when not in public/ (IDIQ templates, etc.)
        {
          source: "/proposal-bootcamp/downloads/:path*",
          destination: "https://govcon-resources.vercel.app/proposal-bootcamp/downloads/:path*",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
