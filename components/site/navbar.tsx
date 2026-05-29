"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Logo } from "./logo"

const SECTION_IDS = ["hero", "services", "about", "clients", "contact"]

const SERVICE_LINKS = [
  { label: "Database Administration", href: "#services" },
  { label: "Oracle EBS & Fusion", href: "#services" },
  { label: "System Administration", href: "#services" },
  { label: "IT Consulting & Advisory", href: "#services" },
]

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 80)
    if (latest > 200 && latest > prev) {
      setHidden(true)
    } else if (latest < prev) {
      setHidden(false)
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -55% 0px" },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-colors duration-300 ${
            scrolled ? "border-b border-line bg-base/90 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-8">
            <a href="#hero" aria-label="MetaSoft home">
              <Logo />
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-7 lg:flex">
              <NavLink href="#hero" label="Home" active={activeSection === "hero"} />
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`relative flex items-center gap-1 py-1 text-sm transition-colors ${
                    activeSection === "services" ? "text-ink" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  {activeSection === "services" && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand"
                    />
                  )}
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                    >
                      <div className="glass rounded-xl p-2 shadow-2xl">
                        {SERVICE_LINKS.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setServicesOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm text-ink-secondary transition-colors hover:bg-elevated hover:text-ink"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <NavLink href="#about" label="About" active={activeSection === "about"} />
              <NavLink href="#clients" label="Clients" active={activeSection === "clients"} />
              <NavLink href="#contact" label="Contact" active={activeSection === "contact"} />
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(29,111,235,0.45)] lg:inline-block"
              >
                Get in Touch
              </a>
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-ink lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-base lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-ink">
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="flex flex-col gap-2 px-6 pt-10"
            >
              {[...NAV_LINKS, { label: "Services", href: "#services" }].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  className="font-display text-3xl font-bold text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6 rounded-full bg-brand px-6 py-3 text-center text-base font-semibold text-white"
              >
                Get in Touch
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
