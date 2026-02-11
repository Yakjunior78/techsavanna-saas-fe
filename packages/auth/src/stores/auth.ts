import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@techsavanna/shared'
import { STORAGE_KEYS, getItem, setItem, removeItem, apiPost, apiGet, API_ENDPOINTS } from '@techsavanna/shared'
import type { ApiError } from '@techsavanna/shared'

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

interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  companyName: string
  subdomainSlug: string
  country: string
  industry: string
  companySize: string
  website: string
  product: string
  planId: string
  billingCycle: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

interface SignupResponse {
  userId: string
  tenantId: string
  subscriptionId: string
  accessToken: string
  refreshToken: string
  product: string
  amount: number
  currency: string
  subdomainSlug: string
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const signupResponse = ref<SignupResponse | null>(null)
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
    const storedRefreshToken = getItem<string>(STORAGE_KEYS.REFRESH_TOKEN)
    const storedUser = getItem<User>(STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      token.value = storedToken
      refreshToken.value = storedRefreshToken
      user.value = storedUser
    }

    const storedSignupResponse = getItem<SignupResponse>('savanna_signup_response')
    if (storedSignupResponse) {
      signupResponse.value = storedSignupResponse
    }
  }

  // Actions
  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiPost<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

      token.value = response.accessToken
      refreshToken.value = response.refreshToken
      user.value = response.user

      setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken)
      setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
      setItem(STORAGE_KEYS.USER, response.user)

      return true
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message || 'Login failed'
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

      token.value = response.accessToken
      refreshToken.value = response.refreshToken
      user.value = response.user

      setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken)
      setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
      setItem(STORAGE_KEYS.USER, response.user)

      return true
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function signup(data: SignupData): Promise<SignupResponse> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiPost<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, data)

      token.value = response.accessToken
      refreshToken.value = response.refreshToken

      // Build user from signup data + response
      user.value = {
        id: response.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        tenantId: response.tenantId,
        tenantName: data.companyName
      }

      signupResponse.value = response

      setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken)
      setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
      setItem(STORAGE_KEYS.USER, user.value)
      setItem('savanna_signup_response', response)

      return response
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message || 'Signup failed'
      throw e
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
      refreshToken.value = null
      user.value = null
      signupResponse.value = null
      removeItem(STORAGE_KEYS.AUTH_TOKEN)
      removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      removeItem(STORAGE_KEYS.USER)
      removeItem('savanna_signup_response')
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
      const apiError = e as ApiError
      error.value = apiError.message || 'Update failed'
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
    refreshToken,
    signupResponse,
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
    signup,
    logout,
    refreshUser,
    updateProfile,
    clearError
  }
})
