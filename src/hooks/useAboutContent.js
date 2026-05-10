import { useEffect, useState } from 'react'
import { aboutContentStorageKey, defaultAboutContent } from '../data/aboutContent.js'
import {
  fetchAboutContentFromSupabase,
  saveAboutContentToSupabase,
} from '../services/aboutContentApi.js'

export function loadLocalAboutContent() {
  try {
    const storedContent = window.localStorage.getItem(aboutContentStorageKey)

    if (!storedContent) {
      return defaultAboutContent
    }

    return {
      ...defaultAboutContent,
      ...JSON.parse(storedContent),
    }
  } catch {
    return defaultAboutContent
  }
}

export async function saveAboutContent(content) {
  await saveAboutContentToSupabase(content)
  window.localStorage.setItem(aboutContentStorageKey, JSON.stringify(content))
  window.dispatchEvent(new Event('about-content-updated'))
}

export function resetAboutContent() {
  window.localStorage.removeItem(aboutContentStorageKey)
  window.dispatchEvent(new Event('about-content-updated'))
}

export default function useAboutContent() {
  const [aboutContent, setAboutContent] = useState(loadLocalAboutContent)

  useEffect(() => {
    let isMounted = true

    const updateContent = async () => {
      try {
        const supabaseContent = await fetchAboutContentFromSupabase()

        if (isMounted) {
          setAboutContent(supabaseContent ?? loadLocalAboutContent())
        }
      } catch {
        if (isMounted) {
          setAboutContent(loadLocalAboutContent())
        }
      }
    }

    updateContent()

    window.addEventListener('storage', updateContent)
    window.addEventListener('about-content-updated', updateContent)

    return () => {
      isMounted = false
      window.removeEventListener('storage', updateContent)
      window.removeEventListener('about-content-updated', updateContent)
    }
  }, [])

  return aboutContent
}
