import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
    ];
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
      { source: "/dashboard.html", destination: "/", permanent: true },
      { source: "/cs-projects.html", destination: "/projects", permanent: true },
      { source: "/experiences.html", destination: "/experience", permanent: true },
      { source: "/projects/napkinnote.html", destination: "/projects/napkinnotes", permanent: true },
      { source: "/projects/stockml.html", destination: "/projects/stockml", permanent: true },
    ];
  },
};

export default nextConfig;
