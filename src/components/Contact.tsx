import { useEffect, useRef, useState } from 'react'
import './Contact.css'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className={`contact ${vis ? 'in' : ''}`} ref={ref}>
      {/* Giant CTA */}
      <div className="ct-top">
        <div className="ct-tag">— Get In Touch</div>
        <a href="mailto:sujaybanarjeee@email.com" className="ct-cta">
          <span className="ct-cta-text">Let's Work<br />Together</span>
          <div className="ct-cta-arrow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </div>
        </a>
      </div>

      {/* Divider */}
      <div className="ct-divider"/>

      {/* Footer info row */}
      <div className="ct-bottom">
        <div className="ct-info">
          <p className="ct-label">Email</p>
          <a href="mailto:sujaybanarjeee@email.com" className="ct-value hover-link">sujaybanarjeee@email.com</a>
          <p className="ct-label" style={{marginTop: 20}}>Location</p>
          <p className="ct-value">Ludhiana, Punjab, India</p>
        </div>

        <div className="ct-socials">
          <p className="ct-label">Social</p>
          {[
            { label: 'Github', href: 'https://github.com/sujaybanarjee' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/sujaybanarjee' },
            { label: 'Twitter', href: 'https://twitter.com/sujaybanarjee' },
            { label: 'Instagram', href: 'https://instagram.com/sujaybanarjee' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="ct-soc">
              <span>{s.label}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          ))}
        </div>

        <div className="ct-credit">
          <p>Designed &amp; Built by</p>
          <p className="ct-name">Sujay Banarjee</p>
          <p className="ct-copy">© 2025</p>
        </div>
      </div>
    </section>
  )
}
