"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Briefings" },
  { id: "whitepaper", label: "Whitepapers" },
  { id: "case-study", label: "Case Studies" },
  { id: "other", label: "Guides & Analysis" },
];

const INSIGHTS = [
  {
    title: "Deploying High-Availability Architecture in Oracle Cloud Infrastructure",
    category: "Whitepaper",
    type: "whitepaper",
    desc: "A technical review of zero-downtime database migration methodologies to public cloud environments.",
    colSpan: "lg:col-span-2",
    delay: 0.1,
  },
  {
    title: "Data Security and Uptime Strategies for Financial Services",
    category: "Case Study",
    type: "case-study",
    desc: "Ensuring 99.999% system availability and data compliance for enterprise transaction processing.",
    colSpan: "lg:col-span-1",
    delay: 0.2,
  },
  {
    title: "Comparative Analysis: Proactive DBA vs Reactive Patching",
    category: "Technical Guide",
    type: "other",
    desc: "How structured, preventive database operations reduce severity-1 incidents and system overhead.",
    colSpan: "lg:col-span-1",
    delay: 0.3,
  },
  {
    title: "Performance Optimization for RedHat Enterprise Linux Systems",
    category: "Technical Guide",
    type: "other",
    desc: "Best practices in kernel tuning, volume management, and container virtualization host configuration.",
    colSpan: "lg:col-span-2",
    delay: 0.4,
  },
];

export function Insights() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredInsights = activeFilter === "all" 
    ? INSIGHTS 
    : INSIGHTS.filter(item => item.type === activeFilter);

  return (
    <section className="section-padding bg-base relative z-10" id="insights">
      <div className="mx-auto max-w-container px-4">
        
        {/* Section Header & Filters */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col items-start gap-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand"
            >
              Technical Briefings
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl"
            >
              Technical briefings &amp; <br className="hidden sm:block" />
              <span className="text-ink-secondary">enterprise research.</span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 bg-surface border border-line p-1.5 rounded-full self-start md:self-end"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 z-10 ${
                    isActive ? "text-black dark:text-black" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-insight-pill"
                      className="absolute inset-0 rounded-full bg-brand -z-10 shadow-[0_0_15px_rgba(30,155,151,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
                className={`group relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-300 ${item.colSpan}`}
              >
                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-line px-3 py-1 text-xs font-semibold text-ink uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowUpRight className="h-6 w-6 text-ink-secondary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink transition-colors group-hover:text-glow">
                      {item.title}
                    </h3>
                    <p className="text-base text-ink-secondary max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
