"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Diamond } from "lucide-react"
import { HeroVisual } from "./hero-visual"
import { useCountUp } from "@/hooks/use-count-up"

const HEADLINE = ["Enterprise", "IT.", "Simplified."]

const STATS = [
  { value: 20, suffix: "+", label: "Years of Expertise" },
  { value: 10, suffix: "+", label: "Clients Served" },
  { value: 4, suffix: "", label: "Core Service Domains" },
]

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value)
  return (
    <div className="flex-1">
      <p className="font-mono text-4xl font-bold text-ink sm:text-5xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="mt-1 text-xs text-ink-secondary sm:text-sm">{label}</p>
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle 700px at 18% 50%, rgba(30,155,151,0.18), transparent), radial-gradient(circle 520px at 78% 28%, rgba(235,180,36,0.12), transparent)",
        }}
      />

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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-w-[520px] text-lg leading-[1.75] text-ink-secondary"
          >
            MetaSoft liberates businesses from IT complexity — delivering expert Database Administration, Oracle EBS,
            System Administration, and IT Consulting to organizations across Pakistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-stretch gap-6 border-y border-line py-6"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center gap-6">
                <Stat {...s} />
                {i < STATS.length - 1 && <span className="h-12 w-px bg-line" />}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(30,155,151,0.45)]"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-line-hover px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-elevated"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-first lg:order-none"
        >
          <HeroVisual />
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
