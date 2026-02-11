<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS, slugify } from '@techsavanna/shared'
import { useAuth } from '@techsavanna/auth'

const router = useRouter()
const appConfig = SAVANNA_APPS.people
const appDomain = import.meta.env.VITE_PEOPLE_DOMAIN || 'saas.techsavanna.technology'
const { user, fullName, initials, logout } = useAuth()

const dashboardUrl = computed(() => {
  const tenantName = user.value?.tenantName
  const subdomain = tenantName ? slugify(tenantName) : ''
  return subdomain ? `https://${subdomain}.${appDomain}` : '#'
})

async function handleLogout() {
  await logout()
  router.push('/login')
}

const quickActions = [
  { icon: 'users', label: 'Employees', description: 'Manage your team', color: 'indigo' },
  { icon: 'calendar', label: 'Leave Requests', description: 'Review time-off requests', color: 'blue' },
  { icon: 'chart', label: 'Reports', description: 'HR analytics & insights', color: 'amber' },
  { icon: 'settings', label: 'Settings', description: 'HR configuration', color: 'violet' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <img
            :src="appConfig.logo"
            :alt="appConfig.name"
            class="h-8 max-w-[160px] w-auto object-contain"
          />
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2.5">
            <div
              class="flex size-8 items-center justify-center rounded-full ring-2 ring-white text-[11px] font-semibold text-white shadow-sm"
              style="background-color: #6366F1"
            >
              {{ initials }}
            </div>
            <span class="hidden text-[13px] font-medium text-gray-600 sm:block">{{ fullName }}</span>
          </div>
          <button
            class="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            @click="handleLogout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Welcome back, {{ user?.firstName }}!</h1>
        <p class="mt-1 text-sm text-gray-500">Here's your {{ appConfig.shortName }} dashboard overview.</p>
      </div>

      <!-- Workspace Card -->
      <div class="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-5">
          <h2 class="text-lg font-semibold text-white">Your Workspace</h2>
          <p class="mt-0.5 text-sm text-indigo-100">{{ user?.tenantName || 'My Business' }}</p>
        </div>
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <p class="text-sm text-gray-500">Workspace URL</p>
            <p class="text-sm font-medium text-gray-900">{{ dashboardUrl }}</p>
          </div>
          <a
            :href="dashboardUrl"
            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Open Workspace
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p class="text-sm text-gray-500">Common tasks to get you started</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="action in quickActions"
          :key="action.label"
          :href="dashboardUrl"
          class="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
        >
          <div
            class="flex size-10 items-center justify-center rounded-lg"
            :class="{
              'bg-indigo-50': action.color === 'indigo',
              'bg-blue-50': action.color === 'blue',
              'bg-amber-50': action.color === 'amber',
              'bg-violet-50': action.color === 'violet'
            }"
          >
            <!-- Users icon -->
            <svg v-if="action.icon === 'users'" class="size-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
            </svg>
            <!-- Calendar icon -->
            <svg v-else-if="action.icon === 'calendar'" class="size-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
            </svg>
            <!-- Chart icon -->
            <svg v-else-if="action.icon === 'chart'" class="size-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
            </svg>
            <!-- Settings icon -->
            <svg v-else class="size-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ action.label }}</p>
            <p class="text-xs text-gray-500">{{ action.description }}</p>
          </div>
        </a>
      </div>

      <!-- Account Info -->
      <div class="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h3 class="text-sm font-semibold text-gray-900">Account Details</h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-xs text-gray-400">Full Name</p>
            <p class="mt-0.5 text-sm text-gray-900">{{ fullName }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400">Email</p>
            <p class="mt-0.5 text-sm text-gray-900">{{ user?.email }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400">Organization</p>
            <p class="mt-0.5 text-sm text-gray-900">{{ user?.tenantName || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400">Role</p>
            <p class="mt-0.5 text-sm capitalize text-gray-900">{{ user?.role || 'Owner' }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
