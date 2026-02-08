<script setup lang="ts">
import { computed } from 'vue'
import { SAVANNA_APPS } from '@techsavanna/shared'

interface Props {
  appId?: string
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: 'pos',
  title: 'Welcome back',
  subtitle: 'Sign in to your account to continue'
})

defineEmits<{
  backToHome: []
}>()

const appConfig = computed(() => {
  if (props.appId && SAVANNA_APPS[props.appId]) {
    return SAVANNA_APPS[props.appId]
  }
  return SAVANNA_APPS.pos
})

const appColor = computed(() => appConfig.value.primaryColor || '#10B981')

const logoPath = computed(() => appConfig.value.logo)
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Background Decorations -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Grid Pattern -->
      <svg class="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="auth-grid-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid-pattern)" />
      </svg>

      <!-- App-specific floating icons - POS -->
      <template v-if="appId === 'pos'">
        <!-- Credit Card -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
        <!-- Shopping Cart -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <!-- Receipt -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="14" y2="12"/>
        </svg>
        <!-- Barcode -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="2" y="4" width="2" height="16"/><rect x="6" y="4" width="1" height="16"/><rect x="9" y="4" width="2" height="16"/><rect x="13" y="4" width="1" height="16"/><rect x="16" y="4" width="3" height="16"/><rect x="21" y="4" width="1" height="16"/>
        </svg>
      </template>

      <!-- App-specific floating icons - People/HRM -->
      <template v-else-if="appId === 'people'">
        <!-- Users -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <!-- Calendar -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <!-- Clock -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <!-- ID Badge -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 18h8"/>
        </svg>
      </template>

      <!-- App-specific floating icons - Elimu/LMS -->
      <template v-else-if="appId === 'elimu'">
        <!-- Book -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <!-- Graduation Cap -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
        <!-- Pencil -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
        <!-- Calculator -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/>
        </svg>
      </template>

      <!-- App-specific floating icons - ERP -->
      <template v-else-if="appId === 'erp'">
        <!-- Bar Chart -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        <!-- Building -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/>
        </svg>
        <!-- Gears -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <!-- Pie Chart -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
        </svg>
      </template>

      <!-- App-specific floating icons - Admin -->
      <template v-else-if="appId === 'admin'">
        <!-- Shield Check -->
        <svg class="absolute left-[5%] top-[15%] size-20" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
        </svg>
        <!-- Grid/Dashboard -->
        <svg class="absolute right-[8%] top-[20%] size-24" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        <!-- Users/Team -->
        <svg class="absolute bottom-[25%] left-[10%] size-18" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <!-- Key -->
        <svg class="absolute bottom-[35%] right-[12%] size-16" :style="{ color: appColor }" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" viewBox="0 0 24 24">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
        </svg>
      </template>

      <!-- Gradient Orbs -->
      <div
        class="absolute -right-32 -top-32 size-96 rounded-full opacity-20 blur-3xl"
        :style="{ background: `radial-gradient(circle, ${appColor}40 0%, transparent 70%)` }"
      ></div>
      <div
        class="absolute -bottom-32 -left-32 size-96 rounded-full opacity-20 blur-3xl"
        :style="{ background: `radial-gradient(circle, ${appColor}30 0%, transparent 70%)` }"
      ></div>
    </div>

    <!-- Topbar -->
    <header class="relative z-10 border-b border-gray-200/60 bg-white/60 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <button
          class="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
          @click="$emit('backToHome')"
        >
          <img
            :src="logoPath"
            :alt="appConfig.name"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
      <div class="w-full max-w-sm">
        <!-- Card Container -->
        <div class="rounded-xl border border-gray-200/60 bg-white/70 p-4 shadow-lg shadow-gray-200/40 backdrop-blur-md sm:p-6">
          <!-- Header -->
          <div class="-mx-4 -mt-1 mb-4 border-b border-gray-200/60 px-4 pb-3 sm:-mx-6 sm:-mt-2 sm:px-6">
            <h1 class="text-base font-semibold leading-tight text-gray-900">
              {{ title }}
            </h1>
            <p v-if="subtitle" class="text-xs text-gray-500">
              {{ subtitle }}
            </p>
          </div>

          <!-- Form Content -->
          <slot />
        </div>

        <!-- Footer Slot -->
        <div class="mt-6">
          <slot name="footer" />
        </div>
      </div>

      <!-- Bottom Links -->
      <div class="mt-10 text-center text-xs text-gray-400">
        <slot name="bottomLinks">
          <span>&copy; {{ new Date().getFullYear() }} <a href="https://techsavanna.co.ke" target="_blank" rel="noopener noreferrer" class="hover:text-gray-600">TechSavanna</a>. All rights reserved.</span>
        </slot>
      </div>
    </main>
  </div>
</template>
