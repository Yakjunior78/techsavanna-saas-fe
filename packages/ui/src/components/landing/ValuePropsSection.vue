<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BackgroundPattern from './BackgroundPattern.vue'

export interface ValueProp {
  icon: string
  value: string
  label: string
  title?: string
  description?: string
  features?: string[]
}

interface Props {
  valueProps: ValueProp[]
  sectionTitle?: string
  sectionSubtitle?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Why Businesses Choose Us',
  sectionSubtitle: 'Built for businesses with the features you need to succeed'
})

const sectionRef = ref<HTMLElement | null>(null)
const visibleItems = ref<Set<number>>(new Set())
let observer: IntersectionObserver | null = null

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
    { threshold: 0.2, rootMargin: '-50px' }
  )

  const items = sectionRef.value?.querySelectorAll('[data-index]')
  items?.forEach(item => observer?.observe(item))
})

onUnmounted(() => {
  observer?.disconnect()
})

const iconPaths: Record<string, string> = {
  'uptime': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'offline': 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
  'secure': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'fast': 'M13 10V3L4 14h7v7l9-11h-7z',
  'support': 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  'cloud': 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  'users': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  'globe': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  'lock': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'clock': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'mobile': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
}

function getIconPath(icon: string): string {
  return iconPaths[icon] || iconPaths['check-circle']
}

const dashboardVariants = [
  { accent: 'blue', chart: [40, 65, 45, 80, 60] },
  { accent: 'indigo', chart: [30, 50, 70, 45, 85] },
  { accent: 'purple', chart: [55, 40, 75, 50, 65] },
  { accent: 'sky', chart: [45, 70, 55, 80, 50] },
  { accent: 'violet', chart: [60, 45, 80, 55, 75] }
]
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
    <BackgroundPattern id="value-pattern" opacity="0.15" />

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
        <span class="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Why Choose Us
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ sectionTitle }}
        </h2>
        <p class="mt-3 text-base text-gray-600">
          {{ sectionSubtitle }}
        </p>
      </div>

      <!-- Value Props List -->
      <div class="space-y-20 lg:space-y-32">
        <div
          v-for="(prop, index) in valueProps"
          :key="index"
          :data-index="index"
          class="mx-auto max-w-4xl transition-all duration-700"
          :class="visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
        >
          <div
            class="grid items-center gap-8 lg:grid-cols-5 lg:gap-10"
            :class="index % 2 === 1 ? '' : ''"
          >
            <!-- Content Side - Takes more space -->
            <div
              class="lg:col-span-3"
              :class="index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
            >
              <!-- Badge with value -->
              <div class="mb-3 inline-flex items-center gap-1.5">
                <span
                  class="text-sm font-semibold"
                  :class="{
                    'text-blue-600': index % 5 === 0,
                    'text-indigo-600': index % 5 === 1,
                    'text-purple-600': index % 5 === 2,
                    'text-sky-600': index % 5 === 3,
                    'text-violet-600': index % 5 === 4
                  }"
                >{{ prop.value }}</span>
                <span class="text-sm font-medium text-gray-500">{{ prop.label }}</span>
              </div>

              <!-- Title -->
              <h3 class="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                {{ prop.title || prop.label }}
              </h3>

              <!-- Description -->
              <p class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                {{ prop.description || `Our ${prop.label.toLowerCase()} ensures your business runs smoothly.` }}
              </p>

              <!-- Feature list - Bullet points -->
              <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
                <li
                  v-for="(feature, fIndex) in (prop.features || ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']).slice(0, 4)"
                  :key="fIndex"
                  class="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span
                    class="size-1.5 shrink-0 rounded-full"
                    :class="{
                      'bg-blue-500': index % 5 === 0,
                      'bg-indigo-500': index % 5 === 1,
                      'bg-purple-500': index % 5 === 2,
                      'bg-sky-500': index % 5 === 3,
                      'bg-violet-500': index % 5 === 4
                    }"
                  ></span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Dashboard Mockup Side - Smaller -->
            <div
              class="lg:col-span-2"
              :class="index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'"
            >
              <div class="relative mx-auto max-w-xs">
                <!-- Glow effect -->
                <div
                  class="absolute -inset-3 rounded-2xl opacity-15 blur-xl"
                  :class="{
                    'bg-blue-400': index % 5 === 0,
                    'bg-indigo-400': index % 5 === 1,
                    'bg-purple-400': index % 5 === 2,
                    'bg-sky-400': index % 5 === 3,
                    'bg-violet-400': index % 5 === 4
                  }"
                ></div>

                <!-- Dashboard Card -->
                <div class="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <!-- Browser Chrome -->
                  <div class="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
                    <div class="size-2 rounded-full bg-red-400"></div>
                    <div class="size-2 rounded-full bg-yellow-400"></div>
                    <div class="size-2 rounded-full bg-green-400"></div>
                  </div>

                  <!-- Dashboard Content - Compact -->
                  <div class="bg-gray-50 p-3">
                    <!-- Mini Stats -->
                    <div class="mb-3 flex gap-2">
                      <div class="flex-1 rounded-lg bg-white p-2 shadow-sm">
                        <div class="mb-1 h-1.5 w-8 rounded bg-gray-200"></div>
                        <div
                          class="h-3 w-10 rounded"
                          :class="{
                            'bg-blue-200': index % 5 === 0,
                            'bg-indigo-200': index % 5 === 1,
                            'bg-purple-200': index % 5 === 2,
                            'bg-amber-200': index % 5 === 3,
                            'bg-rose-200': index % 5 === 4
                          }"
                        ></div>
                      </div>
                      <div class="flex-1 rounded-lg bg-white p-2 shadow-sm">
                        <div class="mb-1 h-1.5 w-6 rounded bg-gray-200"></div>
                        <div class="h-3 w-8 rounded bg-gray-200"></div>
                      </div>
                    </div>

                    <!-- Mini Chart -->
                    <div class="rounded-lg bg-white p-3 shadow-sm">
                      <div class="mb-2 h-1.5 w-12 rounded bg-gray-200"></div>
                      <div class="flex h-16 items-end justify-between gap-1">
                        <div
                          v-for="(height, i) in dashboardVariants[index % 5].chart"
                          :key="i"
                          class="flex-1 rounded-t transition-all duration-500"
                          :class="{
                            'bg-blue-400': index % 5 === 0,
                            'bg-indigo-400': index % 5 === 1,
                            'bg-purple-400': index % 5 === 2,
                            'bg-sky-400': index % 5 === 3,
                            'bg-violet-400': index % 5 === 4
                          }"
                          :style="{
                            height: visibleItems.has(index) ? `${height}%` : '0%',
                            transitionDelay: `${i * 80 + 200}ms`
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Small floating badge -->
                <div
                  class="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full shadow-md ring-2 ring-white"
                  :class="{
                    'bg-blue-500': index % 5 === 0,
                    'bg-indigo-500': index % 5 === 1,
                    'bg-purple-500': index % 5 === 2,
                    'bg-sky-500': index % 5 === 3,
                    'bg-violet-500': index % 5 === 4
                  }"
                >
                  <svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Divider -->
          <div
            v-if="index < valueProps.length - 1"
            class="relative mt-16 flex items-center justify-center lg:mt-24"
          >
            <!-- Left line -->
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300"></div>

            <!-- Center ornament -->
            <div class="relative mx-4">
              <div
                class="flex size-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-sm"
              >
                <div
                  class="size-3 rounded-full"
                  :class="{
                    'bg-blue-400': index % 5 === 0,
                    'bg-indigo-400': index % 5 === 1,
                    'bg-purple-400': index % 5 === 2,
                    'bg-sky-400': index % 5 === 3,
                    'bg-violet-400': index % 5 === 4
                  }"
                ></div>
              </div>
              <!-- Small decorative dots -->
              <div class="absolute -left-6 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gray-300"></div>
              <div class="absolute -right-6 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gray-300"></div>
            </div>

            <!-- Right line -->
            <div class="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
