import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6870195e15d044f2944fc59f9ee569df.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'animaker-ai.vercel.app',
          },
        ],
        destination: 'https://animaker.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
