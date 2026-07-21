import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import useProjectsContent from '../hooks/useProjectsContent.js'
import Icon from './Icon.jsx'
import RevealItem from './RevealItem.jsx'

export default function Projects() {
  const projects = useProjectsContent()
  const [activeCertificate, setActiveCertificate] = useState(null)

  useEffect(() => {
    if (!activeCertificate) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCertificate(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCertificate])

  return (
    <>
      <section className="mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop" id="projects">
        <RevealItem as="h2" className="mb-12 flex items-center gap-4 font-headline-lg text-headline-lg text-on-surface" delay={80}>
          <span className="h-1 w-12 bg-primary" /> Featured Projects
        </RevealItem>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <RevealItem as="article" className="glass-card group flex flex-col overflow-hidden rounded-xl" delay={160 + index * 120} key={project.title}>
              <div className="relative h-48 overflow-hidden">
                <img
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={project.image}
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h4 className="mb-3 text-headline-lg font-bold text-on-surface">{project.title}</h4>
                <p className="mb-6 flex-grow text-body-sm text-on-surface-variant">
                  {project.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    className={`flex-1 rounded py-2 text-center text-sm font-bold transition-all duration-300 active:scale-95 ${
                      project.liveUrl
                        ? 'bg-primary text-on-primary shadow-[0_0_16px_rgba(165,231,255,0.18)] hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(165,231,255,0.34)]'
                        : 'pointer-events-none bg-surface-variant text-outline'
                    }`}
                    href={project.liveUrl ?? '#projects'}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View Live
                  </a>
                  <button
                    className={`flex-1 rounded border border-outline py-2 text-sm font-bold transition-all duration-300 active:scale-95 ${
                      project.certificateImage
                        ? 'text-on-surface hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:text-primary'
                        : 'cursor-not-allowed text-outline opacity-60'
                    }`}
                    disabled={!project.certificateImage}
                    onClick={() => setActiveCertificate(project)}
                    type="button"
                  >
                    View Certificate
                  </button>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </section>
      {activeCertificate && createPortal(
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          onClick={() => setActiveCertificate(null)}
          role="dialog"
        >
          <div
            className="relative flex max-h-[calc(100dvh-4rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-outline bg-surface shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-outline px-4 py-3">
              <h3 className="text-base font-bold text-on-surface">
                {activeCertificate.title} Certificate
              </h3>
              <button
                aria-label="Close certificate"
                className="flex h-10 w-10 items-center justify-center rounded border border-outline text-on-surface transition-all hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
                onClick={() => setActiveCertificate(null)}
                type="button"
              >
                <Icon className="text-[20px]">close</Icon>
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black p-4">
              <img
                alt={`${activeCertificate.title} certificate`}
                className="block max-h-[calc(100dvh-10rem)] max-w-full object-contain"
                src={activeCertificate.certificateImage}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
