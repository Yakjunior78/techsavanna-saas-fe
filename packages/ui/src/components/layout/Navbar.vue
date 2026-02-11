<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { AppConfig } from '@techsavanna/shared'
import Button from '../base/Button.vue'

interface NavLink {
  label: string
  href: string
}

interface Props {
  appConfig: AppConfig
  links?: NavLink[]
  showAuth?: boolean
  isAuthenticated?: boolean
  userName?: string
  userInitials?: string
  siteUrl?: string
}

withDefaults(defineProps<Props>(), {
  links: () => [],
  showAuth: true,
  isAuthenticated: false,
  userName: '',
  userInitials: '',
  siteUrl: ''
})

defineEmits<{
  login: []
  signup: []
  logout: []
}>()

const isMobileMenuOpen = ref(false)
const showUserMenu = ref(false)

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu-container')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center">
          <img
            :src="appConfig.logo"
            :alt="appConfig.name"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-6 md:flex">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- User dropdown (authenticated) -->
        <div v-if="isAuthenticated" class="user-menu-container relative hidden md:block">
          <button
            class="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 transition-all hover:bg-gray-100/80"
            @click.stop="toggleUserMenu"
          >
            <div
              class="flex size-7 items-center justify-center rounded-full ring-2 ring-white text-[11px] font-semibold text-white shadow-sm"
              :style="{ backgroundColor: appConfig.primaryColor }"
            >
              {{ userInitials }}
            </div>
            <span class="max-w-[100px] truncate text-[13px] font-medium text-gray-600">{{ userName }}</span>
            <svg class="size-3 text-gray-400/70 transition-transform" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div
              v-if="showUserMenu"
              class="absolute right-0 top-full z-50 mt-1.5 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50"
            >
              <div class="border-b border-gray-100 px-4 py-3">
                <p class="truncate text-sm font-medium text-gray-900">{{ userName }}</p>
              </div>
              <div class="py-1">
                <a
                  href="/dashboard"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg class="size-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd"/>
                  </svg>
                  Dashboard
                </a>
                <a
                  v-if="siteUrl"
                  :href="siteUrl"
                  target="_blank"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg class="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                  </svg>
                  View My Site
                </a>
                <button
                  class="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  @click="$emit('logout')"
                >
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Auth Buttons (not authenticated) -->
        <div v-else-if="showAuth" class="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" @click="$emit('login')">
            Log in
          </Button>
          <Button size="sm" @click="$emit('signup')">
            Get Started
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="p-2 text-gray-600 md:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="border-t border-gray-200 bg-white md:hidden"
    >
      <div class="space-y-1 px-4 py-4">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
        >
          {{ link.label }}
        </a>

        <!-- Mobile: authenticated user -->
        <div v-if="isAuthenticated" class="mt-4 border-t border-gray-200 pt-4">
          <div class="mb-3 flex items-center gap-3 px-3">
            <div
              class="flex size-8 items-center justify-center rounded-full ring-2 ring-white text-[11px] font-semibold text-white shadow-sm"
              :style="{ backgroundColor: appConfig.primaryColor }"
            >
              {{ userInitials }}
            </div>
            <span class="text-[13px] font-medium text-gray-900">{{ userName }}</span>
          </div>
          <a
            href="/dashboard"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
          >
            <svg class="size-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd"/>
            </svg>
            Dashboard
          </a>
          <a
            v-if="siteUrl"
            :href="siteUrl"
            target="_blank"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
          >
            <svg class="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
            View My Site
          </a>
          <button
            class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
            @click="$emit('logout')"
          >
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
            </svg>
            Log out
          </button>
        </div>

        <!-- Mobile: not authenticated -->
        <div v-else-if="showAuth" class="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
          <Button variant="outline" fullWidth @click="$emit('login')">
            Log in
          </Button>
          <Button fullWidth @click="$emit('signup')">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
