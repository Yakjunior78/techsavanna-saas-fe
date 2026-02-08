<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface FAQ {
  question: string
  answer: string
}

interface Props {
  title?: string
  subtitle?: string
  faqs: FAQ[]
}

withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our product'
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const openIndex = ref<number | null>(0)

let observer: IntersectionObserver | null = null

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

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

// Transition hooks for smooth accordion animation
function onBeforeEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
  htmlEl.style.opacity = '0'
}

function onEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'height 0.3s ease-out, opacity 0.3s ease-out'
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
}

function onAfterEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = 'auto'
}

function onBeforeLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
}

function onLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'height 0.3s ease-out, opacity 0.3s ease-out'
  requestAnimationFrame(() => {
    htmlEl.style.height = '0'
    htmlEl.style.opacity = '0'
  })
}
</script>

<template>
  <section ref="sectionRef" id="faq" class="relative overflow-hidden bg-slate-50 py-14 lg:py-20">
    <!-- Subtle diagonal lines background -->
    <div class="absolute inset-0 opacity-[0.02]">
      <svg class="size-full">
        <defs>
          <pattern id="faq-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#faq-lines)"/>
      </svg>
    </div>

    <div class="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="text-center transition-all duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        <span class="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          FAQ
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 text-sm text-gray-500 sm:text-base">
          {{ subtitle }}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="mt-8 space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden rounded-xl border transition-all duration-300"
          :class="[
            openIndex === index
              ? 'border-gray-200 bg-white shadow-sm'
              : 'border-gray-100 bg-white hover:border-gray-200',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          ]"
          :style="{ transitionDelay: `${100 + index * 50}ms` }"
        >
          <button
            class="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors"
            :class="openIndex === index ? 'bg-gray-50/50' : 'hover:bg-gray-50/50'"
            @click="toggle(index)"
          >
            <span class="pr-4 text-sm font-medium text-gray-900">{{ faq.question }}</span>
            <!-- Animated icon -->
            <div class="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all duration-200"
                 :class="openIndex === index ? 'bg-blue-100' : ''">
              <!-- Plus icon -->
              <span
                class="absolute inset-0 flex items-center justify-center transition-all duration-300"
                :class="openIndex === index ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'"
              >
                <svg class="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12"/>
                </svg>
              </span>
              <!-- Minus icon -->
              <span
                class="absolute inset-0 flex items-center justify-center transition-all duration-300"
                :class="openIndex === index ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'"
              >
                <svg class="size-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12h12"/>
                </svg>
              </span>
            </div>
          </button>

          <!-- Animated content -->
          <Transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
          >
            <div v-if="openIndex === index" class="overflow-hidden">
              <p class="px-6 pb-6 text-gray-600 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-12 text-center transition-all delay-500 duration-500"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        <p class="text-gray-600">
          Still have questions?
          <a
            href="/contact"
            class="group inline-flex items-center gap-1 font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Contact our support team
            <svg class="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </p>
      </div>
    </div>
  </section>
</template>
