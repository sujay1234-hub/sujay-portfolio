import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const h = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <nav className={`navbar ${stuck ? 'stuck' : ''}`}>
      <div className="nav-logo" onClick={() => go('hero')}>SB<span>.</span></div>
      <div className="nav-center">B.Tech CSE · Aspiring Software Engineer</div>
      <div className="nav-links">
        <button onClick={() => go('about')}>About</button>
        <button onClick={() => go('work')}>Work</button>
        <button onClick={() => go('skills')}>Skills</button>
        <button onClick={() => go('contact')}>Contact</button>
      </div>
    </nav>
  )
}
