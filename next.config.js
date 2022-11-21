/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOMAIN: "http://localhost:4000/",
    TITLE: "Blogtor!",
  },
};

module.exports = nextConfig

// {process.env.DOMAIN}
// {process.env.TITLE}
