import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/caseStudies"
import { generateCaseMetadata } from "@/lib/seo"
import { translations, type Language } from "@/lib/translations"
import { CaseResultsGrid } from "@/components/case-results-grid"

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  const lang = rawLang as Language
  if (!translations[lang]) {
    return {}
  }
  const caseStudy = getCaseStudyBySlug(lang, slug)
  if (!caseStudy) {
    return {}
  }

  return generateCaseMetadata(lang, caseStudy.slug, caseStudy.title, caseStudy.shortDescription)
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params
  const lang = rawLang as Language

  if (!translations[lang]) {
    redirect("/uk")
  }

  const t = translations[lang]
  const caseStudy = getCaseStudyBySlug(lang, slug)
  if (!caseStudy) {
    notFound()
  }
  const currentCaseStudy = caseStudy as NonNullable<typeof caseStudy>

  return (
    <div className="min-h-screen">
      <Navigation t={t} lang={lang} />
      <main className="pt-32 pb-28">
        <article className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <header className="mb-14">
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t.caseStudyPage.heroBadge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mt-4">
              {currentCaseStudy.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-5 max-w-3xl">{currentCaseStudy.shortDescription}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-4 py-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.caseStudyPage.industry}</span>
              <span className="font-semibold text-foreground">{currentCaseStudy.industry}</span>
            </div>
          </header>

          <div className="relative overflow-hidden rounded-3xl mb-16 transition-all duration-700">
            <img src={currentCaseStudy.image} alt={currentCaseStudy.title} className="w-full h-[280px] md:h-[420px] object-cover" crossOrigin="anonymous" />
          </div>

          <section className="grid gap-8 md:grid-cols-2 mb-16">
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-3">{t.caseStudyPage.about}</h2>
              <p className="text-muted-foreground">{currentCaseStudy.about}</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-3">{t.caseStudyPage.clientDoes}</h2>
              <p className="text-muted-foreground">{currentCaseStudy.clientDoes}</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-3">{t.caseStudyPage.problem}</h2>
              <p className="text-muted-foreground">{currentCaseStudy.problem}</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-3">{t.caseStudyPage.solution}</h2>
              <p className="text-muted-foreground">{currentCaseStudy.solution}</p>
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-2 mb-16">
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-4">{t.caseStudyPage.built}</h2>
              <ul className="space-y-2">
                {currentCaseStudy.built.map((item) => (
                  <li key={item} className="text-muted-foreground">- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 md:p-7 transition-all duration-500 hover:border-primary/30">
              <h2 className="font-serif text-2xl text-foreground mb-4">{t.caseStudyPage.services}</h2>
              <ul className="space-y-2">
                {currentCaseStudy.services.map((item) => (
                  <li key={item} className="text-muted-foreground">- {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-11 mb-16 transition-all duration-700">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8">{t.caseStudyPage.results}</h2>
            <CaseResultsGrid results={currentCaseStudy.results} />
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-5 py-4">
              <p className="text-sm md:text-base text-muted-foreground">{t.caseStudyPage.trustLine}</p>
              <p className="text-sm uppercase tracking-[0.15em] text-primary font-semibold">
                {t.caseStudyPage.duration}: {currentCaseStudy.duration}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card/70 p-7 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">{t.caseStudyPage.primaryCtaTitle}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center px-8 md:px-10 py-4 bg-primary text-primary-foreground text-sm md:text-base uppercase tracking-[0.2em] font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-[0_14px_30px_-12px_hsl(38_55%_55%/0.65)]"
              >
                {t.caseStudyPage.primaryCtaButton}
              </Link>
              <Link
                href={currentCaseStudy.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 border border-border text-foreground text-xs md:text-sm uppercase tracking-[0.18em] font-semibold rounded-xl hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                {t.caseStudyPage.visitProject}
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer t={t} />
    </div>
  )
}

export function generateStaticParams() {
  const langs: Language[] = ["uk", "ru", "en", "es", "de"]
  return langs.flatMap((lang) =>
    getCaseStudies(lang).map((caseStudy) => ({
      lang,
      slug: caseStudy.slug,
    }))
  )
}
