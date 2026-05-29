"use client"

import { SectionHeader } from "./section-header"

const INDUSTRIES = ["Finance", "Healthcare", "Manufacturing", "Retail", "Technology"]

const ROW_ONE = ["Computer Research Private Limited", "IGI Securities", "Phoenix", "Richa Leather"]
const ROW_TWO = ["DataCheck", "National Medical Centre", "Shirazi Investments"]

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row group relative overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((name, i) => (
          <div key={`${name}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-lg font-semibold text-ink-secondary transition-colors hover:text-ink">
              {name}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <section id="clients" className="relative bg-base py-24 lg:py-32">
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

      <div className="mt-14 flex flex-col gap-8">
        {/* fade masks */}
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
    </section>
  )
}
