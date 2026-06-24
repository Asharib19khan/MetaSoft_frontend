"use client"

import { ReactLenis } from "@studio-freight/react-lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 0.6, smoothWheel: true }}>
      {/* @ts-expect-error - React 19 type mismatch with Lenis ReactNode */}
      {children}
    </ReactLenis>
  )
}
