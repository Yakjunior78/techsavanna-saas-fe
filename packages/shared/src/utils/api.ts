import { getItem } from './storage'
import { STORAGE_KEYS } from '../constants'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: number
  details?: Array<Record<string, string>>
}

// Pluggable error notification handler (wired up by apps to show toasts)
type ErrorNotifier = (message: string) => void
let onApiError: ErrorNotifier | null = null

export function setApiErrorHandler(handler: ErrorNotifier) {
  onApiError = handler
}

const getBaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL as string
  }
  return 'https://api.saas.techsavanna.technology/api/v1'
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: 'An unexpected error occurred'
    }))
    onApiError?.(error.message)
    throw error
  }
  return response.json()
}

async function fetchSafe(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options)
  } catch {
    const error = {
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      code: 0
    } as ApiError
    onApiError?.(error.message)
    throw error
  }
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  const token = getItem<string>(STORAGE_KEYS.AUTH_TOKEN)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetchSafe(`${getBaseUrl()}${endpoint}`, {
    method: 'GET',
    headers: getHeaders()
  })
  return handleResponse<T>(response)
}

export async function apiPost<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
  const response = await fetchSafe(`${getBaseUrl()}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined
  })
  return handleResponse<T>(response)
}

export async function apiPut<T, D = unknown>(endpoint: string, data: D): Promise<T> {
  const response = await fetchSafe(`${getBaseUrl()}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse<T>(response)
}

export async function apiPatch<T, D = unknown>(endpoint: string, data: D): Promise<T> {
  const response = await fetchSafe(`${getBaseUrl()}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse<T>(response)
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await fetchSafe(`${getBaseUrl()}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return handleResponse<T>(response)
}
