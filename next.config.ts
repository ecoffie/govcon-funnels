import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/dashboard.html', destination: '/api/dashboard-page' },
    ];
  },
};

export default nextConfig;
