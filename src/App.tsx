import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatIDo from './components/WhatIDo'
import MyWork from './components/MyWork'
import TechStack from './components/TechStack'
import Contact from './components/Contact'

export default function App() {
  const curRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let cx = tx, cy = ty
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', move)
    let raf: number
    const tick = () => {
      cx += (tx - cx) * 0.14
      cy += (ty - cy) * 0.14
      if (curRef.current) {
        curRef.current.style.transform = `translate(${cx}px, ${cy}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div id="cur" ref={curRef}><div id="cur-ball"/></div>

      {/* Social sidebar — vertical text like awwwards sites */}
      <div id="social-bar">
        <a href="https://github.com/sujaybanarjee" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/sujaybanarjee" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://twitter.com/sujaybanarjee" target="_blank" rel="noreferrer">Twitter</a>
      </div>

      {/* Resume */}
      <a id="resume-btn" href="mailto:sujaybanarjeee@email.com">Hire Me</a>

      <Navbar />
      <Hero />
      <WhatIDo />
      <MyWork />
      <TechStack />
      <Contact />
    </>
  )
}
