import { navLinks, profile } from '../data/portfolio.js'
import Icon from './Icon.jsx'

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 bg-surface-container-lowest">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 px-margin-mobile py-10 text-center md:flex-row md:px-margin-desktop md:py-12 md:text-left">
        <a className="flex items-center gap-2" href="#home">
          <Icon className="text-primary">terminal</Icon>
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            {profile.name}
          </span>
        </a>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 font-code-md text-code-md text-outline md:justify-start">
          {navLinks.map((link) => (
            <a
              className="transition-colors duration-300 hover:text-tertiary"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="font-code-md text-code-md text-outline">
          © 2026 MILES. Built with care.
        </div>
      </div>
    </footer>
  )
}
