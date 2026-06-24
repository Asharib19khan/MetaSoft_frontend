"use client"

import React, { useRef, useState, MouseEvent } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)
  const [glareOpacity, setGlareOpacity] = useState(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width
    const yPct = mouseY / height

    const rotateXValue = (yPct - 0.5) * -15 // Max rotation 15deg
    const rotateYValue = (xPct - 0.5) * 15

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)

    setGlareX(xPct * 100)
    setGlareY(yPct * 100)
    setGlareOpacity(0.4)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlareOpacity(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={cn("relative z-10", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: glareOpacity,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
