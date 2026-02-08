import { getItem } from './storage'
import { STORAGE_KEYS } from '../constants'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

const getBaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL as string
  }
  return 'http://localhost:8000/api/v1'
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: 'An unexpected error occurred'
    }))
    throw error
  }
  return response.json()
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
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: 'GET',
    headers: getHeaders()
  })
  return handleResponse<T>(response)
}

export async function apiPost<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined
  })
  return handleResponse<T>(response)
}

export async function apiPut<T, D = unknown>(endpoint: string, data: D): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse<T>(response)
}

export async function apiPatch<T, D = unknown>(endpoint: string, data: D): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse<T>(response)
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return handleResponse<T>(response)
}
