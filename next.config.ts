import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
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
