"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function PremiumServiceCard({
  icon,
  title,
  description,
  className,
}: PremiumServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-[0_0_20px_rgba(30,155,151,0.15)]",
        className,
      )}
    >
      {/* Glow background effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with glow */}
        <div className="mb-4 inline-block rounded-lg bg-brand/10 p-3 transition-all duration-300 group-hover:bg-brand/20 group-hover:shadow-[0_0_12px_rgba(30,155,151,0.3)]">
          <div className="text-brand transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-ink-secondary transition-colors duration-300 group-hover:text-ink-secondary/90">
          {description}
        </p>
      </div>

      {/* Border trace effect on hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0 transition-all duration-300 group-hover:border-brand/30 group-hover:opacity-100" />
    </div>
  )
}
