import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/translations"
import { redirect } from "next/navigation"

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen">
      <Navigation t={t} lang={lang} />
      <main>
        <HeroSection t={t} lang={lang} />
        <ProjectsSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]
}
