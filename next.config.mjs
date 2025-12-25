/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  reactStrictMode: false,
  images: {
    // Allow local images from public folder
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pacificwide-profile-bucket.s3.us-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pacificwide-profile-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "crm.team69vn.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
