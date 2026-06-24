const TEAM = [
  {
    initials: "AK",
    name: "Muhammad Adnan Khan",
    role: "CTO · Founder",
    specialty: "Databases, ERP & Enterprise Architecture",
    experience: "20+ YRS",
  },
  {
    initials: "HI",
    name: "Haris Ikram",
    role: "Systems Engineer",
    specialty: "Infrastructure & Network Admin",
  },
  {
    initials: "MS",
    name: "Muhammad Shoaib",
    role: "App Developer",
    specialty: "Mobile & Web App Development",
  },
  {
    initials: "AK",
    name: "Anwar Kamal",
    role: "Project Manager",
    specialty: "Delivery, PM & Documentation",
  },
]

export function Team() {
  return (
    <section id="team" className="bg-surface section-padding">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-14">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">The Team</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl max-w-2xl">
            A focused crew with enterprise experience.
          </h2>
          <p className="mt-4 text-base text-ink-secondary">Small, senior, and built to execute in complex environments.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-white/8 bg-elevated p-7 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 border border-brand/20 text-xl font-bold text-brand">
                {member.initials}
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-ink">{member.name}</h3>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{member.role}</p>
              <p className="mt-3 text-sm leading-[1.7] text-ink-secondary">{member.specialty}</p>
              {member.experience && (
                <span className="mt-4 inline-flex rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  {member.experience}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
