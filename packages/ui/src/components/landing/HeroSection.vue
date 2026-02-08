<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Button from '../base/Button.vue'
import VideoModal from '../overlays/VideoModal.vue'

interface Props {
  title: string
  subtitle: string
  pill?: string
  ctaText?: string
  secondaryCtaText?: string
  gradientFrom?: string
  gradientTo?: string
  showPreview?: boolean
  previewType?: 'pos' | 'hrm' | 'lms' | 'erp'
  videoUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  pill: '',
  ctaText: 'Get Started Free',
  secondaryCtaText: 'Watch Demo',
  gradientFrom: 'from-blue-600',
  gradientTo: 'to-indigo-700',
  showPreview: true,
  previewType: 'pos',
  videoUrl: ''
})

const emit = defineEmits<{
  ctaClick: []
  secondaryCtaClick: []
}>()

// Video modal state
const showVideoModal = ref(false)

function handleSecondaryCtaClick() {
  if (props.videoUrl) {
    showVideoModal.value = true
  } else {
    emit('secondaryCtaClick')
  }
}

const isVisible = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left - rect.width / 2) / 50
  mouseY.value = (e.clientY - rect.top - rect.height / 2) / 50
}

const floatingStyle = computed(() => ({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px)`
}))

const previewDomain = computed(() => {
  const domains: Record<string, string> = {
    pos: 'savannapaypos.com',
    hrm: 'workwisehrm.com',
    lms: 'elimucorelms.com',
    erp: 'savanna360erp.com'
  }
  return domains[props.previewType] || 'techsavanna.com'
})

const trustBadges = [
  { icon: 'check', text: 'No credit card required' },
  { icon: 'check', text: '14-day free trial' },
  { icon: 'check', text: 'Cancel anytime' }
]
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br py-16 lg:py-24"
    :class="[gradientFrom, gradientTo]"
    style="background-size: 200% 200%; animation: gradientShift 8s ease infinite"
    @mousemove="handleMouseMove"
  >
    <!-- Mesh Gradient Overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.3),transparent)]"></div>

    <!-- Right Side Fade Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/15"></div>

    <!-- Animated Background Orbs -->
    <div class="absolute -left-40 -top-40 size-80 animate-float rounded-full bg-white/10 blur-3xl"></div>
    <div class="absolute -bottom-40 -right-40 size-96 animate-float rounded-full bg-white/10 blur-3xl" style="animation-delay: -3s"></div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
      </svg>
    </div>

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Text Content -->
        <div class="text-center lg:text-left">
          <!-- Pill Badge -->
          <div
            v-if="pill"
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-700"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            <span class="size-1.5 animate-pulse rounded-full bg-white"></span>
            {{ pill }}
          </div>

          <!-- Title with blur-in effect -->
          <h1
            class="text-2xl font-bold tracking-tight text-white transition-all duration-700 sm:text-3xl lg:text-4xl"
            :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
          >
            {{ title }}
          </h1>

          <!-- Subtitle with delayed blur-in -->
          <p
            class="mt-6 text-base leading-relaxed text-white/85 transition-all delay-150 duration-700 sm:text-lg"
            :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
          >
            {{ subtitle }}
          </p>

          <!-- CTA Buttons with delayed entrance -->
          <div
            class="mt-10 flex flex-col items-center gap-4 transition-all delay-300 duration-700 sm:flex-row sm:gap-4 lg:justify-start"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <Button
              size="lg"
              variant="secondary"
              class="group !inline-flex !flex-row !flex-nowrap !items-center !justify-center !gap-3 !whitespace-nowrap !rounded-full !bg-white !px-10 !py-4 !text-base !font-semibold !text-gray-900 !shadow-lg hover:!bg-gray-50 hover:!shadow-xl"
              @click="$emit('ctaClick')"
            >
              <span class="shrink-0">{{ ctaText }}</span>
              <svg class="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Button>
            <Button
              v-if="secondaryCtaText"
              size="lg"
              variant="outline"
              class="group !inline-flex !flex-row !flex-nowrap !items-center !justify-center !gap-3 !whitespace-nowrap !rounded-full !border-2 !border-white/40 !px-10 !py-4 !text-base !font-semibold !text-white hover:!border-white/60 hover:!bg-white/10"
              @click="handleSecondaryCtaClick"
            >
              <svg class="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
              <span class="shrink-0">{{ secondaryCtaText }}</span>
            </Button>
          </div>

          <!-- Trust Badges with staggered entrance -->
          <div
            class="mt-10 flex flex-wrap items-center justify-center gap-6 transition-all delay-500 duration-700 lg:justify-start"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <div
              v-for="(badge, index) in trustBadges"
              :key="badge.text"
              class="flex items-center gap-2 text-white/80 transition-all duration-500"
              :style="{ transitionDelay: `${600 + index * 100}ms` }"
              :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            >
              <svg class="size-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium">{{ badge.text }}</span>
            </div>
          </div>
        </div>

        <!-- Dashboard Preview -->
        <div
          v-if="showPreview"
          class="relative flex justify-center transition-all delay-200 duration-700"
          :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-sm'"
        >
          <!-- Decorative Bubbles Background -->
          <div class="absolute inset-0 overflow-visible">
            <div class="absolute -left-8 -top-8 size-24 animate-float rounded-full bg-white/15 blur-xl"></div>
            <div class="absolute -right-6 top-12 size-20 animate-float rounded-full bg-white/20 blur-lg" style="animation-delay: -1s"></div>
            <div class="absolute -bottom-10 left-8 size-28 animate-float rounded-full bg-white/10 blur-xl" style="animation-delay: -2s"></div>
            <div class="absolute -right-10 bottom-4 size-16 animate-float rounded-full bg-white/25 blur-md" style="animation-delay: -3s"></div>
            <div class="absolute left-1/2 top-1/3 size-12 animate-float rounded-full bg-white/15 blur-lg" style="animation-delay: -4s"></div>
          </div>

          <!-- POS: Dashboard + Mobile Phone Layout -->
          <div v-if="previewType === 'pos'" class="relative">
            <!-- Dashboard Preview -->
            <div class="relative w-full max-w-2xl animate-bounce-gentle">
              <!-- Glow Effect -->
              <div class="absolute -inset-4 rounded-xl bg-white/20 blur-2xl"></div>

              <!-- Browser Window with Glassmorphism -->
              <div class="relative overflow-hidden rounded-xl bg-white/90 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
                <!-- Browser Chrome -->
                <div class="flex items-center gap-2 border-b border-gray-200/50 bg-gray-100/80 px-3 py-2 backdrop-blur-sm">
                  <div class="size-2.5 rounded-full bg-red-400 transition-transform hover:scale-110"></div>
                  <div class="size-2.5 rounded-full bg-yellow-400 transition-transform hover:scale-110"></div>
                  <div class="size-2.5 rounded-full bg-green-400 transition-transform hover:scale-110"></div>
                  <div class="ml-3 flex-1 rounded-md bg-white/80 px-2.5 py-1 text-[10px] text-gray-500 shadow-inner">
                    {{ previewDomain }}
                  </div>
                </div>

                <!-- Dashboard Layout with Sidebar -->
                <div class="flex">
                  <!-- Collapsed Sidebar - Modern Solid Icons -->
                  <div class="w-10 shrink-0 border-r border-gray-200/50 bg-white/80 py-2">
                    <div class="flex flex-col items-center space-y-1">
                    <!-- Home - Active -->
                    <div class="flex size-6 items-center justify-center rounded-lg bg-gray-900 text-white">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                      </svg>
                    </div>
                    <!-- Shopping Cart -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                      </svg>
                    </div>
                    <!-- Inventory/Box -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"/>
                      </svg>
                    </div>
                    <!-- Users/Customers -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <!-- Chart -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                      </svg>
                    </div>
                    <!-- Receipt/Invoice -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <!-- Wallet/Cash -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                        <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <!-- Settings Cog -->
                    <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>

                  <!-- Dashboard Content -->
                  <div class="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-3 pb-4">
                    <slot name="preview">
                  <!-- Modern Dashboard Preview -->
                  <div class="space-y-3">
                    <!-- Header Row -->
                    <div class="flex items-center justify-between" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '300ms' }">
                      <div>
                        <p class="text-xs font-medium text-gray-800">Overview</p>
                        <p class="text-[10px] text-gray-400">Last 30 days</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[9px] text-gray-500 shadow-sm">
                          <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          Feb 2025
                        </div>
                      </div>
                    </div>

                    <!-- Stats Grid - 3 columns -->
                    <div class="grid grid-cols-3 gap-2" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '400ms' }">
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'pos' ? 'Revenue' : previewType === 'hrm' ? 'Employees' : previewType === 'lms' ? 'Students' : 'Revenue' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'pos' ? '45.2K' : previewType === 'hrm' ? '248' : previewType === 'lms' ? '1,250' : '8.2M' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-emerald-600">+12.5%</span>
                          <svg class="size-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'pos' ? 'Orders' : previewType === 'hrm' ? 'Active' : previewType === 'lms' ? 'Classes' : 'Orders' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'pos' ? '156' : previewType === 'hrm' ? '236' : previewType === 'lms' ? '48' : '324' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-emerald-600">+8.2%</span>
                          <svg class="size-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'pos' ? 'Customers' : previewType === 'hrm' ? 'On Leave' : previewType === 'lms' ? 'Teachers' : 'Inventory' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'pos' ? '892' : previewType === 'hrm' ? '12' : previewType === 'lms' ? '64' : '2.3K' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-gray-500">+2.1%</span>
                        </div>
                      </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="grid grid-cols-5 gap-2">
                      <!-- Area Chart -->
                      <div class="col-span-3 rounded-lg bg-white p-3 shadow-sm" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '500ms' }">
                        <div class="mb-3 flex items-center justify-between">
                          <p class="text-[10px] font-medium text-gray-700">Performance</p>
                          <div class="flex gap-1">
                            <span class="rounded bg-gray-900 px-1.5 py-0.5 text-[8px] text-white">Week</span>
                            <span class="rounded bg-gray-100 px-1.5 py-0.5 text-[8px] text-gray-500">Month</span>
                          </div>
                        </div>
                        <!-- SVG Area Chart -->
                        <div class="relative h-16">
                          <svg class="size-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                            <!-- Grid lines -->
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#f3f4f6" stroke-width="1"/>
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#f3f4f6" stroke-width="1"/>
                            <!-- Area fill -->
                            <path d="M0,50 L28,42 L57,35 L85,28 L114,32 L142,18 L171,12 L200,8 L200,60 L0,60 Z" fill="url(#gradient)" opacity="0.3"/>
                            <!-- Line -->
                            <path d="M0,50 L28,42 L57,35 L85,28 L114,32 L142,18 L171,12 L200,8" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <!-- Dots -->
                            <circle cx="200" cy="8" r="3" fill="#111827"/>
                            <circle cx="171" cy="12" r="2" fill="#111827"/>
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#111827;stop-opacity:0.2"/>
                                <stop offset="100%" style="stop-color:#111827;stop-opacity:0"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <!-- Quick Stats -->
                      <div class="col-span-2 space-y-2" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '550ms' }">
                        <div class="rounded-lg bg-gray-900 p-3 text-white shadow-sm">
                          <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">Today</p>
                          <p class="mt-0.5 text-base font-bold">
                            {{ previewType === 'pos' ? 'KES 12.4K' : previewType === 'hrm' ? '3 new' : previewType === 'lms' ? '98%' : 'KES 1.2M' }}
                          </p>
                          <p class="text-[9px] text-gray-400">
                            {{ previewType === 'pos' ? 'in sales' : previewType === 'hrm' ? 'hires' : previewType === 'lms' ? 'attendance' : 'processed' }}
                          </p>
                        </div>
                        <div class="rounded-lg bg-white p-3 shadow-sm">
                          <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">Pending</p>
                          <p class="mt-0.5 text-base font-bold text-gray-900">
                            {{ previewType === 'pos' ? '8' : previewType === 'hrm' ? '5' : previewType === 'lms' ? '12' : '18' }}
                          </p>
                          <p class="text-[9px] text-gray-400">
                            {{ previewType === 'pos' ? 'orders' : previewType === 'hrm' ? 'approvals' : previewType === 'lms' ? 'payments' : 'invoices' }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Recent Table -->
                    <div class="rounded-lg bg-white p-3 shadow-sm" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '600ms' }">
                      <div class="mb-2 flex items-center justify-between">
                        <p class="text-[10px] font-medium text-gray-700">Recent Activity</p>
                        <span class="text-[9px] text-gray-400">View all</span>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center gap-3">
                          <div class="flex size-6 items-center justify-center rounded-full bg-gray-100">
                            <div class="size-2 rounded-full bg-gray-900"></div>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="truncate text-[10px] font-medium text-gray-800">
                              {{ previewType === 'pos' ? 'Sale #1024 completed' : previewType === 'hrm' ? 'John D. leave approved' : previewType === 'lms' ? 'Fee received - Grade 8' : 'Invoice #INV-0892' }}
                            </p>
                            <p class="text-[9px] text-gray-400">2 minutes ago</p>
                          </div>
                          <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-medium text-gray-600">
                            {{ previewType === 'pos' ? 'KES 2,450' : previewType === 'hrm' ? '5 days' : previewType === 'lms' ? 'KES 45K' : 'KES 125K' }}
                          </span>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="flex size-6 items-center justify-center rounded-full bg-gray-100">
                            <div class="size-2 rounded-full bg-gray-400"></div>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="truncate text-[10px] font-medium text-gray-800">
                              {{ previewType === 'pos' ? 'Inventory restocked' : previewType === 'hrm' ? 'Payroll processed' : previewType === 'lms' ? 'Exam results published' : 'Stock updated' }}
                            </p>
                            <p class="text-[9px] text-gray-400">15 minutes ago</p>
                          </div>
                          <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-medium text-gray-600">
                            {{ previewType === 'pos' ? '+50 items' : previewType === 'hrm' ? '248 staff' : previewType === 'lms' ? 'Grade 7' : '+120 units' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                    </slot>
                  </div>
                </div>
              </div>
            </div>

            <!-- iPhone Mockup for Mobile POS - Overlaid bottom right -->
            <div class="absolute -bottom-8 -right-2 z-10 hidden animate-bounce-gentle md:block" style="animation-delay: -1.5s">
              <!-- iPhone Frame -->
              <div class="relative h-[320px] w-[160px]">
                <!-- Phone Glow -->
                <div class="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/30 to-teal-400/30 blur-xl"></div>

                <!-- Phone Body -->
                <div class="relative h-full overflow-hidden rounded-[1.75rem] bg-gray-900 p-[3px] shadow-2xl ring-1 ring-white/40">
                  <!-- Inner Screen Bezel -->
                  <div class="relative h-full overflow-hidden rounded-[1.5rem] bg-white">
                    <!-- Dynamic Island -->
                    <div class="absolute left-1/2 top-2 z-10 flex h-5 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-gray-900">
                      <div class="size-1.5 rounded-full bg-gray-700"></div>
                    </div>

                    <!-- Status Bar -->
                    <div class="flex items-center justify-between bg-gradient-to-b from-gray-50 to-white px-3 pb-1 pt-8 text-[8px] font-semibold text-gray-900">
                      <span>9:41</span>
                      <div class="flex items-center gap-0.5">
                        <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>
                        <div class="flex h-3 w-6 items-center rounded-sm border border-gray-400 p-px">
                          <div class="h-full w-4/5 rounded-sm bg-emerald-500"></div>
                        </div>
                      </div>
                    </div>

                    <!-- App Header with Search -->
                    <div class="bg-white px-2.5 pb-2">
                      <div class="mb-1.5 flex items-center justify-between">
                        <p class="text-[10px] font-bold text-gray-900">Quick Sale</p>
                        <div class="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/></svg>
                        </div>
                      </div>
                      <!-- Search Bar -->
                      <div class="flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1">
                        <svg class="size-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        <span class="text-[7px] text-gray-400">Search products...</span>
                      </div>
                    </div>

                    <!-- Product Grid -->
                    <div class="grid grid-cols-2 gap-1.5 bg-gray-50 p-2">
                      <!-- Product 1 -->
                      <div class="rounded-lg bg-white p-1.5 shadow-sm">
                        <div class="mb-1 flex size-8 items-center justify-center rounded-md bg-red-50">
                          <span class="text-sm">🥤</span>
                        </div>
                        <p class="truncate text-[7px] font-medium text-gray-800">Coca-Cola</p>
                        <p class="text-[8px] font-bold text-emerald-600">75</p>
                      </div>
                      <!-- Product 2 -->
                      <div class="rounded-lg bg-white p-1.5 shadow-sm">
                        <div class="mb-1 flex size-8 items-center justify-center rounded-md bg-amber-50">
                          <span class="text-sm">🍞</span>
                        </div>
                        <p class="truncate text-[7px] font-medium text-gray-800">Bread</p>
                        <p class="text-[8px] font-bold text-emerald-600">85</p>
                      </div>
                      <!-- Product 3 -->
                      <div class="rounded-lg bg-white p-1.5 shadow-sm ring-2 ring-emerald-500">
                        <div class="mb-1 flex size-8 items-center justify-center rounded-md bg-blue-50">
                          <span class="text-sm">🥛</span>
                        </div>
                        <p class="truncate text-[7px] font-medium text-gray-800">Fresh Milk</p>
                        <p class="text-[8px] font-bold text-emerald-600">180</p>
                      </div>
                      <!-- Product 4 -->
                      <div class="rounded-lg bg-white p-1.5 shadow-sm">
                        <div class="mb-1 flex size-8 items-center justify-center rounded-md bg-yellow-50">
                          <span class="text-sm">🧈</span>
                        </div>
                        <p class="truncate text-[7px] font-medium text-gray-800">Butter</p>
                        <p class="text-[8px] font-bold text-emerald-600">250</p>
                      </div>
                    </div>

                    <!-- Cart Summary & Checkout -->
                    <div class="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 px-2.5 py-2 backdrop-blur-sm">
                      <div class="mb-1.5 flex items-center justify-between">
                        <div class="flex items-center gap-1">
                          <span class="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-[7px] font-bold text-white">3</span>
                          <p class="text-[8px] text-gray-500">items</p>
                        </div>
                        <p class="text-[10px] font-bold text-gray-900">KES 590</p>
                      </div>
                      <button class="flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-500 py-2 text-[9px] font-semibold text-white shadow-md">
                        <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                        Pay Now
                      </button>
                    </div>

                    <!-- Home Indicator -->
                    <div class="absolute bottom-0.5 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gray-900/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Non-POS: Dashboard with optional overlay -->
          <div v-else class="relative">
            <!-- Dashboard Preview -->
            <div class="relative w-full max-w-2xl animate-bounce-gentle">
              <!-- Glow Effect -->
              <div class="absolute -inset-4 rounded-xl bg-white/20 blur-2xl"></div>

              <!-- Browser Window with Glassmorphism -->
              <div class="relative overflow-hidden rounded-xl bg-white/90 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
                <!-- Browser Chrome -->
                <div class="flex items-center gap-2 border-b border-gray-200/50 bg-gray-100/80 px-3 py-2 backdrop-blur-sm">
                  <div class="size-2.5 rounded-full bg-red-400 transition-transform hover:scale-110"></div>
                  <div class="size-2.5 rounded-full bg-yellow-400 transition-transform hover:scale-110"></div>
                  <div class="size-2.5 rounded-full bg-green-400 transition-transform hover:scale-110"></div>
                  <div class="ml-3 flex-1 rounded-md bg-white/80 px-2.5 py-1 text-[10px] text-gray-500 shadow-inner">
                    {{ previewDomain }}
                  </div>
                </div>

                <!-- Dashboard Layout with Sidebar -->
                <div class="flex">
                  <!-- Collapsed Sidebar - Modern Solid Icons -->
                  <div class="w-10 shrink-0 border-r border-gray-200/50 bg-white/80 py-2">
                    <div class="flex flex-col items-center space-y-1">
                      <!-- Home - Active -->
                      <div class="flex size-6 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                      </div>
                      <!-- Users/Team -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                      </div>
                      <!-- Calendar -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <!-- Folder/Documents -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                        </svg>
                      </div>
                      <!-- Chart -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                        </svg>
                      </div>
                      <!-- Wallet/Finance -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <!-- Bell/Notifications -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                        </svg>
                      </div>
                      <!-- Settings Cog -->
                      <div class="flex size-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                <!-- Dashboard Content -->
                <div class="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-3 pb-4">
                  <!-- Modern Dashboard Preview (for non-POS) -->
                  <div class="space-y-3">
                    <!-- Header Row -->
                    <div class="flex items-center justify-between" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '300ms' }">
                      <div>
                        <p class="text-xs font-medium text-gray-800">Overview</p>
                        <p class="text-[10px] text-gray-400">Last 30 days</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[9px] text-gray-500 shadow-sm">
                          <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          Feb 2025
                        </div>
                      </div>
                    </div>

                    <!-- Stats Grid - 3 columns -->
                    <div class="grid grid-cols-3 gap-2" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '400ms' }">
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'hrm' ? 'Employees' : previewType === 'lms' ? 'Students' : 'Revenue' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'hrm' ? '248' : previewType === 'lms' ? '1,250' : '8.2M' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-emerald-600">+12.5%</span>
                          <svg class="size-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'hrm' ? 'Active' : previewType === 'lms' ? 'Classes' : 'Orders' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'hrm' ? '236' : previewType === 'lms' ? '48' : '324' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-emerald-600">+8.2%</span>
                          <svg class="size-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div class="rounded-lg bg-white p-3 shadow-sm">
                        <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          {{ previewType === 'hrm' ? 'On Leave' : previewType === 'lms' ? 'Teachers' : 'Inventory' }}
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                          {{ previewType === 'hrm' ? '12' : previewType === 'lms' ? '64' : '2.3K' }}
                        </p>
                        <div class="mt-1 flex items-center gap-1">
                          <span class="text-[9px] font-medium text-gray-500">+2.1%</span>
                        </div>
                      </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="grid grid-cols-5 gap-2">
                      <!-- Area Chart -->
                      <div class="col-span-3 rounded-lg bg-white p-3 shadow-sm" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '500ms' }">
                        <div class="mb-3 flex items-center justify-between">
                          <p class="text-[10px] font-medium text-gray-700">Performance</p>
                          <div class="flex gap-1">
                            <span class="rounded bg-gray-900 px-1.5 py-0.5 text-[8px] text-white">Week</span>
                            <span class="rounded bg-gray-100 px-1.5 py-0.5 text-[8px] text-gray-500">Month</span>
                          </div>
                        </div>
                        <!-- SVG Area Chart -->
                        <div class="relative h-16">
                          <svg class="size-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                            <!-- Grid lines -->
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#f3f4f6" stroke-width="1"/>
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#f3f4f6" stroke-width="1"/>
                            <!-- Area fill -->
                            <path d="M0,50 L28,42 L57,35 L85,28 L114,32 L142,18 L171,12 L200,8 L200,60 L0,60 Z" fill="url(#gradient-nonpos)" opacity="0.3"/>
                            <!-- Line -->
                            <path d="M0,50 L28,42 L57,35 L85,28 L114,32 L142,18 L171,12 L200,8" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <!-- Dots -->
                            <circle cx="200" cy="8" r="3" fill="#111827"/>
                            <circle cx="171" cy="12" r="2" fill="#111827"/>
                            <defs>
                              <linearGradient id="gradient-nonpos" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#111827;stop-opacity:0.2"/>
                                <stop offset="100%" style="stop-color:#111827;stop-opacity:0"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <!-- Quick Stats -->
                      <div class="col-span-2 space-y-2" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '550ms' }">
                        <div class="rounded-lg bg-gray-900 p-3 text-white shadow-sm">
                          <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">Today</p>
                          <p class="mt-0.5 text-base font-bold">
                            {{ previewType === 'hrm' ? '3 new' : previewType === 'lms' ? '98%' : 'KES 1.2M' }}
                          </p>
                          <p class="text-[9px] text-gray-400">
                            {{ previewType === 'hrm' ? 'hires' : previewType === 'lms' ? 'attendance' : 'processed' }}
                          </p>
                        </div>
                        <div class="rounded-lg bg-white p-3 shadow-sm">
                          <p class="text-[9px] font-medium uppercase tracking-wide text-gray-400">Pending</p>
                          <p class="mt-0.5 text-base font-bold text-gray-900">
                            {{ previewType === 'hrm' ? '5' : previewType === 'lms' ? '12' : '18' }}
                          </p>
                          <p class="text-[9px] text-gray-400">
                            {{ previewType === 'hrm' ? 'approvals' : previewType === 'lms' ? 'payments' : 'invoices' }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Recent Table -->
                    <div class="rounded-lg bg-white p-3 shadow-sm" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: '600ms' }">
                      <div class="mb-2 flex items-center justify-between">
                        <p class="text-[10px] font-medium text-gray-700">Recent Activity</p>
                        <span class="text-[9px] text-gray-400">View all</span>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center gap-3">
                          <div class="flex size-6 items-center justify-center rounded-full bg-gray-100">
                            <div class="size-2 rounded-full bg-gray-900"></div>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="truncate text-[10px] font-medium text-gray-800">
                              {{ previewType === 'hrm' ? 'John D. leave approved' : previewType === 'lms' ? 'Fee received - Grade 8' : 'Invoice #INV-0892' }}
                            </p>
                            <p class="text-[9px] text-gray-400">2 minutes ago</p>
                          </div>
                          <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-medium text-gray-600">
                            {{ previewType === 'hrm' ? '5 days' : previewType === 'lms' ? 'KES 45K' : 'KES 125K' }}
                          </span>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="flex size-6 items-center justify-center rounded-full bg-gray-100">
                            <div class="size-2 rounded-full bg-gray-400"></div>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="truncate text-[10px] font-medium text-gray-800">
                              {{ previewType === 'hrm' ? 'Payroll processed' : previewType === 'lms' ? 'Exam results published' : 'Stock updated' }}
                            </p>
                            <p class="text-[9px] text-gray-400">15 minutes ago</p>
                          </div>
                          <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-medium text-gray-600">
                            {{ previewType === 'hrm' ? '248 staff' : previewType === 'lms' ? 'Grade 7' : '+120 units' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <!-- Jobs Board Overlay for HRM - Positioned like POS phone -->
            <div v-if="previewType === 'hrm'" class="absolute -bottom-6 -right-2 z-10 hidden animate-bounce-gentle md:block" style="animation-delay: -1.5s">
              <div class="w-[200px] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10">
                <!-- Header -->
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2">
                  <div class="flex items-center gap-2">
                    <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                    </svg>
                    <p class="text-[10px] font-semibold text-white">Open Positions</p>
                    <span class="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold text-white">5</span>
                  </div>
                </div>
                <!-- Jobs List -->
                <div class="divide-y divide-gray-100 p-2">
                  <!-- Job 1 -->
                  <div class="flex items-center gap-2 py-1.5">
                    <div class="flex size-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="truncate text-[9px] font-medium text-gray-800">Senior Developer</p>
                      <p class="text-[8px] text-gray-400">Engineering</p>
                    </div>
                    <span class="rounded-full bg-green-100 px-1.5 py-0.5 text-[7px] font-medium text-green-700">12</span>
                  </div>
                  <!-- Job 2 -->
                  <div class="flex items-center gap-2 py-1.5">
                    <div class="flex size-6 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="truncate text-[9px] font-medium text-gray-800">Marketing Lead</p>
                      <p class="text-[8px] text-gray-400">Marketing</p>
                    </div>
                    <span class="rounded-full bg-green-100 px-1.5 py-0.5 text-[7px] font-medium text-green-700">8</span>
                  </div>
                  <!-- Job 3 -->
                  <div class="flex items-center gap-2 py-1.5">
                    <div class="flex size-6 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <svg class="size-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="truncate text-[9px] font-medium text-gray-800">HR Manager</p>
                      <p class="text-[8px] text-gray-400">Human Resources</p>
                    </div>
                    <span class="rounded-full bg-yellow-100 px-1.5 py-0.5 text-[7px] font-medium text-yellow-700">3</span>
                  </div>
                </div>
                <!-- Footer -->
                <div class="border-t border-gray-100 bg-gray-50 px-3 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[8px] text-gray-500">23 applicants today</span>
                    <span class="text-[8px] font-medium text-indigo-600">View all →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Notification with Parallax - POS -->
          <div
            v-if="previewType === 'pos'"
            class="absolute -right-2 -top-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="floatingStyle"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">New Sale!</p>
                <p class="text-[10px] text-gray-500">KES 2,500</p>
              </div>
            </div>
          </div>

          <!-- Floating Notification - HRM -->
          <div
            v-else-if="previewType === 'hrm'"
            class="absolute -right-2 -top-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="floatingStyle"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Leave Approved</p>
                <p class="text-[10px] text-gray-500">John K.</p>
              </div>
            </div>
          </div>

          <!-- Floating Notification - LMS -->
          <div
            v-else-if="previewType === 'lms'"
            class="absolute -right-2 -top-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="floatingStyle"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Fee Received</p>
                <p class="text-[10px] text-gray-500">KES 45,000</p>
              </div>
            </div>
          </div>

          <!-- Floating Notification - ERP -->
          <div
            v-else-if="previewType === 'erp'"
            class="absolute -right-2 -top-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="floatingStyle"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Invoice Paid</p>
                <p class="text-[10px] text-gray-500">KES 125,000</p>
              </div>
            </div>
          </div>

          <!-- Second floating element - POS -->
          <div
            v-if="previewType === 'pos'"
            class="absolute -bottom-1 -left-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
                <svg class="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Revenue</p>
                <p class="text-[10px] text-green-600">+24% today</p>
              </div>
            </div>
          </div>

          <!-- Second floating element - HRM -->
          <div
            v-else-if="previewType === 'hrm'"
            class="absolute -bottom-1 -left-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Payroll Due</p>
                <p class="text-[10px] text-amber-600">In 3 days</p>
              </div>
            </div>
          </div>

          <!-- Second floating element - LMS -->
          <div
            v-else-if="previewType === 'lms'"
            class="absolute -bottom-1 -left-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Attendance</p>
                <p class="text-[10px] text-green-600">98% today</p>
              </div>
            </div>
          </div>

          <!-- Second floating element - ERP -->
          <div
            v-else-if="previewType === 'erp'"
            class="absolute -bottom-1 -left-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300"
            :style="{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }"
          >
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500">
                <svg class="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900">Low Stock</p>
                <p class="text-[10px] text-rose-600">5 items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <VideoModal
      :open="showVideoModal"
      :video-url="videoUrl"
      title="Product Demo"
      @close="showVideoModal = false"
    />
  </section>
</template>

<style scoped>
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-gentle {
  animation: bounceGentle 3s ease-in-out infinite;
}
</style>
