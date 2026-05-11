import { defaultAboutContent } from '../data/aboutContent.js'
import { getValidAdminAccessToken } from './supabaseAuth.js'

const tableName = 'about_content'
const recordId = 'about'

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

function createHeaders(token = null) {
  const { anonKey } = getSupabaseConfig()

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

export async function fetchAboutContentFromSupabase() {
  if (!hasSupabaseConfig()) {
    return null
  }

  const response = await fetch(createTableUrl(`?id=eq.${recordId}&select=content`), {
    headers: createHeaders(),
  })

  if (!response.ok) {
    throw new Error('Unable to load About content from Supabase.')
  }

  const [record] = await response.json()

  return record?.content ? { ...defaultAboutContent, ...record.content } : null
}

export async function saveAboutContentToSupabase(content) {
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
      ...createHeaders(await getValidAdminAccessToken()),
      Prefer: 'resolution=merge-duplicates',
    },
    method: 'POST',
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => null)

    throw new Error(errorDetails?.message || 'Unable to save About content to Supabase.')
  }

  return true
}

export function isSupabaseConfigured() {
  return hasSupabaseConfig()
}
