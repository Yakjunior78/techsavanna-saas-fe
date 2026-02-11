<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ToastContainer, useToast } from '@techsavanna/ui'
import { setApiErrorHandler } from '@techsavanna/shared'

const { error } = useToast()
setApiErrorHandler((message) => error(message))
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>
