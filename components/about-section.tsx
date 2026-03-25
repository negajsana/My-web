"use client"

import type { TranslationKey } from "@/lib/translations"
import { Code2, Sparkles, Target } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

interface AboutSectionProps {
  t: TranslationKey
}

function AnimatedCard({
  icon: Icon,
  text,
  index,
}: {
  icon: typeof Code2
  text: string
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`group relative p-8 border border-border/50 transition-all duration-700 hover:border-primary/30 hover:bg-surface-elevated/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />

      <div className="mb-6">
        <Icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>
      <p className="text-muted-foreground leading-relaxed text-base">{text}</p>
    </div>
  )
}

// Photo filenames in /public/ — replace with real photos when ready:
// Alexander.jpg, Evgeny.jpg, Egor.jpg
const teamPhotos: Record<number, string> = {
  0: "/Alexander.jpg",
  1: "/Evgeny.jpg",
  2: "/Egor.jpg",
  3: "/Artem.jpg",
}

function TeamMemberCard({
  name,
  role,
  description,
  index,
}: {
  name: string
  role: string
  description: string
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })
  const photo = teamPhotos[index]

  return (
    <div
      ref={ref}
      className={`group relative p-8 border border-border/50 transition-all duration-700 hover:border-primary/30 hover:bg-surface-elevated/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />

      {/* Avatar */}
      <div className="mb-6 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
        <Image
          src={photo}
          alt={name}
          width={128}
          height={128}
          sizes="64px"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-serif text-foreground mb-1">{name}</h3>
      <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">{role}</p>
      <p className="text-muted-foreground leading-relaxed text-base">{description}</p>
    </div>
  )
}

export function AboutSection({ t }: AboutSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: teamTitleRef, isVisible: teamTitleVisible } = useScrollAnimation()

  const cards = [
    { icon: Code2, text: t.about.intro },
    { icon: Sparkles, text: t.about.experience },
    { icon: Target, text: t.about.focus },
  ]

  const team = t.about.team || []

  return (
    <section id="about" className="py-32 lg:py-40 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-20">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t.about.title}
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {t.about.title}
            </h2>
            <div
              className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            />
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-32">
            {cards.map((card, index) => (
              <AnimatedCard key={index} icon={card.icon} text={card.text} index={index} />
            ))}
          </div>

          {/* Team Section */}
          {team.length > 0 && (
            <>
              <div ref={teamTitleRef} className="text-center mb-16">
                <span
                  className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                    teamTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {t.about.teamLabel}
                </span>
                <h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground transition-all duration-700 ${
                    teamTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  {t.about.teamTitle}
                </h2>
                <div
                  className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                    teamTitleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {team.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
