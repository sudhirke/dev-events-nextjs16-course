import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/djgoofrj7/**",
      },
    ],
  },
  reactCompiler: true,
  /* config options here */
  experimental: { turbopackFileSystemCacheForDev: true },
};

export default nextConfig;
