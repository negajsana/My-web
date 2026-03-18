import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageSelectScreen } from "@/components/language-select-screen"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-playfair",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#1a1712" },
    { media: "(prefers-color-scheme: light)", color: "#1a1712" },
  ],
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://codearchitect.site"

// ─────────────────────────────────────────────────────────────────────────────
// Root layout metadata — minimal, non-indexable fallback only.
// Real per-page metadata is generated in app/[lang]/page.tsx via generatePageMetadata().
// This root metadata covers the / route which redirects to /en — noindex it.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Code Architect | Web & Software Development",
    // Template used by child pages that set only `title` string
    template: "%s | Code Architect",
  },
  description:
    "Professional web development, chatbots, and digital solutions for businesses in Ukraine and Europe.",
  // Noindex the root — it just redirects, we don't want it competing with /en/
  robots: {
    index: false,
    follow: false,
  },
  // Canonical points to the English version as the x-default
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "en": `${SITE_URL}/en`,
      "uk": `${SITE_URL}/uk`,
      "ru": `${SITE_URL}/ru`,
      "x-default": `${SITE_URL}/en`,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
    apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // lang="en" as safe default — overridden by [lang]/layout.tsx per locale
    // The [lang] layout MUST set the correct lang attribute (see app/[lang]/layout.tsx)
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased"
        style={{ WebkitTextSizeAdjust: "100%", textSizeAdjust: "100%" } as React.CSSProperties}
      >
        <LanguageSelectScreen />
        {children}
        <Analytics />

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-340195571"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-340195571');
          `}
        </Script>
      </body>
    </html>
  )
}
