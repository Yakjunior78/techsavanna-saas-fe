<script setup lang="ts">
import { inject } from 'vue'

interface Props {
  id: string
  variant?: 'light' | 'dark'
  opacity?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  opacity: '0.08'
})

const appId = inject<string>('landingAppId', 'pos')
const strokeColor = props.variant === 'dark' ? 'white' : 'currentColor'

const lightColors: Record<string, string> = {
  pos: '#93c5fd',
  elimu: '#fcd34d',
  erp: '#c4b5fd',
  people: '#a5b4fc'
}

const gridColor = props.variant === 'dark' ? 'white' : (lightColors[appId] || '#d1d5db')
</script>

<template>
  <div class="absolute inset-0" :style="{ opacity }">
    <svg class="size-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern :id="id" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0V60H0" fill="none" :stroke="gridColor" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" :fill="`url(#${id})`" />
    </svg>
  </div>
</template>
