import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageSelectScreen } from "@/components/language-select-screen"
import Script from "next/script"
import "./globals.css"

/*
  display: "swap" — критично для Samsung Browser:
  без него браузер может показывать невидимый текст пока шрифт грузится,
  а на медленном соединении — так и не показать.
  variable — CSS-переменные шрифтов, доступные глобально.
*/
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

/* =====================================================================
   Viewport — отдельный экспорт (Next.js 14+).
   Samsung Browser без этого может рендерить страницу в desktop-режиме.
   ===================================================================== */
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

/* =====================================================================
   Метаданные — Code Architect
   ===================================================================== */
export const metadata: Metadata = {
  title: "Code Architect | Web Developer & Chatbot Engineer",
  description:
    "Professional web development, chatbots, and digital solutions. Building modern, functional, and visually compelling projects.",
  generator: "v0.app",
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`dark ${inter.variable} ${playfair.variable}`}>
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
        {/* Language selection screen — shown only on first visit, client-side */}
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
