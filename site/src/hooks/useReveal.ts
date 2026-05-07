import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Options = {
  selector?: string
  y?: number
  stagger?: number
  delay?: number
  start?: string
  duration?: number
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = opts.selector ? el.querySelectorAll(opts.selector) : [el]
    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: opts.y ?? 32,
        duration: opts.duration ?? 0.9,
        ease: 'power3.out',
        delay: opts.delay ?? 0,
        stagger: opts.stagger ?? 0.06,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 82%',
          once: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [opts.selector, opts.y, opts.stagger, opts.delay, opts.start, opts.duration])

  return ref
}
