import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["unfineable-fredric-frowsily.ngrok-free.dev"],
  images: {
    localPatterns: [{ pathname: "/assets/**" }],
  },
};

export default nextConfig;
