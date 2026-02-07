import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"

interface PageProps {
  params: { lang: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = params.lang as Language
  if (!translations[lang]) {
    return {}
  }
  return generatePageMetadata(lang, "contact")
}

export default function ContactPage({ params }: PageProps) {
  const lang = params.lang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen">
      <JsonLd lang={lang} page="contact" />
      <Navigation t={t} lang={lang} />
      <main className="pt-24">
        <ContactSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]
}
