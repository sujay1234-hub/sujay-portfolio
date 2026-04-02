import { useEffect, useRef, useState } from 'react'
import './Hero.css'

/* Animated noise canvas bg */
function NoiseBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!
    let raf: number
    const W = c.width = c.offsetWidth
    const H = c.height = c.offsetHeight
    const draw = () => {
      const img = ctx.createImageData(W, H)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 18
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 255
      }
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="hero-noise" />
}

export default function Hero() {
  const [ready, setReady] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setReady(true), 80)
  }, [])

  // Parallax on mouse move
  useEffect(() => {
    const el = heroRef.current; if (!el) return
    const handle = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 20
      const yPct = (e.clientY / window.innerHeight - 0.5) * 10
      el.style.setProperty('--px', `${xPct}px`)
      el.style.setProperty('--py', `${yPct}px`)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section id="hero" className={`hero ${ready ? 'hero--in' : ''}`} ref={heroRef}>
      <NoiseBg />

      {/* Red vertical line accent */}
      <div className="hero-line" />

      {/* Top label */}
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-dot" />
        B.Tech CSE · Aspiring Software Engineer · Web Developer
      </div>

      {/* Giant display name */}
      <div className="hero-name-wrap">
        <h1 className="hero-name">
          <span className="hero-name-row row1" style={{ transform: 'translate(var(--px,0), var(--py,0))' }}>SUJAY</span>
          <span className="hero-name-row row2" style={{ transform: 'translate(calc(var(--px,0) * -1), calc(var(--py,0) * -1))' }}>BANARJEE</span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="hero-tagline">
        I build practical digital products focused on&nbsp;
        <em>performance, user experience, and real-world impact.</em>
      </div>

      {/* Bottom strip */}
      <div className="hero-bottom">
        <div className="hero-bottom-left">
          <span>B.Tech CSE</span>
          <span className="hero-sep">·</span>
          <span>Lovely Professional University</span>
          <span className="hero-sep">·</span>
          <span>Building Real-World Products</span>
        </div>
        <div className="hero-scroll-cue">
          <span>Scroll</span>
          <div className="hero-scroll-line"><div className="hero-scroll-thumb"/></div>
        </div>
      </div>

      {/* Floating red number */}
      <div className="hero-year">2025</div>
    </section>
  )
}
