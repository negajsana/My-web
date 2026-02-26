import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HowWeWorkSection } from "@/components/how-we-work-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang as Language
  if (!translations[lang]) {
    return {}
  }
  return generatePageMetadata(lang, "howWeWork")
}

export default async function HowWeWorkPage({ params }: PageProps) {
  const { lang: rawLang } = await params
  const lang = rawLang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen">
      <JsonLd lang={lang} page="howWeWork" />
      <Navigation t={t} lang={lang} />
      <main className="pt-24">
        <HowWeWorkSection t={t} lang={lang} />
        <ContactSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [
    { lang: "uk" },
    { lang: "ru" },
    { lang: "en" },
    { lang: "es" },
    { lang: "de" },
  ]
}
