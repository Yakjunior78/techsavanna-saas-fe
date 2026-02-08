<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  androidUrl?: string
  iosUrl?: string
  downloadPageUrl?: string
  features?: string[]
  desktopComingSoon?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Download Our App',
  subtitle: 'Take your business anywhere with our mobile app',
  androidUrl: '#',
  iosUrl: '#',
  downloadPageUrl: '/download',
  features: () => ['Works offline', 'Real-time sync', 'Push notifications', 'Secure login'],
  desktopComingSoon: false
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" id="download" class="relative overflow-hidden bg-rose-50/50 py-16 lg:py-20">
    <!-- Grid pattern background -->
    <div class="absolute inset-0 opacity-[0.3]">
      <svg class="size-full">
        <defs>
          <pattern id="download-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0v32H0" fill="none" stroke="currentColor" stroke-width="0.5" class="text-rose-200"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#download-grid)"/>
      </svg>
    </div>

    <!-- Subtle gradient orbs -->
    <div class="absolute -left-32 top-0 size-64 rounded-full bg-rose-200/30 blur-3xl"></div>
    <div class="absolute -right-32 bottom-0 size-64 rounded-full bg-pink-200/30 blur-3xl"></div>

    <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <!-- Content -->
        <div
          class="max-w-lg text-center transition-all duration-700 lg:text-left"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <span class="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700">
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Mobile App
          </span>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ title }}
          </h2>
          <p class="mt-3 text-base text-gray-600">
            {{ subtitle }}
          </p>

          <!-- Features -->
          <div class="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <span
              v-for="(feature, index) in features"
              :key="index"
              class="inline-flex items-center gap-1.5 text-sm text-gray-600"
            >
              <svg class="size-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ feature }}
            </span>
          </div>

          <!-- Download buttons -->
          <div
            class="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            :style="{ transitionDelay: '200ms' }"
          >
            <a
              :href="downloadPageUrl"
              class="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <svg class="size-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.34q-.734 0-1.255-.52-.52-.522-.52-1.256t.52-1.255q.52-.522 1.255-.522.735 0 1.256.522.522.52.522 1.255t-.522 1.255q-.52.522-1.256.522Zm-11.046 0q-.735 0-1.256-.52Q4.7 14.298 4.7 13.563t.521-1.255q.52-.522 1.256-.522.734 0 1.255.522.521.52.521 1.255t-.52 1.255q-.522.522-1.256.522ZM18.61 7.824l1.864-3.228a.399.399 0 0 0-.15-.545.399.399 0 0 0-.544.15l-1.888 3.27A11.22 11.22 0 0 0 12 6.082c-2.12 0-4.082.483-5.891 1.389L4.22 4.2a.399.399 0 0 0-.545-.15.399.399 0 0 0-.15.545l1.864 3.228C2.223 9.774 0 13.104 0 16.955h24c0-3.85-2.223-7.18-5.39-9.13Z"/>
              </svg>
              <div class="text-left">
                <p class="text-[10px] font-medium uppercase tracking-wide text-gray-500">Get it on</p>
                <p class="text-sm font-semibold text-gray-900">Google Play</p>
              </div>
            </a>
            <a
              :href="downloadPageUrl"
              class="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <svg class="size-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div class="text-left">
                <p class="text-[10px] font-medium uppercase tracking-wide text-gray-500">Download on</p>
                <p class="text-sm font-semibold text-gray-900">App Store</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Phone mockup -->
        <div
          class="relative transition-all delay-300 duration-700"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <!-- Phone frame -->
          <div class="relative mx-auto w-56">
            <!-- Glow effect -->
            <div class="absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-rose-100/50 to-pink-100/50 blur-2xl"></div>

            <!-- Phone body -->
            <div class="relative overflow-hidden rounded-[2.5rem] border-4 border-gray-800 bg-gray-900 p-2 shadow-2xl">
              <!-- Notch -->
              <div class="absolute left-1/2 top-0 z-20 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-900"></div>

              <!-- Screen -->
              <div class="relative overflow-hidden rounded-[2rem] bg-white">
                <!-- App mockup screen -->
                <div class="h-96 bg-gradient-to-b from-rose-50 to-white p-4">
                  <!-- Status bar mockup -->
                  <div class="mb-4 flex items-center justify-between text-[10px] text-gray-500">
                    <span>9:41</span>
                    <div class="flex gap-1">
                      <div class="h-2.5 w-4 rounded-sm bg-gray-300"></div>
                      <div class="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                    </div>
                  </div>

                  <!-- App header -->
                  <div class="mb-4 flex items-center gap-2">
                    <div class="flex size-8 items-center justify-center rounded-lg bg-rose-500">
                      <svg class="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="h-2 w-16 rounded bg-gray-800"></div>
                      <div class="mt-1 h-1.5 w-10 rounded bg-gray-300"></div>
                    </div>
                  </div>

                  <!-- Stats cards -->
                  <div class="mb-3 grid grid-cols-2 gap-2">
                    <div class="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-100">
                      <div class="mb-1 h-1.5 w-8 rounded bg-gray-200"></div>
                      <div class="h-3 w-12 rounded bg-rose-200"></div>
                    </div>
                    <div class="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-100">
                      <div class="mb-1 h-1.5 w-6 rounded bg-gray-200"></div>
                      <div class="h-3 w-10 rounded bg-rose-200"></div>
                    </div>
                  </div>

                  <!-- Chart mockup -->
                  <div class="mb-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100">
                    <div class="mb-2 h-1.5 w-12 rounded bg-gray-200"></div>
                    <div class="flex h-20 items-end justify-between gap-1.5">
                      <div
                        v-for="i in 7"
                        :key="i"
                        class="flex-1 rounded-t bg-rose-400 transition-all duration-500"
                        :style="{
                          height: isVisible ? `${30 + Math.sin(i) * 40 + 20}%` : '0%',
                          transitionDelay: `${400 + i * 80}ms`
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- List items -->
                  <div class="space-y-2">
                    <div
                      v-for="i in 3"
                      :key="i"
                      class="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-100 transition-all duration-300"
                      :style="{ transitionDelay: `${600 + i * 100}ms` }"
                      :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'"
                    >
                      <div class="size-6 rounded-full bg-rose-100"></div>
                      <div class="flex-1">
                        <div class="h-1.5 w-16 rounded bg-gray-200"></div>
                        <div class="mt-1 h-1 w-10 rounded bg-gray-100"></div>
                      </div>
                      <div class="h-4 w-8 rounded bg-rose-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Home indicator -->
            <div class="absolute bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
