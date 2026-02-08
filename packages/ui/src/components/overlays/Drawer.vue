<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

interface Props {
  open: boolean
  title?: string
  width?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: 'md'
})

const emit = defineEmits<{
  close: []
}>()

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    emit('close')
  }
}

// Lock body scroll when open
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 overflow-hidden"
    >
      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="open"
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="$emit('close')"
        />
      </Transition>

      <!-- Drawer panel -->
      <div class="absolute inset-y-0 right-0 flex max-w-full items-start py-4 pr-4">
        <!-- Floating close button on the left -->
        <Transition name="slide-right">
          <button
            v-if="open"
            type="button"
            class="mr-3 mt-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-700"
            @click="$emit('close')"
          >
            <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Transition>

        <Transition name="slide-right">
          <div
            v-if="open"
            class="h-full w-screen"
            :class="widthClasses[width]"
          >
            <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <!-- Header -->
              <div class="shrink-0 border-b border-gray-200 px-4 py-3">
                <h2 v-if="title" class="text-base font-semibold text-gray-900">
                  {{ title }}
                </h2>
                <slot name="header" />
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto">
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-3">
                <slot name="footer" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Fade transition for backdrop */
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from right transition */
.slide-right-enter-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-leave-active {
  transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1);
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
