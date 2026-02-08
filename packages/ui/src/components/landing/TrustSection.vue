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
    certificateUrl: '/imgs/certificates/data-protection.jpg'
  },
  {
    title: 'ISO 9001:2015 Certified',
    description: 'Recognized for excellence in quality management and customer satisfaction',
    icon: 'badge',
    color: 'blue',
    certificateUrl: '/imgs/certificates/iso-certificate.jpg'
  },
  {
    title: 'ICT Authority Accreditation',
    description: 'Accredited for systems and applications in the provision of ICT services',
    icon: 'shield',
    color: 'amber',
    certificateUrl: '/imgs/certificates/ict-authority.jpg'
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
  <section ref="sectionRef" class="bg-gray-50 py-16 lg:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="text-center transition-all duration-700"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
      >
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-base text-gray-500">
          {{ subtitle }}
        </p>
      </div>

      <!-- Certifications Grid -->
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.title"
          class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-gray-300 hover:shadow-md"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${(index + 1) * 100}ms` }"
        >
          <!-- Icon -->
          <div
            class="mb-4 flex size-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            :class="getIconBgClass(cert.color)"
          >
            <!-- Lock Icon -->
            <svg
              v-if="cert.icon === 'lock'"
              class="size-7"
              :class="getIconTextClass(cert.color)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            <!-- Badge Icon -->
            <svg
              v-else-if="cert.icon === 'badge'"
              class="size-7"
              :class="getIconTextClass(cert.color)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <!-- Shield Icon -->
            <svg
              v-else-if="cert.icon === 'shield'"
              class="size-7"
              :class="getIconTextClass(cert.color)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <!-- Content -->
          <h3 class="text-lg font-semibold text-gray-900">{{ cert.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ cert.description }}</p>

          <!-- View Certificate Button -->
          <button
            v-if="cert.certificateUrl"
            type="button"
            class="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
            @click="openCertificateModal(cert)"
          >
            <span>View Certificate</span>
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
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
