"use client"

import { motion } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TiltCard({ children, className = "", delay = 0 }: TiltCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative z-20 rounded-2xl border border-line bg-surface p-6 sm:p-8 hover:border-brand/40 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
    >
      <div className="h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}
