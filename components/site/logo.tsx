import Image from "next/image"
import icon from "../../public/metasoft-icon.png"

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src={icon}
        alt="MetaSoft logo"
        priority
        className="h-8 w-auto"
        sizes="32px"
      />
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Meta<span className="text-gold">soft</span>
      </span>
    </div>
  )
}
