import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resume } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.project', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })

      // magnetic-ish hover lift
      const cards = el.querySelectorAll<HTMLElement>('.project')
      cards.forEach((card) => {
        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left - r.width / 2) / r.width
          const y = (e.clientY - r.top - r.height / 2) / r.height
          gsap.to(card, {
            rotationX: -y * 4,
            rotationY: x * 6,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power3',
          })
        }
        const onLeave = () =>
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3' })
        card.addEventListener('pointermove', onMove)
        card.addEventListener('pointerleave', onLeave)
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projects">
      <div className="shell">
        <span className="eyebrow">Selected projects</span>
        <h2 className="section-title">
          Things I&apos;ve <em>built</em>.
        </h2>
        <p className="section-lead">
          Personal builds where I owned the stack end-to-end — auth, data, UI.
        </p>
        <div className="project-grid">
          {resume.projects.map((p, i) => (
            <article key={p.name} className="project" data-cursor="hover">
              <span className="num">0{i + 1}</span>
              <p className="sub">{p.sub}</p>
              <h3>{p.name}</h3>
              <p className="summary">{p.summary}</p>
              <ul>
                {p.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className="stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
