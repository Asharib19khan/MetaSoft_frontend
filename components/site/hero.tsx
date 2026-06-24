"use client"

import { ArrowRight, Monitor, Shield, Zap, ShoppingBag, Database, Activity, TrendingUp, Landmark } from "lucide-react"
import { track } from "@vercel/analytics"
import { motion } from "framer-motion"
import Link from "next/link"

const STATS = [
  { value: "20+", label: "Years Technical Experience" },
  { value: "99.999%", label: "Database Uptime" },
  { value: "24/7", label: "Managed Operations" },
]

const CLIENT_LOGOS = [
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Monitor className="h-5 w-5 text-brand" /> Computer Research Pvt Ltd</div>, title: "Computer Research Private Limited" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Shield className="h-5 w-5 text-brand" /> IGI Securities</div>, title: "IGI Securities" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Zap className="h-5 w-5 text-brand" /> Phoenix</div>, title: "Phoenix" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><ShoppingBag className="h-5 w-5 text-brand" /> Richa Leather</div>, title: "Richa Leather" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Database className="h-5 w-5 text-brand" /> DataCheck</div>, title: "DataCheck" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Activity className="h-5 w-5 text-brand" /> National Medical Centre</div>, title: "National Medical Centre" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><TrendingUp className="h-5 w-5 text-brand" /> Shirazi Investments</div>, title: "Shirazi Investments" },
  { node: <div className="flex items-center gap-3 text-lg font-semibold text-ink-secondary"><Landmark className="h-5 w-5 text-brand" /> Vanguard</div>, title: "Vanguard" },
]

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative flex w-full flex-col bg-base overflow-hidden pt-32 pb-20 min-h-[90vh] border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left justify-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.1] tracking-tight flex flex-col pb-2">
              <span className="overflow-hidden block">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                  className="block"
                >
                  Enterprise Data
                </motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  Management &
                </motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="block text-ink-secondary"
                >
                  Systems Mastery.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-lg leading-[1.8] text-ink-secondary font-sans"
            >
              MetaSoft provides specialized database administration, systems engineering, and Oracle E-Business Suite support for organizations demanding absolute operational continuity and structural resilience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                href="/services"
                onClick={() => track("cta_clicked", { placement: "hero", cta: "explore_services" })}
                className="group relative inline-flex items-center justify-center gap-3 bg-ink px-10 py-5 text-sm font-semibold tracking-widest uppercase text-base transition-all hover:bg-ink/90 overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Our Services <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
              </Link>
              <Link
                href="/contact"
                onClick={() => track("cta_clicked", { placement: "hero", cta: "book_consultation" })}
                className="group relative inline-flex items-center justify-center gap-2 border border-line px-10 py-5 text-sm font-semibold tracking-widest uppercase text-ink transition-all hover:border-ink w-full sm:w-auto bg-surface overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-base">Consultation</span>
                <span className="absolute inset-0 bg-ink translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
              </Link>
            </motion.div>

            {/* Relocated Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-line flex flex-wrap gap-10 w-full"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p className="font-display text-3xl font-bold text-ink">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative hidden lg:block overflow-hidden rounded-sm min-h-[600px] h-full">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="w-full h-full relative"
              style={{ transformOrigin: "bottom" }}
            >
              <div className="absolute inset-0 bg-ink/5 mix-blend-multiply z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img 
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                src="/hero-image.png" 
                alt="Corporate Enterprise Architecture" 
                className="w-full h-full object-cover grayscale opacity-90 transition-opacity hover:opacity-100 duration-700"
              />
            </motion.div>
          </div>

        </div>

      </div>

      {/* Corporate Marquee Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="w-full mt-24 lg:mt-32 border-t border-line bg-surface"
      >
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 py-6 flex flex-col lg:flex-row items-center gap-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary shrink-0">Trusted By</p>
          <div className="w-px h-8 bg-line hidden lg:block" />
          <div className="relative flex overflow-hidden w-full group">
            <div className="flex animate-marquee-left group-hover:[animation-play-state:paused] w-max items-center">
              {CLIENT_LOGOS.map((logo, i) => (
                <div key={`logo-1-${i}`} className="flex items-center justify-center px-6 lg:px-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  {logo.node}
                </div>
              ))}
              {CLIENT_LOGOS.map((logo, i) => (
                <div key={`logo-2-${i}`} className="flex items-center justify-center px-6 lg:px-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  {logo.node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}

