import { Linkedin } from "lucide-react"
import { Logo } from "./logo"

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-[1.6] text-ink-secondary">
              Liberating Businesses from IT Complexity.
            </p>
            <a
              href="#"
              aria-label="LinkedIn"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-secondary transition-colors hover:border-line-hover hover:text-ink"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">Quick Links</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-ink-secondary transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-secondary">
              <li>
                <a href="tel:+923348282077" className="transition-colors hover:text-ink">
                  +92 334 828 2077
                </a>
              </li>
              <li>
                <a href="mailto:info@metasoft.com.pk" className="transition-colors hover:text-ink">
                  info@metasoft.com.pk
                </a>
              </li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-[13px] text-ink-muted sm:flex-row">
          <p>© 2025 MetaSoft · All rights reserved.</p>
          <p>Karachi, Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
