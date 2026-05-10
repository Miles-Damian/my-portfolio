import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio.js'
import Icon from './Icon.jsx'

export default function Header() {
  const [activeSection, setActiveSection] = useState(navLinks[0].href)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => ({
        href: link.href,
        element: document.querySelector(link.href),
      }))
      .filter((section) => section.element)

    if (!sectionElements.length) {
      return undefined
    }

    let animationFrameId = 0

    const updateActiveSection = () => {
      const headerOffset = 96
      const viewportTop = headerOffset
      const viewportBottom = window.innerHeight
      const visibleSections = sectionElements
        .map((section) => {
          const rectangle = section.element.getBoundingClientRect()
          const visibleTop = Math.max(rectangle.top, viewportTop)
          const visibleBottom = Math.min(rectangle.bottom, viewportBottom)

          return {
            href: section.href,
            visibleHeight: Math.max(0, visibleBottom - visibleTop),
          }
        })
        .filter((section) => section.visibleHeight > 0)

      const currentSection = visibleSections.sort(
        (firstSection, secondSection) => secondSection.visibleHeight - firstSection.visibleHeight,
      )[0]?.href

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrameId)
      animationFrameId = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-primary/15 bg-surface/80 shadow-[0_0_20px_rgba(165,231,255,0.1)] backdrop-blur-xl">
      <nav className="mx-auto max-w-container-max px-margin-mobile py-4 min-[927px]:px-margin-desktop">
        <div className="flex items-center justify-between">
          <a className="flex items-center gap-2" href="#home" onClick={() => setIsMenuOpen(false)}>
            <Icon className="text-primary">terminal</Icon>
            <span className="font-headline-lg text-headline-lg font-bold text-primary">
              {profile.name}
            </span>
          </a>

          <div className="hidden items-center gap-8 min-[927px]:flex">
            {navLinks.map((link) => (
              <a
                className={`flex items-center gap-1.5 font-code-md text-code-md transition-all duration-300 ${
                  activeSection === link.href
                    ? 'border-b-2 border-primary pb-1 text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                href={link.href}
                key={link.href}
                onClick={() => setActiveSection(link.href)}
              >
                <Icon className="text-[18px] leading-none">{link.icon}</Icon>
                {link.label}
              </a>
            ))}
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/20 active:scale-95 min-[927px]:hidden"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            type="button"
          >
            <Icon>{isMenuOpen ? 'close' : 'menu'}</Icon>
          </button>
        </div>

        <div
          className={`grid w-full transition-all duration-300 min-[927px]:hidden ${
            isMenuOpen ? 'grid-rows-[1fr] pt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="glass-card flex flex-col gap-2 rounded-lg p-3">
              {navLinks.map((link) => (
                <a
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 font-code-md text-code-md transition-all duration-300 ${
                    activeSection === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-primary'
                  }`}
                  href={link.href}
                  key={link.href}
                  onClick={() => {
                    setActiveSection(link.href)
                    setIsMenuOpen(false)
                  }}
                >
                  <Icon className="text-[20px] leading-none">{link.icon}</Icon>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
