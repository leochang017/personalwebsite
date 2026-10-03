import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Page CSP. 'unsafe-inline' stays because Next.js hydration and framer-motion
// emit inline script/style; everything else is locked to this origin.
// The Godot export under /projects/phase-spector is excluded (needs wasm + blob workers).
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self'",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // First-party SVGs live in /public; without this the optimizer rejects them
    // with a 400 (breaks the chatbot icon and the ObCHESSed logo).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/((?!projects/phase-spector/).*)",
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
      },
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
      { source: "/projects/phasespector.html", destination: "/projects/phasespector", permanent: true },
    ];
  },
};

export default nextConfig;
