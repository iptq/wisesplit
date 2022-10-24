/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  typescript: {
    // TODO: Move fast and break things lmao
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
