import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { resume } from '../data/resume'

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const half = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: -half,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  const items = [...resume.marquee, ...resume.marquee]

  return (
    <div className="marquee" aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {items.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  )
}
