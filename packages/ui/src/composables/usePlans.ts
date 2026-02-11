import { ref } from 'vue'
import { apiGet, API_ENDPOINTS } from '@techsavanna/shared'
import type { PricingPlan, ApiPlan, PlansApiResponse } from '@techsavanna/shared'

export interface PlanDisplayConfig {
  description: string
  features: string[]
  featured?: boolean
  ctaText?: string
  trialDays?: number
}

function mapToPricingPlan(apiPlan: ApiPlan, config: PlanDisplayConfig): PricingPlan {
  const monthlyPrice = apiPlan.basePriceKes
  const yearlyPrice = Math.round(monthlyPrice * 12 * (1 - apiPlan.annualDiscountPercent / 100))

  return {
    id: apiPlan.id,
    name: apiPlan.name,
    description: config.description,
    monthlyPrice,
    yearlyPrice,
    features: config.features,
    featured: config.featured,
    ctaText: config.ctaText,
    trialDays: config.trialDays,
    maxUsers: apiPlan.includedSeats || undefined
  }
}

export function usePlans() {
  const plans = ref<PricingPlan[]>([])
  const rawPlans = ref<ApiPlan[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPlans(productCode: string, config: PlanDisplayConfig) {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiGet<PlansApiResponse>(
        `${API_ENDPOINTS.BILLING.PLANS}?product=${productCode}`
      )
      const filtered = response.plans.filter(p => p.productCode === productCode)
      rawPlans.value = filtered
      plans.value = filtered.map(plan => mapToPricingPlan(plan, config))
    } catch (e) {
      error.value = (e as any).message || 'Failed to load plans'
    } finally {
      isLoading.value = false
    }
  }

  return { plans, rawPlans, isLoading, error, fetchPlans }
}
