import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 300,
        ignored: ['**/.git/**', '**/.next/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
