import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"
import { ProjectCard } from "@/components/projects-section"
import { getCaseStudies } from "@/lib/caseStudies"
import Link from "next/link"

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang as Language
  if (!translations[lang]) {
    return {}
  }
  return generatePageMetadata(lang, "projects")
}

export default async function ProjectsPage({ params }: PageProps) {
  const { lang: rawLang } = await params
  const lang = rawLang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]

  const projects = getCaseStudies(lang)

  return (
    <div className="min-h-screen">
      <JsonLd lang={lang} page="projects" />
      <Navigation t={t} lang={lang} />
      <main className="pt-32 pb-24">
        <section className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <header className="mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              {t.portfolioPage.title}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance">
              {t.seo.projects.h1}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.portfolioPage.subtitle}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium">
                {t.portfolioPage.trustStatement}
              </p>
            </div>
          </header>

          <section>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.shortDescription}
                  href={`/${lang}/projects/${project.slug}`}
                  image={project.image}
                  index={index}
                  metric={project.results[0].value}
                  ctaText={t.projects.viewCase}
                />
              ))}
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface/40 to-background p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(38_55%_55%/0.08),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-4 text-balance">
                {t.portfolioPage.ctaTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t.contact.letsTalk}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-[0_14px_30px_-12px_hsl(38_55%_55%/0.5)]"
              >
                {t.portfolioPage.ctaButton}
              </Link>
            </div>
          </section>
        </section>
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

