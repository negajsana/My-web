"use client"

import Link from "next/link"
import type { TranslationKey, Language } from "@/lib/translations"
import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ProjectsSectionProps {
  t: TranslationKey
  lang: Language
}

export function ProjectCard({
  title,
  description,
  href,
  image,
  index,
  metric,
  ctaText,
}: {
  title: string
  description: string
  href: string
  image: string
  index: number
  metric: string
  ctaText: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`group relative h-full transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      } ${index === 0 ? "animate-slide-left" : "animate-slide-right"}`}
      style={{
        transitionDelay: `${index * 200}ms`,
        animationPlayState: isVisible ? "running" : "paused",
      }}
    >
      <Link
        href={href}
        className="flex flex-col h-full rounded-3xl border border-border/60 bg-card/70 p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_hsl(38_55%_55%/0.55)]"
      >
        <p className="text-5xl md:text-6xl font-black text-primary leading-none tracking-tight mb-5">{metric}</p>

        <div className="relative overflow-hidden aspect-[16/10] mb-5 rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-background/10 group-hover:bg-background/25 transition-all duration-500" />
        </div>

        <h3 className="text-2xl font-serif font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="flex-1 text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] font-semibold text-primary mt-auto">
          {ctaText}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  )
}

export function ProjectsSection({ t, lang }: ProjectsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  const projects = [
    {
      slug: "sviuryst-law-firm",
      title: t.projects.advokats.title,
      description: t.projects.advokats.description,
      metric: t.projects.advokats.result,
      image: "/project-law.jpg",
    },
    {
      slug: "oratorica-language-school",
      title: t.projects.oratorica.title,
      description: t.projects.oratorica.description,
      metric: t.projects.oratorica.result,
      image: "/project-education.jpg",
    },
  ]

  return (
    <section id="projects" className="py-32 lg:py-40 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-20">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t.projects.title}
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {t.projects.title}
            </h2>
            <div
              className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                href={`/${lang}/projects/${project.slug}`}
                image={project.image}
                index={index}
                metric={project.metric}
                ctaText={t.projects.viewCase}
              />
            ))}
          </div>

          {/* All Projects Button */}
          <div className="flex justify-center">
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center px-8 py-3 border border-primary text-sm uppercase tracking-[0.2em] font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {t.projects.allProjectsButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
