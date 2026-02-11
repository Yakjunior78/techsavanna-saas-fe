<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

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

const imageLoaded = ref(false)
const imageError = ref(false)

// Reset state when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    imageLoaded.value = false
    imageError.value = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function handleImageLoad() {
  imageLoaded.value = true
  imageError.value = false
}

function handleImageError() {
  imageLoaded.value = false
  imageError.value = true
}

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    emit('close')
  }
}

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
        <div class="relative z-10 flex max-h-[90vh] flex-col items-center">
          <!-- Close button (absolute positioned) -->
          <button
            type="button"
            class="absolute -right-2 -top-12 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 sm:right-0"
            @click="$emit('close')"
          >
            <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image container -->
          <div class="relative overflow-hidden rounded-xl bg-white p-2 shadow-2xl ring-1 ring-white/20">
            <!-- Loading state -->
            <div
              v-if="!imageLoaded && !imageError"
              class="flex h-80 w-80 items-center justify-center rounded-lg bg-gray-50 sm:h-96 sm:w-96"
            >
              <div class="flex flex-col items-center gap-3">
                <svg class="size-8 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-500">Loading certificate...</span>
              </div>
            </div>

            <!-- Error state -->
            <div
              v-if="imageError"
              class="flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center sm:h-96 sm:w-96"
            >
              <svg class="mb-4 size-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-base font-medium text-gray-700">Certificate not available</p>
              <p class="mt-1 text-sm text-gray-500">The certificate will be uploaded soon</p>
            </div>

            <!-- Actual image -->
            <img
              v-show="imageLoaded"
              :src="imageUrl"
              :alt="alt"
              class="max-h-[70vh] w-auto max-w-[90vw] rounded-lg object-contain sm:max-w-[80vw] lg:max-w-4xl"
              @load="handleImageLoad"
              @error="handleImageError"
            />
          </div>

          <!-- Title and download -->
          <div v-if="imageLoaded" class="mt-4 flex flex-col items-center gap-3">
            <h3 v-if="title" class="text-center text-lg font-semibold text-white">
              {{ title }}
            </h3>
            <a
              :href="imageUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
