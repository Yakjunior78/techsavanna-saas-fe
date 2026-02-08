import type { NavigationGuardWithThis, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export const authGuard: NavigationGuardWithThis<undefined> = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const authStore = useAuthStore()

  // Initialize auth state from storage if not already done
  if (!authStore.token) {
    authStore.initialize()
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  // Check if route is for guests only (login/register pages)
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
}

export const adminGuard: NavigationGuardWithThis<undefined> = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (authStore.user?.role !== 'admin' && authStore.user?.role !== 'owner') {
    return { name: 'dashboard' }
  }

  return true
}
