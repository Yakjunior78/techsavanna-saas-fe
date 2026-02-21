export * from './apps'

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'savanna_auth_token',
  REFRESH_TOKEN: 'savanna_refresh_token',
  USER: 'savanna_user',
  ONBOARDING_PROGRESS: 'savanna_onboarding',
  THEME: 'savanna_theme',
  LOCALE: 'savanna_locale'
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_OTP: '/auth/resend-otp'
  },
  USERS: {
    ME: '/users/me',
    UPDATE_PROFILE: '/users/me',
    CHANGE_PASSWORD: '/users/me/password'
  },
  ORGANIZATIONS: {
    CREATE: '/organizations',
    GET: '/organizations/:id',
    UPDATE: '/organizations/:id'
  },
  SUBSCRIPTIONS: {
    CREATE: '/subscriptions',
    GET: '/subscriptions/current',
    CANCEL: '/subscriptions/cancel',
    UPDATE_PAYMENT: '/subscriptions/payment-method'
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
    STATUS: '/payments'
  },
  TENANTS: {
    LIST: '/tenants',
    STATUS: '/tenants'
  },
  BILLING: {
    PLANS: '/billing/plans'
  }
} as const

export const COUNTRIES = [
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪', dialCode: '+254' },
  { code: 'UG', name: 'Uganda', currency: 'UGX', flag: '🇺🇬', dialCode: '+256' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', flag: '🇹🇿', dialCode: '+255' },
  { code: 'RW', name: 'Rwanda', currency: 'RWF', flag: '🇷🇼', dialCode: '+250' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', dialCode: '+234' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭', dialCode: '+233' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦', dialCode: '+27' },
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', flag: '🇪🇹', dialCode: '+251' },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', dialCode: '+44' },
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳', dialCode: '+91' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', flag: '🇦🇪', dialCode: '+971' }
] as const

export const INDUSTRIES = [
  'Retail & E-commerce',
  'Food & Beverage',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Professional Services',
  'Real Estate',
  'Technology',
  'Agriculture',
  'Hospitality',
  'Transportation & Logistics',
  'Financial Services',
  'Non-Profit',
  'Other'
] as const
