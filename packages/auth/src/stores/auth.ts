import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthState } from '@techsavanna/shared'
import { STORAGE_KEYS, getItem, setItem, removeItem, apiPost, apiGet, API_ENDPOINTS } from '@techsavanna/shared'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

interface AuthResponse {
  user: User
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  const initials = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase()
  })

  // Initialize from storage
  function initialize() {
    const storedToken = getItem<string>(STORAGE_KEYS.AUTH_TOKEN)
    const storedUser = getItem<User>(STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = storedUser
    }
  }

  // Actions
  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiPost<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

      token.value = response.token
      user.value = response.user

      setItem(STORAGE_KEYS.AUTH_TOKEN, response.token)
      setItem(STORAGE_KEYS.USER, response.user)

      return true
    } catch (e) {
      error.value = (e as Error).message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterData): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiPost<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data)

      token.value = response.token
      user.value = response.user

      setItem(STORAGE_KEYS.AUTH_TOKEN, response.token)
      setItem(STORAGE_KEYS.USER, response.user)

      return true
    } catch (e) {
      error.value = (e as Error).message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiPost(API_ENDPOINTS.AUTH.LOGOUT)
    } catch {
      // Ignore logout API errors
    } finally {
      token.value = null
      user.value = null
      removeItem(STORAGE_KEYS.AUTH_TOKEN)
      removeItem(STORAGE_KEYS.USER)
    }
  }

  async function refreshUser(): Promise<void> {
    if (!token.value) return

    try {
      const response = await apiGet<User>(API_ENDPOINTS.USERS.ME)
      user.value = response
      setItem(STORAGE_KEYS.USER, response)
    } catch {
      // If refresh fails, logout
      await logout()
    }
  }

  async function updateProfile(data: Partial<User>): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiPost<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data)
      user.value = response
      setItem(STORAGE_KEYS.USER, response)
      return true
    } catch (e) {
      error.value = (e as Error).message || 'Update failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Computed
    isAuthenticated,
    fullName,
    initials,
    // Actions
    initialize,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
    clearError
  }
})
