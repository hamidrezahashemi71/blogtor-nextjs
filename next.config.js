/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOMAIN: "http://localhost:4000/",
    TITLE: "Blogtor!",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "4000",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig

// {process.env.DOMAIN}
// {process.env.TITLE}
