"use client"

import type { TranslationKey } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ExternalLink } from "lucide-react"

interface ProjectsSectionProps {
  t: TranslationKey
}

export function ProjectsSection({ t }: ProjectsSectionProps) {
  const projects = [
    {
      title: t.projects.advokats.title,
      description: t.projects.advokats.description,
      url: "https://www.advokats24.com.ua/",
      image: "/law-firm-website-professional.png",
    },
    {
      title: t.projects.oratorica.title,
      description: t.projects.oratorica.description,
      url: "https://www.oratorica.ua/",
      image: "/language-learning-platform-modern.jpg",
    },
  ]

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t.projects.title}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="group/btn bg-transparent"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    {t.projects.view}
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
