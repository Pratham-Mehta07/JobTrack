// Shared LocalStorage helpers. The UI never touches localStorage directly,
// so teammates can reuse these (or swap in a real backend later).
//
// Each application looks like:
// { id, company, role, applicationDate, status, jobLink, notes }

const STORAGE_KEY = 'jobtrack_applications'

export function loadApplications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  } catch {
    // Storage full or blocked: the app still works, it just won't be saved.
  }
}
