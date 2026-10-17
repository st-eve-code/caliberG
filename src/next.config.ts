import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["unfineable-fredric-frowsily.ngrok-free.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.primaryarms.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
