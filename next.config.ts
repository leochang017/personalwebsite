import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/achievements.html", destination: "/achievements", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/experience.html", destination: "/experience", permanent: true },
      { source: "/leadership.html", destination: "/experience", permanent: true },
      { source: "/contact.html", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
