<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '../base/Button.vue'

interface Props {
  privacyPolicyUrl?: string
  cookiePolicyUrl?: string
}

withDefaults(defineProps<Props>(), {
  privacyPolicyUrl: '/privacy-policy',
  cookiePolicyUrl: '/cookie-policy'
})

const emit = defineEmits<{
  accept: []
  reject: []
  customize: []
}>()

const isVisible = ref(false)
const COOKIE_CONSENT_KEY = 'cookie-consent'

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!consent) {
    // Show after a small delay for better UX
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})

function acceptAll() {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString()
  }))
  isVisible.value = false
  emit('accept')
}

function rejectNonEssential() {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString()
  }))
  isVisible.value = false
  emit('reject')
}

function openCustomize() {
  emit('customize')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="isVisible"
        class="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      >
        <div class="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <svg class="size-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-sm font-semibold text-gray-900">Cookie Preferences</h3>
              </div>
              <p class="mt-2 text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies. Read our
                <a :href="privacyPolicyUrl" class="text-blue-600 hover:underline">Privacy Policy</a> and
                <a :href="cookiePolicyUrl" class="text-blue-600 hover:underline">Cookie Policy</a> to learn more.
              </p>
            </div>

            <!-- Actions -->
            <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="ghost"
                size="sm"
                @click="openCustomize"
              >
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                @click="rejectNonEssential"
              >
                Reject All
              </Button>
              <Button
                size="sm"
                @click="acceptAll"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
