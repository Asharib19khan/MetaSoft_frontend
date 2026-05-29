import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Services } from "@/components/site/services"
import { About } from "@/components/site/about"
import { Milestones } from "@/components/site/milestones"
import { Clients } from "@/components/site/clients"
import { Team } from "@/components/site/team"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-base">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Milestones />
      <Clients />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
