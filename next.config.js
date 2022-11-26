/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOMAIN: "http://localhost:4000/",
    TITLE: "Blogtor!",
  },
  images: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "localhost:4000",
        },
      ],
      domains: ["images.amcnetworks.com"],
    },
  },
};

module.exports = nextConfig

// {process.env.DOMAIN}
// {process.env.TITLE}
