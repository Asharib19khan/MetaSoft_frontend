"use client"

import { motion } from "framer-motion"
import { fadeUp, stagger, viewport } from "./motion"

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: {
  label: string
  title: string
  subtitle?: string
  align?: "center" | "left"
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={`flex flex-col ${alignment}`}
    >
      <motion.span variants={fadeUp} className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
        {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-3 max-w-3xl text-balance font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        className={`mt-5 h-px w-40 gradient-rule ${align === "center" ? "" : "ml-0"}`}
      />
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-pretty text-base leading-[1.7] text-ink-secondary">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
