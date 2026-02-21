<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { AppConfig } from '@techsavanna/shared'

export interface SidebarItem {
  id: string
  label: string
  icon: string
  route?: string
  active?: boolean
}

const props = defineProps<{
  appConfig: AppConfig
  userName: string
  userInitials: string
  organizationName?: string
  avatarColor?: string
  siteUrl?: string
  sidebarItems: SidebarItem[]
  activeSidebarId?: string
}>()

const emit = defineEmits<{
  logout: []
  navigate: [id: string]
}>()

const sidebarOpen = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const activeItem = computed(() => props.activeSidebarId || props.sidebarItems[0]?.id)
const activeLabel = computed(() => props.sidebarItems.find(i => i.id === activeItem.value)?.label || 'Dashboard')

const footerItemIds = ['account', 'settings']
const mainSidebarItems = computed(() => props.sidebarItems.filter(i => !footerItemIds.includes(i.id)))
const footerSidebarItems = computed(() => props.sidebarItems.filter(i => footerItemIds.includes(i.id)))

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 cursor-pointer bg-black/30 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Sidebar header / logo -->
      <div class="flex h-12 shrink-0 items-center border-b border-gray-100 px-3">
        <a href="/" class="block">
          <img
            :src="appConfig.logo"
            :alt="appConfig.name"
            class="h-6 w-auto max-w-[130px] object-contain"
          />
        </a>
      </div>

      <!-- Main navigation -->
      <nav class="flex-1 overflow-y-auto px-2 py-3">
        <ul class="space-y-0.5">
          <li v-for="item in mainSidebarItems" :key="item.id">
            <button
              class="group/item flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors"
              :class="activeItem === item.id
                ? 'bg-blue-50 text-gray-900 font-semibold border border-blue-200'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700 font-medium border border-transparent'"
              @click="emit('navigate', item.id); sidebarOpen = false"
            >
              <!-- Home solid -->
              <svg v-if="item.icon === 'home'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/>
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/>
              </svg>
              <!-- Building solid -->
              <svg v-else-if="item.icon === 'building'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd"/>
              </svg>
              <!-- Credit card solid -->
              <svg v-else-if="item.icon === 'credit-card'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
                <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd"/>
              </svg>
              <!-- Receipt / Subscriptions solid -->
              <svg v-else-if="item.icon === 'receipt'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd"/>
                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"/>
              </svg>
              <!-- Globe solid -->
              <svg v-else-if="item.icon === 'globe'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738.135l-.572.429a2.907 2.907 0 0 1-3.308.13L9.56 9.16a3.06 3.06 0 0 0-2.71-.453l-1.391.348A8.267 8.267 0 0 1 8.547 4.505ZM8.258 14.436A5.846 5.846 0 0 0 11.392 16c.593 0 1.174-.089 1.72-.259a3.73 3.73 0 0 1 2.258.098l1.677.559a8.303 8.303 0 0 1-6.868 4.352l-.14-.592a3.784 3.784 0 0 0-1.78-2.502l-.694-.416A5.845 5.845 0 0 1 8.258 14.436Z" clip-rule="evenodd"/>
              </svg>
              <!-- Users solid -->
              <svg v-else-if="item.icon === 'users'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
              </svg>
              <!-- Shield solid -->
              <svg v-else-if="item.icon === 'shield'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"/>
              </svg>
              <!-- Fallback solid -->
              <svg v-else class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd"/>
              </svg>
              <span class="flex-1">{{ item.label }}</span>
              <svg class="size-3 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/40' : 'text-gray-200'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"/>
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Sidebar footer: Account + Settings -->
      <div class="shrink-0 border-t border-gray-100 px-2 py-2">
        <ul class="space-y-0.5">
          <li v-for="item in footerSidebarItems" :key="item.id">
            <button
              class="group/item flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors"
              :class="activeItem === item.id
                ? 'bg-blue-50 text-gray-900 font-semibold border border-blue-200'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700 font-medium border border-transparent'"
              @click="emit('navigate', item.id); sidebarOpen = false"
            >
              <!-- User solid -->
              <svg v-if="item.icon === 'user'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"/>
              </svg>
              <!-- Users solid -->
              <svg v-else-if="item.icon === 'users'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
              </svg>
              <!-- Cog solid -->
              <svg v-else-if="item.icon === 'cog'" class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd"/>
              </svg>
              <!-- Fallback -->
              <svg v-else class="size-4 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/60' : 'text-gray-300 group-hover/item:text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd"/>
              </svg>
              <span class="flex-1">{{ item.label }}</span>
              <svg class="size-3 shrink-0" :class="activeItem === item.id ? 'text-[#0f62ae]/40' : 'text-gray-200'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Topbar -->
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-5">
        <!-- Left: hamburger (mobile) + breadcrumb -->
        <div class="flex items-center gap-2">
          <button
            class="cursor-pointer rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            @click="sidebarOpen = !sidebarOpen"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
            </svg>
          </button>
          <nav class="flex items-center gap-1.5 text-xs">
            <span class="text-gray-400">Dashboard</span>
            <svg class="size-3 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium text-gray-700">{{ activeLabel }}</span>
          </nav>
        </div>

        <!-- Right: user avatar with dropdown -->
        <div ref="dropdownRef" class="relative">
          <button
            class="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-gray-50"
            @click="dropdownOpen = !dropdownOpen"
          >
            <div
              class="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
              :style="{ backgroundColor: avatarColor || appConfig.primaryColor }"
            >
              {{ userInitials }}
            </div>
            <div class="hidden text-left sm:block">
              <p class="text-xs font-medium leading-tight text-gray-700">{{ userName }}</p>
              <p v-if="organizationName" class="text-[10px] leading-tight text-gray-400">{{ organizationName }}</p>
            </div>
            <svg class="size-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="dropdownOpen"
            class="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          >
            <div class="border-b border-gray-100 px-3 py-2">
              <p class="text-xs font-medium text-gray-900">{{ userName }}</p>
              <p v-if="organizationName" class="text-[10px] text-gray-400">{{ organizationName }}</p>
            </div>
            <button
              class="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50"
              @click="emit('navigate', 'account'); dropdownOpen = false"
            >
              <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"/>
              </svg>
              View Profile
            </button>
            <a
              v-if="siteUrl"
              :href="siteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50"
              @click="dropdownOpen = false"
            >
              <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81l-8.47 8.47a.75.75 0 1 1-1.06-1.06l8.47-8.47h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd"/>
              </svg>
              Visit Site
            </a>
            <button
              class="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50"
              @click="emit('logout'); dropdownOpen = false"
            >
              <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 0 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <!-- Working area with subtle grid pattern -->
      <main
        class="flex flex-1 flex-col overflow-y-auto px-6 py-5 sm:px-10 lg:px-14"
        style="background-color: #f9fafb; background-image: linear-gradient(to right, #f5f6f8 1px, transparent 1px), linear-gradient(to bottom, #f5f6f8 1px, transparent 1px); background-size: 120px 120px;"
      >
        <div class="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
