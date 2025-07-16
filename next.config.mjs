const hostnames = [
  "firebasestorage.googleapis.com",
  "pub-ef499826836f4a1ab474f7d2ac0fb755.r2.dev",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
  },
};

export default nextConfig;
