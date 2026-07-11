import { Mail, Phone, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-14">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Ariq AI" className="h-10 w-10 object-contain" />
            <span className="font-display font-semibold text-lg text-frost">
              ARIQ <span className="text-gradient">AI</span>
            </span>
          </div>
          <p className="text-sm text-mist mt-4 leading-relaxed max-w-xs">
            Engineering growth through intelligent technology — websites, apps,
            and AI agents built for real businesses.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-frost mb-4">Navigate</h4>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-mist hover:text-cyan transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-frost mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-mist">
            <li>Website Development</li>
            <li>Mobile App Development</li>
            <li>AI Agent Development</li>
            <li>Business Systems</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-frost mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-mist">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-cyan shrink-0" /> sales.ariq.ai@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-cyan shrink-0" /> +92 300 5427109
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-cyan shrink-0" /> Islamabad, Pakistan
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-line text-center text-xs text-mist/70">
        © {new Date().getFullYear()} Ariq AI. All rights reserved.
      </div>
    </footer>
  )
}
