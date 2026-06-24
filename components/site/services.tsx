"use client"

import { ArrowRight, Database, Layers, Server, Lightbulb, type LucideIcon } from "lucide-react"
import { track } from "@vercel/analytics"
import Link from "next/link"

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
    tag: "Oracle · SQL Server · PostgreSQL",
    description:
      "Monitoring, installation, patching, performance tuning, and capacity planning for enterprise databases. We establish robust backup routines and replication solutions using Oracle Data Guard and RAC.",
    capabilities: ["Performance Tuning", "Backup & Recovery", "Security Patching"],
  },
  {
    icon: Layers,
    title: "Oracle EBS & Fusion",
    tag: "Oracle E-Business Suite Support",
    description:
      "Comprehensive administration of Oracle E-Business Suite (EBS) and cloud systems. We execute technical upgrades, database patching, instances cloning, and cloud migration strategies.",
    capabilities: ["Upgrade Operations", "Instance Cloning", "Application Tuning"],
  },
  {
    icon: Server,
    title: "Systems Administration",
    tag: "RHEL · Windows Server · VMware",
    description:
      "Administration of operating systems, hypervisors, and directory services. We design and maintain secure RedHat Enterprise Linux (RHEL) and Windows Server infrastructure.",
    capabilities: ["OS Hardening", "Active Directory", "Virtualization Support"],
  },
  {
    icon: Lightbulb,
    title: "IT Consulting & Operations Support",
    tag: "Technical Architecture Support",
    description:
      "Strategic planning and review of database infrastructure, licensing optimization, server performance reviews, and technical project governance to match systems with organizational requirements.",
    capabilities: ["Capacity Planning", "Licensing Reviews", "System Audits"],
  },
]

export function Services() {
  return (
    <section id="services" className="bg-surface section-padding border-y border-line">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">Capabilities</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl max-w-2xl">
            Enterprise Services
          </h2>
          <p className="mt-4 text-base text-ink-secondary max-w-xl leading-relaxed">
            Technical administration and support for database systems, enterprise application layers, and server environments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 border border-line rounded-2xl overflow-hidden bg-line">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group bg-surface p-8 md:p-10 transition-colors duration-200 hover:bg-elevated"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  {service.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-ink-secondary">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-line px-3 py-1 text-xs text-ink-secondary"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  onClick={() => track("cta_clicked", { placement: "services_card", cta: "learn_more", service: service.title })}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all duration-200"
                >
                  Contact our team <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            onClick={() => track("cta_clicked", { placement: "services_section", cta: "book_consultation" })}
            className="inline-flex items-center gap-2 border border-line px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink w-full sm:w-auto bg-surface"
          >
            Inquire About Managed Services
          </Link>
        </div>
      </div>
    </section>
  )
}
