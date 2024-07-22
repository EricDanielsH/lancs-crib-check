/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/stock/**", // Optionally specify the pathname pattern
      },
      {
        protocol: "https",
        hostname: "lu-crib-check-local.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**", // Allow all paths from this hostname
      },
      {
        protocol: "https",
        hostname: "lu-crib-check.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**", // Allow all paths from this hostname
      },
    ],
  },
};

export default nextConfig;
