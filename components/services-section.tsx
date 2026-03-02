"use client"

import type { TranslationKey } from "@/lib/translations"
import {
  Globe,
  Code2,
  Palette,
  MessageSquare,
  Zap,
  Link2,
  Shield,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ServicesSectionProps {
  t: TranslationKey
}

const serviceIcons = [Globe, Code2, Palette, MessageSquare, Zap, Link2, Shield]
const serviceKeys = [
  "web",
  "software",
  "design",
  "chatbots",
  "automation",
  "integration",
  "support",
] as const

type ServiceKey = typeof serviceKeys[number]

function ServiceCard({
  icon: Icon,
  title,
  description,
  items,
  index,
  number,
}: {
  icon: typeof Globe
  title: string
  description: string
  items: string[]
  index: number
  number: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative p-8 lg:p-10 border border-border/30 bg-surface/50 transition-all duration-500 hover:border-primary/30 hover:bg-surface-elevated/50 h-full flex flex-col">
        {/* Number */}
        <span className="text-6xl font-serif text-border/25 absolute top-4 right-6 transition-colors duration-500 group-hover:text-primary/10 select-none">
          {number}
        </span>

        {/* Icon */}
        <div className="relative mb-6 w-12 h-12 flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 border border-primary/20 rotate-45 transition-all duration-500 group-hover:rotate-[60deg] group-hover:border-primary/40" />
          <Icon className="h-5 w-5 text-primary relative z-10" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary pr-10">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm mb-6">
          {description}
        </p>

        {/* Items list */}
        <ul className="mt-auto space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground/80">
              <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-px bg-primary/50 w-0 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  )
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  const services = serviceKeys.map((key, index) => {
    const service = t.services[key as ServiceKey] as {
      title: string
      description: string
      items: string[]
    }
    return {
      icon: serviceIcons[index],
      title: service.title,
      description: service.description,
      items: service.items || [],
      number: String(index + 1).padStart(2, "0"),
    }
  })

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

          {/* Services Grid — 2 cols on tablet, 3 on wide desktop, 1 on mobile */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                items={service.items}
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
