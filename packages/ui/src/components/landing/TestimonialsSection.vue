<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  avatar?: string
  rating?: number
}

interface Props {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

withDefaults(defineProps<Props>(), {
  title: 'Trusted by Thousands of Businesses',
  subtitle: 'See what our customers have to say about their experience'
})

const sectionRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isStatsVisible = ref(false)

// Animated counter values
const businessCount = ref(0)
const uptimeValue = ref(0)
const ratingValue = ref(0)

let observer: IntersectionObserver | null = null
let statsObserver: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '-50px' }
  )

  statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isStatsVisible.value = true
        statsObserver?.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
  if (statsRef.value) statsObserver.observe(statsRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  statsObserver?.disconnect()
})

// Animate counters when stats become visible
watch(isStatsVisible, (visible) => {
  if (visible) {
    animateCounter(businessCount, 5000, 2000)
    animateCounter(uptimeValue, 99.9, 2000, 1)
    animateCounter(ratingValue, 4.9, 2000, 1)
  }
})

function animateCounter(target: typeof businessCount, endValue: number, duration: number, decimals = 0) {
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3)
    target.value = Number((endValue * easeOut).toFixed(decimals))

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      target.value = endValue
    }
  }

  requestAnimationFrame(animate)
}
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-white py-14 lg:py-20">
    <!-- Subtle radial gradient background -->
    <div class="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent"></div>

    <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="mx-auto max-w-2xl text-center transition-all duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        <span class="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          Testimonials
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 text-sm text-gray-500 sm:text-base">
          {{ subtitle }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(testimonial, index) in testimonials.slice(0, 6)"
          :key="index"
          class="group rounded-xl border border-gray-100 bg-white p-5
                 transition-all duration-300 ease-out
                 hover:border-gray-200 hover:shadow-md"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${100 + index * 50}ms` }"
        >
          <!-- Stars -->
          <div class="mb-3 flex gap-0.5">
            <svg
              v-for="star in 5"
              :key="star"
              class="size-3.5"
              :class="star <= (testimonial.rating || 5) ? 'text-amber-400' : 'text-gray-200'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>

          <!-- Quote -->
          <blockquote class="text-xs leading-relaxed text-gray-600">
            "{{ testimonial.quote }}"
          </blockquote>

          <!-- Author -->
          <div class="mt-4 flex items-center gap-3">
            <div
              v-if="testimonial.avatar"
              class="size-8 overflow-hidden rounded-full"
            >
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="size-full object-cover"
              />
            </div>
            <div
              v-else
              class="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
            >
              <span class="text-xs font-semibold">
                {{ testimonial.name.charAt(0) }}
              </span>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-900">{{ testimonial.name }}</p>
              <p class="text-xs text-gray-500">
                {{ testimonial.role }}, {{ testimonial.company }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats with animated counters -->
      <div
        ref="statsRef"
        class="mt-10 grid gap-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6 sm:grid-cols-3"
      >
        <div
          class="text-center transition-all duration-500"
          :class="isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <p class="text-2xl font-bold tabular-nums text-gray-900">
            {{ businessCount.toLocaleString() }}+
          </p>
          <p class="mt-1 text-xs text-gray-500">Businesses trust us</p>
        </div>
        <div
          class="text-center transition-all delay-75 duration-500"
          :class="isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <p class="text-2xl font-bold tabular-nums text-gray-900">
            {{ uptimeValue }}%
          </p>
          <p class="mt-1 text-xs text-gray-500">Uptime guarantee</p>
        </div>
        <div
          class="text-center transition-all delay-150 duration-500"
          :class="isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <p class="text-2xl font-bold tabular-nums text-gray-900">
            {{ ratingValue }}/5
          </p>
          <p class="mt-1 text-xs text-gray-500">Average rating</p>
        </div>
      </div>
    </div>
  </section>
</template>
