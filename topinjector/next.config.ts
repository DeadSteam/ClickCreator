import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hosts allowed to request dev-only assets (HMR) when the dev server is not
  // reached over localhost — e.g. running it on the server and opening it from outside.
  allowedDevOrigins: ["85.142.173.191", "192.168.1.166"],
};

export default nextConfig;
