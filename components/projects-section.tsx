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
  url,
  image,
  index,
  viewText,
}: {
  title: string
  description: string
  url: string
  image: string
  index: number
  viewText: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      } ${index === 0 ? "animate-slide-left" : "animate-slide-right"}`}
      style={{
        transitionDelay: `${index * 200}ms`,
        animationPlayState: isVisible ? "running" : "paused",
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/10] mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            crossOrigin="anonymous"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-500" />

          {/* View button that appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium">
              {viewText}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          {/* Corner frame */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-foreground/20 transition-all duration-500 group-hover:border-primary/60 group-hover:w-8 group-hover:h-8" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-foreground/20 transition-all duration-500 group-hover:border-primary/60 group-hover:w-8 group-hover:h-8" />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </div>
      </a>
    </div>
  )
}

export function ProjectsSection({ t, lang }: ProjectsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

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
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                url={project.url}
                image={project.image}
                index={index}
                viewText={t.projects.view}
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
