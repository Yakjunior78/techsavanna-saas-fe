import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const store = useAuthStore()

  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    initials
  } = storeToRefs(store)

  return {
    // Reactive state
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    initials,
    // Actions
    initialize: store.initialize,
    login: store.login,
    register: store.register,
    logout: store.logout,
    refreshUser: store.refreshUser,
    updateProfile: store.updateProfile,
    clearError: store.clearError
  }
}
