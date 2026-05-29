"use client"

import { SectionHeader } from "./section-header"
import { motion } from "framer-motion"

const INDUSTRIES = ["Finance", "Healthcare", "Manufacturing", "Retail", "Technology"]

const ROW_ONE = [
  { name: "Computer Research Private Limited", logo: "crpl" },
  { name: "IGI Securities", logo: "igi" },
  { name: "Phoenix", logo: "phoenix" },
  { name: "Richa Leather", logo: "richa" },
]
const ROW_TWO = [
  { name: "DataCheck", logo: "datacheck" },
  { name: "National Medical Centre", logo: "nmc" },
  { name: "Shirazi Investments", logo: "shirazi" },
  { name: "Vanguard", logo: "vanguard" }
]

function MarqueeRow({ items, direction }: { items: typeof ROW_ONE; direction: "left" | "right" }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row group relative overflow-hidden flex w-full">
      <div
        className={`flex w-max items-center gap-12 py-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((client, i) => (
          <div key={`${client.name}-${i}`} className="flex items-center gap-4 transition-all duration-300 opacity-60 hover:opacity-100 grayscale hover:grayscale-0">
            {/* Replace this div with an actual <Image> when client PNGs are available. Currently using a placeholder block to simulate the B&W PNG logo. */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line p-2 shadow-sm">
              <span className="font-mono text-xs font-bold text-ink-muted">{client.logo.substring(0, 3).toUpperCase()}</span>
            </div>
            <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink">
              {client.name}
            </span>
            <span className="ml-8 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <motion.section
      id="clients"
      className="relative bg-base py-24 lg:py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <SectionHeader
          label="Trusted By"
          title="Built for Organizations That Can't Afford Downtime."
          subtitle="Our clients span finance, healthcare, manufacturing, retail, and technology."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-line bg-elevated px-4 py-1.5 text-sm text-ink-secondary"
            >
              {ind}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-8 relative overflow-hidden">
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />

        <div className="relative">
          <MarqueeRow items={ROW_ONE} direction="left" />
        </div>
        <div className="relative">
          <MarqueeRow items={ROW_TWO} direction="right" />
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-xl px-5 text-center text-sm text-ink-secondary">
        10+ organizations trust MetaSoft to keep their infrastructure running.
      </p>
    </motion.section>
  )
}
