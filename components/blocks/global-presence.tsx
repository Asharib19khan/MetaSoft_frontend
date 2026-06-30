"use client"

import { motion } from "framer-motion"

// Simplified representation of data center nodes
const NODES = [
  { top: "30%", left: "20%", name: "US West", delay: 0 },
  { top: "35%", left: "28%", name: "US East", delay: 0.2 },
  { top: "25%", left: "48%", name: "UK London", delay: 0.4 },
  { top: "28%", left: "52%", name: "EU Frankfurt", delay: 0.1 },
  { top: "45%", left: "65%", name: "ME Dubai", delay: 0.5 },
  { top: "60%", left: "75%", name: "APAC Singapore", delay: 0.3 },
  { top: "65%", left: "85%", name: "APAC Sydney", delay: 0.6 },
]

export function GlobalPresence() {
  return (
    <section className="bg-surface section-padding border-y border-line overflow-hidden" id="presence">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col items-start z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary mb-4">
              Global Scale
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-ink max-w-xl leading-[1.1]">
              Engineered for the planet.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-[1.8] text-ink-secondary font-sans">
              Our support infrastructure spans major availability zones, ensuring sub-millisecond response times and resilient active-active database replication across borders.
            </p>
            <div className="mt-10 flex gap-12 border-t border-line pt-8 w-full">
              <div className="flex flex-col gap-2">
                <span className="font-display text-4xl font-bold text-ink">12+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-secondary">Data Centers</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-4xl font-bold text-ink">&lt;5ms</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-secondary">P99 Latency</span>
              </div>
            </div>
          </div>

          {/* Node Visualization */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-base rounded-sm border border-line flex items-center justify-center overflow-hidden">
            
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(to right, var(--theme-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-ink) 1px, transparent 1px)`,
                backgroundSize: "24px 24px"
              }}
            />
            
            {/* Pulsing Nodes */}
            {NODES.map((node, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center group"
                style={{ top: node.top, left: node.left }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: node.delay, duration: 0.5 }}
              >
                {/* Ping */}
                <motion.div
                  className="absolute w-4 h-4 rounded-full bg-ink/20 dark:bg-ink/40"
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                />
                {/* Core */}
                <div className="w-1.5 h-1.5 rounded-full bg-ink relative z-10" />
                
                {/* Hover Label */}
                <div className="absolute left-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-line px-2 py-1 rounded-sm shadow-sm pointer-events-none z-20 whitespace-nowrap">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink">{node.name}</span>
                </div>
              </motion.div>
            ))}

            {/* Connecting lines abstraction */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
              <path 
                d="M 20% 30% Q 30% 20% 48% 25% T 65% 45% T 85% 65%" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              <path 
                d="M 28% 35% Q 40% 40% 52% 28% T 75% 60%" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
            </svg>

          </div>
        </div>

      </div>
    </section>
  )
}
