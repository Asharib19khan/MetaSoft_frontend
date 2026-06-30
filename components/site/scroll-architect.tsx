"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollArchitect() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transformations linked to scroll physics
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-45, 45])
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[150vh] bg-base flex flex-col items-center justify-center overflow-hidden border-b border-line"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
        
        {/* Background typographic layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-5 pointer-events-none z-0">
          <h2 className="text-[20vw] font-display font-black leading-none tracking-tighter whitespace-nowrap">
            ARCHITECTURE
          </h2>
          <h2 className="text-[20vw] font-display font-black leading-none tracking-tighter whitespace-nowrap -scale-y-100">
            ARCHITECTURE
          </h2>
        </div>

        <motion.div 
          className="relative z-10 w-[90vw] lg:w-[60vw] max-w-[800px] aspect-square flex items-center justify-center transform-style-3d"
          style={{
            rotateX,
            rotateY,
            rotateZ,
            scale,
            opacity
          }}
        >
          {/* Abstract Wireframe Core */}
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-ink fill-transparent stroke-[0.2]">
            <motion.circle cx="50" cy="50" r="45" className="stroke-[0.1]" strokeDasharray="2 4" />
            <motion.circle cx="50" cy="50" r="35" className="stroke-[0.3]" />
            <motion.circle cx="50" cy="50" r="25" strokeDasharray="1 2" />
            <motion.circle cx="50" cy="50" r="10" className="fill-ink" />
            
            {/* Connecting lines */}
            <line x1="50" y1="5" x2="50" y2="15" />
            <line x1="50" y1="85" x2="50" y2="95" />
            <line x1="5" y1="50" x2="15" y2="50" />
            <line x1="85" y1="50" x2="95" y2="50" />
            
            {/* Diagonal lines */}
            <line x1="18" y1="18" x2="25" y2="25" />
            <line x1="82" y1="82" x2="75" y2="75" />
            <line x1="18" y1="82" x2="25" y2="75" />
            <line x1="82" y1="18" x2="75" y2="25" />

            {/* Orbiting nodes */}
            <circle cx="50" cy="5" r="1" className="fill-ink" />
            <circle cx="50" cy="95" r="1" className="fill-ink" />
            <circle cx="5" cy="50" r="1" className="fill-ink" />
            <circle cx="95" cy="50" r="1" className="fill-ink" />
          </svg>
        </motion.div>

        {/* Foreground Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div 
            className="bg-base/80 backdrop-blur-md border border-line p-6 md:p-8 max-w-[90vw] md:max-w-md text-center shadow-2xl"
            style={{ opacity }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary mb-4">Mission-Critical DBA</p>
            <h3 className="text-3xl font-display font-bold text-ink mb-4">High-Availability Architecture</h3>
            <p className="text-ink-secondary leading-relaxed">
              Every database instance and Oracle cluster is engineered for maximum uptime. As your enterprise data scales, our architecture adapts fluidly to eliminate performance bottlenecks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
