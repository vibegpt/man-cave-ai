import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mancaveai.com' }],
        destination: 'https://mancaveai.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
