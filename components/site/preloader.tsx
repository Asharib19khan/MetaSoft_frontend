"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CinematicPreloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if they've already seen it this session
    const hasSeen = sessionStorage.getItem("hasSeenPreloader")
    if (hasSeen === "true") {
      setIsVisible(false)
      return
    }

    // Run the loading sequence
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress > 100) currentProgress = 100
      
      setProgress(currentProgress)

      if (currentProgress === 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsVisible(false)
          sessionStorage.setItem("hasSeenPreloader", "true")
        }, 800) // Brief pause at 100% before opening curtain
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Don't render anything on server to prevent hydration mismatch
  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Logo Flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: progress === 100 ? 1 : 0,
                scale: progress === 100 ? 1 : 0.9 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute text-white font-display text-4xl md:text-7xl font-bold tracking-tighter"
            >
              METASOFT.
            </motion.div>
            
            {/* Counter */}
            <motion.div
              animate={{ 
                opacity: progress === 100 ? 0 : 1,
                y: progress === 100 ? -20 : 0
              }}
              transition={{ duration: 0.4 }}
              className="absolute text-white/50 font-mono text-2xl md:text-5xl font-light tracking-widest"
            >
              {progress.toString().padStart(3, '0')}
            </motion.div>
          </div>

          {/* Bottom Loading Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
