"use client"

import { motion } from "framer-motion"
import { Database, Layers, Server, Lightbulb, ArrowRight, type LucideIcon } from "lucide-react"
import { track } from "@vercel/analytics"
import { SectionHeader } from "./section-header"
import { fadeUp, stagger, viewport } from "./motion"

type Service = {
  icon: LucideIcon
  title: string
  tag: string
  description: string
  capabilities: string[]
}

const SERVICES: Service[] = [
  {
    icon: Database,
    title: "Database Administration",
    tag: "Oracle · SQL Server · MySQL · More",
    description:
      "Expert lifecycle management across Oracle, SQL Server, IBM DB2, MySQL, PostgreSQL, and MariaDB. We handle installation, patching, performance tuning, high availability, encryption, and migration — on-prem or cloud.",
    capabilities: ["Performance Tuning", "Data Guard / RAC", "TDE Encryption"],
  },
  {
    icon: Layers,
    title: "Oracle EBS & Fusion",
    tag: "Oracle E-Business Suite",
    description:
      "Full lifecycle support for Oracle E-Business Suite — from OS installation through application patching, upgrade/downgrade, user management, backup & recovery, cloning, and high availability. Cloud deployment via Oracle Fusion.",
    capabilities: ["Upgrade & Migration", "Cloning & HA", "Oracle Fusion Cloud"],
  },
  {
    icon: Server,
    title: "System Administration",
    tag: "RedHat Linux · Windows Server",
    description:
      "Comprehensive administration of RedHat Linux Enterprise Edition and Microsoft Windows Server environments. Active Directory, firewall, DHCP/DNS, SAMBA, VMWare/Hyper-V/KVM virtualization, and disaster recovery.",
    capabilities: ["Virtualization", "Active Directory", "Backup & Recovery"],
  },
  {
    icon: Lightbulb,
    title: "IT Consulting & Advisory",
    tag: "Strategy · Analytics · Development",
    description:
      "Infrastructure planning, hardware/software procurement, DataCentre/NOC setup, Data Analytics & Business Intelligence, mobile and web application development (Oracle APEX, Oracle Forms, .Net), and technical documentation.",
    capabilities: ["Data Analytics", "Web & Mobile Dev", "Project Management"],
  },
]

export function Services() {
  return (
    <section id="services" className="relative bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <SectionHeader
          label="What We Do"
          title="Four Services. Full Stack Coverage."
          subtitle="End-to-end IT infrastructure support — from database layer to application layer to advisory."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group glass rounded-2xl p-7 transition-shadow duration-300 hover:border-line-hover hover:shadow-[0_0_40px_rgba(30,155,151,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-elevated">
                  <Icon className="h-7 w-7 text-brand" />
                </div>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gold">
                  [ {service.tag} ]
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-ink-secondary">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-ink-secondary"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => track("cta_clicked", { placement: "services_card", cta: "learn_more", service: service.title })}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-light"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            onClick={() => track("cta_clicked", { placement: "services_section", cta: "book_consultation" })}
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(30,155,151,0.32)]"
          >
            Book a 15-minute Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
