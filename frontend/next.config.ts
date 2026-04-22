import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? `http://backend:8080/:path*` 
          : `http://localhost:8080/:path*`,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
