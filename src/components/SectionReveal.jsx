import { useEffect, useRef, useState } from 'react'

export default function SectionReveal({ children, delay = 0 }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const element = sectionRef.current

    if (!element) {
      return undefined
    }

    if (isVisible) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.15,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div
      className={`section-reveal ${isVisible ? 'section-reveal-visible' : ''}`}
      ref={sectionRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
