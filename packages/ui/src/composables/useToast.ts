import { storeToRefs } from 'pinia'
import { useToastStore } from '../stores/toast'

export function useToast() {
  const store = useToastStore()

  const { toasts } = storeToRefs(store)

  return {
    toasts,
    addToast: store.addToast,
    removeToast: store.removeToast,
    clearAll: store.clearAll,
    success: store.success,
    error: store.error,
    warning: store.warning
  }
}
