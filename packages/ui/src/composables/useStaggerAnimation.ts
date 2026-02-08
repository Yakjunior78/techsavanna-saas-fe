import { ref, watch, type Ref } from 'vue'

interface StaggerOptions {
  baseDelay?: number
  staggerDelay?: number
  maxItems?: number
}

export function useStaggerAnimation(
  isVisible: Ref<boolean>,
  itemCount: number,
  options: StaggerOptions = {}
) {
  const { baseDelay = 0, staggerDelay = 100, maxItems = 20 } = options

  const visibleItems = ref<Set<number>>(new Set())

  watch(isVisible, (visible) => {
    if (visible) {
      const count = Math.min(itemCount, maxItems)
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          visibleItems.value = new Set([...visibleItems.value, i])
        }, baseDelay + i * staggerDelay)
      }
    }
  }, { immediate: true })

  const isItemVisible = (index: number) => visibleItems.value.has(index)

  const getItemDelay = (index: number) => `${baseDelay + index * staggerDelay}ms`

  return { visibleItems, isItemVisible, getItemDelay }
}
