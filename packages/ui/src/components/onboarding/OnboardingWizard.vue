<script setup lang="ts">
import { computed } from 'vue'
import type { OnboardingStep } from '@techsavanna/shared'
import Button from '../base/Button.vue'

interface Props {
  steps: OnboardingStep[]
  currentStepId: string
  completedSteps: string[]
  isLoading?: boolean
  canContinue?: boolean
  appId?: string
  appName?: string
  appTagline?: string
  appColor?: string
  appGradientFrom?: string
  appGradientTo?: string
  appLogo?: string
  appLogoWhite?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  canContinue: true,
  appId: 'pos',
  appName: 'Savanna',
  appTagline: 'Get started with your account',
  appColor: '#10B981',
  appGradientFrom: 'from-emerald-600',
  appGradientTo: 'to-teal-500',
  appLogo: '',
  appLogoWhite: ''
})

defineEmits<{
  next: []
  back: []
  skip: []
  stepClick: [stepId: string]
}>()

const currentStep = computed(() =>
  props.steps.find(s => s.id === props.currentStepId)
)

const currentStepIndex = computed(() =>
  props.steps.findIndex(s => s.id === props.currentStepId)
)

const isFirstStep = computed(() => currentStepIndex.value === 0)
const isLastStep = computed(() => currentStepIndex.value === props.steps.length - 1)

const progress = computed(() =>
  Math.round(((currentStepIndex.value + 1) / props.steps.length) * 100)
)

// Logo path with fallback
const logoPath = computed(() => {
  if (props.appLogo) return props.appLogo
  const logos: Record<string, string> = {
    pos: '/imgs/SavannapayPOS/logo/png/logo-no-background.png',
    people: '/imgs/WorkwiseHRM/logo/png/logo-no-background.png',
    elimu: '/imgs/ElimucoreLMS/logo/png/logo-no-background.png',
    erp: '/imgs/Savanna360ERP/logo/png/logo-no-background.png'
  }
  return logos[props.appId] || logos.pos
})
</script>

<template>
  <div class="relative flex h-screen flex-col overflow-hidden bg-gray-50">
    <!-- Background Pattern -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Grid Pattern -->
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      <!-- App-specific floating icons - POS -->
      <template v-if="appId === 'pos'">
        <!-- Credit Card -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
        <!-- Shopping Cart -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <!-- Receipt -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="14" y2="12"/>
        </svg>
        <!-- Barcode -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="2" y="4" width="2" height="16"/><rect x="6" y="4" width="1" height="16"/><rect x="9" y="4" width="2" height="16"/><rect x="13" y="4" width="1" height="16"/><rect x="16" y="4" width="3" height="16"/><rect x="21" y="4" width="1" height="16"/>
        </svg>
      </template>

      <!-- App-specific floating icons - People/HRM -->
      <template v-else-if="appId === 'people'">
        <!-- Users -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <!-- Calendar -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <!-- Clock -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <!-- ID Badge -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 18h8"/>
        </svg>
      </template>

      <!-- App-specific floating icons - Elimu/LMS -->
      <template v-else-if="appId === 'elimu'">
        <!-- Book -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <!-- Graduation Cap -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
        <!-- Pencil -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
        <!-- Calculator -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/>
        </svg>
      </template>

      <!-- App-specific floating icons - ERP -->
      <template v-else-if="appId === 'erp'">
        <!-- Bar Chart -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        <!-- Building -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/>
        </svg>
        <!-- Gears -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <!-- Pie Chart -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
        </svg>
      </template>

      <!-- Gradient Orbs -->
      <div
        class="absolute -right-32 -top-32 size-96 rounded-full opacity-20 blur-3xl"
        :style="{ background: `radial-gradient(circle, ${appColor}40 0%, transparent 70%)` }"
      />
      <div
        class="absolute -bottom-32 -left-32 size-96 rounded-full opacity-20 blur-3xl"
        :style="{ background: `radial-gradient(circle, ${appColor}30 0%, transparent 70%)` }"
      />
      <div
        class="absolute right-1/4 top-1/3 size-64 rounded-full opacity-10 blur-3xl"
        :style="{ background: `radial-gradient(circle, ${appColor}50 0%, transparent 70%)` }"
      />
    </div>

    <!-- Header -->
    <header class="relative z-10 shrink-0 border-b border-gray-200/60 bg-white/60 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" class="flex items-center">
          <img
            :src="logoPath"
            :alt="appName"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </a>
        <a
          href="/login"
          class="text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          Already have an account? <span class="font-medium" :style="{ color: appColor }">Log in</span>
        </a>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="h-0.5 shrink-0 bg-gray-200">
      <div
        class="h-full transition-all duration-500 ease-out"
        :style="{ width: `${progress}%`, backgroundColor: appColor }"
      />
    </div>

    <!-- Main Content (scrollable) -->
    <div class="relative z-10 min-h-0 flex-1 overflow-y-auto pb-20">
      <div class="mx-auto w-full max-w-md px-4 py-4 sm:py-6">
        <!-- Step Indicators -->
        <div class="mb-4 flex items-center justify-center gap-1">
          <button
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-all hover:bg-gray-200"
            :class="[
              currentStepIndex === index
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : completedSteps.includes(step.id)
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-100 text-gray-500'
            ]"
            @click="$emit('stepClick', step.id)"
          >
            <span
              v-if="completedSteps.includes(step.id) && currentStepIndex !== index"
              class="flex size-3 items-center justify-center rounded-full text-white"
              :style="{ backgroundColor: appColor }"
            >
              <svg class="size-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </span>
            <span v-else class="text-[9px]">{{ index + 1 }}</span>
            <span class="hidden sm:inline">{{ step.title.split(' ').slice(0, 3).join(' ') }}</span>
          </button>
        </div>

        <!-- Card Container -->
        <div class="rounded-xl border border-gray-200/60 bg-white/70 p-4 shadow-lg shadow-gray-200/40 backdrop-blur-md sm:p-6">
          <!-- Step Header -->
          <div class="-mx-4 -mt-1 mb-4 border-b border-gray-200/60 px-4 pb-3 sm:-mx-6 sm:-mt-2 sm:px-6">
            <h1 class="text-base font-semibold leading-tight text-gray-900">
              {{ currentStep?.title }}
            </h1>
            <p class="text-xs text-gray-500">
              {{ currentStep?.description }}
            </p>
          </div>

          <!-- Step Content -->
          <div>
            <slot :step="currentStep" />
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Footer Navigation -->
    <footer class="relative z-10 shrink-0 border-t border-gray-200/60 bg-white/60 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <div>
          <Button
            v-if="!isFirstStep"
            variant="ghost"
            size="sm"
            @click="$emit('back')"
          >
            <svg class="mr-1 size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </Button>
        </div>

        <div class="flex items-center gap-2">
          <Button
            v-if="currentStep && !currentStep.required"
            variant="ghost"
            size="sm"
            @click="$emit('skip')"
          >
            Skip
          </Button>
          <Button
            size="sm"
            :loading="isLoading"
            :disabled="!canContinue"
            @click="$emit('next')"
          >
            {{ isLastStep ? 'Complete Setup' : 'Continue' }}
            <svg v-if="!isLastStep" class="ml-1 size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>
