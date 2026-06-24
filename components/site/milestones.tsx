const MILESTONES = [
  { year: "2021", title: "Foundation", text: "Founded in Karachi with a mission to deliver enterprise-grade IT operations." },
  { year: "2022", title: "First Enterprise Wins", text: "Secured performance and migration contracts with Phoenix and National Medical Centre." },
  { year: "2023", title: "Capability Scale", text: "Expanded to secure, manage, and consult across five vertical industries." },
  { year: "2024", title: "Maturity", text: "Built a reliable operations and delivery model for continuous improvement." },
]

export function Milestones() {
  return (
    <section id="milestones" className="bg-surface section-padding">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-14">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">Our Journey</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl max-w-3xl">
            Built with consistency, delivered with enterprise confidence.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((milestone, index) => (
            <article
              key={milestone.year}
              className="rounded-2xl border border-white/8 bg-elevated p-7"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-brand">{milestone.year}</p>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{milestone.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-ink-secondary">{milestone.text}</p>
              <span className="mt-6 inline-flex rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Phase {index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
