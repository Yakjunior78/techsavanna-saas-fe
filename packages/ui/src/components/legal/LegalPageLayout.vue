<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SAVANNA_APPS } from '@techsavanna/shared'

interface Props {
  appId?: string
  title: string
  icon?: 'privacy' | 'terms' | 'cookies'
  lastUpdated?: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: 'pos',
  icon: 'privacy',
  lastUpdated: 'January 1, 2025'
})

const appConfig = computed(() => {
  if (props.appId && SAVANNA_APPS[props.appId]) {
    return SAVANNA_APPS[props.appId]
  }
  return SAVANNA_APPS.pos
})

const logoPath = computed(() => appConfig.value.logo)
const appColor = computed(() => appConfig.value.primaryColor || '#3B82F6')

// Table of contents
const sections = ref<{ id: string; title: string }[]>([])
const activeSection = ref('')

function updateSections() {
  const headings = document.querySelectorAll('.legal-content h2[id]')
  sections.value = Array.from(headings).map(h => ({
    id: h.id,
    title: h.textContent || ''
  }))
}

function handleScroll() {
  const headings = document.querySelectorAll('.legal-content h2[id]')
  let current = ''
  headings.forEach(h => {
    const rect = h.getBoundingClientRect()
    if (rect.top <= 120) {
      current = h.id
    }
  })
  activeSection.value = current
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  setTimeout(updateSections, 100)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const iconPaths: Record<string, string> = {
  privacy: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  terms: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  cookies: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

function getIconPath(icon: string): string {
  return iconPaths[icon] || iconPaths.privacy
}

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy', icon: 'privacy' },
  { label: 'Terms of Service', href: '/terms-of-service', icon: 'terms' },
  { label: 'Cookie Policy', href: '/cookie-policy', icon: 'cookies' }
]
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
      <!-- Background decoration -->
      <div class="pointer-events-none absolute inset-0">
        <!-- Gradient base -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>

        <!-- Gradient orbs -->
        <div class="absolute right-0 top-0 h-80 w-80 rounded-full opacity-50 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}20 0%, transparent 70%)` }"></div>
        <div class="absolute -left-20 bottom-0 h-56 w-56 rounded-full opacity-40 blur-3xl" :style="{ background: `radial-gradient(circle, ${appColor}15 0%, transparent 70%)` }"></div>

        <!-- Data Protection Illustrations - Right Side -->
        <div class="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <!-- Shield with checkmark -->
          <svg class="absolute right-[10%] top-[15%] size-16 text-emerald-300/50 sm:size-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>

          <!-- Lock -->
          <svg class="absolute right-[40%] top-[8%] size-10 text-blue-300/45 sm:size-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>

          <!-- Document -->
          <svg class="absolute right-[8%] top-[55%] size-12 text-violet-300/45 sm:size-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>

          <!-- Privacy/User -->
          <svg class="absolute right-[30%] top-[60%] size-8 text-sky-300/40 sm:size-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>

          <!-- Cookie -->
          <svg class="absolute right-[50%] top-[35%] size-8 text-amber-300/40 sm:size-9" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="10.5" cy="8.5" r="1.5"/>
            <circle cx="8.5" cy="13.5" r="1.5"/>
            <circle cx="15" cy="15" r="1"/>
            <path d="M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.98 1-5.77-1.59-5.19-4.56C6.95.71 2 6.58 2 12c0 5.52 4.48 10 10 10 5.89 0 10.54-5.08 9.95-11.01zM12 20c-4.41 0-8-3.59-8-8 0-3.31 2.73-8.18 8.08-8.02.42 2.54 2.44 4.56 4.99 4.94.07.36.52 2.55 2.92 3.63C19.7 16.86 16.06 20 12 20z"/>
          </svg>

          <!-- Key -->
          <svg class="absolute right-[18%] top-[78%] size-7 text-teal-300/35 sm:size-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
      </div>

      <div class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ title }}</h1>
          <p class="mt-2 text-sm text-gray-500">
            Last updated: {{ lastUpdated }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="lg:grid lg:grid-cols-4 lg:gap-12">
        <!-- Sidebar - Table of Contents -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <!-- Table of Contents -->
            <div class="rounded-xl border border-gray-200/80 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
              <p class="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                On this page
              </p>
              <nav class="space-y-0.5">
                <button
                  v-for="section in sections"
                  :key="section.id"
                  class="group relative block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-all duration-200"
                  :class="activeSection === section.id
                    ? 'bg-gray-900 font-medium text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
                  @click="scrollToSection(section.id)"
                >
                  {{ section.title }}
                </button>
              </nav>
            </div>

            <!-- Other Legal Links -->
            <div class="mt-6 rounded-xl border border-gray-200/80 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
              <p class="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Legal Documents
              </p>
              <div class="space-y-0.5">
                <a
                  v-for="link in legalLinks"
                  :key="link.href"
                  :href="link.href"
                  class="block rounded-lg px-3 py-2 text-[13px] text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
        </aside>

        <!-- Content -->
        <div class="lg:col-span-3">
          <div class="legal-content">
            <slot />
          </div>

          <!-- Mobile Legal Links -->
          <div class="mt-12 border-t border-gray-200 pt-8 lg:hidden">
            <p class="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">Other Legal Documents</p>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="link in legalLinks"
                :key="link.href"
                :href="link.href"
                class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                {{ link.label }}
              </a>
            </div>
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
            <a href="/cookie-policy" class="transition-colors hover:text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.legal-content :deep(h2) {
  margin-top: 3rem;
  scroll-margin-top: 7rem;
  padding-bottom: 0.875rem;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #0f172a;
  border-bottom: 2px solid #f1f5f9;
}

.legal-content :deep(h2:first-of-type) {
  margin-top: 0;
}

.legal-content :deep(h3) {
  margin-top: 2rem;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #1e293b;
}

.legal-content :deep(p) {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #475569;
}

.legal-content :deep(ul) {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #475569;
}

.legal-content :deep(ul li) {
  position: relative;
  padding-left: 1.75rem;
  margin-top: 0.75rem;
}

.legal-content :deep(ul li)::before {
  content: '';
  position: absolute;
  left: 0.25rem;
  top: 0.625rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%);
}

.legal-content :deep(a) {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
}

.legal-content :deep(a:hover) {
  color: #1d4ed8;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-content :deep(strong) {
  font-weight: 600;
  color: #1e293b;
}

.legal-content :deep(code) {
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  background-color: #f1f5f9;
  border-radius: 0.375rem;
  color: #0f172a;
}

.legal-content :deep(table) {
  margin-top: 1.5rem;
  width: 100%;
  font-size: 0.875rem;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.legal-content :deep(table th) {
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
}

.legal-content :deep(table td) {
  padding: 0.875rem 1rem;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
  background-color: white;
}

.legal-content :deep(table tr:last-child td) {
  border-bottom: none;
}

.legal-content :deep(table tr:hover td) {
  background-color: #f8fafc;
}

.legal-content :deep(.info-box) {
  margin-top: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #bfdbfe;
  background: linear-gradient(to bottom right, #eff6ff, #f0f9ff);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(59 130 246 / 0.05);
}

.legal-content :deep(.info-box p) {
  color: #1e40af;
}

.legal-content :deep(.warning-box) {
  margin-top: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #fcd34d;
  background: linear-gradient(to bottom right, #fffbeb, #fef3c7);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(245 158 11 / 0.05);
}

.legal-content :deep(.warning-box p) {
  color: #92400e;
}

/* Contact box at the end */
.legal-content :deep(div.mt-4.rounded-xl) {
  margin-top: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
  padding: 1.25rem 1.5rem;
}
</style>
