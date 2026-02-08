<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-400',
  outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-400',
  ghost: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-400',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400 shadow-sm hover:shadow-md'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

// Ripple effect
interface Ripple {
  id: number
  style: {
    width: string
    height: string
    left: string
    top: string
  }
}

const ripples = ref<Ripple[]>([])
let rippleId = 0

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return

  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple: Ripple = {
    id: rippleId++,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`
    }
  }

  ripples.value.push(ripple)
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id)
  }, 600)

  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl font-medium
           transition-all duration-200 ease-out
           focus:outline-none focus:ring-2 focus:ring-offset-2
           disabled:cursor-not-allowed disabled:opacity-50
           active:scale-[0.98]"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      !disabled && !loading ? 'hover:-translate-y-0.5' : ''
    ]"
    @click="handleClick"
  >
    <!-- Shimmer effect on hover -->
    <span
      class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent
             transition-transform duration-700 ease-out group-hover:translate-x-full"
    ></span>

    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Content -->
    <span class="relative z-10 inline-flex flex-row flex-nowrap items-center gap-2">
      <slot />
    </span>

    <!-- Ripple container -->
    <span class="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="absolute rounded-full bg-white/30"
        :style="{
          ...ripple.style,
          animation: 'ripple 0.6s ease-out'
        }"
      ></span>
    </span>
  </button>
</template>

<style scoped>
@keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
