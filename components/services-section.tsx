"use client"

import Link from "next/link"
import type { TranslationKey } from "@/lib/translations"
import {
  CreditCard,
  CalendarCheck,
  ShoppingBag,
  Globe,
  Smartphone,
  Plug,
  Cpu,
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

// ─── Icon map ────────────────────────────────────────────────────────────────
const CORE_ICONS = [CreditCard, CalendarCheck, ShoppingBag]
const ENGINEERING_ICONS = [Globe, Smartphone, Plug]
const CONSULTING_ICONS = [Cpu, TrendingUp, ClipboardCheck]

// ─── Flow badge ───────────────────────────────────────────────────────────────
function FlowBadge({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-muted-foreground bg-surface border border-border/30 px-3 py-1">
            {item}
          </span>
          {i < items.length - 1 && (
            <ArrowRight className="h-3 w-3 text-primary/50 flex-shrink-0" />
          )}
        </span>
      ))}
    </div>
  )
}

// ─── Core card (larger, emphasized) ──────────────────────────────────────────
function CoreCard({
  icon: Icon,
  title,
  description,
  bullets,
  bestFor,
  bestForLabel,
  cta,
  index,
  ctaLink,
}: {
  icon: typeof Globe
  title: string
  description: string
  bullets: string[]
  bestFor: string[]
  bestForLabel: string
  cta: string
  index: number
  ctaLink: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative h-full border border-primary/20 bg-surface/80 p-8 lg:p-10 transition-all duration-500 hover:border-primary/50 hover:bg-surface-elevated/60 flex flex-col">
        {/* Accent top line */}
        <div className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />

        {/* Icon */}
        <div className="mb-6 flex h-12 w-12 flex-shrink-0 items-center justify-center border border-primary/30 bg-primary/5 transition-all duration-500 group-hover:border-primary/60 group-hover:bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        {/* Title */}
        <h3 className="mb-3 font-serif text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Bullets */}
        <ul className="mb-6 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/90">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>

        {/* Best for */}
        {bestFor.length > 0 && (
          <div className="mb-6 border-t border-border/20 pt-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-primary/70">
              {bestForLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bestFor.map((tag, i) => (
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

        {/* CTA */}
        <Link
          href={ctaLink}
          className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary hover:gap-3 transition-all duration-300"
        >
          {cta}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

// ─── Secondary card (smaller) ─────────────────────────────────────────────────
function SecondaryCard({
  icon: Icon,
  title,
  description,
  bullets,
  index,
}: {
  icon: typeof Globe
  title: string
  description: string
  bullets: string[]
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
      <div className="relative h-full border border-border/30 bg-surface/30 p-6 transition-all duration-500 hover:border-border/60 hover:bg-surface/50 flex flex-col">
        <div className="mb-4 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-border/40 transition-all duration-500 group-hover:border-primary/30">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>

        <h4 className="mb-2 font-serif text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>

        <p className="mb-4 text-xs leading-relaxed text-muted-foreground/80">
          {description}
        </p>

        <ul className="mt-auto space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground/70">
              <span className="mt-1.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-primary/50" />
              {b}
            </li>
          ))}
        </ul>

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

function InlineSectionCta({
  href,
  label,
  helper,
}: {
  href: string
  label: string
  helper: string
}) {
  return (
    <div className="mt-8 border border-border/30 bg-surface/20 p-5 sm:p-6">
      <p className="mb-3 text-xs text-muted-foreground">{helper}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 border border-primary/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-background"
      >
        {label}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ServicesSection({ t, lang }: ServicesSectionProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: coreRef, isVisible: coreVisible } = useScrollAnimation()
  const { ref: engRef, isVisible: engVisible } = useScrollAnimation()
  const { ref: consultRef, isVisible: consultVisible } = useScrollAnimation()
  const { ref: flowRef, isVisible: flowVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const sv = t.servicesPage
  const serviceSlugs = ["payments", "booking", "marketplaces"]

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
                { href: "#core", label: sv.anchorCore },
                { href: "#engineering", label: sv.anchorEngineering },
                { href: "#consulting", label: sv.anchorConsulting },
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

          {/* ── 1. Core Solutions ── */}
          <div id="core" className="mb-24 lg:mb-32">
            <div ref={coreRef}>
              <SectionLabel
                label="01"
                title={sv.core.label}
                subtitle={sv.core.subtitle}
                visible={coreVisible}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {sv.core.items.map((item, i) => (
                <CoreCard
                  key={i}
                  icon={CORE_ICONS[i]}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  bestFor={item.bestFor}
                  bestForLabel={sv.bestForLabel}
                  cta={sv.ctaStart}
                  ctaLink={`/${lang}/contacts?from=services&service=${serviceSlugs[i] || "core"}`}
                  index={i}
                />
              ))}
            </div>
            <InlineSectionCta
              href={`/${lang}/contacts?from=services&section=core`}
              label={sv.ctaStart}
              helper={sv.ctaHelper}
            />
          </div>

          {/* ── Flow connector ── */}
          <div ref={flowRef} className={`mb-24 lg:mb-32 transition-all duration-700 ${flowVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="border border-border/20 bg-surface/20 p-6 lg:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-primary/70">
                {sv.flowLabel}
              </p>
              <FlowBadge items={sv.flowItems} />
              <p className="mt-4 text-xs text-muted-foreground/70 max-w-lg">
                {sv.flowDescription}
              </p>
            </div>
          </div>

          {/* ── 2. Engineering Services ── */}
          <div id="engineering" className="mb-24 lg:mb-32 border border-border/20 bg-surface/15 p-6 sm:p-8 lg:p-10">
            <div ref={engRef}>
              <SectionLabel
                label="02"
                title={sv.engineering.label}
                subtitle={sv.engineering.subtitle}
                visible={engVisible}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {sv.engineering.items.map((item, i) => (
                <SecondaryCard
                  key={i}
                  icon={ENGINEERING_ICONS[i]}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  index={i}
                />
              ))}
            </div>
            <InlineSectionCta
              href={`/${lang}/contacts?from=services&section=engineering`}
              label={sv.ctaTalk}
              helper={sv.ctaHelper}
            />
          </div>

          {/* ── 3. Architecture & Consulting ── */}
          <div id="consulting" className="mb-20">
            <div ref={consultRef}>
              <SectionLabel
                label="03"
                title={sv.consulting.label}
                subtitle={sv.consulting.subtitle}
                visible={consultVisible}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {sv.consulting.items.map((item, i) => (
                <SecondaryCard
                  key={i}
                  icon={CONSULTING_ICONS[i]}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  index={i}
                />
              ))}
            </div>
            <InlineSectionCta
              href={`/${lang}/contacts?from=services&section=consulting`}
              label={sv.ctaTalk}
              helper={sv.ctaHelper}
            />
          </div>

          {/* ── Bottom CTA ── */}
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
            <Link
              href={`/${lang}/contacts?from=services`}
              className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              {sv.ctaTalk}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
