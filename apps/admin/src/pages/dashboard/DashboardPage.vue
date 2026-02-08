<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS, getAppUrl, type AppId } from '@techsavanna/shared'

const router = useRouter()

const apps = computed(() => Object.values(SAVANNA_APPS))

// Mock stats
const stats = [
  { label: 'Total Users', value: '12,456', change: '+12%', trend: 'up' },
  { label: 'Active Subscriptions', value: '8,234', change: '+8%', trend: 'up' },
  { label: 'Monthly Revenue', value: 'KES 2.4M', change: '+15%', trend: 'up' },
  { label: 'Support Tickets', value: '23', change: '-5%', trend: 'down' }
]

function handleLogout() {
  router.push('/login')
}

function openApp(appId: string) {
  window.open(getAppUrl(appId as AppId), '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <img
            src="/imgs/Techsavanna/tech_logo_regular.png"
            alt="TechSavanna"
            class="h-8 w-auto"
          />
          <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">Admin</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="flex size-8 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-700">
              A
            </div>
            <span class="hidden text-sm font-medium text-slate-700 sm:block">Admin</span>
          </div>
          <button
            class="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100"
            @click="handleLogout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Welcome back! Here's an overview of your Savanna ecosystem.</p>
      </div>

      <!-- Stats Grid -->
      <div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ stat.label }}</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-slate-900">{{ stat.value }}</span>
            <span
              class="text-xs font-medium"
              :class="stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
      </div>

      <!-- Apps Section -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-slate-900">Applications</h2>
        <p class="text-sm text-slate-500">Manage and access all Savanna applications</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="app in apps"
          :key="app.id"
          class="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
          @click="openApp(app.id)"
        >
          <!-- Gradient accent -->
          <div
            class="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
            :class="`bg-gradient-to-r ${app.gradientFrom} ${app.gradientTo}`"
          ></div>

          <!-- App Icon -->
          <div class="mb-4 flex items-center justify-between">
            <img
              :src="app.logoIcon"
              :alt="app.name"
              class="size-12 rounded-xl object-contain shadow-sm"
            />
            <svg class="size-5 text-slate-300 transition-colors group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <!-- App Info -->
          <h3 class="font-semibold text-slate-900">{{ app.name }}</h3>
          <p class="mt-1 text-xs text-slate-500">{{ app.shortName }}</p>

          <!-- App Description -->
          <p class="mt-3 line-clamp-2 text-sm text-slate-600">{{ app.tagline }}</p>

          <!-- Status Badge -->
          <div class="mt-4 flex items-center gap-2">
            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-10">
        <h2 class="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-sm">
            <div class="flex size-10 items-center justify-center rounded-lg bg-blue-50">
              <svg class="size-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-900">Manage Users</p>
              <p class="text-xs text-slate-500">View and manage all users</p>
            </div>
          </button>
          <button class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-sm">
            <div class="flex size-10 items-center justify-center rounded-lg bg-emerald-50">
              <svg class="size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-900">View Reports</p>
              <p class="text-xs text-slate-500">Analytics and insights</p>
            </div>
          </button>
          <button class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-sm">
            <div class="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <svg class="size-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-900">Billing</p>
              <p class="text-xs text-slate-500">Subscriptions and payments</p>
            </div>
          </button>
          <button class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-sm">
            <div class="flex size-10 items-center justify-center rounded-lg bg-violet-50">
              <svg class="size-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-900">Settings</p>
              <p class="text-xs text-slate-500">System configuration</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
