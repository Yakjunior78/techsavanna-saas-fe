<script setup lang="ts">
import { ref, computed } from 'vue'
import { SAVANNA_APPS } from '@techsavanna/shared'
import Button from '../base/Button.vue'

interface Props {
  appId?: string
  apkUrl?: string
  apkVersion?: string
  apkSize?: string
  androidUrl?: string
  iosUrl?: string
  windowsUrl?: string
  macUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: 'pos',
  apkVersion: '1.0.0',
  apkSize: '25 MB'
})

const appConfig = computed(() => {
  if (props.appId && SAVANNA_APPS[props.appId]) {
    return SAVANNA_APPS[props.appId]
  }
  return SAVANNA_APPS.pos
})

const logoPath = computed(() => appConfig.value.logo)
const appColor = computed(() => appConfig.value.primaryColor || '#3B82F6')

// Track which platform user is interested in
const selectedPlatform = ref<'android' | 'ios' | 'windows' | 'mac' | null>(null)

// Detect user's platform
const userPlatform = computed(() => {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('android')) return 'android'
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios'
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'windows'
  return 'unknown'
})

const platforms = computed(() => [
  {
    id: 'android',
    name: 'Android',
    icon: 'android',
    storeUrl: props.androidUrl,
    storeName: 'Google Play',
    apkUrl: props.apkUrl,
    apkVersion: props.apkVersion,
    apkSize: props.apkSize,
    available: !!props.androidUrl || !!props.apkUrl
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: 'apple',
    storeUrl: props.iosUrl,
    storeName: 'App Store',
    available: !!props.iosUrl
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'windows',
    storeUrl: props.windowsUrl,
    storeName: 'Microsoft Store',
    available: !!props.windowsUrl
  },
  {
    id: 'mac',
    name: 'macOS',
    icon: 'apple',
    storeUrl: props.macUrl,
    storeName: 'Mac App Store',
    available: !!props.macUrl
  }
])

const features = [
  {
    icon: 'offline',
    title: 'Works Offline',
    description: 'Continue working even without internet connection'
  },
  {
    icon: 'sync',
    title: 'Auto Sync',
    description: 'Data syncs automatically when you\'re back online'
  },
  {
    icon: 'notifications',
    title: 'Push Notifications',
    description: 'Stay updated with real-time alerts and reminders'
  },
  {
    icon: 'biometric',
    title: 'Biometric Login',
    description: 'Secure access with fingerprint or face recognition'
  }
]

const requirements = {
  android: {
    os: 'Android 8.0 or later',
    storage: '100 MB free space',
    ram: '2 GB RAM recommended'
  },
  ios: {
    os: 'iOS 14.0 or later',
    storage: '150 MB free space',
    devices: 'iPhone, iPad, iPod touch'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <a href="/" class="flex cursor-pointer items-center transition-opacity hover:opacity-70">
          <img
            :src="logoPath"
            :alt="appConfig.name"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="relative overflow-hidden border-b border-gray-100">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
        <div class="absolute right-0 top-0 h-80 w-80 rounded-full opacity-50 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}20 0%, transparent 70%)` }"></div>
        <div class="absolute -left-20 bottom-0 h-56 w-56 rounded-full opacity-40 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}15 0%, transparent 70%)` }"></div>
      </div>

      <div class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Download {{ appConfig.name }}
          </h1>
          <p class="mx-auto mt-3 max-w-2xl text-base text-gray-500">
            Get the {{ appConfig.name }} app on your device for the best experience. Available on multiple platforms.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <!-- Platform Cards -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Android Card -->
        <div
          v-if="platforms[0].available"
          class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
        >
          <div class="flex items-start gap-4">
            <!-- Android Icon -->
            <div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <svg class="size-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 2.047a.5.5 0 0 0-.682.182l-1.61 2.79a7.94 7.94 0 0 0-6.462 0l-1.61-2.79a.5.5 0 1 0-.865.5l1.56 2.703A7.97 7.97 0 0 0 4 11.5h16a7.97 7.97 0 0 0-3.854-5.568l1.56-2.703a.5.5 0 0 0-.183-.682zM8.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM4 12.5v7A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-7H4zm-2.5 0v5a1.5 1.5 0 0 0 3 0v-5a1.5 1.5 0 0 0-3 0zm19 0v5a1.5 1.5 0 0 0 3 0v-5a1.5 1.5 0 0 0-3 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900">Android</h2>
              <p class="mt-1 text-sm text-gray-500">{{ requirements.android.os }}</p>
            </div>
          </div>

          <!-- Download Options -->
          <div class="mt-6 space-y-3">
            <!-- Google Play Store -->
            <a
              v-if="androidUrl"
              :href="androidUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100"
            >
              <div class="flex items-center gap-3">
                <svg class="size-8" viewBox="0 0 512 512">
                  <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                  <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                  <path fill="#FBBC04" d="M325.3 277.6l-60.1-60.1L47 512l258.3-145.7 20-88.7z"/>
                  <path fill="#EA4335" d="M507.7 256l-74.4-42.9-68 68 68 68 74.4-42.9c20.4-11.7 20.4-38.5 0-50.2z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-500">GET IT ON</p>
                  <p class="text-sm font-semibold text-gray-900">Google Play</p>
                </div>
              </div>
              <svg class="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>

            <!-- Direct APK Download -->
            <a
              v-if="apkUrl"
              :href="apkUrl"
              class="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 transition-all hover:border-green-300 hover:bg-green-100"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-8 items-center justify-center rounded-lg bg-green-600">
                  <svg class="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">Download APK</p>
                  <p class="text-xs text-gray-500">Version {{ apkVersion }} ({{ apkSize }})</p>
                </div>
              </div>
              <svg class="size-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </a>
          </div>

          <!-- Requirements -->
          <div class="mt-6 rounded-lg bg-gray-50 p-4">
            <p class="text-xs font-medium text-gray-500">REQUIREMENTS</p>
            <ul class="mt-2 space-y-1 text-sm text-gray-600">
              <li>{{ requirements.android.os }}</li>
              <li>{{ requirements.android.storage }}</li>
              <li>{{ requirements.android.ram }}</li>
            </ul>
          </div>
        </div>

        <!-- iOS Card -->
        <div
          class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          :class="{ 'opacity-75': !platforms[1].available }"
        >
          <div class="flex items-start gap-4">
            <!-- Apple Icon -->
            <div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <svg class="size-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900">iOS</h2>
              <p class="mt-1 text-sm text-gray-500">{{ requirements.ios.os }}</p>
            </div>
          </div>

          <!-- Download Options -->
          <div class="mt-6 space-y-3">
            <!-- App Store -->
            <a
              v-if="iosUrl"
              :href="iosUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100"
            >
              <div class="flex items-center gap-3">
                <svg class="size-8" viewBox="0 0 120 40">
                  <rect width="120" height="40" rx="6" fill="#000"/>
                  <text x="42" y="12" fill="#fff" font-size="8" font-family="system-ui">Download on the</text>
                  <text x="42" y="28" fill="#fff" font-size="14" font-weight="600" font-family="system-ui">App Store</text>
                  <path fill="#fff" d="M24.769 20.3a4.949 4.949 0 012.356-4.151 5.066 5.066 0 00-3.99-2.158c-1.68-.176-3.308 1.005-4.164 1.005-.872 0-2.19-.988-3.608-.958a5.315 5.315 0 00-4.473 2.728c-1.934 3.348-.491 8.269 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.025 2.426-1.332 3.32-2.67a10.962 10.962 0 001.52-3.092 4.782 4.782 0 01-2.92-4.4zM22.037 12.21a4.872 4.872 0 001.115-3.49 4.957 4.957 0 00-3.208 1.66 4.636 4.636 0 00-1.144 3.36 4.1 4.1 0 003.237-1.53z" transform="translate(3,6) scale(0.7)"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-500">Download on the</p>
                  <p class="text-sm font-semibold text-gray-900">App Store</p>
                </div>
              </div>
              <svg class="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>

            <!-- Coming Soon -->
            <div
              v-else
              class="flex items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-8 items-center justify-center rounded-lg bg-gray-200">
                  <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600">Coming Soon</p>
                  <p class="text-xs text-gray-500">iOS app is under development</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements -->
          <div class="mt-6 rounded-lg bg-gray-50 p-4">
            <p class="text-xs font-medium text-gray-500">REQUIREMENTS</p>
            <ul class="mt-2 space-y-1 text-sm text-gray-600">
              <li>{{ requirements.ios.os }}</li>
              <li>{{ requirements.ios.storage }}</li>
              <li>{{ requirements.ios.devices }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- App Features -->
      <div class="mt-16">
        <h2 class="text-center text-xl font-bold text-gray-900">Why Download the App?</h2>
        <p class="mt-2 text-center text-sm text-gray-500">Get the most out of {{ appConfig.name }} with our mobile app</p>

        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="rounded-xl border border-gray-200 bg-white p-5 text-center"
          >
            <div
              class="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl"
              :style="{ backgroundColor: `${appColor}15` }"
            >
              <!-- Offline Icon -->
              <svg v-if="feature.icon === 'offline'" class="size-6" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"/>
              </svg>
              <!-- Sync Icon -->
              <svg v-else-if="feature.icon === 'sync'" class="size-6" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <!-- Notifications Icon -->
              <svg v-else-if="feature.icon === 'notifications'" class="size-6" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <!-- Biometric Icon -->
              <svg v-else-if="feature.icon === 'biometric'" class="size-6" :style="{ color: appColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900">{{ feature.title }}</h3>
            <p class="mt-1 text-xs text-gray-500">{{ feature.description }}</p>
          </div>
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="mt-8 border-t border-gray-200/80 bg-gray-50/50 py-10">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }}
            <a href="https://techsavanna.co.ke" target="_blank" rel="noopener noreferrer" class="font-medium hover:text-gray-700">TechSavanna</a>.
            All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <a href="/privacy-policy" class="transition-colors hover:text-gray-700">Privacy</a>
            <a href="/terms-of-service" class="transition-colors hover:text-gray-700">Terms</a>
            <a href="/contact" class="transition-colors hover:text-gray-700">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
