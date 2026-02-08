<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SAVANNA_APPS, COUNTRIES, INDUSTRIES } from '@techsavanna/shared'
import type { OnboardingConfig, OnboardingStep, PricingPlan } from '@techsavanna/shared'
import { useOnboarding } from '@techsavanna/onboarding'
import { OnboardingWizard, FormField, FormSelect, Drawer, PhoneInput, PasswordStrength, DataConsentCheckbox } from '@techsavanna/ui'

const route = useRoute()
const router = useRouter()
const appConfig = SAVANNA_APPS.pos

// Define onboarding steps
const steps: OnboardingStep[] = [
  {
    id: 'account',
    title: 'Create Your Account',
    description: 'Enter your details to get started with SavannapayPOS',
    icon: 'user',
    required: true,
    order: 1
  },
  {
    id: 'organization',
    title: 'Business Details',
    description: 'Help us personalize your POS experience',
    icon: 'building',
    required: true,
    order: 2
  },
  {
    id: 'plan',
    title: 'Select Your Plan',
    description: 'Choose the plan that fits your business',
    icon: 'credit-card',
    required: true,
    order: 3
  }
]

const onboardingConfig: OnboardingConfig = {
  appId: 'pos',
  steps,
  skipAllowed: true,
  persistToServer: false
}

const {
  currentStep,
  currentStepIndex,
  completedSteps,
  formData,
  isComplete,
  completeStep,
  goBack,
  skipStep,
  updateFormData,
  goToStep
} = useOnboarding(onboardingConfig)

// Local form state for validation
const errors = ref<Record<string, string>>({})
const isLoading = ref(false)

// Pricing plans
const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small retail shops',
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    features: ['1 POS Terminal', 'Up to 500 products', 'Basic reports']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing retail chains',
    monthlyPrice: 7999,
    yearlyPrice: 79990,
    featured: true,
    features: ['5 POS Terminals', 'Unlimited products', 'Advanced analytics']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large operations',
    monthlyPrice: 19999,
    yearlyPrice: 199990,
    features: ['Unlimited terminals', 'Custom integrations', 'Dedicated support']
  }
]

const selectedPlan = computed(() =>
  pricingPlans.find(p => p.id === formData.value.selectedPlanId) || pricingPlans[1]
)

const countryOptions = COUNTRIES.map(c => ({ label: `${c.flag} ${c.name}`, value: c.code }))
const industryOptions = INDUSTRIES.map(i => ({ label: i, value: i }))
const sizeOptions = [
  { label: '1-10 employees', value: '1-10' },
  { label: '11-50 employees', value: '11-50' },
  { label: '51-200 employees', value: '51-200' },
  { label: '201-500 employees', value: '201-500' },
  { label: '500+ employees', value: '500+' }
]

onMounted(() => {
  // Pre-select plan from URL query
  const planId = route.query.plan as string
  if (planId && pricingPlans.some(p => p.id === planId)) {
    updateFormData({ selectedPlanId: planId })
  }
})

function validateCurrentStep(): boolean {
  errors.value = {}
  const data = formData.value

  if (currentStep.value?.id === 'account') {
    if (!data.email) errors.value.email = 'Email is required'
    if (!data.password) errors.value.password = 'Password is required'
    if (!data.confirmPassword) errors.value.confirmPassword = 'Confirm password is required'
    else if (data.password !== data.confirmPassword) errors.value.confirmPassword = 'Passwords do not match'
    if (!data.firstName) errors.value.firstName = 'First name is required'
    if (!data.lastName) errors.value.lastName = 'Last name is required'
    if (!data.phone) errors.value.phone = 'Phone number is required'
    if (!data.acceptedTerms) errors.value.acceptedTerms = 'You must accept the terms and conditions'
  }

  if (currentStep.value?.id === 'organization') {
    if (!data.organizationName) errors.value.organizationName = 'Business name is required'
    if (!data.country) errors.value.country = 'Country is required'
  }

  if (currentStep.value?.id === 'plan') {
    if (!data.selectedPlanId) errors.value.plan = 'Please select a plan'
  }

  return Object.keys(errors.value).length === 0
}

async function handleNext() {
  if (!validateCurrentStep()) return

  isLoading.value = true

  try {
    if (currentStep.value) {
      completeStep(currentStep.value.id)
    }

    // If completed all steps, redirect to dashboard
    if (isComplete.value || currentStepIndex.value === steps.length - 1) {
      // In real app, would call API to create account here
      router.push('/')
    }
  } finally {
    isLoading.value = false
  }
}

function handleBack() {
  goBack()
}

function handleSkip() {
  skipStep()
}

function selectPlan(planId: string) {
  updateFormData({ selectedPlanId: planId })
}

const drawerPlan = ref<PricingPlan | null>(null)
function openPlanDetails(plan: PricingPlan) {
  drawerPlan.value = plan
}
function closePlanDrawer() {
  drawerPlan.value = null
}

// App-specific features to display on signup
const appFeatures = [
  { icon: 'bolt', title: 'Lightning Fast Checkout', description: 'Process sales in seconds with our optimized POS interface' },
  { icon: 'chart', title: 'Real-time Analytics', description: 'Track sales, inventory, and performance instantly' },
  { icon: 'shield', title: 'Secure Payments', description: 'M-Pesa, cards, and cash with bank-grade security' }
]

// Computed property to check if current step requirements are met
const canContinue = computed(() => {
  const data = formData.value
  const stepId = currentStep.value?.id

  if (stepId === 'account') {
    return !!(
      data.email &&
      data.password &&
      data.confirmPassword &&
      data.password === data.confirmPassword &&
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.acceptedTerms
    )
  }

  if (stepId === 'organization') {
    return !!(data.organizationName && data.country)
  }

  if (stepId === 'plan') {
    return !!data.selectedPlanId
  }

  return true
})
</script>

<template>
  <OnboardingWizard
    :steps="steps"
    :current-step-id="currentStep?.id || steps[0].id"
    :completed-steps="completedSteps || []"
    :is-loading="isLoading"
    :can-continue="canContinue"
    :app-id="appConfig.id"
    :app-name="appConfig.name"
    :app-tagline="appConfig.tagline"
    :app-color="appConfig.primaryColor"
    :app-gradient-from="appConfig.gradientFrom"
    :app-gradient-to="appConfig.gradientTo"
    :app-logo="appConfig.logo"
    :app-logo-white="appConfig.logoWhite"
    :features="appFeatures"
    @next="handleNext"
    @back="handleBack"
    @skip="handleSkip"
    @step-click="goToStep"
  >
    <!-- Account Step -->
    <template v-if="currentStep?.id === 'account'">
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <FormField
            v-model="formData.firstName"
            label="First Name"
            placeholder="John"
            :error="errors.firstName"
            required
            @update:model-value="(val) => updateFormData({ firstName: String(val) })"
          />
          <FormField
            v-model="formData.lastName"
            label="Last Name"
            placeholder="Doe"
            :error="errors.lastName"
            required
            @update:model-value="(val) => updateFormData({ lastName: String(val) })"
          />
        </div>
        <FormField
          v-model="formData.email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          :error="errors.email"
          required
          @update:model-value="(val) => updateFormData({ email: String(val) })"
        />
        <PhoneInput
          v-model="formData.phone"
          label="Phone Number"
          placeholder="700 000 000"
          :error="errors.phone"
          required
          @update:model-value="(val) => updateFormData({ phone: String(val) })"
        />
        <div>
          <FormField
            v-model="formData.password"
            type="password"
            label="Password"
            placeholder="Create a strong password"
            :error="errors.password"
            required
            @update:model-value="(val) => updateFormData({ password: String(val) })"
          />
          <PasswordStrength :password="formData.password || ''" />
        </div>
        <FormField
          v-model="formData.confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          :error="errors.confirmPassword"
          required
          @update:model-value="(val) => updateFormData({ confirmPassword: String(val) })"
        />
        <DataConsentCheckbox
          v-model="formData.acceptedTerms"
          :error="errors.acceptedTerms"
          @update:model-value="(val) => updateFormData({ acceptedTerms: Boolean(val) })"
        />
      </div>
    </template>

    <!-- Organization Step -->
    <template v-else-if="currentStep?.id === 'organization'">
      <div class="space-y-4">
        <FormField
          v-model="formData.organizationName"
          label="Business Name"
          placeholder="My Retail Store"
          :error="errors.organizationName"
          required
          @update:model-value="(val) => updateFormData({ organizationName: String(val) })"
        />
        <FormSelect
          v-model="formData.country"
          label="Country"
          :options="countryOptions"
          :error="errors.country"
          required
          @update:model-value="(val) => updateFormData({ country: String(val) })"
        />
        <FormSelect
          v-model="formData.industry"
          label="Industry"
          :options="industryOptions"
          @update:model-value="(val) => updateFormData({ industry: String(val) })"
        />
        <FormSelect
          v-model="formData.organizationSize"
          label="Business Size"
          :options="sizeOptions"
          @update:model-value="(val) => updateFormData({ organizationSize: String(val) })"
        />
      </div>
    </template>

    <!-- Plan Selection Step -->
    <template v-else-if="currentStep?.id === 'plan'">
      <div class="space-y-3">
        <div
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="rounded-xl border-2 transition-all"
          :class="[
            formData.selectedPlanId === plan.id
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <button
            class="flex w-full cursor-pointer items-center justify-between p-3 text-left"
            @click="selectPlan(plan.id)"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
                :class="formData.selectedPlanId === plan.id ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'"
              >
                <svg v-if="formData.selectedPlanId === plan.id" class="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-900">{{ plan.name }}</span>
                  <span v-if="plan.featured" class="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">Popular</span>
                </div>
                <p class="text-xs text-gray-500">{{ plan.description }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-sm font-semibold text-gray-900">KES {{ plan.monthlyPrice.toLocaleString() }}</span>
              <span class="text-xs text-gray-500">/mo</span>
            </div>
          </button>
          <div class="border-t border-gray-100 px-3 py-2">
            <button
              class="flex cursor-pointer items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700"
              @click.stop="openPlanDetails(plan)"
            >
              <span>View details</span>
              <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
        <p v-if="errors.plan" class="text-sm text-red-600">{{ errors.plan }}</p>
      </div>
    </template>
  </OnboardingWizard>

  <!-- Plan Details Drawer -->
  <Drawer
    :open="!!drawerPlan"
    :title="drawerPlan?.name"
    width="sm"
    @close="closePlanDrawer"
  >
    <div v-if="drawerPlan" class="p-4">
      <!-- Plan Header -->
      <div class="mb-6">
        <div class="flex items-center gap-2">
          <span v-if="drawerPlan.featured" class="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Most Popular</span>
        </div>
        <p class="mt-2 text-sm text-gray-600">{{ drawerPlan.description }}</p>
      </div>

      <!-- Pricing -->
      <div class="mb-6 rounded-lg bg-gray-50 p-4">
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-bold text-gray-900">KES {{ drawerPlan.monthlyPrice.toLocaleString() }}</span>
          <span class="text-sm text-gray-500">/month</span>
        </div>
        <p class="mt-1 text-xs text-gray-500">
          or KES {{ drawerPlan.yearlyPrice.toLocaleString() }}/year (save {{ Math.round((1 - drawerPlan.yearlyPrice / (drawerPlan.monthlyPrice * 12)) * 100) }}%)
        </p>
      </div>

      <!-- Features -->
      <div>
        <h4 class="mb-3 text-sm font-medium text-gray-900">What's included</h4>
        <ul class="space-y-3">
          <li v-for="feature in drawerPlan.features" :key="feature" class="flex items-start gap-2">
            <svg class="mt-0.5 size-4 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm text-gray-600">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #footer>
      <button
        class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        @click="drawerPlan && selectPlan(drawerPlan.id); closePlanDrawer()"
      >
        Select {{ drawerPlan?.name }} Plan
      </button>
    </template>
  </Drawer>
</template>
