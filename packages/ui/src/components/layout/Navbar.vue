<script setup lang="ts">
import { ref } from 'vue'
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
}

withDefaults(defineProps<Props>(), {
  links: () => [],
  showAuth: true
})

defineEmits<{
  login: []
  signup: []
}>()

const isMobileMenuOpen = ref(false)
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

        <!-- Auth Buttons -->
        <div v-if="showAuth" class="hidden items-center gap-4 md:flex">
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
        <div v-if="showAuth" class="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
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
