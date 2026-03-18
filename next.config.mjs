/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ─── Image Optimization ──────────────────────────────────────────────────
  // REMOVED: unoptimized: true — this was killing LCP scores.
  // Next.js image optimization is free on Vercel and critical for Core Web Vitals.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── Redirects ───────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Root → default language (English for international reach)
      // permanent: false so you can change default lang later without cache issues
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ]
  },

  // ─── Security & SEO Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking — also a minor trust signal for Google
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevents MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Forces HTTPS for 1 year — critical for SEO (HTTPS is a ranking factor)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Controls referrer info sent to third parties
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restricts browser features — tightens security posture
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets aggressively — improves repeat visit performance
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
