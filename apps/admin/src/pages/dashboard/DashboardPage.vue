<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS, getAppUrl, type AppId } from '@techsavanna/shared'
import { useAuth } from '@techsavanna/auth'
import { DashboardLayout, type SidebarItem } from '@techsavanna/ui'

const router = useRouter()
const appConfig = SAVANNA_APPS.admin
const { user, fullName, initials, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/')
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'tenants', label: 'All Tenants', icon: 'building' },
  { id: 'payments', label: 'Payments', icon: 'credit-card' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'receipt' },
  { id: 'applications', label: 'Applications', icon: 'globe' },
  { id: 'admin-users', label: 'Admin Users', icon: 'users' },
  { id: 'settings', label: 'Settings', icon: 'cog' }
]

const activeSidebarId = ref('overview')

function handleNavigate(id: string) {
  activeSidebarId.value = id
}

function openApp(appId: string) {
  window.open(getAppUrl(appId as AppId), '_blank')
}

// Mock stats
const stats = [
  { label: 'Total Users', value: '12,456', change: '+12%', trend: 'up' },
  { label: 'Active Subscriptions', value: '8,234', change: '+8%', trend: 'up' },
  { label: 'Monthly Revenue', value: 'KES 2.4M', change: '+15%', trend: 'up' },
  { label: 'Support Tickets', value: '23', change: '-5%', trend: 'down' }
]

const apps = computed(() => Object.values(SAVANNA_APPS).filter(a => a.id !== 'admin'))

// Mock tenants
const tenants = [
  { name: 'Greenfield Academy', product: 'Elimu', status: 'active', plan: 'Pro', created: '2025-12-01' },
  { name: 'Metro Retail Ltd', product: 'POS', status: 'active', plan: 'Business', created: '2025-11-15' },
  { name: 'Savanna Corp', product: 'ERP', status: 'active', plan: 'Enterprise', created: '2025-10-20' },
  { name: 'Horizon HR Solutions', product: 'People', status: 'provisioning', plan: 'Pro', created: '2026-01-10' },
  { name: 'CloudNine Schools', product: 'Elimu', status: 'active', plan: 'Business', created: '2025-09-05' },
  { name: 'QuickMart Kenya', product: 'POS', status: 'suspended', plan: 'Starter', created: '2025-08-22' },
  { name: 'TechBridge Ltd', product: 'ERP', status: 'active', plan: 'Pro', created: '2026-01-25' },
  { name: 'PeoplePlus Inc', product: 'People', status: 'active', plan: 'Enterprise', created: '2025-11-30' }
]

// Mock payments
const payments = [
  { tenant: 'Greenfield Academy', amount: 'KES 15,000', product: 'Elimu', date: '2026-02-01', status: 'completed' },
  { tenant: 'Metro Retail Ltd', amount: 'KES 8,500', product: 'POS', date: '2026-02-01', status: 'completed' },
  { tenant: 'Savanna Corp', amount: 'KES 45,000', product: 'ERP', date: '2026-01-28', status: 'completed' },
  { tenant: 'Horizon HR Solutions', amount: 'KES 12,000', product: 'People', date: '2026-01-25', status: 'pending' },
  { tenant: 'CloudNine Schools', amount: 'KES 22,000', product: 'Elimu', date: '2026-01-20', status: 'completed' },
  { tenant: 'QuickMart Kenya', amount: 'KES 5,000', product: 'POS', date: '2026-01-15', status: 'failed' }
]

// Mock subscriptions
const subscriptions = [
  { tenant: 'Greenfield Academy', plan: 'Pro', product: 'Elimu', status: 'active', renewal: '2026-03-01' },
  { tenant: 'Metro Retail Ltd', plan: 'Business', product: 'POS', status: 'active', renewal: '2026-03-01' },
  { tenant: 'Savanna Corp', plan: 'Enterprise', product: 'ERP', status: 'active', renewal: '2026-04-20' },
  { tenant: 'Horizon HR Solutions', plan: 'Pro', product: 'People', status: 'trial', renewal: '2026-02-25' },
  { tenant: 'CloudNine Schools', plan: 'Business', product: 'Elimu', status: 'active', renewal: '2026-03-05' },
  { tenant: 'QuickMart Kenya', plan: 'Starter', product: 'POS', status: 'expired', renewal: '2026-01-22' },
  { tenant: 'TechBridge Ltd', plan: 'Pro', product: 'ERP', status: 'active', renewal: '2026-04-25' },
  { tenant: 'PeoplePlus Inc', plan: 'Enterprise', product: 'People', status: 'active', renewal: '2026-03-30' }
]

// Mock admin users
const adminUsers = ref([
  { name: 'John Kamau', email: 'john@techsavanna.co.ke', role: 'Super Admin', status: 'active' },
  { name: 'Grace Wanjiru', email: 'grace@techsavanna.co.ke', role: 'Admin', status: 'active' },
  { name: 'David Ochieng', email: 'david@techsavanna.co.ke', role: 'Admin', status: 'active' },
  { name: 'Amina Hassan', email: 'amina@techsavanna.co.ke', role: 'Viewer', status: 'invited' }
])

const showInviteForm = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('Admin')

function handleInvite() {
  if (!inviteEmail.value) return
  adminUsers.value.push({
    name: inviteEmail.value.split('@')[0],
    email: inviteEmail.value,
    role: inviteRole.value,
    status: 'invited'
  })
  inviteEmail.value = ''
  inviteRole.value = 'Admin'
  showInviteForm.value = false
}

function productColor(product: string) {
  const colors: Record<string, string> = {
    Elimu: 'bg-amber-50 text-amber-700',
    ERP: 'bg-violet-50 text-violet-700',
    People: 'bg-indigo-50 text-indigo-700',
    POS: 'bg-blue-50 text-blue-700'
  }
  return colors[product] || 'bg-gray-50 text-gray-700'
}

function statusColor(status: string) {
  const colors: Record<string, string> = {
    active: 'bg-blue-50 text-blue-700',
    completed: 'bg-blue-50 text-blue-700',
    provisioning: 'bg-blue-50 text-blue-700',
    trial: 'bg-blue-50 text-blue-700',
    pending: 'bg-amber-50 text-amber-700',
    invited: 'bg-amber-50 text-amber-700',
    suspended: 'bg-red-50 text-red-700',
    failed: 'bg-red-50 text-red-700',
    expired: 'bg-gray-100 text-gray-600'
  }
  return colors[status] || 'bg-gray-100 text-gray-600'
}

function statusDot(status: string) {
  const colors: Record<string, string> = {
    active: 'bg-blue-500',
    completed: 'bg-blue-500',
    provisioning: 'bg-blue-500',
    trial: 'bg-blue-500',
    pending: 'bg-amber-500',
    invited: 'bg-amber-500',
    suspended: 'bg-red-500',
    failed: 'bg-red-500',
    expired: 'bg-gray-400'
  }
  return colors[status] || 'bg-gray-400'
}
</script>

<template>
  <DashboardLayout
    :app-config="appConfig"
    :user-name="fullName || 'Admin'"
    :user-initials="initials || 'A'"
    :organization-name="'TechSavanna'"
    :avatar-color="appConfig.primaryColor"
    :sidebar-items="sidebarItems"
    :active-sidebar-id="activeSidebarId"
    @logout="handleLogout"
    @navigate="handleNavigate"
  >
    <!-- Overview -->
    <template v-if="activeSidebarId === 'overview'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">Dashboard</h1>
        <p class="mt-0.5 text-xs text-gray-500">Welcome back! Here's an overview of your Savanna ecosystem.</p>
      </div>

      <!-- Stats -->
      <div class="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p class="text-[10px] font-medium uppercase tracking-wide text-gray-400">{{ stat.label }}</p>
          <div class="mt-1.5 flex items-baseline gap-2">
            <span class="text-xl font-bold text-gray-900">{{ stat.value }}</span>
            <span
              class="text-[10px] font-medium"
              :class="stat.trend === 'up' ? 'text-blue-600' : 'text-red-600'"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Tenants -->
      <div class="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 class="text-xs font-semibold text-gray-900">Recent Tenants</h3>
          <button
            class="cursor-pointer text-[10px] font-medium text-slate-500 hover:text-slate-700"
            @click="activeSidebarId = 'tenants'"
          >
            View all
          </button>
        </div>
        <div class="divide-y divide-gray-50">
          <div
            v-for="tenant in tenants.slice(0, 4)"
            :key="tenant.name"
            class="flex items-center justify-between px-4 py-2.5"
          >
            <div class="flex items-center gap-3">
              <div class="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                <svg class="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-900">{{ tenant.name }}</p>
                <p class="text-[10px] text-gray-400">{{ tenant.created }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="rounded-full px-1.5 py-0.5 text-[10px] font-medium" :class="productColor(tenant.product)">
                {{ tenant.product }}
              </span>
              <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize" :class="statusColor(tenant.status)">
                <span class="size-1 rounded-full" :class="statusDot(tenant.status)"></span>
                {{ tenant.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Apps Grid -->
      <div>
        <h3 class="mb-3 text-xs font-semibold text-gray-900">Applications</h3>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="app in apps"
            :key="app.id"
            class="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            @click="openApp(app.id)"
          >
            <div class="absolute inset-x-0 top-0 h-0.5" :class="`bg-gradient-to-r ${app.gradientFrom} ${app.gradientTo}`"></div>
            <div class="mb-3 flex items-center justify-between">
              <img :src="app.logoIcon" :alt="app.name" class="size-9 rounded-lg object-contain shadow-sm" />
              <svg class="size-3.5 text-gray-300 transition-colors group-hover:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81l-8.97 8.97a.75.75 0 0 1-1.06-1.06l8.97-8.97h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h4 class="text-xs font-semibold text-gray-900">{{ app.name }}</h4>
            <p class="mt-0.5 text-[10px] text-gray-500">{{ app.tagline }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- All Tenants -->
    <template v-else-if="activeSidebarId === 'tenants'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">All Tenants</h1>
        <p class="mt-0.5 text-xs text-gray-500">Manage tenants across all products.</p>
      </div>
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50">
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Tenant</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Product</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Plan</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Created</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="tenant in tenants" :key="tenant.name" class="transition-colors hover:bg-gray-50/50">
                <td class="px-4 py-2.5">
                  <div class="flex items-center gap-2.5">
                    <div class="flex size-7 items-center justify-center rounded-lg bg-gray-100">
                      <svg class="size-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-900">{{ tenant.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-2.5">
                  <span class="rounded-full px-1.5 py-0.5 text-[10px] font-medium" :class="productColor(tenant.product)">{{ tenant.product }}</span>
                </td>
                <td class="px-4 py-2.5 text-xs text-gray-600">{{ tenant.plan }}</td>
                <td class="px-4 py-2.5">
                  <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize" :class="statusColor(tenant.status)">
                    <span class="size-1 rounded-full" :class="statusDot(tenant.status)"></span>
                    {{ tenant.status }}
                  </span>
                </td>
                <td class="px-4 py-2.5 text-xs text-gray-400">{{ tenant.created }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Payments -->
    <template v-else-if="activeSidebarId === 'payments'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">Payments</h1>
        <p class="mt-0.5 text-xs text-gray-500">All tenant payments across products.</p>
      </div>
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50">
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Tenant</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Amount</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Product</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Date</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="payment in payments" :key="payment.tenant + payment.date" class="transition-colors hover:bg-gray-50/50">
                <td class="px-4 py-2.5 text-xs font-medium text-gray-900">{{ payment.tenant }}</td>
                <td class="px-4 py-2.5 text-xs font-semibold text-gray-900">{{ payment.amount }}</td>
                <td class="px-4 py-2.5">
                  <span class="rounded-full px-1.5 py-0.5 text-[10px] font-medium" :class="productColor(payment.product)">{{ payment.product }}</span>
                </td>
                <td class="px-4 py-2.5 text-xs text-gray-400">{{ payment.date }}</td>
                <td class="px-4 py-2.5">
                  <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize" :class="statusColor(payment.status)">
                    <span class="size-1 rounded-full" :class="statusDot(payment.status)"></span>
                    {{ payment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Subscriptions -->
    <template v-else-if="activeSidebarId === 'subscriptions'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">Subscriptions</h1>
        <p class="mt-0.5 text-xs text-gray-500">All tenant subscriptions and plans.</p>
      </div>
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50">
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Tenant</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Plan</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Product</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Renewal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="sub in subscriptions" :key="sub.tenant" class="transition-colors hover:bg-gray-50/50">
                <td class="px-4 py-2.5 text-xs font-medium text-gray-900">{{ sub.tenant }}</td>
                <td class="px-4 py-2.5 text-xs text-gray-600">{{ sub.plan }}</td>
                <td class="px-4 py-2.5">
                  <span class="rounded-full px-1.5 py-0.5 text-[10px] font-medium" :class="productColor(sub.product)">{{ sub.product }}</span>
                </td>
                <td class="px-4 py-2.5">
                  <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize" :class="statusColor(sub.status)">
                    <span class="size-1 rounded-full" :class="statusDot(sub.status)"></span>
                    {{ sub.status }}
                  </span>
                </td>
                <td class="px-4 py-2.5 text-xs text-gray-400">{{ sub.renewal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Applications -->
    <template v-else-if="activeSidebarId === 'applications'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">Applications</h1>
        <p class="mt-0.5 text-xs text-gray-500">Manage and access all Savanna applications.</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="app in apps"
          :key="app.id"
          class="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          @click="openApp(app.id)"
        >
          <div class="h-1" :class="`bg-gradient-to-r ${app.gradientFrom} ${app.gradientTo}`"></div>
          <div class="p-4">
            <div class="mb-3 flex items-center justify-between">
              <img :src="app.logoIcon" :alt="app.name" class="size-10 rounded-xl object-contain shadow-sm" />
              <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                <span class="size-1 rounded-full bg-blue-500"></span>
                Active
              </span>
            </div>
            <h4 class="text-sm font-semibold text-gray-900">{{ app.name }}</h4>
            <p class="mt-0.5 text-[10px] text-gray-500">{{ app.tagline }}</p>
            <p class="mt-2 line-clamp-2 text-xs text-gray-400">{{ app.description }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Admin Users -->
    <template v-else-if="activeSidebarId === 'admin-users'">
      <div class="mb-5 flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-gray-900">Admin Users</h1>
          <p class="mt-0.5 text-xs text-gray-500">Manage admin access to the platform.</p>
        </div>
        <button
          class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-900"
          @click="showInviteForm = !showInviteForm"
        >
          <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z"/>
          </svg>
          Invite Admin
        </button>
      </div>

      <!-- Invite Form -->
      <div v-if="showInviteForm" class="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="mb-3 text-xs font-semibold text-gray-900">Invite New Admin</h3>
        <div class="flex items-end gap-3">
          <div class="flex-1">
            <label class="mb-1 block text-[10px] font-medium text-gray-500">Email Address</label>
            <input
              v-model="inviteEmail"
              type="email"
              placeholder="admin@example.com"
              class="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-300 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <div class="w-32">
            <label class="mb-1 block text-[10px] font-medium text-gray-500">Role</label>
            <select
              v-model="inviteRole"
              class="w-full cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
          <button
            class="cursor-pointer rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-900"
            @click="handleInvite"
          >
            Send Invite
          </button>
          <button
            class="cursor-pointer rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            @click="showInviteForm = false"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50">
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Name</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Email</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Role</th>
                <th class="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="adminUser in adminUsers" :key="adminUser.email" class="transition-colors hover:bg-gray-50/50">
                <td class="px-4 py-2.5">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                      :style="{ backgroundColor: appConfig.primaryColor }"
                    >
                      {{ adminUser.name.split(' ').map(n => n[0]).join('') }}
                    </div>
                    <span class="text-xs font-medium text-gray-900">{{ adminUser.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-2.5 text-xs text-gray-500">{{ adminUser.email }}</td>
                <td class="px-4 py-2.5 text-xs text-gray-600">{{ adminUser.role }}</td>
                <td class="px-4 py-2.5">
                  <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize" :class="statusColor(adminUser.status)">
                    <span class="size-1 rounded-full" :class="statusDot(adminUser.status)"></span>
                    {{ adminUser.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Settings -->
    <template v-else-if="activeSidebarId === 'settings'">
      <div class="mb-5">
        <h1 class="text-lg font-bold text-gray-900">Settings</h1>
        <p class="mt-0.5 text-xs text-gray-500">System configuration and preferences.</p>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-5 text-center">
        <div class="mx-auto flex size-10 items-center justify-center rounded-full bg-gray-100">
          <svg class="size-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd"/>
          </svg>
        </div>
        <p class="mt-2.5 text-xs text-gray-500">Settings coming soon.</p>
      </div>
    </template>
  </DashboardLayout>
</template>
