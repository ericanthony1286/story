/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.8cache.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "192.168.1.164",
      },
      {
        protocol: "https",
        hostname: "sb-truyenfun-images.s3.ap-southeast-1.amazonaws.com",
      },
    ],
    minimumCacheTTL: 1500000,
    unoptimized: true,
  },

};

module.exports = nextConfig;
