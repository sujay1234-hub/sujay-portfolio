import { useEffect, useRef, useState } from 'react'
import './MyWork.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Attendance Calculator',
    type: 'Web App',
    year: '2025',
    desc: 'A precision tool that calculates student attendance percentage and forecasts exactly how many classes must be attended to meet requirements. Built for real students with real deadlines.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    status: 'Live',
  },
  {
    num: '02',
    title: 'Skill Swap',
    type: 'Platform',
    year: '2025',
    desc: 'A peer-to-peer learning platform where students exchange skills, teach each other, and build projects together. A barter economy for knowledge, running on trust and reciprocity.',
    stack: ['React', 'Firebase', 'Firestore'],
    status: 'Beta',
  },
  {
    num: '03',
    title: 'Campus Zine',
    type: 'Community',
    year: '2025',
    desc: 'A digital campus newspaper — centralising student events, opportunities, club updates, and announcements. Built by students for the students who need to know.',
    stack: ['React', 'Node.js', 'Firebase'],
    status: 'Building',
  },
]

export default function MyWork() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="work" className={`mywork ${vis ? 'in' : ''}`} ref={ref}>
      {/* Header */}
      <div className="mw-header">
        <div className="mw-tag">— Selected Work</div>
        <h2 className="mw-title">My Work</h2>
      </div>

      {/* Project list */}
      <div className="mw-list">
        {PROJECTS.map((p, i) => (
          <div key={p.num} className="mw-row" style={{ transitionDelay: `${i * 0.08}s` }}>
            {/* Left — number + year */}
            <div className="mw-left">
              <span className="mw-num">{p.num}</span>
            </div>

            {/* Center — title + desc */}
            <div className="mw-center">
              <div className="mw-row-top">
                <h3 className="mw-name">{p.title}</h3>
                <span className={`mw-status ${p.status.toLowerCase()}`}>{p.status}</span>
              </div>
              <p className="mw-desc">{p.desc}</p>
              <div className="mw-stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
            </div>

            {/* Right — type + year + arrow */}
            <div className="mw-right">
              <span className="mw-type">{p.type}</span>
              <span className="mw-year">{p.year}</span>
              <div className="mw-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
