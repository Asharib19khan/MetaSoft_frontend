"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ----------------------------------------------------------------------
// Magnetic Wrapper - small, lightweight hover parallax
// ----------------------------------------------------------------------
export function MagneticWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = e
    const { height, width, left, top } = el.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className={cn("relative inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

// ----------------------------------------------------------------------
// Button primitives using framer-motion. We cast props when spreading
// to avoid framer-motion's stricter event typings while keeping runtime
// behavior unchanged.
// ----------------------------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const ShineButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & { href?: string }>(
  ({ children, className, href, ...props }, ref) => {
    const Comp = href ? motion.a : motion.button
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-black shadow-[0_8px_28px_rgba(0,240,255,0.06)] transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]",
          className,
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-12 bg-white/30" />
        </div>
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </Comp>
    )
  },
)
ShineButton.displayName = "ShineButton"

export const GradientBorderButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & { href?: string }>(
  ({ children, className, href, ...props }, ref) => {
    const Comp = href ? motion.a : motion.button
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-base",
          className,
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00f0ff_50%,#000000_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-base/95 px-8 py-3 text-sm font-semibold text-white backdrop-blur-3xl transition-colors hover:bg-base/80">
          {children}
        </span>
      </Comp>
    )
  },
)
GradientBorderButton.displayName = "GradientBorderButton"

export const TextRevealButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & { href?: string }>(
  ({ children, className, href, ...props }, ref) => {
    const Comp = href ? motion.a : motion.button
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        whileHover="hover"
        initial="initial"
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10",
          className,
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: "-150%" },
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center gap-2"
        >
          {children}
        </motion.div>
        <motion.div
          variants={{
            initial: { y: "150%" },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 flex items-center justify-center gap-2"
        >
          {children}
        </motion.div>
      </Comp>
    )
  },
)
TextRevealButton.displayName = "TextRevealButton"

