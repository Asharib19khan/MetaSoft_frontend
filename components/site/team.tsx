"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"
import { fadeUp, stagger, viewport } from "./motion"

const TEAM = [
  {
    initials: "AK",
    name: "Muhammad Adnan Khan",
    role: "CTO · Founder",
    specialty: "Databases, ERP & Enterprise Architecture",
    gradient: "linear-gradient(135deg, #1E9B97, #EBB424)",
    experience: "20+ YRS",
  },
  {
    initials: "HI",
    name: "Haris Ikram",
    role: "Systems Engineer",
    specialty: "Infrastructure & Network Admin",
    gradient: "linear-gradient(135deg, #1E9B97, #0E4A47)",
  },
  {
    initials: "MS",
    name: "Muhammad Shoaib",
    role: "App Developer",
    specialty: "Mobile & Web App Development",
    gradient: "linear-gradient(135deg, #EBB424, #1E9B97)",
  },
  {
    initials: "AK",
    name: "Anwar Kamal",
    role: "Project Manager",
    specialty: "Delivery, PM & Documentation",
    gradient: "linear-gradient(135deg, #EBB424, #1E9B97)",
  },
]

export function Team() {
  return (
    <section id="team" className="relative bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <SectionHeader
          label="The Team"
          title="Small Team. Deep Expertise."
          subtitle="Four specialists. Zero generalists."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass flex flex-col items-center rounded-2xl p-7 text-center transition-shadow duration-300 hover:border-line-hover hover:shadow-[0_0_40px_rgba(30,155,151,0.15)]"
            >
              <div
                className="flex h-[72px] w-[72px] items-center justify-center rounded-full font-display text-2xl font-bold text-white"
                style={{ background: member.gradient }}
              >
                {member.initials}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{member.name}</h3>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.08em] text-gold">{member.role}</p>
              <p className="mt-3 text-sm text-ink-secondary">{member.specialty}</p>
              {member.experience && (
                <span className="mt-4 rounded-full border border-gold/30 px-3 py-1 font-mono text-[11px] font-bold text-gold">
                  {member.experience}
                </span>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
