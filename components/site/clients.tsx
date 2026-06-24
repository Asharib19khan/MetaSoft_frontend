const INDUSTRIES = ["Finance", "Healthcare", "Manufacturing", "Retail", "Technology"]

const CLIENTS = [
  "Computer Research Private Limited",
  "IGI Securities",
  "Phoenix",
  "Richa Leather",
  "DataCheck",
  "National Medical Centre",
  "Shirazi Investments",
  "Vanguard",
]

export function Clients() {
  return (
    <section id="clients" className="bg-base section-padding">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-14">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">Trusted By</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl max-w-2xl">
            Built for Organizations That Can't Afford Downtime.
          </h2>
          <p className="mt-4 text-base text-ink-secondary max-w-lg leading-relaxed">
            Our clients span finance, healthcare, manufacturing, retail, and technology.
          </p>
        </div>

        {/* Industry tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {INDUSTRIES.map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-white/8 bg-elevated px-4 py-1.5 text-sm text-ink-secondary"
            >
              {ind}
            </span>
          ))}
        </div>

        {/* Client list */}
        <div className="grid grid-cols-2 gap-px border border-white/8 rounded-2xl overflow-hidden sm:grid-cols-4">
          {CLIENTS.map((client) => (
            <div
              key={client}
              className="bg-surface/60 px-6 py-5 transition-colors hover:bg-white/[0.03]"
            >
              <p className="text-sm font-medium text-ink-secondary">{client}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          10+ organizations trust MetaSoft to keep their infrastructure running.
        </p>
      </div>
    </section>
  )
}
