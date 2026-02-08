import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  OnboardingProgress,
  OnboardingStep,
  OnboardingConfig,
  OnboardingFormData
} from '@techsavanna/shared'
import { STORAGE_KEYS } from '@techsavanna/shared'

export const useOnboardingStore = defineStore('onboarding', () => {
  const config = ref<OnboardingConfig | null>(null)
  const progress = ref<OnboardingProgress | null>(null)
  const formData = ref<OnboardingFormData>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const currentStep = computed(() => {
    if (!config.value || !progress.value) return null
    return config.value.steps.find(s => s.id === progress.value!.currentStepId)
  })

  const currentStepIndex = computed(() => {
    if (!config.value || !progress.value) return 0
    return config.value.steps.findIndex(s => s.id === progress.value!.currentStepId)
  })

  const totalSteps = computed(() => config.value?.steps.length ?? 0)

  const completionPercentage = computed(() => {
    if (!progress.value || totalSteps.value === 0) return 0
    return Math.round((progress.value.completedSteps.length / totalSteps.value) * 100)
  })

  const isComplete = computed(() => {
    if (!config.value || !progress.value) return false
    const requiredSteps = config.value.steps.filter(s => s.required)
    return requiredSteps.every(s => progress.value!.completedSteps.includes(s.id))
  })

  const canGoBack = computed(() => currentStepIndex.value > 0)

  const canSkip = computed(() => {
    if (!config.value?.skipAllowed) return false
    return currentStep.value ? !currentStep.value.required : false
  })

  // Storage key
  function getStorageKey(): string {
    return `${STORAGE_KEYS.ONBOARDING_PROGRESS}_${config.value?.appId}`
  }

  // Actions
  function initialize(appConfig: OnboardingConfig) {
    config.value = appConfig
    loadProgress()
  }

  function loadProgress() {
    if (!config.value) return

    try {
      const stored = localStorage.getItem(getStorageKey())
      if (stored) {
        const parsed = JSON.parse(stored)
        progress.value = {
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          lastUpdatedAt: new Date(parsed.lastUpdatedAt)
        }
        // Load form data
        const formStored = localStorage.getItem(`${getStorageKey()}_form`)
        if (formStored) {
          formData.value = JSON.parse(formStored)
        }
      } else {
        resetProgress()
      }
    } catch {
      resetProgress()
    }
  }

  function resetProgress() {
    if (!config.value) return

    progress.value = {
      currentStepId: config.value.steps[0]?.id ?? '',
      completedSteps: [],
      stepData: {},
      startedAt: new Date(),
      lastUpdatedAt: new Date()
    }
    formData.value = {}
    saveProgress()
  }

  function saveProgress() {
    if (!config.value || !progress.value) return

    progress.value.lastUpdatedAt = new Date()
    localStorage.setItem(getStorageKey(), JSON.stringify(progress.value))
    localStorage.setItem(`${getStorageKey()}_form`, JSON.stringify(formData.value))
  }

  function updateFormData(data: Partial<OnboardingFormData>) {
    formData.value = { ...formData.value, ...data }
    saveProgress()
  }

  function completeStep(stepId: string, data?: Record<string, unknown>) {
    if (!progress.value || !config.value) return

    if (!progress.value.completedSteps.includes(stepId)) {
      progress.value.completedSteps.push(stepId)
    }

    if (data) {
      progress.value.stepData[stepId] = data
    }

    // Move to next step
    const currentIndex = config.value.steps.findIndex(s => s.id === stepId)
    const nextStep = config.value.steps[currentIndex + 1]
    if (nextStep) {
      progress.value.currentStepId = nextStep.id
    }

    saveProgress()
  }

  function goToStep(stepId: string) {
    if (!progress.value || !config.value) return

    const step = config.value.steps.find(s => s.id === stepId)
    if (step) {
      progress.value.currentStepId = stepId
      saveProgress()
    }
  }

  function goBack() {
    if (!progress.value || !config.value || !canGoBack.value) return

    const prevStep = config.value.steps[currentStepIndex.value - 1]
    if (prevStep) {
      progress.value.currentStepId = prevStep.id
      saveProgress()
    }
  }

  function skipStep() {
    if (!canSkip.value || !currentStep.value) return
    completeStep(currentStep.value.id)
  }

  function clearProgress() {
    if (!config.value) return
    localStorage.removeItem(getStorageKey())
    localStorage.removeItem(`${getStorageKey()}_form`)
    progress.value = null
    formData.value = {}
  }

  return {
    // State
    config,
    progress,
    formData,
    isLoading,
    error,
    // Computed
    currentStep,
    currentStepIndex,
    totalSteps,
    completionPercentage,
    isComplete,
    canGoBack,
    canSkip,
    // Actions
    initialize,
    loadProgress,
    resetProgress,
    saveProgress,
    updateFormData,
    completeStep,
    goToStep,
    goBack,
    skipStep,
    clearProgress
  }
})
