import { useEffect, useRef } from 'react'

// Signature element: a living constellation of nodes that drift and connect,
// echoing the "spark + data nodes" motif from the Ariq AI logo.
export default function NeuralField({ density = 60 }) {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []
    let w, h

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      canvas.style.width = canvas.offsetWidth + 'px'
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / (18000 / (density / 60)))
      nodes = Array.from({ length: Math.min(count, 90) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const linkDist = 130 * devicePixelRatio

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!prefersReducedMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j]
          const dx = n.x - o.x
          const dy = n.y - o.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const opacity = (1 - dist / linkDist) * 0.35
            ctx.strokeStyle = `rgba(91,140,255,${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(o.x, o.y)
            ctx.stroke()
          }
        }

        // link to cursor for a subtle "alive" reaction
        const mdx = n.x - mouse.current.x
        const mdy = n.y - mouse.current.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < linkDist * 1.4) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - mdist / (linkDist * 1.4)) * 0.5})`
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mouse.current.x, mouse.current.y)
          ctx.stroke()
        }

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
        grad.addColorStop(0, 'rgba(148,197,255,0.9)')
        grad.addColorStop(1, 'rgba(148,197,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left) * devicePixelRatio
      mouse.current.y = (e.clientY - rect.top) * devicePixelRatio
    }
    const onLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [density])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
