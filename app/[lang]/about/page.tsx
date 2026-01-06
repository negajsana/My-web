import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/translations"
import { redirect } from "next/navigation"

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen">
      <Navigation t={t} lang={lang} />
      <main className="pt-16">
        <AboutSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]
}
