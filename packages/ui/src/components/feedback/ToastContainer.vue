<script setup lang="ts">
import { useToast } from '../../composables/useToast'
import ToastItem from './ToastItem.vue'

const { toasts, removeToast } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-3 p-4"
      aria-live="polite"
    >
      <TransitionGroup
        name="toast"
        tag="div"
        class="flex flex-col items-end gap-3"
      >
        <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :type="toast.type"
          :message="toast.message"
          @dismiss="removeToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
