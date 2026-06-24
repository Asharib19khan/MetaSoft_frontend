import Image from "next/image"

type LogoProps = {
  className?: string
  priority?: boolean
}

export function Logo({ className = "h-10 w-auto sm:h-11", priority = true }: LogoProps) {
  return (
    <Image
      src="/metasoft-logo.png"
      alt="MetaSoft"
      width={448}
      height={512}
      priority={priority}
      className={`brightness-0 dark:invert ${className}`}
      sizes="(max-width: 640px) 180px, 220px"
    />
  )
}
