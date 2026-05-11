import useProjectsContent from '../hooks/useProjectsContent.js'
import RevealItem from './RevealItem.jsx'

export default function Projects() {
  const projects = useProjectsContent()

  return (
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
                <button className="flex-1 rounded border border-outline py-2 text-sm font-bold text-on-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95">
                  Details
                </button>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </section>
  )
}
