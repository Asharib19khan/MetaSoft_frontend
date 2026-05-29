"use client"

import { motion } from "framer-motion"
import { Diamond } from "lucide-react"
import { fadeUp, stagger, viewport } from "./motion"

const VALUES = [
  { title: "Excellence", text: "We hold our output to the standards of the world's best IT shops." },
  { title: "Innovation", text: "Modern solutions applied to both legacy infrastructure and greenfield projects." },
  { title: "Client Centricity", text: "We measure success by yours, not by hours billed." },
]

export function About() {
  return (
    <section id="about" className="relative bg-base py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[55fr_45fr] lg:px-8">
        {/* left */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.span variants={fadeUp} className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            About MetaSoft
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            Two Decades of Expertise. One Company Built Around Yours.
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 h-px w-40 gradient-rule" />

          <motion.p variants={fadeUp} className="mt-6 text-base leading-[1.75] text-ink-secondary">
            Founded in 2021 in Karachi, MetaSoft has rapidly become a trusted IT partner for organizations across
            Pakistan&apos;s finance, healthcare, manufacturing, and technology sectors. Our CTO and founder, Muhammad
            Adnan Khan, brings over 20 years of hands-on enterprise IT experience — spanning relational database design,
            ERP systems, and large-scale infrastructure projects.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-[1.75] text-ink-secondary">
            We&apos;re not a generalist agency. We&apos;re a specialized team that goes deep, not wide — bringing
            enterprise-grade rigor to every engagement, whether on-site or remote.
          </motion.p>

          <motion.div variants={stagger} className="mt-8 flex flex-col gap-4">
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="flex items-start gap-3">
                <Diamond className="mt-1 h-3.5 w-3.5 shrink-0 fill-brand text-brand" />
                <p className="text-[15px] leading-[1.6] text-ink-secondary">
                  <span className="font-semibold text-ink">{v.title}</span> — {v.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* right decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8 }}
          className="relative mx-auto h-[400px] w-full max-w-[420px]"
        >
          <motion.svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(255,255,255,0.04)" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(255,255,255,0.04)" />
            ))}
            <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(29,111,235,0.5)" strokeWidth="1" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(0,196,204,0.35)" strokeWidth="1" />
            <circle cx="200" cy="30" r="4" fill="#1D6FEB" />
            <circle cx="370" cy="200" r="3" fill="#00C4CC" />
            <circle cx="90" cy="310" r="3" fill="#C8A96E" />
          </motion.svg>

          {/* floating glass stat cards */}
          <div className="absolute left-2 top-10 glass rounded-xl px-4 py-3">
            <p className="font-mono text-2xl font-bold text-ink">99.9%</p>
            <p className="text-xs text-ink-secondary">Uptime focus</p>
          </div>
          <div className="absolute bottom-12 right-2 glass rounded-xl px-4 py-3">
            <p className="font-mono text-2xl font-bold text-ink">24/7</p>
            <p className="text-xs text-ink-secondary">Remote support</p>
          </div>
          <div className="absolute bottom-4 left-8 glass rounded-xl px-4 py-3">
            <p className="font-mono text-2xl font-bold text-ink">2021</p>
            <p className="text-xs text-ink-secondary">Founded in Karachi</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
