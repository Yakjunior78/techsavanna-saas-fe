<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS } from '@techsavanna/shared'
import { AuthLayout, Button, Input } from '@techsavanna/ui'
import { useAuth } from '@techsavanna/auth'

const router = useRouter()
const appConfig = SAVANNA_APPS.erp
const { login, isLoading, error, clearError } = useAuth()

const email = ref('')
const password = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password'
    return
  }

  clearError()
  const success = await login({ email: email.value, password: password.value })
  if (success) {
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || '/dashboard')
  }
}

function goToSignup() {
  router.push('/signup')
}

function goToHome() {
  router.push('/')
}
</script>

<template>
  <AuthLayout
    app-id="erp"
    title="Welcome back"
    subtitle="Sign in to your enterprise account"
    @back-to-home="goToHome"
  >
    <!-- Login Form -->
    <form class="space-y-4" @submit.prevent="handleLogin">
      <Input
        v-model="email"
        type="email"
        label="Work email"
        placeholder="you@company.com"
        required
      />

      <div>
        <Input
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        <div class="mt-1.5 text-right">
          <a href="/forgot-password" class="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        :loading="isLoading"
        full-width
      >
        Sign in
      </Button>
    </form>

    <!-- Footer slot -->
    <template #footer>
      <p class="text-center text-sm text-gray-500">
        Don't have an account?
        <button
          class="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
          @click="goToSignup"
        >
          Start your free trial
        </button>
      </p>
    </template>
  </AuthLayout>
</template>
