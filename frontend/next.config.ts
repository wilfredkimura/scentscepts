import type { NextConfig } from "next";

const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:8080/:path*`,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
