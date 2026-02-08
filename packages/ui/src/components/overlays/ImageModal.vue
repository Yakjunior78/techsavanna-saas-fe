<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

interface Props {
  open: boolean
  imageUrl: string
  title?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  alt: 'Certificate'
})

const emit = defineEmits<{
  close: []
}>()

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
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          @click="$emit('close')"
        />

        <!-- Modal -->
        <div class="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col">
          <!-- Header -->
          <div class="mb-4 flex items-center justify-between">
            <h3 v-if="title" class="text-lg font-semibold text-white">
              {{ title }}
            </h3>
            <div v-else></div>

            <!-- Close button -->
            <button
              type="button"
              class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              @click="$emit('close')"
            >
              <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Image container -->
          <div class="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img
              :src="imageUrl"
              :alt="alt"
              class="h-auto max-h-[75vh] w-full object-contain"
              @error="$emit('close')"
            />
          </div>

          <!-- Download link -->
          <div class="mt-4 flex justify-center">
            <a
              :href="imageUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
            >
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
