import { motion } from 'framer-motion'
import { Globe, Smartphone, Bot, Workflow } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Fast, conversion-focused websites built on modern stacks — designed to represent your brand and turn visitors into customers.',
    tags: ['React / Next.js', 'E-commerce', 'SEO-Ready'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform apps that feel native, built for performance and designed around how your users actually behave.',
    tags: ['React Native', 'iOS & Android', 'Offline-First'],
  },
  {
    icon: Bot,
    title: 'AI Agent Development',
    desc: 'Custom AI agents that handle support, sales outreach, data analysis, and internal workflows — so your team can focus on growth.',
    tags: ['LLM Integration', 'Automation', 'Custom Trained'],
  },
  {
    icon: Workflow,
    title: 'Business Structuring & Systems',
    desc: 'We architect the backend systems — databases, dashboards, and integrations — that give your operations real structure.',
    tags: ['FastAPI Backends', 'Dashboards', 'Integrations'],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-mono text-cyan tracking-[0.25em]">WHAT WE BUILD</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-frost mt-4 leading-tight">
            Four disciplines. <span className="text-gradient">One outcome</span> — growth.
          </h2>
          <p className="text-mist mt-5 leading-relaxed">
            Every business needs a different mix of technology. We build exactly
            what yours needs, and nothing it doesn't.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariant}
              whileHover={{ y: -6 }}
              className="group relative card-glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-cyan/30 hover:shadow-glow"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-ariq-gradient opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-opacity duration-500" />

              <div className="relative w-14 h-14 rounded-2xl bg-ariq-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <s.icon size={26} className="text-void" strokeWidth={2} />
              </div>

              <h3 className="relative font-display text-xl font-semibold text-frost mb-3">
                {s.title}
              </h3>
              <p className="relative text-mist text-sm leading-relaxed mb-6">{s.desc}</p>

              <div className="relative flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-cyan/90 border border-cyan/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
