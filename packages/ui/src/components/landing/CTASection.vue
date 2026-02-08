<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '../base/Button.vue'

interface Props {
  title?: string
  subtitle?: string
  ctaText?: string
  secondaryCtaText?: string
  gradientFrom?: string
  gradientTo?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to Get Started?',
  subtitle: 'Join thousands of businesses already growing with us',
  ctaText: 'Start Free Trial',
  gradientFrom: 'from-blue-600',
  gradientTo: 'to-indigo-700'
})

defineEmits<{
  ctaClick: []
  secondaryCtaClick: []
}>()

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
    { threshold: 0.2 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

const trustBadges = [
  { text: 'Free 14-day trial' },
  { text: 'No credit card required' },
  { text: 'Cancel anytime' }
]
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-gradient-to-r py-12 lg:py-16"
    :class="[gradientFrom, gradientTo]"
  >
    <!-- Background grid pattern -->
    <div class="absolute inset-0 opacity-20">
      <svg class="size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0v40H0" fill="none" stroke="white" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)"/>
      </svg>
    </div>

    <div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <!-- Title -->
      <h2
        class="text-xl font-bold tracking-tight text-white transition-all duration-700 sm:text-2xl"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        {{ title }}
      </h2>

      <p
        class="mx-auto mt-3 max-w-xl text-sm text-white/80 transition-all delay-150 duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        {{ subtitle }}
      </p>

      <!-- CTA Buttons -->
      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-3 transition-all delay-300 duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <Button
          size="md"
          class="group !rounded-full !bg-white !px-5 !text-gray-900 hover:!bg-gray-50 hover:!shadow-md"
          @click="$emit('ctaClick')"
        >
          <span class="whitespace-nowrap">{{ ctaText }}</span>
          <svg class="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Button>
        <Button
          v-if="secondaryCtaText"
          size="md"
          variant="outline"
          class="group !rounded-full !border-white/30 !px-5 !text-white hover:!bg-white/10 hover:!border-white/50"
          @click="$emit('secondaryCtaClick')"
        >
          <span class="whitespace-nowrap">{{ secondaryCtaText }}</span>
        </Button>
      </div>

      <!-- Trust indicators -->
      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-4 transition-all delay-500 duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div
          v-for="(badge, index) in trustBadges"
          :key="badge.text"
          class="flex items-center gap-1.5 text-white/75 transition-all duration-300"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          :style="{ transitionDelay: `${400 + index * 75}ms` }"
        >
          <svg class="size-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span class="text-xs">{{ badge.text }}</span>
        </div>
      </div>
    </div>
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
</style>
