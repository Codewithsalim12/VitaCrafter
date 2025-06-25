import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.enhancv.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images.zety.com",
      },
      {
        protocol: "https",
        hostname: "xsgames.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gdoc.io",
      },
      {
        protocol: "https",
        hostname: "resumegenius.com",
      },
      {
        protocol: "https",
        hostname: "staticlearn.shine.com",
      },
      {
        protocol: "https",
        hostname: "www.adobe.com",
      },
      {
        protocol: "https",
        hostname: "resumeworded.com",
      },
      {
        protocol: "https",
        hostname: "images.resumaker.ai",
      },
      {
        protocol: "https",
        hostname: "www.my-resume-templates.com",
      },
    ],
    domains: ["www.livecareer.com", "i.imgur.com"],
  },
};

export default nextConfig;
