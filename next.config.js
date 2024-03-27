/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents sending two requests at the same time in useEffect hook
  // See: https://stackoverflow.com/a/76252969
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig
