"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react"
import { fadeUp, stagger, viewport } from "./motion"
import { SelectField } from "./select-field"

const CONTACT_ROWS = [
  { icon: Phone, text: "+92 334 828 2077", href: "tel:+923348282077" },
  { icon: Mail, text: "info@metasoft.com.pk", href: "mailto:info@metasoft.com.pk" },
  { icon: Globe, text: "www.metasoft.com.pk", href: "https://www.metasoft.com.pk" },
  { icon: Clock, text: "Mon – Fri · 09:00 – 17:00 PKT" },
  { icon: MapPin, text: "Karachi, Pakistan" },
]

const SERVICES = [
  "Database Administration",
  "EBS — System & Apps",
  "System Administration",
  "IT Consulting & Advisory",
  "Other / Multiple Services",
]

const inputClass =
  "w-full rounded-lg border border-line bg-white/[0.04] px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,155,151,0.15)]"
const labelClass = "mb-1.5 block text-xs font-medium text-ink-secondary"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative bg-base py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 lg:grid-cols-2 lg:px-8">
        {/* left */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.span variants={fadeUp} className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            Get in Touch
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            Let&apos;s Talk About Your IT Challenges.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-[1.75] text-ink-secondary">
            Whether you need database rescue, EBS migration, infrastructure consulting, or a long-term IT partner —
            we&apos;re ready to engage. Reach out and we&apos;ll respond within one business day.
          </motion.p>

          <motion.div variants={stagger} className="mt-8 flex flex-col gap-1">
            {CONTACT_ROWS.map((row) => {
              const Icon = row.icon
              const content = (
                <div className="group flex items-center gap-3 rounded-lg px-2 py-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-brand" />
                  <span className="text-[15px] text-ink-secondary transition-colors group-hover:text-ink">
                    {row.text}
                  </span>
                </div>
              )
              return (
                <motion.div key={row.text} variants={fadeUp}>
                  {row.href ? (
                    <a href={row.href} className="block">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 h-px w-full bg-line" />
          <motion.p variants={fadeUp} className="mt-6 font-display text-lg italic text-gold">
            &ldquo;We look forward to working with you.&rdquo;
          </motion.p>
        </motion.div>

        {/* right form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-7 lg:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-14 w-14 text-accent2" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Message Sent</h3>
              <p className="mt-2 max-w-xs text-sm text-ink-secondary">
                Thank you for reaching out. We&apos;ll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input id="name" name="name" required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company Name
                  </label>
                  <input id="company" name="company" className={inputClass} placeholder="Your company" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+92 ..." />
                </div>
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>
                  Service Needed
                </label>
                <SelectField
                  id="service"
                  name="service"
                  options={SERVICES}
                  placeholder="Select a service"
                  value={service}
                  onChange={setService}
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={`${inputClass} min-h-[120px] resize-y`}
                  placeholder="Tell us about your project or challenge..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-display text-base font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(30,155,151,0.45)]"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
