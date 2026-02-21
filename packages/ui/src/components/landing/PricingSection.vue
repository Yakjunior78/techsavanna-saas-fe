<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PricingPlan } from '@techsavanna/shared'
import { formatCurrency } from '@techsavanna/shared'
import Button from '../base/Button.vue'
import BackgroundPattern from './BackgroundPattern.vue'

interface Props {
  title?: string
  subtitle?: string
  plans: PricingPlan[]
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the plan that fits your business needs',
  currency: 'KES'
})

defineEmits<{
  selectPlan: [plan: PricingPlan, billingPeriod: 'monthly' | 'yearly']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const billingPeriod = ref<'monthly' | 'yearly'>('monthly')

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

const yearlyDiscount = computed(() => {
  return billingPeriod.value === 'yearly' ? 20 : 0
})

const gridCols = computed(() => {
  const count = props.plans.length
  if (count === 1) return 'max-w-md mx-auto'
  if (count === 2) return 'max-w-3xl mx-auto lg:grid-cols-2'
  return 'max-w-7xl lg:grid-cols-3'
})
</script>

<template>
  <section ref="sectionRef" id="pricing" class="relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-white py-14 lg:py-20">
    <BackgroundPattern id="pricing-pattern" opacity="0.15" />

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="mx-auto max-w-2xl text-center transition-all duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        <span class="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          Pricing
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 text-sm text-gray-500 sm:text-base">
          {{ subtitle }}
        </p>

        <!-- Modern Billing Toggle -->
        <div
          class="relative mt-5 inline-grid grid-cols-2 rounded-full bg-gray-100 p-0.5 transition-all delay-200 duration-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <button
            class="relative z-10 rounded-full px-5 py-1.5 text-xs font-medium transition-colors duration-300"
            :class="billingPeriod === 'monthly' ? 'text-white' : 'text-gray-600 hover:text-gray-900'"
            @click="billingPeriod = 'monthly'"
          >
            Monthly
          </button>
          <button
            class="relative z-10 flex items-center justify-center gap-1 rounded-full px-5 py-1.5 text-xs font-medium transition-colors duration-300"
            :class="billingPeriod === 'yearly' ? 'text-white' : 'text-gray-600 hover:text-gray-900'"
            @click="billingPeriod = 'yearly'"
          >
            Yearly
            <span
              v-if="yearlyDiscount"
              class="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium transition-colors duration-300"
              :class="billingPeriod === 'yearly' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'"
            >
              -{{ yearlyDiscount }}%
            </span>
          </button>
          <!-- Sliding background -->
          <div
            class="absolute left-0.5 top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-blue-600 shadow-md transition-transform duration-300 ease-out"
            :class="billingPeriod === 'yearly' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="mx-auto mt-10 grid gap-6" :class="gridCols">
        <div
          v-for="(plan, index) in plans"
          :key="plan.id"
          class="group relative flex flex-col rounded-xl border bg-white p-5 transition-all duration-500 ease-out"
          :class="[
            plan.featured
              ? 'border-transparent shadow-lg shadow-blue-100/50 lg:-mt-2 lg:mb-0 lg:pb-8'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          ]"
          :style="{ transitionDelay: `${300 + index * 100}ms` }"
        >
          <!-- Animated gradient border for featured -->
          <div
            v-if="plan.featured"
            class="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 opacity-100"
            style="background-size: 200% 100%; animation: gradientShift 4s ease infinite"
          ></div>
          <div
            v-if="plan.featured"
            class="absolute inset-0 rounded-xl bg-white"
          ></div>

          <!-- Card Content -->
          <div class="relative">
            <!-- Plan Header -->
            <div>
              <h3 class="text-base font-semibold text-gray-900">{{ plan.name }}</h3>
              <p class="mt-1 text-xs text-gray-500">{{ plan.description }}</p>
            </div>

            <!-- Price with animation -->
            <div class="mt-4">
              <div class="flex items-baseline">
                <Transition name="price" mode="out-in">
                  <span
                    :key="billingPeriod"
                    class="text-2xl font-bold text-gray-900"
                  >
                    {{ formatCurrency(
                      billingPeriod === 'yearly' ? plan.yearlyPrice / 12 : plan.monthlyPrice,
                      currency
                    ) }}
                  </span>
                </Transition>
                <span class="ml-1.5 text-xs text-gray-500">/user/month</span>
              </div>
              <Transition name="fade">
                <p v-if="billingPeriod === 'yearly'" class="mt-0.5 text-xs text-blue-600 font-medium">
                  Billed {{ formatCurrency(plan.yearlyPrice, currency) }}/user yearly
                </p>
              </Transition>
              <p class="mt-0.5 text-[10px] text-gray-400">VAT inclusive</p>
            </div>

            <!-- Features with staggered check animation -->
            <ul class="mt-5 flex-1 space-y-2">
              <li
                v-for="(feature, fIndex) in plan.features"
                :key="feature"
                class="flex items-start gap-2 transition-all duration-300"
                :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'"
                :style="{ transitionDelay: `${500 + index * 100 + fIndex * 50}ms` }"
              >
                <div class="flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-100 transition-transform duration-300 group-hover:scale-110">
                  <svg class="size-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-xs text-gray-600">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <Button
              class="mt-5"
              size="sm"
              :variant="plan.featured ? 'primary' : 'outline'"
              fullWidth
              @click="$emit('selectPlan', plan, billingPeriod)"
            >
              {{ plan.ctaText || 'Start Free Trial' }}
            </Button>

            <!-- Trial Info -->
            <p v-if="plan.trialDays" class="mt-2 text-center text-xs text-gray-400">
              {{ plan.trialDays }}-day free trial included
            </p>
          </div>
        </div>
      </div>

      <!-- Money Back Guarantee -->
      <div
        class="mt-8 text-center transition-all delay-700 duration-500"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        <p class="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <svg class="size-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          30-day money-back guarantee. No questions asked.
        </p>
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

.price-enter-active,
.price-leave-active {
  transition: all 0.3s ease;
}
.price-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.price-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
