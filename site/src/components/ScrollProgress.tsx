import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'top', label: '01 · Intro' },
  { id: 'about', label: '02 · About' },
  { id: 'work', label: '03 · Work' },
  { id: 'projects', label: '04 · Projects' },
  { id: 'skills', label: '05 · Skills' },
  { id: 'contact', label: '06 · Contact' },
]

export function ScrollProgress() {
  const [active, setActive] = useState<string>('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.05, 0.25, 0.6] },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="scroll-progress" aria-label="Section progress">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : undefined}>
          {s.label}
        </a>
      ))}
    </aside>
  )
}
