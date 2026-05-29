import nodemailer from "nodemailer"
import { z } from "zod"

export const runtime = "nodejs"

type TurnstileVerifyResponse = {
  success: boolean
  "error-codes"?: string[]
}

const contactSchema = z.object({
  name: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().min(1, { message: "Name is required." })),
  email: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().email({ message: "Email is invalid." })),
  message: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : ""),
    z.string().min(1, { message: "Message is required." }).max(5000, { message: "Message is too long." }),
  ),
  company: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(100)),
  phone: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(50)),
  service: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(100)),
  meetingDate: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(50)),
  meetingTime: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(50)),
  website: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(500)),
  startedAt: z.preprocess((value) => {
    if (typeof value === "string" && value !== "") return Number(value)
    return typeof value === "number" ? value : undefined
  }, z.number().int().nonnegative().optional()),
  turnstileToken: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(1000).optional()),
})

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const recentRequests = new Map<string, number[]>()

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const previous = recentRequests.get(ip) || []
  const withinWindow = previous.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)

  if (withinWindow.length >= RATE_LIMIT_MAX_REQUESTS) {
    recentRequests.set(ip, withinWindow)
    return true
  }

  withinWindow.push(now)
  recentRequests.set(ip, withinWindow)
  return false
}

export async function POST(request: Request) {
  const rawBody = (await request.json().catch(() => null))
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 })
  }

  const parseResult = contactSchema.safeParse(rawBody)
  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0]
    return Response.json({ error: firstError?.message || "Invalid submission." }, { status: 400 })
  }

  const {
    name,
    email,
    message,
    company,
    phone,
    service,
    meetingDate,
    meetingTime,
    website,
    startedAt = 0,
    turnstileToken,
  } = parseResult.data
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  const isProduction = process.env.NODE_ENV === "production"

  if (website) {
    return Response.json({ ok: true })
  }

  if (startedAt && Date.now() - startedAt < 3000) {
    return Response.json({ error: "Submission appears automated. Please try again." }, { status: 400 })
  }

  if (isProduction && !turnstileSecret) {
    return Response.json(
      { error: "Spam protection is not configured. Please contact support." },
      { status: 500 },
    )
  }

  if (turnstileSecret) {
    if (!turnstileToken) {
      return Response.json({ error: "Please complete the spam check and try again." }, { status: 400 })
    }

    const verifyBody = new URLSearchParams()
    verifyBody.set("secret", turnstileSecret)
    verifyBody.set("response", turnstileToken)
    if (ip && ip !== "unknown") verifyBody.set("remoteip", ip)

    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: verifyBody.toString(),
    }).catch(() => null)

    if (!verifyResponse?.ok) {
      return Response.json({ error: "Spam check failed. Please try again." }, { status: 502 })
    }

    const verifyResult = (await verifyResponse.json().catch(() => null)) as TurnstileVerifyResponse | null
    if (!verifyResult?.success) {
      return Response.json({ error: "Spam verification failed. Please refresh and retry." }, { status: 400 })
    }
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = process.env.SMTP_SECURE === "true"
  const fromAddress = process.env.SMTP_FROM || smtpUser
  const toAddress = process.env.CONTACT_TO || "ashepic057@gmail.com"

  if (!smtpHost || !smtpUser || !smtpPass || !fromAddress) {
    if (!isProduction) {
      console.info("[contact] SMTP not configured in development. Captured submission:", {
        name,
        email,
        phone,
        company,
        service,
        message,
      })
      return Response.json({ ok: true, mode: "dev-fallback" })
    }

    return Response.json(
      {
        error:
          "Email delivery is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in your environment.",
      },
      { status: 500 },
    )
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone || "-")
  const safeCompany = escapeHtml(company || "-")
  const safeService = escapeHtml(service || "-")
  const safeMeetingDate = escapeHtml(meetingDate || "-")
  const safeMeetingTime = escapeHtml(meetingTime || "-")
  const safeMessage = escapeHtml(message).replace(/\r\n?/g, "\n").replace(/\n/g, "<br />")

  const safeSubjectName = name.replace(/[\r\n]/g, " ")
  const subject = `MetaSoft website inquiry from ${safeSubjectName}`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Company: ${company || "-"}`,
    `Service Needed: ${service || "-"}`,
    `Preferred meeting date: ${meetingDate || "-"}`,
    `Preferred meeting time: ${meetingTime || "-"}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New MetaSoft website inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Company:</strong> ${safeCompany}</p>
      <p><strong>Service Needed:</strong> ${safeService}</p>
      <p><strong>Preferred meeting date:</strong> ${safeMeetingDate}</p>
      <p><strong>Preferred meeting time:</strong> ${safeMeetingTime}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${safeMessage}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `MetaSoft Website <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject,
      text,
      html,
    })
  } catch {
    return Response.json({ error: "Email send failed. Please try again shortly." }, { status: 502 })
  }

  return Response.json({ ok: true })
}