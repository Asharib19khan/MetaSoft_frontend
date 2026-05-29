import type React from "react"
import type { Metadata, Viewport } from "next"
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "MetaSoft — Enterprise IT Services in Pakistan",
  description:
    "MetaSoft delivers expert Database Administration, Oracle EBS, System Administration, and IT Consulting to businesses across Pakistan. Based in Karachi since 2021.",
  metadataBase: new URL("https://www.metasoft.com.pk"),
  generator: "v0.app",
  applicationName: "MetaSoft",
  icons: {
    icon: "/metasoft-icon.png",
    apple: "/metasoft-icon.png",
  },
  openGraph: {
    title: "MetaSoft — Enterprise IT Services",
    description: "Liberating businesses from IT complexity since 2021.",
    type: "website",
    url: "https://www.metasoft.com.pk",
    images: ["/metasoft-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaSoft — Enterprise IT Services",
    description: "Liberating businesses from IT complexity since 2021.",
    images: ["/metasoft-logo.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#f4f7f6",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-base">
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
