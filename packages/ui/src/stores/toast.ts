import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, ToastOptions } from '@techsavanna/shared'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  const timers = new Map<string, ReturnType<typeof setTimeout>>()

  function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }

  function addToast(options: ToastOptions): string {
    const id = generateId()
    const toast: Toast = {
      id,
      type: options.type ?? 'success',
      message: options.message,
      duration: options.duration ?? 5000
    }

    toasts.value.push(toast)

    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id)
      }, toast.duration)
      timers.set(id, timer)
    }

    return id
  }

  function removeToast(id: string) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function clearAll() {
    timers.forEach(timer => clearTimeout(timer))
    timers.clear()
    toasts.value = []
  }

  function success(message: string, duration?: number) {
    return addToast({ type: 'success', message, duration })
  }

  function error(message: string, duration?: number) {
    return addToast({ type: 'error', message, duration: duration ?? 8000 })
  }

  function warning(message: string, duration?: number) {
    return addToast({ type: 'warning', message, duration: duration ?? 6000 })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning
  }
})
