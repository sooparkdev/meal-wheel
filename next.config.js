/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com", 
      },
    ],
  },
 
};

module.exports = nextConfig;
