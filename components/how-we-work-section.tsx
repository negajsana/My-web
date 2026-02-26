"use client"

import type { TranslationKey } from "@/lib/translations"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowUpRight, Plus, Minus } from "lucide-react"
import Link from "next/link"

interface HowWeWorkSectionProps {
  t: TranslationKey
  lang: string
}

export function HowWeWorkSection({ t, lang }: HowWeWorkSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section className="py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div ref={titleRef} className="mb-20">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t.howWeWork.label}
            </span>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              {t.howWeWork.title}
            </h1>
            <p
              className={`text-muted-foreground text-lg mt-6 leading-relaxed max-w-xl transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {t.howWeWork.subtitle}
            </p>
            <div
              className={`h-px w-16 bg-primary/40 mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            />
          </div>

          {/* Accordion */}
          <div
            ref={contentRef}
            className={`flex flex-col divide-y divide-border/40 transition-all duration-700 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.howWeWork.steps.map((step, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index}>
                  <button
                    className="w-full flex items-start gap-6 py-8 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-shrink-0 text-xs uppercase tracking-[0.3em] text-primary/60 pt-1 w-8">
                      {step.number}
                    </span>
                    <span className={`flex-1 text-xl md:text-2xl font-serif transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}>
                      {step.title}
                    </span>
                    <span className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="pl-14 pb-8 pr-4">
                      {step.duration && (
                        <span className="inline-block text-xs uppercase tracking-widest text-primary/70 border border-primary/25 px-3 py-1 mb-4">
                          {step.duration}
                        </span>
                      )}
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 pt-12 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-muted-foreground text-base flex-1">
              {t.howWeWork.ctaText}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_40px_rgba(180,150,80,0.25)] flex-shrink-0"
            >
              {t.howWeWork.ctaButton}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
