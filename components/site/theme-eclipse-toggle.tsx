"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeEclipseToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-line hover:border-ink transition-colors overflow-hidden group shrink-0"
      aria-label="Toggle Theme"
    >
      {/* Sun/Moon representation */}
      <div className="relative w-4 h-4 rounded-full border border-ink overflow-hidden group-hover:scale-110 transition-transform duration-300">
        <motion.div 
          className="absolute inset-0 bg-ink rounded-full scale-110"
          initial={false}
          animate={{ x: isDark ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </button>
  )
}
