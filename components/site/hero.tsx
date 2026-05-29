"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Diamond } from "lucide-react"
import { track } from "@vercel/analytics"
import { HeroVisual } from "./hero-visual"
import { useCountUp } from "@/hooks/use-count-up"

const HEADLINE = ["Enterprise", "IT.", "Simplified."]

const FEATURES = [
  "24/7 infrastructure vigilance",
  "Oracle EBS lifecycle experts",
  "Resilience-first automation",
]

const STATS = [
  { value: 20, suffix: "+", label: "Years of Expertise" },
  { value: 10, suffix: "+", label: "Clients Served" },
  { value: 4, suffix: "", label: "Core Service Domains" },
]

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value)
  return (
    <div className="flex flex-col gap-2 rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-[0_22px_80px_-48px_rgba(0,240,255,0.4)] backdrop-blur-xl">
      <p className="font-mono text-4xl font-bold text-ink sm:text-5xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="text-sm uppercase tracking-[0.18em] text-ink-secondary">{label}</p>
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle 680px at 18% 40%, rgba(0,240,255,0.18), transparent), radial-gradient(circle 420px at 88% 18%, rgba(124,58,237,0.18), transparent), radial-gradient(circle 420px at 70% 85%, rgba(255,190,11,0.12), transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-base/90 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        {/* left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3.5 py-1.5"
          >
            <Diamond className="h-3 w-3 fill-gold text-gold" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
              Enterprise IT Services · Karachi, Pakistan
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.62 }}
            className="mt-6 max-w-[720px] text-lg leading-[1.8] text-ink-secondary"
          >
            MetaSoft liberates businesses from IT complexity with proactive database operations, Oracle EBS support,
            security-hardened system administration, and growth-ready advisory services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink-secondary shadow-sm transition hover:border-brand/30 hover:text-white"
              >
                {feature}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#services"
              onClick={() => track("cta_clicked", { placement: "hero", cta: "explore_services" })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black transition duration-200 hover:bg-brand-light hover:shadow-[0_0_32px_rgba(0,240,255,0.25)]"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={() => track("cta_clicked", { placement: "hero", cta: "book_consultation" })}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
            >
              Book a 15-minute Consultation
            </a>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.2 }}
          >
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-first lg:order-none"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-surface/80 p-5 shadow-[0_50px_120px_-80px_rgba(0,240,255,0.45)] backdrop-blur-xl">
            <HeroVisual />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base/95 via-base/30 to-transparent" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="block text-ink-secondary"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  )
}
