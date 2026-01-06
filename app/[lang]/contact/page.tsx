import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/translations"
import { redirect } from "next/navigation"

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen">
      <Navigation t={t} lang={lang} />
      <main className="pt-16">
        <ContactSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]
}
