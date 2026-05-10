const defaultBucket = 'portfolio'

function getSupabaseConfig() {
  return {
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    bucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || defaultBucket,
    url: import.meta.env.VITE_SUPABASE_URL,
  }
}

function getSessionToken() {
  try {
    return window.localStorage.getItem('miles-admin-access-token')
  } catch {
    return null
  }
}

function createSafeFileName(fileName) {
  const extension = fileName.split('.').pop() || 'jpg'
  const timestamp = Date.now()

  return `profile-${timestamp}.${extension.toLowerCase()}`
}

export async function uploadProfileImage(file) {
  const { anonKey, bucket, url } = getSupabaseConfig()
  const token = getSessionToken()

  if (!anonKey || !url) {
    throw new Error('Supabase env vars are missing.')
  }

  if (!token) {
    throw new Error('Please sign in before uploading an image.')
  }

  const normalizedUrl = url.replace(/\/$/, '')
  const path = `about/${createSafeFileName(file.name)}`
  const uploadUrl = `${normalizedUrl}/storage/v1/object/${bucket}/${path}`
  const publicUrl = `${normalizedUrl}/storage/v1/object/public/${bucket}/${path}`

  const response = await fetch(uploadUrl, {
    body: file,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    method: 'POST',
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => null)

    throw new Error(errorDetails?.message || 'Unable to upload profile image.')
  }

  return publicUrl
}
