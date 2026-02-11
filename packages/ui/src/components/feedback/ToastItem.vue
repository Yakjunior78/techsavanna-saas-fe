<script setup lang="ts">
import type { ToastType } from '@techsavanna/shared'

interface Props {
  type: ToastType
  message: string
}

defineProps<Props>()

const emit = defineEmits<{
  dismiss: []
}>()

const typeConfig: Record<ToastType, { bg: string; text: string; icon: string }> = {
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
  }
}
</script>

<template>
  <div
    class="pointer-events-auto flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm"
    :class="typeConfig[type].bg"
  >
    <svg
      class="mt-0.5 size-5 shrink-0"
      :class="typeConfig[type].text"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="typeConfig[type].icon"
      />
    </svg>

    <p class="flex-1 text-sm font-medium" :class="typeConfig[type].text">
      {{ message }}
    </p>

    <button
      type="button"
      class="shrink-0 cursor-pointer rounded-lg p-1 transition-colors hover:bg-black/5"
      :class="typeConfig[type].text"
      @click="emit('dismiss')"
    >
      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
