"use client"

import Link from "next/link"
import type { TranslationKey } from "@/lib/translations"
import {
  CreditCard,
  CalendarCheck,
  ShoppingBag,
  Globe,
  LayoutTemplate,
  Smartphone,
  Plug,
  Server,
  Boxes,
  Compass,
  TrendingUp,
  ClipboardCheck,
  ArrowRight,
  MessageSquare,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ServicesSectionProps {
  t: TranslationKey
  lang: string
}

type ServiceCardItem = {
  title: string
  description: string
  bullets: string[]
  bestFor?: string[]
  slug: string
  cta: string
  icon: typeof Globe
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  bullets,
  bestFor,
  bestForLabel,  
  ctaLabel,
  href,
  index
}: {
  icon: typeof Globe
  title: string
  description: string
  bullets: string[]
  bestFor?: string[]
  bestForLabel: string
  ctaLabel: string
  href: string
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative h-full border border-border/30 bg-surface/30 p-6 lg:p-7 transition-all duration-500 hover:border-primary/40 hover:bg-surface/60 flex flex-col">
        <div className="mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border/40 bg-surface/50 transition-all duration-500 group-hover:border-primary/40">
          <Icon className="h-4 w-4 text-primary" />
        </div>

        <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mb-5 space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/90">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/80" />
              {b}
            </li>
          ))}
        </ul>
        {!!bestFor?.length && (
          <div className="mb-5 border-t border-border/20 pt-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-primary/70">
              {bestForLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bestFor.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="text-[11px] text-muted-foreground/70 border border-border/30 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:gap-3"
        >
          {ctaLabel}
          <ArrowRight className="h-3 w-3" />
        </Link>
        <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/30 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  )
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionLabel({
  label,
  title,
  subtitle,
  visible,
}: {
  label: string
  title: string
  subtitle?: string
  visible: boolean
}) {
  return (
    <div className="mb-10">
      <span
        className={`mb-2 block text-[10px] uppercase tracking-[0.45em] text-primary transition-all duration-500 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      >
        {label}
      </span>
      <h2
        className={`font-serif text-2xl font-semibold text-foreground transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-sm text-muted-foreground max-w-xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ServicesSection({ t, lang }: ServicesSectionProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: businessRef, isVisible: businessVisible } = useScrollAnimation()
  const { ref: productRef, isVisible: productVisible } = useScrollAnimation()
  const { ref: systemsRef, isVisible: systemsVisible } = useScrollAnimation()
  const { ref: architectureRef, isVisible: architectureVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const sv = t.servicesPage
  const businessItems: ServiceCardItem[] = [
    { ...sv.core.items[0], slug: "payments", cta: sv.ctaDiscussProject, icon: CreditCard },
    { ...sv.core.items[1], slug: "booking-systems", cta: sv.ctaDiscussProject, icon: CalendarCheck },
    { ...sv.core.items[2], slug: "marketplaces", cta: sv.ctaDiscussProject, icon: ShoppingBag },
  ]
  const productItems: ServiceCardItem[] = [
    { ...sv.engineering.items[0], slug: "web-development", cta: sv.ctaPlanDevelopment, icon: Globe },
    {
      title: sv.landingPages.title,
      description: sv.landingPages.description,
      bullets: sv.landingPages.bullets,
      bestFor: sv.landingPages.bestFor,
      slug: "landing-pages",
      cta: sv.ctaPlanDevelopment,
      icon: LayoutTemplate,
    },
    { ...sv.engineering.items[1], slug: "mobile-apps", cta: sv.ctaPlanDevelopment, icon: Smartphone },
  ]
  const systemsItems: ServiceCardItem[] = [
    { ...sv.engineering.items[2], slug: "api-development", cta: sv.ctaAssessSystem, icon: Plug },
    {
      title: sv.systemEngineering.integrations.title,
      description: sv.systemEngineering.integrations.description,
      bullets: sv.systemEngineering.integrations.bullets,
      bestFor: sv.systemEngineering.integrations.bestFor,
      slug: "integrations",
      cta: sv.ctaAssessSystem,
      icon: Boxes,
    },
    {
      title: sv.systemEngineering.backend.title,
      description: sv.systemEngineering.backend.description,
      bullets: sv.systemEngineering.backend.bullets,
      bestFor: sv.systemEngineering.backend.bestFor,
      slug: "backend-systems",
      cta: sv.ctaAssessSystem,
      icon: Server,
    },
  ]
  const architectureItems: ServiceCardItem[] = [
    { ...sv.consulting.items[0], slug: "system-design", cta: sv.ctaAssessSystem, icon: Compass },
    { ...sv.consulting.items[1], slug: "scaling", cta: sv.ctaAssessSystem, icon: TrendingUp },
    { ...sv.consulting.items[2], slug: "audit", cta: sv.ctaAssessSystem, icon: ClipboardCheck },
  ]

  return (
    <section id="services" className="py-28 lg:py-36 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* ── Page header ── */}
          <div ref={heroRef} className="mb-20 lg:mb-28">
            <span
              className={`mb-4 block text-[10px] uppercase tracking-[0.5em] text-primary transition-all duration-600 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {sv.label}
            </span>
            <h1
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {sv.title}
            </h1>
            <p
              className={`text-muted-foreground max-w-2xl text-base leading-relaxed transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {sv.subtitle}
            </p>

            {/* Anchor nav */}
            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {[
                { href: "#business-solutions", label: sv.anchorBusiness },
                { href: "#product-development", label: sv.anchorProductDevelopment },
                { href: "#system-engineering", label: sv.anchorSystemEngineering },
                { href: "#architecture-consulting", label: sv.anchorArchitecture },
              ].map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="text-xs uppercase tracking-[0.25em] border border-border/40 px-4 py-2 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>

          <div id="business-solutions" className="mb-24 lg:mb-28">
            <div ref={businessRef}>
              <SectionLabel
                label="01"
                title={sv.businessSolutions.label}
                subtitle={sv.businessSolutions.subtitle}
                visible={businessVisible}
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {businessItems.map((item, i) => (
                <ServiceCard
                  key={item.slug}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  bestFor={item.bestFor}
                  bestForLabel={sv.bestForLabel}
                  ctaLabel={item.cta}
                  href={`/${lang}/contacts?from=services&service=${item.slug}`}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div id="product-development" className="mb-24 lg:mb-28">
            <div ref={productRef}>
              <SectionLabel
                label="02"
                title={sv.productDevelopment.label}
                subtitle={sv.productDevelopment.subtitle}
                visible={productVisible}
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {productItems.map((item, i) => (
                <ServiceCard
                  key={item.slug}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  bestFor={item.bestFor}
                  bestForLabel={sv.bestForLabel}
                  ctaLabel={item.cta}
                  href={`/${lang}/contacts?from=services&service=${item.slug}`}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div id="system-engineering" className="mb-24 lg:mb-28">
            <div ref={systemsRef}>
              <SectionLabel
                label="03"
                title={sv.systemEngineering.label}
                subtitle={sv.systemEngineering.subtitle}
                visible={systemsVisible}
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {systemsItems.map((item, i) => (
                <ServiceCard
                  key={item.slug}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  bestFor={item.bestFor}
                  bestForLabel={sv.bestForLabel}
                  ctaLabel={item.cta}
                  href={`/${lang}/contacts?from=services&service=${item.slug}`}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div id="architecture-consulting" className="mb-20">
            <div ref={architectureRef}>
              <SectionLabel
                label="04"
                title={sv.architectureConsulting.label}
                subtitle={sv.architectureConsulting.subtitle}
                visible={architectureVisible}
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {architectureItems.map((item, i) => (
                <ServiceCard
                  key={item.slug}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  bestFor={item.bestFor}
                  bestForLabel={sv.bestForLabel}
                  ctaLabel={item.cta}
                  href={`/${lang}/contacts?from=services&service=${item.slug}`}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div
            ref={ctaRef}
            className={`border-t border-border/20 pt-16 text-center transition-all duration-700 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-primary">
              {sv.ctaLabel}
            </p>
            <h3 className="mb-4 font-serif text-2xl md:text-3xl font-semibold text-foreground">
              {sv.ctaTitle}
            </h3>
            <p className="mb-8 text-sm text-muted-foreground max-w-md mx-auto">
              {sv.ctaHelper}
            </p>
            <p className="mb-8 text-sm text-muted-foreground/80 max-w-lg mx-auto">
              {sv.finalLeadText}
            </p>
            <Link
              href={`/${lang}/contacts?from=services`}
              className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              {sv.ctaDiscussProject}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
