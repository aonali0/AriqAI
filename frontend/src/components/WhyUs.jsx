import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Code2, Rocket } from 'lucide-react'

const POINTS = [
  { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Your data and your customers\u2019 data, protected by design.' },
  { icon: Zap, title: 'High Performance', desc: 'Built for speed — on the frontend, backend, and everywhere between.' },
  { icon: Code2, title: 'Modern Tech Stack', desc: 'React, FastAPI, and current AI tooling — nothing outdated.' },
  { icon: Rocket, title: 'Built to Scale', desc: 'Architecture that grows with your business, not against it.' },
]

export default function WhyUs() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto card-glass rounded-3xl px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-ariq-gradient flex items-center justify-center mb-4">
                <p.icon size={20} className="text-void" />
              </div>
              <h4 className="font-display font-semibold text-frost mb-1.5">{p.title}</h4>
              <p className="text-sm text-mist leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
