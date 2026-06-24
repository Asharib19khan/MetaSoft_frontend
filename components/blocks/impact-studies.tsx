"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const CASES = [
  {
    id: "01",
    metric: "$5.2M",
    metricLabel: "Oracle Licensing Saved",
    title: "Global Financial Infrastructure Consolidation",
    desc: "By auditing unutilized cores and restructuring active-passive Data Guard setups, we recovered millions in wasted Oracle enterprise licensing while improving total database throughput.",
  },
  {
    id: "02",
    metric: "0 Min",
    metricLabel: "Downtime Recorded",
    title: "Cross-Cloud 48hr Critical Migration",
    desc: "Engineered a zero-downtime migration of a 50TB critical OLTP database from legacy on-prem hardware directly to OCI using active replication logic.",
  },
  {
    id: "03",
    metric: "99.999%",
    metricLabel: "Maintained Uptime",
    title: "National Health Records Resilience",
    desc: "Architected a dual-region RAC environment to guarantee absolute continuity for national healthcare systems during catastrophic regional failure scenarios.",
  }
]

export function ImpactStudies() {
  const [hovered, setHovered] = useState<string | null>("01")

  return (
    <section className="bg-base section-padding border-y border-line" id="impact">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary mb-4">
            Quantifiable Impact
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl max-w-2xl leading-[1.1]">
            Engineering outcomes that scale.
          </h2>
        </div>

        <div className="w-full border-t border-line" />

        {/* Accordion / Hover List */}
        <div className="flex flex-col w-full">
          {CASES.map((item) => (
            <div 
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              className="group flex flex-col lg:flex-row lg:items-center border-b border-line py-8 lg:py-12 cursor-pointer transition-colors hover:bg-elevated relative overflow-hidden"
            >
              <div className="lg:w-1/3 flex flex-col pl-4 lg:pl-8 border-l-2 border-transparent transition-colors group-hover:border-ink z-10">
                <p className="font-display text-5xl lg:text-7xl font-bold text-ink">{item.metric}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary">{item.metricLabel}</p>
              </div>
              
              <div className="lg:w-2/3 flex flex-col lg:flex-row lg:items-start lg:items-center justify-between gap-6 lg:gap-12 mt-8 lg:mt-0 px-4 lg:px-8 z-10">
                <div className="flex flex-col max-w-xl">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-3 group-hover:underline decoration-1 underline-offset-4">{item.title}</h3>
                  <AnimatePresence>
                    {(hovered === item.id) && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-base text-ink-secondary leading-[1.7]"
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="hidden lg:flex w-14 h-14 shrink-0 rounded-full border border-line items-center justify-center group-hover:bg-ink group-hover:border-ink transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-ink group-hover:text-base" />
                </div>
              </div>
              
              {/* Subtle hover background logic */}
              <div className={`absolute inset-0 bg-ink/[0.02] opacity-0 transition-opacity duration-500 ${hovered === item.id ? 'opacity-100' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
