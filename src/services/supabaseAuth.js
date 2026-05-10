function getSupabaseConfig() {
  return {
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    url: import.meta.env.VITE_SUPABASE_URL,
  }
}

function createAuthUrl(path) {
  const { url } = getSupabaseConfig()
  const normalizedUrl = url.replace(/\/$/, '')

  return `${normalizedUrl}/auth/v1/${path}`
}

export function getAdminSession() {
  try {
    const token = window.localStorage.getItem('miles-admin-access-token')
    const email = window.localStorage.getItem('miles-admin-email')

    return token ? { email, token } : null
  } catch {
    return null
  }
}

export async function signInAdmin(email, password) {
  const { anonKey, url } = getSupabaseConfig()

  if (!anonKey || !url) {
    throw new Error('Supabase env vars are missing.')
  }

  const response = await fetch(createAuthUrl('token?grant_type=password'), {
    body: JSON.stringify({ email, password }),
    headers: {
      apikey: anonKey,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Invalid admin email or password.')
  }

  const session = await response.json()

  window.localStorage.setItem('miles-admin-access-token', session.access_token)
  window.localStorage.setItem('miles-admin-email', session.user.email)

  return {
    email: session.user.email,
    token: session.access_token,
  }
}

export function signOutAdmin() {
  window.localStorage.removeItem('miles-admin-access-token')
  window.localStorage.removeItem('miles-admin-email')
}
