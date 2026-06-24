import { Hero } from "@/components/site/hero"
import { TechMarquee } from "@/components/blocks/tech-marquee"
import { ImpactStudies } from "@/components/blocks/impact-studies"
import { SectionTwoDemo } from "@/components/blocks/section-two"
import { MissionBreak } from "@/components/blocks/mission-break"
import { GlobalPresence } from "@/components/blocks/global-presence"
import { TrustSection } from "@/components/blocks/trust-section"
import { Insights } from "@/components/blocks/insights"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-base overflow-hidden">
      <Hero />
      <TechMarquee />
      <ImpactStudies />
      <SectionTwoDemo />
      <MissionBreak />
      <GlobalPresence />
      <TrustSection />
      <Insights />
    </main>
  )
}
