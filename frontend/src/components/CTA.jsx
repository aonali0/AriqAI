import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-ariq-gradient opacity-20 rounded-full blur-[130px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative card-glass rounded-[2.5rem] px-10 py-16 sm:px-16 text-center shadow-glow"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-frost leading-tight">
            Let's build the future
            <br />
            of <span className="text-gradient">your business</span>.
          </h2>
          <p className="text-mist mt-5 max-w-lg mx-auto leading-relaxed">
            Tell us where you're stuck, and we'll show you exactly how we'd
            solve it — no obligation, no fluff.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 mt-9 rounded-full bg-ariq-gradient px-8 py-4 font-semibold text-void shadow-glow hover:shadow-glow-violet hover:scale-105 transition-all duration-300"
          >
            Get Your Free Consultation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
