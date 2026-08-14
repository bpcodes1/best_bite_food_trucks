import { useEffect } from 'react'

/**
 * Scroll reveal: elements marked `.reveal` rise into place once, as they enter.
 *
 * TIME-BASED, NOT SCROLL-LINKED, and that distinction is the whole feature.
 * The first attempt used CSS `animation-timeline: view()`, which ties the
 * animation's position to the scroll position — elegant, no JavaScript, and
 * wrong here: a fast thumb-flick on a phone completes the whole thing in one
 * frame and the reader sees nothing. Enrique reported exactly that. The
 * reference site he supplied triggers once on entry and then plays on a timer
 * regardless of scroll speed (WOW.js firing animate.css at 0.5s with 0.2s
 * steps, measured from their own CSS). This matches that model, a little
 * longer and travelling further so the motion reads.
 *
 * NOT AN ANIMATION LIBRARY. design.md bans GSAP, Framer Motion, Lottie and
 * Lenis on weight grounds — roughly 50 kB that only runs after hydration. This
 * is an IntersectionObserver and a class name.
 *
 * FAILS SAFE. The hiding rule lives behind `.js-reveal` on <html>, which only
 * this hook ever adds. No JavaScript, no observer support, or reduced motion
 * preferred, and every element is simply visible. On a pre-rendered site whose
 * entire value is that the content is in the HTML, a reveal that can leave the
 * page blank is not an acceptable trade.
 */
export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const root = document.documentElement
    root.classList.add('js-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])
}
