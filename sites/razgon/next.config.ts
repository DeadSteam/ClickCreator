import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Хосты, которым разрешено тянуть dev-ассеты (HMR), когда сервер открывают не с localhost.
  allowedDevOrigins: ["85.142.173.191", "192.168.1.166"],
};

export default nextConfig;
