export interface OnboardingStep {
  id: string
  title: string
  description: string
  icon?: string
  required: boolean
  order: number
}

export interface OnboardingProgress {
  currentStepId: string
  completedSteps: string[]
  stepData: Record<string, Record<string, unknown>>
  startedAt: Date
  lastUpdatedAt: Date
}

export interface OnboardingConfig {
  appId: string
  steps: OnboardingStep[]
  skipAllowed: boolean
  persistToServer: boolean
}

export interface OnboardingFormData {
  // Account step
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptedTerms?: boolean

  // Organization step
  organizationName?: string
  organizationSize?: string
  industry?: string
  country?: string
  website?: string

  // Institution step (for Elimu)
  institutionName?: string
  institutionType?: string
  studentCount?: string

  // Plan step
  selectedPlanId?: string
  billingPeriod?: 'monthly' | 'yearly'

  // Signup response data
  tenantId?: string
  subscriptionId?: string
  siteUrl?: string

  // Payment tracking
  paymentId?: string
  paymentReference?: string
  paymentStatus?: 'pending' | 'completed' | 'failed'
}
