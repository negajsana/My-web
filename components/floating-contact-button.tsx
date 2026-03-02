"use client"

import Link from "next/link"
import { Phone } from "lucide-react"

interface FloatingContactButtonProps {
  lang: string
}

export function FloatingContactButton({ lang }: FloatingContactButtonProps) {
  return (
    <Link
      href={`/${lang}/contact`}
      aria-label="Contact us"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      style={{ borderRadius: "50%" }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping" />
      <Phone className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
    </Link>
  )
}
