"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Clock, Globe, Mail, MapPin, Phone } from "lucide-react"
import { track } from "@vercel/analytics"
import Script from "next/script"
import { fadeUp, stagger, viewport } from "./motion"
import { SelectField } from "./select-field"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void
    onTurnstileExpired?: () => void
  }
}

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

const MEETING_TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
]

const today = new Date()
today.setHours(0, 0, 0, 0)

const inputClass =
  "w-full rounded-lg border border-line bg-white/[0.04] px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,155,151,0.15)]"
const labelClass = "mb-1.5 block text-xs font-medium text-ink-secondary"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState("")
  const [meetingDate, setMeetingDate] = useState<Date | undefined>()
  const [meetingTime, setMeetingTime] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [startedAt] = useState(() => Date.now())
  const hasTrackedStart = useRef(false)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token)
    }

    window.onTurnstileExpired = () => {
      setTurnstileToken("")
    }

    return () => {
      window.onTurnstileSuccess = undefined
      window.onTurnstileExpired = undefined
    }
  }, [])

  function trackFormStart() {
    if (hasTrackedStart.current) return
    hasTrackedStart.current = true
    track("contact_form_started")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      meetingDate: String(formData.get("meetingDate") || "").trim(),
      meetingTime: String(formData.get("meetingTime") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      startedAt: Number(formData.get("startedAt") || startedAt),
      turnstileToken: String(formData.get("turnstileToken") || "").trim(),
    }

    setSending(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || "Message could not be sent.")
      }

      setSubmitted(true)
      track("contact_form_submitted", { status: "success", service: payload.service || "not-selected" })
      setService("")
      setMeetingDate(undefined)
      setMeetingTime("")
      setTurnstileToken("")
      e.currentTarget.reset()
    } catch (submissionError) {
      track("contact_form_submitted", { status: "error" })
      setError(submissionError instanceof Error ? submissionError.message : "Message could not be sent.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative bg-base py-24 lg:py-32">
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}
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
                Thank you for reaching out. Your message has been sent to our inbox and we&apos;ll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <input type="hidden" name="startedAt" value={startedAt} />
              <input type="hidden" name="turnstileToken" value={turnstileToken} />
              <input type="hidden" name="meetingDate" value={meetingDate?.toISOString().slice(0, 10) || ""} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className={inputClass}
                    placeholder="Your name"
                    onFocus={trackFormStart}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company Name
                  </label>
                  <input id="company" name="company" className={inputClass} placeholder="Your company" onFocus={trackFormStart} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@company.com"
                    onFocus={trackFormStart}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+92 ..." onFocus={trackFormStart} />
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
                  onChange={(value) => {
                    trackFormStart()
                    setService(value)
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="meetingDate" className={labelClass}>
                    Preferred meeting date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        id="meetingDate"
                        className={`${inputClass} flex items-center justify-between`}
                        onFocus={trackFormStart}
                        aria-label="Choose a preferred meeting date"
                      >
                        <span className={`truncate ${meetingDate ? "text-ink" : "text-ink-muted"}`}>
                          {meetingDate
                            ? meetingDate.toLocaleDateString(undefined, {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })
                            : "Choose a date"}
                        </span>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-ink-secondary" />
                          <ChevronDown className="h-4 w-4 text-ink-secondary" />
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[23rem] p-0">
                      <Calendar
                        mode="single"
                        selected={meetingDate}
                        onSelect={(date) => {
                          trackFormStart()
                          setMeetingDate(date ?? undefined)
                        }}
                        disabled={{ before: today }}
                        fromDate={today}
                      />
                      <div className="border-t border-line p-3 text-right">
                        <PopoverPrimitive.Close asChild>
                          <Button variant="secondary" size="sm" type="button">
                            Done
                          </Button>
                        </PopoverPrimitive.Close>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label htmlFor="meetingTime" className={labelClass}>
                    Preferred meeting time
                  </label>
                  <SelectField
                    id="meetingTime"
                    name="meetingTime"
                    options={MEETING_TIMES}
                    placeholder="Select a time"
                    value={meetingTime}
                    onChange={(value) => {
                      trackFormStart()
                      setMeetingTime(value)
                    }}
                  />
                </div>
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
                  onFocus={trackFormStart}
                />
              </div>
              {turnstileSiteKey && (
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileSiteKey}
                  data-callback="onTurnstileSuccess"
                  data-expired-callback="onTurnstileExpired"
                  data-theme="light"
                />
              )}
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-display text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-70 hover:brightness-110 hover:shadow-[0_0_28px_rgba(30,155,151,0.45)]"
              >
                {sending ? "Sending..." : <>Send Message <ArrowRight className="h-4 w-4" /></>}
              </button>
              {error && (
                <p role="alert" aria-live="polite" className="text-sm text-red-500">
                  {error} If this keeps happening, email us directly at {" "}
                  <a href="mailto:ashepic057@gmail.com" className="underline underline-offset-4">
                    ashepic057@gmail.com
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
