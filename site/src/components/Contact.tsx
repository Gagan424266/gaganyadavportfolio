import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resume } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.contact > *'), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })

      const link = el.querySelector<HTMLAnchorElement>('.email-link')
      if (link) {
        const onMove = (e: PointerEvent) => {
          const r = link.getBoundingClientRect()
          const x = e.clientX - (r.left + r.width / 2)
          const y = e.clientY - (r.top + r.height / 2)
          gsap.to(link, { x: x * 0.18, y: y * 0.25, duration: 0.4, ease: 'power3' })
        }
        const onLeave = () =>
          gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        link.addEventListener('pointermove', onMove)
        link.addEventListener('pointerleave', onLeave)
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="contact">
      <span className="eyebrow">Contact</span>
      <h2>
        Let&apos;s build <em>something</em>.
      </h2>
      <a className="email-link" href={`mailto:${resume.email}`} data-cursor="hover">
        {resume.email}
      </a>
      <div className="meta">
        <a href={`tel:${resume.phone.replace(/\s/g, '')}`}>{resume.phone}</a>
        <span>{resume.location}</span>
        {resume.githubUrl ? (
          <a href={resume.githubUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        ) : null}
        {resume.linkedinUrl ? (
          <a href={resume.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        ) : null}
      </div>
    </section>
  )
}
