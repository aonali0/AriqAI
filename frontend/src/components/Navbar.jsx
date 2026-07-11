import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? 'card-glass shadow-glow' : ''
          }`}
        >
          <a href="#home" className="flex items-center gap-3 group">
            <img src={logo} alt="Ariq AI" className="h-14 w-14 object-contain" />
            <span className="font-display font-semibold text-xl tracking-tight text-frost">
              ARIQ <span className="text-gradient">AI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-mist hover:text-frost transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-ariq-gradient group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ariq-gradient px-5 py-2.5 text-sm font-semibold text-void shadow-glow hover:scale-105 transition-transform duration-300"
          >
            Start a Project
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-frost"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden card-glass rounded-2xl mt-2"
            >
              <div className="flex flex-col p-5 gap-4">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-mist hover:text-frost transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex justify-center rounded-full bg-ariq-gradient px-5 py-2.5 text-sm font-semibold text-void"
                >
                  Start a Project
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
