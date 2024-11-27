/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mflytfrgtpdzkhyhucde.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/EventImages/**",
      },
    ],
  },
};

export default nextConfig;