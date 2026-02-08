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
  name: '',
  email: '',
  subject: '',
  message: ''
})
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

function validate(): boolean {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Name is required'
  if (!form.value.email) errors.value.email = 'Email is required'
  if (!form.value.subject) errors.value.subject = 'Subject is required'
  if (!form.value.message) errors.value.message = 'Message is required'
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

const contactInfo = [
  {
    icon: 'email',
    label: 'Email',
    value: 'support@techsavanna.co.ke',
    href: 'mailto:support@techsavanna.co.ke'
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+254 700 000 000',
    href: 'tel:+254700000000'
  },
  {
    icon: 'location',
    label: 'Office',
    value: 'Nairobi, Kenya',
    href: null
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
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h1>
        <p class="mt-2 text-base text-gray-500">
          Have questions? We'd love to hear from you.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16">
        <!-- Contact Info -->
        <div class="mb-12 lg:mb-0">
          <h2 class="text-xl font-semibold text-gray-900">Get in Touch</h2>
          <p class="mt-2 text-sm text-gray-600">
            Our team is here to help. Reach out through any of the channels below or fill out the form.
          </p>

          <div class="mt-8 space-y-6">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="flex items-start gap-4"
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg"
                :style="{ backgroundColor: `${appColor}15` }"
              >
                <!-- Email icon -->
                <svg v-if="info.icon === 'email'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <!-- Phone icon -->
                <svg v-else-if="info.icon === 'phone'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <!-- Location icon -->
                <svg v-else-if="info.icon === 'location'" class="size-5" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-gray-400">{{ info.label }}</p>
                <a
                  v-if="info.href"
                  :href="info.href"
                  class="text-sm font-medium text-gray-900 hover:underline"
                >
                  {{ info.value }}
                </a>
                <p v-else class="text-sm font-medium text-gray-900">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="mt-10">
            <h3 class="text-sm font-semibold text-gray-900">Business Hours</h3>
            <div class="mt-3 space-y-1 text-sm text-gray-600">
              <p>Monday - Friday: 8:00 AM - 6:00 PM (EAT)</p>
              <p>Saturday: 9:00 AM - 1:00 PM (EAT)</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
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
            <h3 class="text-lg font-semibold text-gray-900">Message Sent!</h3>
            <p class="mt-2 text-sm text-gray-600">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button class="mt-6" variant="outline" @click="isSubmitted = false; form = { name: '', email: '', subject: '', message: '' }">
              Send Another Message
            </Button>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <FormField
              v-model="form.name"
              label="Your Name"
              placeholder="John Doe"
              :error="errors.name"
              required
            />
            <FormField
              v-model="form.email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              :error="errors.email"
              required
            />
            <FormField
              v-model="form.subject"
              label="Subject"
              placeholder="How can we help?"
              :error="errors.subject"
              required
            />
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Message <span class="text-red-400">*</span>
              </label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Tell us more about your inquiry..."
                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                :class="errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
              ></textarea>
              <p v-if="errors.message" class="mt-1.5 text-xs text-red-500">{{ errors.message }}</p>
            </div>
            <Button type="submit" fullWidth :loading="isSubmitting">
              Send Message
            </Button>
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
