import { ref, watch, type Ref } from 'vue'

interface CountUpOptions {
  duration?: number
  decimals?: number
}

export function useCountUp(
  targetValue: number,
  isVisible: Ref<boolean>,
  options: CountUpOptions = {}
) {
  const { duration = 2000, decimals = 0 } = options

  const displayValue = ref(0)
  const hasAnimated = ref(false)

  watch(isVisible, (visible) => {
    if (visible && !hasAnimated.value) {
      hasAnimated.value = true
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3)
        displayValue.value = Number((targetValue * easeOut).toFixed(decimals))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          displayValue.value = targetValue
        }
      }

      requestAnimationFrame(animate)
    }
  }, { immediate: true })

  return { displayValue }
}
