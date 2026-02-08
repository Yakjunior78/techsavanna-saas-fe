<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export interface Feature {
  icon: string
  title: string
  description: string
  highlights?: string[]
  previewType?: 'dashboard' | 'chart' | 'list' | 'form' | 'cards' | 'calendar' | 'payments' | 'inventory' | 'users' | 'reports'
}

interface Props {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  initialVisible?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Everything You Need',
  subtitle: 'Powerful features to help you manage your business efficiently',
  columns: 2,
  initialVisible: 6
})

const sectionRef = ref<HTMLElement | null>(null)
const visibleItems = ref<Set<number>>(new Set())
const showAll = ref(false)
let observer: IntersectionObserver | null = null

const displayedFeatures = computed(() => {
  if (showAll.value || props.features.length <= props.initialVisible) {
    return props.features
  }
  return props.features.slice(0, props.initialVisible)
})

const hasMore = computed(() => props.features.length > props.initialVisible)

function toggleShowAll() {
  showAll.value = !showAll.value
  if (showAll.value) {
    nextTick(() => {
      const items = sectionRef.value?.querySelectorAll('[data-index]')
      items?.forEach(item => observer?.observe(item))
    })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0')
        if (entry.isIntersecting) {
          visibleItems.value.add(index)
        }
      })
    },
    { threshold: 0.1, rootMargin: '-30px' }
  )

  const items = sectionRef.value?.querySelectorAll('[data-index]')
  items?.forEach(item => observer?.observe(item))
})

onUnmounted(() => {
  observer?.disconnect()
})

const iconMap: Record<string, string> = {
  'bolt': 'M13 10V3L4 14h7v7l9-11h-7z',
  'chart-bar': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'device-mobile': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'device-phone-mobile': 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  'currency-dollar': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'shield-check': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  'clock': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  'cloud': 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  'cog': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'document-report': 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'globe': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  'academic-cap': 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l-9-5v12',
  'calculator': 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  'cube': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'shopping-cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'clipboard-list': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  'clipboard-document-list': 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
  'chart-pie': 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
  'calendar': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  'calendar-days': 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z',
  'user-circle': 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
}

function getIconPath(icon: string): string {
  return iconMap[icon] || iconMap['cog']
}

// Color accents for cards
const accentColors = ['blue', 'indigo', 'purple', 'sky', 'violet', 'cyan']

function getAccentClasses(index: number, type: 'bg' | 'text' | 'border' | 'light') {
  const accent = accentColors[index % accentColors.length]
  const classes: Record<string, Record<string, string>> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-200', light: 'bg-blue-50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-200', light: 'bg-indigo-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-200', light: 'bg-purple-50' },
    sky: { bg: 'bg-sky-500', text: 'text-sky-500', border: 'border-sky-200', light: 'bg-sky-50' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-200', light: 'bg-violet-50' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', border: 'border-cyan-200', light: 'bg-cyan-50' }
  }
  return classes[accent][type]
}
</script>

<template>
  <section ref="sectionRef" id="features" class="relative overflow-hidden bg-white py-16 lg:py-24">
    <!-- Background grid pattern -->
    <div class="absolute inset-0 opacity-[0.06]">
      <svg class="size-full">
        <defs>
          <pattern id="features-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0v40H0" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#features-grid)"/>
      </svg>
    </div>

    <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        data-index="-1"
        class="mx-auto mb-12 max-w-2xl text-center transition-all duration-700 lg:mb-16"
        :class="visibleItems.has(-1) || visibleItems.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <span class="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Features
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 text-base text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- Features Grid - 2 cards per row -->
      <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
        <div
          v-for="(feature, index) in displayedFeatures"
          :key="index"
          :data-index="index"
          class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-gray-200 hover:shadow-lg"
          :class="visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Preview Image Header -->
          <div class="relative h-44 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-5">
            <!-- Dashboard Preview for finance/analytics features -->
            <template v-if="feature.previewType === 'dashboard' || feature.icon === 'calculator' || feature.icon === 'chart-bar' || feature.icon === 'chart-pie'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Mini header -->
                <div class="mb-3 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="size-6 rounded" :class="getAccentClasses(index, 'light')">
                      <div class="flex size-full items-center justify-center">
                        <div class="size-2 rounded-sm" :class="getAccentClasses(index, 'bg')"></div>
                      </div>
                    </div>
                    <div class="h-2 w-16 rounded bg-gray-200"></div>
                  </div>
                  <div class="h-2 w-8 rounded" :class="getAccentClasses(index, 'bg').replace('500', '200')"></div>
                </div>
                <!-- Stats row -->
                <div class="mb-3 grid grid-cols-3 gap-2">
                  <div class="rounded-lg bg-gray-50 p-2">
                    <div class="mb-1 h-1.5 w-8 rounded bg-gray-200"></div>
                    <div class="h-3 w-10 rounded" :class="getAccentClasses(index, 'bg').replace('500', '300')"></div>
                  </div>
                  <div class="rounded-lg bg-gray-50 p-2">
                    <div class="mb-1 h-1.5 w-6 rounded bg-gray-200"></div>
                    <div class="h-3 w-8 rounded bg-gray-300"></div>
                  </div>
                  <div class="rounded-lg bg-gray-50 p-2">
                    <div class="mb-1 h-1.5 w-7 rounded bg-gray-200"></div>
                    <div class="h-3 w-9 rounded bg-green-300"></div>
                  </div>
                </div>
                <!-- Chart -->
                <div class="flex h-16 items-end justify-between gap-1.5 rounded-lg bg-gray-50 p-2">
                  <div
                    v-for="i in 7"
                    :key="i"
                    class="flex-1 rounded-t transition-all duration-500"
                    :class="getAccentClasses(index, 'bg')"
                    :style="{
                      height: visibleItems.has(index) ? `${30 + Math.random() * 60}%` : '0%',
                      transitionDelay: `${i * 60 + 200}ms`,
                      opacity: 0.6 + (i / 10)
                    }"
                  ></div>
                </div>
              </div>
            </template>

            <!-- List Preview for user/staff/inventory features -->
            <template v-else-if="feature.previewType === 'list' || feature.icon === 'users' || feature.icon === 'cube' || feature.icon === 'clipboard-list'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Header -->
                <div class="mb-3 flex items-center justify-between">
                  <div class="h-2 w-20 rounded bg-gray-300"></div>
                  <div class="h-5 w-14 rounded" :class="getAccentClasses(index, 'bg')"></div>
                </div>
                <!-- List items -->
                <div class="space-y-2">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="flex items-center gap-2 rounded-lg bg-gray-50 p-2 transition-all duration-300"
                    :style="{ transitionDelay: `${i * 80}ms` }"
                    :class="visibleItems.has(index) ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'"
                  >
                    <div class="size-8 rounded-full" :class="getAccentClasses(index, 'light')">
                      <div class="flex size-full items-center justify-center text-xs font-bold" :class="getAccentClasses(index, 'text')">
                        {{ ['JM', 'AK', 'SK', 'PM'][i-1] }}
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="mb-1 h-2 w-20 rounded bg-gray-200"></div>
                      <div class="h-1.5 w-14 rounded bg-gray-100"></div>
                    </div>
                    <div class="h-5 w-12 rounded-full text-[8px]" :class="[getAccentClasses(index, 'light'), getAccentClasses(index, 'text')]"></div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Form Preview for admission/procurement features -->
            <template v-else-if="feature.previewType === 'form' || feature.icon === 'clipboard-document-list' || feature.icon === 'shopping-cart'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Form header -->
                <div class="mb-3 flex items-center gap-2">
                  <div class="size-6 rounded" :class="getAccentClasses(index, 'bg')">
                    <svg class="size-full p-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div class="h-2.5 w-24 rounded bg-gray-300"></div>
                </div>
                <!-- Form fields -->
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <div class="flex-1">
                      <div class="mb-1 h-1.5 w-10 rounded bg-gray-200"></div>
                      <div class="h-6 w-full rounded border border-gray-200 bg-gray-50"></div>
                    </div>
                    <div class="flex-1">
                      <div class="mb-1 h-1.5 w-8 rounded bg-gray-200"></div>
                      <div class="h-6 w-full rounded border border-gray-200 bg-gray-50"></div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 h-1.5 w-12 rounded bg-gray-200"></div>
                    <div class="h-6 w-full rounded border border-gray-200 bg-gray-50"></div>
                  </div>
                  <div>
                    <div class="mb-1 h-1.5 w-14 rounded bg-gray-200"></div>
                    <div class="h-12 w-full rounded border border-gray-200 bg-gray-50"></div>
                  </div>
                </div>
                <!-- Submit button -->
                <div
                  class="mt-3 h-7 w-full rounded transition-all duration-500"
                  :class="[getAccentClasses(index, 'bg'), visibleItems.has(index) ? 'opacity-100' : 'opacity-50']"
                ></div>
              </div>
            </template>

            <!-- Calendar Preview for scheduling features -->
            <template v-else-if="feature.previewType === 'calendar' || feature.icon === 'calendar' || feature.icon === 'calendar-days' || feature.icon === 'clock'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Calendar header -->
                <div class="mb-2 flex items-center justify-between">
                  <div class="h-2 w-16 rounded bg-gray-300"></div>
                  <div class="flex gap-1">
                    <div class="size-4 rounded bg-gray-100"></div>
                    <div class="size-4 rounded bg-gray-100"></div>
                  </div>
                </div>
                <!-- Calendar days header -->
                <div class="mb-1 grid grid-cols-7 gap-1">
                  <div v-for="d in ['M','T','W','T','F','S','S']" :key="d" class="text-center text-[7px] text-gray-400">{{ d }}</div>
                </div>
                <!-- Calendar grid -->
                <div class="grid grid-cols-7 gap-1">
                  <div
                    v-for="i in 28"
                    :key="i"
                    class="flex size-5 items-center justify-center rounded text-[8px] transition-all duration-200"
                    :class="[
                      i === 15 ? getAccentClasses(index, 'bg') + ' text-white' : 'text-gray-500',
                      [8, 12, 19, 23].includes(i) ? getAccentClasses(index, 'light') : ''
                    ]"
                  >
                    {{ i }}
                  </div>
                </div>
              </div>
            </template>

            <!-- Chart/Analytics Preview -->
            <template v-else-if="feature.previewType === 'chart'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Header -->
                <div class="mb-3 flex items-center justify-between">
                  <div class="h-2 w-20 rounded bg-gray-300"></div>
                  <div class="flex gap-2">
                    <div class="flex items-center gap-1">
                      <div class="size-2 rounded-full" :class="getAccentClasses(index, 'bg')"></div>
                      <div class="h-1.5 w-8 rounded bg-gray-200"></div>
                    </div>
                    <div class="flex items-center gap-1">
                      <div class="size-2 rounded-full bg-gray-300"></div>
                      <div class="h-1.5 w-8 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
                <!-- Pie Chart -->
                <div class="flex items-center justify-center">
                  <svg class="size-24 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" stroke-width="4"></circle>
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      :class="getAccentClasses(index, 'text')"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-dasharray="65, 100"
                      class="transition-all duration-1000"
                      :style="{ strokeDasharray: visibleItems.has(index) ? '65, 100' : '0, 100' }"
                    ></circle>
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      class="text-amber-400 transition-all duration-1000 delay-300"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-dasharray="20, 100"
                      stroke-dashoffset="-65"
                      :style="{ strokeDasharray: visibleItems.has(index) ? '20, 100' : '0, 100' }"
                    ></circle>
                  </svg>
                </div>
                <!-- Legend -->
                <div class="mt-2 flex justify-center gap-4">
                  <div class="flex items-center gap-1">
                    <div class="size-2.5 rounded-full" :class="getAccentClasses(index, 'bg')"></div>
                    <span class="text-[9px] text-gray-500">65%</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="size-2.5 rounded-full bg-amber-400"></div>
                    <span class="text-[9px] text-gray-500">20%</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="size-2.5 rounded-full bg-gray-200"></div>
                    <span class="text-[9px] text-gray-500">15%</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Cards Grid Preview for CRM/multi-item features -->
            <template v-else-if="feature.previewType === 'cards'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Header -->
                <div class="mb-3 flex items-center justify-between">
                  <div class="h-2 w-16 rounded bg-gray-300"></div>
                  <div class="h-5 w-5 rounded" :class="getAccentClasses(index, 'bg')"></div>
                </div>
                <!-- Cards grid -->
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="rounded-lg border border-gray-100 bg-gray-50 p-2 transition-all duration-300"
                    :style="{ transitionDelay: `${i * 80}ms` }"
                    :class="visibleItems.has(index) ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
                  >
                    <div class="mb-2 flex items-center justify-between">
                      <div class="size-6 rounded-full" :class="getAccentClasses(index, 'light')"></div>
                      <div class="size-3 rounded-full" :class="i === 1 ? 'bg-green-400' : i === 2 ? 'bg-amber-400' : 'bg-gray-200'"></div>
                    </div>
                    <div class="h-1.5 w-full rounded bg-gray-200"></div>
                    <div class="mt-1 h-1 w-3/4 rounded bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Payments Preview -->
            <template v-else-if="feature.previewType === 'payments' || feature.icon === 'currency-dollar'">
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <!-- Payment header -->
                <div class="mb-3 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex size-8 items-center justify-center rounded-lg" :class="getAccentClasses(index, 'bg')">
                      <svg class="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    </div>
                    <div>
                      <div class="h-2 w-16 rounded bg-gray-300"></div>
                      <div class="mt-1 h-1.5 w-10 rounded bg-gray-200"></div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="h-3 w-16 rounded" :class="getAccentClasses(index, 'bg').replace('500', '200')"></div>
                  </div>
                </div>
                <!-- Payment methods -->
                <div class="mb-3 flex gap-2">
                  <div class="flex-1 rounded-lg border-2 p-2" :class="getAccentClasses(index, 'border')">
                    <div class="mb-1 flex items-center gap-1">
                      <div class="size-4 rounded bg-green-500"></div>
                      <div class="h-1.5 w-10 rounded bg-gray-200"></div>
                    </div>
                    <div class="h-1 w-8 rounded bg-gray-100"></div>
                  </div>
                  <div class="flex-1 rounded-lg border border-gray-200 p-2">
                    <div class="mb-1 flex items-center gap-1">
                      <div class="size-4 rounded bg-blue-500"></div>
                      <div class="h-1.5 w-8 rounded bg-gray-200"></div>
                    </div>
                    <div class="h-1 w-6 rounded bg-gray-100"></div>
                  </div>
                </div>
                <!-- Amount -->
                <div class="rounded-lg bg-gray-50 p-2">
                  <div class="mb-1 h-1.5 w-8 rounded bg-gray-200"></div>
                  <div class="h-4 w-20 rounded" :class="getAccentClasses(index, 'bg').replace('500', '300')"></div>
                </div>
              </div>
            </template>

            <!-- Default fallback -->
            <template v-else>
              <div class="relative size-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <div class="mb-3 flex items-center gap-2">
                  <div class="flex size-8 items-center justify-center rounded-lg" :class="getAccentClasses(index, 'bg')">
                    <svg class="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(feature.icon)" />
                    </svg>
                  </div>
                  <div class="h-2 w-20 rounded bg-gray-300"></div>
                </div>
                <div class="space-y-2">
                  <div class="h-2 w-full rounded bg-gray-100"></div>
                  <div class="h-2 w-4/5 rounded bg-gray-100"></div>
                  <div class="h-2 w-3/4 rounded bg-gray-100"></div>
                </div>
                <div class="mt-3 grid grid-cols-2 gap-2">
                  <div class="h-8 rounded-lg bg-gray-50"></div>
                  <div class="h-8 rounded-lg bg-gray-50"></div>
                </div>
              </div>
            </template>

            <!-- Floating icon badge -->
            <div
              class="absolute right-2 top-2 flex size-8 items-center justify-center rounded-lg shadow-lg ring-2 ring-white"
              :class="getAccentClasses(index, 'bg')"
            >
              <svg class="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(feature.icon)" />
              </svg>
            </div>
          </div>

          <!-- Text Content Below -->
          <div class="p-5">
            <!-- Title -->
            <h3 class="mb-2 text-lg font-bold text-gray-900">
              {{ feature.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm leading-relaxed text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- View More Button -->
      <div v-if="hasMore" class="mt-10 text-center">
        <button
          class="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          @click="toggleShowAll"
        >
          <span>{{ showAll ? 'View Less' : 'View More' }}</span>
          <svg
            class="size-4 transition-transform duration-300"
            :class="showAll ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
