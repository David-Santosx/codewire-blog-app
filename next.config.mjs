/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  env: {
    API_URL: "https://codewireapp.com/",
  },
};

export default nextConfig;
