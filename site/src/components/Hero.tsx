import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { resume } from '../data/resume'

function splitToChars(text: string) {
  return text.split('').map((ch, i) => (
    <span key={i} className="char" aria-hidden>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))
}

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero .meta-row span', { opacity: 0, y: 14, stagger: 0.06, duration: 0.6 })
        .from(
          '.hero h1 .char',
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.018 },
          '-=0.2',
        )
        .from('.hero-role', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('.hero-tagline', { opacity: 0, y: 18, duration: 0.7 }, '-=0.4')
        .from('.hero-actions > *', { opacity: 0, y: 14, stagger: 0.08, duration: 0.5 }, '-=0.4')
        .from('.scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.2')
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="hero">
      <div className="shell">
        <div className="meta-row" aria-label="Meta">
          <span>{resume.location}</span>
          <span>Available · 2026</span>
          <span>{resume.title}</span>
        </div>
        <h1 aria-label={resume.name}>
          <span className="word">{splitToChars(resume.firstName)}</span>{' '}
          <span className="word accent">{splitToChars(resume.lastName)}</span>
        </h1>
        <div className="hero-sub">
          <span className="hero-role">
            <span className="dot" />
            {resume.title} · React · Node · Django
          </span>
          <p className="hero-tagline">{resume.shortBio}</p>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View work <span className="arrow">↗</span>
          </a>
          <a className="btn btn-ghost" href={`mailto:${resume.email}`}>
            {resume.email} <span className="arrow">→</span>
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden>
        Scroll
      </div>
    </section>
  )
}
