import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { MarqueeDivider } from "@/components/marquee-divider"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"

/**
 * Home page
 * Company: Code Architect
 * Lead Developer: Alexander
 */

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang as Language
  if (!translations[lang]) {
    return {}
  }
  return generatePageMetadata(lang, "home")
}

export default async function Page({ params }: PageProps) {
  const { lang: rawLang } = await params
  const lang = rawLang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  const marqueeItems = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Telegram Bots",
    "Automation",
    "API Integration",
  ]

  return (
    <div className="min-h-screen">
      <JsonLd lang={lang} page="home" />
      <Navigation t={t} lang={lang} />
      <main>
        <HeroSection t={t} lang={lang} />
        <MarqueeDivider items={marqueeItems} />
        <ProjectsSection t={t} lang={lang} />
        <ContactSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }, { lang: "es" }, { lang: "de" }]
}
