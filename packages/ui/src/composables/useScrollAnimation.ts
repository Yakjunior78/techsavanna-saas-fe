import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation(
  elementRef: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '-50px', once = true } = options

  const isVisible = ref(false)
  const hasAnimated = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) {
            hasAnimated.value = true
            observer?.disconnect()
          }
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, hasAnimated }
}
