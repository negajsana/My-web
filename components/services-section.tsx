// Updated: all CTAs now point to /contacts

"use client"

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
}

const CORE_ICONS = [CreditCard, CalendarCheck, ShoppingBag]
const ENGINEERING_ICONS = [Globe, Smartphone, Plug]
const CONSULTING_ICONS = [Cpu, TrendingUp, ClipboardCheck]

const CONTACTS_LINK = "/contacts"

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
  bestFor,
  cta,
  index,
}: any) {
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

        <div className="mb-6 flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">
          {title}
        </h3>

        <p className="mb-5 text-sm text-muted-foreground">
          {description}
        </p>

        <ul className="mb-6 space-y-2">
          {bullets.map((b: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/90">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>

        {bestFor.length > 0 && (
          <div className="mb-6 border-t border-border/20 pt-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-primary/70">
              Best for
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bestFor.map((tag: string, i: number) => (
                <span key={i} className="text-[11px] border px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <a
          href={CONTACTS_LINK}
          className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary"
        >
          {cta}
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const sv = t.servicesPage

  return (
    <section id="services" className="py-28">
      <div className="container mx-auto px-6">

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`border-t pt-16 text-center ${
            ctaVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-primary">
            {sv.ctaLabel}
          </p>
          <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">
            {sv.ctaTitle}
          </h3>
          <a
            href={CONTACTS_LINK}
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-background"
          >
            <MessageSquare className="h-4 w-4" />
            {sv.ctaButton}
          </a>
        </div>

      </div>
    </section>
  )
}
