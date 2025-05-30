/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "api.onlineparts.shop",
        port: "",
      },
    ],
  },
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};

export default nextConfig;
