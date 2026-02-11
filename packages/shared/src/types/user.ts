export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  tenantId?: string
  tenantName?: string
  avatarUrl?: string
  role?: UserRole
  organizationId?: string
}

export type UserRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'

export interface Organization {
  id: string
  name: string
  slug: string
  logo?: string
  industry?: string
  size?: OrganizationSize
  country: string
  currency: string
  timezone: string
  createdAt: Date
}

export type OrganizationSize = '1-10' | '11-50' | '51-200' | '201-500' | '500+'

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
