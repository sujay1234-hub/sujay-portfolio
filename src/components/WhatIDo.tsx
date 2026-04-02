import { useEffect, useRef, useState } from 'react'
import './WhatIDo.css'

const CARDS = [
  {
    num: '01',
    title: 'Web Development',
    body: 'Building fast, responsive web applications from the ground up. Focused on clean code, sharp interfaces, and real-world performance using HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend Dev'],
  },
  {
    num: '02',
    title: 'Product Thinking',
    body: 'Turning real problems into practical, shippable tools. From attendance calculators to skill-exchange platforms — startup-minded building with strong focus on usability.',
    tags: ['Product Design', 'MVP', 'UX Optimization', 'Problem Solving'],
  },
  {
    num: '03',
    title: 'UI/UX & Performance',
    body: 'Crafting interfaces that are clean, fast, and thoughtful. Obsessing over animations, interactions, and performance — including video processing pipelines with FFmpeg.',
    tags: ['UI/UX Design', 'Performance', 'Animation', 'FFmpeg'],
  },
]

const HIGHLIGHTS = [
  'Strong focus on real-world project development',
  'Builder mindset with startup-oriented thinking',
  'Focus on UI/UX and performance optimization',
  'Actively developing scalable product ideas',
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
      <div className="whatido-header">
        <div className="whatido-tag">— About Me</div>
        <h2 className="whatido-title">
          Building things<br />
          that <em>matter</em>
        </h2>
      </div>

      <div className="whatido-bio">
        <p>
          I am a Computer Science Engineering student at <strong>Lovely Professional University</strong> with
          a strong interest in web development and real-world product building. I focus on creating practical
          solutions, improving UI/UX, and optimizing performance.
        </p>
        <p>
          I believe in learning by building, and I am actively working on projects that combine technology with
          startup-level thinking. My goal is to become a skilled software engineer and create scalable digital
          platforms that solve real problems.
        </p>
      </div>

      <div className="whatido-section-label">— What I Do</div>
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

      <div className="whatido-exp">
        <div className="whatido-section-label">— Experience</div>
        <div className="exp-row">
          <div className="exp-left">
            <span className="exp-role">Business Manager</span>
            <span className="exp-company">The Drop Service Hub</span>
          </div>
          <div className="exp-right">
            <p>Managing digital services focused on text animation and creative solutions. Responsible for ensuring high-quality output, smooth delivery, and client satisfaction.</p>
          </div>
        </div>
      </div>

      <div className="whatido-certs">
        <div className="whatido-section-label">— Certifications</div>
        <div className="cert-item">
          <span className="cert-dot" />
          <span>Certified Project Management Associate — Skill India Digital Hub</span>
        </div>
      </div>

      <div className="whatido-highlights">
        {HIGHLIGHTS.map((h, i) => (
          <div key={i} className="highlight-item" style={{ transitionDelay: `${i * 0.07}s` }}>
            <span className="highlight-num">0{i + 1}</span>
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="whatido-statement">
        <span>LPU</span>
        <span className="ws-dot">·</span>
        <span>B.Tech CSE</span>
        <span className="ws-dot">·</span>
        <span>Startup Mindset</span>
        <span className="ws-dot">·</span>
        <span className="ws-red">3 Projects Shipped</span>
      </div>
    </section>
  )
}
