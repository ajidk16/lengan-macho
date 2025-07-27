import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Temporary disabled eslint and typescript errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        port: "",
        pathname: "/file/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
