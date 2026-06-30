"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function MissionBreak() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Move the background slightly up as user scrolls down for true parallax
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section ref={ref} className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden border-y border-line">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <div className="absolute inset-0 bg-black/70 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/mission-bg.png" 
          alt="Mission Background" 
          className="w-full h-full object-cover grayscale opacity-80"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-5 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6"
        >
          The MetaSoft Standard
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-4xl"
        >
          We don't just maintain systems. We engineer absolute continuity for the enterprise.
        </motion.h2>
        
        <div className="mt-16 w-px h-24 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
