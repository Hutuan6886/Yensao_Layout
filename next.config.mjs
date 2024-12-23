const hostnames = ["firebasestorage.googleapis.com","yen-sao-image-storage.e0265199dcb8843944806be1d7f56406.r2.cloudflarestorage.com"];

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
