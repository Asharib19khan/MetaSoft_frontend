"use client"

import { motion } from "framer-motion"
import { fadeUp, stagger, viewport } from "./motion"

const MILESTONES = [
  { year: "2021", title: "Founded", text: "Founded in Karachi, Pakistan. First team assembled." },
  {
    year: "2022",
    title: "First Contracts",
    text: "Signed with Phoenix and National Medical Centre — establishing our enterprise credentials.",
  },
  {
    year: "2023",
    title: "Rapid Growth",
    text: "Expanded to six-plus clients across diversified industries and service domains.",
  },
  {
    year: "2024",
    title: "Scaling Up",
    text: "Four additional enterprise contracts in progress — continuing our trajectory.",
  },
]

export function Milestones() {
  return (
    <section id="milestones" className="relative bg-elevated py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.span variants={fadeUp} className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            Our Journey
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            Four Years. Steady Growth.
          </motion.h2>
        </motion.div>

        {/* line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="relative mt-16"
        >
          <div className="absolute left-0 top-[7px] hidden h-px w-full lg:block">
            <svg className="h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 1">
              <motion.line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="url(#tl-grad)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewport}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="tl-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1D6FEB" />
                  <stop offset="100%" stopColor="#00C4CC" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* vertical line for mobile */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-brand to-accent2 lg:hidden" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                className="relative pl-8 lg:pl-0"
              >
                <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-line-hover bg-base lg:left-0 lg:top-0">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                </span>
                <p className="font-mono text-sm font-bold text-gold lg:mt-7">{m.year} · {m.title}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-secondary">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
