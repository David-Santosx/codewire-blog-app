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
    API_URL: "https://code-wire-blog.vercel.app",
  },
};

export default nextConfig;
