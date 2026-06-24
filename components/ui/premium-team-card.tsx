"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mail, Linkedin, Github } from "lucide-react"

interface PremiumTeamCardProps {
  image: string
  name: string
  role: string
  bio: string
  email?: string
  linkedin?: string
  github?: string
  className?: string
}

export function PremiumTeamCard({
  image,
  name,
  role,
  bio,
  email,
  linkedin,
  github,
  className,
}: PremiumTeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative h-96 w-full overflow-hidden rounded-xl",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image background */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-out",
          isHovered ? "scale-105" : "scale-100",
        )}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
      </div>

      {/* Content overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500",
          isHovered ? "translate-y-0" : "translate-y-12 opacity-0",
        )}
      >
        {/* Name and role */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className="mt-1 text-brand font-semibold">{role}</p>
        </div>

        {/* Bio */}
        <p className="mb-4 text-sm leading-relaxed text-slate-100 line-clamp-3">
          {bio}
        </p>

        {/* Social links */}
        <div className="flex gap-2">
          {email && (
            <a
              href={`mailto:${email}`}
              className="rounded-lg bg-brand/10 p-2 text-brand hover:bg-brand hover:text-white transition-all duration-200"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand/10 p-2 text-brand hover:bg-brand hover:text-white transition-all duration-200"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand/10 p-2 text-brand hover:bg-brand hover:text-white transition-all duration-200"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Static title visible before hover */}
      <div
        className={cn(
          "absolute bottom-6 left-6 right-6 transition-all duration-500",
          isHovered ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0",
        )}
      >
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-brand font-semibold">{role}</p>
      </div>
    </div>
  )
}
