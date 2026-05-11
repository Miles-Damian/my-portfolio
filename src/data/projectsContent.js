import { projects } from './portfolio.js'

export const projectsContentStorageKey = 'miles-projects-content'

export const defaultProjectsContent = projects.map((project) => ({
  ...project,
  tags: [...project.tags],
}))
