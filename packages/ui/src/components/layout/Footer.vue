<script setup lang="ts">
import { computed } from 'vue'
import { SAVANNA_APPS, getAppUrl, type AppConfig, type AppId } from '@techsavanna/shared'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface Props {
  appConfig: AppConfig
  sections?: FooterSection[]
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => []
})

const currentYear = new Date().getFullYear()

const otherApps = computed(() =>
  Object.values(SAVANNA_APPS).filter(app => app.id !== props.appConfig.id)
)

const defaultSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Integrations', href: '#integrations' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Status', href: '/status' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' }
    ]
  }
]

const allSections = computed(() =>
  props.sections.length > 0 ? props.sections : defaultSections
)
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Brand Section -->
        <div class="space-y-8 xl:col-span-1">
          <a href="/">
            <img
              :src="appConfig.logo"
              :alt="appConfig.name"
              class="h-10 w-auto"
            />
          </a>
          <p class="text-base text-gray-600">
            {{ appConfig.description }}
          </p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a href="#" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">Twitter</span>
              <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">LinkedIn</span>
              <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Sections -->
        <div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div v-for="(section, index) in allSections.slice(0, 2)" :key="index">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {{ section.title }}
              </h3>
              <ul class="mt-4 space-y-3">
                <li v-for="link in section.links" :key="link.href">
                  <a :href="link.href" class="text-base text-gray-600 hover:text-gray-900">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div v-for="(section, index) in allSections.slice(2, 4)" :key="index">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {{ section.title }}
              </h3>
              <ul class="mt-4 space-y-3">
                <li v-for="link in section.links" :key="link.href">
                  <a :href="link.href" class="text-base text-gray-600 hover:text-gray-900">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Apps Section -->
      <div class="mt-12 border-t border-gray-200 pt-8">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-900">
          Explore Savanna Ecosystem
        </h3>
        <div class="mt-4 flex flex-wrap gap-4">
          <a
            v-for="app in otherApps"
            :key="app.id"
            :href="getAppUrl(app.id as AppId)"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:shadow-sm"
          >
            <img
              :src="app.logoIcon"
              :alt="app.shortName"
              class="size-6 object-contain"
            />
            {{ app.name }}
          </a>
        </div>
      </div>

      <!-- Copyright & Powered By -->
      <div class="mt-12 border-t border-gray-200 pt-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-sm text-gray-500">
            &copy; {{ currentYear }} <a href="https://techsavanna.co.ke" target="_blank" rel="noopener noreferrer" class="hover:text-gray-700">TechSavanna</a>. All rights reserved.
          </p>
          <a
            href="https://techsavanna.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <span>Powered by</span>
            <img
              src="/imgs/Techsavanna/tech_logo_regular.png"
              alt="TechSavanna"
              class="h-5 w-auto"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
