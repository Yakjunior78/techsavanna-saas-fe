<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ImageModal from '../overlays/ImageModal.vue'

interface Certification {
  title: string
  description: string
  icon: 'lock' | 'badge' | 'shield'
  color: 'emerald' | 'blue' | 'amber'
  certificateUrl?: string
}

interface Props {
  title?: string
  subtitle?: string
  certifications?: Certification[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Credentials Trust & Certification',
  subtitle: 'We uphold the highest standards in data protection, quality management, and ICT services.'
})

const defaultCertifications: Certification[] = [
  {
    title: 'Data Protection Compliance',
    description: 'Ensuring secure and ethical handling of your information',
    icon: 'lock',
    color: 'emerald',
    certificateUrl: '/imgs/certificates/Techsavanna-Limited-Company-Registration-Certificate.jpg'
  },
  {
    title: 'ISO 9001:2015 Certified',
    description: 'Recognized for excellence in quality management and customer satisfaction',
    icon: 'badge',
    color: 'blue',
    certificateUrl: '/imgs/certificates/Techsavanna-Company-Limited_QMS_GR24_UAF-Cert.jpg'
  }
]

const certifications = computed(() => props.certifications || defaultCertifications)

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Modal state
const isModalOpen = ref(false)
const selectedCertificate = ref<Certification | null>(null)

function openCertificateModal(cert: Certification) {
  if (cert.certificateUrl) {
    selectedCertificate.value = cert
    isModalOpen.value = true
  }
}

function closeModal() {
  isModalOpen.value = false
  selectedCertificate.value = null
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '-50px' }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

function getIconBgClass(color: string) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50',
    blue: 'bg-blue-50',
    amber: 'bg-amber-50'
  }
  return colors[color] || 'bg-gray-50'
}

function getIconTextClass(color: string) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600'
  }
  return colors[color] || 'text-gray-600'
}
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20">
    <!-- Decorative background elements -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-20 top-20 size-72 rounded-full bg-emerald-100/40 blur-3xl"></div>
      <div class="absolute -right-20 bottom-20 size-72 rounded-full bg-blue-100/40 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="text-center transition-all duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        <span class="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Certified & Trusted
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-base text-gray-500">
          {{ subtitle }}
        </p>
      </div>

      <!-- Certifications - Centered flex layout -->
      <div class="mt-12 flex flex-wrap justify-center gap-6 lg:gap-8">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.title"
          class="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:w-80"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${(index + 1) * 100}ms` }"
        >
          <!-- Gradient overlay on hover -->
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            :class="{
              'bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent': cert.color === 'emerald',
              'bg-gradient-to-br from-blue-50/50 via-transparent to-transparent': cert.color === 'blue',
              'bg-gradient-to-br from-amber-50/50 via-transparent to-transparent': cert.color === 'amber'
            }"
          ></div>

          <!-- Decorative corner accent -->
          <div
            class="absolute -right-8 -top-8 size-24 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150"
            :class="{
              'bg-emerald-200': cert.color === 'emerald',
              'bg-blue-200': cert.color === 'blue',
              'bg-amber-200': cert.color === 'amber'
            }"
          ></div>

          <!-- Icon with animated ring -->
          <div class="relative mb-5">
            <div
              class="flex size-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              :class="{
                'bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:shadow-emerald-200/50': cert.color === 'emerald',
                'bg-gradient-to-br from-blue-50 to-blue-100 group-hover:shadow-blue-200/50': cert.color === 'blue',
                'bg-gradient-to-br from-amber-50 to-amber-100 group-hover:shadow-amber-200/50': cert.color === 'amber'
              }"
            >
              <!-- Lock Icon -->
              <svg
                v-if="cert.icon === 'lock'"
                class="size-8"
                :class="getIconTextClass(cert.color)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>

              <!-- Badge Icon -->
              <svg
                v-else-if="cert.icon === 'badge'"
                class="size-8"
                :class="getIconTextClass(cert.color)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>

              <!-- Shield Icon -->
              <svg
                v-else-if="cert.icon === 'shield'"
                class="size-8"
                :class="getIconTextClass(cert.color)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <!-- Animated ring -->
            <div
              class="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
              :class="{
                'bg-emerald-200/30': cert.color === 'emerald',
                'bg-blue-200/30': cert.color === 'blue',
                'bg-amber-200/30': cert.color === 'amber'
              }"
            ></div>
          </div>

          <!-- Content -->
          <h3 class="relative text-lg font-semibold text-gray-900">{{ cert.title }}</h3>
          <p class="relative mt-2 text-sm leading-relaxed text-gray-500">{{ cert.description }}</p>

          <!-- View Certificate Button -->
          <button
            v-if="cert.certificateUrl"
            type="button"
            class="relative mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:gap-3"
            :class="{
              'bg-emerald-50 text-emerald-700 hover:bg-emerald-100': cert.color === 'emerald',
              'bg-blue-50 text-blue-700 hover:bg-blue-100': cert.color === 'blue',
              'bg-amber-50 text-amber-700 hover:bg-amber-100': cert.color === 'amber'
            }"
            @click="openCertificateModal(cert)"
          >
            <span>View Certificate</span>
            <svg class="size-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <ImageModal
      :open="isModalOpen"
      :image-url="selectedCertificate?.certificateUrl || ''"
      :title="selectedCertificate?.title || ''"
      :alt="selectedCertificate?.title || 'Certificate'"
      @close="closeModal"
    />
  </section>
</template>
