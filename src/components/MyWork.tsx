import { useEffect, useRef, useState } from 'react'
import './MyWork.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Attendance Calculator',
    type: 'Web App',
    year: '2025',
    desc: 'A web-based tool designed to help students calculate attendance percentage and track exactly how many classes are required. Built with a simple, practical interface focused on usability.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    status: 'Live',
    href: '#',
  },
  {
    num: '02',
    title: 'SkillSwap',
    type: 'Platform',
    year: '2025',
    desc: 'A platform that enables users to exchange skills instead of money — encouraging collaborative learning and community-driven growth. A barter economy built for knowledge.',
    stack: ['React', 'Firebase', 'Firestore'],
    status: 'In Development',
    href: '#',
  },
  {
    num: '03',
    title: 'Portfolio Forge',
    type: 'SaaS Tool',
    year: '2025',
    desc: 'A platform aimed at helping students and freelancers easily create professional portfolios with templates and customization features. Built for those who need a presence fast.',
    stack: ['React', 'Node.js', 'Firebase'],
    status: 'Coming Soon',
    href: '#',
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
      <div className="mw-header">
        <div className="mw-tag">— Selected Work</div>
        <h2 className="mw-title">My Work</h2>
      </div>

      <div className="mw-list">
        {PROJECTS.map((p, i) => (
          <div key={p.num} className="mw-row" style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="mw-left">
              <span className="mw-num">{p.num}</span>
            </div>

            <div className="mw-center">
              <div className="mw-row-top">
                <h3 className="mw-name">{p.title}</h3>
                <span className={`mw-status ${p.status.toLowerCase().replace(/\s+/g, '-')}`}>{p.status}</span>
              </div>
              <p className="mw-desc">{p.desc}</p>
              <div className="mw-stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
            </div>

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

      {/* Career objective */}
      <div className="mw-objective">
        <div className="mw-obj-label">— Career Objective</div>
        <p className="mw-obj-text">
          To become a skilled software engineer and digital product builder, creating impactful and scalable
          solutions for real-world problems.
        </p>
      </div>
    </section>
  )
}
