<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SAVANNA_APPS, INDUSTRIES, slugify, validateName, validateEmail, validatePhone, validatePasswordField, validateConfirmPassword } from '@techsavanna/shared'
import type { OnboardingConfig, OnboardingStep } from '@techsavanna/shared'
import { useOnboarding } from '@techsavanna/onboarding'
import { useAuth } from '@techsavanna/auth'
import { OnboardingWizard, FormField, FormSelect, PhoneInput, PasswordStrength, DataConsentCheckbox, usePlans, useProvisioning } from '@techsavanna/ui'

const router = useRouter()
const route = useRoute()
const appConfig = SAVANNA_APPS.people
const appDomain = import.meta.env.VITE_PEOPLE_DOMAIN || 'saas.techsavanna.technology'
const { signup, logout, isLoading: authLoading, error: authError, isAuthenticated, fullName, initials } = useAuth()

// Define onboarding steps
const steps: OnboardingStep[] = [
  {
    id: 'account',
    title: 'Create Your Account',
    description: 'Enter your details to get started with WorkwiseHRM',
    icon: 'user',
    required: true,
    order: 1
  },
  {
    id: 'organization',
    title: 'Company Details',
    description: 'Help us personalize your HR experience',
    icon: 'building',
    required: true,
    order: 2
  },
  {
    id: 'plan',
    title: 'Select Your Plan',
    description: 'Choose the billing cycle that fits your team',
    icon: 'credit-card',
    required: true,
    order: 3
  },
  {
    id: 'setup',
    title: 'Setting Up',
    description: 'We\'re preparing your workspace',
    icon: 'cog',
    required: true,
    order: 4
  }
]

const onboardingConfig: OnboardingConfig = {
  appId: 'people',
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
  goToStep,
  resetProgress
} = useOnboarding(onboardingConfig)

// Always start from step 1 when navigating to onboarding
resetProgress()

// Local form state for validation
const errors = ref<Record<string, string>>({})
const isLoading = ref(false)

// Re-validate fields with existing errors as user types
watch(formData, () => {
  for (const field of Object.keys(errors.value)) {
    validateField(field)
  }
}, { deep: true })

// Fetch plans from backend
const { rawPlans, fetchPlans } = usePlans()

onMounted(() => {
  fetchPlans('PRODUCT_PEOPLE', { description: '', features: [] })
})

const activePlan = computed(() => rawPlans.value[0] || null)

// Billing options - derived from API plan data
const billingCycle = ref<'monthly' | 'annual'>(
  route.query.billing === 'yearly' || route.query.billing === 'annual' ? 'annual' : 'monthly'
)
const MONTHLY_PRICE = computed(() => activePlan.value?.basePriceKes ?? 0)
const ANNUAL_PRICE = computed(() => {
  if (!activePlan.value) return 0
  const p = activePlan.value
  return Math.round(p.basePriceKes * 12 * (1 - p.annualDiscountPercent / 100))
})
const TRIAL_DAYS = 14
const annualMonthlySaving = computed(() => activePlan.value?.annualDiscountPercent ?? 0)

const selectedPlanId = computed(() => activePlan.value?.id ?? '')

// Keep formData in sync with billing cycle selection
watch(billingCycle, () => {
  updateFormData({ selectedPlanId: selectedPlanId.value })
}, { immediate: true })

// Provisioning composable
const {
  status: provisioningStatus,
  isPolling: provisioningPolling,
  isReady: provisioningReady,
  error: provisioningError,
  startPolling: startProvisioningPolling
} = useProvisioning()

const activeProvisioningStepName = computed(() => {
  if (!provisioningStatus.value?.steps?.length) return ''
  const active = provisioningStatus.value.steps.find(
    s => s.stepNumber === provisioningStatus.value!.currentStepNumber
  )
  return active?.name || ''
})

// Wizard dynamic props
const wizardCtaText = computed(() => {
  if (currentStep.value?.id === 'plan') return 'Submit'
  return ''
})
const wizardHideFooter = computed(() => currentStep.value?.id === 'setup')
const wizardHideBackButton = computed(() => currentStep.value?.id === 'setup')

const siteUrl = computed(() => {
  const subdomain = tenantSubdomain.value
  return subdomain ? `https://${subdomain}.${appDomain}` : ''
})

async function handleLogout() {
  await logout()
  router.push('/')
}

const tenantSubdomain = computed(() => {
  const name = String(formData.value.organizationName || '')
  return name.trim() ? slugify(name) : ''
})

const industryOptions = INDUSTRIES.map(i => ({ label: i, value: i }))
const sizeOptions = [
  { label: '1-25 employees', value: '1-25' },
  { label: '26-50 employees', value: '26-50' },
  { label: '51-100 employees', value: '51-100' },
  { label: '101-250 employees', value: '101-250' },
  { label: '251-500 employees', value: '251-500' },
  { label: '500+ employees', value: '500+' }
]

function validateField(field: string) {
  const data = formData.value
  switch (field) {
    case 'firstName':
      errors.value.firstName = validateName(String(data.firstName || ''), 'First name')
      break
    case 'lastName':
      errors.value.lastName = validateName(String(data.lastName || ''), 'Last name')
      break
    case 'email':
      errors.value.email = validateEmail(String(data.email || ''))
      break
    case 'phone':
      errors.value.phone = validatePhone(String(data.phone || ''))
      break
    case 'password':
      errors.value.password = validatePasswordField(String(data.password || ''))
      if (data.confirmPassword) {
        errors.value.confirmPassword = validateConfirmPassword(String(data.password || ''), String(data.confirmPassword || ''))
      }
      break
    case 'confirmPassword':
      errors.value.confirmPassword = validateConfirmPassword(String(data.password || ''), String(data.confirmPassword || ''))
      break
  }
  if (!errors.value[field]) delete errors.value[field]
}

function validateCurrentStep(): boolean {
  errors.value = {}
  const data = formData.value

  if (currentStep.value?.id === 'account') {
    const emailErr = validateEmail(String(data.email || ''))
    if (emailErr) errors.value.email = emailErr
    const pwErr = validatePasswordField(String(data.password || ''))
    if (pwErr) errors.value.password = pwErr
    const cpErr = validateConfirmPassword(String(data.password || ''), String(data.confirmPassword || ''))
    if (cpErr) errors.value.confirmPassword = cpErr
    const fnErr = validateName(String(data.firstName || ''), 'First name')
    if (fnErr) errors.value.firstName = fnErr
    const lnErr = validateName(String(data.lastName || ''), 'Last name')
    if (lnErr) errors.value.lastName = lnErr
    const phErr = validatePhone(String(data.phone || ''))
    if (phErr) errors.value.phone = phErr
    if (!data.acceptedTerms) errors.value.acceptedTerms = 'You must accept the terms and conditions'
  }

  if (currentStep.value?.id === 'organization') {
    if (!data.organizationName) errors.value.organizationName = 'Company name is required'
  }

  return Object.keys(errors.value).length === 0
}

async function handleNext() {
  if (!validateCurrentStep()) return

  isLoading.value = true

  try {
    const stepId = currentStep.value?.id

    // Step 3: Plan → call signup API
    if (stepId === 'plan') {
      const data = formData.value
      const response = await signup({
        firstName: String(data.firstName || ''),
        lastName: String(data.lastName || ''),
        email: String(data.email || ''),
        phone: String(data.phone || ''),
        password: String(data.password || ''),
        companyName: String(data.organizationName || ''),
        subdomainSlug: tenantSubdomain.value,
        country: String(data.country || ''),
        industry: String(data.industry || ''),
        companySize: String(data.organizationSize || ''),
        website: String(data.website || ''),
        product: 'PRODUCT_PEOPLE',
        planId: selectedPlanId.value,
        billingCycle: billingCycle.value
      })

      // Store signup response data for provisioning step
      updateFormData({
        tenantId: response.tenantId,
        subscriptionId: response.subscriptionId
      })

      completeStep('plan')
      return
    }

    // Steps 1-2: normal advance
    if (currentStep.value) {
      completeStep(currentStep.value.id)
    }
  } catch {
    // Error is already set in authError by the composables
  } finally {
    isLoading.value = false
  }
}

// Watch for entering setup step → start provisioning polling
watch(() => currentStep.value?.id, (id) => {
  if (id === 'setup' && formData.value.tenantId) {
    startProvisioningPolling(formData.value.tenantId)
  }
})

// Rotating setup messages
const setupMessages = [
  'We\'re creating a private workspace just for you...',
  'Setting up your own dedicated database to keep your data completely isolated...',
  'This takes a little while because we ensure your data never mixes with anyone else\'s...',
  'Your workspace will have its own secure environment with dedicated resources...',
  'Almost there! Finalizing your workspace configuration...'
]
const currentMessageIndex = ref(0)
const displayedText = ref('')
let messageTimer: ReturnType<typeof setInterval> | null = null
let typingTimer: ReturnType<typeof setInterval> | null = null

function startTyping(message: string) {
  displayedText.value = ''
  let charIndex = 0
  if (typingTimer) clearInterval(typingTimer)
  typingTimer = setInterval(() => {
    if (charIndex < message.length) {
      displayedText.value = message.slice(0, charIndex + 1)
      charIndex++
    } else {
      if (typingTimer) clearInterval(typingTimer)
    }
  }, 35)
}

// Start rotating messages when entering setup step
watch(() => currentStep.value?.id, (id) => {
  if (id === 'setup') {
    startTyping(setupMessages[0])
    messageTimer = setInterval(() => {
      currentMessageIndex.value = (currentMessageIndex.value + 1) % setupMessages.length
      startTyping(setupMessages[currentMessageIndex.value])
    }, 6000)
  } else if (messageTimer) {
    clearInterval(messageTimer)
    messageTimer = null
  }
})

// Countdown + redirect on provisioning complete
const redirectCountdown = ref(5)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const redirectUrl = computed(() => {
  const subdomain = tenantSubdomain.value
  return subdomain
    ? `https://${subdomain}.${appDomain}`
    : '/'
})

function redirectToApp() {
  const subdomain = tenantSubdomain.value
  if (subdomain) {
    window.location.href = redirectUrl.value
  } else {
    router.push('/')
  }
}

watch(provisioningReady, (ready) => {
  if (ready) {
    if (messageTimer) {
      clearInterval(messageTimer)
      messageTimer = null
    }
    if (typingTimer) {
      clearInterval(typingTimer)
      typingTimer = null
    }
    redirectCountdown.value = 5
    countdownTimer = setInterval(() => {
      redirectCountdown.value--
      if (redirectCountdown.value <= 0) {
        if (countdownTimer) clearInterval(countdownTimer)
        redirectToApp()
      }
    }, 1000)
  }
})

onUnmounted(() => {
  if (messageTimer) clearInterval(messageTimer)
  if (typingTimer) clearInterval(typingTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})

function handleBack() {
  goBack()
}

function handleSkip() {
  skipStep()
}

function handleWebsiteInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  updateFormData({ website: 'https://' + value })
}

// App-specific features to display on signup
const appFeatures = [
  { icon: 'users', title: 'Employee Self-Service', description: 'Empower your team with leave requests and payslips' },
  { icon: 'chart', title: 'Smart Payroll', description: 'Automated calculations with statutory compliance' },
  { icon: 'clock', title: 'Time & Attendance', description: 'Track working hours with biometric integration' }
]

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
    return !!data.organizationName
  }

  if (stepId === 'plan') {
    return true
  }

  return true
})

</script>

<template>
  <OnboardingWizard
    :steps="steps"
    :current-step-id="currentStep?.id || steps[0].id"
    :completed-steps="completedSteps || []"
    :is-loading="isLoading || authLoading"
    :can-continue="canContinue"
    :cta-text="wizardCtaText"
    :hide-footer="wizardHideFooter"
    :hide-back-button="wizardHideBackButton"
    :app-id="appConfig.id"
    :app-name="appConfig.name"
    :app-tagline="appConfig.tagline"
    :app-color="appConfig.primaryColor"
    :app-gradient-from="appConfig.gradientFrom"
    :app-gradient-to="appConfig.gradientTo"
    :app-logo="appConfig.logo"
    :app-logo-white="appConfig.logoWhite"
    :features="appFeatures"
    :is-authenticated="isAuthenticated"
    :user-name="fullName"
    :user-initials="initials"
    :site-url="siteUrl"
    @next="handleNext"
    @back="handleBack"
    @skip="handleSkip"
    @step-click="goToStep"
    @logout="handleLogout"
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
            @update:model-value="updateFormData({ firstName: String($event) })"
            @blur="validateField('firstName')"
          />
          <FormField
            v-model="formData.lastName"
            label="Last Name"
            placeholder="Doe"
            :error="errors.lastName"
            required
            @update:model-value="updateFormData({ lastName: String($event) })"
            @blur="validateField('lastName')"
          />
        </div>
        <FormField
          v-model="formData.email"
          type="email"
          label="Work Email Address"
          placeholder="john@company.com"
          :error="errors.email"
          required
          @update:model-value="updateFormData({ email: String($event) })"
          @blur="validateField('email')"
        />
        <PhoneInput
          v-model="formData.phone"
          label="Phone Number"
          placeholder="700 000 000"
          :error="errors.phone"
          required
          @update:model-value="updateFormData({ phone: String($event) })"
          @update:country="(code) => updateFormData({ country: code })"
          @blur="validateField('phone')"
        />
        <div>
          <FormField
            v-model="formData.password"
            type="password"
            label="Password"
            placeholder="Create a strong password"
            :error="errors.password"
            required
            @update:model-value="updateFormData({ password: String($event) })"
            @blur="validateField('password')"
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
          @update:model-value="updateFormData({ confirmPassword: String($event) })"
          @blur="validateField('confirmPassword')"
        />
        <DataConsentCheckbox
          v-model="formData.acceptedTerms"
          :error="errors.acceptedTerms"
          @update:model-value="updateFormData({ acceptedTerms: Boolean($event) })"
        />
      </div>
    </template>

    <!-- Organization Step -->
    <template v-else-if="currentStep?.id === 'organization'">
      <div class="space-y-4">
        <div>
          <FormField
            v-model="formData.organizationName"
            label="Company Name"
            placeholder="Acme Corporation"
            :error="errors.organizationName"
            required
            @update:model-value="updateFormData({ organizationName: String($event) })"
          />
          <p v-if="tenantSubdomain" class="mt-1 text-xs text-gray-500">
            Your subdomain: <span class="font-medium text-indigo-600">{{ tenantSubdomain }}.{{ appDomain }}</span>
          </p>
        </div>
        <FormSelect
          v-model="formData.industry"
          label="Industry"
          :options="industryOptions"
          @update:model-value="updateFormData({ industry: String($event) })"
        />
        <FormSelect
          v-model="formData.organizationSize"
          label="Number of Employees"
          :options="sizeOptions"
          @update:model-value="updateFormData({ organizationSize: String($event) })"
        />
        <div class="w-full">
          <label class="mb-1 block text-xs font-medium text-gray-600">Company Website</label>
          <div class="flex overflow-hidden rounded-lg border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <span class="flex shrink-0 items-center border-r border-gray-200 bg-gray-50 px-2.5 text-xs text-gray-500">https://</span>
            <input
              :value="(formData.website || '').replace(/^https?:\/\//, '')"
              type="text"
              placeholder="www.company.com"
              class="flex-1 bg-white px-3 py-2 text-sm placeholder:text-xs placeholder:text-gray-400 focus:outline-none"
              @input="handleWebsiteInput"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Plan Selection Step -->
    <template v-else-if="currentStep?.id === 'plan'">
      <div class="space-y-4">
        <div v-if="authError" class="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {{ authError }}
        </div>

        <!-- Trial period info -->
        <div v-if="TRIAL_DAYS" class="flex items-center gap-2.5 rounded-lg border border-indigo-200 bg-indigo-50/60 px-3.5 py-2.5">
          <svg class="size-4 shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs text-gray-700">
            <span class="font-semibold text-indigo-700">{{ TRIAL_DAYS }}-day free trial</span> — No credit card required. Full access to all features.
          </p>
        </div>

        <div
          class="cursor-pointer rounded-xl border-2 p-3.5 transition-all"
          :class="billingCycle === 'monthly' ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'"
          @click="billingCycle = 'monthly'"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
              :class="billingCycle === 'monthly' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'"
            >
              <svg v-if="billingCycle === 'monthly'" class="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-900">Monthly</span>
                <div class="flex items-baseline gap-1">
                  <span class="text-base font-bold text-gray-900">KES {{ MONTHLY_PRICE.toLocaleString() }}</span>
                  <span class="text-[11px] text-gray-500">/user/mo</span>
                </div>
              </div>
              <div class="mt-0.5 flex items-center justify-between">
                <span class="text-[11px] text-gray-500">Pay month-to-month, cancel anytime</span>
                <span class="text-[10px] text-gray-400">VAT incl.</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="cursor-pointer rounded-xl border-2 p-3.5 transition-all"
          :class="billingCycle === 'annual' ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'"
          @click="billingCycle = 'annual'"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
              :class="billingCycle === 'annual' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'"
            >
              <svg v-if="billingCycle === 'annual'" class="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-medium text-gray-900">Annual</span>
                  <span class="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700">Save {{ annualMonthlySaving }}%</span>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-base font-bold text-gray-900">KES {{ ANNUAL_PRICE.toLocaleString() }}</span>
                  <span class="text-[11px] text-gray-500">/user/yr</span>
                </div>
              </div>
              <div class="mt-0.5 flex items-center justify-between">
                <span class="text-[11px] text-gray-500">Billed annually, best value</span>
                <span class="text-[10px] text-gray-400">VAT incl.</span>
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-[11px] text-gray-400">All prices include 16% VAT. Billing starts after your {{ TRIAL_DAYS }}-day trial ends.</p>
      </div>
    </template>

    <!-- Setup / Provisioning Step -->
    <template v-else-if="currentStep?.id === 'setup'">
      <div class="space-y-6">
        <div v-if="provisioningError" class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {{ provisioningError }}
        </div>

        <!-- Completion state -->
        <div v-if="provisioningReady" class="py-4 text-center">
          <div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-indigo-100">
            <svg class="size-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Your platform is ready!</h2>
          <p class="mt-1.5 text-sm text-gray-500">
            Redirecting in <span class="font-semibold text-indigo-600">{{ redirectCountdown }}</span> seconds...
          </p>
          <a
            :href="redirectUrl"
            class="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl"
          >
            Go to your workspace
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>

        <!-- In-progress state -->
        <template v-else>
          <div class="space-y-6">
            <!-- Header -->
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Setting up your workspace...</h2>
              <p class="mt-0.5 text-xs text-gray-400">This may take a moment. Please don't close this page.</p>
            </div>

            <!-- Progress bar with percentage -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span v-if="provisioningStatus" class="text-xs text-gray-500">
                  {{ activeProvisioningStepName }}
                </span>
                <span v-else class="text-xs text-gray-400">Initializing...</span>
                <span class="text-sm font-semibold text-indigo-600">
                  {{ provisioningStatus ? Math.round((provisioningStatus.currentStepNumber / Math.max(provisioningStatus.totalSteps, 1)) * 100) : 0 }}%
                </span>
              </div>
              <div class="relative h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  v-if="provisioningStatus"
                  class="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 transition-all duration-700 ease-out"
                  :style="{ width: `${(provisioningStatus.currentStepNumber / Math.max(provisioningStatus.totalSteps, 1)) * 100}%` }"
                />
                <div
                  v-else
                  class="absolute inset-y-0 w-1/3 animate-progress-slide rounded-full bg-gradient-to-r from-indigo-300 to-indigo-400"
                />
              </div>
            </div>

            <!-- Skeleton loaders -->
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="size-8 animate-pulse rounded-lg bg-indigo-100" />
                <div class="flex-1 space-y-1.5">
                  <div class="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div class="h-2 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="size-8 animate-pulse rounded-lg bg-indigo-50" style="animation-delay: 150ms" />
                <div class="flex-1 space-y-1.5">
                  <div class="h-3 w-2/3 animate-pulse rounded bg-gray-200" style="animation-delay: 150ms" />
                  <div class="h-2 w-2/5 animate-pulse rounded bg-gray-100" style="animation-delay: 150ms" />
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="size-8 animate-pulse rounded-lg bg-indigo-50" style="animation-delay: 300ms" />
                <div class="flex-1 space-y-1.5">
                  <div class="h-3 w-4/5 animate-pulse rounded bg-gray-100" style="animation-delay: 300ms" />
                  <div class="h-2 w-1/3 animate-pulse rounded bg-gray-50" style="animation-delay: 300ms" />
                </div>
              </div>
            </div>

            <!-- Typing message -->
            <div class="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3">
              <p class="min-h-[40px] text-sm leading-relaxed text-gray-600">
                {{ displayedText }}<span class="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-500" />
              </p>
            </div>
          </div>
        </template>
      </div>
    </template>
  </OnboardingWizard>
</template>
