"use client"

import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import type { TranslationKey } from "@/lib/translations"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface NavigationProps {
  t: TranslationKey
  lang: string
}

export function Navigation({ t, lang }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const navLinks = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/services`, label: t.nav.services },
    { href: `/${lang}/projects`, label: t.nav.projects },
    { href: `/${lang}/how-we-work`, label: t.nav.howWeWork },
    { href: `/${lang}/contact`, label: t.nav.contact },
  ]

  const overlay = (
    <div
      className={`fixed inset-0 bg-background/98 backdrop-blur-2xl transition-all duration-500 ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      <button
        className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center text-foreground"
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex flex-col items-center justify-center h-full gap-8">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-3xl font-serif text-foreground hover:text-primary transition-all duration-500 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: menuOpen ? `${index * 80 + 100}ms` : "0ms" }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/30 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${lang}`} className="group flex items-center gap-1">
              <span className="text-xl font-serif tracking-wide text-foreground transition-colors group-hover:text-primary">
                Code Architect
              </span>
              <span className="text-primary text-2xl leading-none">.</span>
            </Link>

            {/* Right side: language switcher + burger (always visible on ALL devices) */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <button
                className="relative w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
