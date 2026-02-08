<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: 'sm',
  hover: false,
  bordered: true
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg'
}
</script>

<template>
  <div
    class="rounded-xl bg-white transition-all duration-200"
    :class="[
      paddingClasses[padding],
      shadowClasses[shadow],
      bordered ? 'border border-gray-200' : '',
      hover ? 'hover:shadow-md hover:border-gray-300' : ''
    ]"
  >
    <slot />
  </div>
</template>
