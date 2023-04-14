// Also change in src/utils/trpc.ts
function getDomain() {
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return process.env.VERCEL_URL;

  // assume localhost
  return 'localhost';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 30,
    domains: [getDomain()],
  },
};

module.exports = nextConfig;
