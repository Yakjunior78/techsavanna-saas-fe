// Backend API response types
export interface ApiPlan {
  id: string
  productCode: string
  name: string
  billingCycle: string
  basePriceKes: number
  perSeatPriceKes: number
  includedSeats: number
  annualDiscountPercent: number
}

export interface PlansApiResponse {
  plans: ApiPlan[]
}

// Frontend display types
export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  featured?: boolean
  ctaText?: string
  maxUsers?: number
  trialDays?: number
}

export interface Subscription {
  id: string
  userId: string
  organizationId: string
  planId: string
  status: SubscriptionStatus
  billingPeriod: BillingPeriod
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  paymentMethod?: PaymentMethod
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial' | 'past_due'

export type BillingPeriod = 'monthly' | 'yearly'

export interface PaymentMethod {
  id: string
  type: 'card' | 'mobile_money'
  last4?: string
  brand?: string
  mobileNumber?: string
  provider?: string
  isDefault: boolean
}

export interface PaystackPaymentIntent {
  reference: string
  accessCode: string
  authorizationUrl: string
  amount: number
  currency: string
}
