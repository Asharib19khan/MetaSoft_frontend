"use client"

import { track } from "@vercel/analytics"

const VALUES = [
  { title: "Technical Precision", text: "All infrastructure integrations are designed for operational availability, security, and performance." },
  { title: "Proactive Telemetry", text: "Integrating modern logging, database telemetry, and security patching into production servers." },
  { title: "Engineering Support", text: "Structured incident response workflows and clear, direct communication with senior engineers." },
]

const DIFFERENTIATORS = [
  { label: "20+ Years", text: "Combined technical and database operations experience." },
  { label: "5 Industries", text: "Supporting platforms in finance, manufacturing, and retail." },
  { label: "24/7 Support", text: "Continuous database administration and server monitoring." },
]

export function About() {
  return (
    <section id="about" className="bg-base section-padding">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 lg:grid-cols-[55fr_45fr] lg:px-8 lg:gap-20">

        {/* Left column */}
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">About MetaSoft</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl max-w-2xl leading-[1.12]">
            Grounded expertise in systems and database operations.
          </h2>
          <div className="mt-5 h-px w-16 bg-brand/40" />

          <p className="mt-6 text-base leading-[1.8] text-ink-secondary">
            Established in Karachi, MetaSoft specializes in managing complex IT environments. We help enterprises reduce operational risks, optimize database architectures, and maintain high availability across critical servers and cloud systems.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-ink-secondary">
            We work alongside internal technology teams to deploy structured database administration frameworks, Oracle EBS life-cycle management, and secure server networking configurations.
          </p>

          {/* Values */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-line bg-surface p-5 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">{value.title}</p>
                <p className="mt-2.5 text-sm leading-[1.75] text-ink-secondary">{value.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#contact"
              onClick={() => track("cta_clicked", { placement: "about_section", cta: "book_consultation" })}
              className="inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-ink-secondary"
            >
              Contact our team
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-7 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">Enterprise Focus</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink leading-snug">Technical alignment with business goals.</h3>
            <p className="mt-4 text-sm leading-[1.75] text-ink-secondary">
              We ensure database tuning, capacity planning, and virtualization strategies are executed with technical clarity, documentation, and governance.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-line bg-surface p-5 shadow-sm"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink">{item.label}</p>
                <p className="mt-2 text-sm leading-[1.7] text-ink-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
