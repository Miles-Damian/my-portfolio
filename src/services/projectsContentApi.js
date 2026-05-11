import { defaultProjectsContent } from '../data/projectsContent.js'

const tableName = 'projects_content'
const recordId = 'projects'

function getSupabaseConfig() {
  return {
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    url: import.meta.env.VITE_SUPABASE_URL,
  }
}

function hasSupabaseConfig() {
  const { anonKey, url } = getSupabaseConfig()

  return Boolean(anonKey && url)
}

function getSessionToken() {
  try {
    return window.localStorage.getItem('miles-admin-access-token')
  } catch {
    return null
  }
}

function createHeaders(useSession = false) {
  const { anonKey } = getSupabaseConfig()
  const token = useSession ? getSessionToken() : null

  return {
    apikey: anonKey,
    Authorization: `Bearer ${token ?? anonKey}`,
    'Content-Type': 'application/json',
  }
}

function createTableUrl(query = '') {
  const { url } = getSupabaseConfig()
  const normalizedUrl = url.replace(/\/$/, '')

  return `${normalizedUrl}/rest/v1/${tableName}${query}`
}

function normalizeProject(project, index) {
  const fallback = defaultProjectsContent[index] ?? defaultProjectsContent[0]

  return {
    ...fallback,
    ...project,
    tags: Array.isArray(project?.tags) ? project.tags : fallback.tags,
  }
}

export async function fetchProjectsContentFromSupabase() {
  if (!hasSupabaseConfig()) {
    return null
  }

  const response = await fetch(createTableUrl(`?id=eq.${recordId}&select=content`), {
    headers: createHeaders(),
  })

  if (!response.ok) {
    throw new Error('Unable to load Projects content from Supabase.')
  }

  const [record] = await response.json()

  return Array.isArray(record?.content) && record.content.length > 0
    ? record.content.map(normalizeProject)
    : null
}

export async function saveProjectsContentToSupabase(content) {
  if (!hasSupabaseConfig()) {
    return false
  }

  const response = await fetch(createTableUrl('?on_conflict=id'), {
    body: JSON.stringify({
      content,
      id: recordId,
      updated_at: new Date().toISOString(),
    }),
    headers: {
      ...createHeaders(true),
      Prefer: 'resolution=merge-duplicates',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Unable to save Projects content to Supabase.')
  }

  return true
}

export function isProjectsSupabaseConfigured() {
  return hasSupabaseConfig()
}
