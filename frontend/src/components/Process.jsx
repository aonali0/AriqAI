import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We map your business, your bottlenecks, and where technology can actually move the needle — no generic templates.',
  },
  {
    n: '02',
    title: 'Design',
    desc: 'A tailored architecture and interface plan, built around your brand and how your customers actually behave.',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Full-stack development — frontend, backend, database, AI agents — built clean, tested, and ready to scale.',
  },
  {
    n: '04',
    title: 'Launch & Scale',
    desc: 'We ship, monitor, and iterate with you — your systems keep evolving as your business grows.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-mono text-cyan tracking-[0.25em]">HOW WE WORK</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-frost mt-4 leading-tight">
            A clear process, <span className="text-gradient">every time</span>.
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-panel border border-line flex items-center justify-center mb-6 font-display text-xl font-semibold text-gradient">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-semibold text-frost mb-2">{s.title}</h3>
              <p className="text-mist text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
