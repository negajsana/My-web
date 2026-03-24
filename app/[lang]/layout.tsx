import type React from "react"
import type { Metadata } from "next"
import { FloatingContactButton } from "@/components/floating-contact-button"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"

// ─────────────────────────────────────────────────────────────────────────────
// Static params — tells Next.js which [lang] segments to pre-render.
// IMPORTANT: Only include languages you actually have routes for.
// If you add es/de routes later, add them here.
// ─────────────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "uk" },
    { lang: "ru" },
    { lang: "es" },
    { lang: "de" },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared metadata for the [lang] layout level.
// This sets the fallback/default metadata for the language root (e.g. /en, /uk).
// Each page.tsx overrides this with its own generateMetadata() export.
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (translations[rawLang as Language] ? rawLang : "en") as Language

  // Home page metadata is the layout-level default
  return generatePageMetadata(lang, "home")
}

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang: rawLang } = await params
  const lang = (translations[rawLang as Language] ? rawLang : "en") as Language

  // Note: The HTML lang attribute is set in the root layout.
  // Nested layouts in Next.js App Router should not render <html> or <body> tags.
  // The root layout handles the document structure.
  return (
    <>
      {children}
      <FloatingContactButton lang={lang} />
    </>
  )
}
