import { useEffect, useRef, useState } from 'react'

export default function RevealItem({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const itemRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = itemRef.current

    if (!element) {
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
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.1,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Component
      className={`reveal-item ${isVisible ? 'reveal-item-visible' : ''} ${className}`.trim()}
      ref={itemRef}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  )
}
