"use client"

import { HeroSection } from "@/components/blocks/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionDemo() {
  return (
    <div className="relative w-full">
      <HeroSection
        badge={{
          text: "Introducing our new components",
          action: {
            text: "Learn more",
            href: "#",
          },
        }}
        title="Build faster with beautiful components"
        description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
        actions={[
          {
            text: "Get Started",
            href: "#",
            variant: "default",
          },
          {
            text: "GitHub",
            href: "#",
            variant: "outline",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1248&q=80",
          dark: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1248&q=80",
          alt: "UI Components Preview",
        }}
      />
    </div>
  )
}
