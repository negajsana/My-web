"use client"

import type { TranslationKey } from "@/lib/translations"
import { Globe, MessageSquare, Zap, Link2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ServicesSectionProps {
  t: TranslationKey
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  number,
}: {
  icon: typeof Globe
  title: string
  description: string
  index: number
  number: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative p-8 lg:p-10 border border-border/30 bg-surface/50 transition-all duration-500 hover:border-primary/30 hover:bg-surface-elevated/50 h-full">
        {/* Number */}
        <span className="text-6xl font-serif text-border/30 absolute top-4 right-6 transition-colors duration-500 group-hover:text-primary/15 select-none">
          {number}
        </span>

        {/* Icon */}
        <div className="relative mb-6 w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 border border-primary/20 rotate-45 transition-all duration-500 group-hover:rotate-[60deg] group-hover:border-primary/40" />
          <Icon className="h-5 w-5 text-primary relative z-10" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-serif font-semibold text-foreground mb-4 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-px bg-primary/50 w-0 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  )
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  const services = [
    { icon: Globe, title: t.services.web.title, description: t.services.web.description, number: "01" },
    { icon: MessageSquare, title: t.services.chatbots.title, description: t.services.chatbots.description, number: "02" },
    { icon: Zap, title: t.services.automation.title, description: t.services.automation.description, number: "03" },
    { icon: Link2, title: t.services.integration.title, description: t.services.integration.description, number: "04" },
  ]

  return (
    <section id="services" className="py-32 lg:py-40 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-20">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t.services.title}
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {t.services.title}
            </h2>
            <div
              className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            />
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                number={service.number}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
