import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const SERVICES = [
  'Website Development',
  'Mobile App Development',
  'AI Agent Development',
  'Business Systems & Automation',
  'Not sure yet',
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  website: '', // honeypot — real users leave this blank
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-cyan tracking-[0.25em]">GET IN TOUCH</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-frost mt-4 leading-tight">
            Let's talk about <span className="text-gradient">your project</span>.
          </h2>
          <p className="text-mist mt-4">
            Fill out the form and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card-glass rounded-3xl p-8 sm:p-10 shadow-glow"
        >
          {/* Honeypot field — hidden from real users via CSS, bots fill it */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Field label="Phone (optional)" name="phone" value={form.phone} onChange={handleChange} />
            <Field label="Company (optional)" name="company" value={form.company} onChange={handleChange} />
          </div>

          <div className="mt-5">
            <label className="block text-xs font-mono text-mist tracking-wide mb-2">
              Service You're Interested In
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-frost text-sm focus:border-cyan/50 focus:outline-none transition-colors"
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-mono text-mist tracking-wide mb-2">
              Tell us about your project
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              minLength={10}
              rows={5}
              placeholder="What are you looking to build?"
              className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-frost text-sm placeholder:text-mist/50 focus:border-cyan/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-7 w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full bg-ariq-gradient px-8 py-3.5 font-semibold text-void shadow-glow hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-start gap-2.5 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3"
            >
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>Thank you! Your message has been received — we'll be in touch within 24 hours.</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-start gap-2.5 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-xs font-mono text-mist tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-frost text-sm focus:border-cyan/50 focus:outline-none transition-colors"
      />
    </div>
  )
}
