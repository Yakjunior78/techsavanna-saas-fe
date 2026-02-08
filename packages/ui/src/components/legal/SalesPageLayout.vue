<script setup lang="ts">
import { ref, computed } from 'vue'
import { SAVANNA_APPS } from '@techsavanna/shared'
import Button from '../base/Button.vue'
import FormField from '../forms/FormField.vue'

interface Props {
  appId?: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: 'pos'
})

const appConfig = computed(() => {
  if (props.appId && SAVANNA_APPS[props.appId]) {
    return SAVANNA_APPS[props.appId]
  }
  return SAVANNA_APPS.pos
})

const logoPath = computed(() => appConfig.value.logo)
const appColor = computed(() => appConfig.value.primaryColor || '#3B82F6')

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  companySize: '',
  industry: '',
  message: ''
})
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const companySizes = [
  { value: '', label: 'Select company size' },
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' }
]

const industries = [
  { value: '', label: 'Select industry' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'hospitality', label: 'Hospitality & Restaurant' },
  { value: 'healthcare', label: 'Healthcare & Pharmacy' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'logistics', label: 'Logistics & Transport' },
  { value: 'other', label: 'Other' }
]

function validate(): boolean {
  errors.value = {}
  if (!form.value.firstName) errors.value.firstName = 'First name is required'
  if (!form.value.lastName) errors.value.lastName = 'Last name is required'
  if (!form.value.email) errors.value.email = 'Email is required'
  if (!form.value.phone) errors.value.phone = 'Phone number is required'
  if (!form.value.companyName) errors.value.companyName = 'Company name is required'
  if (!form.value.companySize) errors.value.companySize = 'Please select company size'
  if (!form.value.industry) errors.value.industry = 'Please select an industry'
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true
}

const benefits = [
  {
    icon: 'calendar',
    title: 'Personalized Demo',
    description: 'See how our solution fits your specific needs'
  },
  {
    icon: 'puzzle',
    title: 'Custom Solutions',
    description: 'Get tailored recommendations for your business'
  },
  {
    icon: 'tag',
    title: 'Volume Pricing',
    description: 'Discuss enterprise pricing and discounts'
  },
  {
    icon: 'support',
    title: 'Dedicated Support',
    description: 'Learn about premium support options'
  }
]

const contactInfo = [
  {
    icon: 'email',
    label: 'Email',
    value: 'sales@techsavanna.co.ke',
    href: 'mailto:sales@techsavanna.co.ke'
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+254 700 000 000',
    href: 'tel:+254700000000'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <a href="/" class="flex cursor-pointer items-center transition-opacity hover:opacity-70">
          <img
            :src="logoPath"
            :alt="appConfig.name"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="relative overflow-hidden border-b border-gray-100">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
        <div class="absolute right-0 top-0 h-80 w-80 rounded-full opacity-50 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}20 0%, transparent 70%)` }"></div>
        <div class="absolute -left-20 bottom-0 h-56 w-56 rounded-full opacity-40 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}15 0%, transparent 70%)` }"></div>
      </div>

      <div class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Talk to Sales</h1>
        <p class="mt-2 max-w-2xl text-base text-gray-500">
          Ready to transform your business? Let's discuss how {{ appConfig.name }} can help you achieve your goals.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16">
        <!-- Left Column - Benefits & Contact -->
        <div class="mb-12 lg:mb-0">
          <h2 class="text-xl font-semibold text-gray-900">Why Talk to Our Sales Team?</h2>
          <p class="mt-2 text-sm text-gray-600">
            Our experts will help you find the perfect solution for your business needs.
          </p>

          <!-- Benefits -->
          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-start gap-4"
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg"
                :style="{ backgroundColor: `${appColor}15` }"
              >
                <!-- Calendar icon -->
                <svg v-if="benefit.icon === 'calendar'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <!-- Puzzle icon -->
                <svg v-else-if="benefit.icon === 'puzzle'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                </svg>
                <!-- Tag icon -->
                <svg v-else-if="benefit.icon === 'tag'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                <!-- Support icon -->
                <svg v-else-if="benefit.icon === 'support'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900">{{ benefit.title }}</h3>
                <p class="mt-0.5 text-sm text-gray-500">{{ benefit.description }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="mt-10 rounded-xl border border-gray-200 bg-gray-50/50 p-6">
            <h3 class="text-sm font-semibold text-gray-900">Prefer to reach out directly?</h3>
            <div class="mt-4 space-y-4">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="flex items-center gap-3"
              >
                <div
                  class="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  :style="{ backgroundColor: `${appColor}15` }"
                >
                  <!-- Email icon -->
                  <svg v-if="info.icon === 'email'" class="size-4" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <!-- Phone icon -->
                  <svg v-else-if="info.icon === 'phone'" class="size-4" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <a
                  :href="info.href"
                  class="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                >
                  {{ info.value }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Form -->
        <div class="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div v-if="isSubmitted" class="flex flex-col items-center py-12 text-center">
            <div
              class="mb-4 flex size-16 items-center justify-center rounded-full"
              :style="{ backgroundColor: `${appColor}15` }"
            >
              <svg class="size-8" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Thank You!</h3>
            <p class="mt-2 text-sm text-gray-600">
              We've received your request. A member of our sales team will contact you within 24 hours.
            </p>
            <a href="/" class="mt-6">
              <Button variant="outline">
                Back to Home
              </Button>
            </a>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <FormField
                v-model="form.firstName"
                label="First Name"
                placeholder="John"
                :error="errors.firstName"
                required
              />
              <FormField
                v-model="form.lastName"
                label="Last Name"
                placeholder="Doe"
                :error="errors.lastName"
                required
              />
            </div>

            <FormField
              v-model="form.email"
              type="email"
              label="Work Email"
              placeholder="john@company.com"
              :error="errors.email"
              required
            />

            <FormField
              v-model="form.phone"
              type="tel"
              label="Phone Number"
              placeholder="+254 700 000 000"
              :error="errors.phone"
              required
            />

            <FormField
              v-model="form.companyName"
              label="Company Name"
              placeholder="Your Company Ltd"
              :error="errors.companyName"
              required
            />

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                  Company Size <span class="text-red-400">*</span>
                </label>
                <select
                  v-model="form.companySize"
                  class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :class="errors.companySize ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
                >
                  <option v-for="size in companySizes" :key="size.value" :value="size.value">
                    {{ size.label }}
                  </option>
                </select>
                <p v-if="errors.companySize" class="mt-1.5 text-xs text-red-500">{{ errors.companySize }}</p>
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                  Industry <span class="text-red-400">*</span>
                </label>
                <select
                  v-model="form.industry"
                  class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :class="errors.industry ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
                >
                  <option v-for="ind in industries" :key="ind.value" :value="ind.value">
                    {{ ind.label }}
                  </option>
                </select>
                <p v-if="errors.industry" class="mt-1.5 text-xs text-red-500">{{ errors.industry }}</p>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                How can we help? <span class="text-gray-400">(Optional)</span>
              </label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Tell us about your requirements, timeline, or any specific questions..."
                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              ></textarea>
            </div>

            <Button type="submit" fullWidth :loading="isSubmitting">
              Request a Call
            </Button>

            <p class="text-center text-xs text-gray-500">
              By submitting this form, you agree to our
              <a href="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-8 border-t border-gray-200/80 bg-gray-50/50 py-10">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }}
            <a href="https://techsavanna.co.ke" target="_blank" rel="noopener noreferrer" class="font-medium hover:text-gray-700">TechSavanna</a>.
            All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <a href="/privacy-policy" class="transition-colors hover:text-gray-700">Privacy</a>
            <a href="/terms-of-service" class="transition-colors hover:text-gray-700">Terms</a>
            <a href="/cookie-policy" class="transition-colors hover:text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
