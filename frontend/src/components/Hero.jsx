import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import NeuralField from './NeuralField'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const STATS = [
  { value: '3', label: 'Core Services' },
  { value: '100%', label: 'Custom-Built' },
  { value: '24/7', label: 'AI-Driven Ops' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-ariq-radial"
    >
      <NeuralField />

      {/* ambient glow orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-azure/30 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-violet/25 rounded-full blur-[120px] animate-float-delay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full card-glass px-4 py-1.5 mb-7 text-xs font-mono text-cyan tracking-wide"
          >
            <Sparkles size={13} />
            WEBSITES · APPS · AI AGENTS
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl lg:text-[3.4rem] xl:text-7xl font-semibold leading-[1.08] tracking-tight text-frost"
          >
            Engineering Growth
            <br />
            Through <span className="text-gradient">Intelligent</span>
            <br />
            Technology
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg text-mist max-w-lg leading-relaxed">
            Ariq AI designs and builds websites, apps, and AI agents that give
            growing businesses the structure, systems, and edge they need to
            scale — without the guesswork.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ariq-gradient px-7 py-3.5 font-semibold text-void shadow-glow hover:shadow-glow-violet hover:scale-105 transition-all duration-300"
            >
              Get Your Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-semibold text-frost hover:border-cyan/50 hover:text-cyan transition-colors duration-300"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-14 flex gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-gradient">{s.value}</div>
                <div className="text-xs text-mist mt-1 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: floating orchestrated device stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative mx-auto w-full max-w-md aspect-square">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-line"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-10 rounded-full border border-dashed border-line"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-3xl card-glass shadow-glow flex items-center justify-center animate-float">
                <Sparkles size={54} className="text-cyan" strokeWidth={1.5} />
              </div>
            </div>

            {[
              { label: 'Web', pos: 'top-2 left-6', delay: 0 },
              { label: 'Mobile', pos: 'top-16 right-0', delay: 0.6 },
              { label: 'AI Agent', pos: 'bottom-14 left-0', delay: 1.2 },
              { label: 'Automation', pos: 'bottom-2 right-8', delay: 1.8 },
            ].map((node) => (
              <motion.div
                key={node.label}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
                className={`absolute ${node.pos} card-glass rounded-xl px-4 py-2 text-xs font-mono text-frost shadow-lg`}
              >
                {node.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </section>
  )
}
