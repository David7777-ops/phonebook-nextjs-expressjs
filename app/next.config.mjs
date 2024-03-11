/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "riusiblhrrxmzngdkzds.supabase.co",
      },
    ],
  },
};

export default nextConfig;
