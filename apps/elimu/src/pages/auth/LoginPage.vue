<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS } from '@techsavanna/shared'
import { AuthLayout, Button, Input } from '@techsavanna/ui'

const router = useRouter()
const appConfig = SAVANNA_APPS.elimu

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    // In real app, would call auth API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/')
  } catch {
    error.value = 'Invalid email or password'
  } finally {
    isLoading.value = false
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
    app-id="elimu"
    title="Welcome back"
    subtitle="Sign in to your school management account"
    @back-to-home="goToHome"
  >
    <!-- Error Message -->
    <div
      v-if="error"
      class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600"
    >
      {{ error }}
    </div>

    <!-- Login Form -->
    <form class="space-y-4" @submit.prevent="handleLogin">
      <Input
        v-model="email"
        type="email"
        label="Email address"
        placeholder="you@school.edu"
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
