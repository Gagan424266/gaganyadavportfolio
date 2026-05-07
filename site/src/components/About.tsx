import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resume } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '35', unit: '%', label: 'lower trading-system latency' },
  { num: '40', unit: '%', label: 'faster server responses (Django)' },
  { num: '50', unit: '%', label: 'MAU growth on full-stack app' },
  { num: '3+', unit: 'yrs', label: 'production React + Node' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.about-quote .word')
      if (reduced) {
        gsap.set(words, { opacity: 1, y: 0 })
      } else {
        gsap.from(words, {
          opacity: 0.05,
          y: 0,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.6,
          },
        })
      }
      gsap.from(el.querySelectorAll('.about-stat'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.about-grid'),
          start: 'top 85%',
          once: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const words = resume.manifesto.split(' ')

  return (
    <section ref={ref} id="about">
      <div className="shell">
        <span className="eyebrow">About</span>
        <p className="about-quote">
          {words.map((w, i) => (
            <span key={i} className={`word${i % 7 === 3 ? ' accent' : ''}`}>
              {w + ' '}
            </span>
          ))}
        </p>
        <div className="about-grid">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat">
              <div className="num">
                {s.num}
                <span className="unit">{s.unit}</span>
              </div>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
