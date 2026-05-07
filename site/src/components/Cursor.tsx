import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const interactiveSelector = 'a, button, [data-cursor="hover"]'
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest(interactiveSelector)) {
        ring.classList.add('is-hover')
      }
    }
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest(interactiveSelector)) {
        ring.classList.remove('is-hover')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, true)
    document.addEventListener('pointerout', onOut, true)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver, true)
      document.removeEventListener('pointerout', onOut, true)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
