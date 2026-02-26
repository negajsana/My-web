import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { translations, type Language } from "@/lib/translations"
import { generatePageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"
import { ProjectCard } from "@/components/projects-section"

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

  const projects = [
    {
      title: t.projects.advokats.title,
      description: t.projects.advokats.description,
      url: "https://www.advokats24.com.ua/",
      image: "/project-law.jpg",
    },
    {
      title: t.projects.oratorica.title,
      description: t.projects.oratorica.description,
      url: "https://www.oratorica.ua/",
      image: "/project-education.jpg",
    },
    {
      title: t.projects.luerssen.title,
      description: t.projects.luerssen.description,
      url: "https://www.lurssen.com/",
      image: "/project-luerssen.jpg",
    },
    {
      title: t.projects.isarAerospace.title,
      description: t.projects.isarAerospace.description,
      url: "https://isaraerospace.com/",
      image: "/project-isar-aerospace.jpg",
    },
    {
      title: t.projects.providentLaw.title,
      description: t.projects.providentLaw.description,
      url: "https://providentlawllp.ca",
      image: "/project-provident-law.jpg",
    },
    {
      title: t.projects.rcnb.title,
      description: t.projects.rcnb.description,
      url: "https://www.rcnb.com/en/",
      image: "/project-rcnb.jpg",
    },
  ]

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
          </header>

          <section>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  image={project.image}
                  index={index}
                  viewText={t.projects.view}
                />
              ))}
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

