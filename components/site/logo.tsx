export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-[7px] w-[7px] rounded-[2px] bg-brand" />
        ))}
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Meta<span className="text-brand">soft</span>
      </span>
    </div>
  )
}
