"use client";

import { motion } from "framer-motion";
import { Database, Cloud, Shield, Server, Cpu, Globe, Lock, Network } from "lucide-react";

const TECHNOLOGIES = [
  { name: "Oracle Cloud", icon: Cloud },
  { name: "RedHat Linux", icon: Server },
  { name: "AWS Enterprise", icon: Globe },
  { name: "Microsoft Azure", icon: Network },
  { name: "Oracle EBS", icon: Database },
  { name: "VMware", icon: Cpu },
  { name: "Zero-Trust Security", icon: Shield },
  { name: "Enterprise SSL", icon: Lock },
];

// Duplicate for infinite scroll effect
const MARQUEE_ITEMS = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

export function TechMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-8">
      {/* Edge Gradients for smooth fade out */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-l from-base to-transparent" />

      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand text-glow">Powered By Elite Technologies</p>
        
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex min-w-full shrink-0 items-center gap-12 sm:gap-24 pl-12 sm:pl-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {MARQUEE_ITEMS.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={`${tech.name}-${i}`} className="flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
                  <Icon className="h-6 w-6 text-brand" />
                  <span className="font-display text-lg sm:text-xl font-bold text-ink whitespace-nowrap">{tech.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
