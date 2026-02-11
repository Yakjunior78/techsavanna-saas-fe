<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  password: string
}

const props = defineProps<Props>()

const requirements = computed(() => [
  { label: 'At least 8 characters', met: props.password.length >= 8 },
  { label: 'One uppercase letter', met: /[A-Z]/.test(props.password) },
  { label: 'One lowercase letter', met: /[a-z]/.test(props.password) },
  { label: 'One number', met: /\d/.test(props.password) }
])

const strength = computed(() => {
  const metCount = requirements.value.filter(r => r.met).length
  return metCount
})

const strengthPercent = computed(() => (strength.value / 4) * 100)

const strengthColor = computed(() => {
  if (strength.value <= 1) return 'bg-red-500'
  if (strength.value === 2) return 'bg-orange-500'
  if (strength.value === 3) return 'bg-yellow-500'
  return 'bg-green-500'
})

const strengthLabel = computed(() => {
  if (strength.value <= 1) return 'Weak'
  if (strength.value === 2) return 'Fair'
  if (strength.value === 3) return 'Good'
  return 'Strong'
})
</script>

<template>
  <div v-if="password" class="mx-0.5 space-y-0.5">
    <!-- Strength bar -->
    <div class="flex items-center gap-2">
      <div class="h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-full transition-all duration-300"
          :class="strengthColor"
          :style="{ width: `${strengthPercent}%` }"
        />
      </div>
      <span class="text-[10px] font-medium" :class="strengthColor.replace('bg-', 'text-')">
        {{ strengthLabel }}
      </span>
    </div>

    <!-- Requirements checklist -->
    <div class="grid grid-cols-2 gap-0.5">
      <div
        v-for="req in requirements"
        :key="req.label"
        class="flex items-center gap-1 text-[10px]"
        :class="req.met ? 'text-green-600' : 'text-gray-400'"
      >
        <svg v-if="req.met" class="size-2.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="size-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
        </svg>
        <span>{{ req.label }}</span>
      </div>
    </div>
  </div>
</template>
