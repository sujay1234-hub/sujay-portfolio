import { useEffect, useRef, useState } from 'react'
import './WhatIDo.css'

const CARDS = [
  {
    num: '01',
    title: 'Web Development',
    body: 'I build fast, responsive, production-grade web apps from the ground up. Clean code. Sharp interfaces. Real results.',
    tags: ['React', 'TypeScript', 'Node.js', 'Firebase', 'HTML/CSS'],
  },
  {
    num: '02',
    title: 'Startup Building',
    body: 'I take real student problems and ship MVPs that solve them. From attendance calculators to skill-exchange platforms — practical tools people actually use.',
    tags: ['Product Design', 'MVP', 'UX', 'Rapid Prototyping'],
  },
  {
    num: '03',
    title: 'UI Engineering',
    body: 'Pixel-perfect interfaces with smooth animations, thoughtful interactions, and obsessive attention to detail. Design that communicates before a word is read.',
    tags: ['Framer Motion', 'GSAP', 'Three.js', 'CSS Animation'],
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

export default function WhatIDo() {
  const { ref, vis } = useReveal()

  return (
    <section id="about" className={`whatido ${vis ? 'in' : ''}`} ref={ref}>
      {/* Section header */}
      <div className="whatido-header">
        <div className="whatido-tag">— What I Do</div>
        <h2 className="whatido-title">
          Building things<br />
          that <em>matter</em>
        </h2>
      </div>

      {/* Cards row */}
      <div className="whatido-cards">
        {CARDS.map((c, i) => (
          <div key={c.num} className="wcard" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="wcard-num">{c.num}</div>
            <div className="wcard-body">
              <h3 className="wcard-title">{c.title}</h3>
              <p className="wcard-text">{c.body}</p>
              <div className="wcard-tags">
                {c.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Big statement */}
      <div className="whatido-statement">
        <span>LPU</span>
        <span className="ws-dot">·</span>
        <span>B.Tech CS</span>
        <span className="ws-dot">·</span>
        <span>1st Year</span>
        <span className="ws-dot">·</span>
        <span className="ws-red">3 Projects Shipped</span>
      </div>
    </section>
  )
}
