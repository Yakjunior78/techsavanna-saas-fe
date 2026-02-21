import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const store = useAuthStore()

  const {
    user,
    token,
    refreshToken,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    initials,
    signupResponse
  } = storeToRefs(store)

  return {
    // Reactive state
    user,
    token,
    refreshToken,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    initials,
    signupResponse,
    // Actions
    initialize: store.initialize,
    login: store.login,
    register: store.register,
    signup: store.signup,
    verifyEmail: store.verifyEmail,
    resendOtp: store.resendOtp,
    logout: store.logout,
    refreshUser: store.refreshUser,
    updateProfile: store.updateProfile,
    clearError: store.clearError
  }
}
