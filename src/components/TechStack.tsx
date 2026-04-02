import { useEffect, useRef, useState } from 'react'
import './TechStack.css'

const TECHS = [
  { label: 'HTML', color: '#e34f26', size: 76 },
  { label: 'CSS', color: '#1572b6', size: 70 },
  { label: 'JS', color: '#f7df1e', size: 84 },
  { label: 'React', color: '#61dafb', size: 80 },
  { label: 'Git', color: '#f05032', size: 72 },
  { label: 'Vite', color: '#bd34fe', size: 64 },
  { label: 'FFmpeg', color: '#007808', size: 68 },
  { label: 'UI/UX', color: '#ff7262', size: 74 },
  { label: 'Firebase', color: '#ffca28', size: 66 },
  { label: 'Node', color: '#339933', size: 62 },
]

type Ball = {
  id: number; x: number; y: number
  vx: number; vy: number; size: number
  label: string; color: string
  rot: number; rv: number
}

export default function TechStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const balls = useRef<Ball[]>([])
  const raf = useRef(0)
  const secRef = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (secRef.current) obs.observe(secRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!vis) return
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext('2d')!
    const W = c.width = c.offsetWidth
    const H = c.height = c.offsetHeight

    balls.current = TECHS.map((t, i) => ({
      id: i, label: t.label, color: t.color, size: t.size,
      x: 100 + Math.random() * (W - 200),
      y: -t.size - i * 80,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 1.5 + Math.random() * 2,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 2,
    }))

    const G = 0.3, DAMP = 0.62, FRIC = 0.97, FLOOR = H - 24

    const drawBall = (b: Ball) => {
      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(b.rot * Math.PI / 180)
      const r = b.size / 2

      // Drop shadow
      ctx.shadowColor = 'rgba(0,0,0,0.7)'
      ctx.shadowBlur = 28
      ctx.shadowOffsetY = 12

      // Sphere gradient — white pearl style
      const g = ctx.createRadialGradient(-r * 0.32, -r * 0.32, r * 0.04, 0, 0, r)
      g.addColorStop(0, '#eaeaea')
      g.addColorStop(0.45, '#c8c8d0')
      g.addColorStop(0.85, '#888898')
      g.addColorStop(1, '#444455')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0

      // Color tint
      ctx.globalAlpha = 0.22
      ctx.fillStyle = b.color
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1

      // Specular
      const sg = ctx.createRadialGradient(-r * 0.38, -r * 0.38, 0, -r * 0.38, -r * 0.38, r * 0.5)
      sg.addColorStop(0, 'rgba(255,255,255,0.65)')
      sg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = sg
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()

      // Text
      ctx.globalAlpha = 0.95
      ctx.font = `600 ${r * 0.46}px 'DM Sans', sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = b.color
      // Text shadow
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 4
      ctx.fillText(b.label, 0, 0)
      ctx.shadowBlur = 0; ctx.globalAlpha = 1

      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      for (const b of balls.current) {
        b.vy += G; b.x += b.vx; b.y += b.vy; b.rot += b.rv
        const r = b.size / 2
        if (b.y + r > FLOOR) { b.y = FLOOR - r; b.vy = -Math.abs(b.vy) * DAMP; b.vx *= FRIC; b.rv *= 0.85; if (Math.abs(b.vy) < 1) b.vy = 0 }
        if (b.x - r < 0) { b.x = r; b.vx = Math.abs(b.vx) * 0.8 }
        if (b.x + r > W) { b.x = W - r; b.vx = -Math.abs(b.vx) * 0.8 }
        for (const b2 of balls.current) {
          if (b2.id <= b.id) continue
          const dx = b2.x - b.x, dy = b2.y - b.y, dist = Math.hypot(dx, dy), min = r + b2.size / 2
          if (dist < min && dist > 0) {
            const nx = dx/dist, ny = dy/dist, ov = (min-dist)*0.5
            b.x -= nx*ov; b.y -= ny*ov; b2.x += nx*ov; b2.y += ny*ov
            const dv = (b.vx-b2.vx)*nx + (b.vy-b2.vy)*ny
            if (dv > 0) { b.vx -= dv*nx*0.65; b.vy -= dv*ny*0.65; b2.vx += dv*nx*0.65; b2.vy += dv*ny*0.65 }
          }
        }
        drawBall(b)
      }
      raf.current = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf.current)
  }, [vis])

  // Mouse repulsion
  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const h = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      for (const b of balls.current) {
        const dx = b.x - mx, dy = b.y - my, d = Math.hypot(dx, dy)
        if (d < b.size * 2.2) {
          const f = (b.size * 2.2 - d) / b.size
          b.vx += (dx/d)*f*5; b.vy += (dy/d)*f*5 - 2
        }
      }
    }
    c.addEventListener('mousemove', h)
    return () => c.removeEventListener('mousemove', h)
  }, [vis])

  return (
    <section className="techstack" ref={secRef} id="skills">
      <div className="ts-bg-text">STACK</div>
      <div className="ts-header">
        <div className="ts-tag">— Tech Stack</div>
        <p className="ts-sub">Hover to interact</p>
      </div>
      <canvas ref={canvasRef} className="ts-canvas"/>
    </section>
  )
}
