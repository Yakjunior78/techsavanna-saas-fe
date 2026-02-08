<script setup lang="ts">
import { computed } from 'vue'
import { getCurrentApp, SAVANNA_APPS } from '@techsavanna/shared'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

interface Props {
  appId?: string
}

const props = defineProps<Props>()

defineEmits<{
  login: []
  signup: []
}>()

const appConfig = computed(() => {
  if (props.appId && SAVANNA_APPS[props.appId]) {
    return SAVANNA_APPS[props.appId]
  }
  return getCurrentApp() || SAVANNA_APPS.pos
})

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar
      :app-config="appConfig"
      :links="navLinks"
      @login="$emit('login')"
      @signup="$emit('signup')"
    />
    <main class="pt-14">
      <slot />
    </main>
    <Footer :app-config="appConfig" />
  </div>
</template>
