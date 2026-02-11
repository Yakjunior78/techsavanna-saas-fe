import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@techsavanna/auth'

// Disable browser's native scroll restoration to prevent auto-scrolling on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/landing/LandingPage.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/onboarding/OnboardingPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/LoginPage.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/DashboardPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/pages/legal/PrivacyPolicyPage.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/pages/legal/TermsOfServicePage.vue')
    },
    {
      path: '/cookie-policy',
      name: 'cookie-policy',
      component: () => import('@/pages/legal/CookiePolicyPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/contact/ContactPage.vue')
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('@/pages/sales/SalesPage.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/pages/download/DownloadPage.vue')
    }
  ],
  scrollBehavior(to) {
    // Always scroll to top, unless navigating to a hash anchor
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'instant' }
  }
})

router.beforeEach(authGuard)

export default router
