"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading of heavy 3D assets and fonts
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds cinematic loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060606]"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute h-32 w-32 rounded-full border-t-2 border-r-2 border-[#00f0ff] opacity-80"
            />
            {/* Inner pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-24 w-24 rounded-full border border-[#00f0ff]"
            />
            
            {/* Center Logo/Text */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10 font-display text-2xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]"
            >
              M
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 overflow-hidden"
          >
            <div className="flex gap-1 font-mono text-xs uppercase tracking-[0.3em] text-[#00f0ff]">
              {"INITIALIZING_NEXUS".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-10 h-[1px] bg-gradient-to-r from-transparent via-[#1E9B97] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
