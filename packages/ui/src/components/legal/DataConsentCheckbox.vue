<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  termsUrl?: string
  privacyUrl?: string
  required?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  termsUrl: '/terms-of-service',
  privacyUrl: '/privacy-policy',
  required: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="space-y-1">
    <label class="flex cursor-pointer items-start gap-3">
      <div class="relative mt-0.5 flex items-center">
        <input
          v-model="isChecked"
          type="checkbox"
          :required="required"
          class="peer size-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-0"
        />
        <svg
          class="pointer-events-none absolute left-0 top-0 size-4 scale-0 text-white transition-transform peer-checked:scale-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span class="text-xs leading-relaxed text-gray-600">
        I agree to the
        <a
          :href="termsUrl"
          target="_blank"
          class="font-medium text-blue-600 hover:underline"
          @click.stop
        >
          Terms of Service
        </a>
        and
        <a
          :href="privacyUrl"
          target="_blank"
          class="font-medium text-blue-600 hover:underline"
          @click.stop
        >
          Privacy Policy
        </a>
        <span v-if="required" class="text-red-400">*</span>
      </span>
    </label>
    <p v-if="error" class="ml-7 text-xs text-red-500">{{ error }}</p>
  </div>
</template>
