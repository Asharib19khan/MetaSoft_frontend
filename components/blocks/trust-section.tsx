"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Trophy, Quote } from "lucide-react";

const TRUST_METRICS = [
  { value: "20+", label: "Years Experience", icon: Trophy },
  { value: "99.999%", label: "Uptime Standard", icon: CheckCircle2 },
  { value: "24/7", label: "System Support", icon: ShieldCheck },
];

export function TrustSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-surface" id="trust">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Metrics & Authority */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Institutional Trust</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
                Enterprise infrastructure trusted by leading businesses.
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                MetaSoft delivers proactive support and systems engineering to organizations where availability and data security are critical. We work alongside internal IT teams to maintain stability, execute database upgrades, and reduce latency.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-line">
              {TRUST_METRICS.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <Icon className="h-5 w-5 text-brand" />
                    <p className="font-display text-2xl font-bold text-ink">{metric.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary">{metric.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Testimonial Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-line bg-surface p-8 sm:p-12 overflow-hidden shadow-lg"
            >
              <Quote className="absolute -right-4 -top-4 h-32 w-32 text-brand/5 rotate-12" />
              
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex gap-1 text-brand">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="font-display text-lg sm:text-xl font-normal leading-relaxed text-ink">
                  "MetaSoft's team established a highly resilient database environment for our platforms, resolving historic latency issues. Their engineers are responsive, knowledgeable, and integrate seamlessly with our internal operations."
                </blockquote>
                
                <div className="flex items-center gap-4 pt-6 border-t border-line">
                  <div className="h-10 w-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-brand">
                    JD
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">John Davies</p>
                    <p className="text-xs text-ink-secondary font-mono">Director of Information Technology</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
