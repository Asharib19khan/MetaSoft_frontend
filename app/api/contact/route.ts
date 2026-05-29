import nodemailer from "nodemailer"

export const runtime = "nodejs"

type ContactPayload = {
  name?: string
  company?: string
  email?: string
  phone?: string
  service?: string
  message?: string
  website?: string
  startedAt?: number
  turnstileToken?: string
}

type TurnstileVerifyResponse = {
  success: boolean
  "error-codes"?: string[]
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const recentRequests = new Map<string, number[]>()

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
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
  const body = (await request.json().catch(() => null)) as ContactPayload | null
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 })
  }

  const name = sanitize(body?.name)
  const email = sanitize(body?.email)
  const message = sanitize(body?.message)
  const company = sanitize(body?.company)
  const phone = sanitize(body?.phone)
  const service = sanitize(body?.service)
  const website = sanitize(body?.website)
  const startedAt = typeof body?.startedAt === "number" ? body.startedAt : 0
  const turnstileToken = sanitize(body?.turnstileToken)
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

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 })
  }

  if (message.length > 5000) {
    return Response.json({ error: "Message is too long." }, { status: 400 })
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

  const subject = `MetaSoft website inquiry from ${name}`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Company: ${company || "-"}`,
    `Service Needed: ${service || "-"}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New MetaSoft website inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Service Needed:</strong> ${service || "-"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
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