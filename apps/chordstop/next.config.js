/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: "loose" },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, process: false, querystring: false };

    return config;
  },
};

module.exports = nextConfig;
