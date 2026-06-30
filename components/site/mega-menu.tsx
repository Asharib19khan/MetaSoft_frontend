"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useUiSound } from "@/hooks/use-ui-sound"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
]

export function MegaMenu({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { playThud } = useUiSound()

  useEffect(() => {
    if (isOpen) {
      playThud()
    }
  }, [isOpen, playThud])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-20 lg:px-8 border-b border-white/10">
            <span className="text-white font-display text-xl font-bold tracking-tight">MetaSoft</span>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Grid */}
          <div className="flex-1 flex flex-col justify-center px-5 lg:px-16 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-7xl mx-auto">
              {/* Navigation */}
              <div className="flex flex-col gap-6">
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Navigation</p>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                  >
                    <Link 
                      href={link.href}
                      onClick={onClose}
                      className="text-white font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight hover:text-white/60 transition-colors group flex items-center gap-4 w-fit"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl lg:text-4xl text-white/40">↗</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Featured Contact Info */}
              <div className="hidden lg:flex flex-col justify-end pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-sm"
                >
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Global Contact</p>
                  <a href="mailto:info@metasoft.com.pk" className="text-white text-2xl hover:underline decoration-1 underline-offset-4 mb-2 block">
                    info@metasoft.com.pk
                  </a>
                  <a href="tel:+923348282077" className="text-white/70 text-lg hover:text-white transition-colors">
                    +92 334 828 2077
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
