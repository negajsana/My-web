"use client"

import type { TranslationKey } from "@/lib/translations"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ProjectsSectionProps {
  t: TranslationKey
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function ProjectsSection({ t }: ProjectsSectionProps) {
  const { ref, inView } = useInView()

  const projects = [
    {
      title: t.projects.advokats.title,
      description: t.projects.advokats.description,
      url: "https://www.advokats24.com.ua/",
      image: "/law-firm-website-professional.png",
      tags: ["Next.js", "SEO", "UI/UX"],
    },
    {
      title: t.projects.oratorica.title,
      description: t.projects.oratorica.description,
      url: "https://www.oratorica.ua/",
      image: "/language-learning-platform-modern.jpg",
      tags: ["React", "Payments", "LMS"],
    },
  ]

  return (
    <section id="projects" className="relative py-32 lg:py-40" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
              {"// "}portfolio
            </span>
            <div className={`h-px flex-1 bg-border/30 ${inView ? "animate-line-grow" : "opacity-0"}`} />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-20 ${
              inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {t.projects.title}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-2xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/5 ${
                  inView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View label */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {t.projects.view}
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground/90 group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
