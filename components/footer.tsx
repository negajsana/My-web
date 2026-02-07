"use client"

import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="relative py-16 border-t border-border/20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Marquee Banner */}
        <div className="overflow-hidden mb-16 -mx-6 lg:-mx-12">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-border/15 mx-8 select-none"
                aria-hidden="true"
              >
                Oleksandr
              </span>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif text-foreground">Oleksandr</span>
            <span className="text-primary text-xl">.</span>
          </div>

          <p className="text-sm text-muted-foreground tracking-wide">
            {t.footer.rights}
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/NE_106"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Telegram
            </a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a
              href="https://wa.me/4915154730846"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
