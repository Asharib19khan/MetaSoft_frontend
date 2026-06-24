import { About } from "@/components/site/about"
import { Milestones } from "@/components/site/milestones"
import { Team } from "@/components/site/team"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-12">
      <About />
      <Milestones />
      <Team />
    </div>
  )
}
