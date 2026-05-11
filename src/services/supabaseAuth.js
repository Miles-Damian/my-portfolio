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

function saveAdminSession(session) {
  const expiresAt = Date.now() + session.expires_in * 1000

  window.localStorage.setItem('miles-admin-access-token', session.access_token)
  window.localStorage.setItem('miles-admin-email', session.user.email)
  window.localStorage.setItem('miles-admin-expires-at', String(expiresAt))

  if (session.refresh_token) {
    window.localStorage.setItem('miles-admin-refresh-token', session.refresh_token)
  }
}

export function getAdminSession() {
  try {
    const token = window.localStorage.getItem('miles-admin-access-token')
    const email = window.localStorage.getItem('miles-admin-email')
    const refreshToken = window.localStorage.getItem('miles-admin-refresh-token')

    return token || refreshToken ? { email, token } : null
  } catch {
    return null
  }
}

export async function refreshAdminSession() {
  const { anonKey, url } = getSupabaseConfig()
  const refreshToken = window.localStorage.getItem('miles-admin-refresh-token')

  if (!anonKey || !url) {
    throw new Error('Supabase env vars are missing.')
  }

  if (!refreshToken) {
    throw new Error('Your admin session expired. Please sign in again.')
  }

  const response = await fetch(createAuthUrl('token?grant_type=refresh_token'), {
    body: JSON.stringify({ refresh_token: refreshToken }),
    headers: {
      apikey: anonKey,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    signOutAdmin()
    throw new Error('Your admin session expired. Please sign in again.')
  }

  const session = await response.json()

  saveAdminSession(session)

  return {
    email: session.user.email,
    token: session.access_token,
  }
}

export async function getValidAdminAccessToken() {
  const token = window.localStorage.getItem('miles-admin-access-token')
  const expiresAt = Number(window.localStorage.getItem('miles-admin-expires-at') || 0)
  const refreshBufferMs = 60 * 1000

  if (token && expiresAt - refreshBufferMs > Date.now()) {
    return token
  }

  const refreshedSession = await refreshAdminSession()

  return refreshedSession.token
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

  saveAdminSession(session)

  return {
    email: session.user.email,
    token: session.access_token,
  }
}

export function signOutAdmin() {
  window.localStorage.removeItem('miles-admin-access-token')
  window.localStorage.removeItem('miles-admin-email')
  window.localStorage.removeItem('miles-admin-expires-at')
  window.localStorage.removeItem('miles-admin-refresh-token')
}
