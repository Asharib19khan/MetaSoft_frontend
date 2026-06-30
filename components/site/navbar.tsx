"use client"

import { useEffect, useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Logo } from "./logo"
import { ThemeEclipseToggle } from "./theme-eclipse-toggle"
import { MegaMenu } from "./mega-menu"

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  useEffect(() => {
    if (megaMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [megaMenuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 flex justify-center px-4 md:px-6 transition-all duration-300 ${
          scrolled ? "top-2 md:top-3" : "top-4 md:top-6"
        }`}
      >
        <div
          className={`transition-all duration-300 w-full max-w-[1400px] border-b ${
            scrolled
              ? "bg-base/90 border-line shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md"
              : "bg-base/0 border-transparent"
          }`}
        >
          <nav className="flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
            <Link href="/" aria-label="MetaSoft home" className="z-10">
              <Logo />
            </Link>

            <div className="flex items-center gap-6 z-10">
              <ThemeEclipseToggle />
              
              <button
                onClick={() => setMegaMenuOpen(true)}
                className="text-xs font-bold uppercase tracking-[0.1em] text-ink hover:text-ink-secondary transition-colors"
              >
                Menu
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
    </>
  )
}
