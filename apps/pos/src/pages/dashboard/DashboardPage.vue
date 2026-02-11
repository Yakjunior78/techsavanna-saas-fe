<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS, slugify } from '@techsavanna/shared'
import { useAuth } from '@techsavanna/auth'
import { DashboardLayout, type SidebarItem } from '@techsavanna/ui'

const router = useRouter()
const appConfig = SAVANNA_APPS.pos
const appDomain = import.meta.env.VITE_POS_DOMAIN || 'saas.techsavanna.technology'
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

const sidebarItems: SidebarItem[] = [
  { id: 'tenants', label: 'My Tenants', icon: 'building' },
  { id: 'payments', label: 'My Payments', icon: 'credit-card' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'receipt' },
  { id: 'account', label: 'My Account', icon: 'user' },
  { id: 'settings', label: 'Settings', icon: 'cog' }
]

const activeSidebarId = ref('tenants')

function handleNavigate(id: string) {
  activeSidebarId.value = id
}
</script>

<template>
  <DashboardLayout
    :app-config="appConfig"
    :user-name="fullName"
    :user-initials="initials"
    :organization-name="user?.tenantName"
    :avatar-color="appConfig.primaryColor"
    :sidebar-items="sidebarItems"
    :active-sidebar-id="activeSidebarId"
    @logout="handleLogout"
    @navigate="handleNavigate"
  >
    <!-- My Tenants -->
    <template v-if="activeSidebarId === 'tenants'">
      <div class="mx-auto w-full max-w-md pt-8">
        <div class="mb-4">
          <h2 class="text-base font-semibold text-gray-900">My Tenants</h2>
          <p class="mt-0.5 text-xs text-gray-500">Your active workspaces and subscriptions.</p>
        </div>
        <div class="space-y-3">
        <a
          :href="dashboardUrl"
          class="group block cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-200 hover:shadow-md"
        >
          <div class="flex items-start gap-4 p-4">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
              <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z"/>
                <path fill-rule="evenodd" d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-6Zm15 0a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 .75-.75ZM6 12a.75.75 0 0 1 .75-.75H7a.75.75 0 0 1 0 1.5h-.25A.75.75 0 0 1 6 12Zm3 0a.75.75 0 0 1 .75-.75H10a.75.75 0 0 1 0 1.5h-.25A.75.75 0 0 1 9 12Zm0 3a.75.75 0 0 1 .75-.75H10a.75.75 0 0 1 0 1.5h-.25A.75.75 0 0 1 9 15Zm-3 0a.75.75 0 0 1 .75-.75H7a.75.75 0 0 1 0 1.5h-.25A.75.75 0 0 1 6 15Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-900">{{ user?.tenantName || 'My Business' }}</p>
                <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                  <span class="size-1 rounded-full bg-blue-500"></span>
                  Active
                </span>
              </div>
              <p class="mt-0.5 truncate text-xs text-gray-400">{{ dashboardUrl }}</p>
            </div>
            <svg class="size-4 shrink-0 text-gray-300 transition-colors group-hover:text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"/>
            </svg>
          </div>
        </a>
        </div>
      </div>
    </template>

    <!-- My Payments -->
    <template v-else-if="activeSidebarId === 'payments'">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
          <div class="mx-auto flex size-10 items-center justify-center rounded-full bg-gray-100">
            <svg class="size-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
              <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd"/>
            </svg>
          </div>
          <p class="mt-2.5 text-xs text-gray-500">No payment history yet.</p>
        </div>
      </div>
    </template>

    <!-- My Subscriptions -->
    <template v-else-if="activeSidebarId === 'subscriptions'">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
          <div class="mx-auto flex size-10 items-center justify-center rounded-full bg-gray-100">
            <svg class="size-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd"/>
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"/>
            </svg>
          </div>
          <p class="mt-2.5 text-xs text-gray-500">No active subscriptions.</p>
        </div>
      </div>
    </template>

    <!-- My Account -->
    <template v-else-if="activeSidebarId === 'account'">
      <div class="mx-auto w-full max-w-md pt-8">
        <div class="mb-4">
          <h2 class="text-base font-semibold text-gray-900">My Account</h2>
          <p class="mt-0.5 text-xs text-gray-500">Manage your personal information and preferences.</p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-[10px] font-medium uppercase tracking-wider text-gray-400">Full Name</p>
              <p class="mt-1 text-sm text-gray-900">{{ fullName }}</p>
            </div>
            <div>
              <p class="text-[10px] font-medium uppercase tracking-wider text-gray-400">Email</p>
              <p class="mt-1 text-sm text-gray-900">{{ user?.email }}</p>
            </div>
            <div>
              <p class="text-[10px] font-medium uppercase tracking-wider text-gray-400">Organization</p>
              <p class="mt-1 text-sm text-gray-900">{{ user?.tenantName || '—' }}</p>
            </div>
            <div>
              <p class="text-[10px] font-medium uppercase tracking-wider text-gray-400">Role</p>
              <p class="mt-1 text-sm capitalize text-gray-900">{{ user?.role || 'Owner' }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Settings -->
    <template v-else-if="activeSidebarId === 'settings'">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
        <div class="mx-auto flex size-10 items-center justify-center rounded-full bg-gray-100">
          <svg class="size-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd"/>
          </svg>
        </div>
          <p class="mt-2.5 text-xs text-gray-500">Settings coming soon.</p>
        </div>
      </div>
    </template>
  </DashboardLayout>
</template>
