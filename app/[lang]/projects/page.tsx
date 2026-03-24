import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"
import { ProjectCard } from "@/components/projects-section"
import { getCaseStudies } from "@/lib/case-studies"
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
          <header className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              {t.portfolioPage.title}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance">
              {t.seo.projects.h1}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.portfolioPage.subtitle}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-primary/80">
              {t.portfolioPage.trustStatement}
            </p>
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

          <section className="mt-20 rounded-3xl border border-border/60 bg-gradient-to-br from-surface/60 to-background p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
              {t.portfolioPage.ctaTitle}
            </h2>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity"
            >
              {t.portfolioPage.ctaButton}
            </Link>
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

