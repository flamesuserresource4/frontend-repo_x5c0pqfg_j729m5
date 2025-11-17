// Centralized backend base URL resolution
// Priority: VITE_BACKEND_URL env → window.BACKEND_URL (if provided) → known demo backend URL → localhost

const DEMO_BACKEND = 'https://ta-01kaa27amhg77fkpnea5ne3g88-8000.wo-xcfytzjwrgyfnqbvrezdi5.w.modal.host'

export const backendBase =
  import.meta?.env?.VITE_BACKEND_URL?.trim() ||
  (typeof window !== 'undefined' && window.BACKEND_URL) ||
  DEMO_BACKEND ||
  'http://localhost:8000'

export async function apiGet(path) {
  const url = `${backendBase}${path}`
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed ${res.status}: ${text || url}`)
  }
  return res.json()
}
