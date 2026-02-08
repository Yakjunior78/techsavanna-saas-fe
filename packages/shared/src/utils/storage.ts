export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const item = localStorage.getItem(key)
    if (!item) return null
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

export function clearAll(): void {
  if (typeof window === 'undefined') return
  localStorage.clear()
}

// Session storage helpers
export function getSessionItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const item = sessionStorage.getItem(key)
    if (!item) return null
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

export function setSessionItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error)
  }
}
