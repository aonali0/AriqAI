import { motion } from 'framer-motion'
import { Target, Users2 } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono text-cyan tracking-[0.25em]">WHO WE ARE</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-frost mt-4 leading-tight">
            Built by builders, <span className="text-gradient">not agencies</span>.
          </h2>
          <p className="text-mist mt-6 leading-relaxed">
            Ariq AI was founded by two engineers who got tired of watching
            businesses either overpay for bloated agency work, or under-invest
            in technology that could genuinely transform how they operate.
          </p>
          <p className="text-mist mt-4 leading-relaxed">
            We work directly, hands-on, on every project — from the first
            architecture decision to the last line of deployed code. No
            account managers relaying messages. No cookie-cutter templates.
            Just software built to actually solve your problem.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="card-glass rounded-2xl p-6">
              <Target size={22} className="text-cyan mb-3" />
              <h4 className="font-display font-semibold text-frost mb-1">Our Mission</h4>
              <p className="text-sm text-mist leading-relaxed">
                Give growing businesses the same technical edge that only
                well-funded companies used to afford.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6">
              <Users2 size={22} className="text-violet mb-3" />
              <h4 className="font-display font-semibold text-frost mb-1">How We Work</h4>
              <p className="text-sm text-mist leading-relaxed">
                Small, senior team. Direct communication. You always know
                who's building your product.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative card-glass rounded-3xl p-10 shadow-glow">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-ariq-gradient opacity-20 rounded-full blur-3xl" />
            <div className="relative space-y-8">
              {[
                { label: 'Founded on', value: 'Direct, hands-on engineering' },
                { label: 'Focus', value: 'Web, Mobile & AI Agent systems' },
                { label: 'Approach', value: 'Custom-built, zero templates' },
                { label: 'Commitment', value: 'Long-term technical partnership' },
              ].map((row, i) => (
                <div key={row.label} className={i !== 0 ? 'pt-6 border-t border-line' : ''}>
                  <div className="text-xs font-mono text-mist tracking-wide mb-1.5">{row.label}</div>
                  <div className="font-display text-lg text-frost">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
