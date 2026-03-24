"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface CaseResult {
  value: string
  label: string
}

interface CaseResultsGridProps {
  results: CaseResult[]
}

export function CaseResultsGrid({ results }: CaseResultsGridProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-3">
      {results.map((result, index) => (
        <div
          key={`${result.value}-${result.label}`}
          className={`rounded-2xl bg-background border border-primary/30 p-6 md:p-7 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <p className="text-5xl md:text-6xl font-black text-primary tracking-tight leading-none">{result.value}</p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.18em] text-muted-foreground">{result.label}</p>
        </div>
      ))}
    </div>
  )
}
