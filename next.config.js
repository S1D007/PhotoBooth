/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'res.cloudinary.com'], // add your domains here
  },
}

module.exports = nextConfig
