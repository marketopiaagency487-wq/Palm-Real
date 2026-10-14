import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/", destination: "/", permanent: true },
      { source: "/en/", destination: "/en", permanent: true },
    ];
  },
};

export default nextConfig;
