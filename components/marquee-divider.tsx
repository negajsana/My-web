"use client"

interface MarqueeDividerProps {
  items: string[]
}

export function MarqueeDivider({ items }: MarqueeDividerProps) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="py-8 overflow-hidden border-y border-border/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8 mx-8">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground/40">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
          </span>
        ))}
      </div>
    </div>
  )
}
