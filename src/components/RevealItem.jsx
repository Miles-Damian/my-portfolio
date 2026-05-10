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

    let frameId = null

    const updateVisibility = () => {
      const rect = element.getBoundingClientRect()
      const triggerPoint = window.innerHeight * 0.82
      const shouldShow = rect.top < triggerPoint && rect.bottom > 0

      setIsVisible(shouldShow)
    }

    const handleScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        updateVisibility()
        frameId = null
      })
    }

    updateVisibility()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
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
