"use client"

import type { TranslationKey, Language } from "@/lib/translations"
import Link from "next/link"
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
  lang: Language // Добавили lang
}

// ─── Иконки ────────────────────────────────────────────────────────────────
const CORE_ICONS = [CreditCard, CalendarCheck, ShoppingBag]
const ENGINEERING_ICONS = [Globe, Smartphone, Plug]
const CONSULTING_ICONS = [Cpu, TrendingUp, ClipboardCheck]

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

function CoreCard({
  icon: Icon,
  title,
  description,
  bullets,
  index,
}: {
  icon: any
  title: string
  description: string
  bullets: string[]
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation(index * 100)
  return (
    <div
      ref={ref}
      className={`group relative border border-border/20 bg-surface/50 p-8 transition-all duration-700 hover:border-primary/30 hover:bg-surface ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-6 inline-flex p-4 border border-border/30 text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-4 text-xl font-serif font-semibold text-foreground">{title}</h3>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <FlowBadge items={bullets} />
    </div>
  )
}

function SecondaryCard({
  icon: Icon,
  title,
  description,
  bullets,
  index,
}: {
  icon: any
  title: string
  description: string
  bullets: string[]
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation(index * 100)
  return (
    <div
      ref={ref}
      className={`border border-border/10 p-6 transition-all duration-700 hover:border-primary/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-4 flex items-center gap-4">
        <Icon className="h-5 w-5 text-primary" />
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      <ul className="space-y-2">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary/50" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServicesSection({ t, lang }: ServicesSectionProps) {
  const sv = t.services // Убедись, что структура в translations совпадает
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  // Формируем правильную ссылку на контакты
  const contactLink = `/${lang}/contact`

  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl space-y-32">
        
        {/* ── Заголовок и главная кнопка ── */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">
              {sv.subtitle}
            </p>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              {sv.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {sv.description}
            </p>
          </div>
          {/* Исправленная кнопка "Начать проект" */}
          <Link
            href={contactLink}
            className="inline-flex h-12 items-center justify-center border border-primary px-8 text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-background flex-shrink-0"
          >
            {sv.startProjectBtn || "Start Project"} {/* Добавь startProjectBtn в переводы */}
          </Link>
        </div>

        {/* ── Основные услуги (Core) ── */}
        <div className="space-y-12">
          <h2 className="text-2xl font-serif font-medium text-foreground border-b border-border/20 pb-4">
            {sv.core.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sv.core.items.map((item, i) => (
              <CoreCard
                key={i}
                icon={CORE_ICONS[i] || CORE_ICONS[0]}
                title={item.title}
                description={item.description}
                bullets={item.bullets}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Инженерия (Engineering) ── */}
        <div className="space-y-12">
          <h2 className="text-2xl font-serif font-medium text-foreground border-b border-border/20 pb-4">
            {sv.engineering.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {sv.engineering.items.map((item, i) => (
              <SecondaryCard
                key={i}
                icon={ENGINEERING_ICONS[i] || ENGINEERING_ICONS[0]}
                title={item.title}
                description={item.description}
                bullets={item.bullets}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Консалтинг (Consulting) ── */}
        <div className="space-y-12">
          <h2 className="text-2xl font-serif font-medium text-foreground border-b border-border/20 pb-4">
            {sv.consulting.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {sv.consulting.items.map((item, i) => (
              <SecondaryCard
                key={i}
                icon={CONSULTING_ICONS[i] || CONSULTING_ICONS[0]}
                title={item.title}
                description={item.description}
                bullets={item.bullets}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Нижний CTA (Исправленный) ── */}
        <div
          ref={ctaRef}
          className={`border-t border-border/20 pt-16 text-center transition-all duration-700 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-primary">
            {sv.ctaLabel}
          </p>
          <h3 className="mb-6 font-serif text-2xl md:text-3xl font-semibold text-foreground">
            {sv.ctaTitle}
          </h3>
          <Link
            href={contactLink}
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-background transition-all duration-300"
          >
            <MessageSquare className="h-4 w-4" />
            {sv.ctaButton}
          </Link>
        </div>
      </div>
    </section>
  )
}
