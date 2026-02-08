<script setup lang="ts">
import { watch, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  open: boolean
  videoUrl: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Watch Demo'
})

const emit = defineEmits<{
  close: []
}>()

// Extract YouTube video ID from various URL formats
const youtubeVideoId = computed(() => {
  const url = props.videoUrl
  if (!url) return null

  // Handle youtu.be format
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]

  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return watchMatch[1]

  // Handle youtube.com/embed/ format
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]

  return null
})

const embedUrl = computed(() => {
  if (!youtubeVideoId.value) return props.videoUrl
  return `https://www.youtube.com/embed/${youtubeVideoId.value}?autoplay=1&rel=0`
})

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
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          @click="$emit('close')"
        />

        <!-- Modal -->
        <div class="relative z-10 w-full max-w-4xl">
          <!-- Close button -->
          <button
            type="button"
            class="absolute -right-2 -top-12 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
            @click="$emit('close')"
          >
            <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Video container with aspect ratio -->
          <div class="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div class="aspect-video">
              <iframe
                v-if="open"
                :src="embedUrl"
                class="size-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>

          <!-- Title below video -->
          <p v-if="title" class="mt-4 text-center text-sm text-white/60">
            {{ title }}
          </p>
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
