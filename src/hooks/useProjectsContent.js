import { useEffect, useState } from 'react'
import { defaultProjectsContent, projectsContentStorageKey } from '../data/projectsContent.js'
import {
  fetchProjectsContentFromSupabase,
  saveProjectsContentToSupabase,
} from '../services/projectsContentApi.js'

function normalizeProjects(projects) {
  return projects.map((project) => ({
    ...project,
    certificateImage: project.certificateImage ?? '',
    tags: Array.isArray(project.tags) ? project.tags : [],
  }))
}

export function loadLocalProjectsContent() {
  try {
    const storedContent = window.localStorage.getItem(projectsContentStorageKey)

    if (!storedContent) {
      return defaultProjectsContent
    }

    const parsedContent = JSON.parse(storedContent)

    return Array.isArray(parsedContent)
      ? normalizeProjects(parsedContent)
      : defaultProjectsContent
  } catch {
    return defaultProjectsContent
  }
}

export async function saveProjectsContent(content) {
  await saveProjectsContentToSupabase(content)
  window.localStorage.setItem(projectsContentStorageKey, JSON.stringify(content))
  window.dispatchEvent(new Event('projects-content-updated'))
}

export function resetProjectsContent() {
  window.localStorage.removeItem(projectsContentStorageKey)
  window.dispatchEvent(new Event('projects-content-updated'))
}

export default function useProjectsContent() {
  const [projectsContent, setProjectsContent] = useState(loadLocalProjectsContent)

  useEffect(() => {
    let isMounted = true

    const updateContent = async () => {
      try {
        const supabaseContent = await fetchProjectsContentFromSupabase()

        if (isMounted) {
          setProjectsContent(supabaseContent ?? loadLocalProjectsContent())
        }
      } catch {
        if (isMounted) {
          setProjectsContent(loadLocalProjectsContent())
        }
      }
    }

    updateContent()

    window.addEventListener('storage', updateContent)
    window.addEventListener('projects-content-updated', updateContent)

    return () => {
      isMounted = false
      window.removeEventListener('storage', updateContent)
      window.removeEventListener('projects-content-updated', updateContent)
    }
  }, [])

  return projectsContent
}
