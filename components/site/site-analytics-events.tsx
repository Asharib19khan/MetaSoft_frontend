"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"

const DEPTH_STEPS = [25, 50, 75, 100]

export function SiteAnalyticsEvents() {
  useEffect(() => {
    const fired = new Set<number>()

    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(100, Math.round((window.scrollY / scrollable) * 100))

      DEPTH_STEPS.forEach((depth) => {
        if (progress >= depth && !fired.has(depth)) {
          fired.add(depth)
          track("scroll_depth", { depth })
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return null
}