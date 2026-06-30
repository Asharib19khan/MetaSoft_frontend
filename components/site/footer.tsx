import { Linkedin, Mail, MapPin, Phone, ShieldCheck, Database, Lock } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pt-20 pb-10">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        
        {/* Top Section: Trust Architecture & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-line">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-bold text-ink mb-4">Uncompromising Systems Integrity.</h3>
            <p className="text-sm text-ink-secondary leading-[1.6] mb-8">
              MetaSoft provides elite database administration and infrastructure operations for organizations where downtime is fundamentally unacceptable.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 border border-line rounded-sm px-3 py-2 bg-base">
                <ShieldCheck className="h-4 w-4 text-ink" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 border border-line rounded-sm px-3 py-2 bg-base">
                <Lock className="h-4 w-4 text-ink" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2 border border-line rounded-sm px-3 py-2 bg-base">
                <Database className="h-4 w-4 text-ink" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink">Oracle Partner</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink mb-4">Enterprise Briefings</p>
            <form className="flex w-full lg:w-80">
              <input 
                type="email" 
                placeholder="Corporate Email" 
                className="w-full bg-base border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink rounded-none"
              />
              <button className="bg-ink text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-ink-secondary transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Mega Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-line">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink mb-6">Capabilities</p>
            <ul className="flex flex-col gap-4 text-sm text-ink-secondary">
              <li><a href="#" className="hover:text-ink transition-colors">Database Administration</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Oracle EBS Fusion</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Systems Engineering</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Cloud Migrations</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Performance Tuning</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink mb-6">Insights</p>
            <ul className="flex flex-col gap-4 text-sm text-ink-secondary">
              <li><a href="#" className="hover:text-ink transition-colors">Whitepapers</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Technical Guides</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Engineering Blog</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink mb-6">Company</p>
            <ul className="flex flex-col gap-4 text-sm text-ink-secondary">
              <li><a href="#" className="hover:text-ink transition-colors">About MetaSoft</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Our Standard</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink mb-6">Global Contact</p>
            <ul className="flex flex-col gap-4 text-sm text-ink-secondary">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Karachi, Pakistan<br/>Serving Global Regions</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+923348282077" className="hover:text-ink transition-colors">+92 334 828 2077</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@metasoft.com.pk" className="hover:text-ink transition-colors">info@metasoft.com.pk</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-secondary text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Logo className="h-6 w-auto grayscale opacity-50" />
            <p>© {new Date().getFullYear()} MetaSoft. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ink transition-colors">Security</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-ink transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
