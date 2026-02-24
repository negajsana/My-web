import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="relative py-12 border-t border-border/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground/60">O</span>
            <span className="text-lg font-light text-foreground/30">leksandr</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/NE_106"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              Telegram
            </a>
            <a
              href="https://wa.me/4915154730846"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-muted-foreground/50">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
